<?php

namespace app\shop\controller\inventory;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\product\ProductSku as ProductSkuModel;

/**
 * 库存管理
 * @Apidoc\Group("inventory")
 * @Apidoc\Sort(10)
 */
class ErpInventory extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/inventory.ErpInventory/list")
     * @Apidoc\Param("material_type", type="int", require=false, desc="商品类型 类型 10-成品 20-材料")
     * @Apidoc\Param("product_status", type="int", require=false, desc="商品状态 产品状态(10上架 20下架 )")
     * @Apidoc\Param("category_id", type="int", default=0, require=false, desc="分类id")
     * @Apidoc\Param("product_name", type="string", require=false, desc="商品名称")
     * @Apidoc\Param("stock_num", type="int", require=false, desc="库存数量")
     * @Apidoc\Param("sort", type="string", require=false, desc="库存排序 asc-升序 desc-降序")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\ProductSku\getSkuProductList", desc="库存列表",  children={
     *     @Apidoc\Returned("historical_purchase_num", type="int", desc="历史进货数"),
     *     @Apidoc\Returned("historical_loss_num", type="int", desc="历史报损数"),
     *     @Apidoc\Returned("product_sales", type="int", desc="历史销售数"),
     *  })
     * )
     */
    public function list()
    {
        $list = (new ProductSkuModel)->getSkuProductList($this->postData());
        $category = CategoryModel::getCacheTree(1, 0, $this->store);
        return $this->renderSuccess('', compact('list', 'category'));
    }
}
