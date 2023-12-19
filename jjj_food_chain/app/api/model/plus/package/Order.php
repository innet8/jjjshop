<?php

namespace app\api\model\plus\package;

use app\api\service\order\PaymentService;
use app\api\service\order\paysuccess\type\PackagePaySuccessService;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\exception\BaseException;
use app\common\model\plus\package\Order as OrderModel;
use app\common\model\plus\package\Package as PackageModel;

/**
 * 券包模型
 */
class Order extends OrderModel
{

    /**
     * 创建券包订单
     * 返回订单id
     */
    public function createOrder($user, $package_id, $params)
    {
        $detail = PackageModel::detail($package_id);
        if ($detail['status'] == 1) {
            $this->error = '活动已终止';
            return false;
        }
        if ($detail['start_time']['value'] > time()) {
            $this->error = '活动还未开始';
            return false;
        }
        if ($detail['end_time']['value'] < time()) {
            $this->error = '活动已结束';
            return false;
        }
        //判断是否超过发放数量
        $totalNum = $this->where('package_id', '=', $package_id)
            ->where('pay_status', '=', 20)
            ->count();
        if ($totalNum + 1 > $detail['total_num']) {
            $this->error = '券包数量已售完';
            return false;
        }
        if ($detail['is_times'] == 1) {
            $where = [
                'user_id' => $user['user_id'],
                'pay_status' => 20,
                'package_id' => $package_id,
            ];
            //统计购买数量
            $count = $this->where($where)->count('order_id');
            //判断购买次数
            if ($count >= $detail['times']) {
                $this->error = '已超过限购数量';
                return false;
            }
        }
        //判断是否符合等级
        if ($detail['is_grade'] == 1 && !in_array($user['grade_id'], explode(',', $detail['grade_ids']))) {
            $this->error = '会员等级不符合';
            return false;
        }
        //写入order表
        $status = $this->save([
            'package_id' => $package_id,
            'order_no' => $this->orderNo(),
            'trade_no' => $this->tradeNo(),
            'pay_price' => $detail['money'],
            'user_id' => $user['user_id'],
            'app_id' => self::$app_id,
            'coupon_ids' => $detail['coupon_ids'],
        ]);
        return $status;
    }

    /**
     * 余额支付标记订单已支付
     */
    public function onPaymentByBalance($orderNo)
    {
        // 获取订单详情
        $PaySuccess = new PackagePaySuccessService($orderNo);
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
        return $model->where(['trade_no' => $orderNo, 'is_delete' => 0])->with(['user'])->find();
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
            OrderTypeEnum::PACKAGE,
            $pay_source
        );
    }

    /**
     * 构建支付宝请求
     */
    protected static function onPaymentByAlipay($user, $order, $pay_source)
    {
        return PaymentService::alipay(
            $user,
            $order,
            OrderTypeEnum::PACKAGE,
            $pay_source
        );
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
     * 订单支付事件
     */
    public function onPay()
    {
        // 判断订单状态
        if ($this['pay_status']['value'] != OrderPayStatusEnum::PENDING) {
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