<?php

namespace app\cashier\controller\store;

use app\cashier\controller\Controller;
use app\cashier\model\store\TableArea as TableAreaModel;
use app\cashier\model\store\Table as TableModel;
use app\common\model\supplier\Supplier as SupplierModel;

/**
 * 桌位控制器
 */
class Table extends Controller
{

    /**
     * 桌位区域列表
     */
    public function area()
    {
        // 桌位列表
        $model = new TableAreaModel;
        $list = $model->getList($this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 桌位列表
     */
    public function table($area_id, $type_id)
    {
        // 桌位列表
        $model = new TableModel;
        $list = $model->getList($area_id, $type_id,$this->cashier['user']);
        $basic = SupplierModel::detail($this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list', 'basic'));
    }

    /**
     *获取转台桌号
     */
    public function changeTable($table_id)
    {
        // 桌位列表
        $model = new TableAreaModel;
        $list = $model->getTableList($this->cashier['user']['shop_supplier_id'],$table_id);
        return $this->renderSuccess('', compact('list'));
    }

}
