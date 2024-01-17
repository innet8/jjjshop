<?php

namespace app\tablet\controller\order;

use app\tablet\model\order\Cart as CartModel;
use app\tablet\model\order\Order as OrderModel;
use app\common\model\order\Order as CommonOrderModel;
use app\tablet\controller\Controller;
use app\common\service\order\OrderPrinterService;
use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;
/**
 * 点餐
 * @Apidoc\Group("order")
 * @Apidoc\Sort(1)
 */
class Order extends Controller
{
    /**
     * @Apidoc\Title("桌台订单(已下单商品)")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/tablet/order.Order/detail")
     * @Apidoc\Param("table_id", type="int", require=true, desc="桌台ID")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Order\getOrderInfo")
     */
    public function detail()
    {
        $model = new OrderModel();
        $detail = $model->getOrderInfo($this->table['table_id']);
        $detail['product_num'] = isset($detail) ? count($detail['product']) : 0;
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("桌台购物车(未下单商品)")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/tablet/order.Order/list")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\order\Cart\getList")
     */
    public function list()
    {
        $cartInfo = (new CartModel())->getCartDetail($this->table['shop_supplier_id'], $this->table['table_id']);
        return $this->renderSuccess('', compact('cartInfo'));
    }

    /**
     * @Apidoc\Title("修改商品数量")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/tablet/order.Order/sub")
     * @Apidoc\Param("product_num", type="int", require=true, desc="商品数量")
     * @Apidoc\Param("cart_id", type="int", require=true, desc="桌台购物车ID")
     * @Apidoc\Returned()
     */
    public function sub($cart_id)
    {
        $model = CartModel::detail($cart_id);
        if ($model && $model->sub($this->postData())) {
            $model->reloadPrice($this->cashier['user'], $model['table_id']);
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model ? $model->getError() : '操作失败');
    }

    /**
     * @Apidoc\Title("添加商品")
     * @Apidoc\Method("POST")
     * @Apidoc\Url ("/index.php/tablet/order.Order/add")
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
        // 更新购物车价格统计
        $model->reloadPrice($this->cashier['user'], $data['table_id']);
        return $this->renderSuccess('加入购物车成功');
    }
}