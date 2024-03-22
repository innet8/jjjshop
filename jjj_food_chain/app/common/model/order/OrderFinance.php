<?php

namespace app\common\model\order;

use app\common\model\BaseModel;
use app\shop\service\order\ExportService;

/**
 * 财务对账
 */
class OrderFinance extends BaseModel
{
    protected $name = 'order_finance';
    protected $pk = 'finance_id';

    /**
     * 属性
     */
    public function getTimeAttr($value)
    {
        return date('Y-m-d', $value);
    }

    /**
     * 详情
     */
    public static function detail($finance_id)
    {
        return self::where('finance_id', '=', $finance_id)->find();
    }

    //列表
    public function getList($data, $order_type = -1)
    {
        $model = $this;
        switch ($data['type']) {
            case '1'://今天
                $model = $model->where('time', '=', strtotime(date('Y-m-d')));
                break;
            case '2'://近7天
                $model = $model->where('time', '>=', strtotime(-6 . ' days', strtotime(date('Y-m-d'))));
                break;
            case '3'://近15天
                $model = $model->where('time', '>=', strtotime(-14 . ' days', strtotime(date('Y-m-d'))));
                break;
            case '4'://自定义
                $start = strtotime($data['time'][0]);
                $end = strtotime($data['time'][1]) + 86399;
                $model = $model->where('time', 'between', "$start,$end");
                break;
            default:
                $model = $model->where('time', '=', strtotime(date('Y-m-d')));
                break;
        }
        if ($order_type >= 0) {
            if ($order_type == 1) {
                $model = $model->where('in_total_money', '>', 0);
            } else {
                $model = $model->where('out_total_money', '>', 0);
            }
        }
        if ($data['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $data['shop_supplier_id']);
        }
        $list = $model->order('finance_id desc')
            ->paginate($data);
        if (count($list) > 0) {
            foreach ($list as &$item) {
                if ($order_type == 1) {//店内
                    $item['total_money'] = $item['in_total_money'];
                    $item['revenue_money'] = $item['in_revenue_money'];
                    $item['order_count'] = $item['in_order_count'];
                    $item['refund_money'] = $item['in_refund_money'];
                } elseif ($order_type == 0) {//外卖
                    $item['total_money'] = $item['out_order_count'];
                    $item['revenue_money'] = $item['out_revenue_money'];
                    $item['order_count'] = $item['out_order_count'];
                    $item['refund_money'] = $item['out_refund_money'];
                }
            }
        }
        return $list;
    }

    //获取外卖概况
    public function getBaic($finance_id, $data, $order_type = 0)
    {
        $model = new Order;
        $detail = $this->alias('f')
            ->where('f.finance_id', '=', $finance_id)
            ->join('order o', 'o.finance_id=f.finance_id')
            ->field('sum(pay_price) as total_price,sum(pay_price-o.refund_money) as revenue_money,sum(o.refund_money) as refund_money,count(order_id) as order_count')
            ->where('order_type', '=', $order_type)
            ->find();
        $detail['total_price'] = $detail['total_price'] ? $detail['total_price'] : 0;
        $detail['revenue_money'] = $detail['revenue_money'] ? $detail['revenue_money'] : 0;
        $detail['refund_money'] = $detail['refund_money'] ? $detail['refund_money'] : 0;
        $list = $model->where('finance_id', '=', $finance_id)
            ->where('order_type', '=', $order_type)
            ->order('order_id desc')
            ->paginate($data);
        $delivery['detail'] = $detail;
        $delivery['list'] = $list;
        return $delivery;
    }

    /**
     * 订单导出
     */
    public function exportList($data)
    {
        // 获取订单列表
        $list = $this->getOrderList($data);
        // 导出excel文件
        return (new Exportservice)->financeOrderList($list);
    }

    //获取订单数据
    public function getOrderList($data)
    {
        $model = new Order;
        $list = $model->where('order_type', '=', $data['order_type'])
            ->where('finance_id', '=', $data['finance_id'])
            ->order('order_id desc')
            ->select();
        return $list;
    }

    // 添加对账
    public function add($data)
    {
        $time = strtotime(date('Y-m-d'));
        $finance = $this->where('shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('time', '=', $time)
            ->find();
        $finance_id = 0;
        if ($finance) {
            $update['order_count'] = $finance['order_count'] + 1;
            $update['total_money'] = $finance['total_money'] + $data['pay_price'];
            $update['revenue_money'] = $finance['revenue_money'] + $data['pay_price'] - $data['refund_money'];
            $update['refund_money'] = $finance['refund_money'] + $data['refund_money'];
            if ($data['order_type'] == 0) {
                $update['out_order_count'] = $finance['out_order_count'] + 1;
                $update['out_total_money'] = $finance['out_total_money'] + $data['pay_price'];
                $update['out_revenue_money'] = $finance['out_revenue_money'] + $data['pay_price'] - $data['refund_money'];
                $update['out_refund_money'] = $finance['out_refund_money'] + $data['refund_money'];
            }else{
                $update['in_order_count'] = $finance['in_order_count'] + 1;
                $update['in_total_money'] = $finance['in_total_money'] + $data['pay_price'];
                $update['in_revenue_money'] = $finance['in_revenue_money'] + $data['pay_price'] - $data['refund_money'];
                $update['in_refund_money'] = $finance['in_refund_money'] + $data['refund_money'];
            }
            $finance->save($update);
            $finance_id = $finance['finance_id'];
        } else {
            $add['time'] = $time;
            $add['total_money'] = $data['pay_price'];
            $add['revenue_money'] = $data['pay_price'] - $data['refund_money'];
            $add['refund_money'] = $data['refund_money'];
            $add['order_count'] = 1;
            $add['shop_supplier_id'] = $data['shop_supplier_id'];
            $add['app_id'] = $data['app_id'];
            if ($data['order_type'] == 0) {
                $add['out_order_count'] = 1;
                $add['out_total_money'] = $data['pay_price'];
                $add['out_revenue_money'] = $data['pay_price'] - $data['refund_money'];
                $add['out_refund_money'] = $data['refund_money'];
            }else{
                $add['in_order_count'] = 1;
                $add['in_total_money'] = $data['pay_price'];
                $add['in_revenue_money'] = $data['pay_price'] - $data['refund_money'];
                $add['in_refund_money'] = $data['refund_money'];
            }
            $this->save($add);
            $finance_id = $this['finance_id'];
        }
        (new Order)->where('order_id', '=', $data['order_id'])->save(['finance_id' => $finance_id]);
    }
}