<?php

namespace app\shop\controller;

use think\facade\Session;
use app\shop\model\shop\User;
use app\common\enum\settings\SettingEnum;
use app\shop\model\settings\Setting as SettingModel;

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
            $setting = SettingModel::getSupplierItem(SettingEnum::STORE, $userInfo['shop_supplier_id'] ?? 0, $userInfo['app']['app_id'] ?? 0);
            //当前系统版本
            $version = get_version();
            return $this->renderSuccess('登录成功', [
                'app_id' => $userInfo['app']['app_id'],
                'user_name' => $userInfo['user_name'],
                'token' => $userInfo['token'],
                'shop_name' => $setting['name'],
                'supplier_name' => $userInfo['supplier']['name'],
                'shop_supplier_id' => $userInfo['shop_supplier_id'],
                'user_type' => $userInfo['user_type'],
                'version' => $version,
                'logoUrl' => $setting['logoUrl'],
                'currency' => $userInfo['currency'],
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
        if ($model->editPass($this->postData(), $this->store['user'])) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }
}
