<?php

namespace app\job\model\plus\driver;

use app\common\model\plus\driver\Order as OrderModel;
use app\common\service\order\OrderService;

/**
 * 配送员订单模型
 */
class Order extends OrderModel
{
    /**
     * 获取未结算的配送员订单
     */
    public function getUnSettledList()
    {
        $list = $this->where('is_invalid', '=', 0)
            ->where('is_settled', '=', 0)
            ->select();
        if ($list->isEmpty()) {
            return $list;
        }
        // 整理订单信息
        $with = ['product'];
        return OrderService::getOrderList($list, 'order_master', $with);
    }

    /**
     * 标记订单已失效(批量)
     */
    public function setInvalid($ids)
    {
        return $this->where('id', 'in', $ids)
            ->save(['is_invalid' => 1]);
    }

}