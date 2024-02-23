<?php

namespace app\common\enum\settings;

use MyCLabs\Enum\Enum;

/**
 * 语言设置枚举类
 */
class LanguageEnum extends Enum
{
    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            [
                'name' => 'th',
                'value' => 'ภาษาไทย',
            ],
            [
                'name' => 'zh',
                'value' => '简体中文',
            ],
            [
                'name' => 'zhtw',
                'value' => '繁體中文',
            ],
            [
                'name' => 'en',
                'value' => 'English',
            ],
            [
                'name' => 'ja',
                'value' => '日本語です',
            ],
            [
                'name' => 'ko',
                'value' => '한국어',
            ],
        ];
    }

    /**
     * 获取订单类型值
     */
    public static function default()
    {
        return [
            [
                'key' => 1,
                'name' => 'en',
                'value' => 'English',
            ],
            [
                'key' => 2,
                'name' => 'th',
                'value' => 'ภาษาไทย',
            ],
            [
                'key' => 3,
                'name' => 'zhtw',
                'value' => '繁體中文',
            ],
            [
                'key' => 4,
                'name' => 'ja',
                'value' => '日本語です',
            ]
        ];
    }

}