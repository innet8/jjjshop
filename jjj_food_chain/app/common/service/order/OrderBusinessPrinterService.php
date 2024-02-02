<?php

namespace app\common\service\order;

use think\facade\Request;
use think\facade\Cache;
use app\common\enum\settings\SettingEnum;
use app\common\enum\settings\PrinterTypeEnum;
use app\common\model\settings\Printer as PrinterModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\library\printer\Driver as PrinterDriver;
use app\common\library\printer\party\SunmiCloudPrinter;
use app\common\model\product\Category as CategoryModel;

/**
 * 营业数据打印服务类
 */
class OrderBusinessPrinterService
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
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $data['supplier']['shop_supplier_id'], $data['supplier']['app_id']);
        if ($currency['unit'] ?? '') {
            $this->currencyUnit = $currency['unit'];
        }
        // 商米一体机打印
        $res = true;
        if (($printerConfig['cashier_printer_id'] ?? '0') == '0') {
            $content = $this->getPrintContent(PrinterTypeEnum::SUNMI_LAN, $data);
            Cache::set("printer_data_cache", array_unique(array_merge(Cache::get("printer_data_cache",[]),[$content])), 60 * 60 * 24);
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
            $res = $printerDriver->printTicket($content, $data['supplier']['name']);
        }
        // 
        return $res;
    }

    /**
     * 构建订单打印的内容
     */
    private function getPrintContent($printers, $data)
    {
        $startTime = date('Y-m-d H:i:s', $data['times'][0]);
        $endTime = $data['times'][1] ? date('Y-m-d H:i:s', $data['times'][1]) : date('Y-m-d H:i:s');
        $isThai =  preg_match('/[\p{Thai}]/u', __("金额"));

        /* *
        *
        *商米打印机
        *
        */
        if ($printers == PrinterTypeEnum::SUNMI_LAN || $printers['printer_type']['value'] == PrinterTypeEnum::SUNMI_LAN) {
            $printer = new SunmiCloudPrinter(567);
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("***{$data['supplier']['name']}***\n");
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("营业数据"));
            $printer->lineFeed();
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            // 
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [60, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("时间"), $startTime."". __("至")."" . $endTime);
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
            foreach ($data['categorys'] as $key => $category) {
                $printer->printInColumns( (new CategoryModel)->getNameTextAttr($category['name']) .'' , "{$category['sales']}",  $this->currencyUnit . "{$category['prices']}" );
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            // 
            $printer->setupColumns(
                [360, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            if ($data['sales_num'] > 0) { 
                $printer->printInColumns(__("销售笔数"),"{$data['sales_num']}");
                $printer->lineFeed();
            }
            // 
            foreach ($data['incomes'] as $key => $income) {
                $printer->printInColumns($income['pay_type_name'], $this->currencyUnit . "{$income['price']}");
                $printer->lineFeed();
            }
            // 
            if ($data['refund_amount'] > 0) { 
                $printer->printInColumns(__("退款金额"), $this->currencyUnit . "{$data['refund_amount']}");
                $printer->lineFeed();
            }
            $printer->printInColumns(__("营业总额"), $this->currencyUnit . "{$data['total_amount']}");
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
        if ($printers['printer_type']['value'] == PrinterTypeEnum::XPRINTER_LAN) {
            $width = 46;
            $printer = new SunmiCloudPrinter(567);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("***{$data['supplier']['name']}***\n");
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("营业数据"));
            $printer->lineFeed();
            $printer->lineFeed();
            $printer->setLineSpacing(50);
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [60, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("时间"), $startTime."". __("至")."" . $endTime);
            $printer->lineFeed();
            // 
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            // 
            $printer->appendText(printText(__("分类"), __("数量"), __("金额"), $width , 29));
            $printer->appendText("\n------------------------------------------------\n");
            $printer->lineFeed();
            foreach ($data['categorys'] as $key => $category) {
                $printer->appendText(printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'] . '', $this->currencyUnit . $category['prices'], $width, 29));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            // 
            $printer->lineFeed();
            if ($data['sales_num'] > 0) { 
                $printer->appendText(printText(__("销售笔数"),'',"{$data['sales_num']}",$width));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            // 
            foreach ($data['incomes'] as $key => $income) {
                $printer->appendText(printText($income['pay_type_name'],' ', $this->currencyUnit . "{$income['price']}", $width ));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            // 
            if ($data['refund_amount'] > 0) { 
                $printer->appendText(printText(__("退款金额"),'', $this->currencyUnit . "{$data['refund_amount']}", $width ));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            $printer->appendText(printText(__("营业总额"),'', $this->currencyUnit . "{$data['total_amount']}", $width ));
            $printer->lineFeed(5);
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
        $content = "<C>***{$data['supplier']['name']}***</C><BR>";
        $content .= "<CB>" . __('营业数据') . "</CB><BR>";
        $content .= __('时间') . "：{$startTime}" . __('至') . "{$endTime}<BR><BR>";
        $content .= printText(__('分类'), __('数量'),  __('金额'), $width, $leftWidth);
        $content .= "--------------------------------<BR>";
        foreach ($data['categorys'] as $key => $category) {
            $content .= printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'], $this->currencyUnit . strval($category['prices']), $width, $leftWidth)  . '<BR>';
        }
        $content .= "--------------------------------<BR><BR>";
        $content .= printText(__('销售笔数'), ' ', $data['sales_num'], $width, $leftWidth + 4) . "<BR><BR>";
        // 
        foreach ($data['incomes'] as $key => $income) {
            $content .= printText($income['pay_type_name'],'', $this->currencyUnit . "{$income['price']}", $width, $leftWidth + 4) . "<BR><BR>";
        }
        // 
        if ($data['refund_amount'] > 0) { 
            $content .= printText(__('退款金额'), '', $this->currencyUnit . strval($data['refund_amount']), $width, $leftWidth + 4) . "<BR><BR>";
        }
        $content .= printText(__('营业总额'), '', $this->currencyUnit . strval($data['total_amount']), $width, $leftWidth + 4) . "<BR><BR>";
        // 
        return $content;
    }


}