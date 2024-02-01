<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;

/**
 * 商家供应商模型
 */
class Supplier extends BaseModel
{
    protected $name = 'supplier';
    protected $pk = 'shop_supplier_id';

    /**
     * 属性
     */
    public function getDeliveryTimeAttr($value)
    {
        return $value ? json_decode($value, true) : '';
    }

    /**
     * 属性
     */
    public function getPickTimeAttr($value)
    {
        return $value ? json_decode($value, true) : '';
    }

    /**
     * 属性
     */
    public function getDeliverySetAttr($value)
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * 属性
     */
    public function setDeliverySetAttr($value)
    {
        return $value ? json_encode($value) : [];
    }

    /**
     * 属性
     */
    public function getStoreSetAttr($value)
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * 属性
     */
    public function setStoreSetAttr($value)
    {
        return $value ? json_encode($value) : [];
    }

    /**
     * 属性
     */
    public function getStoreTimeAttr($value)
    {
        return $value ? json_decode($value, true) : '';
    }

    /**
     * 关联应用表
     */
    public function app()
    {
        return $this->belongsTo('app\\common\\model\\app\\App', 'app_id', 'app_id');
    }

    /**
     * 关联品牌类型
     */
    public function category()
    {
        return $this->hasOne('app\\common\\model\\supplier\\Category', 'category_id', 'category_id');
    }

    /**
     * 关联business
     */
    public function business()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'business_id');
    }

    /**
     * 关联超管
     */
    public function superUser()
    {
        return $this->hasOne('app\\common\\model\\shop\\User', 'shop_supplier_id', 'shop_supplier_id')
            ->where('is_super', '=', 1);
    }

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 详情
     */
    public static function detail($shop_supplier_id, $with = [])
    {
        return static::with($with)->find($shop_supplier_id);
    }

    /**
     * 累积供应商结算金额 (批量)
     */
    public function onBatchIncSupplierMoney($data)
    {
        foreach ($data as $supplierId => $supplierMoney) {
            $this->where(['shop_supplier_id' => $supplierId])
                ->inc('total_money', $supplierMoney)
                ->inc('money', $supplierMoney)
                ->update();
        }
        return true;
    }

    /**
     * 资金冻结
     */
    public function freezeMoney($money)
    {
        return $this->save([
            'money' => $this['money'] - $money,
            'freeze_money' => $this['freeze_money'] + $money,
        ]);
    }

    /**
     * 获取列表数据
     */
    public static function getAllList()
    {
        $model = new static();
        // 查询列表数据
        return $model->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->select();
    }

    // 平板端获取基础信息
    public static function getTabletBaseInfo()
    {
        $detail = (new self)->withoutGlobalScope()->where('is_delete', '=', 0)->find();
        // 货币信息
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $detail['shop_supplier_id'] ?? 0, $detail['app_id'] ?? 0);
        $detail['currency'] = [
            'unit' => $currency['unit'],
            'is_open' => $currency['is_open'],
            'vices' => [
                'vice_unit' => $currency['vice_unit'],
                'unit_rate' => $currency['unit_rate'],
            ],
        ];
        // 平板端设置
        $tablet = SettingModel::getSupplierItem(SettingEnum::TABLET, $detail['shop_supplier_id'] ?? 0, $detail['app_id'] ?? 0);
        unset($tablet['advanced_password']);
        unset($tablet['language_list']);
        $detail['tablet'] = $tablet;
        // 替换成商家后台设置的名称和logo
        $shop = SettingModel::getSupplierItem(SettingEnum::STORE, $detail['shop_supplier_id'] ?? 0, $detail['app_id'] ?? 0);
        $detail['name'] = $shop['name'];
        $detail['logo'] = $shop['logoUrl'];
        return $detail;
    }
}