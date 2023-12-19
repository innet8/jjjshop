<?php

namespace app\api\service\order\paysuccess\source;

use app\common\service\order\OrderCompleteService;
use app\common\enum\order\OrderTypeEnum;

/**
 * 扫码订单支付成功后的回调
 */
class ScanPaySuccessService
{
    /**
     * 回调方法
     */
    public function onPaySuccess($order)
    {
        if ($order['settle_type'] == 10 && $order['auto_close'] == 1) {
            $order->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => 30
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$order], $order['app_id']);
        }
        return true;
    }

}