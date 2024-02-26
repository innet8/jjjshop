<?php

namespace app\cashier\controller\order;

use app\cashier\controller\Controller;
use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;
use app\common\enum\order\OrderStatusEnum;
use app\common\model\order\OrderProduct;
use hg\apidoc\annotation as Apidoc;

/**
 * 收银购物车
 * @Apidoc\Group("order")
 * @Apidoc\Sort(2)
 */
class Cart extends Controller
{
    /**
     * @Apidoc\Title("加入购物车")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/add")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品id")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("product_sku_id", type="int", require=true, desc="商品规格id")
     * @Apidoc\Param("price", type="float", require=true, desc="总价")
     * @Apidoc\Param("product_price", type="float", require=true, desc="商品单价")
     * @Apidoc\Param("bag_price", type="float", require=true, desc="包装费")
     * @Apidoc\Param("delivery", type="int", require=true, desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Param("attr", type="string", require=false, desc="商品属性，如：1,1")
     * @Apidoc\Param("feed", type="string", require=false, desc="商品加料，如：0,1")
     * @Apidoc\Param("describe", type="string", require=false, desc="商品描述，如：规格1;属性1;属性2;加料1,加料2")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->postData();
        $data['eat_type'] = 20; // 10-堂食 20-快餐
        $data['is_buffet'] = 0;
        $model = new OrderModel();
        $order_id = $model->addToOrder($data, $this->cashier['user']);
        if ($order_id > 0) {
            return $this->renderSuccess('添加商品成功', ['order_id' => $order_id]);
        }
        return $this->renderError($model->getError() ?: '添加商品失败');

    }

    /**
     * @Apidoc\Title("购物车列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/list")
     * @Apidoc\Param("delivery", type="int", require=true, default="40", desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Param("order_id", type="int", require=false, desc="订单id")
     * @Apidoc\Returned("allProductInfo",type="array",ref="app\cashier\model\order\Cart\getOrderCartDetail")
     * @Apidoc\Returned("delivery",type="int", desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Returned("stayNum",type="int", desc="挂单数量")
     */
    public function list($delivery = 40, $order_id = 0)
    {
        $model = new CartModel();
        // 挂单数量
        $stayNum = (new OrderModel)->stayOrderNum();
        // 购物车 + 送厨商品列表 + 购物车计算
        $allProductInfo = $model->getOrderCartDetail($this->cashier['user'], 0, $order_id);
        return $this->renderSuccess('', compact('allProductInfo', 'delivery', 'stayNum', 'order_id'));
    }

    /**
     * @Apidoc\Title("商品改价")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/changePrice")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="购物车ID")
     * @Apidoc\Param("price", type="float", require=true, desc="价格")
     * @Apidoc\Returned()
     */
    public function changePrice($order_product_id, $price)
    {

        $model = new OrderProduct();
        if ($model->changePrice($order_product_id, $price)) {
            return $this->renderSuccess('改价成功');
        };
        return $this->renderError($model->getError() ?: '改价失败');
    }

