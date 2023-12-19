<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单来源
 */
class OrderSourceEnum extends Enum
{
    // 普通订单
    const MASTER = 10;
    // 收银台订单
    const CASHIER = 20;
    // 扫码点餐
    const SCAN = 30;
    // 团购订单
    const GROUP = 40;

    /**
     * 获取枚举数据
     */
    public static function data()
    {
        return [
            self::MASTER => [
                'name' => '用户下单',
                'value' => self::MASTER,
            ],
            self::CASHIER => [
                'name' => '收银台下单',
                'value' => self::CASHIER,
            ],
            self::SCAN => [
                'name' => '扫码下单',
                'value' => self::SCAN,
            ],
            self::GROUP => [
                'name' => '团购下单',
                'value' => self::GROUP,
            ],
        ];
    }

}