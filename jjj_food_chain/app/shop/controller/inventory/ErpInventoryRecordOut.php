<?php

namespace app\shop\controller\inventory;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\shop\model\erp\ErpInventoryRecord as ErpInventoryRecordModel;

/**
 * 出库记录
 * @Apidoc\Group("inventory")
 * @Apidoc\Sort(20)
 */
class ErpInventoryRecordOut extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/inventory.ErpInventoryRecordOut/list")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\erp\ErpInventoryRecord\getList")
     */
    public function list()
    {
        $model = new ErpInventoryRecordModel;
        $list = $model->getList($this->postData(), $model::INVENTORY_TYPE_OUT);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("撤销")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/inventory.ErpInventoryRecordOut/cancel")
     * @Apidoc\Param("erp_inventory_id", type="int", require=true, desc="库存id")
     * @Apidoc\Returned()
     */
    public function cancel($erp_inventory_id)
    {
        $detail = (new ErpInventoryRecordModel)->detail($erp_inventory_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->cancel()) {
            return $this->renderSuccess('撤销成功');
        }
        return $this->renderError($detail?->getError() ?: '撤销失败');
    }

    /**
     * @Apidoc\Title("删除库存")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/inventory.ErpInventoryRecordOut/delete")
     * @Apidoc\Param("erp_inventory_id", type="int", require=true, desc="库存id")
     * @Apidoc\Returned()
     */
    public function delete($erp_inventory_id)
    {
        $detail = (new ErpInventoryRecordModel)->detail($erp_inventory_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        if ($detail?->del()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($detail?->getError() ?: '删除失败');
    }
}