<?php

namespace app\shop\model\plus\driver;

use app\common\model\plus\driver\Order as OrderModel;
use app\common\service\order\OrderService;

/**
 * 配送员订单模型
 */
class Order extends OrderModel
{
    /**
     * 获取配送员订单列表
     */
    public function getList($user_id = null, $is_settled = -1,$order_no='')
    {
        $model = $this;
        // 检索查询条件
        if ($user_id > 1) {
            $model = $model->where('a.user_id', '=', $user_id);
        }
        if ($is_settled > -1) {
            $model = $model->where('a.is_settled', '=', $is_settled);
        }
        if ($order_no) {
            $model = $model->where('o.order_no', '=', $order_no);
        }
        // 获取配送员订单列表
        $data = $model->alias('a')
            ->join('order o','o.order_id=a.order_id')
            ->with(['driverUser'])
            ->field('a.*')
            ->order(['a.create_time' => 'desc'])
            ->paginate(15, false, [
                'query' => \request()->request()
            ]);
        if ($data->isEmpty()) {
            return $data;
        }
        // 获取订单的主信息
        $with = ['product' => ['image'], 'address', 'user'];
        return OrderService::getOrderList($data, 'order_master', $with);
    }

}