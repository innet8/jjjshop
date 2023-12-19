<?php

namespace app\shop\model\plus\cashier;

use think\facade\Cache;
use app\common\model\plus\cashier\Setting as SettingModel;

class Setting extends SettingModel
{
    /**
     * 更新系统设置
     */
    public function edit($key, $values, $shop_supplier_id = 0)
    {
        $model = self::detail($key, $shop_supplier_id) ?: $this;
        // 删除系统设置缓存
        Cache::delete('setting_cashier' . self::$app_id . '_' . $shop_supplier_id);
        return $model->save([
                'key' => $key,
                'describe' => '基础设置',
                'values' => $values,
                'app_id' => self::$app_id,
                'shop_supplier_id' => $shop_supplier_id
            ]) !== false;
    }

}
