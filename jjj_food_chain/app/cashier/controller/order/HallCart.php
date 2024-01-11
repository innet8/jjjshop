<?php

namespace app\cashier\controller\order;

use app\cashier\controller\Controller;
use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 桌台购物车
 * @Apidoc\Group("order")
 * @Apidoc\Sort(3)
 */
class HallCart extends Controller
{
    /**
     * @Apidoc\Title("当前商品列表")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.HallCart/list")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Cart\getList")
     */
    public function list($table_id)
    {
        $model = new CartModel();
        // 购物车商品列表
        $productList = $model->getList($this->cashier['user'], 10, $table_id);
        //购物车金额
        $cartInfo = $model->getCartPrice($this->cashier['user'], 40, 10, $table_id);
        return $this->renderSuccess('', compact('productList', 'cartInfo'));
    }

    /**
     * @Apidoc\Title("当前桌台订单")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.HallCart/detail")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Order\getOrderInfo")
     */
    public function detail($table_id)
    {
        $model = new OrderModel();
        $detail = $model->getOrderInfo($table_id);
        $detail['product_num'] = isset($detail) ? count($detail['product']) : 0;
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("折扣抹零")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.HallCart/changeMoney")
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
     * @Apidoc\Title("添加商品")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/add")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品ID")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("product_sku_id", type="int", require=true, desc="商品SKU ID")
     * @Apidoc\Param("attr", type="int", require=false, desc="商品属性，如果有必填")
     * @Apidoc\Param("feed", type="string", require=false, desc="加料")
     * @Apidoc\Param("describe", type="string", require=false, desc="描述，拼接商品的规格，属性加料。如：小份;蒜蓉;番茄,茄子;")
     * @Apidoc\Param("price", type="float", require=true, desc="实收商品价格")
     * @Apidoc\Param("product_price", type="float", require=true, desc="商品价格")
     * @Apidoc\Param("bag_price", type="float", require=true, desc="打包费")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->request->param();
        $data['eat_type'] = 10;
        $model = new CartModel();
        if (!$model->add($data, $this->cashier['user'])) {
            return $this->renderError($model->getError() ?: '加入购物车失败');
        }
        return $this->renderSuccess('加入购物车成功');
    }

    /**
     * @Apidoc\Title("修改商品数量")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.cart/sub")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("cart_id", type="int", require=true, desc="桌台购物车ID")
     * @Apidoc\Returned()
     */
    public function sub($cart_id)
    {
        $model = CartModel::detail($cart_id);
        if ($model && $model->sub($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model ? $model->getError() : '操作失败');
    }

    /**
     * @Apidoc\Title("桌台清台")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/cashier/order.HallCart/cancel")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Returned()
     */
    public function cancel($table_id)
    {
        $model = new OrderModel;
        if ($model->cancel($table_id)) {
            return $this->renderSuccess('订单取消成功');
        }
        return $this->renderError($model->getError() ?: '订单取消失败');
    }

    /**
     * 清空购物车
     * @return array
     */
    public function delete($table_id)
    {
        (new CartModel)->deleteTableAll($this->cashier['user'], $table_id);
        return $this->renderSuccess('删除成功');
    }
}