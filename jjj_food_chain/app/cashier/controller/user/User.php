<?php

namespace app\cashier\controller\user;

use app\cashier\controller\Controller;
use app\cashier\model\user\User as UserModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 会员相关
 * @Apidoc\Group("base")
 * @Apidoc\Sort(3)
 */
class User extends Controller
{
    /**
     * @Apidoc\Title("查找会员")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/index")
     * @Apidoc\Param("mobile", type="string", require=true, default="", desc="用户手机号")
     * @Apidoc\Returned()
     */
    public function index($mobile)
    {
        $list = UserModel::getUserList($mobile);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("会员详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/detail")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户id")
     * @Apidoc\Returned()
     */
    public function detail($user_id)
    {
        $detail = UserModel::detail($user_id);
        return $this->renderSuccess('', $detail);
    }
}
