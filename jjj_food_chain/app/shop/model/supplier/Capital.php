<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Capital as SupplierCapitalModel;

/**
 * 供应商资金明细模型
 */
class Capital extends SupplierCapitalModel
{
    /**
     * 获取余额变动明细列表
     */
    public function getList($data, $user)
    {
        $model = $this->alias('log')->field('log.*');
        // 商家名称
        $data['search'] = trim($data['search']);
        !empty($data['search']) && $model = $model->like('s.name', $data['search']);
        //搜索时间段
        if (isset($data['value1']) && $data['value1'] != '') {
            $model = $model->where('log.create_time', 'between', [strtotime($data['value1'][0]), strtotime($data['value1'][1]) + 86399]);
        }
        // 余额变动场景
        if ($data['scene']) {
            $model = $model->where('log.flow_type', '=', $data['scene']);
        }
        if ($user['user_type'] == 1) {
            $model = $model->where('log.shop_supplier_id', '=', $user['shop_supplier_id']);
        }
        // 获取列表数据
        return $model->with(['supplier'])
            ->join('supplier s', 's.shop_supplier_id = log.shop_supplier_id')
            ->order(['log.create_time' => 'desc'])
            ->paginate($data);
    }
}