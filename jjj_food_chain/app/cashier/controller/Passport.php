<?php

namespace app\cashier\controller;

use app\cashier\model\cashier\User;

/**
 * 商户认证
 */
class Passport extends Controller
{
    /**
     * 商户后台登录
     */
    public function login()
    {
        $user = $this->postData();
        $user['password'] = salt_hash($user['password']);
        $model = new User();
        if ($userInfo = $model->checkLogin($user)) {
            return $this->renderSuccess('登录成功', [
                'cashier_id' => $userInfo['cashier_id'],
                'user_name' => $userInfo['user_name'],
                'account' => $userInfo['account'],
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
     * 退出登录
     */
    public function logout()
    {
        return $this->renderSuccess('退出成功');
    }

    /*
   * 修改密码
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
