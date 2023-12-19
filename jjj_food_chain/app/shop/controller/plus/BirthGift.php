<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\plus\birthgift\BirthGift as BirthGiftModel;
use app\shop\model\plus\coupon\Coupon as CouponModel;

/**
 * 生日有礼控制器
 */
class BirthGift extends Controller
{
    /**
     *生日有礼
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $detail = BirthGiftModel::detail();
            $couponList = CouponModel::getTotalList();
            return $this->renderSuccess('', compact('detail', 'couponList'));
        }
        $model = new BirthGiftModel;
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

}