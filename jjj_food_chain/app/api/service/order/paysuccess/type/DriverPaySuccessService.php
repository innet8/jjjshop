<?php

namespace app\api\service\order\paysuccess\type;

use app\api\model\user\User as UserModel;
use app\api\model\plus\driver\DepositOrder as DepositOrderModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;
use app\common\model\user\BalanceLog as BalanceLogModel;
use app\common\service\BaseService;
use app\api\model\plus\driver\Apply as DriverApplyModel;
use app\api\model\plus\driver\User as DriverUserModel;

/**
 * 配送员押金支付成功服务类
 */
class DriverPaySuccessService extends BaseService
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
        $this->model = DepositOrderModel::getPayDetail($orderNo, $pay_status);
        // 获取用户信息
        $this->user = UserModel::detail($this->model['user_id']);
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
        $status = $this->updatePayStatus($payType, $payData);
        return $status;
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
            // 记录订单支付信息
            $this->updatePayInfo();
            // 更新申请状态和添加账号
            $this->updateDriver($this->user['user_id']);
        });
        return true;
    }

    //更新申请状态和添加账号
    public function updateDriver($user_id)
    {
        $DriverApply = DriverApplyModel::where(['user_id' => $user_id])->order('apply_id desc')->find();

        if ($DriverApply) {
            //更新
            $DriverApply->save([
                'deposit_money' => $this->model['pay_price'],
                'is_pay' => 20,
            ]);
            if ($DriverApply['apply_type']['value'] == 20) {
                DriverUserModel::add($user_id, [
                    'real_name' => $DriverApply['real_name'],
                    'mobile' => $DriverApply['mobile'],
                    'deposit_money' => $this->model['pay_price'],
                    'identfy_card' => $DriverApply['identfy_card'],
                    'app_id' => $this->model['app_id']
                ]);
            }
        }
    }

    /**
     * 更新订单记录
     */
    private function updateOrderInfo($payType, $payData)
    {
        // 整理订单信息
        $pay_source = '';
        if (isset($payData['attach'])) {
            $attach = json_decode($payData['attach'], true);
            $pay_source = isset($attach['pay_source']) ? $attach['pay_source'] : '';
        }
        $order = [
            'pay_type' => $payType,
            'pay_status' => 20,
            'pay_time' => time(),
            'pay_source' => $pay_source
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
            (new UserModel())->where('user_id', '=', $this->user['user_id'])
                ->dec('balance', $this->model['balance'])
                ->update();
            // 余额日志
            BalanceLogModel::add(BalanceLogSceneEnum::CONSUME, [
                'user_id' => $this->user['user_id'],
                'card_id' => $this->user['card_id'],
                'money' => -$this->model['balance'],
                'app_id' => $this->model['app_id']
            ], ['order_no' => '申请骑手押金']);
        }
    }

}