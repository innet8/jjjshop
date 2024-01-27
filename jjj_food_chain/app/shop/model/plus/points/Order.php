<?php

namespace app\shop\model\plus\points;

use app\common\model\plus\points\Order as OrderModel;
use app\common\enum\order\OrderTypeEnum;
use app\common\service\message\MessageService;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\settings\DeliveryTypeEnum;
use app\shop\service\order\ExportService;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 订单列表
     */
    public function getList($order_status, $data, $user)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        if ($user['user_type'] == 1) {
            $model = $model->where('order.shop_supplier_id', '=', $user['shop_supplier_id']);
        }
        // 获取数据列表
        return $model->alias('order')->with(['image', 'user'])
            ->field('order.*')
            ->join('user', 'user.user_id = order.user_id')
            ->order(['order.create_time' => 'desc'])
            ->where('pay_status', '=', 20)
            ->where($this->transferDataType($order_status))
            ->paginate($data);
    }

    /**
     * 获取订单总数
     */
    public function getCount($dataType, $data)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->alias('order')
            ->where($this->transferDataType($dataType))
            ->count();
    }

    /**
     * 订单导出
     */
    public function exportList($order_status, $data, $user)
    {
        // 获取订单列表
        $list = $this->getListAll($order_status, $data, $user);
        // 导出excel文件
        (new Exportservice)->pointsList($list);
    }

    /**
     * 订单列表(全部)
     */
    public function getListAll($order_status, $data, $user)
    {
        $model = $this;
        if ($user['user_type'] == 1) {
            $model = $model->where('order.shop_supplier_id', '=', $user['shop_supplier_id']);
        }
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->alias('order')->with(['image', 'user'])
            ->field('order.*')
            ->join('user', 'user.user_id = order.user_id')
            ->order(['order.create_time' => 'desc'])
            ->where('pay_status', '=', 20)
            ->where($this->transferDataType($order_status))
            ->select();
    }

    /**
     * 设置检索查询条件
     */
    private function setWhere($model, $data)
    {
        //搜索订单号
        if (isset($data['order_no']) && $data['order_no'] != '') {
            $model = $model->like('order.order_no', trim($data['order_no']));
        }
        //搜索自提门店
        if (isset($data['store_id']) && $data['store_id'] != '') {
            $model = $model->where('order.extract_store_id', '=', $data['store_id']);
        }
        //搜索配送方式
        if (isset($data['style_id']) && $data['style_id'] != '') {
            $model = $model->where('order.delivery_type', '=', $data['style_id']);
        }
        if (isset($data['nickName']) && !empty($data['nickName'])) {
            $model = $model->like('user.nickName', trim($data['nickName']));
        }
        //搜索时间段
        if (isset($data['create_time']) && $data['create_time'] != '') {
            $sta_time = array_shift($data['create_time']);
            $end_time = array_pop($data['create_time']);
            $model = $model->whereBetweenTime('order.create_time', $sta_time, $end_time);
        }
        return $model;
    }

    /**
     * 转义数据类型条件
     */
    private function transferDataType($dataType)
    {
        $filter = [];
        // 订单数据类型
        switch ($dataType) {
            case '0':
                break;
            case '10';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_type'] = 10;
                $filter['delivery_status'] = 10;
                break;
            case '20';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_type'] = 10;
                $filter['delivery_status'] = 20;
                break;
            case '30';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_type'] = 20;
                $filter['order_status'] = 10;
                break;
            case '40';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['order_status'] = 30;
                break;
        }
        return $filter;
    }

    /**
     * 确认发货(单独订单)
     */
    public function delivery($data)
    {
        // 转义为订单列表
        $orderList = [$this];
        // 验证订单是否满足发货条件
        if (!$this->verifyDelivery($orderList)) {
            return false;
        }
        // 整理更新的数据
        $updateList = [[
            'order_id' => $this['order_id'],
            'express_id' => $data['express_id'],
            'express_no' => $data['express_no']
        ]];
        // 更新订单发货状态
        if ($status = $this->updateToDelivery($updateList)) {
            // 发送消息通知
            $Service = new MessageService;
            $Service->pointsDelivery($this);
        }
        return $status;
    }

    /**
     * 更新订单发货状态(批量)
     */
    private function updateToDelivery($orderList)
    {
        $data = [];
        foreach ($orderList as $item) {
            $data[] = [
                'data' => [
                    'express_no' => $item['express_no'],
                    'express_id' => $item['express_id'],
                    'delivery_status' => 20,
                    'delivery_time' => time(),
                ],
                'where' => [
                    'order_id' => $item['order_id']
                ],
            ];
        }
        return $this->updateAll($data);
    }

    /**
     * 验证订单是否满足发货条件
     */
    private function verifyDelivery($orderList)
    {
        foreach ($orderList as $order) {
            if (
                $order['pay_status']['value'] != 20
                || $order['delivery_type']['value'] != DeliveryTypeEnum::EXPRESS
                || $order['delivery_status']['value'] != 10
            ) {
                $this->error = "订单号[{$order['order_no']}] 不满足发货条件!";
                return false;
            }
        }
        return true;
    }

}