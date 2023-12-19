<?php

namespace app\api\model\plus\group;

use app\api\service\order\paysuccess\type\GroupSuccessService;
use app\api\service\order\PaymentService;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\exception\BaseException;
use app\common\model\plus\group\Order as OrderModel;
use app\api\service\order\checkpay\CheckPayFactory;
use app\api\model\plus\group\Group as GroupModel;
use app\common\library\helper;
use app\common\service\order\OrderRefundService;
use app\api\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\Capital as SupplierCapitalModel;

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
     * 立即购买：获取订单团购列表
     */
    public static function getOrderByNow($params)
    {
        // 团购详情
        $group = GroupModel::detail($params['group_id']);
        // 商品列表
        $groupList = [$group];
        foreach ($groupList as &$item) {
            // 购买数量
            $item['total_num'] = $params['total_num'];
            // 商品购买总金额
            $item['total_price'] = helper::bcmul($item['group_price'], $item['total_num']);
        }
        return $groupList;
    }

    /**
     * 订单支付事件
     */
    public function onPay()
    {
        // 判断订单状态
        $checkPay = CheckPayFactory::getFactory(40);

        if (!$checkPay->checkOrderStatus($this)) {
            $this->error = $checkPay->getError();
            return false;
        }
        return true;
    }

    /**
     * 用户中心订单列表
     */
    public function getList($user_id, $params)
    {
        $model = $this;
        switch ($params['dataType']) {
            case '0':
                break;
            case '1'://待付款
                $model = $model->where('pay_status', '=', 10)->where('order_status', '=', 10);
                break;
            case '2'://待使用
                $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 10);
                break;
            case '3'://退款/售后
                $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 21);
                break;
        }
        $list = $model->with(['product.image', 'supplier'])
            ->where('user_id', '=', $user_id)
            ->where('is_delete', '=', 0)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
        foreach ($list as &$item) {
            if ($item['end_time']) {
                $item['end_time'] = date('Y-m-d H:i:s', $item['end_time']);
            }
        }
        return $list;
    }

    /**
     * 取消订单
     */
    public function cancel()
    {
        if ($this['order_status']['value'] != 10 && $this['pay_status']['value'] != 10) {
            $this->error = '订单状态错误，不允许取消';
            return false;
        }
        return $this->save(['order_status' => 20]);
    }

    /**
     * 订单退款
     */
    public function refund()
    {
        if ($this['order_status']['value'] != 10 && $this['pay_status']['value'] != 20) {
            $this->error = '订单状态错误，不允许退款';
            return false;
        }
        // 订单取消事件
        return $this->transaction(function () {
            // 执行退款操作
            (new OrderRefundService)->execute($this, $this['pay_price']);
            //更新券码状态
            (new OrderCode())->where('order_id', '=', $this['order_id'])->update(['code_status' => 30]);
            //扣除销量
            (new GroupModel())->reduceSales($this['product']);
            // 更新订单状态
            return $this->save(['order_status' => 21]);
        });
    }

    /**
     * 核销订单
     */
    public function extractDetail($order_id, $user)
    {
        $detail = self::detail($order_id);
        // 验证订单是否合法
        if ($detail['pay_status']['value'] != 20) {
            $this->error = '订单未支付';
            return false;
        }
        //判断当前用户是否绑定门店
        $supplier = SupplierModel::where('user_id', '=', $user['user_id'])
            ->where('is_delete', '=', 0)
            ->find();
        if (!$supplier) {
            $this->error = '未绑定门店，无权限核销';
            return false;
        }
        //判断门店是否适用
        if ($detail['product'][0]['suit_type'] == 20) {
            if (!in_array($supplier['shop_supplier_id'], $detail['product'][0]['shop_supplier_ids'])) {
                $this->error = '当前门店不适用';
                return false;
            }
        }
        $detail['pay_time'] = date('Y-m-d H:i:s', $detail['pay_time']);
        $detail['end_time'] = date('Y-m-d H:i:s', $detail['end_time']);
        return $detail;
    }

    /**
     * 核销订单
     */
    public function receipt($user)
    {
        // 验证订单是否合法
        if ($this['order_status']['value'] != 10 || $this['pay_status']['value'] != 20) {
            $this->error = '订单无效，不允许核销';
            return false;
        }
        if ($this['end_time'] < time()) {
            $this->error = '团购已超过有效期';
            return false;
        }
        //判断当前用户是否绑定门店
        $supplier = SupplierModel::where('user_id', '=', $user['user_id'])
            ->where('is_delete', '=', 0)
            ->find();
        if (!$supplier) {
            $this->error = '未绑定门店，无权限核销';
            return false;
        }
        //判断门店是否适用
        if ($this['product'][0]['suit_type'] == 20) {
            if (!in_array($supplier['shop_supplier_id'], $this['product'][0]['shop_supplier_ids'])) {
                $this->error = '当前门店不适用';
                return false;
            }
        }
        return $this->transaction(function () use ($user, $supplier) {
            // 更新订单状态
            $this->save([
                'is_settled' => 1,
                'settled_time' => time(),
                'order_status' => 30,
                'extract_clerk_id' => $user['user_id'],
                'shop_supplier_id' => $supplier['shop_supplier_id']
            ]);
            //更新券码状态
            (new OrderCode())->where('order_id', '=', $this['order_id'])
                ->update([
                    'code_status' => 20,
                    'shop_supplier_id' => $supplier['shop_supplier_id']
                ]);
            //更新团购商品使用门店
            (new OrderProduct())->where('order_id', '=', $this['order_id'])
                ->update([
                    'shop_supplier_id' => $supplier['shop_supplier_id']
                ]);
            //门店结算
            (new SupplierModel)->where(['shop_supplier_id' => $supplier['shop_supplier_id']])
                ->inc('total_money', $this['pay_price'])
                ->inc('money', $this['pay_price'])
                ->update();
            $supplierCapitalData = [
                'shop_supplier_id' => $supplier['shop_supplier_id'],
                'money' => $this['pay_price'],
                'describe' => '团购订单订单结算，订单号：' . $this['order_no'],
                'app_id' => self::$app_id
            ];
            (new SupplierCapitalModel())->save($supplierCapitalData);
            return true;
        });
    }

    /**
     * 订单详情
     */
    public static function getUserOrderDetail($order_id, $user_id)
    {
        $model = new static();
        $order = $model->where(['order_id' => $order_id])
            ->where(['user_id' => $user_id])
            ->with(['product' => ['image'], 'supplier', 'user'])
            ->find();
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
        $PaySuccess = new GroupSuccessService($orderNo);
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
            OrderTypeEnum::Group,
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
            OrderTypeEnum::Group,
            $pay_source
        );
    }

    /**
     * 待支付订单详情
     */
    public static function getPayDetail($orderNo, $pay_status)
    {
        $model = new static();
        if ($pay_status > 0) {
            $model = $model->where('pay_status', '=', 10);
        }
        return $model->where(['trade_no' => $orderNo, 'is_delete' => 0])->with(['product', 'user', 'supplier'])->find();
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
    public static function getHasBuyOrderNum($group_id, $user_id)
    {
        $model = new static();
        return $model->alias('order')->where('order.user_id', '=', $user_id)
            ->join('group_order_product op', 'op.order_id = order.order_id')
            ->where('order.create_time', '>=', strtotime(date('Y-m-d')))
            ->where('op.group_id', '=', $group_id)
            ->where('order.order_status', 'not in', ['20', '21'])
            ->sum('total_num');
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