<?php

namespace app\cashier\model\cashier;

use app\common\model\shop\User as UserModel;
use app\common\model\shop\Access as AccessModel;
use think\facade\Env;

/**
 * 收银员登录模型
 */
class User extends UserModel
{
    /**
     *检查登录
     */
    public function checkLogin($user)
    {
        $where['user_name'] = $user['user_name'];
        $where['password'] = $user['password'];
        //
        $user = $this->where($where)->with(['app', 'supplier'])->find();
        if (!$user = $this->where($where)->with(['app', 'supplier'])->find()) {
            $this->error = '账号或密码错误';
            return false;
        }
        if ($user['is_delete'] == 1) {
            $this->error = '账号被删除，请联系管理员';
            return false;
        }
        if ($user['is_status'] == 1) {
            $this->error = '账号被禁用，请联系管理员';
            return false;
        }
        if (empty($user['app'])) {
            $this->error = '登录失败, 未找到应用信息';
            return false;
        }
        if ($user['app']['is_delete']) {
            $this->error = '登录失败, 当前应用已删除';
            return false;
        }
        // 验证权限
        $permission = (new AccessModel)->getPermission(AccessModel::CASHIER_ROUTE_NAME, $user, $user['supplier']);
        if (empty($permission)) {
            $this->error = '当前无权限，请联系管理员';
            return false;
        }
        // 检查是否有未交班的收银员
        $cashierUser = $this->where(['cashier_online' => 1])->find();
        if ($cashierUser && $cashierUser['shop_user_id'] != $user['shop_user_id']) {
            $this->error = __('收银员') . ' ' . $cashierUser['real_name'] . ' ' . __('未交班，请先交班');
            return false;
        }
        // 保存登录状态
        $user['token'] = signToken($user['shop_user_id'], 'cashier');
        // 更新收银员信息
        $userData = ['cashier_online' => 1];
        if ($user['cashier_login_time'] == 0) {
            $userData['cashier_login_time'] = time();
        }
        $user->save($userData);
        return $user;
    }


    /*
    * 修改密码
    */
    public function editPass($data, $user)
    {
        // uat
        if (Env::get('env') == 'uat'
            && request()->ip() != Env::get('uat_ip')
            && self::$app_id == 10001){
            $this->error = 'test账号不允许修改密码';
            return false;
        }
        $user_info = User::detail($user['cashier_id']);
        if (!$user_info) {
            $this->error = '用户不存在';
            return false;
        }
        if ($data['password'] != $data['confirmPass']) {
            $this->error = '新密码输入不一致';
            return false;
        }
        if ($user_info['password'] != salt_hash($data['oldpass'])) {
            $this->error = '原始密码错误';
            return false;
        }
        $date['password'] = salt_hash($data['password']);
        $user_info->save($date);
        return true;
    }

    /**
     * 获取用户信息
     */
    public static function getUser($data)
    {
        return (new static())->where(['shop_user_id' => $data['uid']])->with(['app'])->find();
    }

}