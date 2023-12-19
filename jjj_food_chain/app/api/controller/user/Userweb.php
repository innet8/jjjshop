<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\order\Order as OrderModel;
use app\api\model\user\BalanceOrder as BalanceOrderModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\model\user\Sms as SmsModel;
use app\api\model\user\UserWeb as UserModel;
use app\api\model\plus\points\Order as PointsOrderModel;
use app\api\model\user\CardRecord as CardRecordModel;
use app\api\model\plus\package\Order as PackageOrderModel;
use app\api\model\plus\driver\DepositOrder as DepositOrderModel;
use app\api\model\plus\group\Order as GroupOrderModel;

/**
 * h5 web用户管理
 */
class Userweb extends Controller
{

    /**
     * 用户自动登录,默认微信小程序
     */
    public function login()
    {
        $model = new UserModel;
        $user_id = $model->login($this->request->post());
        if ($user_id == 0) {
            return $this->renderError($model->getError() ?: '登录失败');
        }
        return $this->renderSuccess('', [
            'user_id' => $user_id,
            'token' => $model->getToken()
        ]);
    }

    /**
     * 短信登录
     */
    public function sendCode($mobile, $type = "login")
    {
        $model = new SmsModel();
        if ($model->send($mobile, $type)) {
            return $this->renderSuccess();
        }
        return $this->renderError($model->getError() ?: '发送失败');
    }

    public function bindMobile()
    {
        $model = new UserModel;
        if ($model->bindMobile($this->getUser(), $this->request->post())) {
            return $this->renderSuccess('绑定成功');
        }
        return $this->renderError($model->getError() ?: '绑定失败');
    }

    public function payH5($order_id, $order_type = OrderTypeEnum::MASTER)
    {
        $order = OrderModel::detail($order_id);
        $user = $order['user'];
        if ($order_type == OrderTypeEnum::MASTER) {
            // 订单详情
            $model = OrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = OrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::WECHAT, 'payH5');
            $return_Url = urlencode(base_url() . "h5/pages/order/myorder");
        } else if ($order_type == OrderTypeEnum::BALANCE) {
            // 订单详情
            $model = BalanceOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = BalanceOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::WECHAT, 'payH5');
            $return_Url = urlencode(base_url() . "h5/pages/user/my-wallet/my-wallet");
        }

        return $this->renderSuccess('', [
            'order' => $model,  // 订单详情
            'mweb_url' => $payment['mweb_url'],
            'return_Url' => $return_Url
        ]);
    }

    /**
     * h5下支付宝支付
     */
    public function alipayH5($order_id, $order_type = OrderTypeEnum::MASTER, $pay_source = 'payH5')
    {
        $user = $this->getUser();
        $payment = [];
        if ($order_type == OrderTypeEnum::MASTER) {
            // 订单详情
            $model = OrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = OrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::BALANCE) {
            // 订单详情
            $model = BalanceOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = BalanceOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::POINTS) {
            // 订单详情
            $model = PointsOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = PointsOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::CARD) {
            // 订单详情
            $model = CardRecordModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = CardRecordModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::PACKAGE) {
            // 订单详情
            $model = PackageOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = PackageOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::DRIVER) {
            // 订单详情
            $model = DepositOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = DepositOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        } else if ($order_type == OrderTypeEnum::Group) {
            // 订单详情
            $model = GroupOrderModel::getUserOrderDetail($order_id, $user['user_id']);
            // 构建支付请求
            $payment = GroupOrderModel::onOrderPayment($user, $model, OrderPayTypeEnum::ALIPAY, $pay_source);
        }
        return $this->renderSuccess('', [
            'payment' => $payment,
        ]);
    }
}
