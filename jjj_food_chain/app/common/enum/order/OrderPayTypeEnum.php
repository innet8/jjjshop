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

    /**
     * 获取枚举数据
     */
    public static function data()
    {
        return [
            self::BALANCE => [
                'name' => '余额支付',
                'value' => self::BALANCE,
            ],
            self::WECHAT => [
                'name' => '微信支付',
                'value' => self::WECHAT,
            ],
            self::ALIPAY => [
                'name' => '支付宝支付',
                'value' => self::ALIPAY,
            ],
            self::CASH => [
                'name' => '线下支付(现金支付)',
                'value' => self::CASH,
            ],
            self::OWECHAT => [
                'name' => '线下支付(自有微信支付)',
                'value' => self::OWECHAT,
            ],
            self::OALIPAY => [
                'name' => '线下支付(自有支付宝支付)',
                'value' => self::OALIPAY,
            ],
            self::POS => [
                'name' => '线下支付(POS刷卡支付)',
                'value' => self::POS,
            ],
        ];
    }

    /**
     * 获取支付枚举数据
     */
    public static function pay()
    {
        return [
            self::BALANCE => [
                'name' => '余额支付',
                'value' => self::BALANCE,
            ],
            self::WECHAT => [
                'name' => '微信支付',
                'value' => self::WECHAT,
            ],
            self::ALIPAY => [
                'name' => '支付宝支付',
                'value' => self::ALIPAY,
            ]
        ];
    }

}