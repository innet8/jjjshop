<?php

namespace app\common\enum\settings;

use MyCLabs\Enum\Enum;
/**
 * 小票打印机类型 枚举类
 */
class PrinterTypeEnum extends Enum
{
    // 飞鹅打印机
    const FEI_E_YUN = 'FEI_E_YUN';

    // 飞鹅标签打印机
    const FEI_E_YUN_TAG = 'FEI_E_YUN_TAG';

    // 365云打印
    const PRINT_CENTER = 'PRINT_CENTER';

    // 商米
    const SUNMI_LAN = 'SUNMI_LAN';
    
    // 芯烨
    const XPRINTER_LAN = 'XPRINTER_LAN';
    

    // 获取打印机类型名称
    public static function getTypeName()
    {
        return [
            self::FEI_E_YUN => __('飞鹅打印机'),
            self::FEI_E_YUN_TAG => __('飞鹅标签打印机'),
            self::PRINT_CENTER => __('365云打印'),
            self::SUNMI_LAN => __('商米打印机（局域网）'),
            self::XPRINTER_LAN => __('芯烨打印机（局域网）'),
        ];
    }

}