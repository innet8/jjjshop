<?php

namespace app\cashier\model\order;

use think\facade\Log;
use app\common\library\helper;
use app\common\model\store\PayType;
use app\api\model\order\OrderProduct;
use app\common\model\supplier\Supplier;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderSourceEnum;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\model\order\Order as OrderModel;
use app\cashier\model\store\Table as TableModel;
use app\common\service\order\OrderRefundService;
use app\common\service\order\OrderCompleteService;
use app\common\service\product\factory\ProductFactory;
use app\cashier\service\order\paysuccess\type\MasterPaySuccessService;
use app\shop\model\product\Category;

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
            $model = $model->where('order_no', 'like', '%' . $params['search'] . '%');
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

    /**
     * 折扣抹零
     */
    public function changeMoney($user, $data)
    {
        $detail = self::detail($data['order_id']);
        if ($detail['pay_status']['value'] != 10) {
            $this->error = "订单已支付不允许改价";
            return false;
        }
        $this->startTrans();
        try {
            $discount_money = 0;
            switch ($data['type']) {
                case '1'://改价
                    if ($data['money'] > $detail['order_price']) {
                        $this->error = "修改价应小于原价";
                        return false;
                    }
//                    if ($detail['pay_price'] > 0) {
//                        $discount_money = round($detail['order_price'] - $data['money'] + $detail['discount_money'], 2);
//                    }
                    $discount_money = round($detail['order_price'] - $data['money'], 2);
                    break;
                case '2'://折扣
                    if ($data['rate'] > 10) {
                        $this->error = "请输入合理的折扣";
                        return false;
                    }
                    if ($detail['pay_price'] > 0) {
                        $discount_money = round($detail['order_price'] * (10 - $data['rate']) / 10, 2);
                    }
                    break;
                case '3'://抹零
                    trace($detail['order_price']);
                    if ($data['discountType'] == 1) {//抹分
                        $discount_money = round($detail['order_price'] - intval($detail['pay_price'] * 10) / 10, 2);
                    } elseif ($data['discountType'] == 2) {//抹角
                        $discount_money = round($detail['order_price'] - intval($detail['pay_price']), 2);
                    } elseif ($data['discountType'] == 3) {//四舍五入到角
                        $discount_money = round($detail['order_price'] - round($detail['pay_price'], 1), 2);
                    } elseif ($data['discountType'] == 4) {//四舍五入到元
                        $discount_money = round($detail['order_price'] - round($detail['pay_price'], 0), 2);
                    }
                    break;
            }
            if ($discount_money >= 0) {
//                foreach ($detail['product'] as &$product) {
//                    //计算优惠金额
//                    $dicount_money = round($product['total_price'] / $detail['total_price'] * $discount_money, 2);
//                    $value = $product['total_price'];
//                    // 减去优惠金额
//                    $value = helper::bcsub($value, $dicount_money);
//                    $total_pay_price = helper::number2($value);
//                    if ($total_pay_price <= 0) {
//                        $total_pay_price = 0;
//                    }
//                    $product->save(['total_pay_price' => $total_pay_price, 'discount_money' => $dicount_money]);
//                }
                $pay_price = round($detail['order_price'] - $discount_money, 2);
                if ($pay_price <= 0) {
                    $pay_price = 0;
                }
                $detail->save(['discount_money' => $discount_money, 'pay_price' => $pay_price]);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    //查询桌号信息
    public function changeTable($table_id)
    {
        if ($this['order_status']['value'] != 10) {
            $this->error = "订单状态错误，不允许转台";
            return false;
        }
        $orderInfo = self::getTableInfo($table_id);
        if ($orderInfo) {
            if ($orderInfo['order_source'] == 10) {//小程序下单
                if ($orderInfo['pay_status']['value'] == 20 && $orderInfo['order_status']['value'] == 10) {
                    $this->error = "台号已被使用";
                    return false;
                }
            } else {//收银台下单
                if ($orderInfo['order_status']['value'] == 10) {
                    $this->error = "台号已被使用";
                    return false;
                }
            }
        }
        return $this->save(['table_id' => $table_id]);
    }

    //查询桌号信息
    public function orderPay($data)
    {
        if ($this['pay_status']['value'] != 10) {
            $this->error = "订单已支付";
            return false;
        }
        if ($data['user_id'] > 0) {
            $this->save(['user_id' => $data['user_id']]);
        }
        return $this->onPayment($this['order_no'], $data['pay_type']);
    }

    //退菜
    public function moveProduct($order_product_id, $num)
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
//            $setting = SettingModel::getItem('points');
//            $total_pay_price = $orderProduct['product_price'] * $num;
//            $discount_money = round($num / $orderProduct['total_num'] * $orderProduct['discount_money'], 2);
//            $money = $total_pay_price - $discount_money;
//            $points = 0;
//            if ($orderProduct['points_bonus'] > 0) {
//                // 积分赠送比例
//                $ratio = $setting['gift_ratio'] / 100;
//                $points = helper::bcmul($money, $ratio, 2);
//            }
//            $this->save([
//                'points_bonus' => $this['points_bonus'] - $points,
//                'pay_price' => $this['pay_price'] - $money,
//                'discount_money' => $this['discount_money'] - $discount_money,
//                'order_price' => $this['order_price'] - $total_pay_price,
//                'total_price' => $this['total_price'] - $total_pay_price
//            ]);
            $isPay = $this['pay_status']['value'] == 20 ? 1 : 0;
//          $orderProduct['total_num'] = $num;
            // 退回商品库存
            ProductFactory::getFactory($this['order_source'])->backProductStock([$orderProduct], $isPay);
            if ($orderProduct['total_num'] == $num) {
                $orderProduct->delete();
            } else {
                $total_num = $orderProduct['total_num'] - $num;
                $orderProduct->save([
                    'total_num' => $total_num,
//                    'total_price' => round($total_num * $orderProduct['product_price'], 2),
//                    'total_pay_price' => $money,
//                    'discount_money' => round($orderProduct['discount_money'] - $discount_money, 2),
//                    'points_bonus' => round($orderProduct['points_bonus'] - $points, 2),
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
                'order_status' => 30
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
            $this->error = '退款金额不能超过支付金额';
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

    /**
     * 营业数据
     */
    public function businessData($params)
    {
        $model = $this;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $model = $model->where('a.shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        if (isset($params['category_type']) && $params['category_type']) {
            $model = $model->where('c.parent_id', $params['category_type'] == 1 ? '=' : '>', 0);
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
            $model = $model->where('a.create_time', 'between', [$startTime, $endTime]);
        }

        $model = $model->alias('a')
            ->leftJoin('order_product rp','a.order_id = rp.order_id')
            ->leftJoin('product p','p.product_id = rp.product_id')
            ->leftJoin('category c','c.category_id = p.category_id')
            ->where('a.pay_status', '=', OrderPayStatusEnum::SUCCESS)
            ->where('a.order_status', '=', OrderStatusEnum::COMPLETED)
            ->where('a.eat_type', '<>', 0);
        // 
        $incomes = [];
        $payTypes = PayType::list($params['shop_supplier_id'], self::$app_id);
        foreach ($payTypes as $payType){
            $value = (clone $model)->where('pay_type', $payType['value'])->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? "0.00";
            if ($value > 0) {
                $incomes[] = [
                    'pay_type' => $payType['value'],
                    'pay_type_name' => OrderPayTypeEnum::data($payType['value'])['name'],
                    'price' => $value,
                ];
            }
        }
        // 
        $categorys = (clone $model)->group("c.category_id")->field("c.name, count(a.order_id) as sales, sum(a.pay_price - a.refund_money) as prices")->select()->append([])?->toArray();
        foreach ($categorys as $key => $data){
            $categorys[$key]['name_text'] = Category::getNameTextAttr($data['name'] ?: '');
        }
        // 
        return [
            'supplier' => Supplier::field('shop_supplier_id,business_id,name,address,description,link_name,link_phone,logo,app_id')
                ->where('shop_supplier_id', $params['shop_supplier_id'] ?? 0 )
                ->find()?->toArray(),
            'categorys' => $categorys,
            'sales_num' => (clone $model)->count(),
            'incomes' => $incomes,
            'refund_amount' => number_format((clone $model)->sum("refund_money"), 2, '.', ''), 
            'total_amount' => number_format((clone $model)->sum("pay_price"), 2, '.', ''), 
            'times' => [$startTime, $endTime], 
        ];
    }

    // 修改订单商品价格
    public function changeProductPrice($order_product_id, $money)
    {
        $this->startTrans();
        try {
            if ($money < 0) {
                $this->error = "价格错误";
                return false;
            }
            $p = OrderProduct::where('order_product_id', '=', $order_product_id)->find();
            if (!$p) {
                $this->error = "商品不存在";
                return false;
            }
            $p->product_price = $money;
            $p->total_price = helper::bcmul($money, $p->total_num);
            if ($p->save()) {
                // 更新
                $this->reloadPrice($this['order_id']);
                $this->commit();
                return true;
            } else {
                $this->error = "商品不存在";
                return false;
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }

    }

    // 更新商品总价
    public function updateTotalPrice()
    {
        // 商品总价 - 优惠抵扣
        $total_price = 0;
        foreach ($this['product'] as $product) {
            $total_price = helper::bcadd($total_price, $product['total_price']);
        }
        $order_price = helper::bcadd($total_price, $this['service_money']);
        $pay_price = round(helper::bcsub($order_price, $this['discount_money']), 2);
        return $this->save(['total_price' => $total_price, 'order_price' => $order_price, 'pay_price' => $pay_price]);
    }

    // 订单使用会员
    public function useMember($user_id)
    {
        $this->startTrans();
        try {
            // 订单表更新user_id
            $user_id = !empty($user_id) ? $user_id : 0;
            $this->save(['user_id' => $user_id]);
            // 重载订单价格信息
            $this->reloadPrice($this['order_id']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }


}