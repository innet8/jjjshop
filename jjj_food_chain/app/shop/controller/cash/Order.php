<?php

namespace app\shop\controller\cash;

use app\shop\controller\Controller;
use app\shop\model\order\OrderSettled as OrderSettledModel;
use app\shop\model\order\Order as OrderModel;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\shop\service\order\ExportService;
use app\common\enum\order\OrderPayTypeEnum;

/**
 * 提现
 */
class Order extends Controller
{
    /**
     * 订单列表
     */
    public function index()
    {
        $model = new OrderSettledModel;
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        //列表数据
        $list = $model->getList($data);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 详情
     */
    public function detail($settled_id)
    {
        $model = OrderSettledModel::detail($settled_id);
        $order = OrderModel::detail($model['order_id']);
        return $this->renderSuccess('', compact('model', 'order'));
    }

    /**
     * 交易记录
     */
    public function record($dataType = 'all')
    {
        $supplierList = SupplierModel::getAll();
        // 订单列表
        $model = new OrderModel();
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        $list = $model->getRecordList($data);
        //支付方式
        $pay_type = OrderPayTypeEnum::data();
        return $this->renderSuccess('', compact('list', 'supplierList', 'pay_type'));
    }

    /**
     * 订单详情
     */
    public function recordDetail($order_id)
    {
        $detail = OrderModel::detail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 订单导出
     */
    public function export()
    {
        $model = new OrderModel();
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        $list = $model->getRecordList($data, 1);
        return (new Exportservice)->recordOrderList($list);
    }
}
