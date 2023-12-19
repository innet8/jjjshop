<?php

namespace app\shop\controller\plus\group;

use app\common\model\plus\group\OrderCode as OrderCodeModel;
use app\shop\controller\Controller;
use app\shop\model\plus\group\Order as OrderModel;
use app\shop\model\supplier\Supplier as SupplierModel;

/**
 * 团购订单控制器
 */
class Order extends Controller
{
    /**
     * 订单列表
     */
    public function index($dataType = 'all')
    {
        // 订单列表
        $model = new OrderModel();
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        $list = $model->getList($dataType, $data);
        $order_count = [
            'order_count' => [
                'all' => $model->getCount('all', $data),
                'payment' => $model->getCount('payment', $data),
                'process' => $model->getCount('process', $data),
                'refund' => $model->getCount('refund', $data),
                'complete' => $model->getCount('complete', $data),
                'cancel' => $model->getCount('cancel', $data),
            ],];
        $supplierList = SupplierModel::getAll();
        return $this->renderSuccess('', compact('list', 'order_count', 'supplierList'));
    }

    /**
     * 订单详情
     */
    public function detail($order_id)
    {
        // 订单详情
        $detail = OrderModel::detail($order_id);
        if (isset($detail['pay_time']) && $detail['pay_time'] > 0) {
            $detail['pay_time'] = date('Y-m-d H:i:s', $detail['pay_time']);
        }
        $detail['end_time'] = date('Y-m-d H:i:s', $detail['end_time']);
        //查询券码
        $codeDetail = (new OrderCodeModel)->getOrderCode($detail);
        $detail['code_no'] = $codeDetail ? $codeDetail['code_no'] : '';
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 订单导出
     */
    public function export($dataType)
    {
        $model = new OrderModel();
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        return $model->exportList($dataType, $data);
    }

}