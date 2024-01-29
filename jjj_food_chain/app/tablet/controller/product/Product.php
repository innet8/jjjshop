<?php

namespace app\tablet\controller\product;

use app\tablet\model\product\Product as ProductModel;
use app\tablet\controller\Controller;
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
     * @Apidoc\Url ("/index.php/tablet/product.product/index")
     * @Apidoc\Param("category_id", type="int", require=true, desc="商品分类ID")
     * @Apidoc\Param("search", type="string", require=false, default="", desc="搜索关键字")
     * @Apidoc\Param("is_special", type="int", require=false, default="", desc="是否特色分类 0-否 1-是")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Product\list")
     */
    public function index()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->list(array_merge(['shop_supplier_id' => $this->table['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/product.product/detail")
     * @Apidoc\Param("product_id", type="int", require=false, default="0", desc="商品id")
     * @Apidoc\Returned("list",type="array",ref="app\common\model\product\Product\detail")
     */
    public function detail($product_id)
    {
        // 商品详情
        $detail = ProductModel::detail($product_id);
        return $this->renderSuccess('', $detail);
    }

}
