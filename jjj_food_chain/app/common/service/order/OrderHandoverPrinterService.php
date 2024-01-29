<?php

namespace app\common\service\order;

use think\facade\Cache;
use app\common\library\helper;
use app\common\model\shop\User;
use app\cashier\model\order\Order;
use app\common\enum\settings\SettingEnum;
use app\common\enum\settings\PrinterTypeEnum;
use app\common\model\settings\Printer as PrinterModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\library\printer\Driver as PrinterDriver;
use app\common\library\printer\party\SunmiCloudPrinter;
use app\common\model\product\Category as CategoryModel;

/**
 * 交班数据打印服务类
 */
class OrderHandoverPrinterService
{
    // 货币单位
    private $currencyUnit = "฿";

    /**
     * 收银打印
     */
    public function cashierPrint($printerConfig, $data)
    { 
        if (($printerConfig['cashier_open'] ?? '') != 1){
            return;
        }
        // 
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $data['shop_supplier_id'], $data['app_id']);
        if ($currency['unit'] ?? '') {
            $this->currencyUnit = $currency['unit'];
        }
        // 商米一体机打印
        if (($printerConfig['cashier_printer_id'] ?? '0') == '0') {
            $content = $this->getPrintContent(PrinterTypeEnum::SUNMI_LAN,$data);
            $content = hex2bin($content);
            $content = iconv("UTF-8", "UTF-8//IGNORE", $content);
            $content = bin2hex($content);
            Cache::set("printer_data_cache", array_unique(array_merge(Cache::get("printer_data_cache",[]),[$content])), 60 * 60 * 24);
            return true;
        } else {
            // 获取当前的打印机
            $printer = PrinterModel::detail($printerConfig['cashier_printer_id']);
            if (empty($printer) || $printer['is_delete']) {
                return false;
            }
            // 实例化打印机驱动
            $printerDriver = new PrinterDriver($printer);
            // 获取订单打印内容
            $content = $this->getPrintContent($printer, $data);
            // 执行打印请求
            $user = User::where('shop_user_id',$data['shift_user_id'])->find();
            // 
            return $printerDriver->printTicket($content, $user['supplier']['name']);
        }
    }

    /**
     * 构建订单打印的内容
     */
    private function getPrintContent($printers, $data)
    {
        $startTime = $data['shift_start_time'];
        $endTime = $data['shift_end_time'];
        $totalIncome = number_format(helper::bcadd($data['total_income'] ?? 0, $data['refund_amount'] ?? 0), 2);
        $previousShiftCash = number_format($data['previous_shift_cash'], 2);
        $cashTakenOut = number_format($data['cash_taken_out'], 2);
        $cashLeft = number_format($data['cash_left'], 2);
        $user = User::where('shop_user_id',$data['shift_user_id'])->find();
        $isThai =  preg_match('/[\p{Thai}]/u', __("金额"));
        $categorys = Order::alias('a')
            ->leftJoin('order_product rp','a.order_id = rp.order_id')
            ->leftJoin('product p','p.product_id = rp.product_id')
            ->leftJoin('category c','c.category_id = p.category_id')
            ->where('a.pay_status', '=', 20)
            ->where('a.order_status', '=', 30)
            ->where('a.eat_type', '<>', 0)
            ->where('a.shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('a.create_time', 'between', [$startTime, $endTime])
            ->group("c.category_id")
            ->field("c.name, count(a.order_id) as sales, sum(a.pay_price - a.refund_money) as prices")
            ->select()
            ->append([])?->toArray();

        /* *
        *
        *商米打印机
        *
        */
        if (!is_string($printers) && $printers['printer_type']['value'] == PrinterTypeEnum::SUNMI_LAN) {
            $printer = new SunmiCloudPrinter(567);
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("***{$user['supplier']['name']}***\n");
            $printer->lineFeed();
            $printer->setLineSpacing(80);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("交班单") . "\n");
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [160, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("交班编号"), $data['shift_no']);
            $printer->printInColumns(__("交班人"), $user->real_name);
            $printer->printInColumns(__("当班时间"),  date('Y-m-d H:i:s', $startTime) . " " . __("至") . " " . date('Y-m-d H:i:s', $endTime));
            $printer->lineFeed();
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            //
            $printer->setupColumns(
                [300, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [96, SunmiCloudPrinter::ALIGN_CENTER, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0]
            );
            $printer->printInColumns(__("分类"), __("数量"), __("金额"));
            $printer->appendText("------------------------------------------------\n");
            //
            $sales = 0;
            foreach ($categorys as $key => $category) {
                $sales += $category['sales'];
                $name = (new CategoryModel)->getNameTextAttr($category['name']);
                $printer->printInColumns($name, "{$category['sales']}",  $this->currencyUnit . strval($category['prices']));
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            //
            $printer->setupColumns(
                [400, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            if ($sales > 0) {
                $printer->printInColumns(__("销售笔数"), "{$sales}");
            }
            foreach ($data['incomes'] as $key => $income) {
                $printer->printInColumns($income['pay_type_name'], $this->currencyUnit . "{$income['price']}");
            }
            if ($data['refund_amount'] > 0) {
                $printer->printInColumns(__("退款金额"), $this->currencyUnit . "{$data['refund_amount']}");
            }
            //
            $printer->lineFeed();
            $printer->appendText("------------------------------------------------\n");
            $printer->printInColumns(__("本班营业总额"), $this->currencyUnit . "{$totalIncome}");
            $printer->printInColumns(__("上一班遗留备用金"), $this->currencyUnit . "{$previousShiftCash}");
            $printer->printInColumns(__("本班取出现金"), $this->currencyUnit . "{$cashTakenOut}");
            $printer->printInColumns(__("本班遗留备用金"), $this->currencyUnit . "{$cashLeft}");
            //
            $printer->lineFeed();
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
        if ($printers == PrinterTypeEnum::SUNMI_LAN || $printers['printer_type']['value'] == PrinterTypeEnum::XPRINTER_LAN) {
            $width = 48 - ($isThai ? 2 : 0);
            $leftWidth = 32;
            $printer = new SunmiCloudPrinter(567);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->lineFeed();
            $printer->setLineSpacing(80);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("交班单"));
            $printer->lineFeed();
            if ($printers != PrinterTypeEnum::SUNMI_LAN) {
                $printer->lineFeed();
            }
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->appendText(printText(__("交班编号"), '', $data['shift_no'], $width));
            $printer->lineFeed();
            $printer->appendText(printText(__("交班人"), '', $user->real_name, $width));
            $printer->lineFeed();
            $printer->appendText(printText(__("当班时间"), '  ', date('Y-m-d H:i:s', $startTime) . " " . __("至") . " " . date('Y-m-d H:i:s', $endTime), $width));
            $printer->lineFeed();
            $printer->lineFeed();
            //
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            //
            $printer->appendText(printText(__("分类"), __("数量"), __("金额"), $width, $leftWidth));
            $printer->appendText("------------------------------------------------\n");
            //
            $sales = 0;
            foreach ($categorys as $key => $category) {
                $sales += $category['sales'];
                $name = (new CategoryModel)->getNameTextAttr($category['name']);
                $printer->appendText(printText($name, $category['sales'], $this->currencyUnit . strval($category['prices']), $width, $leftWidth));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            //
            if ($sales > 0) {
                $printer->appendText(printText(__("销售笔数"), '', "{$sales}", $width));
                $printer->lineFeed();
            }
            foreach ($data['incomes'] as $key => $income) {
                $printer->appendText(printText($income['pay_type_name'], '', $this->currencyUnit . "{$income['price']}", $width));
                $printer->lineFeed();
            }
            if ($data['refund_amount'] > 0) {
                $printer->appendText(printText(__("退款金额"), '', $this->currencyUnit . "{$data['refund_amount']}", $width));
                $printer->lineFeed();
            }
            //
            $printer->lineFeed();
            $printer->appendText("------------------------------------------------\n");
            $printer->appendText(printText(__("本班营业总额"), '',  $this->currencyUnit . "{$totalIncome}", $width, $leftWidth));
            $printer->lineFeed();
            $printer->appendText(printText(__("上一班遗留备用金"), '', $this->currencyUnit . "{$previousShiftCash}", $width, $leftWidth));
            $printer->lineFeed();
            $printer->appendText(printText(__("本班取出现金"), '', $this->currencyUnit . "{$cashTakenOut}", $width, $leftWidth));
            $printer->lineFeed();
            $printer->appendText(printText(__("本班遗留备用金"), '', $this->currencyUnit . "{$cashLeft}", $width, $leftWidth));
            //
            $printer->lineFeed(4);
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
        $content = "<C>***{$user['supplier']['name']}***</C><BR>";
        $content .= "<CB>" . __('交班单') . "</CB><BR>";
        $content .= printText(__('交班编号'), ' ', $data['shift_no'], $width) . "<BR>";
        $content .= printText(__('交班人'), ' ', $user->real_name, $width) . "<BR>";
        $content .= __('当班时间'). " " . date('Y-m-d H:i:s', $startTime)." ". __("至")." " .date('Y-m-d H:i:s', $endTime). " <BR><BR>";
        $content .= printText(__('分类'), __('数量'),  __('金额'), $width, $leftWidth);
        $content .= "--------------------------------<BR>";
        foreach ($categorys as $key => $category) {
            $content .= printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'], $this->currencyUnit . strval($category['prices']), $width, $leftWidth)  . '<BR>';
        }
        $content .= "--------------------------------<BR>";
        if ($data['sales_num'] > 0) {
            $content .= printText(__('销售笔数'), ' ', $data['sales_num'], $width) . "<BR>";
        }
        foreach ($data['incomes'] as $key => $income) {
            $content .= printText($income['pay_type_name'], ' ', $this->currencyUnit . strval($income['price']), $width, $leftWidth + 5) . "<BR>";
        }
        if ($data['refund_amount'] > 0) {
            $content .= printText(__('退款金额'), ' ', $this->currencyUnit . strval($data['refund_amount']), $width) . "<BR>";
        }
        $content .= "<BR>--------------------------------<BR>";
        $content .= printText(__('本班营业总额'), '', $this->currencyUnit  . strval($totalIncome), $width, $leftWidth + 5) . "<BR>";
        $content .= printText(__('上一班遗留备用金'), '', $this->currencyUnit . strval($previousShiftCash), $width, $leftWidth + 5) . "<BR>";
        $content .= printText(__('本班取出现金'), '', $this->currencyUnit  . strval($cashTakenOut), $width, $leftWidth + 5) . "<BR>";
        $content .= printText(__('本班遗留备用金'), '', $this->currencyUnit  . strval($cashLeft), $width, $leftWidth + 5) . "<BR>";
        $content .= "<BR>";
        //
        return $content;
    }


}