<?php

namespace app\kitchen\controller\product;

use app\kitchen\controller\Controller;
use app\kitchen\model\product\Category as CategoryModel;
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
     * @Apidoc\Url ("/index.php/kitchen/product.category/list")
     * @Apidoc\Returned("list",type="array",ref="app\kitchen\model\product\Category\getCashierALL")
     */
    public function list()
    {
        $model = new CategoryModel;
        $list = $model->getCashierALL(1, 0, $this->kitchen['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
