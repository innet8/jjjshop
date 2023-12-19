<?php

namespace app\api\controller\plus\group;

use app\api\model\plus\group\Order as OrderModel;
use app\api\model\plus\group\OrderCode as OrderCodeModel;
use app\api\model\settings\Setting as SettingModel;
use app\api\service\order\settled\GroupOrderSettledService;
use app\common\enum\order\OrderTypeEnum;
use app\common\service\qrcode\GroupService;
use app\api\controller\Controller;

/**
 * 团购订单
 */
class Order extends Controller
{
    /**
     * 团购下单
     */
    public function buy()
    {
        // 立即购买：获取订单商品列表
        $params = $this->request->param();
        $groupList = OrderModel::getOrderByNow($params);
        $user = $this->getUser();
        // 实例化订单service
        $orderService = new GroupOrderSettledService($user, $groupList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('orderInfo'));
        }
        // 订单结算提交
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        // 创建订单
        $order_id = $orderService->createOrder($orderInfo);
        if (!$order_id) {
            return $this->renderError($orderService->getError() ?: '订单创建失败');
        }
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单id
        ]);
    }

    /**
     * 我的订单列表
     */
    public function lists()
    {
        $data = $this->postData();
        $model = new OrderModel;
        $list = $model->getList($this->getUser()['user_id'], $data);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 订单详情信息
     */
    public function detail($order_id, $source = 'wx')
    {
        // 订单详情
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        // 剩余支付时间
        if ($model['pay_status']['value'] == 10 && $model['order_status']['value'] != 20) {
            $model['pay_end_time'] = $this->formatPayEndTime($model['pay_end_time'] - time());
        } else {
            $model['pay_end_time'] = '';
        }
        if ($model['pay_status']['value'] == 20) {
            //查询券码
            $codeDetail = (new OrderCodeModel)->getOrderCode($model);
            $model['code_no'] = $codeDetail ? $codeDetail['code_no'] : '';
            //生成码
            $Qrcode = new GroupService($model, $source);
            $model['qrcode'] = $Qrcode->getImage();
            $model['end_time'] = date('Y-m-d H:i:s', $model['end_time']);
            $model['pay_time'] = date('Y-m-d H:i:s', $model['pay_time']);
        }
        return $this->renderSuccess('', [
            'order' => $model,  // 订单详情
        ]);
    }

    /**
     * 支付成功详情信息
     */
    public function paySuccess($order_id, $source = "wx")
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        //查询券码
        $codeDetail = (new OrderCodeModel)->getOrderCode($model);
        //生成码
        $Qrcode = new GroupService($model, $source);
        $order = [
            'order_id' => $model['order_id'],
            'pay_price' => $model['pay_price'],
            'code_no' => $codeDetail['code_no'],
            'end_time' => date('Y-m-d H:i:s', $model['end_time']),
            'qrcode' => $Qrcode->getImage(),
        ];
        return $this->renderSuccess('', compact('order'));
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
            'order_type' => OrderTypeEnum::Group, //订单类型
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/order/group-list") : '', //h5支付跳转地址
        ]);
    }

    /**
     * 取消订单
     */
    public function cancel($order_id)
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        if ($model->cancel($this->getUser())) {
            return $this->renderSuccess('订单取消成功');
        }
        return $this->renderError($model->getError() ?: '订单取消失败');
    }

    /**
     * 申请退款
     */
    public function refund($order_id)
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        if ($model->refund($this->getUser())) {
            return $this->renderSuccess('申请退款成功');
        }
        return $this->renderError($model->getError() ?: '申请退款失败');
    }

    /**
     * 核销详情
     */
    public function extractDetail($order_id)
    {
        $model = new OrderModel();
        if ($detail = $model->extractDetail($order_id, $this->getUser())) {
            return $this->renderSuccess('', compact('detail'));
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 核销订单
     */
    public function receipt($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->receipt($this->getUser())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 查看券码
     */
    public function qrcode($order_id, $source = "wx")
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->getUser()['user_id']);
        $model['end_time'] = date('Y-m-d H:i:s', $model['end_time']);
        //查询券码
        $codeDetail = (new OrderCodeModel)->getOrderCode($model);
        $Qrcode = new GroupService($model, $source);
        return $this->renderSuccess('', [
            // 券码地址
            'qrcode' => $Qrcode->getImage(),
            //团购详情
            'detail' => $model,
            //团购码
            'code_no' => $codeDetail ? $codeDetail['code_no'] : '',
        ]);
    }

    private function formatPayEndTime($leftTime)
    {
        if ($leftTime <= 0) {
            return '';
        }
        $str = '';
        $day = floor($leftTime / 86400);
        $hour = floor(($leftTime - $day * 86400) / 3600);
        $min = floor((($leftTime - $day * 86400) - $hour * 3600) / 60);

        if ($day > 0) $str .= $day . '天';
        if ($hour > 0) $str .= $hour . '小时';
        if ($min > 0) $str .= $min . '分钟';
        return $str;
    }

}