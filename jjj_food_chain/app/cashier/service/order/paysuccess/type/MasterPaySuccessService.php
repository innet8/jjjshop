<?php

namespace app\cashier\service\order\paysuccess\type;

use app\common\model\store\PayType;
use app\common\service\BaseService;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\cashier\model\user\User as UserModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\cashier\model\order\Order as OrderModel;
use app\common\service\order\OrderCompleteService;
use app\common\service\product\factory\ProductFactory;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;
use app\common\model\user\BalanceLog as BalanceLogModel;

/**
 * 订单支付成功服务类
 */
class MasterPaySuccessService extends BaseService
{
    // 订单模型
    public $model;
    // 当前用户信息
    private $user;
    // 交易号
    private $orderNo;

    /**
     * 构造函数
     */
    public function __construct($orderNo)
    {
        $this->orderNo = $orderNo;
    }

    /**
     * 订单支付成功业务处理
     */
    public function onPaySuccess($payType)
    {
        // 实例化订单模型
        $this->model = OrderModel::getPayDetail($this->orderNo);
        // 获取用户信息
        $this->user = UserModel::detail($this->model['user_id']);
        $this->paySuccess($payType);
        if ($this->getError() != '') {
            return false;
        }
        return true;
    }

    /**
     * 订单支付成功业务处理
     */
    public function paySuccess($payType)
    {
        // 更新付款状态
        $status = $this->updatePayStatus($payType);
        // 订单支付成功行为
        if ($status == true) {
            $detail = OrderModel::detail($this->model['order_id']);
            //判断是否清台
            if ($detail['eat_type'] == 10 && (($detail['settle_type'] == 10 && $detail['auto_close'] == 1) || $detail['settle_type'] == 20)) {
                $detail->transaction(function () use ($detail) {
                    // 更新订单状态：已发货、已收货
                    $detail->save([
                        'delivery_status' => 20,
                        'delivery_time' => time(),
                        'receipt_status' => 20,
                        'receipt_time' => time(),
                        'order_status' => 30
                    ]);
                    // 执行订单完成后的操作
                    $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
                    $OrderCompleteService->complete([$detail], $detail['app_id']);
                });
            }
            event('CashierPaySuccess', $detail);
        }
    }

    /**
     * 更新付款状态
     */
    private function updatePayStatus($payType)
    {
        if (!in_array($payType,array_column(PayType::getEnableListAll(),'value'))) {
            $this->error = "不允许的支付方式";
            return false;
        }
        // 验证余额支付时用户余额是否满足
        if ($payType == OrderPayTypeEnum::BALANCE) {
            if ($this->model['user_id'] == 0) {
                $this->error = '请先选择会员登录';
                return false;
            }
            if ($this->user['balance'] < $this->model['pay_price']) {
                $this->error = '用户余额不足，无法使用余额支付';
                return false;
            }
        }
        // 事务处理
        $this->model->transaction(function () use ($payType) {
            // 更新订单状态
            $this->updateOrderInfo($payType);
            // 累积用户总消费金额
            $this->model['user_id'] && $this->user->setIncPayMoney($this->model['pay_price']);
            // 记录订单支付信息
            $this->updatePayInfo($payType);
        });
        return true;
    }


    /**
     * 更新订单记录
     */
    private function updateOrderInfo($payType)
    {
        // 更新商品库存、销量
        ProductFactory::getFactory($this->model['order_source'])->updateStockSales($this->model['product']);
        // 整理订单信息
        $order = [
            'pay_type' => $payType,
            'pay_status' => OrderPayStatusEnum::SUCCESS,
            'pay_time' => time(),
            'settle_type' => $this->model['supplier']['settle_type'],
            'auto_close' => $this->model['supplier']['auto_close'],
            'close_time' => $this->model['supplier']['close_time'] * 60 + time(),
        ];
        // 更新订单状态
        return $this->model->save($order);
    }

    /**
     * 记录订单支付信息
     */
    private function updatePayInfo($payType)
    {
        // 余额支付
        if ($payType == OrderPayTypeEnum::BALANCE) {
            // 更新用户余额
            (new UserModel())->where('user_id', '=', $this->user['user_id'])
                ->dec('balance', $this->model['pay_price'])
                ->update();
            BalanceLogModel::add(BalanceLogSceneEnum::CONSUME, [
                'user_id' => $this->user['user_id'],
                'money' => -$this->model['pay_price'],
            ], ['order_no' => $this->model['order_no']]);
        }
    }

}