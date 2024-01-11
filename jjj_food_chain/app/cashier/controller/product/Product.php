<?php

namespace app\cashier\controller\product;

use app\cashier\model\product\Product as ProductModel;
use app\cashier\controller\Controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 收银模块-商品管理
 */
class Product extends Controller
{
    /**
     * @Apidoc\Title("商品列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.product/index")
     * @Apidoc\Param("category_id", type="int", require=false, default="0", desc="分类id")
     * @Apidoc\Param("search", type="string", require=false, default="", desc="搜索关键字")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list",type="array",ref="app\cashier\model\product\Product\list")
     */
    public function index()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->list(array_merge(['shop_supplier_id' => $this->cashier['user']['shop_supplier_id']], $this->postData()));
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("商品详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/product.product/detail")
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
