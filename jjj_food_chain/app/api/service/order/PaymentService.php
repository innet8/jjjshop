<?php

namespace app\api\service\order;

use app\common\library\alipay\AliPay;
use app\common\library\easywechat\AppOpen;
use app\common\library\easywechat\AppWx;
use app\common\library\easywechat\AppMp;
use app\common\library\easywechat\WxPay;

class PaymentService
{
    /**
     * 构建微信支付
     */
    public static function wechat(
        $user,
        $order,
        $orderType,
        $pay_source
    )
    {
        // 统一下单API
        if ($pay_source == 'wx') {
            $app = AppWx::getWxPayApp($user['app_id']);
            $open_id = $user['open_id'];
        } else if ($pay_source == 'mp') {
            $app = AppMp::getWxPayApp($user['app_id']);
            $open_id = $user['mpopen_id'];
        } else if ($pay_source == 'h5') {
            $app = AppMp::getWxPayApp($user['app_id']);
            $open_id = '';
        } else if ($pay_source == 'app') {
            $app = AppOpen::getWxPayApp($user['app_id']);
            $open_id = '';
        }
        $orderNo = $order['trade_no'];
        $payPrice = $order['online_money'];

        $WxPay = new WxPay($app);
        $payment = $WxPay->unifiedorder($orderNo, $open_id, $payPrice, $orderType, $pay_source, $user['app_id']);
        return $payment;
    }


    /**
     * 构建支付宝支付
     */
    public static function alipay(
        $user,
        $order,
        $orderType,
        $pay_source
    )
    {
        $orderNo = $order['trade_no'];
        $payPrice = $order['online_money'];
        $AliPay = new AliPay($order['app_id']);
        $payment = $AliPay->unifiedorder($orderNo, $payPrice, $orderType, $pay_source, $user['alipay_id']);
        return $payment;
    }
}