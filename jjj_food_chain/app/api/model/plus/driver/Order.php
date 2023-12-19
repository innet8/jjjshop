<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\Order as DriverOrderModel;
use app\common\service\order\OrderService;
use app\common\enum\order\OrderTypeEnum;
use app\api\model\order\Order as OrderModel;
use app\common\model\order\OrderDeliver as OrderDeliverModel;
use app\common\service\message\MessageService;

/**
 * 配送员订单模型
 */
class Order extends DriverOrderModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'update_time',
    ];

    /**
     * 获取配送员订单列表
     */
    public function getList($user_id, $is_settled = -1)
    {
        $model = $this;
        $is_settled > -1 && $model = $model->where('is_settled', '=', $is_settled);
        $data = $model->with(['user'])
            ->where('user_id', '=', $user_id)
            ->order(['create_time' => 'desc'])
            ->paginate(15, false, [
                'query' => \request()->request()
            ]);
        if ($data->isEmpty()) {
            return $data;
        }
        // 整理订单信息
        $with = ['product' => ['image', 'refund'], 'address', 'user'];
        return OrderService::getOrderList($data, 'order_master', $with);
    }

    /**
     * 创建配送员订单记录
     */
    public static function createOrder(&$order, $user, $order_type = OrderTypeEnum::MASTER)
    {
        // 配送员订单模型
        $model = new self;
        // 保存分销订单记录
        return $model->save([
            'user_id' => $user['user_id'],
            'order_id' => $order['order_id'],
            'order_type' => $order_type,
            'order_price' => $order['order_price'],
            'take_fee' => $order['take_fee'],
            'is_settled' => 0,
            'app_id' => $order['app_id']
        ]);
    }

    /**
     * 用户中心订单列表
     */
    public function getTakeList($params)
    {
        // 筛选条件
        $model = new OrderModel();
        $list = $model->with(['product.image', 'address'])
            ->where('delivery_type', '=', 10)
            ->where('delivery_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('pay_status', '=', 20)
            ->where('is_delete', '=', 0)
            ->where('deliver_source', '=', 30)
            ->order(['create_time' => 'desc'])
            ->paginate($params, false, [
                'query' => \request()->request()
            ]);
        foreach ($list as $key => &$value) {
            $total_num = 0;
            foreach ($value['product'] as $kk => $v) {
                $total_num += $v['total_num'];
            }
            $value['total_num'] = $total_num;
        }
        return $list;
    }

    //骑手接单
    public function receiveOrder($order_id, $user)
    {
        $takeStatus = (new Apply())->applyStatus($user);
        $agentUser = (new User())->where('user_id', '=', $user['user_id'])->find();
        if ($takeStatus != 2 || $agentUser['status'] == 1) {
            $this->error = "您还不是骑手，不允许接单";
            return false;
        }
        $orderInfo = OrderModel::detail($order_id);
        if ($orderInfo['delivery_status']['value'] != 10 || $orderInfo['order_status']['value'] != 10 || $orderInfo['deliver_source'] != 30) {
            $this->error = "该订单不允许接单";
            return false;
        }
        $this->startTrans();
        try {
            self::createOrder($orderInfo, $user);//创建订单
            //更新订单状态
            $orderInfo->save([
                'delivery_status' => 20,
                'driver_id' => $user['user_id'],
                'delivery_time' => time(),
                'deliver_status' => 3,
            ]);
            $add = [
                'deliver_source' => 30,
                'order_id' => $orderInfo['order_id'],
                'order_no' => $orderInfo['order_no'],
                'distance' => $orderInfo->getDistance($orderInfo['supplier']['longitude'], $orderInfo['supplier']['latitude'], $orderInfo['address']['longitude'], $orderInfo['address']['latitude']),
                'price' => $orderInfo['take_fee'],
                'shop_supplier_id' => $orderInfo['shop_supplier_id'],
                'deliver_status' => 3,
                'linkman' => $agentUser['real_name'],
                'phone' => $agentUser['mobile'],
                'app_id' => self::$app_id
            ];
            (new OrderDeliverModel())->save($add);
            // 实例化消息通知服务类
            $Service = new MessageService;
            // 发送消息通知
            $Service->delivery($orderInfo, OrderTypeEnum::MASTER);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 用户中心订单列表
     */
    public function driverList($params, $user)
    {
        // 筛选条件
        $model = (new OrderModel)->alias('o');
        if ($params['type'] == 1) {
            $begintoday = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
            $endtoday = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
            $model = $model->whereBetween('do.create_time', "$begintoday,$endtoday");
        }
        $list = $model->with(['product.image', 'address'])
            ->where('pay_status', '=', 20)
            ->where('driver_id', '=', $user['user_id'])
            ->join('driver_order do', 'o.order_id=do.order_id')
            ->field('do.create_time as create_time,o.order_id,o.take_fee,o.order_status,o.delivery_status,o.pay_status,o.order_source,o.delivery_type,o.receipt_status,mealtime,o.order_type,deliver_status')
            ->order(['do.create_time' => 'desc'])
            ->paginate($params, false, [
                'query' => \request()->request()
            ]);
        foreach ($list as $key => &$value) {
            $total_num = 0;
            foreach ($value['product'] as $kk => $v) {
                $total_num += $v['total_num'];
            }
            $value['total_num'] = $total_num;
        }
        return $list;
    }
}
