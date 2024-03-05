<?php

namespace app\tablet\controller\table;

use app\common\enum\settings\SettingEnum;
use app\common\model\settings\Setting as SettingModel;
use app\tablet\controller\order\Order;
use app\tablet\model\store\Table as TableModel;
use app\tablet\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\tablet\model\order\Order as OrderModel;

/**
 * 桌台相关
 */
class Table extends Controller
{
    /**
     * @Apidoc\Title("桌台列表")
     * @Apidoc\Desc("桌台列表")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌号ID")
     * @Apidoc\Url("/index.php/tablet/table.table/index")
     */
    public function index($table_id = 0)
    {
        $list = (new TableModel)->getAll($this->table['shop_supplier_id']);
        $curTable = TableModel::where('table_id', $table_id)->find();
        return $this->renderSuccess('', compact('list', 'curTable'));
    }

    /**
     * @Apidoc\Title("绑定桌台")
     * @Apidoc\Desc("绑定桌台")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌号ID")
     * @Apidoc\Param("old_table_id", type="int", require=false, desc="解绑桌号ID")
     * @Apidoc\Param("key", type="string", require=true, desc="唯一设备标识")
     * @Apidoc\Url("/index.php/tablet/table.table/bind")
     */
    public function bind($table_id, $old_table_id = 0, $key = '')
    {
        $model = new TableModel;
        if (!$model->bindTable($this->table['shop_supplier_id'], $table_id, $key)) {
            return $this->renderError($model->getError() ?: '绑定桌台失败');
        }
        if ($old_table_id > 0) {
            $old = new TableModel;
            $old->unbindTable($this->table['shop_supplier_id'], $old_table_id);
        }
        return $this->renderSuccess('绑定桌台成功');
    }

    /**
     * @Apidoc\Title("解绑桌台")
     * @Apidoc\Desc("解绑桌台")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌号ID")
     * @Apidoc\Url("/index.php/tablet/table.table/unbind")
     */
    public function unbind($table_id)
    {
        $model = new TableModel;
        if (!$model->unbindTable($this->table['shop_supplier_id'], $table_id)) {
            return $this->renderError($model->getError() ?: '解绑失败');
        }
        return $this->renderSuccess('解绑成功');
    }

    /**
     * @Apidoc\Title("获取桌台信息")
     * @Apidoc\Desc("获取桌台信息")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌号ID")
     * @Apidoc\Url("/index.php/tablet/table.table/getInfo")
     */
    public function getInfo($table_id)
    {
        $table = TableModel::detail($table_id);
        // 平板端设置
        $tablet = SettingModel::getSupplierItem(SettingEnum::TABLET, $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        unset($tablet['advanced_password']);
        $table['tablet'] = $tablet;
        // 桌台当前进行中订单
        $table['order'] = OrderModel::getTableUnderwayOrder($table_id);
        return $this->renderSuccess('桌台信息', $table);
    }

    /**
     * @Apidoc\Title("桌台")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=false, desc="桌号ID")
     * @Apidoc\Url("/index.php/tablet/table.table/ping")
     */
    public function ping()
    {
        // Tid
        $tableId = $this->table['table_id'] ?? 0;
        //
        $is_lock = 0;
        $buffet = [
            'is_buffet' => 0,
            'remind' => 0,
            'minute' => 0,
            'buffet_remaining_time' => 0,
            'is_buy_continue' => 1,
        ];
        //
        if ($tableId > 0) {
            $detail = OrderModel::getTableUnderwayOrder($tableId);
            if ($detail) {
                // 自助餐设置
                $buffetSetting = SettingModel::getSupplierItem(SettingEnum::BUFFET, $detail['shop_supplier_id'] ?? 0, $detail['app_id'] ?? 0);
                $is_lock = $detail->is_lock;
                $buffet = [
                    'is_buffet' => $detail['is_buffet'],
                    'remind' => OrderModel::buffetTimeRemind($tableId, $detail['buffet_expired_time'], $buffetSetting['tablet_end_time']),
                    'minute' => $buffetSetting['tablet_end_time'],
                    'buffet_remaining_time' => OrderModel::getBuffetRemainingTime($detail['buffet_expired_time']),
                    'buffet_expired_time' => $detail['buffet_expired_time'],
                    'is_buy_continue' => (int)($buffetSetting['is_buy_continue'] ?? 1),
                ];
            }
        }
        //
        return $this->renderSuccess('请求成功', compact('is_lock', 'buffet'));
    }
}
