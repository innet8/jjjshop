<?php

namespace app\kitchen\controller\order;

use app\kitchen\controller\Controller;
use app\kitchen\model\order\Category as CategoryModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 分类
 * @Apidoc\Group("order")
 */
class Category extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/order.category/list")
     * @Apidoc\Returned("list",type="array",ref="app\kitchen\model\order\Category\getKitchenCategory")
     */
    public function list()
    {
        $model = new CategoryModel;
        $list = $model->getKitchenCategory(1, 0, $this->kitchen['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }
}
