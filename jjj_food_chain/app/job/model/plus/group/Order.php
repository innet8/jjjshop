<?php

namespace app\job\model\plus\group;

use app\api\model\plus\group\OrderCode;
use app\api\model\plus\group\Order as OrderModel;
use app\api\model\plus\group\Group as GroupModel;
use app\common\service\order\OrderRefundService;

/**
 * 团购模型
 */
class Order extends OrderModel
{
    /**
     * 获取未支付团购ID集
     */
    public function getCloseOrderIds()
    {
        return $this->where('pay_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('pay_end_time', '>', 0)
            ->where('pay_end_time', '<=', time())
            ->where('is_delete', '=', 0)
            ->column('order_id');
    }

    /**
     * 获取已过期团购
     */
    public function getExpiredList()
    {
        return $this->with(['product'])
            ->where('pay_status', '=', 20)
            ->where('order_status', '=', 10)
            ->where('end_time', '<', time())
            ->where('is_delete', '=', 0)
            ->limit(100)
            ->select();
    }

    /**
     * 设置团购过期状态
     */
    public function setIsExpire($orderIds)
    {
        if (empty($orderIds)) {
            return false;
        }
        return $this->where('order_id', 'in', $orderIds)->save(['order_status' => 20]);
    }

    /**
     * 过期订单退款
     */
    public function orderRefund($list)
    {
        $orderIds = [];
        foreach ($list as $order) {
            try {
                // 执行退款操作
                if ((new OrderRefundService)->execute($order, $order['pay_price'])) {
                    // 更新订单状态
                    $order->save(['order_status' => 21]);
                    //更新券码状态
                    (new OrderCode())->where('order_id', '=', $order['order_id'])->update(['code_status' => 40]);
                    //扣除销量
                    (new GroupModel)->reduceSales($order['product']);
                    $orderIds[] = $order['order_id'];
                }
            } catch (\Exception $e) {
                $this->error = '订单ID：' . $order['order_id'] . ' 退款失败，错误信息：' . $e->getMessage();
            }
        }
        return $orderIds;
    }

}
