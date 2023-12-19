<?php

namespace app\api\controller\order;

use app\api\model\order\Cart as CartModel;
use app\api\model\order\Order as OrderModel;
use app\api\service\order\settled\MasterOrderSettledService;
use app\api\service\order\settled\ScanOrderSettledService;
use app\api\controller\Controller;
use app\api\model\settings\Message as MessageModel;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\settings\SettingEnum;
use app\common\library\helper;
use app\common\model\settings\Setting;
use app\api\model\order\CashierCart as CashierCartModel;

/**
 * 普通订单
 */
class Order extends Controller
{
    /**
     * 订单确认-立即购买
     */
    public function cart()
    {
        // 立即购买：获取订单商品列表
        $params = $this->postData();
        if (empty($params['cart_ids'])) {
            return $this->renderError('商品不能为空');
        }
        $user = $this->getUser();
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $productList = $CartModel->getCartList($params, $this->getUser());
        // 实例化订单service
        $orderService = new MasterOrderSettledService($user, $productList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        if ($this->request->isGet()) {
            // 如果来源是小程序, 则获取小程序订阅消息id.获取支付成功,发货通知.
            $template_arr = MessageModel::getMessageByNameArr($params['pay_source'], ['order_pay_user', 'order_delivery_user', 'order_refund_user']);
            $balance = $user['balance'];
            return $this->renderSuccess('', compact('orderInfo', 'template_arr', 'balance'));
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
        // 移出购物车中已下单的商品
        $CartModel->clearAll($params['cart_ids']);
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单id
        ]);
    }

    /**
     * 堂食加菜
     */
    public function addMeal()
    {
        // 获取加菜商品列表
        $params = $this->postData();
        if (empty($params['cart_ids'])) {
            return $this->renderError('商品不能为空');
        }
        if (empty($params['order_id'])) {
            return $this->renderError('订单id不能为空');
        }
        $user = $this->getUser();
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $orderInfo = $CartModel->getMealList($params, $this->getUser());
        // 实例化订单service
        $orderService = new MasterOrderSettledService($user, $orderInfo['product_list'], $params);
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('orderInfo'));
        }
        // 移出购物车中已下单的商品
        $CartModel->clearAll($params['cart_ids']);
        // 加餐订单提交
        $orderModel = new OrderModel;
        if ($orderModel->mealOrder($orderInfo, $params['order_id'])) {
            return $this->renderSuccess('加餐成功');
        }
        return $this->renderError($orderModel->getError() ?: '加餐失败');
    }

    /**
     * 扫码点餐生成订单
     */
    public function tableBuy()
    {
        // 立即购买：获取订单商品列表
        $params = $this->postData();
        $params['eat_type'] = 10;
        $user = $this->getUser();
        // 商品结算信息
        $CartModel = new CashierCartModel();
        // 购物车商品列表
        $productList = $CartModel->getCartList($params);
        if (empty($productList)) {
            return $this->renderError('购物车商品不能为空');
        }
        // 实例化订单service
        $orderService = new ScanOrderSettledService($user, $productList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        if ($this->request->isGet()) {
            // 如果来源是小程序, 则获取小程序订阅消息id.获取支付成功,发货通知.
            $template_arr = MessageModel::getMessageByNameArr($params['pay_source'], ['order_pay_user', 'order_delivery_user', 'order_refund_user']);
            $balance = $user['balance'];
            return $this->renderSuccess('', compact('orderInfo', 'template_arr', 'balance'));
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
        // 移出购物车中已下单的商品
        $CartModel->deleteTableAll($params);
        // 返回结算信息
        return $this->renderSuccess('下单成功', compact('order_id'));
    }

    /**
     * 扫码点餐加菜
     */
    public function tableAddMeal($order_id)
    {
        // 获取加菜商品列表
        $params = $this->postData();
        $user = $this->getUser();
        // 商品结算信息
        $CartModel = new CashierCartModel();
        // 购物车商品列表
        $productList = $CartModel->getMealList($params);
        // 加餐订单提交
        $orderModel = new OrderModel;
        if ($orderModel->mealHallOrder($productList, $params)) {
            // 移出购物车中已下单的商品
            $CartModel->deleteTableAll($params);
            return $this->renderSuccess('点餐成功', compact('order_id'));
        }
        return $this->renderError($orderModel->getError() ?: '点餐失败');
    }
}