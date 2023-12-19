<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\plus\newgift\NewGift as NewGiftModel;
use app\shop\model\plus\coupon\Coupon as CouponModel;

/**
 * 满额包邮控制器
 */
class Newgift extends Controller
{
    /**
     *满额包邮
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $detail = NewGiftModel::detail($this->store['user']['shop_supplier_id']);
            if ($detail) {
                $detail['time'] = [
                    date('Y-m-d H:i:s', $detail['start_time']),
                    date('Y-m-d H:i:s', $detail['end_time']),
                ];
            }
            $list = (new CouponModel)->getAllList($this->store['user']);
            return $this->renderSuccess('', compact('detail', 'list'));
        }
        $model = new NewGiftModel;
        if ($model->edit($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

}