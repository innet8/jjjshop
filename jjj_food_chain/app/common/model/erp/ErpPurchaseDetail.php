<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\product\Product;
use app\common\model\product\ProductSku;

/**
 * 采购单明细模型
 */
class ErpPurchaseDetail extends BaseModel
{
    protected $name = 'erp_purchase_detail';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [];

    /**
     * 产品规格信息
     */

    public function sku()
    {
        return $this->belongsTo(ProductSku::class, 'product_sku_id', 'product_sku_id')->with(['product']);
    }

    /**
     * 产品信息
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id')->field('product_id, product_name, type, category_id, erp_supplier_id')->with(['sku', 'image', 'image.file', 'erpSupplier', 'erpSupplier.purchaser']);
    }

    /**
     * 根据规格汇总采购数量
     */
    public function sumActualPurchaseNum($product_sku_id)
    {
        return (new ErpPurchaseDetail())->where('product_sku_id', $product_sku_id)->sum('actual_purchase_num');;
    }
}