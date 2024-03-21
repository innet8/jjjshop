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
            $model = $model->where('special_id', '=', $params['category_id']);
        } else if (isset($params['category_id']) && $params['category_id'] > 0) {
            $categoryIds = Category::where(function ($query) use ($params) {
                    $query->where('category_id', '=', $params['category_id'])
                        ->whereOr('parent_id', '=', $params['category_id']);
                })
                ->where('status', '=', 1)
                ->column('category_id');
            $model = $model->whereIn('category_id', $categoryIds);
        } else {
            // 全部
            $firstLevelCategoryIds = Category::alias('c')
                ->where('c.status', '=', 1)
                ->where('c.parent_id', '=', 0)
                ->column('c.category_id');
            $secondLevelCategoryIds = Category::alias('c')
                ->join('category cc', 'c.parent_id = cc.category_id')
                ->where('c.status', '=', 1)
                ->whereIn('cc.category_id', $firstLevelCategoryIds)
                ->column('c.category_id');
            // 合并一级分类和二级分类
            $categoryIds = array_merge($firstLevelCategoryIds, $secondLevelCategoryIds);
            $model = $model->whereIn('category_id', $categoryIds);
        }

        if (isset($params['search']) && $params['search'] != '') {
            $model = $model->like('product_name', trim($params['search']));
        }
        $model = $model->field([
                'category_id',
                'limit_num',
                'product_id',
                'product_name',
                'product_price',
                'product_stock',
                'spec_type',
                'special_id',
                'sales_actual',
                'sales_initial',
                'product_unit',
                'product_feed',
                'product_attr',
            ]);
        $order_id = $params['order_id'] ?? 0;
        if ($order_id) {
            $model = $model->with([
                    'category',
                    'image.file',
                    'sku' => function($q) {
                        $q->field('product_id,product_price,product_sales,product_sku_id,product_weight,spec_name,spec_sku_id,stock_num');
                    },
                ])
                ->withSum(['orderProducts' => function($q) use ($order_id) {
                    $q->where('order_id', $order_id);
                }], 'total_num');
        } else {
            $model = $model->with([
                    'category',
                    'image.file',
                    'sku' => function($q) {
                        $q->field('product_id,product_price,product_sales,product_sku_id,product_weight,spec_name,spec_sku_id,stock_num');
                    },
                ]);
        }

        return $model->where('is_delete', '=', 0)
            ->where('product_type', '=', 1)
            ->where('shop_supplier_id', '=', $params['shop_supplier_id'])
            ->where('product_status', '=', 10)
            ->order(['product_sort', 'product_id' => 'desc'])
            ->paginate($params)->toArray();
    }
}
