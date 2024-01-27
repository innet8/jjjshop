<?php

namespace app\shop\model\plus\driver;

use app\common\model\plus\driver\User as UserModel;

/**
 * 配送员用户模型
 * Class User
 * @package app\shop\model\plus\agent
 */
class User extends UserModel
{
    /**
     * 获取配送员用户列表
     */
    public function getList($search, $limit = 15)
    {
        // 构建查询规则
        $model = $this->alias('driver')
            ->with(['user'])
            ->field('driver.*, user.nickName')
            ->join('user', 'user.user_id = driver.user_id')
            ->where('driver.is_delete', '=', 0)
            ->order(['driver.create_time' => 'desc']);
        // 查询条件
        if (!empty($search)) {
            $model = $model->like('user.nickName|driver.real_name|driver.mobile', $search);
        }
        // 获取列表数据
        $list = $model->paginate($limit, false, [
            'query' => \request()->request()
        ]);
        return $list;
    }

    /**
     * 编辑配送员用户
     * @param $data
     * @return bool
     */
    public function edit($data)
    {
        $isExist = $this->where('mobile', '=', $data['mobile'])
            ->where('user_id', '<>', $this['user_id'])
            ->count();
        if ($isExist) {
            $this->error = "手机号已存在";
            return false;
        }
        return $this->save($data) !== false;
    }

    /**
     * 删除配送员用户
     * @return mixed
     */
    public function setDelete()
    {
        return $this->save([
            'is_delete' => 1
        ]);
    }

    /**
     * 提现打款成功：累积提现佣金
     */
    public static function totalMoney($user_id, $money)
    {
        $model = self::detail($user_id);
        return $model->save([
            'freeze_money' => $model['freeze_money'] - $money,
            'total_money' => $model['total_money'] + $money,
        ]);
    }

    /**
     * 提现驳回：解冻配送员资金
     */
    public static function backFreezeMoney($user_id, $money)
    {
        $model = self::detail($user_id);
        return $model->save([
            'money' => $model['money'] + $money,
            'freeze_money' => $model['freeze_money'] - $money,
        ]);
    }

}