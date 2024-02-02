<?php


namespace app\cashier\event;

use app\common\service\order\OrderPrinterService;
use app\cashier\model\order\Order;
use app\common\model\settings\Setting as SettingModel;

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
        $printerConfig = SettingModel::getSupplierItem('printer', $this->order['shop_supplier_id'], $this->order['app_id']);
        request()->language = $printerConfig['default_language'] ?? '';
        $order = Order::find($this->order->id);
        $order['product'] = $this->order['product'];
        // dump( $this->order['product']->toArray()  );
        // die;

        // 小票打印
        (new OrderPrinterService)->printTicket($order);
        // 菜品打印
        (new OrderPrinterService)->printProductTicket($order, 10);
        // 
        request()->language = '';
    }
}