<?php

namespace app\cashier\controller\order;

use app\cashier\controller\Controller;
use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 购物车
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
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->postData();
        $data['eat_type'] = 20;
        $model = new CartModel();
        if (!$model->add($data, $this->cashier['user'])) {
            return $this->renderError($model->getError() ?: '加入购物车失败');
        }
        return $this->renderSuccess('加入购物车成功');
    }

    /**
     * @Apidoc\Title("购物车列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/list")
     * @Apidoc\Param("delivery", type="int", require=true, default="40", desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("productList",type="array",ref="app\cashier\model\order\Cart\getList")
     * @Apidoc\Returned("cartInfo",type="array",ref="app\cashier\model\order\Cart\getCartPrice")
     * @Apidoc\Returned("delivery",type="string", desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Returned("stayNum",type="int", desc="挂单数量")
     */
    public function list($delivery = 40)
    {
        $model = new CartModel();
        // 购物车商品列表
        $productList = $model->getList($this->cashier['user']);
        //购物车金额
        $cartInfo = $model->getCartPrice($this->cashier['user'], $delivery);
        //挂单数量
        $stayNum = $model->stayNum($this->cashier['user']);
        return $this->renderSuccess('', compact('productList', 'cartInfo', 'delivery', 'stayNum'));
    }

    /**
     * @Apidoc\Title("商品改价")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/changePrice")
     * @Apidoc\Param("cart_id", type="int", require=true, desc="购物车ID")
     * @Apidoc\Param("price", type="float", require=true, desc="价格")
     * @Apidoc\Returned()
     */
    public function changePrice($cart_id, $price)
    {
        $model = new CartModel();
        if ($model->changePrice($cart_id, $price, $this->cashier['user'])) {
            return $this->renderSuccess('改价成功');
        };
        return $this->renderError($model->getError() ?: '改价失败');
    }

    /**
     * @Apidoc\Title("删除商品")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delProduct")
     * @Apidoc\Param("cart_id", type="int", require=true, desc="购物车商品ID")
     * @Apidoc\Returned()
     */
    public function delProduct($cart_id)
    {
        $model = new CartModel();
        if ($model->delProduct($cart_id)) {
            return $this->renderSuccess('删除成功');
        };
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("整单取消")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delStay")
     * @Apidoc\Returned()
     */
    public function delStay()
    {
        $model = new CartModel();
        if ($model->delStay()) {
            return $this->renderSuccess('取消成功');
        };
        return $this->renderError($model->getError() ?: '取消失败');
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
        $model = new CartModel();
        // 购物车商品列表
        $productList = $model->getStayList($this->cashier['user']);
        return $this->renderSuccess('', compact('productList'));
    }

    /**
     * @Apidoc\Title("挂单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/stay")
     * @Apidoc\Returned()
     */
    public function stay()
    {
        $model = new CartModel();
        if ($model->stayCart($this->cashier['user'])) {
            return $this->renderSuccess('挂单成功');
        };
        return $this->renderError($model->getError() ?: '挂单失败');
    }

    /**
     * @Apidoc\Title("取单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/pick")
     * @Apidoc\Param("cart_no", type="string", require=true, desc="挂起单号")
     * @Apidoc\Returned()
     */
    public function pick($cart_no)
    {
        $model = new CartModel();
        if ($model->pickCart($cart_no, $this->cashier['user'])) {
            return $this->renderSuccess('取单成功');
        };
        return $this->renderError($model->getError() ?: '请先将购物车内的商品挂单或结账后再取单');
    }

    /**
     * @Apidoc\Title("删掉挂单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/delCart")
     * @Apidoc\Param("cart_no", type="string", require=true, desc="挂起单号")
     * @Apidoc\Returned()
     */
    public function delCart($cart_no)
    {
        $model = new CartModel();
        if ($model->delCart($cart_no)) {
            return $this->renderSuccess('删除成功');
        };
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("折扣抹零")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/changeMoney")
     * @Apidoc\Param("type", type="int", require=true, default="1", desc="折扣方式：1-改价 2-折扣 3-抹零")
     * @Apidoc\Param("money", type="float", require=false, desc="改价价格 （type-1 必填）")
     * @Apidoc\Param("rate", type="float", require=false, desc="折扣 （type-2 必填）")
     * @Apidoc\Param("discountType", type="int", require=false, desc="抹零类型 1-抹分 2-抹角 3-四舍五入到角 4-四舍五入到元 （type-3 必填）")
     * @Apidoc\Returned()
     */
    public function changeMoney()
    {
        $model = new CartModel();
        if ($model->changeMoney($this->cashier['user'], $this->postData())) {
            return $this->renderSuccess('成功');
        };
        return $this->renderError($model->getError() ?: '失败');
    }

    /**
     * @Apidoc\Title("加减购物商品数量")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/sub")
     * @Apidoc\Param("cart_id", type="int", require=true, desc="购物车商品ID")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("type", type="string", require=true, default="mid", desc="操作类型：mid-中间件操作，up-加，down-减")
     * @Apidoc\Returned()
     */
    public function sub($cart_id)
    {
        $model = CartModel::detail($cart_id);
        if ($model->sub($this->postData())) {
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
     * @Apidoc\Param("cart_id", type="int", require=true, desc="购物车商品ID")
     * @Apidoc\Param("remark", type="string", require=true, desc="备注")
     * @Apidoc\Returned()
     */
    public function remark($cart_id, $remark)
    {
        $model = new CartModel();
        if ($model->updateRemark($cart_id, $remark)) {
            return $this->renderSuccess('备注成功');
        }
        return $this->renderError($model->getError() ?: '备注失败');
    }

    /**
     * @Apidoc\Title("送厨")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/sendKitchen")
     * @Apidoc\Param("delivery", type="int", require=true, desc="消费方式：10-外卖配送 20-上门取 30-打包带走 40-店内就餐")
     * @Apidoc\Param("user_id", type="int", require=false, default="0", desc="用户id")
     * @Apidoc\Returned()
     */
    public function sendKitchen()
    {
        $params = $this->postData();
        $user = $this->cashier['user'];
        $model = new CartModel();
        if ($order_id = $model->sendKitchen($params, $user)) {
            // 返回订单商品记录
            $orderProductList = OrderModel::detail($order_id)['product'];
            return $this->renderSuccess('送厨成功', compact('orderProductList'));
        }
        return $this->renderError($model->getError() ?: '送厨失败');
    }
}