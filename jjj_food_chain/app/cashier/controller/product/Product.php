<?php

namespace app\cashier\controller\product;

use app\cashier\model\product\Product as ProductModel;
use app\cashier\controller\Controller;
use app\common\enum\order\OrderStatusEnum;
use app\common\model\order\Order;
use hg\apidoc\annotation as Apidoc;

/**
 * 商品
 * @Apidoc\Group("product")
 */
class Product extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.product/index")
     * @Apidoc\Param("category_id", type="int", require=true, desc="商品分类ID")
     * @Apidoc\Param("search", type="string", require=false, default="", desc="搜索关键字")
     * @Apidoc\Param("is_special", type="int", require=false, default="", desc="是否特色分类 0-否 1-是")
     * @Apidoc\Param("table_id", type="int", require=false, desc="桌台ID")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Product\list")
     */
    public function index()
    {
        // 获取全部商品列表
        $param = $this->postData();
        $model = new ProductModel;
        $list = $model->list(array_merge(['shop_supplier_id' => $this->cashier['user']['shop_supplier_id']], $param));
        // 如果选择自助餐
        if (isset($param['table_id'])) {
            $order = Order::detail([
                ['table_id', '=', $param['table_id']],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
            if ($order && $order['is_buffet'] == 1) {
                $buffetProductArr = Order::getOrderBuffetProductArr($order['order_id']);
                $list['data'] = Order::handleBuffetProductIndex($list['data'], $buffetProductArr);
            }
        }

        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.product/detail")
     * @Apidoc\Param("product_id", type="int", require=false, default="0", desc="商品id")
     * @Apidoc\Param("table_id", type="int", require=false, desc="桌台ID")
     * @Apidoc\Returned("list",type="array",ref="app\common\model\product\Product\detail")
     */
    public function detail($product_id, $table_id = 0)
    {
        // 商品详情
        $detail = ProductModel::detail($product_id);
        // 如果选择自助餐
        if ($table_id > 0) {
            $order = Order::detail([
                ['table_id', '=', $table_id],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
            if ($order) {
                $buffetProductArr = Order::getOrderBuffetProductArr($order['order_id']);
                $detail = Order::handleBuffetProductDetail($detail, $buffetProductArr);
            }
        }
        return $this->renderSuccess('', $detail);
    }

}
