<?php


namespace app\shop\model\plus\queue;

use app\common\model\plus\queue\QueueRecord as QueueRecordModel;

/**
 * 排队取号记录模型
 */
class QueueRecord extends QueueRecordModel
{
    /**
     * 获取列表数据
     */
    public function getList($params, $shop_supplier_id)
    {
        $model = $this;
        if (!empty($params['search']) && $params['search']) {
            $model = $model->like('mobile', $params['search']);
        }
        if (!empty($params['status']) && $params['status']) {
            $model = $model->where('status', '=', $params['status']);
        }
        if (isset($params['create_time']) && $params['create_time'] != '') {
            $model = $model->where('create_time', 'between', [strtotime($params['create_time'][0]), strtotime($params['create_time'][1]) + 86399]);
        }
        // 查询列表数据
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->with(['tables'])
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        return $this->save($data);
    }
}