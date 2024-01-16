<?php

namespace app\shop\service\statistics;

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

/**
 * 用户交班记录
 */
class UserShiftLogService
{

    /**
     * 列表导出
     */
    public function userShiftLogListExport($list)
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        //列宽
        $sheet->getColumnDimension('B')->setWidth(30);
        $sheet->getColumnDimension('P')->setWidth(30);

        //设置工作表标题名称
        $sheet->setTitle('用户交班记录');

        $sheet->setCellValue('A1', langTrans('交班编号'));
        $sheet->setCellValue('B1', langTrans('收银员'));
        $sheet->setCellValue('C1', langTrans('当班时间'));
        $sheet->setCellValue('D1', langTrans('营业收入'));
        $sheet->setCellValue('E1', langTrans('现金收入'));
        $sheet->setCellValue('F1', langTrans('上一班遗留备用金'));
        $sheet->setCellValue('G1', langTrans('本班遗留备用金'));
        $sheet->setCellValue('H1', langTrans('添加时间'));

        //填充数据
        $index = 0;
        foreach ($list as $item) {
            $total_money = $item['cash_income'] ?? 0 + $item['balance_income'] ?? 0 + $item['wechat_income'] ?? 0 + $item['alipay_income'] ?? 0 - $item['refund_amount'] ?? 0;
            $sheet->setCellValue('A' . ($index + 2), "\t" . $item['shift_no'] . "\t");
            $sheet->setCellValue('B' . ($index + 2), $item['user']['real_name'] ?? '');
            $sheet->setCellValue('C' . ($index + 2), $item['shift_start_time'] . '至' . $item['shift_end_time']);
            $sheet->setCellValue('D' . ($index + 2), $total_money);
            $sheet->setCellValue('E' . ($index + 2), $item['cash_money'] ?? 0);
            $sheet->setCellValue('F' . ($index + 2), $item['previous_shift_cash'] ?? 0);
            $sheet->setCellValue('G' . ($index + 2), $item['cash_left'] ?? 0);
            $sheet->setCellValue('H' . ($index + 2), $item['create_time']);
            $index++;
        }

        //保存文件
        $writer = new Xlsx($spreadsheet);
        $filename = iconv("UTF-8", "GB2312//IGNORE", '用户交班记录') . '-' . date('YmdHis') . '.xlsx';
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');
        exit();
    }
}