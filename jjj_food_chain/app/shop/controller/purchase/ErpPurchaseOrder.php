<?php

namespace app\shop\controller\purchase;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\shop\model\erp\ErpPurchaseOrder as ErpPurchaseOrderModel;

/**
 * 采购单
 * @Apidoc\Group("purchase")
 * @Apidoc\Sort(10)
 */
class ErpPurchaseOrder extends Controller
{
    /**
     * @Apidoc\Title("采购单列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpSupplier/list")
     * @Apidoc\Param("name", type="string", require=false, desc="采购单名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\erp\ErpSupplier\getList")
     */
    public function list()
    {
        $list = (new ErpPurchaseOrderModel)->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

     /**
     * @Apidoc\Title("采购单详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpSupplier/detail")
     * @Apidoc\Param("erp_supplier_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Returned("detail", type="object", ref="app\shop\model\erp\ErpSupplier\detail")
     */
    public function detail($erp_supplier_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($erp_supplier_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("添加采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpSupplier/add")
     * @Apidoc\Param("name", type="string", require=true, desc="采购单名称")
     * @Apidoc\Param("address", type="string", require=true, desc="采购单地址")
     * @Apidoc\Param("contact_person", type="string", require=true, desc="联系人")
     * @Apidoc\Param("contact_phone", type="string", require=true, desc="联系电话")
     * @Apidoc\Param("position", type="string", require=true, desc="职位")
     * @Apidoc\Param("purchaser_id", type="int", require=true, desc="采购员id")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->postData();
        $model = new ErpPurchaseOrderModel;
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        if ($model?->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model?->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpSupplier/edit")
     * @Apidoc\Param("erp_supplier_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Param("name", type="string", require=true, desc="采购单名称")
     * @Apidoc\Param("address", type="string", require=true, desc="采购单地址")
     * @Apidoc\Param("contact_person", type="string", require=true, desc="联系人")
     * @Apidoc\Param("contact_phone", type="string", require=true, desc="联系电话")
     * @Apidoc\Param("position", type="string", require=true, desc="职位")
     * @Apidoc\Param("purchaser_id", type="int", require=true, desc="采购员id")
     * @Apidoc\Returned()
     */
    public function edit($erp_supplier_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($erp_supplier_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($detail?->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpSupplier/delete")
     * @Apidoc\Param("erp_supplier_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Returned()
     */
    public function delete($erp_supplier_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($erp_supplier_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->del()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($detail?->getError() ?: '删除失败');
    }
}
