<?php

namespace app\shop\controller\plus\driver;

use app\shop\controller\Controller;
use app\shop\model\plus\driver\User as UserModel;

/**
 * 配送员控制器
 */
class User extends Controller
{
    /**
     * 配送员申请列表
     */
    public function index($nick_name = '')
    {
        $model = new UserModel;
        $list = $model->getList($nick_name);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 编辑配送员
     * @param $dealer_id
     * @return mixed
     * @throws \think\exception\DbException
     */
    public function edit($user_id)
    {
        $model = UserModel::detail($user_id);
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('model'));
        }
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 软删除配送员用户
     */
    public function delete($user_id)
    {
        $model = UserModel::detail($user_id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}