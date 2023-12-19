<?php

namespace app\shop\controller\appsetting;

use app\shop\controller\Controller;
use app\shop\model\app\AppUpdate as AppUpdateModel;

/**
 * 升级管理
 */
class Appupdate extends Controller
{
    /**
     * 列表
     */
    public function index()
    {
        $model = new AppUpdateModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 新增
     */
    public function add()
    {
        $model = new AppUpdateModel();
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 编辑
     */
    public function edit($update_id)
    {
        $model = AppUpdateModel::detail($update_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError()?:'更新失败');
    }

    /**
     * 删除
     */
    public function delete($update_id)
    {
        $model = AppUpdateModel::detail($update_id);
        if ($model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }
}
