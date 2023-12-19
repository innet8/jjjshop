<?php

namespace app\cashier\controller\product;

use app\cashier\model\product\Product as ProductModel;
use app\cashier\controller\Controller;

/**
 * 商品管理控制器
 */
class Product extends Controller
{
    /**
     * 商品列表(全部)
     */
    public function index()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->list(array_merge(['shop_supplier_id' => $this->cashier['user']['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 获取商品详情
     */
    public function detail($product_id)
    {
        // 商品详情
        $detail = ProductModel::detail($product_id);
        return $this->renderSuccess('', compact('detail'));
    }

}
