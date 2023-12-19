<?php


namespace app\cashier\event;

use app\common\service\order\OrderPrinterService;
use app\cashier\model\order\Order;

class PaySuccess
{
    public $order;
    public $appId;


    public function handle(Order $order)
    {
        $this->order = $order;
        $this->appId = $order['app_id'];
        // 订单公共业务
        $this->onCommonEvent();
        return true;
    }

    /**
     * 订单公共业务
     */
    private function onCommonEvent()
    {
        // 小票打印
        (new OrderPrinterService)->printTicket($this->order);
        // 菜品打印
        (new OrderPrinterService)->printProductTicket($this->order, 10);
    }
}