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
     * @Apidoc\Param("username", type="string", require=false, default="", desc="用户名")
     * @Apidoc\Param("date", type="array", require=false, default="", desc="起始日期")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("detail", type="array", desc="订单详情", children={
     *    @Apidoc\Returned("total_price", type="float", desc="营业总额"),
     *    @Apidoc\Returned("total_discount_money", type="float", desc="折扣总额"),
     *    @Apidoc\Returned("user_count", type="int", desc="会员数"),
     *    @Apidoc\Returned("order_count", type="int", desc="订单数"),
     *    @Apidoc\Returned("refund_money", type="float", desc="退款金额"),
     *    @Apidoc\Returned("express_price", type="float", desc="配送费总额"),
     *    @Apidoc\Returned("bag_price", type="float", desc="包装费总额"),
     *    @Apidoc\Returned("product_price", type="float", desc="商品总额"),
     * })
     * @Apidoc\Returned("salesNumRank", type="array", desc="销量排行", children={
     *    @Apidoc\Returned("product_name", type="string", desc="商品名称（多语言）"),
     *    @Apidoc\Returned("product_name_text", type="string", desc="商品名称"),
     *    @Apidoc\Returned("total_num", type="int", desc="销量"),
     *    @Apidoc\Returned("total_price", type="float", desc="销售额"),
     * })
     * @Apidoc\Returned("salesMoneyRank", type="array", desc="销售额排行", children={
     *    @Apidoc\Returned("product_name_text", type="string", desc="商品名称"),
     *    @Apidoc\Returned("product_name", type="string", desc="商品名称（多语言）"),
     *    @Apidoc\Returned("total_num", type="int", desc="销量"),
     *    @Apidoc\Returned("total_price", type="float", desc="销售额"),
     * })
     */
    public function index()
    {
        $data = $this->postData() ?: [];
        //
        if (isset($data['date']) && isset($data['date'][0])) {
            $data['time'] = $data['date'];
            $data['type'] = 4;
        }
        // 订单列表
        $model = new OrderModel();
        $detail = $model->getOrderTotalMoney(1, $this->store['user']['shop_supplier_id'], $data);
        // 销量排行
        $salesNumRank = $model->getProductRank(0, 1, $this->store['user']['shop_supplier_id'], $data);
        // 销售额排行
        $salesMoneyRank = $model->getProductRank(1, 1, $this->store['user']['shop_supplier_id'], $data);
        return $this->renderSuccess('', compact('detail','salesNumRank','salesMoneyRank'));
    }
}