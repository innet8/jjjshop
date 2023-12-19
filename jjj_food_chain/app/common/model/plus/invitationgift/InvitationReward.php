<?php

namespace app\common\model\plus\invitationgift;

use app\common\model\BaseModel;

/**
 * Class Invitation
 * 邀请有礼奖励模型
 * @package app\common\model\plus\invitationgift
 */
class InvitationReward extends BaseModel
{
    protected $name = 'invitation_reward';
    protected $pk = 'invitation_reward_id';

    /**
     * 评价详情
     */
    public static function detail($invitation_reward_id)
    {
        return (new static())->find($invitation_reward_id);
    }
}