<?php

namespace app\cashier\model\user;

use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\model\user\CardRecord as CardRecordModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\api\service\order\PaymentService;
use app\api\service\order\paysuccess\type\CardPaySuccessService;

/**
 * 会员卡记录模型
 */
class CardRecord extends CardRecordModel
{
    /**
     * 获取我的会员卡
     */
    public function getList($data, $user)
    {
        $model = $this;
        $list = $model->alias('r')
            ->with(['card.cardtype', 'user'])
            ->where('c.is_delete', '=', 0)
            ->where('c.status', '=', 0)
            ->where('r.is_delete', '=', 0)
            ->where('r.pay_status', '=', 20)
            ->where('r.user_id', '=', $user['user_id'])
            ->join('user_card c', 'c.card_id=r.card_id')
            ->where(function ($query) {
                $query->where('expire_time', '=', 0)->whereOr('expire_time', '>', time());
            })
            ->field('r.*')
            ->order(['r.create_time' => 'desc'])
            ->paginate($data);
        return $list;
    }

    /**
     * 获取我的会员卡详情
     */
    public static function getDetail($order_id)
    {
        $detail = self::detail($order_id);
        return $detail;
    }

    /**
     * 获取我的会员卡
     */
    public static function getCardDetail($user_id)
    {
        $model = new static;
        $detail = $model->with(['card'])
            ->where('is_delete', '=', 0)
            ->where('pay_status', '=', 20)
            ->where('user_id', '=', $user_id)
            ->where(function ($query) {
                $query->where('expire_time', '=', 0)->whereOr('expire_time', '>', time());
            })
            ->find();
        return $detail ? $detail : '';
    }

    /**
     * 创建订单
     */
    public function createOrder($user, $param)
    {
        $cardId = self::getCardDetail($user['user_id']);
        if ($cardId) {
            $this->error = '已存在会员卡，不允许购买';
            return false;
        }
        // 获取订单数据
        $detail = (new Card())::detail($param['card_id']);
        //生成记录
        $record = [
            'user_id' => $user['user_id'],
            'card_id' => $param['card_id'],
            'order_no' => $this->orderNo(),
            'trade_no' => $this->tradeNo(),
            'expire_time' => $detail['expire'] ? (time() + $detail['expire'] * 86400 * 30) : 0,
            'pay_price' => $detail['money'],
            'discount' => $detail['is_discount'] ? $detail['discount'] : 0,
            'open_points' => $detail['open_points'],
            'open_points_num' => $detail['open_points_num'],
            'open_coupon' => $detail['open_coupon'],
            'open_coupons' => $detail['open_coupons'],
            'open_money' => $detail['open_money'],
            'open_money_num' => $detail['open_money_num'],
            'pay_time' => time(),
            'app_id' => self::$app_id,
        ];
        $this->save($record);
        return $this['order_id'];
    }

    /**
     * 余额支付标记订单已支付
     */
    public function onPaymentByBalance($orderNo)
    {
        // 获取订单详情
        $PaySuccess = new CardPaySuccessService($orderNo);
        // 发起余额支付
        return $PaySuccess->onPaySuccess(OrderPayTypeEnum::BALANCE);
    }

    /**
     * 待支付订单详情
     */
    public static function getPayDetail($orderNo, $pay_status)
    {
        $model = new static();
        if ($pay_status > 0) {
            $model = $model->where('pay_status', '=', 10);
        }
        return $model->where(['trade_no' => $orderNo])->with(['user'])->find();
    }

    /**
     * 订单详情
     */
    public static function getUserOrderDetail($order_id, $user_id)
    {
        $model = new static();
        $order = $model->where(['order_id' => $order_id, 'user_id' => $user_id])->find();
        if (empty($order)) {
            throw new BaseException(['msg' => '订单不存在']);
        }
        return $order;
    }

    /**
     * 构建支付请求的参数
     */
    public static function onOrderPayment($user, $order, $payType, $pay_source)
    {
        if ($payType == OrderPayTypeEnum::WECHAT) {
            return self::onPaymentByWechat($user, $order, $pay_source);
        }
        if ($pay_source == 'h5') {
            return [];
        }
        if ($payType == OrderPayTypeEnum::ALIPAY) {
            return self::onPaymentByAlipay($user, $order, $pay_source);
        }
        return [];
    }

    /**
     * 构建微信支付请求
     */
    protected static function onPaymentByWechat($user, $order, $pay_source)
    {
        return PaymentService::wechat(
            $user,
            $order,
            OrderTypeEnum::CARD,
            $pay_source
        );
    }

    /**
     * 构建支付宝请求
     */
    protected static function onPaymentByAlipay($user, $order_arr, $pay_source)
    {
        return PaymentService::alipay(
            $user,
            $order_arr,
            OrderTypeEnum::CARD,
            $pay_source
        );
    }

    /**
     * 获取会员卡最小折扣
     */
    public function getDiscount($user_id)
    {
        $discount = $this->alias('r')
            ->where('r.is_delete', '=', 0)
            ->where('r.pay_status', '=', 20)
            ->where('r.user_id', '=', $user_id)
            ->where('r.discount', '>', 0)
            ->where(function ($query) {
                $query->where('expire_time', '=', 0)->whereOr('expire_time', '>', time());
            })
            ->order('r.discount asc')
            ->value('r.discount');
        return $discount ? round($discount / 10, 2) : 0;
    }

    /**
     * 订单支付事件
     */
    public function onPay()
    {
        // 判断订单状态
        if ($this['pay_status'] != OrderPayStatusEnum::PENDING) {
            $this->error = '很抱歉，当前订单不合法，无法支付';
            return false;
        }
        return true;
    }

    /**
     * 创建新订单
     */
    public function OrderPay($params, $order, $user)
    {
        $payType = $params['payType'];
        $payment = '';
        $online_money = 0;
        $order->save(['balance' => 0, 'online_money' => 0, 'trade_no' => $this->tradeNo()]);
        if ($order['pay_price'] == 0) {
            $params['use_balance'] = 1;
        }
        // 余额支付标记订单已支付
        if ($params['use_balance'] == 1) {
            if ($user['balance'] >= $order['pay_price']) {
                $payType = 10;
                $order->save(['balance' => $order['pay_price']]);
                $this->onPaymentByBalance($order['trade_no']);
            } else {
                if ($payType <= 10) {
                    $this->error = '用户余额不足';
                    return false;
                }
                $online_money = round($order['pay_price'] - $user['balance'], 2);
                $order->save(['balance' => $user['balance'], 'online_money' => $online_money]);
            }
        } else {
            if ($payType <= 10) {
                $this->error = '请选择支付方式';
                return false;
            }
            $online_money = $order['pay_price'];
            $order->save(['online_money' => $order['pay_price']]);
        }
        $online_money > 0 && $payment = self::onOrderPayment($user, $order, $payType, $params['pay_source']);

        $result['order_id'] = $order['order_id'];
        $result['payType'] = $payType;
        $result['payment'] = $payment;
        return $result;
    }
}