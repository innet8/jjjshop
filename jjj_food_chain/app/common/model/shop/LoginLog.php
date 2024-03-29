<?php

namespace app\common\model\shop;

use app\common\model\BaseModel;

/**
 * 登录日志模型
 */
class LoginLog extends BaseModel
{
    protected $name = 'shop_login_log';
    protected $pk = 'login_log_id';

    /**
     * 结果兼容多语言
     */
    public function getResultAttr($value)
    {
        return __($value);
    }

    /**
     * 新增登录日志
     */
    public static function add($username, $ip, $result, $app_id)
    {
        $model = new self();
        $model->save([
            'username' => $username,
            'ip' => $ip,
            'result' => $result,
            'app_id' => $app_id
        ]);
    }
}