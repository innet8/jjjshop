<?php


namespace app\common\model\plus\discount;

use app\common\model\BaseModel;

/**
 * 第二件折扣模型
 */
class Discount extends BaseModel
{
    protected $pk = 'discount_id';
    protected $name = 'discount';

    /**
     * 关联门店
     */
    public function supplier()
    {
        return $this->BelongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联商品
     */
    public function product()
    {
        return $this->hasMany('app\\common\\model\\plus\\discount\\DiscountProduct', 'discount_id', 'discount_id');
    }

    /**
     * 详情
     */
    public static function detail($shop_supplier_id)
    {
        return static::where('shop_supplier_id', '=', $shop_supplier_id)->find();
    }


}