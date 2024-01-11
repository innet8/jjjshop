<?php

namespace app\cashier\controller\store;

use app\cashier\controller\Controller;
use app\cashier\model\store\TableArea as TableAreaModel;
use app\cashier\model\store\Table as TableModel;
use app\common\model\supplier\Supplier as SupplierModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 桌台模块-桌台相关
 */
class Table extends Controller
{
    /**
     * @Apidoc\Title("桌位区域列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/store.table/area")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\store\TableArea\getList")
     */
    public function area()
    {
        // 桌位列表
        $model = new TableAreaModel;
        $list = $model->getList($this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("桌位列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Param("area_id", type="int", require=false, desc="区域ID")
     * @Apidoc\Param("type_id", type="int", require=false, desc="桌台类型ID")
     * @Apidoc\Url ("/index.php/cashier/store.table/table")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\store\Table\getList")
     */
    public function table($area_id = '', $type_id = '')
    {
        // 桌位列表
        $model = new TableModel;
        $list = $model->getList($area_id, $type_id, $this->cashier['user']);
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
