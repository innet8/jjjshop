<?php

namespace app\shop\model\auth;

use app\common\model\shop\UserRole as UserRoleModel;


/**
 * 角色模型
 */
class UserRole extends UserRoleModel
{

    public function getUserRole($where)
    {
        return $this->where($where)->column('role_id');

    }

    /**
     * 获取角色下的用户
     */
    public static  function getUserRoleCount($role_id){
        $model = new static();
        return $model->alias('userRole')
            ->join('shop_user', 'userRole.shop_user_id = shop_user.shop_user_id', 'left')
            ->where('userRole.role_id', '=', $role_id)
            ->where('shop_user.is_delete', '=', 0)
            ->count();
    }
}
