<?php

namespace app\shop\controller\store\table;

use app\shop\controller\Controller;
use app\shop\model\store\Table as TableModel;
use app\shop\model\store\TableArea as TableAreaModel;
use app\shop\model\store\TableType as TableTypeModel;
use app\common\service\qrcode\TableService;
use hg\apidoc\annotation as Apidoc;

/**
 * 桌码管理
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Table extends Controller
{
    /**
     * @Apidoc\Title("桌位列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/index")
     * @Apidoc\Param("table_no", type="string", require=true, default="", desc="桌位名称")
     * @Apidoc\Param("area_id", type="int", require=true, default=0, desc="区域id")
     * @Apidoc\Param("type_id", type="int", require=true, default=0, desc="类型id")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\store\Table\getList", desc="列表")
     * @Apidoc\Returned("area_list", type="array", ref="app\shop\model\store\TableArea\getAllList", desc="区域列表")
     * @Apidoc\Returned("type_list", type="array", ref="app\shop\model\store\TableType\getAllList", desc="类型列表")
     */
    public function index()
    {
        // 桌位列表
        $model = new TableModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        // 区域列表
        $area_list = TableAreaModel::getAllList($this->store['user']['shop_supplier_id']);
        // 类型列表
        $type_list = TableTypeModel::getAllList($this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list', 'area_list', 'type_list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/add")
     * @Apidoc\Param("table_no", type="string", require=true, default="", desc="桌位名称")
     * @Apidoc\Param("area_id", type="int", require=true, default=0, desc="区域id")
     * @Apidoc\Param("type_id", type="int", require=true, default=0, desc="类型id")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new TableModel;
        //传过来的信息
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        // 新增记录
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/edit")
     * @Apidoc\Param("table_id", type="int", require=true, default=0, desc="桌位id")
     * @Apidoc\Param("table_no", type="string", require=true, default="", desc="桌位名称")
     * @Apidoc\Param("area_id", type="int", require=true, default=0, desc="区域id")
     * @Apidoc\Param("type_id", type="int", require=true, default=0, desc="类型id")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($table_id)
    {
        $model = TableModel::detail($table_id);
        //编辑店员的数据
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');

    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/delete")
     * @Apidoc\Param("table_id", type="int", require=true, default=0, desc="桌位id")
     * @Apidoc\Returned()
     */
    public function delete($table_id)
    {
        $model = TableModel::detail($table_id);
        if (!$model->setDelete()) {
            return $this->renderSuccess('', '删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("二维码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/qrcode")
     * @Apidoc\Param("id", type="int", require=true, default=0, desc="桌位id")
     * @Apidoc\Param("source", type="string", require=true, default="", desc="来源")
     * @Apidoc\Returned()
     */
    public function qrcode($id, $source)
    {
        $Qrcode = new TableService($id, $source);
        $Qrcode->getImage();
    }

    /**
     * @Apidoc\Title("解绑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.table/unbind")
     * @Apidoc\Param("table_id", type="int", require=true, default=0, desc="桌位id")
     * @Apidoc\Returned()
     */
    public function unbind($table_id)
    {
        $model = TableModel::detail($table_id);
        if ($model->setUnbind()) {
            return $this->renderSuccess('', '解绑成功');
        }
        return $this->renderError($model->getError() ?: '解绑失败');
    }
}
