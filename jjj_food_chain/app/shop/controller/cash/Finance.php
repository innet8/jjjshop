<?php

namespace app\shop\controller\cash;

use app\shop\controller\Controller;
use app\shop\model\order\OrderFinance as OrderFinanceModel;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\shop\model\order\Order as OrderModel;

/**
 * 财务对账
 */
class Finance extends Controller
{
    /**
     * 财务对账
     */
    public function index()
    {
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        $list = (new OrderFinanceModel)->getList($data);
        $supplierList = SupplierModel::getAll();
        return $this->renderSuccess('', compact('list', 'supplierList'));
    }

    /**
     * 账户概况
     */
    public function detail($finance_id)
    {
        $detail = OrderFinanceModel::detail($finance_id);
        //外卖概况
        $delivery = (new OrderFinanceModel)->getBaic($finance_id, $this->postData());
        //店内概况
        $store = (new OrderFinanceModel)->getBaic($finance_id, $this->postData(),1);
        return $this->renderSuccess('', compact('detail', 'delivery', 'store'));
    }

    /**
     * 详情
     */
    public function orderdetail($order_id)
    {
        $detail = OrderModel::detail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 订单导出
     */
    public function export()
    {
        $model = new OrderFinanceModel();
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        return $model->exportList($data);
    }
}
