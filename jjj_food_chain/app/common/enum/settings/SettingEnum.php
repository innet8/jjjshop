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
    // 货币单位设置
    const CURRENCY = 'currency';
    // 税率设置
    const TAX_RATE = 'tax_rate';
    // 服务费设置
    const SERVICE_CHARGE = 'service_charge';

    /**
     * 获取订单类型值
     */
    public static function data()
    {
        return [
            self::STORE => [
                'value' => self::STORE,
                'describe' => '商城设置',
            ],
            self::TRADE => [
                'value' => self::TRADE,
                'describe' => '交易设置',
            ],
            self::SMS => [
                'value' => self::SMS,
                'describe' => '短信通知',
            ],
            self::TPL_MSG => [
                'value' => self::TPL_MSG,
                'describe' => '模板消息',
            ],
            self::STORAGE => [
                'value' => self::STORAGE,
                'describe' => '上传设置',
            ],
            self::PRINTER => [
                'value' => self::PRINTER,
                'describe' => '小票打印',
            ],
            self::FULL_FREE => [
                'value' => self::FULL_FREE,
                'describe' => '满额包邮设置',
            ],
            self::RECHARGE => [
                'value' => self::RECHARGE,
                'describe' => '充值设置',
            ],
            self::POINTS => [
                'value' => self::POINTS,
                'describe' => '积分设置',
            ],
            self::OFFICIA => [
                'value' => self::OFFICIA,
                'describe' => '公众号设置',
            ],
            self::SIGN => [
                'value' => self::SIGN,
                'describe' => '签到有礼',
            ],
            self::HOMEPUSH => [
                'value' => self::HOMEPUSH,
                'describe' => '首页推送',
            ],
            self::COLLECTION => [
                'value' => self::COLLECTION,
                'describe' => '引导收藏',
            ],
            self::GETPHOME => [
                'value' => self::GETPHOME,
                'describe' => '获取手机号',
            ],
            self::SYS_CONFIG => [
                'value' => self::SYS_CONFIG,
                'describe' => '系统设置',
            ],
            self::BALANCE => [
                'value' => self::BALANCE,
                'describe' => '充值设置',
            ],
            self::THEME => [
                'value' => self::THEME,
                'describe' => '主题设置',
            ],
            self::DELIVER => [
                'value' => self::DELIVER,
                'describe' => '配送设置',
            ],
            self::GROUP => [
                'value' => self::GROUP,
                'describe' => '团购设置',
            ],
            self::BALANCE_CASH => [
                'value' => self::BALANCE_CASH,
                'describe' => '余额提现设置',
            ],
            self::LIVE => [
                'value' => self::LIVE,
                'describe' => '直播设置',
            ],
            self::CURRENCY => [
                'value' => self::CURRENCY,
                'describe' => '货币单位',
            ],
            self::TAX_RATE => [
                'value' => self::TAX_RATE,
                'describe' => '税率管理',
            ],
            self::SERVICE_CHARGE => [
                'value' => self::SERVICE_CHARGE,
                'describe' => '服务费',
            ],
        ];
    }

}