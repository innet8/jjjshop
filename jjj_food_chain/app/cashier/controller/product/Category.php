<?php

namespace app\cashier\controller\product;

use app\cashier\controller\Controller;
use app\cashier\model\product\Category as CategoryModel;

/**
 * 商品
 */
class Category extends Controller
{
    /**
     * 普通商品分类列表
     */
    /**
     * @Apidoc\Title("商品分类")
     * @Apidoc\Method("POST")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Category\getCashierALL")
     */
    public function index()
    {
        $model = new CategoryModel;
        $list = $model->getCashierALL(1, 0, $this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
