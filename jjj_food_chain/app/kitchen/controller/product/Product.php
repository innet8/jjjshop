<?php

namespace app\kitchen\controller\product;

use app\kitchen\model\product\Product as ProductModel;
use app\kitchen\controller\Controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 商品
 * @Apidoc\Group("product")
 */
class Product extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/product.product/list")
     * @Apidoc\Param("category_id", type="int", require=true, desc="顶级商品分类id")
     * @Apidoc\Param("shop_supplier_id", type="int", require=true, default="0", desc="门店id")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Product\list")
     */
    public function list($shop_supplier_id)
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->list(array_merge(['shop_supplier_id' => $shop_supplier_id], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }
}
