<?php


namespace app\common\model\plus\discount;

use app\common\model\BaseModel;

/**
 * 第二件折扣商品模型
 */
class DiscountProduct extends BaseModel
{
    protected $pk = 'discount_product_id';
    protected $name = 'discount_product';

    /**
     * 关联商品
     */
    public function product()
    {
        return $this->BelongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id');
    }

    /**
     * 关联商品图片表
     */
    public function logo()
    {
        return $this->hasOne('app\\common\\model\\product\\ProductImage', 'product_id', 'product_id')->order(['id' => 'asc']);
    }

    /**
     * 查询商品
     */
    public static function getProduct($discount_id, $product_type)
    {
        $list = (new static())->with(['product', 'logo.file'])
            ->where('discount_id', '=', $discount_id)
            ->where('is_delete', '=', 0)
            ->where('product_type', '=', $product_type)
            ->select();
        return $list;
    }

    /**
     * 查询商品是否存在
     */
    public static function getDiscount($product_id)
    {
        return (new static())->alias('p')
            ->join('discount d', 'd.discount_id=p.discount_id')
            ->where('start_time', '<=', time())
            ->where('end_time', '>=', time())
            ->where('product_id', '=', $product_id)
            ->where('stock', '>', 0)
            ->where('is_delete', '=', 0)
            ->find();
    }

    /**
     * 查询商品是否存在折扣
     */
    public static function getDiscountProduct($product_id)
    {
        return (new static())->where('product_id', '=', $product_id)
            ->where('stock', '>', 0)
            ->where('is_delete', '=', 0)
            ->find();
    }


}