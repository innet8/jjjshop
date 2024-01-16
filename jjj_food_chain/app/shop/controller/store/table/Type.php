<?php

namespace app\shop\controller\store\table;

use app\shop\controller\Controller;
use app\shop\model\store\TableType as TableTypeModel;

/**
 * 桌位类型
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Type extends Controller
{
    /**
     * @Apidoc\Title("类型列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.type/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\store\TableType\getList", desc="列表")
     */
    public function index()
    {
        $model = new TableTypeModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.type/add")
     * @Apidoc\Param("type_name", type="string", require=true, default="", desc="类型名称")
     * @Apidoc\Param("min_num", type="int", require=true, default=0, desc="最小人数")
     * @Apidoc\Param("max_num", type="int", require=true, default=0, desc="最大人数")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new TableTypeModel;
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
     * @Apidoc\Url ("/index.php/shop/store.table.type/edit")
     * @Apidoc\Param("type_id", type="int", require=true, default=0, desc="类型id")
     * @Apidoc\Param("type_name", type="string", require=true, default="", desc="类型名称")
     * @Apidoc\Param("min_num", type="int", require=true, default=0, desc="最小人数")
     * @Apidoc\Param("max_num", type="int", require=true, default=0, desc="最大人数")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($type_id)
    {
        $model = TableTypeModel::detail($type_id);
        //编辑
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');

    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.type/delete")
     * @Apidoc\Param("type_id", type="int", require=true, default=0, desc="类型id")
     * @Apidoc\Returned()
     */
    public function delete($type_id)
    {
        // 详情
        $model = TableTypeModel::detail($type_id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('', $model->getError() ?: '删除成功');
    }
}
