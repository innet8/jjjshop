<?php

namespace app\shop\controller\plus\queue;

use app\shop\controller\Controller;
use app\shop\model\plus\queue\QueueTable as QueueTableModel;

/**
 * 桌号控制器
 */
class Table extends Controller
{
    /**
     * 桌号列表
     */
    public function index()
    {
        $model = new QueueTableModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加
     */
    public function add()
    {
        $model = new QueueTableModel;
        //传过来的信息
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        // 新增记录
        if ($model->add($data)) {
            return $this->renderSuccess('', '添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 编辑
     */
    public function edit($table_id)
    {
        $model = QueueTableModel::detail($table_id);
        //编辑店员的数据
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('', '更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }
    /**
     * 编辑
     */
    public function onwitch($table_id)
    {
        $model = QueueTableModel::detail($table_id);
        //编辑店员的数据
        if ($model->onwitch($this->postData())) {
            return $this->renderSuccess('', '操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
    /**
     * 删除
     */
    public function delete($table_id)
    {
        // 详情
        $model = QueueTableModel::detail($table_id);
        if (!$model->setDelete($table_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('', '删除成功');
    }
}