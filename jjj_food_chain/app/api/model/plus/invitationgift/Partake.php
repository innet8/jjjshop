<?php

namespace app\api\model\plus\invitationgift;

use app\common\model\plus\invitationgift\Partake as PartakeModel;

/**
 * 领取记录表
 */
class Partake extends PartakeModel
{

    /**
     * 判断用户是否领过奖品
     */
    public function checkReward($invitation_reward_id, $invitation_gift_id, $user_id)
    {
        $where = [
            'invitation_reward_id' => $invitation_reward_id,
            'invitation_gift_id' => $invitation_gift_id,
            'user_id' => $user_id,
        ];
        return $this->where($where)->find();
    }

    /**
     * 获取用户已领取的奖励
     */
    public function getUserPrizes($user_id, $invitation_gift_id)
    {
        $where = [
            'user_id' => $user_id,
            'invitation_gift_id' => $invitation_gift_id,
        ];
        return $this->with(['reward'])->where($where)->select();
    }

    //添加邀请记录
    public function addPartake($invitation_id, $user_id, $partake_id)
    {
        $InvitationModel = new InvitationGift();
        $invitation = $InvitationModel->find($invitation_id);
        $data = [
            'invitation_gift_id' => $invitation_id,
            'user_id' => $user_id,
            'name' => $invitation['name'],
            'app_id' => $invitation['app_id'],
            'partake_id' => $partake_id
        ];

        // 添加邀请记录
        $this->save($data);
        //更新参与数量
        $InvitationModel->where(['invitation_gift_id' => $data['invitation_gift_id']])->update(['partake_num' => $invitation['partake_num'] + 1]);
        if ($invitation['inv_condition'] == 0) {//邀请会员送好礼
            $detail['user_id'] = $data['user_id'];
            $detail['invitation_gift_id'] = $data['invitation_gift_id'];
            $detail['type'] = 0;
            event('Invitation', $detail);
        }

        return true;

    }
}