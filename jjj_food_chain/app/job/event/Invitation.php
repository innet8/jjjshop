<?php

namespace app\job\event;

use app\api\model\plus\invitationgift\InvitationReward as InvitationRewardModel;
use app\api\model\plus\invitationgift\InvitationReceive as InvitationReceiveModel;
use app\api\model\plus\invitationgift\Partake as PartakeModel;
use app\job\model\user\User as UserModel;
use app\job\model\order\Order as OrderModel;
use app\api\model\plus\coupon\UserCoupon;

/**
 * 邀请好友管理
 */
class Invitation
{
    private $user_id;
    private $invitation_gift_id;

    /**
     * 执行函数
     */
    public function handle($data)
    {
        $this->user_id = $data['user_id'];
        $this->invitation_gift_id = $data['invitation_gift_id'];
        if ($data['type'] == 0) {
            $this->inviteStatus();
        } else if ($data['type'] == 1) {
            $this->inviteOrderStatus();
        }
        return true;
    }

    //判断邀请好友数量
    public function inviteStatus()
    {
        $PartakeModel = new PartakeModel();
        //邀请总人数
        $count = $PartakeModel->where('invitation_gift_id', '=', $this->invitation_gift_id)
            ->where('user_id', '=', $this->user_id)
            ->count();
        $data['count'] = $count;
        $this->receiveGift($data);

    }

    //判断邀请好友且消费
    public function inviteOrderStatus()
    {
        $PartakeModel = new PartakeModel();
        //邀请总人数
        $partake_id = $PartakeModel->where('invitation_gift_id', '=', $this->invitation_gift_id)
            ->where('user_id', '=', $this->user_id)
            ->column('partake_id');
        $count = (new OrderModel())->where('user_id', 'in', $partake_id)
            ->where('pay_status', '=', 20)
            ->count();
        $data['count'] = $count;
        $this->receiveGift($data);

    }

    //判断是否满足条件赠送礼品
    private function receiveGift($data)
    {
        $count = $data['count'];
        //奖品
        $InvitationRewardModel = new InvitationRewardModel();
        $reward = $InvitationRewardModel->where('invitation_gift_id', '=', $this->invitation_gift_id)
            ->order('invitation_num desc')
            ->select();
        $gift = [];
        foreach ($reward as $key => $value) {
            if ($count >= $value['invitation_num']) {
                $gift['invitation_reward_id'] = $value['invitation_reward_id'];
                $gift['point'] = $value['is_point'] == 1 ? $value['point'] : 0;
                $gift['coupon_ids'] = $value['is_coupon'] == 1 ? $value['coupon_ids'] : '';
                $gift['coupon_name'] = $value['is_coupon'] == 1 ? $value['coupon_name'] : '';
                $gift['app_id'] = $value['app_id'];
                break;
            }
        }
        //满足条件送礼品
        if ($gift) {
            //判断有没有送
            $receive = (new InvitationReceiveModel())->where('user_id', '=', $this->user_id)
                ->where('invitation_gift_id', '=', $this->invitation_gift_id)
                ->where('invitation_reward_id', '=', $gift['invitation_reward_id'])
                ->find();
            if (!$receive) {
                $gift['user_id'] = $this->user_id;
                $gift['invitation_gift_id'] = $this->invitation_gift_id;
                //增加记录
                (new InvitationReceiveModel())->save($gift);
                // 用户模型
                $user = UserModel::detail($this->user_id);
                // 修改用户积分
                if ($gift['point']) {
                    $user->setIncPoints($gift['point'], '邀请有礼奖励');
                }
                //添加优惠券
                if ($gift['coupon_ids']) {
                    $UserCouponModel = new UserCoupon;
                    $gift['coupon_ids'] = explode(',', $gift['coupon_ids']);
                    $UserCouponModel->addUserCoupon($gift['coupon_ids'], $user);
                }
            }
        }
        return true;
    }
}
