<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单支付状态枚举类
 */
class OrderPayStatusEnum extends Enum
{
    // 待支付
    const PENDING = 10;

    // 支付成功
    const SUCCESS = 20;

    /**
     * 获取枚举数据
     */
    public static function data($key=0)
    {
        $arr = [
            self::PENDING => [
                'name' => __('待付款'),
                'value' => self::PENDING,
            ],
            self::SUCCESS => [
                'name' => __('已付款'),
                'value' => self::SUCCESS,
            ],
        ];
        return $key  > 0 ? $arr[$key] : $arr;
    }
}