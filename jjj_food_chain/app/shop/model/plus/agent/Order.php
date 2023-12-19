<?php

namespace app\shop\model\plus\agent;

use app\common\model\plus\agent\Order as OrderModel;
use app\common\service\order\OrderService;

/**
 * 分销商订单模型
 */
class Order extends OrderModel
{
    /**
     * 获取分销商订单列表
     */
    public function getList($param)
    {
        $model = $this;
        // 检索查询条件
        if (isset($param['user_id']) && $param['user_id']) {
            $model = $model->where('first_user_id|second_user_id|third_user_id', '=', $param['user_id']);
        }
        if (isset($param['is_settled']) && $param['is_settled'] > -1) {
            $model = $model->where('is_settled', '=', $param['is_settled']);
        }
        // 获取分销商订单列表
        $data = $model->with([
            'agent_first',
            'agent_second',
            'agent_third'
        ])
            ->order(['create_time' => 'desc'])
            ->paginate($param);
        if ($data->isEmpty()) {
            return $data;
        }
        // 获取订单的主信息
        $with = ['product' => ['image'], 'address', 'user'];
        return OrderService::getOrderList($data, 'order_master', $with);
    }

}