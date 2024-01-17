<?php

namespace app\shop\controller\product\store;

use app\shop\controller\Controller;
use app\shop\model\product\Category as CategoryModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 店内商品分类
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Category extends Controller
{
    /**
     * @Apidoc\Title("普通商品分类列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/index")
     * @Apidoc\Param("name", type="string", require=false, desc="分类名称")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Category\getCacheAll", desc="列表")
     */
    public function index()
    {
        $params = $this->postData();
        $model = new CategoryModel;
        $list = $model->getCacheAll(1, 0, $this->store, $params['name'] ?? '') ?: [];
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("特殊商品分类列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/list")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Category\getCacheAll", desc="列表")
     */
    public function list()
    {
        $model = new CategoryModel;
        $list = $model->getCacheAll(1, 1, $this->store) ?: [];
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("删除商品分类")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/Delete")
     * @Apidoc\Param("category_id", type="int", require=true, desc="分类id")
     * @Apidoc\Returned()
     */
    public function Delete($category_id)
    {
        $model = CategoryModel::find($category_id);
        if ($model->remove($category_id)) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("添加商品分类")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/Add")
     * @Apidoc\Returned()
     */
    public function Add()
    {
        $model = new CategoryModel;
        $data = $this->request->post();
        $data['type'] = 1;
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        // 新增记录
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑商品分类")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/Edit")
     * @Apidoc\Param("category_id", type="int", require=true, desc="分类id")
     * @Apidoc\Returned()
     */
    public function Edit($category_id)
    {
        // 模板详情
        $model = CategoryModel::detail($category_id);
        // 更新记录
        if ($model->edit($this->request->post())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("设置状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/set")
     * @Apidoc\Param("category_id", type="int", require=true, desc="分类id")
     * @Apidoc\Returned()
     */
    public function set($category_id)
    {
        // 详情
        $model = CategoryModel::detail($category_id);
        // 更新记录
        if ($model->setStatus($this->request->post())) {
            return $this->renderSuccess('设置成功');
        }
        return $this->renderError($model->getError() ?: '设置失败');
    }

    /**
     * @Apidoc\Title("普通商品顶级分类列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.store.category/parent")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Category\getALLParent", desc="列表")
     */
    public function parent()
    {
        $model = new CategoryModel;
        $list = $model->getALLParent(1, 0, $this->store);
        return $this->renderSuccess('', compact('list'));
    }
}
