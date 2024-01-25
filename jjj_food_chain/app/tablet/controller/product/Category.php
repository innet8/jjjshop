<?php

namespace app\tablet\controller\product;

use app\tablet\controller\Controller;
use app\tablet\model\product\Category as CategoryModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 分类
 * @Apidoc\Group("product")
 */
class Category extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/product.category/index")
     * @Apidoc\Returned("list",type="array",ref="app\tablet\model\product\Category\getCashierALL")
     */
    public function index()
    {
        $model = new CategoryModel;
        $list = $model->getCashierALL(1, $this->table['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
