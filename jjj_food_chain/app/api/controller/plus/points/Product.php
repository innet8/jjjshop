<?php

namespace app\api\controller\plus\points;

use app\api\model\plus\points\Product as ProductModel;
use app\api\controller\Controller;
use app\api\model\settings\Setting as SettingModel;

/**
 * 商品分类控制器
 */
class Product extends Controller
{
    /**
     * 商品列表
     */
    public function index()
    {
        $list = (new ProductModel)->getProductList($this->postData());
        //积分名称
        $points_name = SettingModel::getPointsName();
        return $this->renderSuccess('', compact('list', 'points_name'));
    }

    /**
     * 商品详情
     */
    public function detail($product_id)
    {
        $detail = ProductModel::detail($product_id);
        return $this->renderSuccess('', compact('detail'));
    }

}