<?php

namespace app\cashier\model\product;

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
        if (isset($params['is_special']) && $params['is_special'] > 0) {
            $model = $model->where('product.special_id', '=', $params['category_id']);
        } else if (isset($params['category_id']) && $params['category_id'] > 0) {
            $categoryIds = Category::where(function ($query) use ($params) {
                    $query->where('category_id', '=', $params['category_id'])
                        ->whereOr('parent_id', '=', $params['category_id']);
                })
                ->where('status', '=', 1)
                ->column('category_id');
            $model = $model->whereIn('product.category_id', $categoryIds);
        } else {
            // 全部
            $categoryIds = Category::alias('c')
                    ->join('category cc', 'c.category_id = IF(cc.parent_id = 0, cc.category_id, cc.parent_id)')
                    ->where('c.status', '=', 1)
                    ->column('c.category_id');
            $model = $model->whereIn('product.category_id', $categoryIds);
        }

        if (!empty($params['search'])) {
            $model = $model->like('product_name', trim($params['search']));
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
