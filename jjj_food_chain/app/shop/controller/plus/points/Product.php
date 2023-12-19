<?php

namespace app\shop\controller\plus\points;

use app\shop\model\plus\points\Product as ProductModel;
use app\shop\model\plus\points\Category as CategoryModel;
use app\shop\controller\Controller;

/**
 * 积分商品管理控制器
 */
class Product extends Controller
{
    /**
     * 商品列表(全部)
     */
    public function index()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->getList($this->postData());
        // 商品分类
        $category = CategoryModel::getALL();
        return $this->renderSuccess('', compact('list', 'category'));
    }

    /**
     * 添加商品
     */
    public function add()
    {
        // get请求
        if ($this->request->isGet()) {
            // 商品分类
            $category = CategoryModel::getALL();
            return $this->renderSuccess('', compact('category'));
        }
        //post请求
        $data = json_decode($this->postData()['params'], true);
        $model = new ProductModel;
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 商品编辑
     */
    public function edit($product_id)
    {
        if ($this->request->isGet()) {
            $model = ProductModel::detail($product_id);
            // 商品分类
            $category = CategoryModel::getALL();
            return $this->renderSuccess('', compact('category', 'model'));
        }
        // 商品详情
        $model = ProductModel::detail($product_id);
        // 更新记录
        if ($model->edit(json_decode($this->postData()['params'], true))) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 修改商品状态
     */
    public function state($product_id, $state)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if (!$model->setStatus($state)) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * 删除商品
     */
    public function delete($product_id)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}
