<?php

namespace app\cashier\controller\order;

use app\cashier\controller\Controller;
use app\cashier\model\order\Cart as CartModel;
use app\cashier\model\order\Order as OrderModel;

/**
 * 堂食购物车控制器
 */
class HallCart extends Controller
{
    /**
     * 当前购物车列表
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
     * 当前桌号订单
     */
    public function detail($table_id)
    {
        $model = new OrderModel();
        $detail = $model->getOrderInfo($table_id);
        $detail['product_num'] = isset($detail) ? count($detail['product']) : 0;
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 折扣抹零
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
     * 加入购物车
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
     * 加减购物商品数量
     * @param $cart_id
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
     * 取消订单
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