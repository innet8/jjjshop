<?php

namespace app\common\model\plus\invitationgift;

use app\common\model\BaseModel;

/**
 * Class Partake
 * 参与记录模型
 * @package app\common\model\plus\invitationgift
 */
class Partake extends BaseModel
{
    protected $name = 'invitation_partake';
    protected $pk = 'invitation_partake_id';

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->hasOne('app\\common\\model\\user\\User', 'user_id', 'user_id')->field('user_id,nickName');
    }

    public function partake()
    {
        return $this->hasOne('app\\common\\model\\user\\User', 'user_id', 'partake_id')->field('user_id,nickName');
    }

    /**
     *关联奖励表
     */
    public function reward()
    {
        return $this->hasOne('app\\common\\model\\plus\\invitationgift\\InvitationReward', 'invitation_reward_id', 'invitation_reward_id');
    }
}