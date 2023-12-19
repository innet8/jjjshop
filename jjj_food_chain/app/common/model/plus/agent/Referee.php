<?php

namespace app\common\model\plus\agent;

use app\common\model\BaseModel;

/**
 * 分销商推荐关系模型
 */
class Referee extends BaseModel
{
    protected $name = 'agent_referee';
    protected $pk = 'id';

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User');
    }

    /**
     * 关联分销商用户表
     */
    public function agent()
    {
        return $this->belongsTo('app\\common\\model\\plus\\agent\\User')->where('is_delete', '=', 0);
    }

    /**
     * 关联分销商用户表
     */
    public function agent1()
    {
        return $this->belongsTo('app\\common\\model\\plus\\agent\\User', 'agent_id')->where('is_delete', '=', 0);
    }

    /**
     * 获取上级用户id
     */
    public static function getRefereeUserId($user_id, $level, $is_agent = false)
    {
        $agent_id = (new self)->where(compact('user_id', 'level'))
            ->value('agent_id');
        if (!$agent_id) return 0;
        return $is_agent ? (User::isAgentUser($agent_id) ? $agent_id : 0) : $agent_id;
    }

    /**
     * 获取我的团队列表
     */
    public function getList($user_id, $level = -1)
    {
        $model = $this;
        if($level > -1){
            $model = $model->where('referee.level', '=', $level);
        }
        return $model->with(['agent', 'user'])
            ->alias('referee')
            ->field('referee.*')
            ->join('user', 'user.user_id = referee.user_id','left')
            ->where('referee.agent_id', '=', $user_id)
            ->where('user.is_delete', '=', 0)
            ->order(['referee.create_time' => 'desc'])
            ->paginate(15);
    }

}