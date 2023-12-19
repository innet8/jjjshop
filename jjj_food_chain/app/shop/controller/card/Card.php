<?php

namespace app\shop\controller\card;

use app\shop\controller\Controller;
use app\shop\model\user\Card as CardModel;
use app\shop\model\user\CardRecord as CardRecordModel;
use app\shop\model\plus\coupon\Coupon as CouponModel;

/**
 * 会员卡
 */
class Card extends Controller
{
    /**
     * 会员卡列表
     */
    public function index()
    {
        $model = new CardModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 领取会员卡记录
     */
    public function record()
    {
        $model = new CardRecordModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 会员卡删除记录
     */
    public function deleterecord()
    {
        $model = new CardModel;
        $list = $model->getDeleteList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 发卡
     */
    public function put()
    {
        $model = new CardModel;
        if ($model->put($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 撤销
     */
    public function cancel()
    {
        $model = new CardModel;
        if ($model->cancel($this->postData())) {
            return $this->renderSuccess('撤销成功');
        }
        return $this->renderError($model->getError() ?: '撤销失败');
    }

    /**
     * 延期
     */
    public function delay($order_id)
    {
        $model = CardRecordModel::detail($order_id);
        if ($model->delay($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 添加会员卡
     */
    public function add()
    {
        $model = new CardModel;
        // get请求
        if ($this->request->isGet()) {
            //优惠券
            $couponList = CouponModel::getAllLists();
            //卡片样式
            $image = $model::getImage();
            return $this->renderSuccess('', compact('couponList', 'image'));
        }
        // 新增记录
        if ($model->add($this->postData()['params'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 编辑会员卡
     */
    public function edit($card_id)
    {
        $model = CardModel::detail($card_id);
        // get请求
        if ($this->request->isGet()) {
            //优惠券
            $couponList = CouponModel::getAllLists();
            //卡片样式
            $image = $model::getImage();
            return $this->renderSuccess('', compact('couponList', 'model', 'image'));
        }
        // 修改记录
        if ($model->edit($this->postData()['params'])) {
            return $this->renderSuccess();
        }
        return $this->renderError();
    }

    /**
     * 删除会员卡
     */
    public function delete($card_id)
    {
        // 会员卡详情
        $model = CardModel::detail($card_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '已存在用户，删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}