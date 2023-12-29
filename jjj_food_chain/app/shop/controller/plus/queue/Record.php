<?php

namespace app\shop\controller\plus\queue;

use app\shop\controller\Controller;
use app\shop\model\plus\queue\QueueRecord as QueueRecordModel;

/**
 * 取号记录控制器
 */
class Record extends Controller
{
    /**
     * 取号记录列表
     */
    public function index()
    {
        $model = new QueueRecordModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 编辑
     */
    public function edit($record_id)
    {
        $model = QueueRecordModel::detail($record_id);
        //编辑店员的数据
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

}