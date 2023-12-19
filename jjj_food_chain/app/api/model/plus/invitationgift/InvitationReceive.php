<?php

namespace app\api\model\plus\invitationgift;

use app\common\model\plus\invitationgift\InvitationReceive as InvitationReceiveModel;

/**
 * 获取礼品模型
 */
class InvitationReceive extends InvitationReceiveModel
{
    /**
     * 获取用户已领取的奖励
     */
    public function getUserPrize($user_id, $invitation_gift_id)
    {
        $where = [
            'user_id' => $user_id,
            'invitation_gift_id' => $invitation_gift_id,
        ];
        return $this->with(['Reward'])->where($where)->select();
    }
}