<?php

namespace app\kitchen\model\order;

use think\facade\Db;
use app\common\enum\order\OrderStatusEnum;
use app\kitchen\model\order\Order as OrderModel;
use app\common\model\order\OrderProduct as OrderProductModel;

/**
 * 订单记录
 */
class OrderProduct extends OrderProductModel
{
    // 底部显示已完成订单商品数量
    const BOTTOM_FINISH_NUM = 3;

    /**
     * 按订单列表
     */
    public function listByOrder($params)
    {
        Db::connect()->execute("SET SESSION sql_mode = ''");
        //
        $shop_supplier_id = $params['shop_supplier_id'];

        $query = $this->alias('op')
            ->join('order o', 'op.order_id = o.order_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('op.finish_num', '=', 0)
            ->where('o.order_status', '=', OrderStatusEnum::NORMAL) // 订单状态
            ->order(['op.send_kitchen_time' => 'asc']); // 按照送厨时间排序

        if ($shop_supplier_id > 0) {
            $query = $query->where('o.shop_supplier_id', '=', $shop_supplier_id);
        }

        $list = $query->field('o.table_no, o.callNo, op.product_name, op.order_id, op.is_send_kitchen, op.send_kitchen_time')
            ->group('o.order_id')
            ->paginate($params);

        foreach ($list as &$item) {
            $item['serial_no'] = $item['callNo'] ? $item['callNo'] : $item['table_no']; // 流水号
            $orderProducts = $this->where('order_id', '=', $item['order_id'])
                ->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'finish_num', 'finish_time', 'total_num', 'product_attr', 'remark'])
                ->where('is_send_kitchen', '=', 1)
                ->where('finish_num', '=', 0)
                ->order('send_kitchen_time', 'asc')
                ->select();
            $item['order_product'] = $orderProducts;
        }
        unset($item);
        return $list;
    }

    /**
     * 按分类列表
     */
    public function listByCategory($params)
    {
        Db::connect()->execute("SET SESSION sql_mode = ''");
        //
        $shop_supplier_id = $params['shop_supplier_id'];
        $category_id = $params['category_id'] ?? 0;

        $query = $this->alias('op')
            ->join('product p', 'op.product_id = p.product_id', 'left')
            ->join('category c', 'p.category_id = c.category_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('op.finish_num', '=', 0)
            ->where('c.parent_id', '=', 0) // 只查询一级分类
            ->order(['c.sort' => 'asc', 'c.create_time' => 'asc']); // 按照分类排序号和创建时间排序

        if ($shop_supplier_id > 0) {
            $query = $query->where('p.shop_supplier_id', '=', $shop_supplier_id);
        }

        if ($category_id > 0) {
            $query = $query->where('p.category_id', '=', $category_id);
        }

        $list = $query->field('p.product_id, p.product_name, p.category_id, c.name as category_name, c.name as category_name_text, c.parent_id, c.sort as category_sort, op.product_id, op.is_send_kitchen, op.send_kitchen_time')
            ->group('p.category_id')
            ->paginate($params);

        foreach ($list as &$item) {
            // 关联查询出一级分类包含的二级分类产品id
            $productIds = $this->alias('op')
            ->distinct(true)
            ->join('product p', 'op.product_id = p.product_id', 'left')
            ->join('category c', 'p.category_id = c.category_id', 'left')
            ->join('category c2', 'c2.category_id = c.category_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('op.finish_num', '=', 0);
            if ($item['category_id'] > 0) {
                $productIds = $productIds->where(function ($query) use ($item) {
                    $query->where('c.category_id', '=', $item['category_id']) // 一级分类的产品
                        ->whereOr('c2.parent_id', '=', $item['category_id']); // 二级分类的产品
                });
            }
            $productIds = $productIds->column('p.product_id');

            // 分类名称翻译
            $item['category_name_text'] = extractLanguage($item['category_name_text']);
            $orderProducts = $this->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'finish_num', 'finish_time', 'total_num', 'product_attr', 'remark'])
                ->whereIn('product_id', $productIds)
                ->where('is_send_kitchen', '=', 1)
                ->where('finish_num', '=', 0)
                ->order('send_kitchen_time', 'asc')
                ->select();

            // 流水号
            foreach ($orderProducts as &$orderProduct) {
                $order = OrderModel::field('table_no, callNo')->where('order_id', '=', $orderProduct['order_id'])->find();
                $orderProduct['serial_no'] = $order['callNo'] ? $order['callNo'] : $order['table_no'];
            }
            unset($orderProduct);
            $item['order_product'] = $orderProducts;
        }
        unset($item);
        return $list;
    }

    /**
     * 上菜历史
     */
    public function history($params)
    {
        Db::connect()->execute("SET SESSION sql_mode = ''");
        //
        $shop_supplier_id = $params['shop_supplier_id'];

        $query = $this->alias('op')
            ->join('order o', 'op.order_id = o.order_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('op.finish_num', '>', 0)
            ->order(['op.finish_time' => 'desc']); // 按照厨房完成时间倒序

        if ($shop_supplier_id > 0) {
            $query = $query->where('o.shop_supplier_id', '=', $shop_supplier_id);
        }

        $list = $query->field('o.table_no, o.callNo, op.product_name, op.order_id, op.is_send_kitchen, op.send_kitchen_time')
            ->group('o.order_id')
            ->paginate($params);

        foreach ($list as &$item) {
            $item['serial_no'] = $item['callNo'] ? $item['callNo'] : $item['table_no']; // 流水号
            $orderProducts = $this->where('order_id', '=', $item['order_id'])
                ->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'finish_num', 'finish_time', 'total_num', 'product_attr', 'remark'])
                ->where('is_send_kitchen', '=', 1)
                ->where('finish_num', '>', 0)
                ->order('send_kitchen_time', 'asc')
                ->select();
            // 处理时间
            foreach ($orderProducts as &$orderProduct) {
                $orderProduct['send_kitchen_time'] = format_time_his($orderProduct['send_kitchen_time']);
                $orderProduct['finish_time'] = format_time_his($orderProduct['finish_time']);
            }
            $item['order_product'] = $orderProducts;
        }
        unset($item);
        return $list;
    }

    /**
     * 厨房确认
     */
    public function kitchenConfirm($params)
    {
        $order_product_id = $params['order_product_id'];
        $orderProduct = $this->where('order_product_id', '=', $order_product_id)->find();
        if (!$orderProduct) {
            $this->error = '订单商品不存在';
            return false;
        }
        if ($orderProduct['is_send_kitchen'] == 0) {
            $this->error = '订单商品未送厨';
            return false;
        }
        if ($orderProduct['finish_num'] > 0) {
            $this->error = '订单商品已完成';
            return false;
        }
        $orderProduct->finish_num = $orderProduct['total_num'];
        $orderProduct->finish_time = time();
        $orderProduct->save();
        return true;
    }

    /**
     * 厨房恢复
     */
    public function kitchenRecover($params)
    {
        $order_product_id = $params['order_product_id'];
        $orderProduct = $this->where('order_product_id', '=', $order_product_id)->find();
        if (!$orderProduct) {
            $this->error = '订单商品不存在';
            return false;
        }
        if ($orderProduct['is_send_kitchen'] == 0) {
            $this->error = '订单商品未送厨';
            return false;
        }
        if ($orderProduct['finish_num'] == 0) {
            $this->error = '订单商品未完成';
            return false;
        }
        $orderProduct->finish_num = 0;
        $orderProduct->finish_time = 0;
        $orderProduct->save();
        return true;
    }

    /**
     * 底部显示已完成订单商品
     */
    public function getFinishOrderProduct($shop_supplier_id, $num = 5)
    {
        $query = $this->alias('op')
            ->join('order o', 'op.order_id = o.order_id', 'left')
            ->where('op.is_send_kitchen', '=', 1)
            ->where('op.finish_num', '>', 0)
            ->order(['op.finish_time' => 'desc']); // 按照厨房完成时间倒序

        if ($shop_supplier_id > 0) {
            $query = $query->where('o.shop_supplier_id', '=', $shop_supplier_id);
        }

        $list = $query->field(['op.order_product_id', 'op.product_name', 'op.finish_num', 'op.finish_time', 'op.total_num', 'op.product_attr', 'op.remark'])
            ->limit($num)
            ->select();
        return $list ? $list->toArray() : [];
    }
}
