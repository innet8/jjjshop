<?php

namespace app\kitchen\controller\order;

use app\kitchen\model\order\OrderProduct as OrderProductModel;
use app\kitchen\controller\Controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 订单记录
 * @Apidoc\Group("order")
 */
class OrderProduct extends Controller
{
    /**
     * @Apidoc\Title("按订单列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/listByOrder")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\kitchen\model\order\OrderProduct\listByOrder")
     */
    public function listByOrder()
    {
        $model = new OrderProductModel;
        $list = $model->listByOrder(array_merge(['shop_supplier_id' => $this->kitchen['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("按分类列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/listByCategory")
     * @Apidoc\Param("category_id", type="int", require=true, default="0", desc="顶级商品分类id")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\kitchen\model\order\OrderProduct\listByCategory")
     */
    public function listByCategory($category_id)
    {
        $model = new OrderProductModel;
        $list = $model->listByCategory(array_merge(['shop_supplier_id' => $this->kitchen['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }
}
