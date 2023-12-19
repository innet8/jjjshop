<?php

namespace app\api\service\order\checkpay;

use app\common\enum\product\DeductStockTypeEnum;

/**
 * 积分订单支付检查服务类
 */
class PointsCheckPayService extends CheckPayService
{
    /**
     * 判断订单是否允许付款
     */
    public function checkOrderStatus($order)
    {
        // 判断订单状态
        if (!$this->checkOrderStatusCommon($order)) {
            return false;
        }
        // 判断商品状态、库存
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
        // 判断商品是否下架
        if (
            empty($order['product'])
            || $order['product']['product_status']['value'] != 10
        ) {
            $this->error = "很抱歉，商品 [{$order['product']['product_name']}] 已下架";
            return false;
        }
        // 付款减库存
        if ($order['total_num'] > $order['product']['product_stock']) {
            $this->error = "很抱歉，商品 [{$order['product']['product_name']}] 库存不足";
            return false;
        }
        return true;
    }

}