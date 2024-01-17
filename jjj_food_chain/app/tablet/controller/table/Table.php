<?php

namespace app\tablet\controller\table;

use app\tablet\model\store\Table as TableModel;
use app\tablet\controller\Controller;
use hg\apidoc\annotation as Apidoc;


/**
 * 桌台相关
 */
class Table extends Controller
{
    /**
     * @Apidoc\Title("桌台列表")
     * @Apidoc\Desc("桌台列表")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/tablet/table.table/index")
     */
    public function index()
    {
        $list = (new TableModel)->getAll($this->table['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("绑定桌台")
     * @Apidoc\Desc("绑定桌台")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌号ID")
     * @Apidoc\Url("/index.php/tablet/table.table/bind")
     */
    public function bind($table_id)
    {
        $model = new TableModel;
        if (!$model->bindTable($this->table['shop_supplier_id'], $table_id)) {
            return $this->renderError($model->getError() ?: '绑定桌台失败');
        }
        return $this->renderSuccess('绑定桌台成功');
    }
}
