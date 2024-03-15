<?php

namespace app\common\service\order;

use think\facade\Cache;
use app\common\model\order\OrderProduct;
use app\common\enum\settings\SettingEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\settings\PrinterTypeEnum;
use app\common\enum\settings\DeliveryTypeEnum;
use app\common\model\product\Product as ProductModel;
use app\common\model\settings\Printer as PrinterModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\user\PointsLog as PointsLogModel;
use app\common\library\printer\Driver as PrinterDriver;
use app\common\library\printer\party\SunmiCloudPrinter;
use app\common\model\supplier\Printing as PrintingModel;
use app\common\model\store\Table as TableModel;

/**
 * 订单打印服务类
 */
class OrderPrinterService
{
    // 货币单位
    private $currencyUnit = "฿";

    /**
     * 执行订单打印
     */
    public function printTicket($order)
    {
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem(SettingEnum::PRINTER, $order['shop_supplier_id'], $order['app_id']);
        //
        if (($printerConfig['cashier_open'] ?? '') != 1){
            return;
        }
        // 商米一体机打印
        $cashierPrinterId = intval($printerConfig['cashier_printer_id'] ?? '0');
        if ($cashierPrinterId <= 0) {
            $content = $this->getPrintContent($order, $cashierPrinterId == -1 ? PrinterTypeEnum::XPRINTER_LAN : PrinterTypeEnum::SUNMI_LAN);
            Cache::set("printer_data_cache", array_unique(array_merge(Cache::get("printer_data_cache",[]),[$content])), 60 * 60 * 24);
            return true;
        } else {
            return $this->cashierPrint($printerConfig, $order);
        }

        // todo - 改为只走收银打印机
        // // 商家打印
        // $this->sellerPrint($printerConfig, $order);
        // // 顾客打印
        // $this->buyerPrint($printerConfig, $order);
        // // 厨房打印
        // $this->roomPrint($printerConfig, $order);
    }

