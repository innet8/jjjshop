<?php


namespace app\cashier\model\store;

use app\common\model\store\TableType as TableTypeModel;

/**
 * 桌位类型模型
 */
class TableType extends TableTypeModel
{
    /**
     * 获取列表数据
     */
    public function getList($params, $shop_supplier_id)
    {
        $model = $this;
        if (!empty($search)) {
            $model = $model->like('type_name', $search);
        }
        // 查询列表数据
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($params);
    }
}