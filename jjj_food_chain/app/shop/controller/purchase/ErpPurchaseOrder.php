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
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/list")
     * @Apidoc\Param("name", type="string", require=false, desc="采购单名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\erp\ErpPurchaseOrder\getList")
     */
    public function list()
    {
        $list = (new ErpPurchaseOrderModel)->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

     /**
     * @Apidoc\Title("采购单详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/detail")
     * @Apidoc\Param("purchase_order_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Returned("detail", type="object", ref="app\shop\model\erp\ErpPurchaseOrder\detail")
     */
    public function detail($purchase_order_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($purchase_order_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("添加采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/add")
     * @Apidoc\Param("name", type="string", require=true, desc="采购单名称")
     * @Apidoc\Param("applicant_id", type="int", require=true, desc="申请人id")
     * @Apidoc\Param("arrival_time", type="string", require=true, desc="到货时间")
     * @Apidoc\Param("type", type="int", require=true, desc="采购方式 10-总部采购 20-自行采购")
     * @Apidoc\Param("purchase_detail", type="array", require=true, desc="采购单明细", children={
     *      @Apidoc\Returned("product_id", type="int", desc="商品id"),
     *      @Apidoc\Returned("estimate_purchase_price", type="decimal", desc="预计采购价格"),
     *      @Apidoc\Returned("estimate_purchase_num", type="int", desc="预计采购数量"),
     * })
     * @Apidoc\Param("remark", type="string", require=false, desc="备注")
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
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/edit")
     * @Apidoc\Param("purchase_order_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Param("name", type="string", require=true, desc="采购单名称")
     * @Apidoc\Param("applicant_id", type="int", require=true, desc="申请人id")
     * @Apidoc\Param("arrival_time", type="string", require=true, desc="到货时间")
     * @Apidoc\Param("type", type="int", require=true, desc="采购方式 10-总部采购 20-自行采购")
     * @Apidoc\Param("purchase_detail", type="array", require=true, desc="采购单明细", children={
     *      @Apidoc\Returned("product_id", type="int", desc="商品id"),
     *      @Apidoc\Returned("estimate_purchase_price", type="decimal", desc="预计采购价格"),
     *      @Apidoc\Returned("estimate_purchase_num", type="int", desc="预计采购数量"),
     * })
     * @Apidoc\Param("remark", type="string", require=false, desc="备注")
     * @Apidoc\Returned()
     */
    public function edit($purchase_order_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($purchase_order_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($detail?->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("调整采购单数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/adjust")
     * @Apidoc\Param("purchase_order_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Param("purchase_detail", type="array", require=true, desc="采购单明细", children={
     *      @Apidoc\Returned("purchase_detail_id", type="int", desc="明细id"),
     *      @Apidoc\Returned("actual_purchase_price", type="decimal", desc="预计采购价格"),
     *      @Apidoc\Returned("actual_purchase_num", type="int", desc="预计采购数量"),
     * })
     * @Apidoc\Returned()
     */
    public function adjust($purchase_order_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($purchase_order_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->adjust($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($detail?->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("操作采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/operate")
     * @Apidoc\Param("purchase_order_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Param("status", type="int", require=true, desc="操作状态 10-待审核 20-已驳回 30-采购中 40-已采购 50-已入库")
     * @Apidoc\Returned()
     */
    public function operate($purchase_order_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($purchase_order_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        $data = $this->postData();
        $data['shop_user_id'] = $this->store['user']['shop_user_id'];
        if ($detail?->operate($data)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($detail?->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("删除采购单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/purchase.ErpPurchaseOrder/delete")
     * @Apidoc\Param("purchase_order_id", type="int", require=true, desc="采购单id")
     * @Apidoc\Returned()
     */
    public function delete($purchase_order_id)
    {
        $detail = (new ErpPurchaseOrderModel)->detail($purchase_order_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->del()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($detail?->getError() ?: '删除失败');
    }
}
