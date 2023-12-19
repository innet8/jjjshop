<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单类型枚举类,用于后期扩展，比如虚拟物品
 */
class OrderTypeEnum extends Enum
{
    // 商城订单
    const MASTER = 10;
    // 积分商城订单
    const POINTS = 20;
    // 购卡订单
    const CARD = 30;
    // 余额充值订单
    const BALANCE = 40;
    // 券包订单
    const PACKAGE = 50;
    // 配送员押金订单
    const DRIVER = 60;
    // 团购订单
    const Group = 70;

    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            self::MASTER => [
                'name' => '商城订单',
                'value' => self::MASTER,
            ],
            self::POINTS => [
                'name' => '积分商城订单',
                'value' => self::POINTS,
            ],
            self::BALANCE => [
                'name' => '余额充值订单',
                'value' => self::BALANCE,
            ],
            self::CARD => [
                'name' => '购卡订单',
                'value' => self::CARD,
            ],
            self::PACKAGE => [
                'name' => '券包订单',
                'value' => self::PACKAGE,
            ],
            self::DRIVER => [
                'name' => '配送员押金订单',
                'value' => self::DRIVER,
            ],
            self::Group => [
                'name' => '团购订单',
                'value' => self::Group,
            ],
        ];
    }

    /**
     * 获取订单类型名称
     */
    public static function getTypeName()
    {
        static $names = [];

        if (empty($names)) {
            foreach (self::data() as $item)
                $names[$item['value']] = $item['name'];
        }

        return $names;
    }

}