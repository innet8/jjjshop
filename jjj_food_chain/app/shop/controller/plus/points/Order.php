<?php

namespace app\shop\controller\plus\points;

use app\shop\controller\Controller;
use app\shop\model\plus\points\Order as OrderModel;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\common\enum\settings\DeliveryTypeEnum;
use app\shop\model\settings\Express as ExpressModel;

/**
 * 订单控制器
 */
class Order extends Controller
{
    /**
     * 订单列表
     */
    public function index($order_status = 0)
    {
        // 订单列表
        $model = new OrderModel();
        $list = $model->getList($order_status, $this->postData(), $this->store['user']);
        // 自提门店列表
        $shop_list = SupplierModel::getAllList();
        $ex_style = DeliveryTypeEnum::points();
        return $this->renderSuccess('', compact('list', 'ex_style', 'shop_list'));
    }

    /**
     * 订单详情
     */
    public function detail($order_id)
    {
        // 订单详情
        $detail = OrderModel::detail($order_id);
        if (isset($detail['pay_time']) && $detail['pay_time'] != '') {
            $detail['pay_time'] = date('Y-m-d H:i:s', $detail['pay_time']);
        }
        if (isset($detail['delivery_time']) && $detail['delivery_time'] != '') {
            $detail['delivery_time'] = date('Y-m-d H:i:s', $detail['delivery_time']);
        }
        $detail['product'] = OrderModel::getProduct($detail);
        // 物流公司列表
        $model = new ExpressModel();
        $expressList = $model->getAll();
        return $this->renderSuccess('', compact('detail', 'expressList'));
    }

    /**
     * 确认发货
     */
    public function delivery($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->delivery($this->postData('param'))) {
            return $this->renderSuccess('发货成功');
        }
        return $this->renderError('发货失败');
    }

    /**
     * 门店自提核销
     */
    public function extract()
    {
        $params = $this->postData();
        $model = OrderModel::detail($params['order_id']);
        if ($model->verificationOrder()) {
            return $this->renderSuccess('核销成功');
        }
        return $this->renderError($model->getError() ?: '核销失败');
    }

    /**
     * 订单导出
     */
    public function export($order_status = 0)
    {
        $model = new OrderModel();
        return $model->exportList($order_status, $this->postData(), $this->store['user']);
    }

}