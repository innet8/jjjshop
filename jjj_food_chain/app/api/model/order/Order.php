<?php

namespace app\api\model\order;

use app\api\service\order\paysuccess\type\MasterPaySuccessService;
use app\api\service\order\PaymentService;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderSourceEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\order\OrderStatusEnum;
use app\common\exception\BaseException;
use app\common\model\order\Order as OrderModel;
use app\api\service\order\checkpay\CheckPayFactory;
use app\common\service\order\OrderPrinterService;
use app\common\service\product\factory\ProductFactory;
use app\common\model\plus\coupon\UserCoupon as UserCouponModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderCompleteService;
use app\common\library\helper;

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
        'update_time'
    ];

    /**
     * 订单支付事件
     */
    public function onPay($user)
    {
        // 判断订单状态
        $checkPay = CheckPayFactory::getFactory($this['order_source']);

        if (!$checkPay->checkOrderStatus($this)) {
            $this->error = $checkPay->getError();
            return false;
        }
        //判断是否为扫码点餐
        if ($this['order_source'] == OrderSourceEnum::SCAN || $this['order_source'] == OrderSourceEnum::CASHIER) {
            $this->save(['user_id' => $user['user_id']]);
        }
        return true;
    }

    /**
     * 用户中心订单列表
     */
    public function getList($user_id, $params)
    {
        $model = $this;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        if (isset($params['order_type'])) {
            $model = $model->where('order_type', '=', $params['order_type']);
        }
        if (isset($params['delivery_type']) && $params['delivery_type']) {
            $model = $model->where('delivery_type', '=', $params['delivery_type']);
        }
        switch ($params['dataType']) {
            case '0':
                break;
            case '1'://进行中
                $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 10);
                break;
            case '2'://已完成
                $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 30);
                break;
        }
        return $model->with(['product.image', 'supplier'])
            ->where('user_id', '=', $user_id)
            ->where('is_delete', '=', 0)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 取消订单
     */
    public function cancel($user)
    {
        if ($this['pay_status']['value'] == 20 || $this['order_status']['value'] != 10) {
            $this->error = '订单状态错误不允许取消!';
            return false;
        }
        return $this->save(['order_status' => OrderStatusEnum::CANCELLED]);
    }

    /**
     * 确认收货
     */
    public function receipt()
    {
        // 验证订单是否合法
        // 条件1: 订单必须已发货
        // 条件2: 订单必须未收货
        if ($this['delivery_status']['value'] != 20 || $this['receipt_status']['value'] != 10) {
            $this->error = '该订单不合法';
            return false;
        }
        return $this->transaction(function () {
            // 更新订单状态
            $status = $this->save([
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
     * 订单详情
     */
    public static function getUserOrderDetail($order_id, $user_id)
    {
        $model = new static();
        $order = $model->where(['order_id' => $order_id])->with(['product' => ['image'], 'address', 'supplier', 'user', 'deliver'])->find();
        if (empty($order)) {
            throw new BaseException(['msg' => '订单不存在']);
        }
        return $order;
    }

    /**
     * 余额支付标记订单已支付
     */
    public function onPaymentByBalance($orderNo)
    {
        // 获取订单详情
        $PaySuccess = new MasterPaySuccessService($orderNo);
        // 发起余额支付
        $status = $PaySuccess->onPaySuccess(OrderPayTypeEnum::BALANCE);
        if (!$status) {
            $this->error = $PaySuccess->getError();
        }
        return $status;
    }

    /**
     * 构建微信支付请求
     */
    protected static function onPaymentByWechat($user, $order, $pay_source)
    {
        return PaymentService::wechat(
            $user,
            $order,
            OrderTypeEnum::MASTER,
            $pay_source
        );
    }

    /**
     * 构建支付宝请求
     */
    protected static function onPaymentByAlipay($user, $order, $pay_source)
    {
        return PaymentService::alipay(
            $user,
            $order,
            OrderTypeEnum::MASTER,
            $pay_source
        );
    }

    /**
     * 待支付订单详情
     */
    public static function getPayDetail($orderNo)
    {
        $model = new static();
        return $model->where(['trade_no' => $orderNo, 'pay_status' => 10, 'is_delete' => 0])->with(['product', 'user', 'supplier'])->find();
    }

    /**
     * 构建支付请求的参数
     */
    public static function onOrderPayment($user, $order, $payType, $pay_source)
    {
        if ($payType == OrderPayTypeEnum::WECHAT) {
            return self::onPaymentByWechat($user, $order, $pay_source);
        }
        if ($pay_source == 'h5') {
            return [];
        }
        if ($payType == OrderPayTypeEnum::ALIPAY) {
            return self::onPaymentByAlipay($user, $order, $pay_source);
        }
        return [];
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

    /**
     * 生成加餐订单
     */
    public function mealOrder($data, $order_id)
    {
        $this->startTrans();
        try {
            $order = self::detail($order_id);
            if ($order['pay_status']['value'] == 20) {
                $this->error = '订单已支付，不允许加菜';
                return false;
            }
            if ($order['delivery_type']['value'] != 40) {
                $this->error = '订单类型错误';
                return false;
            }
            if ($order['shop_supplier_id'] != $data['shop_supplier_id']) {
                $this->error = '门店不一致';
                return false;
            }
            $setting = SettingModel::getItem('points');
            // 条件：后台开启开启购物送积分
            $points_bonus = 0;
            if ($setting['is_shopping_gift']) {
                // 设置商品积分赠送数量
                foreach ($data['product_list'] as &$product) {
                    // 积分赠送比例
                    $ratio = $setting['gift_ratio'] / 100;
                    // 计算抵扣积分数量
                    $product['points_bonus'] = !$product['is_points_gift'] ? 0 : helper::bcmul($product['total_price'], $ratio, 0);
                }
                //  订单积分赠送数量
                $points_bonus = helper::getArrayColumnSum($data['product_list'], 'points_bonus');
            }
            $addMeal = [
                'order_no' => $this->orderNo(),
                'total_price' => $order['total_price'] + $data['pay_money'],
                'order_price' => $order['order_price'] + $data['pay_money'],
                'pay_price' => $order['pay_price'] + $data['pay_money'],
                'points_bonus' => $order['points_bonus'] + $points_bonus,
            ];
            $order->save($addMeal);
            // 更新商品库存 (针对下单减库存的商品)
            ProductFactory::getFactory($order['order_source'])->updateProductStock($data['product_list']);
            $productList = [];
            foreach ($data['product_list'] as $product) {
                $item = [
                    'order_id' => $order_id,
                    'user_id' => $order['user_id'],
                    'app_id' => self::$app_id,
                    'product_id' => $product['product_id'],
                    'product_name' => $product['product']['product_name'],
                    'image_id' => $product['product']['logo']['image_id'],
                    'deduct_stock_type' => $product['product']['deduct_stock_type'],
                    'spec_type' => $product['product']['spec_type'],
                    'product_sku_id' => $product['sku']['product_sku_id'],
                    'product_attr' => $product['describe'],
                    'content' => $product['product']['content'],
                    'product_price' => $product['price'],
                    'grade_ratio' => isset($product['grade_ratio']) ? $product['grade_ratio'] : 0,
                    'grade_product_price' => isset($product['grade_product_price']) ? $product['grade_product_price'] : 0,
                    'grade_total_money' => isset($product['grade_total_money']) ? $product['grade_total_money'] : 0,
                    'total_num' => $product['product_num'],
                    'total_price' => $product['total_price'],
                    'total_pay_price' => $product['total_price'],
                    'fullreduce_money' => isset($product['fullreduce_money']) ? $product['fullreduce_money'] : 0,
                    'points_bonus' => isset($product['points_bonus']) ? $product['points_bonus'] : 0,
                ];
                $productList[] = $item;
            }
            $model = new OrderProduct();
            $model->saveAll($productList);
            $order['product'] = $productList;
            // 菜品打印
            (new OrderPrinterService)->printProductTicket($order, 20);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    //查询桌号订单信息
    public static function getOrderInfo($table_id)
    {
        return (new static())->with('product')
            ->where('table_id', '=', $table_id)
            ->where('pay_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('is_delete', '=', 0)
            ->find();
    }

    /**
     * 创建新订单
     */
    public function OrderPay($params, $order, $user)
    {
        $payType = $params['payType'];
        $payment = '';
        $online_money = 0;
        $order->save(['balance' => 0, 'online_money' => 0, 'trade_no' => $this->tradeNo()]);
        if ($order['pay_price'] == 0) {
            $params['use_balance'] = 1;
        }
        // 余额支付标记订单已支付
        if ($params['use_balance'] == 1) {
            if ($user['balance'] >= $order['pay_price']) {
                $payType = 10;
                $order->save(['balance' => $order['pay_price']]);
                $this->onPaymentByBalance($order['trade_no']);
            } else {
                if ($payType <= 10) {
                    $this->error = '用户余额不足';
                    return false;
                }
                $online_money = round($order['pay_price'] - $user['balance'], 2);
                $order->save(['balance' => $user['balance'], 'online_money' => $online_money]);
            }
        } else {
            if ($payType <= 10) {
                $this->error = '请选择支付方式';
                return false;
            }
            $online_money = $order['pay_price'];
            $order->save(['online_money' => $order['pay_price']]);
        }
        $online_money > 0 && $payment = self::onOrderPayment($user, $order, $payType, $params['pay_source']);

        $result['order_id'] = $order['order_id'];
        $result['payType'] = $payType;
        $result['payment'] = $payment;
        return $result;
    }
}