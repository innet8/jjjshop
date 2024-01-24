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

        $query = $this->alias('op')
            ->join('order o', 'op.order_id = o.order_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->order(['op.send_kitchen_time' => 'asc']); // 按照送厨时间排序

        if ($shop_supplier_id > 0) {
            $query = $query->where('o.shop_supplier_id', '=', $shop_supplier_id);
        }

        $list = $query->field('o.table_no, o.callNo, op.product_name, op.order_id, op.is_send_kitchen, op.send_kitchen_time')
            ->group('o.order_id')
            ->paginate($params);

        foreach ($list as $item) {
            $item['serial_no'] = $item['callNo'] ? $item['callNo'] : $item['table_no']; // 流水号
            $orderProducts = $this->where('order_id', '=', $item['order_id'])
                ->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'finish_num', 'total_num', 'product_attr', 'remark'])
                ->order('send_kitchen_time', 'asc')
                ->select();
            $item['order_product'] = $orderProducts;
        }

        return $list;
    }

    /**
     * 按分类列表
     */
    public function listByCategory($params)
    {
        $shop_supplier_id = $params['shop_supplier_id'];
        $category_id = $params['category_id'] ?? 0;

        $query = $this->alias('op')
            ->join('product p', 'op.product_id = p.product_id', 'left')
            ->join('category c', 'p.category_id = c.category_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('c.parent_id', '=', 0) // 只查询一级分类
            ->order(['c.sort' => 'asc', 'c.create_time' => 'asc']); // 按照分类排序号和创建时间排序

        if ($shop_supplier_id > 0) {
            $query = $query->where('p.shop_supplier_id', '=', $shop_supplier_id);
        }

        if ($category_id > 0) {
            $query = $query->where('p.category_id', '=', $category_id);
        }

        $list = $query->field('p.product_id, p.product_name, p.category_id, c.name as category_name, c.parent_id, c.sort as category_sort, op.product_id, op.is_send_kitchen, op.send_kitchen_time')
            ->group('p.category_id')
            ->paginate($params);

        foreach ($list as $item) {
            $item['category_name'] = extractLanguage($item['category_name']); // 分类名称翻译
            $orderProducts = $this->where('product_id', '=', $item['product_id'])
                ->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'finish_num', 'total_num', 'product_attr', 'remark'])
                ->order('send_kitchen_time', 'asc')
                ->select();
            $item['order_product'] = $orderProducts;
        }

        return $list;
    }
}
