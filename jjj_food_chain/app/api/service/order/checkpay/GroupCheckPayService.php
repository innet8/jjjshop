<?php

namespace app\api\service\order\checkpay;


use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\order\OrderStatusEnum;

/**
 * 团购订单支付检查服务类
 */
class GroupCheckPayService extends CheckPayService
{
    /**
     * 判断订单是否允许付款
     */
    public function checkOrderStatus($order)
    {
        // 判断商品状态
        if (!$this->checkProductStatus($order)) {
            return false;
        }
        return true;
    }

    /**
     * 判断商品状态、库存 (未付款订单)
     */
    protected function checkProductStatus($order)
    {
        // 判断订单状态
        if (
            $order['order_status']['value'] != OrderStatusEnum::NORMAL
            || $order['pay_status']['value'] != OrderPayStatusEnum::PENDING
        ) {
            $this->error = '很抱歉，当前订单不合法，无法支付';
            return false;
        }
        foreach ($order['product'] as $product) {
            // 判断商品是否下架
            if (empty($product['product']) || $product['product']['group_status'] != 1 || $product['product']['is_delete'] != 0) {
                $this->error = "很抱歉，商品 [{$product['product']['group_name']}] 已下架";
                return false;
            }
        }
        return true;
    }

}