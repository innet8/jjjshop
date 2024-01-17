<?php

namespace app\shop\controller\card;

use app\shop\controller\Controller;
use app\shop\model\user\Card as CardModel;
use app\shop\model\user\CardRecord as CardRecordModel;
use app\shop\model\plus\coupon\Coupon as CouponModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 会员卡
 * @Apidoc\Group("user")
 * @Apidoc\Sort(5)
 */
class Card extends Controller
{
    /**
     * @Apidoc\Title("会员卡列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/index")
     * @Apidoc\Param("card_name", type="string", require=false, default="", desc="会员卡名称")
     * @Apidoc\Param("status", type="int", require=false, default="", desc="会员卡状态 -1-全部 0-启用 1-禁用")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\Card\getList", desc="列表")
     */
    public function index()
    {
        $model = new CardModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("领取会员卡记录")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/record")
     * @Apidoc\Param("search", type="string", require=false, default="", desc="会员卡名称/昵称")
     * @Apidoc\Param("status", type="int", require=false, default="", desc="会员卡状态 -1-全部 0-启用 1-禁用")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\CardRecord\getList", desc="列表")
     */
    public function record()
    {
        $model = new CardRecordModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("会员卡删除记录")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/deleterecord")
     * @Apidoc\Param("card_name", type="string", require=false, default="", desc="会员卡名称")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\Card\getDeleteList", desc="列表")
     */
    public function deleterecord()
    {
        $model = new CardModel;
        $list = $model->getDeleteList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("发卡")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/put")
     * @Apidoc\Param("card_id", type="int", require=true, default="", desc="会员卡id")
     * @Apidoc\Param("user_ids", type="string", require=true, default="", desc="用户id，多个用逗号隔开")
     * @Apidoc\Returned()
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
     * @Apidoc\Title("撤销")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/cancel")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Returned()
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
     * @Apidoc\Title("延期")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/delay")
     * @Apidoc\Param("order_id", type="int", require=true, default="", desc="订单id")
     * @Apidoc\Returned()
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
     * @Apidoc\Title("添加会员卡")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/add")
     * @Apidoc\Param("params", type="array", require=true, default="", desc="会员卡信息", children={
     *  @Apidoc\Param("card_name", type="string", require=true, default="", desc="会员卡名称"),
     *  @Apidoc\Param("card_style", type="string", require=true, default="", desc="卡片样式"),
     *  @Apidoc\Param("sort", type="int", require=true, default="", desc="排序"),
     *  @Apidoc\Param("is_discount", type="int", require=true, default="", desc="会员权益 0-无折扣 1-会员折扣"),
     *  @Apidoc\Param("discount", type="float", require=true, default="", desc="折扣"),
     *  @Apidoc\Param("open_points", type="int", require=true, default="", desc="开卡赠送积分 0-否 1-是"),
     *  @Apidoc\Param("open_points_num", type="float", require=true, default="", desc="开卡赠送积分数"),
     *  @Apidoc\Param("open_coupon", type="int", require=true, default="", desc="开卡赠送优惠券 0-否 1-是"),
     *  @Apidoc\Param("open_coupons", type="array", require=true, default="", desc="每月赠送项目券"),
     *  @Apidoc\Param("expire", type="int", require=true, default="", desc="有效期(月)0永久有效"),
     *  @Apidoc\Param("money", type="int", require=true, default="", desc="价格"),
     *  @Apidoc\Param("status", type="int", require=true, default="", desc="状态 0-启用 1-关闭"),
     *  @Apidoc\Param("content", type="string", require=true, default="", desc="使用须知"),
     *  @Apidoc\Param("default_style", type="string", require=true, default="", desc="自定义背景"),
     *  @Apidoc\Param("is_default", type="int", require=true, default="", desc="是否默认 0-默认样式 1-自定义"),
     *  @Apidoc\Param("type_id", type="int", require=true, default="", desc="会员卡类型 10-次卡 20-期限卡"),
     *  @Apidoc\Param("month_points", type="int", require=true, default="", desc="每月赠送积分"),
     *  @Apidoc\Param("month_points_num", type="int", require=true, default="", desc="每月赠送积分数量"),
     *  @Apidoc\Param("month_coupon", type="int", require=true, default="", desc="每月赠送优惠券"),
     *  @Apidoc\Param("month_coupons", type="array", require=true, default="", desc="每月赠送优惠券id"),
     *  @Apidoc\Param("stock", type="int", require=true, default="", desc="库存"),
     *  @Apidoc\Param("sub_card", type="int", require=true, default="", desc="是否开启子卡 0-关闭 1-开启"),
     *  @Apidoc\Param("sub_num", type="int", require=true, default="", desc="子卡数量"),
     * })
     * @Apidoc\Returned()
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
     * @Apidoc\Title("编辑会员卡")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/edit")
     * @Apidoc\Param("card_id", type="int", require=true, default="", desc="会员卡id")
     * @Apidoc\Param("params", type="array", require=true, default="", desc="会员卡信息", children={
     *  @Apidoc\Param("card_name", type="string", require=true, default="", desc="会员卡名称"),
     *  @Apidoc\Param("card_style", type="string", require=true, default="", desc="卡片样式"),
     *  @Apidoc\Param("sort", type="int", require=true, default="", desc="排序"),
     *  @Apidoc\Param("is_discount", type="int", require=true, default="", desc="会员权益 0-无折扣 1-会员折扣"),
     *  @Apidoc\Param("discount", type="float", require=true, default="", desc="折扣"),
     *  @Apidoc\Param("open_points", type="int", require=true, default="", desc="开卡赠送积分 0-否 1-是"),
     *  @Apidoc\Param("open_points_num", type="float", require=true, default="", desc="开卡赠送积分数"),
     *  @Apidoc\Param("open_coupon", type="int", require=true, default="", desc="开卡赠送优惠券 0-否 1-是"),
     *  @Apidoc\Param("open_coupons", type="array", require=true, default="", desc="每月赠送项目券"),
     *  @Apidoc\Param("expire", type="int", require=true, default="", desc="有效期(月)0永久有效"),
     *  @Apidoc\Param("money", type="int", require=true, default="", desc="价格"),
     *  @Apidoc\Param("status", type="int", require=true, default="", desc="状态 0-启用 1-关闭"),
     *  @Apidoc\Param("content", type="string", require=true, default="", desc="使用须知"),
     *  @Apidoc\Param("default_style", type="string", require=true, default="", desc="自定义背景"),
     *  @Apidoc\Param("is_default", type="int", require=true, default="", desc="是否默认 0-默认样式 1-自定义"),
     *  @Apidoc\Param("type_id", type="int", require=true, default="", desc="会员卡类型 10-次卡 20-期限卡"),
     *  @Apidoc\Param("month_points", type="int", require=true, default="", desc="每月赠送积分"),
     *  @Apidoc\Param("month_points_num", type="int", require=true, default="", desc="每月赠送积分数量"),
     *  @Apidoc\Param("month_coupon", type="int", require=true, default="", desc="每月赠送优惠券"),
     *  @Apidoc\Param("month_coupons", type="array", require=true, default="", desc="每月赠送优惠券id"),
     *  @Apidoc\Param("stock", type="int", require=true, default="", desc="库存"),
     *  @Apidoc\Param("sub_card", type="int", require=true, default="", desc="是否开启子卡 0-关闭 1-开启"),
     *  @Apidoc\Param("sub_num", type="int", require=true, default="", desc="子卡数量"),
     * })
     * @Apidoc\Returned()
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
     * @Apidoc\Title("删除会员卡")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/delete")
     * @Apidoc\Param("card_id", type="int", require=true, default="", desc="会员卡id")
     * @Apidoc\Returned()
     */
    public function delete($card_id)
    {
        $model = CardModel::detail($card_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '已存在用户，删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

    /**
     * @Apidoc\Title("修改会员卡状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/card.card/setStatus")
     * @Apidoc\Param("card_id", type="int", require=true, default="", desc="会员卡id")
     * @Apidoc\Returned()
     */
    public function setStatus($card_id)
    {
        $info = CardModel::detail($card_id);
        if (!$info) {
            return $this->renderError('会员卡不存在');
        }
        if ($info->setStatus(!$info->status)) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($info->getError() ?: '修改失败');
    }
}