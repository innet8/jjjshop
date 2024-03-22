<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
use app\common\model\product\Product as Product;

/**
 * 产品加料材料关联模型
 */
class ProductSkuMaterial extends BaseModel
{
    protected $name = 'product_feed_material';

    /**
     * 材料信息（产品表）
     */
    public function materials()
    {
        return $this->belongsTo(Product::class, 'product_id', 'material_id');
    }
}
