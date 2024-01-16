<?php

namespace app\common\enum\user\balanceLog;

use MyCLabs\Enum\Enum;

/**
 * 余额变动场景枚举类
 */
class BalanceLogSceneEnum extends Enum
{
    // 用户充值
    const RECHARGE = 10;

    // 用户消费
    const CONSUME = 20;

    // 管理员操作
    const ADMIN = 30;

    // 订单退款
    const REFUND = 40;

    // 余额提现
    const CASH = 50;
    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            self::RECHARGE => [
                'name' => __('用户充值'),
                'value' => self::RECHARGE,
                'describe' => __('用户充值：%s'),
            ],
            self::CONSUME => [
                'name' => __('用户消费'),
                'value' => self::CONSUME,
                'describe' => __('用户消费：%s'),
            ],
            self::ADMIN => [
                'name' => __('管理员操作'),
                'value' => self::ADMIN,
                'describe' => __('后台管理员 [%s] 操作'),
            ],
            self::REFUND => [
                'name' => __('订单退款'),
                'value' => self::REFUND,
                'describe' => __('订单退款：%s'),
            ],
            self::CASH => [
                'name' => __('余额提现'),
                'value' => self::CASH,
                'describe' => __('余额提现'),
            ],
        ];
    }

}