<?php

namespace app\cashier\controller;

use app\cashier\model\cashier\User;
use hg\apidoc\annotation as Apidoc;
/**
 * 收银机-收银员相关
 */
class Passport extends Controller
{
    /**
     * @Apidoc\Title("登录")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/passport/login")
     * @Apidoc\Param("user_name", type="string", require=true, default="001", desc="用户名")
     * @Apidoc\Param("password", type="string", require=true, default="123456", desc="密码")
     * @Apidoc\Returned()
     */
    public function login()
    {
        $user = $this->postData();
        $user['password'] = salt_hash($user['password']);
        $model = new User();
        if ($userInfo = $model->checkLogin($user)) {
            return $this->renderSuccess('登录成功', [
                'cashier_id' => $userInfo['shop_user_id'],
                'user_name' => $userInfo['user_name'],
                'account' => $userInfo['user_name'],
                'mobile' => $userInfo['mobile'],
                'shop_supplier_id' => $userInfo['shop_supplier_id'],
                'name' => $userInfo['supplier']['name'],
                'app_id' => $userInfo['app_id'],
                'token' => $userInfo['token']
            ]);
        }
        return $this->renderError($model->getError() ?: '登录失败');
    }

    /**
     * @Apidoc\Title("退出登录")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/passport/logout")
     * @Apidoc\Returned()
     */
    public function logout()
    {
        return $this->renderSuccess('退出成功');
    }

    /**
     * @Apidoc\Title("修改密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/passport/editPass")
     * @Apidoc\Param("password", type="string", require=true, default="123456", desc="密码")
     * @Apidoc\Returned()
     */
    public function editPass()
    {
        $model = new User();
        if ($model->editPass($this->postData(), $this->cashier['user'])) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }
}
