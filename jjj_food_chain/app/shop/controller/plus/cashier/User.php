<?php

namespace app\shop\controller\plus\cashier;

use app\shop\controller\Controller;
use app\shop\model\plus\cashier\User as UserModel;

/**
 * 收银员控制器
 */
class User extends Controller
{

    /**
     * 列表
     */
    public function index()
    {
        // 供应商列表
        $model = new UserModel;
        $list = $model->getList($this->postData(), $this->store['user']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加
     */
    public function add()
    {
        $model = new UserModel;
        // 新增记录
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 编辑
     */
    public function edit($cashier_id)
    {
        $model = UserModel::detail($cashier_id);
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('model'));
        }
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 删除
     */
    public function delete($cashier_id)
    {
        // 店员详情
        $model = UserModel::detail($cashier_id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('', $model->getError() ?: '删除成功');
    }

    /**
     * 开启禁止
     */
    public function set($cashier_id, $status)
    {
        // 详情
        $model = UserModel::detail($cashier_id);
        if (!$model->setStatus($status)) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

}
