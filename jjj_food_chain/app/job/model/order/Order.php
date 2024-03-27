<?php

namespace app\job\model\order;

use app\common\enum\order\OrderSourceEnum;
use app\common\model\order\Order as OrderModel;
use app\common\model\order\OrderDeliver as OrderDeliverModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\message\MessageService;
use app\common\service\deliveryapi\MeTuanApi;
use app\common\service\deliveryapi\UuApi;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 获取订单列表
     */
    public function getCloseList($with, $app_id)
    {
        return $this->with($with)
            ->where('pay_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('pay_end_time', '<=', time())
            ->where('pay_end_time', '>', 0)
            ->where('is_delete', '=', 0)
            ->where('app_id', '=', $app_id)
            ->select();
    }


    /**
     * 获取订单列表
     */
    public function getReceiveList($orderIds, $with = [])
    {
        return $this->with($with)
            ->where('order_id', 'in', $orderIds)
            ->select();
    }

    /**
     * 获取订单列表
     */
    public function getSettledList($deadlineTime, $with, $app_id)
    {
        return $this->with($with)
            ->where('order_status', '=', 30)
            ->where('receipt_time', '<=', $deadlineTime)
            ->where('is_settled', '=', 0)
            ->where('app_id', '=', $app_id)
            ->select();
    }

    /**
     * 达达回调更新订单状态
     */
    public function dadaOrder($data)
    {
        $order = OrderModel::detail($data['order_id']);
        if (!$order && $order['deliver_source'] != 20) {
            return false;
        }
        //订单状态(待接单＝1,待取货＝2,配送中＝3,已完成＝4,已取消＝5, 指派单=8,妥投异常之物品返回中=9, 妥投异常之物品返回完成=10, 骑士到店=100,创建达达运单失败=1000 可参考文末的状态说明）
        OrderDeliverModel::where('order_id', '=', $data['order_id'])
            ->update([
                'deliver_status' => $data['order_status'],
                'client_id' => $data['client_id'],
                'linkman' => isset($data['dm_name']) ? $data['dm_name'] : '',
                'phone' => isset($data['dm_mobile']) ? $data['dm_mobile'] : '',
                'deliver_time' => $data['order_status'] == 4 ? time() : '',
                'status' => $data['order_status'] == 4 ? 30 : 10,
            ]);
        OrderModel::where('order_id', '=', $data['order_id'])
            ->update([
                'deliver_status' => $data['order_status'] == 5 ? 0 : $data['order_status'],
                'deliver_source' => $data['order_status'] == 5 ? 10 : 20,
                'delivery_status' => $data['order_status'] == 5 ? 10 : 20,
                'deliver_time' => $data['order_status'] == 4 ? time() : '',
            ]);
    }

    /**
     * 美团回调更新订单状态
     */
    public function metuanOrder($params)
    {
        $this->startTrans();
        try {
            if (empty($params) || empty($params['sign'])) {
                return false;
            }
            $order = OrderModel::detail(['order_no' => $params['order_id']]);
            if (!$order && $order['deliver_source'] != 40) {
                return false;
            }
            $get_sign = $params['sign'];
            unset($params['sign']);
            $new_sign = (new MeTuanApi($order['shop_supplier_id'], $order['app_id']))->signature($params);
            if ($get_sign != $new_sign) {
                return false;
            }
            //订单状态(0：待调度20：已接单30：已取货50：已送达99：已取消）
            $status = 10;
            $deliver_status = 1;
            switch ($params['status']) {
                case '0':
                    $deliver_status = 1;
                    break;
                case '20':
                    $deliver_status = 2;
                    break;
                case '30':
                    $deliver_status = 3;
                    break;
                case '50':
                    $deliver_status = 4;
                    $status = 30;
                    break;
                case '99':
                    $deliver_status = 5;
                    $status = 20;
                    break;
            }
            OrderDeliverModel::where('order_id', '=', $order['order_id'])
                ->update([
                    'deliver_status' => $deliver_status,
                    'linkman' => isset($params['courier_name']) ? $params['courier_name'] : '',
                    'phone' => isset($params['courier_phone']) ? $params['courier_phone'] : '',
                    'deliver_time' => $deliver_status == 4 ? time() : '',
                    'status' => $status,
                ]);
            $order->save([
                'deliver_status' => $deliver_status == 5 ? 0 : $deliver_status,
                'deliver_source' => $deliver_status == 5 ? 10 : 40,
                'delivery_status' => $deliver_status == 5 ? 10 : 20,
                'deliver_time' => $deliver_status == 4 ? time() : '',
            ]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * UU跑腿回调更新订单状态
     */
    public function uuOrder($params)
    {
        $this->startTrans();
        try {
            if (empty($params) || $params['return_code'] != "ok" || empty($params['sign'])) {
                return false;
            }
            $order = OrderModel::detail(['order_no' => $params['origin_id']]);
            if (!$order && $order['deliver_source'] != 50) {
                return false;
            }
            //订单状态1下单成功 3跑男抢单 4已到达 5已取件 6到达目的地 10收件人已收货 -1订单取消
            $status = 10;
            $deliver_status = 1;
            if ($params['state'] == 1) {
                $deliver_status = 1;
            } elseif ($params['state'] == 3) {
                $deliver_status = 2;
            } elseif (in_array($params['state'], [4, 5, 6])) {
                $deliver_status = 3;
            } elseif ($params['state'] == 10) {
                $deliver_status = 4;
                $status = 30;
            } elseif ($params['state'] == -1) {
                $deliver_status = 4;
                $status = 20;
            }
            OrderDeliverModel::where('order_id', '=', $order['order_id'])
                ->update([
                    'deliver_status' => $deliver_status,
                    'linkman' => isset($params['driver_name']) ? $params['driver_name'] : '',
                    'phone' => isset($params['driver_mobile']) ? $params['driver_mobile'] : '',
                    'deliver_time' => $deliver_status == 4 ? time() : '',
                    'status' => $status,
                ]);
            $order->save([
                'deliver_status' => $deliver_status == 5 ? 0 : $deliver_status,
                'deliver_source' => $deliver_status == 5 ? 10 : 50,
                'delivery_status' => $deliver_status == 5 ? 10 : 20,
                'deliver_time' => $deliver_status == 4 ? time() : '',
            ]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 获取外卖未配送订单列表
     */
    public function getDeliverList($app_id)
    {
        $supplierList = SupplierModel::where('app_id', '=', $app_id)
            ->where('is_delete', '=', 0)
            ->where('status', '=', 0)
            ->where('is_recycle', '=', 0)
            ->select();
        $supplierId = [];
        foreach ($supplierList as $key => $item) {
            $deliver = SettingModel::getSupplierItem('deliver', $item['shop_supplier_id'], $app_id)['default'];
            if ($deliver == 'local') {
                $supplierId[] = $item['shop_supplier_id'];
            }
        }
        if ($supplierId) {
            return $this->where('pay_status', '=', 20)
                ->where('order_status', '=', 10)
                ->where('delivery_status', '=', 10)
                ->where('deliver_status', '=', 0)
                ->where('app_id', '=', $app_id)
                ->where('shop_supplier_id', 'in', $supplierId)
                ->column('order_id');
        }
        return [];
    }

    /**
     * 获取外卖未配送订单列表
     */
    public function sellerDeliver($data, $app_id)
    {
        $deliver = SettingModel::getSupplierItem('deliver', $data['shop_supplier_id'], $app_id);
        if ($deliver['default'] == 'local' && $deliver['engine']['local']['time'] > 0) {
            if ($data['pay_time'] + $deliver['engine']['local']['time'] * 60 < time()) {
                $this->startTrans();
                try {
                    $this->sendLocal($data);
                    $Service = new MessageService;
                    // 发送消息通知
                    $Service->delivery($data);
                    $this->commit();
                    return true;
                } catch (\Exception $e) {
                    $this->error = $e->getMessage();
                    $this->rollback();
                    return false;
                }
            }
            return false;
        } else {
            return false;
        }
    }
}
