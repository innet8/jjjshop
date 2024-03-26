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
             'feed_id' => $params['feed_id'],
             'material_id' => $params['product_id'],
             'material_num' => $params['material_num'],
         ];
         return $this->save($data);
     }
}
