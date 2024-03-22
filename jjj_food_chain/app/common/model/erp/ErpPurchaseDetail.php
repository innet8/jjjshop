<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\product\Product;

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
     * 产品信息
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}