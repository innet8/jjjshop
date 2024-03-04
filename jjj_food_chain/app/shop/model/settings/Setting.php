<?php

namespace app\shop\model\settings;

use think\facade\Cache;
use app\common\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;

class Setting extends SettingModel
{
    /**
     * 更新系统设置
     */
    public function edit($key, $values, $shop_supplier_id = 0)
    {
        $model = self::detail($key, $shop_supplier_id) ?: $this;
        // 删除系统设置缓存
        Cache::set('setting_' . self::$app_id . '_' . $shop_supplier_id, null);
        Cache::tag('common'.$shop_supplier_id)->clear();
        // 删除收银机缓存
        Cache::tag('cashier')->clear();
        // 
        $data = [
            'key' => $key,
            'describe' => SettingEnum::data()[$key]['describe'],
            'values' => $values,
            'app_id' => self::$app_id,
            'shop_supplier_id' => $shop_supplier_id
        ];
        $res = $model->save($data) !== false;
        // 更新其他语言
        if ($key == SettingEnum::STORE && isset($values['language']) && !empty($values['language'])) {
            $names = array_column($values['language'], 'name');
            foreach ([SettingEnum::PRINTER, SettingEnum::CASHIER, SettingEnum::TABLET, SettingEnum::KITCHEN] as $enum) {
                $setting = self::detail($enum, $shop_supplier_id);
                $settingDefaultLanguage = $setting['values']['default_language'] ?? '';
                if (!in_array($settingDefaultLanguage, $names)) {
                    $settingValues = $setting['values'] ?? [];
                    if (isset($settingValues['language']) && !in_array($names[0], $settingValues['language']) ) {
                        $settingValues['language'][] = $names[0];
                        // 对比并删除不匹配的值
                        foreach ($settingValues['language'] as $key => $value) {
                            if (!in_array($value, $names)) {
                                unset($settingValues['language'][$key]);
                            }
                        }
                        $settingValues['language'] = array_values($settingValues['language']);
                    }
                    $settingValues['default_language'] = $names[0];
                    //
                    if (!$setting->isEmpty()) {
                        $setting->values = $settingValues;
                        $setting->save();
                    } else {
                        $settingValues['language'] = $names;
                        $setting->save([
                            'key' => $enum,
                            'values' => $settingValues,
                            'app_id' => self::$app_id,
                            'shop_supplier_id' => $shop_supplier_id
                        ]);
                    }
                }
            }
        }
        //
        return $res;
    }

    /**
     * 数据验证
     */
    private function validValues($key, $values)
    {
        $callback = [
            'store' => function ($values) {
                return $this->validStore($values);
            },
            'printer' => function ($values) {
                return $this->validPrinter($values);
            },
        ];
        // 验证商城设置
        return isset($callback[$key]) ? $callback[$key]($values) : true;
    }

    /**
     * 验证商城设置
     */
    private function validStore($values)
    {
        if (!isset($values['delivery_type']) || empty($values['delivery_type'])) {
            $this->error = '配送方式至少选择一个';
            return false;
        }
        return true;
    }

    /**
     * 验证小票打印机设置
     */
    private function validPrinter($values)
    {
        if ($values['is_open'] == false) {
            return true;
        }
        if (!$values['printer_id']) {
            $this->error = '请选择订单打印机';
            return false;
        }
        if (empty($values['order_status'])) {
            $this->error = '请选择订单打印方式';
            return false;
        }
        return true;
    }

    /**
     * 获取货币信息
     */
    public static function getCurrency($shop_supplier_id = 0, $app_id = null)
    {
        $currency = static::getSupplierItem('currency', $shop_supplier_id, $app_id);
        return [
            'unit' => $currency['unit'],
            'is_open' => $currency['is_open'],
            'vices' => [
                'vice_unit' => $currency['vice_unit'],
                'unit_rate' => $currency['unit_rate'],
            ],
        ];
    }
}
