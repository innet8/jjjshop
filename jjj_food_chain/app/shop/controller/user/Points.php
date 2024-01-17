<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\shop\model\user\PointsLog as PointsLogModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 积分设置
 * @Apidoc\Group("user")
 * @Apidoc\Sort(5)
 */
class Points extends Controller
{
    /**
     * @Apidoc\Title("积分设置")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.points/setting")
     * @Apidoc\Param("points_name", type="string", require=true, default="", desc="积分名称")
     * @Apidoc\Param("is_shopping_gift", type="int", require=true, default="", desc="是否开启购物送积分 0-关闭 1-开启")
     * @Apidoc\Param("gift_ratio", type="int", require=true, default="", desc="积分赠送比例")
     * @Apidoc\Param("is_shopping_discount", type="int", require=true, default="", desc="是否允许下单使用积分抵扣 0-关闭 1-开启")
     * @Apidoc\Param("discount", type="array", require=true, default="", desc="充值参数", children={
     *    @Apidoc\Param("discount_ratio", type="float", require=true, default="", desc="积分抵扣比例"),
     *    @Apidoc\Param("max_money_ratio", type="float", require=true, default="", desc="最高可抵扣订单额百分比"),
     *    @Apidoc\Param("full_order_price", type="float", require=true, default="", desc="订单满[?]元"),
     * })
     * @Apidoc\Param("describe", type="string", require=true, default="", desc="积分说明")
     * @Apidoc\Returned()
     */
    public function setting()
    {
        if ($this->request->isGet()) {
            $values = SettingModel::getItem('points');
            return $this->renderSuccess('', compact('values'));
        }
        $model = new SettingModel;
        if ($model->edit('points', $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("积分明细")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.points/log")
     * @Apidoc\Param("search", type="string", require=false, default="", desc="搜索关键字")
     * @Apidoc\Param("date", type="array", require=false, desc="起始日期")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\PointsLog\getList", desc="列表")
     */
    public function log()
    {
        $model = new PointsLogModel;
        $list = $model->getList($this->request->param());
        return $this->renderSuccess('', compact('list'));
    }
}