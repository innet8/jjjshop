<?php

namespace app\shop\service\statistics;

use app\common\library\helper;
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

        $sheet->setCellValue('A1', __('交班编号'));
        $sheet->setCellValue('B1', __('收银员'));
        $sheet->setCellValue('C1', __('当班时间'));
        $sheet->setCellValue('D1', __('营业收入'));
        $sheet->setCellValue('E1', __('现金收入'));
        $sheet->setCellValue('F1', __('上一班遗留备用金'));
        $sheet->setCellValue('G1', __('本班遗留备用金'));
        $sheet->setCellValue('H1', __('添加时间'));

        //填充数据
        $index = 0;
        foreach ($list as $item) {
            $totalMoney = helper::bcsub($item['total_money'] ?? 0, $item['refund_amount'] ?? 0);
            $sheet->setCellValue('A' . ($index + 2), "\t" . $item['shift_no'] . "\t");
            $sheet->setCellValue('B' . ($index + 2), $item['user']['real_name'] ?? '');
            $sheet->setCellValue('C' . ($index + 2), $item['shift_start_time'] . __('至') . $item['shift_end_time']);
            $sheet->setCellValue('D' . ($index + 2), $totalMoney);
            $sheet->setCellValue('E' . ($index + 2), $item['cash_money'] ?? 0);
            $sheet->setCellValue('F' . ($index + 2), $item['previous_shift_cash'] ?? 0);
            $sheet->setCellValue('G' . ($index + 2), $item['cash_left'] ?? 0);
            $sheet->setCellValue('H' . ($index + 2), $item['create_time']);
            $index++;
        }

        //保存文件
        $writer = new Xlsx($spreadsheet);
        $filename = __('用户交班记录') . '-' . date('YmdHis') . '.xlsx';
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');
        exit();
    }
}