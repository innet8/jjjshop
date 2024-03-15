<?php

namespace app\shop\controller\store;

use app\shop\controller\Controller;
use app\shop\model\order\Order as OrderModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 订单操作
 * @Apidoc\Group("order")
 * @Apidoc\Sort(4)
 */
class Operate extends Controller
{
    /**
     * @Apidoc\Title("订单导出")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.operate/export")
     * @Apidoc\Param("order_no", type="string", require=false, default="", desc="订单号")
     * @Apidoc\Param("style_id", type="int", require=false, default="", desc="配送方式")
     * @Apidoc\Param("date", type="array", require=false, default="", desc="起始日期")
     * @Apidoc\Param("dataType", type="string", require=false, default="all", desc="订单类型 all-全部 payment-待付款 process-进行中 complete-已完成 cancel-已取消")
     * @Apidoc\Returned()
     */
    public function export($dataType)
    {
        $model = new OrderModel();
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        $data['order_type'] = 1;
        if ($exportList = $model->exportList($dataType, $data)) {
            if (($data['request_type'] ?? '') == 1) {
                return $this->renderSuccess('操作成功');
            }
            return $exportList;
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("取消订单")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.operate/orderCancel")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Param("cancel_remark", type="string", require=false, default="", desc="取消原因")
     * @Apidoc\Returned()
     */
    public function orderCancel($order_id)
    {
        $data = $this->postData();
        if ( strlen($data['cancel_remark'] ?? '') > 100 ) {
            return $this->renderError('备注最长200个字符');
        }
        // 订单信息
        $model = OrderModel::detail($order_id);
        if ($model->orderCancel($data)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("门店核销")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.operate/extract")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Returned()
     */
    public function extract($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->verificationOrder()) {
            return $this->renderSuccess('核销成功');
        }
        return $this->renderError($model->getError() ?: '核销失败');
    }

    /**
     * @Apidoc\Title("退款")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.operate/refund")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Param("refund_money", type="float", require=true, default="", desc="退款金额")
     * @Apidoc\Returned()
     */
    public function refund($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->refund($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/store.operate/delete")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Returned()
     */
    public function delete($order_id)
    {
        $model = OrderModel::detail($order_id);
        if (!$model) {
            return $this->renderError('订单不存在');
        }
        if ($model->orderDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }
}