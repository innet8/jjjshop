<?php

namespace app\api\controller\plus\package;

use app\api\controller\Controller;
use app\api\model\plus\package\Package as PackageModel;
use app\api\model\plus\package\Order as OrderModel;
use app\common\enum\order\OrderTypeEnum;
use app\api\model\settings\Setting as SettingModel;

/**
 * 券包控制器
 */
class Package extends Controller
{
    /**
     * 获取数据
     */
    public function index()
    {
        $model = new PackageModel();
        $list = $model->getlist($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 券包购
     */
    public function buy($package_id)
    {
        // 用户信息
        $user = $this->getUser();
        $params = $this->request->param();
        // 生成礼品订单
        $model = new OrderModel;
        // 创建订单
        if (!$model->createOrder($user, $package_id, $params)) {
            return $this->renderError($model->getError() ?: '订单创建失败');
        }
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $model['order_id'],   // 订单id
        ]);
    }

    /**
     * 立即支付
     */
    public function pay($order_id)
    {
        // 获取订单详情
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
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
        $OrderModel = new OrderModel;
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
            'order_type' => OrderTypeEnum::PACKAGE, //订单类型
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/user/index/index") : '', //h5支付跳转地址
        ]);
    }
}