<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\plus\package\Package as PackageModel;
use app\shop\model\plus\package\Order;
use app\shop\model\user\Grade as GradeModel;

/**
 * 券包控制器
 */
class Package extends Controller
{
    /*
     * 券包列表
     */
    public function index()
    {
        $model = new PackageModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 获取数据
     * @param null $id
     */
    public function detail($id)
    {
        $model = new PackageModel();
        $data = $model->getPackage($id);
        $GradeModel = new GradeModel;
        $list = $GradeModel->getLists();
        return $this->renderSuccess('', compact('data','list'));
    }

    /**
     *保存券包
     */
    public function add()
    {
        $GradeModel = new GradeModel;
        $list = $GradeModel->getLists();
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('list'));
        }
        $model = new PackageModel();
        if ($model->savePackage($this->postData())) {
            return $this->renderSuccess('保存成功');
        }
        return $this->renderError($model->getError() ?: '保存失败');
    }

    /**
     *修改
     */
    public function edit($package_id)
    {
        $model = PackageModel::detail($package_id);
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * 发布
     */
    public function send($id)
    {
        $model = new PackageModel();
        if ($model->send($id)) {
            return $this->renderSuccess('发布成功');
        }
        return $this->renderError('发布失败');
    }

    /**
     * 终止
     */
    public function end($id)
    {
        $model = new PackageModel();
        if ($model->end($id)) {
            return $this->renderSuccess('终止成功');
        }
        return $this->renderError('终止失败');
    }

    /**
     * 删除
     */
    public function delete($id)
    {
        $model = new PackageModel();
        if ($model->del($id)) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

    /**
     * 购买记录
     */
    public function orderlist()
    {
        $model = new Order();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}