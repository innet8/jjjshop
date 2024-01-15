<?php

namespace app\common\service\order;

use app\common\enum\settings\PrinterTypeEnum;
use app\common\model\settings\Printer as PrinterModel;
use app\common\library\printer\Driver as PrinterDriver;
use app\common\library\printer\party\SunmiCloudPrinter;
use app\common\model\product\Category as CategoryModel;
use app\common\model\shop\User;
use app\cashier\model\order\Order;

/**
 * 交班数据打印服务类
 */
class OrderHandoverPrinterService
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
        $content = $this->getPrintContent($printer, $data);
        // 执行打印请求
        return $printerDriver->printTicket($content);
    }

    /**
     * 构建订单打印的内容
     */
    private function getPrintContent($printer, $data)
    {
        $startTime = $data['shift_start_time'];
        $endTime = $data['shift_end_time'];
        $previousShiftCash = number_format($data['previous_shift_cash'], 2);
        $cashTakenOut = number_format($data['cash_taken_out'], 2);
        $cashLeft = number_format($data['cash_left'], 2);
        $user = User::where('shop_user_id',$data['shift_user_id'])->find();
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

        // 商米打印机
        if ($printer['printer_type']['value'] == PrinterTypeEnum::SUNMI) {
            $printer = new SunmiCloudPrinter(567);
            $printer->lineFeed();
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_CENTER);
            $printer->appendText("*".__("店铺名称")."({$user['supplier']['name']})*\n");
            $printer->lineFeed();
            $printer->setLineSpacing(80);
            $printer->setPrintModes(true, true, false);
            $printer->appendText(__("交班单")."\n");
            $printer->restoreDefaultLineSpacing();
            $printer->setPrintModes(false, false, false);
            $printer->setAlignment(SunmiCloudPrinter::ALIGN_LEFT);
            $printer->setupColumns(
                [120, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $printer->printInColumns(__("交班编号"), $data['shift_no']);
            $printer->printInColumns(__("交班人"), $user->real_name);
            $printer->printInColumns(__("当班时间"),  date('Y-m-d H:i:s', $startTime)." ". __("至")." " .date('Y-m-d H:i:s', $endTime) );
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
            foreach ($categorys as $key => $category) {
                $printer->printInColumns((new CategoryModel)->getNameTextAttr($category['name']) . '', $category['sales'] . '', "￥" . $category['prices']);
                $printer->lineFeed();
            }
            $printer->appendText("------------------------------------------------\n");
            // 
            $printer->setupColumns(
                [200, SunmiCloudPrinter::ALIGN_LEFT, 0],
                [0, SunmiCloudPrinter::ALIGN_RIGHT, 0],
            );
            $totalAmount = 0;
            if ($data['sales_num'] > 0) { 
                $totalAmount += $data['sales_num'];
                $printer->printInColumns(__("销售笔数"), "{$data['sales_num']}");
            }
            if ($data['balance_income'] > 0) { 
                $totalAmount += $data['balance_income'];
                $printer->printInColumns(__("余额收入"), "￥{$data['balance_income']}");
            }
            if ($data['cash_income'] > 0) { 
                $totalAmount += $data['cash_income'];
                $printer->printInColumns(__("现金收入"), "￥{$data['cash_income']}");
            }
            if ($data['wechat_income'] > 0) { 
                $totalAmount += $data['wechat_income'];
                $printer->printInColumns(__("微信收入"), "￥{$data['wechat_income']}");
            }
            if ($data['alipay_income'] > 0) { 
                $totalAmount += $data['alipay_income'];
                $printer->printInColumns(__("支付宝收入"), "￥{$data['alipay_income']}");
            }
            if ($data['refund_amount'] > 0) { 
                $totalAmount -= $data['refund_amount'];
                $printer->printInColumns(__("退款金额"), "￥{$data['refund_amount']}");
            }
            $totalAmount = number_format($totalAmount, 2);
            // 
            $printer->lineFeed();
            $printer->appendText("------------------------------------------------\n");
            $printer->printInColumns(__("本班营业总额"), "￥{$totalAmount}");
            $printer->printInColumns(__("上一班遗留备用金"), "￥{$previousShiftCash}");
            $printer->printInColumns(__("本班取出现金"), "￥{$cashTakenOut}");
            $printer->printInColumns(__("本班遗留备用金"), "￥{$cashLeft}");
            // 
            $printer->lineFeed();
            $printer->printAndExitPageMode();
            $printer->lineFeed(4);
            $printer->cutPaper(false);
            // 
            return $printer->orderData;
        }

        // 飞蛾打印机
        $width = 32;
        $leftWidth = 16;
        $content = "<C>*" . __('店铺名称') . "({$user['supplier']['name']})*</C><BR>";
        $content .= "<CB>" . __('交班单') . "</CB><BR>";
        $content .= printText(__('交班编号'), ' ', $data['shift_no'], $width) . "<BR>";
        $content .= printText(__('交班人'), ' ', $user->real_name, $width) . "<BR>";
        $content .= __('当班时间'). " " . date('Y-m-d H:i:s', $startTime)." ". __("至")." " .date('Y-m-d H:i:s', $endTime). " <BR><BR>";
        $content .= printText(__('分类'), __('数量'),  __('金额'), $width, $leftWidth);
        $content .= "--------------------------------<BR>";
        foreach ($categorys as $key => $category) {
            $content .= printText((new CategoryModel)->getNameTextAttr($category['name']), $category['sales'], "￥" . strval($category['prices']), $width, $leftWidth)  . '<BR>';
        }
        $content .= "--------------------------------<BR>";
        $totalAmount = 0;
        if ($data['sales_num'] > 0) { 
            $totalAmount += $data['sales_num'];
            $content .= printText(__('销售笔数'), ' ', $data['sales_num'], $width) . "<BR>";
        }
        if ($data['balance_income'] > 0) { 
            $totalAmount += $data['balance_income'];
            $content .= printText(__('余额收入'), ' ', $data['balance_income'], $width) . "<BR>";
        }
        if ($data['cash_income'] > 0) { 
            $totalAmount += $data['cash_income'];
            $content .= printText(__('现金收入'), ' ', $data['cash_income'], $width) . "<BR>";
        }
        if ($data['wechat_income'] > 0) { 
            $totalAmount += $data['wechat_income'];
            $content .= printText(__('现金收入'), ' ', $data['wechat_income'], $width) . "<BR>";
        }
        if ($data['alipay_income'] > 0) { 
            $totalAmount += $data['alipay_income'];
            $content .= printText(__('支付宝收入'), ' ', $data['alipay_income'], $width) . "<BR>";
        }
        if ($data['refund_amount'] > 0) { 
            $totalAmount -= $data['refund_amount'];
            $content .= printText(__('退款金额'), ' ', $data['退款金额'], $width) . "<BR>";
        }
        $totalAmount = number_format($totalAmount, 2);
        $content .= "<BR>--------------------------------<BR>";
        $content .= printText(__('本班营业总额'), '', "￥" . strval($totalAmount), $width) . "<BR>";
        $content .= printText(__('上一班遗留备用金'), '', "￥" . strval($previousShiftCash), $width) . "<BR>";
        $content .= printText(__('本班取出现金'), '', "￥" . strval($cashTakenOut), $width) . "<BR>";
        $content .= printText(__('本班遗留备用金'), '', "￥" . strval($cashLeft), $width) . "<BR>";
        $content .= "<BR>";
        // 
        return $content;
    }


}