<?php

namespace app\cashier\controller\order;

use app\cashier\model\order\Order as OrderModel;
use app\cashier\model\store\Table as TableModel;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\settings\DeliveryTypeEnum;
use app\common\enum\settings\SettingEnum;
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
     * @Apidoc\Param("time", type="array",require=true, default="", desc="时间范围 [2024-01-01, 2024-01-11]")
     * @Apidoc\Param("dataType", type="int",require=true, default="0", desc="订单状态 0-全都,1-进行中,2-已完成,3-已取消")
     * @Apidoc\Param("search", type="string",require=true, default="", desc="订单号")
     * @Apidoc\Param("order_type", type="string",require=true, default="", desc="用餐方式 0-外卖,1-店内")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Order\getList")
     */
    public function index($dataType = 'all')
    {
        // 订单列表
        $model = new \app\shop\model\order\Order();
        $data = $this->postData();
        $data['order_type'] = 1;
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];

        if ($data['dataType'] == 1) {
            $dataType = 'payment';
        } elseif ($data['dataType'] == 2) {
            $dataType = 'complete';
        } elseif ($data['dataType'] == 3){
            $dataType = 'cancel';
        } else {
            $dataType = 'all';
        }

        $data = [
            'shop_supplier_id' => $this->cashier['user']['shop_supplier_id'],
            'order_no' => $data['search'] ?? '',
            'style_id' => '',
            'order_type' => $data['order_type'],
            'create_time' => $data['time'] ?? '',
            'time_type' => $data['time_type'],
            'order_source' => $data['eat_type'] ?? 0,
            'dataType' =>  $dataType,
            'list_rows' =>  $data['list_rows'] ?? 6,
        ];

        $list = $model->getList($dataType, $data);
        $info = [
                'all' => $model->getCount('all', $data),
                'pendingNum' => $model->getCount('payment', $data),
                'completeNum' => $model->getCount('complete', $data),
                'cancelNum' => $model->getCount('cancel', $data),
        ];
        $ex_style = DeliveryTypeEnum::store();
        return $this->renderSuccess('', compact('list', 'ex_style', 'info'));
    }

    /**
     * @Apidoc\Title("收银收款")
     * @Apidoc\Tag("收银收款")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/buy")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("delivery", type="int",require=true, default=0, desc="配送方式(10外卖配送 20上门取 30打包带走 40店内就餐)")
     * @Apidoc\Param("pay_type", type="int",require=true, default=0, desc="付款类型  10-余额收款 40-现金收款 50-微信收款 60-支付宝收款 70-POS机收款")
     * @Apidoc\Param("user_id", type="int",require=false, default=0, desc="用户id （pay_type为余额收款必填）")
     */
    public function buy($order_id)
    {
        $detail = OrderModel::detail([
            ['order_id', '=', $order_id],
            ['order_status', '=', OrderStatusEnum::NORMAL],
        ]);
        if (!$detail) {
            return $this->renderError('订单不存在');
        }
        if ($detail->orderPay($this->postData())) {
            return $this->renderSuccess('结账成功');
        }
        return $this->renderError($detail->getError() ?: '结账失败', $detail->getErrorData());
    }

    /**
     * @Apidoc\Title("桌台开台")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Order/tableBuy")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Param("meal_num", type="int", require=true, desc="就餐人数")
     * @Apidoc\Param("is_buffet", type="int", require=true, desc="是否自助餐 0-否 1-是")
     * @Apidoc\Param("user_id", type="int", require=false, desc="会员ID（会员自己开台必填）")
     * @Apidoc\Returned()
     */
    public function tableBuy()
    {
        // 立即购买：获取订单商品列表
        $params = $this->postData();
        $params['eat_type'] = 10;
        $params['order_source'] = 10;
        $user = $this->cashier['user'];
        if ($params['meal_num'] > 999 || $params['meal_num'] < 1) {
            return $this->renderError('请输入1-999的人数');
        }
        $table = TableModel::detail($params['table_id']);
        if (!$table) {
            return $this->renderError('桌台不存在');
        }
        if ($table['status'] == 30) {
            return $this->renderError('桌台已开台');
        }
        // 自助餐
        if (($params['is_buffet'] ?? 0) == 1) {
            // 自助餐设置
            $buffetSetting = SettingModel::getSupplierItem(SettingEnum::BUFFET, $this->cashier['user']['shop_supplier_id'] ?? 0, $this->cashier['user']['app_id'] ?? 0);
            if ($buffetSetting['is_open'] != 1) {
                return $this->renderError('未开启自助餐');
            }
            if (empty($params['buffet_ids'])) {
                return $this->renderError('请选择自助餐');
            }
        }

        // 实例化订单service
        $orderService = new CashierOrderSettledService($user, [], $params);
        // 订单信息初始化
        $orderInfo = $orderService->settlement();
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        // 创建订单
        $order_id = $orderService->createOrder($orderInfo);
        if (!$order_id) {
            return $this->renderError($orderService->getError() ?: '订单创建失败');
        }
        (new OrderModel())->reloadPrice($order_id);
        // 修改桌台状态
        TableModel::open($params['table_id']);
        // 返回结算信息
        return $this->renderSuccess('开台成功');
    }

    /**
     * @Apidoc\Title("桌台修改就餐人数")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Order/updateMealNum")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Param("meal_num", type="int", require=true, desc="就餐人数")
     * @Apidoc\Returned()
     */
    public function updateMealNum($table_id, $meal_num)
    {
        if ($meal_num > 999) {
            return $this->renderError('超过最大人数');
        }
        $detail = OrderModel::getTableUnderwayOrder($table_id);
        if (!$detail) {
            return $this->renderError('当前状态不可操作');
        }
        if ($detail->updateMealNum($meal_num)) {
            return $this->renderSuccess('修改就餐人数成功');
        }
        return $this->renderError($detail->getError() ?: '修改就餐人数失败');
    }

    /**
     * @Apidoc\Title("桌台转台")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/changeTable")
     * @Apidoc\Param("old_table_id", type="int", require=false, desc="原桌台ID")
     * @Apidoc\Param("new_table_id", type="int", require=false, desc="新桌台ID")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\store\Table\getList")
     */
    public function changeTable($old_table_id, $new_table_id)
    {

        $detail = OrderModel::getTableUnderwayOrder($old_table_id);
        if (!$detail) {
            return $this->renderError('桌台已关闭');
        }
        if ($detail->exchangeTable($old_table_id, $new_table_id)) {
            return $this->renderSuccess('转台成功');
        }
        return $this->renderError($detail->getError() ?: '转台失败');
    }

    /**
     * @Apidoc\Title("桌台结账")
     * @Apidoc\Tag("桌台结账")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/pay")
     * @Apidoc\Param("table_id", type="int",require=true, default=0, desc="桌台id")
     * @Apidoc\Param("pay_type", type="int",require=true, default=0, desc="付款类型  10-余额收款 40-现金收款 50-微信收款 60-支付宝收款 70-POS机收款")
     * @Apidoc\Param("user_id", type="int",require=false, default=0, desc="用户id （pay_type为余额收款必填）")
     */
    public function pay($table_id)
    {
        $detail = OrderModel::getTableUnderwayOrder($table_id);
        if (!$detail) {
            return $this->renderSuccess('桌台订单不存在');
        }
        if ($detail->orderPay($this->postData(), $this->cashier['user'])) {
            TableModel::close($detail['table_id']);
            return $this->renderSuccess('结账成功');
        }
        return $this->renderError($detail->getError() ?: '结账失败', $detail->getErrorData(), $detail->getErrorCode());
    }

    /**
     * @Apidoc\Title("订单退菜")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.order/moveProduct")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单产品表ID")
     * @Apidoc\Param("num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("return_reason", type="string", require=true, desc="退菜原因")
     */
    public function moveProduct($order_id, $order_product_id, $num, $return_reason = '')
    {
        $detail = OrderModel::detail($order_id);
        if ($detail->moveProduct($order_product_id, $num, $return_reason)) {
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
        $detail = OrderModel::detailWithTrashed($order_id);
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
        // 发送打印
        $printerConfig = SettingModel::getSupplierItem('printer', $order['shop_supplier_id'], $order['app_id']);
        request()->language = $printerConfig['default_language'] ?? '';
        $res = (new OrderPrinterService)->printTicket($order);
        request()->language = '';
        // 锁定
        $order->is_lock = 1;
        $order->save();
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

    /**
     * @Apidoc\Title("使用会员")
     * @Apidoc\Tag("使用会员")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/useMember")
     * @Apidoc\Param("user_id", type="int",require=true, default=0, desc="会员ID")
     * @Apidoc\Param("order_id", type="int",require=false, default=0, desc="订单ID")
     * @Apidoc\Param("table_id", type="int",require=false, default=0, desc="桌台ID")
     */
    public function useMember($user_id, $order_id = 0, $table_id = 0)
    {
        if ($order_id > 0) {
            $detail = OrderModel::detail([
                ['order_id', '=', $order_id],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
        } else if ($table_id > 0) {
            $detail = OrderModel::getTableUnderwayOrder($table_id);
        } else {
            return $this->renderError('订单不存在');
        }

        if (!$detail) {
            return $this->renderError('订单不存在');
        }
        $is_change_price = $detail['is_change_price'];
        if ($detail->useMember($user_id)) {
            $reset_notice = 0;
            if ($is_change_price != $detail['is_change_price'] && $detail['discount_ratio'] == 0) {
                $reset_notice = 1;
            }
            return $this->renderSuccess('使用会员成功', ['reset_notice' => $reset_notice]);
        }
        return $this->renderError($detail->getError() ?: '使用会员失败');
    }

    /**
     * @Apidoc\Title("取消锁定")
     * @Apidoc\Tag("取消锁定")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/order.order/unlock")
     * @Apidoc\Param("order_id", type="int",require=true, default=0, desc="订单id")
     */
    public function unlock($order_id)
    {
        $order = OrderModel::detail($order_id);
        if (!$order) {
            return $this->renderError('订单不存在');
        }
        // 锁定
        $order->is_lock = 0;
        $order->save();
        //
        return  $this->renderSuccess('取消成功');
    }
}