    /**
     * 商家打印
     */
    public function sellerPrint($printerConfig, $order, $isForce=false)
    {
        // 判断是否开启商家打印设置
        if ($isForce == false) {
            if (!$printerConfig['seller_open'] || !$printerConfig['seller_printer_id']) {
                return false;
            }
        }
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['seller_printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($order,$printer);
        // 执行打印请求
        return $PrinterDriver->printTicket($content);
    }

    /**
     * 顾客打印
     */
    public function buyerPrint($printerConfig, $order)
    {
        // 判断是否开启商家打印设置
        if (!$printerConfig['buyer_open'] || !$printerConfig['buyer_printer_id']) {
            return false;
        }
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['buyer_printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($order, $printer);
        // 执行打印请求
        return $PrinterDriver->printTicket($content);
    }

    /**
     * 厨房打印
     */
    public function roomPrint($printerConfig, $order)
    {
        // 判断是否开启商家打印设置
        if (!$printerConfig['room_open'] || !$printerConfig['room_printer_id']) {
            return false;
        }
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['room_printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($order, $printer);
        // 执行打印请求
        return $PrinterDriver->printTicket($content);
    }

    /**
     * 收银机打印
     */
    public function cashierPrint($printerConfig, $order)
    {
        // 判断是否开启商家打印设置
        if (!$printerConfig['cashier_open'] || !$printerConfig['cashier_printer_id']) {
            return false;
        }
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['cashier_printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($order, $printer);
        // 执行打印请求
        return $PrinterDriver->printTicket($content, $order['supplier']['name']);
    }

    /**
     * 构建结账订单打印的内容
     */
    private function getPrintContent($order, $printers = null)
    {
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $order['shop_supplier_id'], $order['app_id']);
        if ($currency['unit'] ?? '') {
            $this->currencyUnit = $currency['unit'];
        }
        //
        $shop = SettingModel::getSupplierItem(SettingEnum::STORE, $order['shop_supplier_id'], $order['app_id']);
        $shopName = $shop['name'] ?? $order['supplier']['name'];
        // 
        $products = [];
        foreach ($order['product'] as $product) {
            if (($product['is_buffet_product'] ?? 0) == 1 && $product['total_product_price'] <= 0) {
                continue;
            }
            $key = $product['product_id'] . $product['product_sku_id'] . $product['product_attr'];
            $products[$key] = [
                'product_name' => $product['product_name_text'] . ($product['product_attr'] ?  ' (' . $product['product_attr'] . ')'  : ''),
                "total_num" => bcadd($product['total_num'], $products[$key]['total_num'] ?? 0),
                "total_product_price" => bcadd($product['total_product_price'], $products[$key]['total_product_price'] ?? 0)
            ];
        }

        /* *
        *
        *商米打印机
        *
        */
        if ($printers == PrinterTypeEnum::SUNMI_LAN || ($printers['printer_type']['value'] ?? '') == PrinterTypeEnum::SUNMI_LAN) {
            $printer = new SunmiCloudPrinter(567);
            $printer->appendText( $order->pay_time ? __("结账单") : __("预结账单"));
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("***{$shopName}***\n");
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            $printer->setPrintModes(true, true, false);
            if ($order['table_no']) {
                $printer->appendText(__("桌号").": {$order['table_no']}\n");
                $printer->lineFeed();
            }
            if ($order['callNo']) {
                $printer->appendText(__("取单号").": {$order['callNo']}\n");
                $printer->lineFeed();
            }
            $printer->setLineSpacing(50);
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [260, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("订单号"), $order->order_no);
            if ($order->cashier?->real_name) {
                $printer->printInColumns(__("收银员"), $order->cashier?->real_name);
            }
            if ($order->pay_time) {
                $printer->printInColumns(__("时间"), date('Y-m-d H:i:s', $order->pay_time));
            }
            $printer->lineFeed();
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [320, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [96, SunmiCloudPrinter::ALIGN_CENTER, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0]
            );
            $printer->printInColumns(__("商品"), __("数量"), __("金额"));
            $printer->appendText("------------------------------------------------\n");
            // 自助餐
            if ($order->is_buffet == 1) {
                foreach ($order['buffet'] ?? [] as $buffet) {
                    $printer->printInColumns($buffet['name_text'], strval($buffet['num']), $this->currencyUnit . strval($buffet['total_price']));
                    $printer->lineFeed();
                }
                foreach ($order['delay'] ?? [] as $delay) {
                    $printer->printInColumns($delay['name_text'], strval($delay['num']), $this->currencyUnit . strval($delay['total_price']));
                    $printer->lineFeed();
                }
            }
            // 
            foreach ($products as $product) {
                $printer->printInColumns($product['product_name'], $product['total_num'] . '', $this->currencyUnit . strval($product['total_product_price']));
                $printer->lineFeed();
            }
            //
            $printer->appendText("------------------------------------------------\n");
            $printer->setupColumns(
                [320, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("合计金额"), $this->currencyUnit . strval($order['total_product_price']));
            if ($order['setting_service_money'] > 0) {
                $printer->printInColumns(__("服务费"), $this->currencyUnit . strval($order['setting_service_money']));
            }
            if ($order['consumption_tax_money'] > 0) {
                $printer->printInColumns(__("消费税"), $this->currencyUnit . strval($order['consumption_tax_money']));
            }
            if ($order['discount_money'] > 0) {
                $printer->printInColumns(__("优惠折扣"), $this->currencyUnit . strval($order['discount_money']));
            }
            if ($order['user_discount_money'] > 0) {
                $printer->printInColumns(__("会员折扣"), $this->currencyUnit . strval($order['user_discount_money']));
            }
            if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXPRESS) {
                $printer->printInColumns(__("配送费"), $this->currencyUnit . strval($order['express_price']));
            }
            if ($order['bag_price'] > 0) {
                $printer->printInColumns(__("包装费"), $this->currencyUnit . strval($order['bag_price']));
            }
            if ($order['coupon_money'] > 0) {
                $printer->printInColumns(__("优惠券优惠"), $this->currencyUnit . strval($order['coupon_money']));
            }
            if ($order['fullreduce_money'] > 0) {
                $printer->printInColumns(__("满减优惠"), $this->currencyUnit . strval($order['fullreduce_money']));
            }
            $printer->setPrintModes(true, false, false);
            $printer->printInColumns(__("应收"), $this->currencyUnit . strval($order['pay_price']));
            $printer->setPrintModes(false, false, false);
            //
            if ($order->pay_status['value'] == OrderPayStatusEnum::SUCCESS){
                $printer->lineFeed();
                $printer->appendText("------------------------------------------------\n");
                $printer->printInColumns(__("支付方式"),  $order['pay_type']['text']);
                $printer->printInColumns(__("实付金额"), $this->currencyUnit . strval($order['pay_price']));
            }
            //
            if ($order->user) {
                $printer->lineFeed();
                $printer->appendText("------------------------------------------------\n");
                $printer->printInColumns(__("会员剩余余额"), $this->currencyUnit . strval($order->user->balance));
                $pointnum = PointsLogModel::where('user_id', $order->user_id)->where('order_id',$order->order_id)->value("value") ?: 0;
                $printer->printInColumns(__("本次积分"), strval($pointnum));
            }
            $printer->lineFeed();
            // Print and exit page mode
            $printer->printAndExitPageMode();
            $printer->lineFeed(4);
            $printer->cutPaper(false);
            //
            return $printer->orderData;
        }


        /* *
        *
        *芯烨打印机
        *
        */
        if ($printers == PrinterTypeEnum::XPRINTER_LAN || ($printers['printer_type']['value'] ?? '') == PrinterTypeEnum::XPRINTER_LAN) {
            $width = 47;
            $leftWidth = 29;
            $printer = new SunmiCloudPrinter(567);
            $printer->appendText( $order->pay_time ? __("结账单") : __("预结账单"));
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("***{$shopName}***\n");
            $printer->lineFeed();
            $printer->setPrintModes(true, true, false);
            if ($order['table_no']) {
                $printer->appendText(__("桌号").": {$order['table_no']}\n");
                $printer->lineFeed();
            }
            if ($order['callNo']) {
                $printer->appendText(__("取单号").": {$order['callNo']}\n");
                $printer->lineFeed();
            }
            $printer->setLineSpacing(50);
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->appendText(printText(__("订单号"), '', $order->order_no ,$width));
            $printer->lineFeed();
            $printer->appendText(printText(__("收银员"), '', $order->cashier?->real_name ?: '', $width));
            $printer->lineFeed();
            if ($order->pay_time) {
                $printer->appendText(printText(__("时间"), '', date('Y-m-d H:i:s', $order->pay_time) ,$width));
                $printer->lineFeed();
            }
            $printer->lineFeed();
            //
            $width = 46;
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->appendText(printText(__("商品"), __("数量"), __("金额"), $width, $leftWidth));
            $printer->appendText("\n------------------------------------------------\n");
            // 自助餐
            if ($order->is_buffet == 1) {
                foreach ($order['buffet'] ?? [] as $buffet) {
                    $printer->appendText(printText($buffet['name_text'], strval($buffet['num']), $this->currencyUnit . strval($buffet['total_price']) , $width, $leftWidth + 2));
                    $printer->lineFeed();
                    $printer->lineFeed();
                }
                foreach ($order['delay'] ?? [] as $delay) {
                    $printer->appendText(printText($delay['name_text'], strval($delay['num']) , $this->currencyUnit . strval($delay['total_price']) , $width, $leftWidth + 2));
                    $printer->lineFeed();
                    $printer->lineFeed();
                }
            }
            // 
            foreach ($products as $product) {
                $printer->appendText(printText($product['product_name'], $product['total_num'] . '', $this->currencyUnit . strval($product['total_product_price']) , $width, $leftWidth + 2));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            //
            $printer->appendText("------------------------------------------------\n");
            $printer->appendText(printText(__("合计金额"),'', $this->currencyUnit . strval($order['total_product_price']) , $width, $leftWidth));
            $printer->lineFeed();
            if ($order['setting_service_money'] > 0) {
                $printer->appendText(printText(__("服务费"),'', $this->currencyUnit . strval($order['setting_service_money']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['consumption_tax_money'] > 0) {
                $printer->appendText(printText(__("消费税"),'', $this->currencyUnit . strval($order['consumption_tax_money']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['discount_money'] > 0) {
                $printer->appendText(printText(__("优惠折扣"),'', $this->currencyUnit . strval($order['discount_money']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['user_discount_money'] > 0) {
                $printer->appendText(printText(__("会员折扣"),'', $this->currencyUnit . strval($order['user_discount_money']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXPRESS) {
                $printer->appendText(printText(__("配送费"),'', $this->currencyUnit . strval($order['express_price']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['bag_price'] > 0) {
                $printer->appendText(printText(__("包装费"),'', $this->currencyUnit . strval($order['bag_price']) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['coupon_money'] > 0) {
                $printer->appendText(printText(__("优惠券优惠"),'', $this->currencyUnit . strval($order['coupon_money']) ,$leftWidth, $leftWidth));
                $printer->lineFeed();
            }
            if ($order['fullreduce_money'] > 0) {
                $printer->appendText(printText(__("满减优惠"),'', $this->currencyUnit . strval($order['fullreduce_money']) ,$width , $leftWidth));
                $printer->lineFeed();
            }
            $printer->setPrintModes(true, false, false);
            $printer->appendText(printText(__("应收"),'', $this->currencyUnit . strval($order['pay_price']) , $width, $leftWidth));
            $printer->lineFeed();
            $printer->setPrintModes(false, false, false);
            //
            if ($order->pay_status['value'] == OrderPayStatusEnum::SUCCESS){
                $printer->lineFeed();
                $printer->appendText("------------------------------------------------\n");
                $printer->appendText(printText(__("支付方式"),'', $order['pay_type']['text'] , $width, $leftWidth)."\n");
                $printer->appendText(printText(__("实付金额"),'', $this->currencyUnit . strval($order['pay_price']) , $width , $leftWidth));
                $printer->lineFeed();
            }
            //
            if ($order->user) {
                $printer->lineFeed();
                $printer->appendText("------------------------------------------------\n");
                $printer->appendText(printText(__("会员剩余余额"), '',  $this->currencyUnit . strval($order->user?->balance) ,$width, $leftWidth));
                $pointnum = PointsLogModel::where('user_id', $order->user_id)->where('order_id',$order->order_id)->value("value") ?: 0;
                $printer->appendText(printText(__("本次积分"), '',  strval($pointnum) ,$width, $leftWidth));
                $printer->lineFeed();
            }
            $printer->lineFeed();
            // Print and exit page mode
            $printer->printAndExitPageMode();
            $printer->lineFeed(4);
            $printer->cutPaper(false);
            //
            return $printer->orderData;
        }

        /* *
        *
        *飞蛾打印机
        *
        */
        $width = 32;
        $leftWidth = 16;
        $content = ($order->pay_time ? __("结账单") : __("预结账单")).'<BR><BR>';
        $content .= "<C>***{$shopName}***</C><BR>";
        if ($order['table_no']) {
            $content .= "<CB>".__('桌号')."：{$order['table_no']}</CB><BR>";
        }
        if ($order['callNo']) {
            $content .= "<CB>".__('取单号')."：{$order['callNo']}</CB><BR>";
        }
        $content .= printText(__('订单号'), '', $order->order_no) . "<BR>";
        $content .= printText(__('收银员'), '', $order->cashier?->real_name) . "<BR>";
        if ($order->pay_time) {
            $content .= printText(__('时间'), '',  date('Y-m-d H:i:s', $order->pay_time)) . "<BR><BR>";
        }
        //
        $content .= printText(__('商品'), __('数量'),  __('金额'), $width, $leftWidth);
        $content .= "--------------------------------<BR>";
        // 自助餐
        if ($order->is_buffet == 1) {
            foreach ($order['buffet'] ?? [] as $buffet) {
                $content .= printText($buffet['name_text'], strval($buffet['num']), $this->currencyUnit . strval($buffet['total_price']) , $width, $leftWidth + 2);
            }
            foreach ($order['delay'] ?? [] as $delay) {
                $content .= printText($delay['name_text'], strval($delay['num']), $this->currencyUnit . strval($delay['total_price']) , $width, $leftWidth + 2);
            }
        }
        foreach ($products as $product) {
            $content .= printText($product['product_name'], $product['total_num'] . '', $this->currencyUnit . strval($product['total_product_price']) , $width, $leftWidth + 2);
        }
        //
        $content .= "--------------------------------<BR>";
        $content .= printText(__('合计金额'), '', $this->currencyUnit . strval($order['total_product_price'])) . "<BR>";
        if ($order['setting_service_money'] > 0) {
            $content .= printText(__('服务费'), '', $this->currencyUnit . strval($order['setting_service_money'])) . "<BR>";
        }
        if ($order['consumption_tax_money'] > 0) {
            $content .= printText(__('消费税'), '', $this->currencyUnit . strval($order['consumption_tax_money'])) . "<BR>";
        }
        if ($order['discount_money'] > 0) {
            $content .= printText(__('优惠折扣'), '', $this->currencyUnit . strval($order['discount_money'])) . "<BR>";
        }
        if ($order['user_discount_money'] > 0) {
            $content .= printText(__('会员折扣'), '', $this->currencyUnit . strval($order['user_discount_money'])) . "<BR>";
        }
        if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXPRESS) {
            $content .= printText(__('配送费'), '', $this->currencyUnit . strval($order['express_price'])) . "<BR>";
        }
        if ($order['bag_price'] > 0) {
            $content .= printText(__('包装费'), '', $this->currencyUnit . strval($order['bag_price'])) . "<BR>";
        }
        if ($order['coupon_money'] > 0) {
            $content .= printText(__('优惠券优惠'), '', $this->currencyUnit . strval($order['coupon_money'])) . "<BR>";
        }
        if ($order['fullreduce_money'] > 0) {
            $content .= printText(__('满减优惠'), '', $this->currencyUnit . strval($order['fullreduce_money'])) . "<BR>";
        }
        $content .= '<BOLD>' . printText(__('应收'), '', $this->currencyUnit . strval($order['total_product_price'])) . "</BOLD><BR>";
        //
        $content .= '--------------------------------<BR>';
        $content .= printText(__('支付方式'), '', $order['pay_type']['text']) . "<BR>";
        $content .= printText(__('实付金额'), '', $this->currencyUnit . strval($order['pay_price'])) . "<BR>";
        //
        if ($order->user) {
            $content .= '--------------------------------<BR>';
            $content .= printText(__('会员剩余余额'), '', $this->currencyUnit . $order->user->balance) . "<BR>";
            $pointnum = PointsLogModel::where('user_id', $order->user_id)->where('order_id',$order->order_id)->value("value") ?: 0;
            $content .= printText(__('本次积分'), '', $pointnum ) . "<BR>";
        }
        return $content;
    }

    /**
     * 执行取号打印
     */
    public function printQueueTicket($data, $printer_id)
    {
        // 获取当前的打印机
        $printer = PrinterModel::detail($printer_id);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getQueuePrintContent($data);
        // 执行打印请求
        return $PrinterDriver->printTicket($content);
    }

    /**
     * 构建取号打印的内容
     */
    private function getQueuePrintContent($data)
    {
        $time = date('Y-m-d H:i:s');
        // 拼接模板内容
        $content = "<C>-------{$data['name']}-------</C><BR>";
        $content .= "<BR>";
        $content .= "<CB>{$data['queue_no']}</CB><BR>";
        $content .= "<BR>";
        $content .= "<C>排队中{$data['wait_num']}人</C><BR>";
        $content .= "<C>一次有效  过号作废</C><BR>";
        $content .= "<C>{$time}</C><BR>";
        $content .= '--------------------------------<BR>';
        return $content;
    }

    // 判断分类
    public function verifyPrintProductTicket($product, $item)
    {
        $prodcutDetail = ProductModel::where('product_id', '=', $product['product_id'])->find();
        if (empty($prodcutDetail)) {
            return false;
        }
        // 过滤商品不需要送厨的商品
        if ($prodcutDetail->is_show_kitchen != 1) {
            return false;
        }
        // 
        if ($item['print_method'] == 20) {
            if (
                $item['category_id']
                && !in_array($prodcutDetail->special_id, $item['category_id'])
                && !in_array($prodcutDetail->category_id, $item['category_id'])
                && !in_array($prodcutDetail->category?->parent_id ?? 0, $item['category_id'])
            ) {
                return false;
            }
        } elseif ($item['print_method'] == 30) {
            if ($item['label_id'] && !in_array($prodcutDetail['label_id'], $item['label_id'])) {
                return false;
            }
        }
        return $prodcutDetail;
    }

    /**
     * 菜品打印 
     */
    public function printProductTicket($order, $print_type)
    {
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem(SettingEnum::PRINTER, $order['shop_supplier_id'], $order['app_id']);
        request()->language = $printerConfig['default_language'] ?? '';
        //打印列表
        $list = (new PrintingModel)->getList($print_type, $order['shop_supplier_id'], $order['order_type']);
        $areaId = $order->table_id > 0 ? TableModel::detail($order->table_id)?->area_id : 0;
        // 
        if (count($list) > 0) {
            foreach ($list as $item) {
                // 小票打印才走
                if ($item['type'] != 10) {
                    continue;
                }
                // 区域对的上才走
                if ($item['area_id'] && !in_array($areaId, $item['area_id'])) {
                    continue;
                }
                // 获取当前的打印机
                $printer = PrinterModel::detail($item['printer_id']);
                if (empty($printer) || $printer['is_delete']) {
                    continue;
                }
                $printerDriver = new PrinterDriver($printer);
                // 10整单打印 20商品分类打印 30按标签打印 40一菜一單打印
                if ($item['print_method'] == 40) {
                    foreach ($order['product'] as $product) {
                        // 获取订单打印内容
                        $content = $this->getPrintProductOneContent($item, $order, $printer, $product);
                        // 执行打印请求
                        $content && $printerDriver->printTicket($content);
                    }
                } else {
                    $isPrinter = false;
                    foreach ($order['product'] as $product) {
                        if (!$this->verifyPrintProductTicket($product,$item)) {
                            continue;
                        }
                        if(($item['is_open_one_food'] ?? 0) == 1) {
                            // 获取订单打印内容
                            $content = $this->getPrintProductOneContent($item, $order, $printer, $product);
                            // 执行打印请求
                            $content && $printerDriver->printTicket($content);
                        } else {
                            $isPrinter = true;
                        }
                    }
                    if ($isPrinter) {
                        // 获取订单打印内容
                        $content = $this->getPrintProductContent($item, $order, $printer);
                        //执行打印请求
                        $content && $printerDriver->printTicket($content);
                    }
                }
            }
            request()->language = '';
            return true;
        }
        request()->language = '';
        return false;
    }

    /**
     * 构建订单菜品（整单）打印的内容
     */
    private function getPrintProductContent($data, $order, $printer = null, $products = null)
    {
        $printerType = $printer['printer_type']['value'];
        $isThai =  preg_match('/[\p{Thai}]/u', __("金额"));
        $isEn =  preg_match('/^[A-Za-z]+$/u', __("数量"));

        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem(SettingEnum::PRINTER, $order['shop_supplier_id'], $order['app_id']);
        $buffetSignOpen = (int)($printerConfig['buffet_sign_open'] ?? 1);

        /* *
        *
        *商米 和 芯烨 打印机
        *
        */
        if ($printer && ( $printerType == PrinterTypeEnum::SUNMI_LAN || $printerType == PrinterTypeEnum::XPRINTER_LAN)) {
            $width = 48 - ($isThai ? 2 : 0);
            $printer = new SunmiCloudPrinter(567);
            if($printerType != PrinterTypeEnum::XPRINTER_LAN){
                $printer->lineFeed();
            }
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->setPrintModes(true, true, false);
            if ($order['table_no']) {
                $printer->appendText(__("桌号")."：{$order['table_no']}\n");
            }
            if ($order['callNo']) {
                $printer->appendText(__("取单号")."：{$order['callNo']}\n");
            }
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [260, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("订单号"), $order->order_no);
            $printer->printInColumns(__("时间"), $order->update_time);
            $printer->lineFeed();
            //
            $printer->setupColumns(
                [360, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            if ($printerType != PrinterTypeEnum::SUNMI_LAN && $isEn) {
                $printer->appendText(printText(__("商品"), '',__("数量"), $width));
                $printer->appendText("\n------------------------------------------------\n");
            } else {
                $printer->printInColumns(__("商品"), __("数量"));
                $printer->appendText("------------------------------------------------\n");
            }
            $printer->setupColumns(
                [360 , SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            // 
            $isPrinter = false;
            foreach ($order['product'] as $product) {
                if (!$prodcutDetail = $this->verifyPrintProductTicket($product, $data)) {
                    continue;
                }
                if ($products && md5(json_encode($products)) != md5(json_encode($product))) {
                    continue;
                }
                // 
                $buffetText = ($buffetSignOpen && $product['is_buffet_product'] == 1) ? (__('自助餐').'-') : '';
                $productAttr = (new OrderProduct)->getProductAttrAttr($product['product_attr']);
                $productName = $buffetText . $prodcutDetail['product_name_text'] . ($productAttr ?  ' (' . $productAttr . ')'  : '');
                $printer->printInColumns($productName, $product['total_num'] . '');
                if ($product['remark']  ?? '') {
                    $printer->printInColumns($product['remark']);
                    $printer->lineFeed();
                }
                $printer->lineFeed();
                // 
                $isPrinter = true;
            }
            if (!$isPrinter) {
                return "";
            }
            $printer->lineFeed();
            $printer->lineFeed();
            if($printerType == PrinterTypeEnum::XPRINTER_LAN){
                $printer->lineFeed();
            }
            // Print and exit page mode
            $printer->printAndExitPageMode();
            $printer->lineFeed(4);
            $printer->cutPaper(false);
            //
            return $printer->orderData;
        }

        /* *
        *
        *飞蛾打印机
        *
        */
        $width = 32;
        $content = '';
        if ($order['table_no']) {
            $content = "<CB>".__('桌号')."：{$order['table_no']}</CB><BR>";
        }
        if ($order['callNo']) {
            $content = "<CB>".__('取单号')."：{$order['callNo']}</CB><BR>";
        }
        $content .= printText(__('订单号'), '', $order->order_no) . "<BR>";
        $content .= printText(__('时间'), '',  $order->update_time) . "<BR><BR>";
        //
        $content .= printText(__('商品'), '',  __('数量'));
        $content .= "--------------------------------<BR>";
        foreach ($order['product'] as $product) {
            if (!$prodcutDetail = $this->verifyPrintProductTicket($product, $data)) {
                continue;
            }
            if ($products && md5(json_encode($products)) != md5(json_encode($product))) {
                continue;
            }
            $buffetText = ($buffetSignOpen && $product['is_buffet_product'] == 1) ? (__('自助餐').'-') : '';
            $productAttr = (new OrderProduct)->getProductAttrAttr($product['product_attr']);
            $productName = $buffetText . $prodcutDetail['product_name_text'] . ($productAttr ?  ' (' . $productAttr . ')'  : '');
            $content .= printText($productName, '', ''.$product['total_num'], $width, 26);
            if ($product['remark'] ?? '') {
                $content .= '<TEXT x="10" y="180" font="10" w="-1" h="-1" r="0">' . $product['remark'] . '</TEXT>';
            }
            $content .= '<BR><BR>';
        }
        return $content. '<BR><BR>';
    }


    /**
     * 构建订单菜品（一菜一单）打印的内容
     */
    private function getPrintProductOneContent($data, $order, $printer = null, $products = null)
    {
        $printerType = $printer['printer_type']['value'];
        $isThai =  preg_match('/[\p{Thai}]/u', __("金额"));
        $isEn =  preg_match('/^[A-Za-z]+$/u', __("数量"));

        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem(SettingEnum::PRINTER, $order['shop_supplier_id'], $order['app_id']);
        $buffetSignOpen = (int)($printerConfig['buffet_sign_open'] ?? 1);

        /* *
        *
        *商米 和 芯烨 打印机
        *
        */
        if ($printer && ( $printerType == PrinterTypeEnum::SUNMI_LAN || $printerType == PrinterTypeEnum::XPRINTER_LAN)) {
            $width = 48 - ($isThai ? 2 : 0);
            $printer = new SunmiCloudPrinter(567);
            if($printerType != PrinterTypeEnum::XPRINTER_LAN){
                $printer->lineFeed();
            }
            $printer->restoreDefaultLineSpacing();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [260, SunmiCloudPrinter::ALIGN_LEFT, 2],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 6],
            );
            if ($order['table_no']) {
                $printer->printInColumns($order->update_time, __("桌号").": {$order['table_no']}" . ($order['meal_num'] ? " ({$order['meal_num']})" : ''));
            }
            if ($order['callNo']) {
                $printer->printInColumns($order->update_time, __("取单号").": {$order['callNo']}" . ($order['meal_num'] ? " ({$order['meal_num']})" : ''));
            }
            $printer->lineFeed();
            // 
            $printer->setPrintModes(true, true, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $isPrinter = false;
            foreach ($order['product'] as $product) {
                if (!$prodcutDetail = $this->verifyPrintProductTicket($product, $data)) {
                    continue;
                }
                if ($products && md5(json_encode($products)) != md5(json_encode($product))) {
                    continue;
                }
                // 
                $buffetText = ($buffetSignOpen && $product['is_buffet_product'] == 1) ? (__('自助餐').' - ') : '';
                $productAttr = (new OrderProduct)->getProductAttrAttr($product['product_attr']);
                $productName = $buffetText . $prodcutDetail['product_name_text'] . ($productAttr ?  ' (' . $productAttr . ')'  : '');
                $printer->appendText($productName .'    X' .$product['total_num'] . '');
                if ($product['remark']  ?? '') {
                    $printer->lineFeed();
                    $printer->lineFeed();
                    $printer->setPrintModes(false, false, false);
                    $printer->appendText($product['remark']);
                }
                $printer->lineFeed();
                // 
                $isPrinter = true;
            }
            if (!$isPrinter) {
                return "";
            }
            $printer->lineFeed();
            $printer->lineFeed();
            if($printerType == PrinterTypeEnum::XPRINTER_LAN){
                $printer->lineFeed();
            }
            // Print and exit page mode
            $printer->printAndExitPageMode();
            $printer->lineFeed(4);
            $printer->cutPaper(false);
            //
            return $printer->orderData;
        }

        /* *
        *
        *飞蛾打印机
        *
        */
        $width = 32;
        $content = '';
        if ($order['table_no']) {
            $content = "<CB>".__('桌号')."：{$order['table_no']}</CB><BR>";
        }
        if ($order['callNo']) {
            $content = "<CB>".__('取单号')."：{$order['callNo']}</CB><BR>";
        }
        $content .= printText(__('订单号'), '', $order->order_no) . "<BR>";
        $content .= printText(__('时间'), '',  $order->update_time) . "<BR><BR>";
        //
        $content .= printText(__('商品'), '',  __('数量'));
        $content .= "--------------------------------<BR>";
        foreach ($order['product'] as $product) {
            if (!$prodcutDetail = $this->verifyPrintProductTicket($product, $data)) {
                continue;
            }
            if ($products && md5(json_encode($products)) != md5(json_encode($product))) {
                continue;
            }
            $buffetText = ($buffetSignOpen && $product['is_buffet_product'] == 1) ? (__('自助餐').'-') : '';
            $productAttr = (new OrderProduct)->getProductAttrAttr($product['product_attr']);
            $productName = $buffetText . $prodcutDetail['product_name_text'] . ($productAttr ?  ' (' . $productAttr . ')'  : '');
            $content .= printText($productName, '', ''.$product['total_num'], $width, 26);
            if ($product['remark'] ?? '') {
                $content .= '<TEXT x="10" y="180" font="10" w="-1" h="-1" r="0">' . $product['remark'] . '</TEXT>';
            }
            $content .= '<BR><BR>';
        }
        return $content. '<BR><BR>';
    }

    /**
     * 构建订单标签打印的内容
     */
    private function getPrintTagProductContent($data, $order, $printer)
    {
        $content = '';
        $num = 0;
        if ($data['print_method'] == 10) {
            $num = count($order['product']);
        } elseif ($data['print_method'] == 20) {
            foreach ($order['product'] as $product) {
                $prodcutDetail = ProductModel::detail($product['product_id']);
                if ($data['category_id'] && !in_array($prodcutDetail['special_id'], $data['category_id']) && !in_array($prodcutDetail['category_id'], $data['category_id'])) {
                    continue;
                }
                $num++;
            }

        } elseif ($data['print_method'] == 30) {
            foreach ($order['product'] as $item) {
                $prodcutDetail = ProductModel::detail($item['product_id']);
                if ($data['label_id'] && !in_array($prodcutDetail['label_id'], $data['label_id'])) {
                    continue;
                }
                $num++;
            }
        }
        if ($num < 1) {
            return false;
        }
        $i = 1;
        foreach ($order['product'] as $key => $value) {
            $prodcutDetail = ProductModel::detail($value['product_id']);
            if ($data['print_method'] == 20) {
                if ($data['category_id'] && !in_array($prodcutDetail['special_id'], $data['category_id']) && !in_array($prodcutDetail['category_id'], $data['category_id'])) {
                    continue;
                }
            } elseif ($data['print_method'] == 30) {
                if ($data['label_id'] && !in_array($prodcutDetail['label_id'], $data['label_id'])) {
                    continue;
                }
            }
            $date = date('m/d');
            $time = date('H:i');
            $content = '<TEXT x="10" y="10" font="12" w="1" h="1" r="0">#' . $order['order_id'] . '  ' . $date . ' ' . $time . '  ' . $i . '/' . $num . '</TEXT>';
            $content .= '<TEXT x="10" y="70" font="12" w="1" h="2" r="0">' . $value["product_name"] . '</TEXT>';
            if ($value['product_attr']) {
                $content .= '<TEXT x="10" y="150" font="12" w="1" h="1" r="0">' . $value["product_attr"] . '</TEXT>';
            }
            if (!empty($order['buyer_remark'])) {
                $content .= '<TEXT x="10" y="180" font="12" w="1" h="1" r="0">' . $this->LR('备注：' . $order['buyer_remark'], '', 24) . '</TEXT>';
            }
            $content .= '<TEXT x="10" y="210" font="12" w="1" h="1" r="0">' . $this->LR($order['supplier']['link_phone'], $order['supplier']['name'], 24) . '</TEXT>';

            //40mm宽度标签纸一行占用26个字符，50mm宽度标签纸请改成32个字符
            $i += 1;
            // 执行打印请求
            // 实例化打印机驱动
            $PrinterDriver = new PrinterDriver($printer);
            $PrinterDriver->printTicket($content);
        }
        return $content;
    }

    /**
     * [统计字符串字节数补空格，实现左右排版对齐]
     * @param  [string] $str_left    [左边字符串]
     * @param  [string] $str_right   [右边字符串]
     * @param  [int]    $length      [输入当前纸张规格一行所支持的最大字母数量]
     *                               58mm的机器,一行打印16个汉字,32个字母;76mm的机器,一行打印22个汉字,33个字母,80mm的机器,一行打印24个汉字,48个字母
     *                               标签机宽度50mm，一行32个字母，宽度40mm，一行26个字母
     * @return [string]              [返回处理结果字符串]
     */
    private function LR($str_left, $str_right, $length)
    {
        $kw = '';
        $str_left_lenght = strlen(iconv("UTF-8", "GBK//IGNORE", $str_left));
        $str_right_lenght = strlen(iconv("UTF-8", "GBK//IGNORE", $str_right));
        $k = $length - ($str_left_lenght + $str_right_lenght);
        for ($q = 0; $q < $k; $q++) {
            $kw .= ' ';
        }
        return $str_left . $kw . $str_right;
    }

}