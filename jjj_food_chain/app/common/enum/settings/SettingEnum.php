<?php

namespace app\common\enum\settings;

use MyCLabs\Enum\Enum;

/**
 * 商城设置枚举类
 */
class SettingEnum extends Enum
{
    // 商城设置
    const STORE = 'store';
    // 交易设置
    const TRADE = 'trade';
    // 短信通知
    const SMS = 'sms';
    // 模板消息
    const TPL_MSG = 'tplMsg';
    // 上传设置
    const STORAGE = 'storage';
    // 小票打印
    const PRINTER = 'printer';
    // 满额包邮设置
    const FULL_FREE = 'full_free';
    // 充值设置
    const RECHARGE = 'recharge';
    // 积分设置
    const POINTS = 'points';
    // 公众号设置
    const OFFICIA = 'officia';
    // 签到有礼
    const SIGN = 'sign';
    // 首页推送
    const HOMEPUSH = 'homepush';
    // 引导收藏
    const COLLECTION = 'collection';
    // 获取手机号
    const GETPHOME = 'getPhone';
    // 系统配置
    const SYS_CONFIG = 'sys_config';
    // 充值设置
    const BALANCE = 'balance';
    // 主体设置
    const THEME = 'theme';
    // 配送设置
    const DELIVER = 'deliver';
    // 团购设置
    const GROUP = 'group';
    // 余额提现设置
    const BALANCE_CASH = 'balance_cash';
    // 直播设置
    const LIVE = 'live';
    // 门店-货币单位
    const CURRENCY = 'currency';
    // 门店-税率管理
    const TAX_RATE = 'tax_rate';
    // 门店-服务费
    const SERVICE_CHARGE = 'service_charge';
    // 各端-收银机设置
    const CASHIER = 'cashier';
    // 各端-平板端设置
    const TABLET = 'tablet';
    // 各端-厨显设置
    const KITCHEN = 'kitchen';
    // 自助餐-自助餐设置
    const BUFFET = 'buffet';


    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            self::STORE => [
                'value' => self::STORE,
                'describe' => __('商城设置'),
            ],
            self::TRADE => [
                'value' => self::TRADE,
                'describe' => __('交易设置'),
            ],
            self::SMS => [
                'value' => self::SMS,
                'describe' => __('短信通知'),
            ],
            self::TPL_MSG => [
                'value' => self::TPL_MSG,
                'describe' => __('模板消息'),
            ],
            self::STORAGE => [
                'value' => self::STORAGE,
                'describe' => __('上传设置'),
            ],
            self::PRINTER => [
                'value' => self::PRINTER,
                'describe' => __('小票打印'),
            ],
            self::FULL_FREE => [
                'value' => self::FULL_FREE,
                'describe' => __('满额包邮设置'),
            ],
            self::RECHARGE => [
                'value' => self::RECHARGE,
                'describe' => __('充值设置'),
            ],
            self::POINTS => [
                'value' => self::POINTS,
                'describe' => __('积分设置'),
            ],
            self::OFFICIA => [
                'value' => self::OFFICIA,
                'describe' => __('公众号设置'),
            ],
            self::SIGN => [
                'value' => self::SIGN,
                'describe' => __('签到有礼'),
            ],
            self::HOMEPUSH => [
                'value' => self::HOMEPUSH,
                'describe' => __('首页推送'),
            ],
            self::COLLECTION => [
                'value' => self::COLLECTION,
                'describe' => __('引导收藏'),
            ],
            self::GETPHOME => [
                'value' => self::GETPHOME,
                'describe' => __('获取手机号'),
            ],
            self::SYS_CONFIG => [
                'value' => self::SYS_CONFIG,
                'describe' => __('系统设置'),
            ],
            self::BALANCE => [
                'value' => self::BALANCE,
                'describe' => __('充值设置'),
            ],
            self::THEME => [
                'value' => self::THEME,
                'describe' => __('主题设置'),
            ],
            self::DELIVER => [
                'value' => self::DELIVER,
                'describe' => __('配送设置'),
            ],
            self::GROUP => [
                'value' => self::GROUP,
                'describe' => __('团购设置'),
            ],
            self::BALANCE_CASH => [
                'value' => self::BALANCE_CASH,
                'describe' => __('余额提现设置'),
            ],
            self::LIVE => [
                'value' => self::LIVE,
                'describe' => __('直播设置'),
            ],
            self::CURRENCY => [
                'value' => self::CURRENCY,
                'describe' => __('货币单位'),
            ],
            self::TAX_RATE => [
                'value' => self::TAX_RATE,
                'describe' => __('税率管理'),
            ],
            self::SERVICE_CHARGE => [
                'value' => self::SERVICE_CHARGE,
                'describe' => __('服务费'),
            ],
            self::CASHIER => [
                'value' => self::CASHIER,
                'describe' => __('收银机设置'),
            ],
            self::TABLET => [
                'value' => self::TABLET,
                'describe' => __('平板端设置'),
            ],
            self::KITCHEN => [
                'value' => self::KITCHEN,
                'describe' => __('厨显设置'),
            ],
            self::BUFFET => [
                'value' => self::BUFFET,
                'describe' => __('自助餐设置'),
            ],
        ];
    }

}