<?php

namespace app\shop\model\plus\cashier;

use app\common\model\plus\cashier\User as UserModel;

/**
 * 收银员模型
 */
class User extends UserModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * 获取列表数据
     */
    public function getList($params, $user)
    {
        $model = $this;
        $model = $model->where('shop_supplier_id', '=', $user['shop_supplier_id']);
        if (isset($params['search']) && $params['search']) {
            $model = $model->where('user_name|mobile|account', 'like', '%' . $params['search'] . '%');
        }
        // 查询列表数据
        return $model->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 添加
     */
    public function add($data, $shop_supplier_id)
    {
        // 开启事务
        $this->startTrans();
        try {
            $isExist = UserModel::checkExist($data['account']);
            if ($isExist > 0) {
                $this->error = '登录账号已存在';
                return false;
            }
            $add = [
                'user_name' => $data['user_name'],
                'mobile' => $data['mobile'],
                'account' => $data['account'],
                'password' => salt_hash($data['password']),
                'shop_supplier_id' => $shop_supplier_id,
                'app_id' => self::$app_id,
            ];
            $this->save($add);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        // 开启事务
        $this->startTrans();
        try {
            $isExist = $this->where('account', '=', $data['account'])
                ->where('cashier_id', '<>', $this['cashier_id'])
                ->count();
            if ($isExist > 0) {
                $this->error = '登录账号已存在';
                return false;
            }
            if ($data['password']) {
                $data['password'] = salt_hash($data['password']);
            } else {
                unset($data['password']);
            }
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }

    /**
     * 开启禁止
     */
    public function setStatus($status)
    {
        return $this->save(['status' => $status]);

    }

}