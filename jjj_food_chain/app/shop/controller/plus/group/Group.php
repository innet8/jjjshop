<?php

namespace app\shop\controller\plus\group;

use app\shop\controller\Controller;
use app\shop\model\plus\group\Group as GroupModel;
use app\shop\model\supplier\Supplier as SupplierModel;

/**
 * 团购控制器
 */
class Group extends Controller
{
    /**
     * 团购列表
     */
    public function index()
    {
        $model = new GroupModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加团购
     */
    public function add()
    {
        if ($this->request->isGet()) {
            // 门店列表
            $supplier = SupplierModel::getAll();
            return $this->renderSuccess('', compact('supplier'));
        }
        $model = new GroupModel;
        // 新增记录
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 更新文章
     */
    public function edit($group_id)
    {
        if ($this->request->isGet()) {
            // 门店列表
            $supplier = SupplierModel::getAll();
            $model = GroupModel::detail($group_id);
            return $this->renderSuccess('', compact('supplier', 'model'));
        }
        // 团购详情
        $model = GroupModel::detail($group_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 删除团购
     */
    public function delete($group_id)
    {
        // 团购详情
        $model = GroupModel::detail($group_id);
        if ($model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }

}