    /**
     * @Apidoc\Title("删除商品")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delProduct")
     * @Apidoc\Param("order_product_id", type="int|array", require=true, desc="订单商品ID, 多个传数组: [1,2]")
     * @Apidoc\Returned()
     */
    public function delProduct($order_product_id)
    {
        $model = new OrderProduct();
        if ($model->delProduct($order_product_id)) {
            return $this->renderSuccess('删除成功');
        };
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("整单取消")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delStay")
     * @Apidoc\Param("order_id", type="int", require=false, desc="订单号")
     * @Apidoc\Returned()
     */
    public function delStay($order_id)
    {
        $model = new OrderModel();
        if ($model->delStay($order_id)) {
            return $this->renderSuccess('取消成功');
        };
        return $this->renderSuccess($model->getError() ?: '取消失败');
    }

    /**
     * @Apidoc\Title("挂单列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/stayList")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("productList",type="array",ref="app\cashier\model\order\Cart\getStayList")
     */
    public function stayList()
    {
        $model = new OrderModel();
        // 购物车商品列表
        $productList = $model->getStayList();
        return $this->renderSuccess('', compact('productList'));
    }

    /**
     * @Apidoc\Title("挂单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/stay")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Returned()
     */
    public function stay($order_id)
    {
        $model = new OrderModel();
        if ($model->stayOrder($order_id)) {
            return $this->renderSuccess('挂单成功');
        };
        return $this->renderError($model->getError() ?: '挂单失败');
    }

    /**
     * @Apidoc\Title("取单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/pick")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Returned()
     */
    public function pick($order_id)
    {
        $model = new OrderModel();
        if ($model->pickOrder($order_id)) {
            return $this->renderSuccess('取单成功');
        };
        return $this->renderError($model->getError() ?: '取单失败');
    }

    /**
     * @Apidoc\Title("折扣抹零")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.Cart/changeMoney")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单ID")
     * @Apidoc\Param("type", type="int", require=true, desc="折扣方式 1-订单改价 2-折扣 3-抹零")
     * @Apidoc\Param("money", type="float", require=false, desc="改价价格 （type-1 必填）")
     * @Apidoc\Param("rate", type="float", require=false, desc="折扣 （type-2 必填）")
     * @Apidoc\Param("discountType", type="int", require=false, desc="抹零类型 1-抹分 2-抹角 3-四舍五入到角 4-四舍五入到元 （type-3 必填）")
     * @Apidoc\Returned()
     */
    public function changeMoney()
    {
        $model = new OrderModel();
        if ($model->changeMoney($this->cashier['user'], $this->postData())) {
            return $this->renderSuccess('改价成功');
        };
        return $this->renderError($model->getError() ?: '改价失败');
    }

    /**
     * @Apidoc\Title("加减购物商品数量")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/sub")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单商品ID")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Returned()
     */
    public function sub($order_product_id)
    {
        $model = OrderProduct::detail($order_product_id);
        if ($model->sub($this->postData())) {
            (new OrderModel())->reloadPrice($model['order_id']);
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');

    }

    /**
     * @Apidoc\Title("清空购物车")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delete")
     * @Apidoc\Returned()
     */
    public function delete()
    {
        (new CartModel)->deleteAll($this->cashier['user']);
        return $this->renderSuccess('删除成功');
    }

    /**
     * @Apidoc\Title("备注")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/remark")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单商品ID")
     * @Apidoc\Param("remark", type="string", require=true, desc="备注")
     * @Apidoc\Returned()
     */
    public function remark($order_product_id, $remark)
    {
        $model = new OrderProduct();
        if ($model->updateKitchenRemark($order_product_id, $remark)) {
            return $this->renderSuccess('备注成功');
        }
        return $this->renderError($model->getError() ?: '备注失败');
    }

    /**
     * @Apidoc\Title("收银-送厨")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/sendKitchen")
     * @Apidoc\Param("delivery", type="int", require=true, desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Param("order_id", type="int", require=false, desc="订单id")
     * @Apidoc\Returned()
     */
    public function sendKitchen($order_id)
    {
        $model = new OrderProduct();
        if ($model->sendKitchen($order_id)) {
            return $this->renderSuccess('送厨成功');
        }
        return $this->renderError($model->getError() ?: '送厨失败', $model->getErrorData());
    }

    /**
     * @Apidoc\Title("收银-退菜")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/moveProduct")
     * @Apidoc\Param("order_id", type="int", require=true, desc="订单id")
     * @Apidoc\Param("order_product_id", type="int", require=true, desc="订单商品记录id")
     * @Apidoc\Param("num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("return_reason", type="string", require=true, desc="退菜原因")
     * @Apidoc\Returned()
     */
    public function moveProduct($order_id, $order_product_id, $num, $return_reason = '')
    {
        // 检查订单状态
        $detail = OrderModel::detail([
            ['order_id', '=', $order_id],
            ['order_status', '=', OrderStatusEnum::NORMAL]
        ]);
        if (!$detail) {
            return $this->renderError('当前状态不可操作');
        }
        if ($detail?->moveProduct($order_product_id, $num, $return_reason)) {
            return $this->renderSuccess('退菜成功');
        }
        return $this->renderError($detail?->getError() ?: '退菜失败');
    }
}