<?php


namespace app\cashier\model\store;

use app\common\model\store\Table as TableModel;
use app\cashier\model\order\Order as OrderModel;
use app\cashier\model\order\Cart as CartModel;

/**
 * 桌位模型
 */
class Table extends TableModel
{
    /**
     * 获取列表数据
     */
    public function getList($area_id, $type_id, $user)
    {
        $model = $this;
        // 查询列表数据
        $list = $model->with(['supplier'])
            ->where('area_id', '=', $area_id)
            ->where('type_id', '=', $type_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
        foreach ($list as &$item) {
            $status = 10;//未开始
            $orderInfo = OrderModel::getTableInfo($item['table_id']);
            if ($orderInfo) {
                if ($orderInfo['order_source'] == 10) {//小程序下单
                    if ($orderInfo['pay_status']['value'] == 20 && $orderInfo['order_status']['value'] == 10) {
                        $status = 30;//就餐中
                        $item['use_time'] = $this->formatPayEndTime(time() - strtotime($orderInfo['create_time']));
                    }
                } else {//收银台下单
                    if ($orderInfo['order_status']['value'] == 10) {
                        $status = 30;//就餐中
                        $item['use_time'] = $this->formatPayEndTime(time() - strtotime($orderInfo['create_time']));
                    } else {
                        $count = (new CartModel)->where('eat_type', '=', 10)
                            ->where('table_id', '=', $item['table_id'])
                            ->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                            ->where('is_stay', '=', 0)
                            ->where('cashier_id', '=', $user['cashier_id'])
                            ->count();
                        if ($count > 0) {
                            $status = 20;//已开始
                        }
                    }
                }
            }
            $item['status'] = $status;
        }
        return $list;
    }

    private function formatPayEndTime($leftTime)
    {
        if ($leftTime <= 0) {
            return '';
        }

        $str = '';
//        $day = floor($leftTime / 86400);
        $hour = floor($leftTime / 3600);
        $min = floor(($leftTime - $hour * 3600) / 60);
        $sec = floor($leftTime - $hour * 3600 - $min * 60);
//        if ($day > 0) $str .= $day . '天';
        if ($hour > 0) $str .= $hour . '小时';
        if ($min > 0) $str .= $min . '分';
        if ($sec > 0) $str .= $sec . '秒';
        return $str;
    }


}