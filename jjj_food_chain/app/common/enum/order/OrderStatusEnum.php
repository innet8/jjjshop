<?php
namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单状态
 */
class OrderStatusEnum extends Enum
{
    // 进行中
    const NORMAL = 10;

    // 已取消
    const CANCELLED = 20;

    // 待取消
    const APPLY_CANCEL = 21;

    // 已完成
    const COMPLETED = 30;

    /**
     * 获取枚举数据
     */
    public static function data($key=0)
    {
        $arr = [
            self::NORMAL => [
                'name' => __('待付款'),
                'value' => self::NORMAL,
            ],
            self::CANCELLED => [
                'name' => __('已取消'),
                'value' => self::CANCELLED,
            ],
            self::APPLY_CANCEL => [
                'name' => __('待取消'),
                'value' => self::APPLY_CANCEL,
            ],
            self::COMPLETED => [
                'name' => __('已完成'),
                'value' => self::COMPLETED,
            ],
        ];
        return $key  > 0 ? $arr[$key] : $arr;
    }

}