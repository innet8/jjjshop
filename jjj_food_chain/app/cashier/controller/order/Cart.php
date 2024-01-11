<?php

namespace app\cashier\controller\order;

use app\cashier\controller\Controller;
use app\cashier\model\order\Cart as CartModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 桌台模块-购物车
 */
class Cart extends Controller
{
    /**
     * 当前购物车列表
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
     * 整单取消
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
     * 挂单列表
     */
    public function stayList()
    {
        $model = new CartModel();
        // 购物车商品列表
        $productList = $model->getStayList($this->cashier['user']);
        return $this->renderSuccess('', compact('productList'));
    }

    /**
     * 挂单
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
     * 取单
     */
    public function pick($cart_no)
    {
        $model = new CartModel();
        if ($model->pickCart($cart_no, $this->cashier['user'])) {
            return $this->renderSuccess('取单成功');
        };
        return $this->renderError($model->getError() ?: '取单失败');
    }

    /**
     * 删掉挂单
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
     * 折扣抹零
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
     * 加入购物车
     * @param int $product_id 商品id
     * @param int $product_num 商品数量
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
     * 加减购物商品数量
     * @param $cart_id
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
     * 清空购物车
     */
    public function delete()
    {
        (new CartModel)->deleteAll($this->cashier['user']);
        return $this->renderSuccess('删除成功');
    }
}