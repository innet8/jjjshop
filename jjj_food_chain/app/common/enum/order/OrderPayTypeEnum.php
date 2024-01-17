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
    public static function data($key=0)
    {
        $arr = [
            self::BALANCE => [
                'name' => __('余额支付'),
                'value' => self::BALANCE,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::WECHAT => [
                'name' => __('微信支付'),
                'value' => self::WECHAT,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::ALIPAY => [
                'name' => __('支付宝支付'),
                'value' => self::ALIPAY,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::CASH => [
                'name' => __('线下支付(现金支付)'),
                'value' => self::CASH,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::OWECHAT => [
                'name' => __('线下支付(自有微信支付)'),
                'value' => self::OWECHAT,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::OALIPAY => [
                'name' => __('线下支付(自有支付宝支付)'),
                'value' => self::OALIPAY,
                'status' => 1,
                'img' => '/image/diy/logo.png'
            ],
            self::POS => [
                'name' => __('线下支付(POS刷卡支付)'),
                'value' => self::POS,
                'status' => 1,
                'img' => '/image/diy/logo.png'
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