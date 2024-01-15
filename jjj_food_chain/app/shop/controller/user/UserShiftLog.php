<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\auth\User as UserModel;
use app\common\model\shop\UserShiftLog as UserShiftLogModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 收银交班
 * @Apidoc\Group("statistics")
 * @Apidoc\Sort(7)
 */
class UserShiftLog extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.UserShiftLog/index")
     * @Apidoc\Param("user_name", type="string", require=true, default="", desc="收银员名称")
     * @Apidoc\Param("start_time", type="string", require=true, default="", desc="开始时间")
     * @Apidoc\Param("end_time", type="string", require=true, default="", desc="结束时间")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\common\model\shop\UserShiftLog\getList", desc="列表")
     * @Apidoc\Returned("cashierList", type="array", ref="app\shop\model\auth\User\getList", desc="收银员列表")
     */
    public function index()
    {
        $data = $this->postData();
        $model = new UserShiftLogModel;
        $list = $model->getList($this->postData());
        $model = new UserModel();
        $cashierList = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list', 'cashierList'));
    }
}
