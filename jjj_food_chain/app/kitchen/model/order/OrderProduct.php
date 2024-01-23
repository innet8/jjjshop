<?php

namespace app\kitchen\model\order;

use app\common\model\order\OrderProduct as OrderProductModel;

/**
 * 订单记录
 */
class OrderProduct extends OrderProductModel
{
    /**
     * 按订单列表
     */
    public function listByOrder($params)
    {
        $shop_supplier_id = $params['shop_supplier_id'];
        $model = $this;
        if ($shop_supplier_id > 0) {
            $model = $model->where('order.shop_supplier_id', '=', $shop_supplier_id);
        }
        $model = $model->alias('order_product')
            ->join('order order', 'order_product.order_id = order.order_id', 'left');

        $model = $model->where('order_product.is_send_kitchen', '=', 1);
        $model = $model->order(['order_product.send_kitchen_time' => 'asc']);
        $list = $model->paginate($params);

        $groupedList = [];
        foreach ($list as $item) {
            $groupKey = $item['table_no'] ? $item['table_no'] : $item['callNo'];
            $groupedList[$groupKey][] = $item;
        }

        return $groupedList;
    }

    /**
     * 按分类列表
     */
    public function listByCategory($params)
    {
        $shop_supplier_id = $params['shop_supplier_id'];
        $category_id = $params['category_id'] ?? 0;
        $model = $this;
        if ($shop_supplier_id > 0) {
            $model = $model->where('product.shop_supplier_id', '=', $shop_supplier_id);
        }
        $model = $model->alias('order_product')
            ->join('product product', 'order_product.product_id = product.product_id', 'left');

        if ($category_id > 0) {
            $model = $model->where('product.category_id', '=', $category_id);
        }
        $model = $model->where('order_product.is_send_kitchen', '=', 1);
        $model = $model->order(['product.category_id' => 'asc', 'order_product.send_kitchen_time' => 'asc']);
        $list = $model->paginate($params);

        $groupedList = [];
        foreach ($list as $item) {
            $groupedList[$item['product_name_text']][] = $item;
        }

        return $groupedList;
    }
}
