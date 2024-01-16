<?php

namespace app\shop\controller\store\table;

use app\shop\controller\Controller;
use app\shop\model\store\TableArea as TableAreaModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 区域管理
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Area extends Controller
{

    /**
     * @Apidoc\Title("区域列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.area/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\store\TableArea\getList", desc="列表")
     */
    public function index()
    {
        $model = new TableAreaModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.area/add")
     * @Apidoc\Param("area_name", type="string", require=true, default="", desc="区域名称")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new TableAreaModel;
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
     * @Apidoc\Url ("/index.php/shop/store.table.area/edit")
     * @Apidoc\Param("area_id", type="int", require=true, default=0, desc="区域id")
     * @Apidoc\Param("area_name", type="string", require=true, default="", desc="区域名称")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($area_id)
    {
        $model = TableAreaModel::detail($area_id);
        //编辑
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');

    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.table.area/delete")
     * @Apidoc\Param("area_id", type="int", require=true, default=0, desc="区域id")
     * @Apidoc\Returned()
     */
    public function delete($area_id)
    {
        // 详情
        $model = TableAreaModel::detail($area_id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('', $model->getError() ?: '删除成功');
    }
}
