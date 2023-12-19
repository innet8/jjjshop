<?php

namespace app\shop\controller\plus\driver;

use app\shop\controller\Controller;
use app\shop\model\plus\driver\Order as OrderModel;

/**
 * 配送订单
 */
class Order extends Controller
{

    /**
     * 分销订单列表
     */
    public function index($user_id = null, $is_settled = -1,$order_no='')
    {
        $model = new OrderModel;
        $list = $model->getList($user_id, $is_settled,$order_no);
        return $this->renderSuccess('', compact('list'));
    }

}