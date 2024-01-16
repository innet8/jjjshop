<?php

namespace app\common\enum\message;

use MyCLabs\Enum\Enum;

/**
 * 消息发送对象枚举类
 */
class MessageToEnum extends Enum
{
    // 会员
    const MEMBER = 10;

    // 商家
    const SHOP = 20;

    // 供应商
    const SUPPLIER = 30;

    /**
     * 获取枚举数据
     */
    public static function data()
    {
        return [
            self::MEMBER => [
                'value' => self::MEMBER,
                'name' => __('会员'),
            ],
            self::SHOP => [
                'value' => self::SHOP,
                'name' => __('商家'),
            ],
            self::SUPPLIER => [
                'value' => self::SUPPLIER,
                'name' => __('供应商'),
            ],
        ];
    }

}