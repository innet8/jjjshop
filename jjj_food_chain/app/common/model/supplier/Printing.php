<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 菜品打印模型
 */
class Printing extends BaseModel
{
    protected $name = 'supplier_printing';
    protected $pk = 'id';

    /**
     * 获取商品分类
     */
    public function getCategoryIdAttr($value, $data)
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * 设置商品分类
     */
    public function setCategoryIdAttr($value, $data)
    {
        return $value ? json_encode($value) : '';
    }

    /**
     * 获取打印标签
     */
    public function getLabelIdAttr($value, $data)
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * 设置打印标签
     */
    public function setLabelIdAttr($value, $data)
    {
        return $value ? json_encode($value) : '';
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联打印机表
     */
    public function printer()
    {
        return $this->belongsTo('app\\common\\model\\settings\\Printer', 'printer_id', 'printer_id');
    }

    /**
     * 详情
     */
    public static function detail($id, $with = [])
    {
        return static::with($with)->find($id);
    }

    /**
     * 列表
     */
    public function getList($print_type, $shop_supplier_id, $product_type)
    {
        return $this->where('print_type', '=', $print_type)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            // ->where('product_type', '=', $product_type)
            ->where('is_open', '=', 1)
            ->where('is_delete', '=', 0)
            ->select();
    }

    /**
     * 设置状态
     */
    public function setStatus($status)
    {
        return $this->save(['is_open' => $status ? 1 : 0]);
    }

}