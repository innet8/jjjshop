<?php

namespace app\common\model\plus\agent;

use app\common\model\BaseModel;

/**
 * 分销商用户模型
 */
class User extends BaseModel
{
    protected $name = 'agent_user';
    protected $pk = 'user_id';

    /**
     * 关联会员记录表
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User');
    }

    /**
     * 关联推荐人表
     * @return \think\model\relation\BelongsTo
     */
    public function referee()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'referee_id', 'user_id');
    }

    /**
     * 详情
     */
    public static function detail($user_id, $with = ['user', 'referee'])
    {
        return (new static())->with($with)->find($user_id);
    }

    /**
     * 是否为分销商
     * @param $user_id
     * @return bool
     */
    public static function isAgentUser($user_id)
    {
        $agent = self::detail($user_id);
        return !!$agent && !$agent['is_delete'];
    }

    /**
     * 新增分销商用户记录
     * @param $user_id
     * @param $data
     * @return bool
     */
    public static function add($user_id, $data)
    {
        $model = static::detail($user_id) ?: new static;
        return $model->save(array_merge([
            'user_id' => $user_id,
            'is_delete' => 0,
            'app_id' => $model::$app_id
        ], $data));
    }

    /**
     * 发放分销商佣金
     * @param $user_id
     * @param $money
     * @return bool
     */
    public static function grantMoney($user_id, $money)
    {
        // 分销商详情
        $model = static::detail($user_id);
        if (!$model || $model['is_delete']) {
            return false;
        }
        // 累积分销商可提现佣金
        $model->where('user_id', '=', $user_id)->inc('money', $money)->update();
        // 记录分销商资金明细
        Capital::add([
            'user_id' => $user_id,
            'flow_type' => 10,
            'money' => $money,
            'describe' => '订单佣金结算',
            'app_id' => $model['app_id'],
        ]);
        return true;
    }

}