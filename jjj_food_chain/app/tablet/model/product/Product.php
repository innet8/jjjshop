<?php

namespace app\tablet\model\product;

use app\common\model\supplier\Supplier;
use app\common\model\product\Product as ProductModel;

/**
 * 商品模型
 */
class Product extends ProductModel
{
    /**
     * 获取商品列表
     */
    public function list($params)
    {
        // 筛选条件
        $model = $this;
        if ($params['category_id'] > 0) {
            $model = $model->where('product.category_id', '=', $params['category_id']);
        }
        if (!empty($params['search'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['search']) . '%');
        }
        if (!empty($params['search'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['search']) . '%');
        }
        // 平板售罄开关开关
        $settingInfo = Supplier::getTabletBaseInfo();
        if (!(isset($settingInfo['tablet']) && $settingInfo['tablet']['is_show_sold_out'])) {
            $model = $model->where('product_stock', '>', 0 );
        }

        $model = $model->alias('product')
            ->field(['product.*'])
            ->with(['category', 'image.file', 'sku'])
            ->where('product.is_delete', '=', 0)
            ->where('product.product_type', '=', 1)
            ->where('product.shop_supplier_id', '=', $params['shop_supplier_id'])
            ->where('product_status', '=', 10)
            ->order(['product_sort', 'product_id' => 'desc']);
        $list = $model->paginate($params);
        return $list;
    }

}
