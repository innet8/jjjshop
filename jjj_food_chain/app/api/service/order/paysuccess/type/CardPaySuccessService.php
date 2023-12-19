<?php

namespace app\api\service\order\paysuccess\type;

use app\api\model\user\CardRecord as OrderModel;
use app\api\model\user\User as UserModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;
use app\common\model\user\BalanceLog as BalanceLogModel;
use app\common\service\BaseService;
use app\api\model\plus\coupon\UserCoupon as UserCouponModel;
use app\api\model\user\Card as CardModel;

/**
 * 会员卡订单支付成功后的回调
 */
class CardPaySuccessService extends BaseService
{
    // 订单模型
    public $model;

    // 当前用户信息
    private $user;

    /**
     * 构造函数
     */
    public function __construct($orderNo, $pay_status = 10)
    {
        // 实例化订单模型
        $this->model = OrderModel::getPayDetail($orderNo, $pay_status);
        // 获取用户信息
        $this->user = UserModel::detail($this->model['user_id']);
    }

    /**
     * 订单支付成功业务处理
     */
    public function onPaySuccess($payType, $payData = [])
    {
        if (empty($this->model)) {
            $this->error = '未找到该订单信息';
            return false;
        }
        // 更新付款状态
        return $this->updatePayStatus($payType, $payData);
    }

    /**
     * 更新付款状态
     */
    private function updatePayStatus($payType, $payData = [])
    {
        // 事务处理
        $this->model->transaction(function () use ($payType, $payData) {
            // 更新订单状态
            $this->updateOrderInfo($payType, $payData);
            // 累积用户总消费金额
            $this->user->setIncPayMoney($this->model['pay_price']);
            // 记录订单支付信息
            $this->updatePayInfo();
            //更新会员卡数据
            $this->updateCard();
        });
        return true;
    }

    /**
     * 更新会员卡数据
     */
    private function updateCard()
    {
        CardModel::where('card_id', '=', $this->model['card_id'])->inc('receive_num', 1)->update();
        //赠送积分
        if ($this->model['open_points'] && $this->model['open_points_num']) {
            $this->user->setIncPoints($this->model['open_points_num'], '发会员卡获取积分');
        }
        //赠送优惠券
        if ($this->model['open_coupon'] && $this->model['open_coupons']) {
            (new UserCouponModel)->addUserCardCoupon($this->model['open_coupons'], $this->user, $this->model['order_id']);
        }
        //赠送余额
        if ($this->model['open_money'] && $this->model['open_money_num']) {
            (new UserModel)->where('user_id', '=', $this->user['user_id'])
                ->inc('balance', $this->model['open_money_num'])
                ->update();
            BalanceLogModel::add(BalanceLogSceneEnum::RECHARGE, [
                'user_id' => $this->user['user_id'],
                'money' => $this->model['open_money_num'],
                'app_id' => $this->model['app_id']
            ], ['order_no' => '后台发放会员卡赠送']);
        }
    }

    /**
     * 更新订单记录
     */
    private function updateOrderInfo($payType, $payData)
    {
        $order = [
            'pay_type' => $payType,
            'pay_status' => 20,
            'pay_time' => time(),
        ];
        if ($payType == OrderPayTypeEnum::WECHAT) {
            $order['transaction_id'] = $payData['transaction_id'];
        }
        // 更新订单状态
        return $this->model->save($order);
    }

    /**
     * 记录订单支付信息
     */
    private function updatePayInfo()
    {
        // 余额支付
        if ($this->model['balance'] > 0) {
            // 更新用户余额
            $this->user->where('user_id', '=', $this->user['user_id'])
                ->dec('balance', $this->model['balance'])
                ->update();
            BalanceLogModel::add(BalanceLogSceneEnum::CONSUME, [
                'user_id' => $this->user['user_id'],
                'money' => -$this->model['balance'],
                'app_id' => $this->model['app_id']
            ], ['order_no' => $this->model['order_no']]);
        }
    }

    /**
     * 返回app_id，大于0则存在订单信息
     */
    public function isExist()
    {
        if ($this->model) {
            return $this->model['app_id'];
        }
        return 0;
    }
}