<?php

namespace app\job\event;

use think\facade\Cache;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderHandoverPrinterService;
use app\common\model\shop\UserShiftLog as UserShiftLogModel;

/**
 * 交班打印
 */
class UserShiftLogPrint
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new UserShiftLogModel();
            $this->printing();
        } catch (\Throwable $e) {
            echo 'ERROR UserShiftLogPrint: ' . $e->getMessage() . PHP_EOL;
            log_write('UserShiftLogPrint TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 交班打印
     */
    private function printing()
    {
        $list = $this->model->where('is_printed', 0)->select();
        foreach ($list as $item) {
            $GLOBALS['EVENT_SHIFT_LANGUAGE'] = true;
            $GLOBALS['SHIFT_LANGUAGE'] = Cache::get('language_' . $item->shop_supplier_id . '_' . $item->app_id);
            //
            $printerConfig = SettingModel::getSupplierItem('printer', $item->shop_supplier_id, $item->app_id);
            $res = (new OrderHandoverPrinterService)->cashierPrint($printerConfig, $item);
            log_write('UserShiftLogPrint TASK : ' . '__ init __' . $item->id, 'task');
            if ($res) {
                $item->is_printed = 1;
                $item->save();
                log_write('UserShiftLogPrint TASK : ' . '__ success __' . $item->id, 'task');
            }
        }
    }
}
