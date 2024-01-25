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
     * @Apidoc\Returned("list",type="object", children={
     *     @Apidoc\Returned("serial_no", type="string", desc="流水号"),
     *     @Apidoc\Returned("order_product", type="array", desc="厨显商品", children={
     *       @Apidoc\Returned("order_product_id", type="int", desc="订单商品id"),
     *       @Apidoc\Returned("order_id", type="int", desc="订单id"),
     *       @Apidoc\Returned("product_id", type="int", desc="商品id"),
     *       @Apidoc\Returned("product_name", type="string", desc="商品名称"),
     *       @Apidoc\Returned("is_send_kitchen", type="int", desc="是否送厨 0-否 1-是"),
     *       @Apidoc\Returned("send_kitchen_time", type="int", desc="送厨时间"),
     *       @Apidoc\Returned("finish_num", type="int", desc="完成数量"),
     *       @Apidoc\Returned("finish_time", type="int", desc="完成时间"),
     *       @Apidoc\Returned("total_num", type="int", desc="总数量"),
     *       @Apidoc\Returned("product_attr", type="string", desc="商品属性"),
     *       @Apidoc\Returned("remark", type="string", desc="备注"),
     *    }),
     * })
     * @Apidoc\Returned("bottom_finish",type="array", desc="底部完成商品", children={
     *     @Apidoc\Returned("order_product_id", type="int", desc="订单商品id"),
     *     @Apidoc\Returned("product_name", type="int", desc="订单id"),
     *     @Apidoc\Returned("finish_num", type="int", desc="完成数量"),
     *     @Apidoc\Returned("finish_time", type="int", desc="完成时间"),
     *     @Apidoc\Returned("total_num", type="int", desc="总数量"),
     *     @Apidoc\Returned("product_attr", type="string", desc="商品属性"),
     *     @Apidoc\Returned("remark", type="string", desc="备注"),
     * })
     */
    public function listByOrder()
    {
        $model = new OrderProductModel;
        $shop_supplier_id = $this->kitchen['shop_supplier_id'];
        // $list = $model->listByOrder(array_merge(['shop_supplier_id' => $shop_supplier_id], $this->postData()));
        $list = '';
        // $bottom_finish = $model->getFinishOrderProduct($shop_supplier_id, 5);
        $bottom_finish = '';
        $service_time = time();
        return $this->renderSuccess('', compact('list', 'bottom_finish', 'service_time'));
    }

    /**
     * @Apidoc\Title("按分类列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/listByCategory")
     * @Apidoc\Param("category_id", type="int", require=true, default="0", desc="顶级商品分类id")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="object", children={
     *     @Apidoc\Returned("category_name", type="string", desc="分类名称"),
     *     @Apidoc\Returned("category_name_text", type="string", desc="分类名称"),
     *     @Apidoc\Returned("order_product", type="array", desc="厨显商品", children={
     *       @Apidoc\Returned("order_product_id", type="int", desc="订单商品id"),
     *       @Apidoc\Returned("order_id", type="int", desc="订单id"),
     *       @Apidoc\Returned("product_id", type="int", desc="商品id"),
     *       @Apidoc\Returned("product_name", type="string", desc="商品名称"),
     *       @Apidoc\Returned("is_send_kitchen", type="int", desc="是否送厨 0-否 1-是"),
     *       @Apidoc\Returned("send_kitchen_time", type="int", desc="送厨时间"),
     *       @Apidoc\Returned("finish_num", type="int", desc="完成数量"),
     *       @Apidoc\Returned("finish_time", type="int", desc="完成时间"),
     *       @Apidoc\Returned("total_num", type="int", desc="总数量"),
     *       @Apidoc\Returned("product_attr", type="string", desc="商品属性"),
     *       @Apidoc\Returned("remark", type="string", desc="备注"),
     *    }),
     * })
     * @Apidoc\Returned("bottom_finish",type="array", desc="底部完成商品", children={
     *     @Apidoc\Returned("order_product_id", type="int", desc="订单商品id"),
     *     @Apidoc\Returned("product_name", type="int", desc="订单id"),
     *     @Apidoc\Returned("finish_num", type="int", desc="完成数量"),
     *     @Apidoc\Returned("finish_time", type="int", desc="完成时间"),
     *     @Apidoc\Returned("total_num", type="int", desc="总数量"),
     *     @Apidoc\Returned("product_attr", type="string", desc="商品属性"),
     *     @Apidoc\Returned("remark", type="string", desc="备注"),
     * })
     */
    public function listByCategory($category_id)
    {
        $model = new OrderProductModel;
        $shop_supplier_id = $this->kitchen['shop_supplier_id'];
        $list = $model->listByCategory(array_merge(['shop_supplier_id' => $shop_supplier_id], $this->postData()));
        $bottom_finish = $model->getFinishOrderProduct($shop_supplier_id, 5);
        $service_time = time();
        return $this->renderSuccess('', compact('list', 'bottom_finish', 'service_time'));
    }

    /**
     * @Apidoc\Title("厨房确认")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/kitchenConfirm")
     * @Apidoc\Param("order_product_id", type="int", require=true, default="", desc="订单商品id")
     * @Apidoc\Returned()
     */
    public function kitchenConfirm()
    {
        $model = new OrderProductModel;
        if ($model->kitchenConfirm(array_merge(['shop_supplier_id' => $this->kitchen['shop_supplier_id']], $this->postData()))) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("上菜历史")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/history")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="object", children={
     *     @Apidoc\Returned("serial_no", type="string", desc="流水号"),
     *     @Apidoc\Returned("order_product", type="array", desc="厨显商品", children={
     *       @Apidoc\Returned("order_product_id", type="int", desc="订单商品id"),
     *       @Apidoc\Returned("order_id", type="int", desc="订单id"),
     *       @Apidoc\Returned("product_id", type="int", desc="商品id"),
     *       @Apidoc\Returned("product_name", type="string", desc="商品名称"),
     *       @Apidoc\Returned("is_send_kitchen", type="int", desc="是否送厨 0-否 1-是"),
     *       @Apidoc\Returned("send_kitchen_time", type="int", desc="送厨时间"),
     *       @Apidoc\Returned("finish_num", type="int", desc="完成数量"),
     *       @Apidoc\Returned("finish_time", type="int", desc="完成时间"),
     *       @Apidoc\Returned("total_num", type="int", desc="总数量"),
     *       @Apidoc\Returned("product_attr", type="string", desc="商品属性"),
     *       @Apidoc\Returned("remark", type="string", desc="备注"),
     *    }),
     * })
     */
    public function history()
    {
        $model = new OrderProductModel;
        $list = $model->history(array_merge(['shop_supplier_id' => $this->kitchen['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("厨房恢复")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.OrderProduct/kitchenRecover")
     * @Apidoc\Param("order_product_id", type="int", require=true, default="", desc="订单商品id")
     * @Apidoc\Returned()
     */
    public function kitchenRecover()
    {
        $model = new OrderProductModel;
        if ($model->kitchenRecover(array_merge(['shop_supplier_id' => $this->kitchen['shop_supplier_id']], $this->postData()))) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}
