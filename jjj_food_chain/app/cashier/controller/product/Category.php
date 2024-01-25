<?php

namespace app\cashier\controller\product;

use app\cashier\controller\Controller;
use app\cashier\model\product\Category as CategoryModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 商品分类
 * @Apidoc\Group("product")
 */
class Category extends Controller
{
    /**
     * @Apidoc\Title("列表(包含特色分类)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.category/index")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Category\getCashierALL")
     */
    public function index()
    {
        $model = new CategoryModel;
        $list = $model->getCashierALL(1, $this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
