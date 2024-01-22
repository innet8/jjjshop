<?php

namespace app\kitchen\model\order;

use think\db\Query;
use app\common\enum\order\OrderStatusEnum;
use app\common\model\order\Order as OrderModel;

/**
 * 订单
 */
class Order extends OrderModel
{

    /**
     * 获取厨显订单列表
     */
    public function getKitchenList($param, $kitchen)
    {
        $model = $this;
        $model = $model->field(['order_id', 'order_status', 'pay_status', 'order_source', 'order_type', 'delivery_status', 'table_no', 'shop_supplier_id', 'create_time']);
        $model = $model->with(['sendKitchenProduct' => function(Query $query){
            $query->field(['order_product_id', 'order_id', 'product_id', 'product_name', 'is_send_kitchen', 'send_kitchen_time', 'image_id', 'spec_sku_id', 'product_sku_id', 'product_attr', 'total_num', 'total_price', 'total_pay_price', 'remark']);
        }]);
        $model = $model->where('shop_supplier_id', '=', $kitchen['shop_supplier_id']);
        $model = $model->where('order_status', '=', OrderStatusEnum::NORMAL);
        $model = $model->order(['create_time' => 'asc']);
        $model = $model->group('table_no');
        return $model->paginate($param);
    }
}