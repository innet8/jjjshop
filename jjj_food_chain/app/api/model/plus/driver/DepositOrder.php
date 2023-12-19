<?php

namespace app\api\model\plus\driver;

use app\common\enum\order\OrderPayStatusEnum;
use app\common\exception\BaseException;
use app\common\model\plus\driver\DepositOrder as DepositOrderModel;
use app\api\service\order\paysuccess\type\DriverPaySuccessService;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\api\service\order\PaymentService;

/**
 * 押金订单模型类
 */
class DepositOrder extends DepositOrderModel
{

    /**
     * 创建订单
     */
    public function createOrder($user, $price, $pay_source)
    {
        $DriverApply = Apply::where('user_id', '=', $user['user_id'])->where('apply_status', '<>', 30)->order('apply_id desc')->find();
        $depositInfo = $this->where('user_id', '=', $user['user_id'])
            ->where('pay_status', '=', 20)
            ->where('is_refund', '=', 0)
            ->count();
        if ($DriverApply['deposit_money'] == 0 || $DriverApply['cash_open'] == 0 || $depositInfo) {
            $this->error = '暂无押金支付';
            return false;
        }
        $orderInfo = $this->where('user_id', '=', $user['user_id'])
            ->where('pay_status', '=', 10)->find();
        if ($orderInfo) {
            $order_no = $this->orderNo();
            $trade_no = $this->tradeNo();
            $this->where('order_id', $orderInfo['order_id'])->update([
                'order_no' => $order_no,
                'trade_no' => $trade_no,
                'pay_source' => $pay_source,
                'pay_price' => $price,
            ]);
            $this['order_id'] = $orderInfo['order_id'];
        } else {
            // 获取订单数据
            $data = [
                'order_no' => $this->orderNo(),
                'trade_no' => $this->tradeNo(),
                'user_id' => $user['user_id'],
                'pay_price' => $price,
                'app_id' => self::$app_id,
                'pay_source' => $pay_source
            ];
            $this->save($data);
        }
        return $this['order_id'];
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
     * 余额支付标记订单已支付
     */
    public function onPaymentByBalance($orderNo)
    {
        // 获取订单详情
        $PaySuccess = new DriverPaySuccessService($orderNo);
        // 发起余额支付
        $status = $PaySuccess->onPaySuccess(OrderPayTypeEnum::BALANCE);
        if (!$status) {
            $this->error = $PaySuccess->getError();
        }
        return $status;
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
            OrderTypeEnum::DRIVER,
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
            OrderTypeEnum::DRIVER,
            $pay_source
        );
    }

    /**
     * 订单详情
     */
    public static function getUserOrderDetail($order_id, $user_id)
    {
        $model = new static();
        $order = $model->where(['order_id' => $order_id])
            ->where(['user_id' => $user_id])
            ->with(['user'])
            ->find();
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
