<?php

namespace app\cashier\controller\order;

use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use app\cashier\controller\Controller;
use app\common\service\order\OrderPrinterService;
use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;
/**
 * 订单
 */
class Order extends Controller
{
    
    /**
     * @Apidoc\Title("订单列表")
     * @Apidoc\Tag("订单列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.order/index")
     * @Apidoc\Param("eat_type", type="int",require=true, default="10", desc="订单类型 0-全部,10-收银订单，20-桌台订单")
     * @Apidoc\Param("time_type", type="int",require=true, default="1", desc="时间类型 0-全都,1-今天,2-昨天,3-周")
     * @Apidoc\Param("time", type="string",require=true, default="", desc="时间范围 [2024-01-01, 2024-01-11]")
     * @Apidoc\Param("dataType", type="int",require=true, default="0", desc="订单状态 0-全都,1-进行中,2-已完成,3-已取消")
     * @Apidoc\Param("search", type="string",require=true, default="", desc="订单号")
     * @Apidoc\Param("order_type", type="string",require=true, default="", desc="用餐方式 0-外卖,1-店内")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Order\getList")
     */
    public function index()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        $list = (new OrderModel)->getList($data);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 收银购物车-立即购买
     */
    public function buy()
    {
        // 立即购买：获取订单商品列表
        $params = $this->postData();
        $user = $this->cashier['user'];
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $productList = $CartModel->getCartList($user);
        if (count($productList) <= 0) {
            return $this->renderError('购物车商品不能为空');
        }
        $params['eat_type'] = 20;
        // 实例化订单service
        $orderService = new CashierOrderSettledService($user, $productList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
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
        $CartModel->deleteAll($this->cashier['user']);
        return $this->renderSuccess('收款成功');
    }

    /**
     * 桌台订单-生成订单
     */
    public function tableBuy()
    {
        // 立即购买：获取订单商品列表
        $params = $this->postData();
        $params['eat_type'] = 10;
        $user = $this->cashier['user'];
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $productList = $CartModel->getCartList($user, $params['table_id'], 10);
        if (empty($productList)) {
            return $this->renderError('购物车商品不能为空');
        }
        // 实例化订单service
        $orderService = new CashierOrderSettledService($user, $productList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
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
        $CartModel->deleteTableAll($this->cashier['user'], $params['table_id']);
        // 返回结算信息
        return $this->renderSuccess('下单成功');
    }

    /**
     * 堂食协助点餐
     */
    public function addMeal()
    {
        // 获取加菜商品列表
        $params = $this->postData();
        $params['eat_type'] = 10;
        $user = $this->cashier['user'];
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $productList = $CartModel->getCartList($user, $params['table_id'], 10);
        // 加餐订单提交
        $orderModel = new OrderModel;
        if ($orderModel->mealHallOrder($productList, $params)) {
            // 移出购物车中已下单的商品
            $CartModel->deleteTableAll($this->cashier['user'], $params['table_id']);
            return $this->renderSuccess('协助点餐成功');
        }
        return $this->renderError($orderModel->getError() ?: '协助点餐失败');
    }

    /**
     * 转台
     */
    public function changeTable($order_id, $table_id)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->changeTable($table_id)) {
            return $this->renderSuccess('转台成功');
        }
        return $this->renderError($detail->getError() ?: '转台失败');
    }

    /**
     * 桌台订单-付款
     */
    public function pay($order_id)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->orderPay($this->postData())) {
            return $this->renderSuccess('结账成功');
        }
        return $this->renderError($detail->getError() ?: '结账失败');
    }

    /**
     * @Apidoc\Title("桌台订单-退菜")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单产品表ID")
     * @Apidoc\Param("num", type="int", require=true, desc="产品数量")
     * @Apidoc\Returned("code", type="int", desc="返回代码")
     * @Apidoc\Returned("msg", type="string", desc="返回消息")
     * @Apidoc\Returned("data", type="array", desc="返回数据")
     */
    public function moveProduct($order_id, $order_product_id, $num)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->moveProduct($order_product_id, $num)) {
            return $this->renderSuccess('退菜成功');
        }
        return $this->renderError($detail->getError() ?: '退菜失败');
    }

    /**
     * 桌台订单-详情
     */
    public function detail($order_id)
    {
        $detail = OrderModel::detail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 订单-结算完成
     */
    public function settle($order_id)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->settle()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($detail->getError() ?: '操作失败');
    }

    /**
     * 退款
     */
    public function refund($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->refund($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 打印小票
     */
    public function print($order_id)
    {
        $order = OrderModel::detail($order_id);
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem('printer', $order['shop_supplier_id'], $order['app_id']);
        //发送打印
        (new OrderPrinterService)->sellerPrint($printerConfig, $order);
        return $this->renderSuccess('打印成功');

    }

    /**
     * @Apidoc\Title("取消订单")
     * @Apidoc\Tag("取消订单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.order/cancel")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function cancel($order_id)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail?->cancels()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($detail?->getError() ?: '操作失败');
    }
    
}