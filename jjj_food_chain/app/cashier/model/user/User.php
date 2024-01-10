<?php

namespace app\cashier\model\user;

use app\common\model\user\User as UserModel;

/**
 * 用户模型
 */
class User extends UserModel
{

    /**
     * 获取用户列表
     */
    public static function getUserList($mobile)
    {
        $model = new static();
        if ($mobile) {
            $model = $model->where('mobile', '=', $mobile);
        }else{
            return [];
        }
        // 获取用户列表
        return $model->with(['address', 'addressDefault', 'grade'])
            ->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->hidden(['open_id', 'union_id'])
            ->select();
    }
}
