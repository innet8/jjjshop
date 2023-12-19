<?php

namespace app\api\controller\plus\driver;

use app\api\controller\Controller;
use app\api\model\plus\driver\Apply as DriverApplyModel;
use app\common\model\plus\driver\Setting;
use app\common\exception\BaseException;
use app\api\model\plus\driver\DepositOrder as DepositOrderModel;
use app\api\model\plus\driver\User as DriverUserModel;
use app\api\model\plus\driver\Refund as RefundModel;
use app\api\model\settings\Setting as SettingModel;
use app\common\enum\order\OrderTypeEnum;

/**
 * 配送员申请
 */
class Apply extends Controller
{
    // 当前用户
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        $this->user = $this->getUser();   // 用户信息
    }

    /**
     * 提交申请
     */
    public function submit()
    {
        $data = $this->postData();
        if (empty($data['name']) || empty($data['mobile'])) {
            throw new BaseException(['msg' => '用户名或者手机号为空']);
        }
        $model = new DriverApplyModel;
        if ($model->submit($this->user, $data)) {
            $setting = Setting::getItem('basic');
            $cash_open = $setting['cash_open'];
            if ($setting['take_cash'] <= 0) {
                $cash_open = 0;
            }
            return $this->renderSuccess('成功', compact('cash_open'));
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 付押金
     */
    public function deposit()
    {
        // 用户信息
        $user = $this->getUser();
        $params = $this->request->param();
        $price = Setting::getItem('basic')['take_cash'];
        // 生成订单
        $model = new DepositOrderModel;
        $order_id = $model->createOrder($user, $price, $params['pay_source']);
        if (!$order_id) {
            return $this->renderError($model->getError() ?: '创建订单失败');
        }
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单id
        ]);
    }

    /**
     * 立即支付
     */
    public function pay($order_id)
    {
        // 获取订单详情
        $model = DepositOrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        $params = $this->postData();
        if ($this->request->isGet()) {
            // 支付金额
            $payPrice = $model['pay_price'];
            $payTypes = SettingModel::getPayType($params['pay_source']);
            $balance = $this->getUser()['balance'];
            return $this->renderSuccess('', compact('payPrice', 'payTypes', 'balance'));
        }
        // 订单支付事件
        if (!$model->onPay()) {
            return $this->renderError($model->getError() ?: '订单支付失败');
        }
        $params = $this->postData();
        $OrderModel = new DepositOrderModel;
        // 构建微信支付请求
        $payInfo = $OrderModel->OrderPay($params, $model, $this->getUser());
        if (!$payInfo) {
            return $this->renderError($OrderModel->getError() ?: '订单支付失败');
        }
        // 支付状态提醒
        return $this->renderSuccess('', [
            'order_id' => $model['order_id'],   // 订单id
            'pay_type' => $payInfo['payType'],  // 支付方式
            'payment' => $payInfo['payment'],   // 微信支付参数
            'order_type' => OrderTypeEnum::DRIVER, //订单类型
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/user/index/index") : '', //h5支付跳转地址
        ]);
    }

    /**
     * 提交退出申请
     */
    public function refund()
    {
        $model = new RefundModel;
        $user = DriverUserModel::detail($this->user['user_id']);
        if ($model->submit($user)) {
            return $this->renderSuccess('提交成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }
}