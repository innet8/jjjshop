<?php

namespace app\shop\controller\statistics;

use app\shop\controller\Controller;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\shop\service\ShopService;
use app\shop\service\order\ExportService;

/**
 * 订单统计数据控制器
 */
class Product extends Controller
{
    /**
     * 店内商品数据
     *
     */
    public function index()
    {
        $data = $this->postData();
        $model = new ShopService();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        //基础数据
        $detail = $model->getProductData($data);
        //商家数据
        $supplierList = SupplierModel::getAll();
        //商品销量
        $list = $model->getProductRank($data, 0);
        return $this->renderSuccess('', compact('detail', 'supplierList', 'list'));
    }

    /**
     * 订单导出
     */
    public function export()
    {
        $data = $this->postData();
        $user = $this->store['user'];
        if ($user['user_type'] == 1) {
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
        }
        $model = new ShopService();
        $list = $model->getProductRank($data, 1);
        return (new Exportservice)->ProductRank($list);
    }
}