<?php

namespace app\shop\controller\store;

use app\shop\controller\Controller;
use app\shop\model\order\Order as OrderModel;
use app\common\enum\settings\DeliveryTypeEnum;
use hg\apidoc\annotation as Apidoc;

/**
 * 订单管理
 * @Apidoc\Group("order")
 * @Apidoc\Sort(4)
 */
class Order extends Controller
{
    /**
     * @Apidoc\Title("订单列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.order/index")
     * @Apidoc\Param("time_type", type="int", require=false, default="", desc="时间类型 0-全都 1-今天 2-昨天 3-周")
     * @Apidoc\Param("order_source", type="int", require=false, default="", desc="订单来源 0-全都 10-桌台 20-收银")
     * @Apidoc\Param("order_no", type="string", require=false, default="", desc="订单号")
     * @Apidoc\Param("style_id", type="int", require=false, default="", desc="配送方式")
     * @Apidoc\Param("date", type="array", require=false, default="", desc="起始日期")
     * @Apidoc\Param("dataType", type="string", require=false, default="all", desc="订单类型 all-全部 payment-待付款 process-进行中 complete-已完成 cancel-已取消")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\order\Order\getList", desc="列表")
     */
    public function index($dataType = 'all')
    {
        // 订单列表
        $model = new OrderModel();
        $data = $this->postData();
        $data['order_type'] = 1;
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        $list = $model->getList($dataType, $data);
        $order_count = [
            'order_count' => [
                'all' => $model->getCount('all', $data),
                'payment' => $model->getCount('payment', $data),
                'process' => $model->getCount('process', $data),
                'complete' => $model->getCount('complete', $data),
                'cancel' => $model->getCount('cancel', $data),
            ],];
        $ex_style = DeliveryTypeEnum::store();
        return $this->renderSuccess('', compact('list', 'ex_style', 'order_count'));
    }

    /**
     * @Apidoc\Title("订单详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.order/detail")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Returned("detail", type="array", ref="app\shop\model\order\Order\detail", desc="订单详情")
     */
    public function detail($order_id)
    {
        // 订单详情
        $detail = OrderModel::detail($order_id);
        if (isset($detail['pay_time']) && $detail['pay_time'] > 0) {
            $detail['pay_time'] = date('Y-m-d H:i:s', $detail['pay_time']);
        }
        if (isset($detail['delivery_time']) && $detail['delivery_time'] != '') {
            $detail['delivery_time'] = date('Y-m-d H:i:s', $detail['delivery_time']);
        }
        return $this->renderSuccess('', compact('detail'));
    }
}