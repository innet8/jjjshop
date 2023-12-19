<?php

namespace app\cashier\model\store;

use app\common\model\store\TableArea as TableAreaModel;
use app\cashier\model\order\Order as OrderModel;

/**
 * 桌位区域模型
 */
class TableArea extends TableAreaModel
{
    /**
     * 获取列表数据
     */
    public function getList($shop_supplier_id)
    {
        $model = $this;
        // 查询列表数据
        $list = $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
        foreach ($list as &$item) {
            $typeIds = (new Table())->where('area_id', '=', $item['area_id'])->column('type_id');
            $typeList = (new TableType())->where('type_id', 'in', array_unique($typeIds))
                ->order(['sort' => 'asc', 'create_time' => 'desc'])
                ->select();
            foreach ($typeList as &$value) {
                $value['num'] = (new Table())->where('area_id', '=', $item['area_id'])
                    ->where('type_id', '=', $value['type_id'])
                    ->count();
            }
            $item['typeList'] = $typeList;
        }
        return $list;
    }

    /**
     * 获取列表数据
     */
    public function getTableList($shop_supplier_id, $table_id)
    {
        $model = $this;
        // 查询列表数据
        $list = $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
        foreach ($list as &$item) {
            $typeIds = (new Table())->where('area_id', '=', $item['area_id'])->column('type_id');
            $typeList = (new TableType())->where('type_id', 'in', array_unique($typeIds))
                ->order(['sort' => 'asc', 'create_time' => 'desc'])
                ->select();
            foreach ($typeList as &$value) {
                $tableList = (new Table())->where('area_id', '=', $item['area_id'])
                    ->where('type_id', '=', $value['type_id'])
                    ->where('table_id', '<>', $table_id)
                    ->order(['sort' => 'asc', 'create_time' => 'desc'])
                    ->select();
                foreach ($tableList as $key => $table) {
                    $orderInfo = OrderModel::getTableInfo($item['table_id']);
                    if ($orderInfo) {
                        if ($orderInfo['order_source'] == 10) {//小程序下单
                            if ($orderInfo['pay_status']['value'] == 20 && $orderInfo['order_status']['value'] == 10) {
                                unset($tableList[$key]);
                            }
                        } else {//收银台下单
                            if ($orderInfo['order_status']['value'] == 10) {
                                unset($tableList[$key]);
                            }
                        }
                    }
                }
                $value['tableList'] = $tableList;
            }
            $item['typeList'] = $typeList;
        }
        return $list;
    }
}