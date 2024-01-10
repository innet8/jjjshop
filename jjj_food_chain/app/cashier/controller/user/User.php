<?php

namespace app\cashier\controller\user;

use app\cashier\controller\Controller;
use app\cashier\model\user\User as UserModel;

/**
 * 用户管理
 */
class User extends Controller
{
    /**
     * 会员信息 by mobile
     */
    public function index($mobile)
    {
        $detail = UserModel::detail(['mobile' => $mobile]);
        return $this->renderSuccess('', $detail);
    }

    /**
     * 会员详情
     */
    public function detail($user_id)
    {
        $detail = UserModel::detail($user_id);
        return $this->renderSuccess('', compact('detail'));
    }
}
