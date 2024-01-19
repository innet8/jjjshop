<?php

namespace app\shop\controller\product\expand;

use app\shop\controller\Controller;
use app\shop\model\product\Unit as UnitModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 单位库
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Unit extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.unit/index")
     * @Apidoc\Param("unit_name", type="string", require=false, default="", desc="单位名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Unit\getList", desc="列表")
     */
    public function index()
    {
        $model = new UnitModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.unit/add")
     * @Apidoc\Param("unit_name", type="string", require=true, desc="单位名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new UnitModel();
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.unit/edit")
     * @Apidoc\Param("unit_id", type="int", require=true, desc="单位id")
     * @Apidoc\Param("unit_name", type="string", require=true, desc="单位名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($unit_id)
    {
        // 详情
        $model = UnitModel::detail($unit_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.unit/delete")
     * @Apidoc\Param("unit_id", type="string", require=true, desc="单位id，多个逗号隔开")
     * @Apidoc\Returned()
     */
    public function delete($unit_id)
    {
        $model = new UnitModel;
        if (!$model->setDelete($unit_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}
