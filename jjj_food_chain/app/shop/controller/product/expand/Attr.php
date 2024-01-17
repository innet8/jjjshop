<?php

namespace app\shop\controller\product\expand;

use app\shop\controller\Controller;
use app\shop\model\product\Attribute as AttributeModel;
use hg\apidoc\annotation as Apidoc;


/**
 * 商品属性
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Attr extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.attr/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Attribute\getList", desc="列表")
     */
    public function index()
    {
        $model = new AttributeModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.attr/add")
     * @Apidoc\Param("attribute_name", type="string", require=true, desc="属性名")
     * @Apidoc\Param("attribute_value", type="string", require=false, default="", desc="属性值")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new AttributeModel();
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.attr/edit")
     * @Apidoc\Param("attribute_id", type="int", require=true, desc="属性id")
     * @Apidoc\Param("attribute_name", type="string", require=true, desc="属性名")
     * @Apidoc\Param("attribute_value", type="string", require=false, default="", desc="属性值")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($attribute_id)
    {
        // 模板详情
        $model = AttributeModel::detail($attribute_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.attr/delete")
     * @Apidoc\Param("attribute_id", type="string", require=true, desc="属性id，多个逗号隔开")
     * @Apidoc\Returned()
     */
    public function delete($attribute_id)
    {
        $model = new AttributeModel;
        if (!$model->setDelete($attribute_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}
