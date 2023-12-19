<?php

namespace app\api\model\plus\group;

use app\common\model\plus\group\OrderCode as OrderCodeModel;
use app\api\model\plus\group\Order as OrderModel;

/**
 * 团购订单码模型
 */
class OrderCode extends OrderCodeModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [];

    //添加券码
    public function add($order)
    {
        $total_num = $order['product'][0]['total_num'];
        $data = [];
        for ($i = 1; $i <= $total_num; $i++) {
            $data[] = [
                'order_id' => $order['order_id'],
                'order_product_id' => $order['product'][0]['order_product_id'],
                'code_no' => (new OrderModel())->orderNo(),
                'group_price' => $order['product'][0]['group_price'],
                'app_id' => $order['app_id']
            ];
        }
        $data && $this->saveAll($data);
    }

}