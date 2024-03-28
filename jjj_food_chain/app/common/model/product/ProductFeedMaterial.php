<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
use app\common\model\product\Product as Product;

/**
 * 产品加料材料关联模型
 */
class ProductFeedMaterial extends BaseModel
{
    protected $name = 'product_feed_material';

    /**
     * 材料信息（产品表）
     */
    public function materialProduct()
    {
        return $this->belongsTo(Product::class, 'material_id', 'product_id')->field('product_id, product_name, product_unit');
    }

    /**
     * 新增
     */

     public function add($params)
     {
         $data = [
             'feed_id' => $params['feed_id'],
             'material_id' => $params['product_id'],
             'material_num' => $params['material_num'],
         ];
         return $this->save($data);
     }
}
