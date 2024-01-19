<?php

namespace app\shop\controller\product\expand;

use app\shop\controller\Controller;
use app\shop\model\product\Spec as SpecModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 商品规格
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Spec extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.spec/index")
     * @Apidoc\Param("spec_name", type="string", require=false, default="", desc="规格名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Spec\getList", desc="列表")
     */
    public function index()
    {
        $model = new SpecModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加规格")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.spec/add")
     * @Apidoc\Param("spec_name", type="string", require=true, desc="规格名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new SpecModel();
        // 新增规格
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑规格")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.spec/edit")
     * @Apidoc\Param("spec_id", type="int", require=true, desc="规格id")
     * @Apidoc\Param("spec_name", type="string", require=true, desc="规格名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($spec_id)
    {
        // 详情
        $model = SpecModel::detail($spec_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除规格")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.spec/delete")
     * @Apidoc\Param("spec_id", type="string", require=true, desc="规格id，多个逗号隔开")
     * @Apidoc\Returned()
     */
    public function delete($spec_id)
    {
        $model = new SpecModel;
        if (!$model->setDelete($spec_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}
