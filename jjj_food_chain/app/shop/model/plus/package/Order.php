<?php

namespace app\shop\model\plus\package;

use app\common\model\plus\package\Order as OrderModel;

/**
 * Class Ordre
 * 券包订单
 * @package app\shop\model\plus\package
 */
class Order extends OrderModel
{
    /**
     * 订单列表
     * @param $data
     */
    public function getList($data)
    {
        $model = $this;
        if ($data['search'] != '') {
            $model = $model->where('user.nickName|user.mobile', 'like', '%' . trim($data['search']) . '%');
        }
        return $model->alias('order')->field('order.*')->with(['user'])
            ->join('user', 'user.user_id = order.user_id', 'left')
            ->where('order.package_id', '=', $data['id'])
            ->order('order.create_time', 'desc')
            ->paginate($data);
    }
}