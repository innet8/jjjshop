<?php

namespace app\common\service\order;

use app\common\enum\settings\PrinterTypeEnum;
use app\common\model\settings\Printer as PrinterModel;
use app\common\library\printer\Driver as PrinterDriver;
use app\common\library\printer\party\SunmiCloudPrinter;
use app\common\model\product\Category as CategoryModel;

/**
 * 营业数据打印服务类
 */
class OrderBusinessPrinterService
{
    
    /**
     * 收银打印
     */
    public function cashierPrint($printerConfig, $data)
    {
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['seller_printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $printerDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($printer,$data);
        // 执行打印请求
        return $printerDriver->printTicket($content);
    }

    /**
     * 构建订单打印的内容
     */
    private function getPrintContent($printer,$data)
    {
        $startTime = date('Y-m-d H:i:s', $data['times'][0]);
        $endTime = $data['times'][1] ? date('Y-m-d H:i:s', $data['times'][1]) : date('Y-m-d H:i:s');

        /* *
        *
        *商米打印机
        *
        */
        if ($printer['printer_type']['value'] == PrinterTypeEnum::SUNMI_LAN) {
            $printer = new SunmiCloudPrinter(567);
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("*".__("店铺名称")."({$data['supplier']['name']})*\n");
            $printer->lineFeed();
            $printer->setLineSpacing(80);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("营业数据"));
            $printer->lineFeed();
            // 
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [60, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("时间"), $startTime." ". __("至")." " . $endTime);
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
            $printer->lineFeed();
            foreach ($data['categorys'] as $key => $category) {
                $printer->printInColumns( (new CategoryModel)->getNameTextAttr($category['name']) .'' , "{$category['sales']}", "￥{$category['prices']}" );
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            // 
            $printer->lineFeed();
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
                $printer->printInColumns($income['pay_type_name'], "￥{$income['price']}");
                $printer->lineFeed();
            }
            // 
            if ($data['refund_amount'] > 0) { 
                $printer->printInColumns(__("退款金额"), "￥{$data['refund_amount']}");
                $printer->lineFeed();
            }
            $printer->printInColumns(__("营业总额"),"￥{$data['total_amount']}");
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
        if ($printer['printer_type']['value'] == PrinterTypeEnum::XPRINTER_LAN) {
            $width = 48;
            $printer = new SunmiCloudPrinter(567);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("*".__("店铺名称")."({$data['supplier']['name']})*\n");
            $printer->lineFeed();
            $printer->setLineSpacing(80);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("营业数据"));
            $printer->lineFeed();
            $printer->lineFeed(); 
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [60, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("时间"), $startTime." ". __("至")." " . $endTime);
            $printer->lineFeed();
            // 
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            // 
            $printer->appendText(printText(__("分类"), __("数量"), __("金额"), $width, 29));
            $printer->appendText("------------------------------------------------\n");
            $printer->lineFeed();
            foreach ($data['categorys'] as $key => $category) {
                $printer->appendText(printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'] . '',"￥" . $category['prices'],$width, 29));
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
                $printer->appendText(printText($income['pay_type_name'],'',"￥{$income['price']}",$width));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            // 
            if ($data['refund_amount'] > 0) { 
                $printer->appendText(printText(__("退款金额"),'',"￥{$data['zfrefund_amountb_pay']}",$width));
                $printer->lineFeed();
                $printer->lineFeed();
            }
            $printer->appendText(printText(__("营业总额"),'',"￥{$data['total_amount']}",$width));
            $printer->lineFeed();
            $printer->lineFeed();
            $printer->lineFeed();
            $printer->lineFeed();
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
        $content = "<C>*" . __('店铺名称') . "({$data['supplier']['name']})*</C><BR>";
        $content .= "<CB>" . __('营业数据') . "</CB><BR>";
        $content .= __('时间') . "：{$startTime} " . __('至') . " {$endTime}<BR><BR>";
        $content .= printText(__('分类'), __('数量'),  __('金额'), $width, $leftWidth);
        $content .= "--------------------------------<BR>";
        foreach ($data['categorys'] as $key => $category) {
            $content .= printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'], "￥" . strval($category['prices']), $width, $leftWidth)  . '<BR>';
        }
        $content .= "--------------------------------<BR><BR>";
        $content .= printText(__('销售笔数'), ' ', $data['sales_num'], $width) . "<BR><BR>";
        // 
        foreach ($data['incomes'] as $key => $income) {
            $content .= printText($income['pay_type_name'],'',"￥{$income['price']}",$width, $leftWidth + 4) . "<BR><BR>";
        }
        // 
        if ($data['refund_amount'] > 0) { 
            $content .= printText(__('退款金额'), '', "￥" . strval($data['refund_amount']), $leftWidth + 4) . "<BR><BR>";
        }
        $content .= printText(__('营业总额'), '', "￥" . strval($data['total_amount']), $leftWidth + 4) . "<BR>";
        $content .= "<BR>";
        // 
        return $content;
    }


}