<?php

namespace app\shop\controller\inventory;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\shop\model\product\Product as ProductModel;

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
     * @Apidoc\Param("name", type="string", require=false, desc="库存名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Product\getInventoryList", desc="库存列表")
     */
    public function list()
    {
        $list = (new ProductModel)->getInventoryList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}
