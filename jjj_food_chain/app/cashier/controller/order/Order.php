<?php

namespace app\cashier\controller\order;

use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;
use app\cashier\model\store\Table as TableModel;
use app\common\model\order\Order as CommonOrderModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use app\cashier\controller\Controller;
use app\common\service\order\OrderPrinterService;
use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;
/**
 * 订单
 * @Apidoc\Group("order")
 * @Apidoc\Sort(1)
 */
class Order extends Controller
{

    /**
     * @Apidoc\Title("订单列表")
     * @Apidoc\Tag("订单列表")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/index")
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
     * @Apidoc\Title("收银收款")
     * @Apidoc\Tag("收银收款")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/index")
     * @Apidoc\Param("delivery", type="int",require=true, default=0, desc="配送方式(10外卖配送 20上门取 30打包带走 40店内就餐)")
     * @Apidoc\Param("pay_type", type="int",require=true, default=0, desc="支付方式(10余额支付 20微信支付 40现金支付)")
     * @Apidoc\Param("user_id", type="int",require=false, default=0, desc="用户id")
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
     * @Apidoc\Title("桌台开台")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Order/tableBuy")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Param("meal_num", type="int", require=true, desc="就餐人数")
     * @Apidoc\Param("user_id", type="int", require=false, desc="会员ID（会员自己开台必填）")
     * @Apidoc\Returned()
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
//        if (empty($productList) || count($productList) == 0) {
//            return $this->renderError('购物车商品不能为空');
//        }
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
        // 修改桌台状态
        TableModel::open($params['table_id']);
        // 返回结算信息
        return $this->renderSuccess('下单成功');
    }

    /**
     * @Apidoc\Title("桌台协助点餐、加餐(送厨)")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Order/addMeal")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("meal_num", type="int", require=true, desc="就餐人数")
     * @Apidoc\Param("user_id", type="int", require=false, desc="会员ID（会员自己开台必填）")
     * @Apidoc\Returned()
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
     * @Apidoc\Title("桌台修改就餐人数")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Order/updateMealNum")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("meal_num", type="int", require=true, desc="就餐人数")
     * @Apidoc\Returned()
     */
    public function updateMealNum()
    {
        // 获取加菜商品列表
        $params = $this->postData();
        $params['eat_type'] = 10;
        $user = $this->cashier['user'];
        // 加餐订单提交
        $orderModel = new OrderModel;
        if ($orderModel->updateMealNum($params)) {
            return $this->renderSuccess('修改就餐人数成功');
        }
        return $this->renderError($orderModel->getError() ?: '修改就餐人数失败');
    }

    /**
     * @Apidoc\Title("桌台转台")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/changeTable")
     * @Apidoc\Param("order_id", type="int", require=false, desc="订单id")
     * @Apidoc\Param("table_id", type="int", require=false, desc="桌台ID")
     * @Apidoc\Param("area_id", type="int", require=false, desc="区域ID")
     * @Apidoc\Param("type_id", type="int", require=false, desc="桌台类型ID")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\store\Table\getList")
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
     * @Apidoc\Title("桌台结账")
     * @Apidoc\Tag("桌台结账")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/pay")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     * @Apidoc\Param("pay_type", type="int",require=true, default=0, desc="付款类型  10-余额收款 40-现金收款 50-微信收款 60-支付宝收款 70-POS机收款")
     * @Apidoc\Param("user_id", type="int",require=false, default=0, desc="用户id （pay_type为余额收款必填）")
     */
    public function pay($order_id)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->orderPay($this->postData())) {
            TableModel::close($detail['table_id']);
            return $this->renderSuccess('结账成功');
        }
        return $this->renderError($detail->getError() ?: '结账失败');
    }

    /**
     * @Apidoc\Title("订单退菜")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.order/moveProduct")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单产品表ID")
     * @Apidoc\Param("num", type="int", require=true, desc="商品数量")
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
     * @Apidoc\Title("订单详情")
     * @Apidoc\Tag("详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/detail")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function detail($order_id)
    {
        $detail = OrderModel::detail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("结算完成")
     * @Apidoc\Tag("结算完成")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/settle")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
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
     * @Apidoc\Title("订单退款")
     * @Apidoc\Tag("订单退款")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/refund")
     * @Apidoc\Param("refund_money", type="int",require=true, default=0, desc="退款金额")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function refund($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model?->refund($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model?->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("打印小票(預結賬單)")
     * @Apidoc\Tag("打印小票")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/print")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function print($order_id)
    {
        $order = OrderModel::detail($order_id);
        if (!$order) {
            return $this->renderError('订单不存在');
        }
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem('printer', $order['shop_supplier_id'], $order['app_id']);
        //发送打印
        $res = (new OrderPrinterService)->sellerPrint($printerConfig, $order, true);
        // 
        return  $res ? $this->renderSuccess('打印成功') : $this->renderError('打印失败，未连接打印机');
    }

    /**
     * @Apidoc\Title("取消订单")
     * @Apidoc\Tag("取消订单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/cancel")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function cancel($order_id)
    {
        $detail = CommonOrderModel::detail($order_id);
        if ($detail?->cancels()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($detail?->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("删除订单")
     * @Apidoc\Tag("删除订单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/remove")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function remove($order_id)
    {
        $detail = CommonOrderModel::detail($order_id);
        if ($detail?->remove()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($detail?->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("订单商品改价")
     * @Apidoc\Tag("订单商品改价")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/changeProductPrice")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function changeProductPrice($order_id, $order_product_id, $money)
    {
        $detail = OrderModel::detail($order_id);
        if ($detail?->changeProductPrice($order_product_id, $money)) {
            return $this->renderSuccess('改价成功');
        }
        return $this->renderError($detail->getError() ?: '改价失败');
    }

}