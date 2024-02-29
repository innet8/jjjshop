<?php

namespace app\tablet\model\order;

use app\common\enum\order\OrderStatusEnum;
use think\facade\Log;
use think\facade\Cache;
use app\api\model\order\OrderProduct;
use app\common\model\supplier\Supplier;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderSourceEnum;
use app\common\model\order\OrderProductReturn;
use app\common\model\order\Order as OrderModel;
use app\tablet\model\store\Table as TableModel;
use app\common\service\order\OrderRefundService;
use app\common\service\order\OrderCompleteService;
use app\common\service\product\factory\ProductFactory;
use app\cashier\service\order\paysuccess\type\MasterPaySuccessService;

/**
 * 普通订单模型
 */
class Order extends OrderModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'update_time',
    ];

    /**
     * 用户中心订单列表
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        if (isset($params['eat_type']) && $params['eat_type']) {
            $model = $model->where('eat_type', '=', $params['eat_type']);
        }
        if (isset($params['search']) && $params['search']) {
            $model = $model->like('order_no', $params['search']);
        }
        if (isset($params['order_type']) && $params['order_type']) {
            $model = $model->where('order_type', '=', $params['eat_type']);
        }


        $startTime = 0;
        $endTime = 0;
        //查询时间
        switch ($params['time_type'] ?? 1) {
            case '1'://今天
                $startTime = strtotime(date('Y-m-d'));
                $endTime = $startTime + 86399;
                break;
            case '2'://昨天
                $startTime = strtotime("-1 days", strtotime(date('Y-m-d')));
                $endTime = $startTime + 86399;
                break;
            case '3'://一周
                $startTime = strtotime("-7 days", strtotime(date('Y-m-d')));
                $endTime = time();
                break;
        }
        if (isset($params['time']) && $params['time']) {
            $startTime = strtotime($params['time'][0]);
            $endTime = strtotime($params['time'][0]) + 86399;
        }
        if ($startTime && $endTime) {
            $model = $model->where('create_time', 'between', [$startTime, $endTime]);
        }

        switch ($params['dataType'] ?? 1) {
            case '1'://进行中
                $model = $model->where('order_status', '=', 10);
                break;
            case '2'://已完成
                $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 30);
                break;
            case '3'://已取消
                $model = $model->where('order_status', '=', 20);
                break;
        }
        return $model->with(['product.image', 'supplier'])
            ->where('is_delete', '=', 0)
            ->where('delivery_type', 'in', [30, 40])
            ->where('eat_type', '<>', 0)
            ->order(['create_time' => 'desc'])
            ->field("*,FROM_UNIXTIME(pay_time,'%Y-%m-%d %H:%i:%s') as pay_time_text ")
            ->paginate($params);
    }

    /**
     * 标记订单已支付
     */
    public function onPayment($orderNo, $pay_type)
    {
        // 获取订单详情
        $PaySuccess = new MasterPaySuccessService($orderNo);
        // 发起余额支付
        $status = $PaySuccess->onPaySuccess($pay_type);
        if (!$status) {
            $this->error = $PaySuccess->getError();
        }
        return $status;
    }

    /**
     * 取消订单
     */
    public function cancel($table_id)
    {
        $detail = $this->where('table_id', '=', $table_id)
            ->where('order_status', '=', 10)
            ->where('eat_type', '=', 10)
            ->find();

        if (!$detail) {
            TableModel::close($table_id);
            $this->error = "订单不存在";
            return false;
        }

        if ($detail['pay_status']['value'] == 20) {
            TableModel::close($table_id);
            $this->error = "订单已付款，不允许取消";
            return false;
        }
        if ($detail['order_status']['value'] != 10) {
            $this->error = "订单状态错误，不允许取消";
            return false;
        }
        return $detail->save(['order_status' => 20]);
    }


    /**
     * 取消订单
     */
    public function cancels()
    {
        if ($this->pay_status['value'] == 20) {
            $this->error = "订单已付款，不允许取消";
            return false;
        }
        if ($this->order_status['value'] != 10) {
            $this->error = "订单状态错误，不允许取消";
            return false;
        }
        return $this->save(['order_status' => 20]);
    }

    /**
     * 待支付订单详情
     */
    public static function getPayDetail($orderNo)
    {
        $model = new static();
        return $model->where(['order_no' => $orderNo, 'pay_status' => 10, 'is_delete' => 0])->with(['product', 'user', 'supplier'])->find();
    }

    /**
     * 设置错误信息
     */
    protected function setError($error)
    {
        empty($this->error) && $this->error = $error;
    }

    /**
     * 是否存在错误
     */
    public function hasError()
    {
        return !empty($this->error);
    }

    /**
     * 主订单购买的数量
     * 未取消的订单
     */
    public static function getHasBuyOrderNum($user_id, $product_id)
    {
        $model = new static();
        return $model->alias('order')->where('order.user_id', '=', $user_id)
            ->join('order_product', 'order_product.order_id = order.order_id', 'left')
            ->where('order_product.product_id', '=', $product_id)
            ->where('order.order_source', '=', OrderSourceEnum::MASTER)
            ->where('order.order_status', '<>', 21)
            ->sum('total_num');
    }

    //查询桌号信息
    public static function getTableInfo($table_id)
    {
        return (new static())->where('table_id', '=', $table_id)
            ->where('is_delete', '=', 0)
            ->order('order_id desc')
            ->find();
    }

    //查询桌号订单信息
    public static function getOrderInfo($table_id)
    {
        return (new static())->with('product')
            ->where('table_id', '=', $table_id)
            ->where('order_status', '=', 10)
            ->where('is_delete', '=', 0)
            ->find();
    }

    //查询桌号信息
    public function orderPay($data)
    {
        if ($this['pay_status']['value'] != 10) {
            $this->error = "订单已支付";
            return false;
        }
        if (isset($data['user_id']) && $data['user_id'] > 0) {
            $this->save(['user_id' => $data['user_id']]);
        }
        return $this->onPayment($this['order_no'], $data['pay_type']);
    }

    //退菜
    public function moveProduct($order_product_id, $num, $return_reason = '')
    {
        if ($this['order_status']['value'] != 10) {
            $this->error = "订单已完成,不允许退菜";
            return false;
        }
        if (count($this['product']) <= 1) {
            $this->error = "仅剩一个商品，不允许退菜，请选择退单";
            return false;
        }
        $orderProduct = OrderProduct::detail($order_product_id);
        if ($orderProduct['total_num'] < $num) {
            $this->error = "退菜数量不能大于当前商品数量";
            return false;
        }
        $this->startTrans();
        try {
            $isPay = $this['pay_status']['value'] == 20 ? 1 : 0;
            $orderProductNum = $orderProduct['total_num'];
            $orderProduct['total_num'] = $num;
            // 退回商品库存
            ProductFactory::getFactory($this['order_source'])->backProductStock([$orderProduct], $isPay);
            if ($orderProductNum == $num) {
                $orderProduct->delete();
            } else {
                $total_num = $orderProductNum - $num;
                $orderProduct->save([
                    'total_num' => $total_num,
                ]);
            }
            // 退菜记录
            if ($num > 0) {
                OrderProductReturn::add([
                    'order_id' => $this['order_id'],
                    'order_product_id' => $order_product_id,
                    'product_id' => $orderProduct['product_id'],
                    'num' => $num,
                    'reason' => $return_reason,
                ]);
            }
            //
            $this->reloadPrice($this['order_id']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    //结账完成
    public function settle()
    {
        if ($this['pay_status']['value'] != 20) {
            $this->error = "订单未付款，不允许操作";
            return false;
        }
        if ($this['order_status']['value'] != 10) {
            $this->error = "订单状态错误，不允许操作";
            return false;
        }
        return $this->transaction(function () {
            // 更新订单状态：已发货、已收货
            $status = $this->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => OrderStatusEnum::COMPLETED
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$this], static::$app_id);
            return $status;
        });
    }

    /**
     * 审核：用户取消订单
     */
    public function refund($data)
    {
        // 判断订单是否有效
        if ($this['pay_status']['value'] != 20 || $this['order_status']['value'] != 10) {
            $this->error = '该订单不合法';
            return false;
        }
        if ($data['refund_money'] + $this['refund_money'] > $this['pay_price']) {
            $this->error = '退款金额不能大于可退款金额';
            return false;
        }
        // 订单取消事件
        $status = $this->transaction(function () use ($data) {
            // 执行退款操作
            $this['pay_type']['value'] < 40 && (new OrderRefundService)->execute($this, $data['refund_money']);
            $update['refund_money'] = $this['refund_money'] + $data['refund_money'];
            if ($update['refund_money'] == $this['pay_price']) {
                $update['delivery_status'] = 20;
                $update['delivery_time'] = time();
                $update['receipt_status'] = 20;
                $update['receipt_time'] = time();
                $update['order_status'] = 30;
            }
            // 更新订单状态
            return $this->save($update);
        });
        return $status;
    }

    // 自助餐到期提醒
    public static function buffetTimeRemind($tid, $buffet_expired_time, $tablet_end_time_minute)
    {
        $second = $tablet_end_time_minute * 60;
        $now_timestamp = time();
        $buffet_remaining_time = $buffet_expired_time - $now_timestamp;
        $lock = Cache::get("remind::{$tid}");
        if (($buffet_remaining_time < $second) && !$lock) {
            Cache::set("remind::{$tid}", 1, $second);
            return 1;
        }
        return 0;
    }


}