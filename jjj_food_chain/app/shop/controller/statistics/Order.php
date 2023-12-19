<?php

namespace app\shop\controller\statistics;

use app\shop\controller\Controller;
use app\shop\model\order\Order as OrderModel;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\shop\model\order\OrderFinance as OrderFinanceModel;
use app\common\service\statistics\OrderService;

/**
 * 订单统计数据控制器
 */
class Order extends Controller
{
    /**
     * 店内订单数据
     *
     */
    public function index()
    {
        $data = $this->postData();
        $model = new OrderModel();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        //基础数据
        $detail = $model->getOrderTotalMoney($data['order_type'], $data['shop_supplier_id'], $data);
        //商家数据
        $supplierList = SupplierModel::getAll();
        //营业概况
        $list = (new OrderFinanceModel)->getList($data, $data['order_type']);
        //曲线图
        $days = $this->getDays($data['type'], $data['time']);
        $profileList = (new OrderService($data['shop_supplier_id']))->getOrderDataByDate($days, $data['order_type']);
        return $this->renderSuccess('', compact('detail', 'profileList', 'days', 'supplierList', 'list'));
    }

    /**
     * 获取具体日期数组
     */
    private function getDays($type, $time)
    {
        switch ($type) {
            case '1'://今天
                $start_time = date('Y-m-d', time());
                $end_time = date('Y-m-d', time());
                break;
            case '2'://近7天
                $start_time = date('Y-m-d', strtotime('-6 day', time()));
                $end_time = date('Y-m-d', time());
                break;
            case '3'://近15天
                $start_time = date('Y-m-d', strtotime('-14 day', time()));
                $end_time = date('Y-m-d', time());
                break;
            case '4'://自定义
                $start_time = $time[0];
                $end_time = $time[1];
                break;
            default:
                $start_time = date('Y-m-d', strtotime('-6 day', time()));
                $end_time = date('Y-m-d', time());
                break;
        }
        $dt_start = strtotime($start_time);
        $dt_end = strtotime($end_time);
        $date = [];
        $date[] = $start_time;
        while ($dt_start < $dt_end) {
            $date[] = date('Y-m-d', strtotime('+1 day', $dt_start));
            $dt_start = strtotime('+1 day', $dt_start);
        }
        return $date;
    }
}