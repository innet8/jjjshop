<?php

namespace app\api\controller\order;

use app\api\controller\Controller;
use app\api\model\order\CashierCart as CashierCartModel;
use app\api\model\supplier\Supplier as SupplierModel;
use app\api\model\order\Order as OrderModel;
use app\api\model\store\Table as TableModel;
use app\api\model\settings\Setting as SettingModel;

/**
 * 扫码点餐购物车控制器
 */
class HallCart extends Controller
{
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        $this->user = $this->getUser();
    }

    /**
     * 当前桌号信息
     */
    public function tableDetail($table_id = 0, $shop_supplier_id = 0)
    {
        if (!$table_id || !$shop_supplier_id) {
            return $this->renderError('数据错误');
        }
        $detail = TableModel::detail($table_id);
        $supplier = SupplierModel::detail($shop_supplier_id);
        $store_name = SettingModel::getItem('store')['name'];
        return $this->renderSuccess('', compact('detail', 'supplier', 'store_name'));
    }

    /**
     * 当前桌号购物车列表
     */
    public function lists($table_id)
    {
        // 请求参数
        $param = $this->request->param();
        $model = new CashierCartModel();
        // 购物车商品列表
        $productList = $model->getList($param);
        //购物车金额
        $cartInfo = $model->getCartPrice($param);
        //桌号信息
        $detail = TableModel::detail($table_id);
        //订单信息
        $orderInfo = (new OrderModel())->getOrderInfo($table_id);
        return $this->renderSuccess('', compact('productList', 'cartInfo', 'detail', 'orderInfo'));
    }

    /**
     * 当前桌号订单
     */
    public function orderDetail($order_id)
    {
        $detail = OrderModel::detail($order_id);
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 加入购物车
     */
    public function add()
    {
        $data = $this->request->param();
        $data['eat_type'] = 10;
        $model = new CashierCartModel();
        if (!$model->add($data)) {
            return $this->renderError($model->getError() ?: '加入购物车失败');
        }
        //购物车金额
        $cartInfo = $model->getCartPrice($this->postData());
        return $this->renderSuccess('加入购物车成功', ['cartInfo' => $cartInfo]);
    }

    /**
     * 商品列表加减数量
     * @param $product_id
     */
    public function productSub($product_id, $table_id)
    {
        $model = new CashierCartModel();
        $model = $model::detail(['product_id' => $product_id, 'table_id' => $table_id]);
        if ($model && $model->sub($this->postData())) {
            //购物车金额
            $cartInfo = $model->getCartPrice($this->postData());
            return $this->renderSuccess('操作成功', ['cartInfo' => $cartInfo]);
        }
        return $this->renderError($model ? $model->getError() : '操作失败');

    }

    /**
     * 加减购物商品数量
     * @param $cart_id
     */
    public function sub($cart_id)
    {
        $model = CashierCartModel::detail($cart_id);
        if ($model && $model->sub($this->postData())) {
            //购物车金额
            $cartInfo = $model->getCartPrice($this->postData());
            return $this->renderSuccess('操作成功', ['cartInfo' => $cartInfo]);
        }
        return $this->renderError($model ? $model->getError() : '操作失败');

    }

    /**
     * 清空购物车
     * @return array
     */
    public function delete()
    {
        $model = new CashierCartModel();
        if ($model->deleteTableAll($this->postData())) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model ? $model->getError() : '删除失败');
    }
}