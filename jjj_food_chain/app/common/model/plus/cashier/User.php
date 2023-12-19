<?php

namespace app\common\model\plus\cashier;

use app\common\model\BaseModel;

/**
 * 收银员模型
 */
class User extends BaseModel
{
    protected $name = 'cashier_user';
    protected $pk = 'cashier_id';

    /**
     * 关联应用表
     */
    public function app()
    {
        return $this->belongsTo('app\\common\\model\\app\\App', 'app_id', 'app_id');
    }

    /**
     * 关联门店信息
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 验证账号是否重复
     */
    public static function checkExist($account)
    {
        return static::withoutGlobalScope()
            ->where('account', '=', $account)
            ->where('is_delete', '=', 0)
            ->value('cashier_id');
    }

    /**
     * 详情
     */
    public static function detail($where, $with = [])
    {
        !is_array($where) && $where = ['cashier_id' => (int)$where];
        return static::where(array_merge(['is_delete' => 0], $where))->with($with)->find();
    }

    /**
     * 保存登录状态
     */
    public function loginState($user)
    {
        $app = $user['app'];
        // 保存登录状态
        $session = array(
            'user' => [
                'cashier_id' => $user['cashier_id'],
                'user_name' => $user['user_name'],
                'account' => $user['account'],
                'mobile' => $user['mobile'],
                'shop_supplier_id' => $user['shop_supplier_id'],
                'name' => $user['supplier']['name'],
                'app_id' => $user['app_id'],
            ],
            'app' => $app->toArray(),
            'is_login' => true,
        );
    }
}