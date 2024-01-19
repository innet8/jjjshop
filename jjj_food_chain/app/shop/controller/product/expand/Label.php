<?php

namespace app\shop\controller\product\expand;

use app\shop\controller\Controller;
use app\shop\model\product\Label as LabelModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 打印标签
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Label extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.label/index")
     * @Apidoc\Param("label_name", type="string", require=false, default="", desc="标签名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Label\getList", desc="列表")
     */
    public function index()
    {
        $model = new LabelModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.label/add")
     * @Apidoc\Param("label_name", type="string", require=true, desc="标签名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new LabelModel();
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.label/edit")
     * @Apidoc\Param("label_id", type="int", require=true, desc="标签id")
     * @Apidoc\Param("label_name", type="string", require=true, desc="标签名称")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($label_id)
    {
        // 详情
        $model = LabelModel::detail($label_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.label/delete")
     * @Apidoc\Param("label_id", type="string", require=true, desc="标签id，多个逗号隔开")
     * @Apidoc\Returned()
     */
    public function delete($label_id)
    {
        $model = new LabelModel;
        if (!$model->setDelete($label_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}
