<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
use app\common\model\product\Product as Product;

/**
 * 产品规格材料关联模型
 */
class ProductSkuMaterial extends BaseModel
{
    protected $name = 'product_sku_material';

    /**
     * 材料信息（产品表）
     */
    public function material()
    {
        return $this->belongsTo(Product::class, 'product_id', 'material_id');
    }

    /**
     * 新增
     */

    public function add($params)
    {
        $data = [
            'spec_id' => $params['spec_id'] ?? 0,
            'product_sku_id' => $params['product_sku_id'] ?? 0,
            'material_id' => $params['product_id'] ?? 0,
            'material_num' => $params['material_num'] ?? 0,
        ];
        return $this->save($data);
    }
}
