<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单支付方式枚举类
 */
class OrderPayTypeEnum extends Enum
{
    // 余额支付
    const BALANCE = 10;

    // 微信支付
    const WECHAT = 20;

    // 支付宝支付
    const ALIPAY = 30;

    // 现金支付
    const CASH = 40;

    // 自有微信
    const OWECHAT = 50;

    // 自有支付宝
    const OALIPAY = 60;

    // 自有POS刷卡
    const POS = 70;

    // QR PromptPay
    const QRPROMPTPAY = 80;

    // QR code
    const QRCODE = 90;

    // SCB easy
    const SCBEASY = 100;

    // Krungthai NEXT
    const KRUNGTHAINEXT = 110;

    // Krungsri Mobile
    const KRUNGSRIMOBILE = 120;

    // Cross-Border QR
    const CROSSBORDERQR = 130;

    // TrueMoneyWallet
    const TRUEMONEYWALLET = 140;

    // LINE Pay
    const LINEPAY = 150;

    /**
     * 获取枚举数据
     */
    public static function data($key=0)
    {
        $arr = [
            self::QRPROMPTPAY => [
                'name' => "QR PromptPay",
                'value' => self::QRPROMPTPAY,
                'status' => 1,
                'sort' => 1,
                'img' => '/image/pay/qr_prompt_pay.png'
            ],
            self::QRCODE => [
                'name' => "QR code",
                'value' => self::QRCODE,
                'status' => 0,
                'sort' => 2,
                'img' => '/image/pay/qr_code.png'
            ],
            self::SCBEASY => [
                'name' => "SCB easy",
                'value' => self::SCBEASY,
                'status' => 1,
                'sort' => 3,
                'img' => '/image/pay/scb_easy.png'
            ],
            self::KRUNGTHAINEXT => [
                'name' => "Krungthai NEXT",
                'value' => self::KRUNGTHAINEXT,
                'status' => 0,
                'sort' => 4,
                'img' => '/image/pay/krungthai_next.png'
            ],
            self::KRUNGSRIMOBILE => [
                'name' => "Krungsri Mobile",
                'value' => self::KRUNGSRIMOBILE,
                'status' => 1,
                'sort' => 5,
                'img' => '/image/pay/krungsri_mobile.png'
            ],
            self::CROSSBORDERQR => [
                'name' => "Cross-Border QR",
                'value' => self::CROSSBORDERQR,
                'status' => 0,
                'sort' => 6,
                'img' => '/image/pay/cross_border_qr.png'
            ],
            self::TRUEMONEYWALLET => [
                'name' => "TrueMoney Wallet",
                'value' => self::TRUEMONEYWALLET,
                'status' => 1,
                'sort' => 7,
                'img' => '/image/pay/true_money.png'
            ],
            self::LINEPAY => [
                'name' => "LINE Pay",
                'value' => self::LINEPAY,
                'status' => 0,
                'sort' => 8,
                'img' => '/image/pay/line_pay.png'
            ],
            self::OALIPAY => [
                'name' => 'Alipay',         //线下支付(自有支付宝支付)
                'value' => self::OALIPAY,
                'status' => 1,
                'sort' => 9,
                'img' => '/image/pay/alipay.png'
            ],
            self::OWECHAT => [
                'name' => 'WeChat Pay',     // 线下支付(自有微信支付)
                'value' => self::OWECHAT,
                'status' => 0,
                'sort' => 10,
                'img' => '/image/pay/wechat_pay.png'
            ],
            // 
            self::BALANCE => [
                'name' => __('余额支付'),
                'value' => self::BALANCE,
                'status' => 1,
                'sort' => 0,
                'img' => ''
            ],
            self::CASH => [
                'name' => __('现金支付'),
                'value' => self::CASH,
                'status' => 1,
                'sort' => 12,
                'img' => ''
            ],
            self::WECHAT => [
                'name' => __('微信支付'),
                'value' => self::WECHAT,
                'status' => 0,
                'sort' => 10,
                'img' => '/image/pay/wechat_pay.png'
            ],
            self::ALIPAY => [
                'name' => __('支付宝支付'),
                'value' => self::ALIPAY,
                'status' => 0,
                'sort' => 11,
                'img' => '/image/pay/alipay.png'
            ],
            self::POS => [
                'name' => __('POS刷卡支付'),
                'value' => self::POS,
                'status' => 0,
                'sort' => 13,
                'img' => ''
            ],
        ];
        return $key > 0 ? $arr[$key] ?? '' : $arr;
    }

    /**
     * 获取支付枚举数据
     */
    public static function pay()
    {
        return  array_filter(self::data(), function($item){
            switch ($item['value']) {
                case self::BALANCE:
                case self::WECHAT:
                case self::ALIPAY:
                    return true;
                    break;
            }
            return false;
        });
    }

}