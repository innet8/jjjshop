<?php

namespace app\common\enum\user\pointsLog;

use MyCLabs\Enum\Enum;

/**
 * 积分变动场景枚举类
 */
class PointsLogSceneEnum extends Enum
{
    // 用户充值
    const RECHARGE = 10;

    // 消费赠送
    const CONSUME = 20;

    // 管理员操作
    const ADMIN = 30;

    // 退款扣除
    const REFUND = 40;

    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            self::RECHARGE => [
                'name' => __('充值'),
                'value' => self::RECHARGE,
                'describe' => __('充值：%s'),
            ],
            self::CONSUME => [
                'name' => __('消费赠送'),
                'value' => self::CONSUME,
                'describe' => __('消费赠送：%s'),
            ],
            self::ADMIN => [
                'name' => __('管理员操作'),
                'value' => self::ADMIN,
                'describe' => __('后台管理员 [%s] 操作'),
            ],
            self::REFUND => [
                'name' => __('退款扣除'),
                'value' => self::REFUND,
                'describe' => __('退款扣除：%s'),
            ],
        ];
    }

}