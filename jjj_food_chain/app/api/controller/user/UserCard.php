<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\common\enum\order\OrderTypeEnum;
use app\api\model\user\Card as UserCardModel;
use app\api\model\user\CardRecord as CardRecordModel;
use app\api\model\settings\Setting as SettingModel;

/**
 * 会员卡
 */
class UserCard extends Controller
{
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();
    }

    //会员卡列表
    public function index()
    {
        $model = new UserCardModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    //会员卡详情
    public function detail($card_id)
    {
        $detail = UserCardModel::detail($card_id);
        return $this->renderSuccess('', compact('detail'));
    }

    //我的会员卡详情
    public function recordDetail($order_id)
    {
        $detail = CardRecordModel::getDetail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 购买
     */
    public function buy()
    {
        $params = $this->request->param();
        // 用户信息
        $user = $this->user;
        // 生成订单
        $model = new CardRecordModel();
        $order_id = $model->createOrder($user, $params);
        if (!$order_id) {
            return $this->renderError($model->getError() ?: '购买失败');
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
        $model = CardRecordModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
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
        $OrderModel = new CardRecordModel;
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
            'order_type' => OrderTypeEnum::CARD, //订单类型
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/user/index/index") : '', //h5支付跳转地址
        ]);
    }
}