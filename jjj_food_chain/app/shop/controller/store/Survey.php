<?php

namespace app\shop\controller\store;

use app\shop\controller\Controller;
use app\shop\model\order\Order as OrderModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 店内概况
 * @Apidoc\Group("statistics")
 * @Apidoc\Sort(7)
 */
class Survey extends Controller
{
    /**
     * @Apidoc\Title("店内概况")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.survey/index")
     * @Apidoc\Param("username", type="string", require=true, default="", desc="用户名")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("detail", type="array", ref="app\common\model\order\Order\getOrderTotalMoney", desc="订单详情")
     * @Apidoc\Returned("salesNumRank", type="array", ref="app\common\model\order\Order\getProductRank", desc="销量排行")
     * @Apidoc\Returned("salesMoneyRank", type="array", ref="app\common\model\order\Order\getProductRank", desc="销售额排行")
     */
    public function index()
    {
        // 订单列表
        $model = new OrderModel();
        $detail = $model->getOrderTotalMoney(1,$this->store['user']['shop_supplier_id']);
        // 销量排行
        $salesNumRank = $model->getProductRank(0,1,$this->store['user']['shop_supplier_id']);
        // 销售额排行
        $salesMoneyRank = $model->getProductRank(1,1,$this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('detail','salesNumRank','salesMoneyRank'));
    }
}