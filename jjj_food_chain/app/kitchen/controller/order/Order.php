<?php

namespace app\kitchen\controller\Order;

use app\kitchen\model\order\Order as OrderModel;
use app\kitchen\controller\Controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 订单
 * @Apidoc\Group("order")
 */
class Order extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.order/list")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned()
     */
    public function list()
    {
        $model = new OrderModel;
        $list = $model->getKitchenList($this->postData(), $this->kitchen);
        return $this->renderSuccess('', compact('list'));
    }
}
