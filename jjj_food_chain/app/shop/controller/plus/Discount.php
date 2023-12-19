<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\plus\discount\Discount as DiscountModel;
use app\shop\model\plus\discount\DiscountProduct as DiscountProductModel;
use app\common\library\helper;

/**
 * 第二件折扣控制器
 */
class Discount extends Controller
{
    /**
     *第二件折扣
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $detail = DiscountModel::detail($this->store['user']['shop_supplier_id']);
            $productIds = [];
            if ($detail) {
                $detail['time'] = [
                    date('Y-m-d H:i:s', $detail['start_time']),
                    date('Y-m-d H:i:s', $detail['end_time']),
                ];
                $detail['store_product'] = DiscountProductModel::getProduct($detail['discount_id'], 1);
                $detail['takeout_product'] = DiscountProductModel::getProduct($detail['discount_id'], 0);
                $storeIds = helper::getArrayColumn($detail['store_product'], 'product_id');
                $takeIds = helper::getArrayColumn($detail['takeout_product'], 'product_id');
                $productIds = array_merge($storeIds, $takeIds);
            }
            return $this->renderSuccess('', compact('detail', 'productIds'));
        }
        $model = new DiscountModel;
        if ($model->edit($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

}