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
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.category/index")
     * @Apidoc\Param("is_spec", type="int", require=false, default="", desc="是否特色分类 0-否 1-是")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Category\getCashierALL")
     */
    public function index()
    {
        $model = new CategoryModel;
        $list = $model->getCashierALL(1, $this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
