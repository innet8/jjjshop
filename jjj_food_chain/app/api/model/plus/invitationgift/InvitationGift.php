<?php

namespace app\api\model\plus\invitationgift;

use app\common\model\plus\invitationgift\InvitationGift as InvitationGiftModel;
use app\api\model\settings\Setting as SettingModel;

/**
 * 邀请有礼模型
 */
class InvitationGift extends InvitationGiftModel
{
    /**
     *获取活动
     */
    public function getDatas($id, $user_id)
    {
        if ($id) {
            $where = [
                'is_delete' => 0,
                'status' => 0,
                'invitation_gift_id' => $id,
            ];
        } else {
            $where = [
                'is_delete' => 0,
                'status' => 0,
                'is_show' => 1,
            ];
        }
        $InvitationReceive = new InvitationReceive();
        $data = $this->with(['reward', 'image', 'share'])->where($where)->find();
        if (!$data) {
            $this->error = '活动尚未发布';
            return false;
        }
        $count = $this->inviteTotal($data, $user_id);
        $data['prize'] = $InvitationReceive->getUserPrize($user_id, $data['invitation_gift_id']);
        $data['dif'] = 0;
        if ($data['status']['value'] == 1) {
            $this->error = '活动尚未发布';
            return false;
        }
        if (time() < $data['start_time']['value']) {
            $this->error = '活动尚未开始';
            return false;
        }
        if (time() > $data['end_time']['value']) {
            $this->error = '活动已结束';
            return false;
        }
        $is_over = true;
        foreach ($data['Reward'] as $val) {
            if ($val['invitation_num'] > $count) {
                $data['dif'] = $val['invitation_num'] - $count;
                $is_over = false;
                break;
            }
        }
        $data['count'] = $count;
        $data['is_over'] = $is_over;
        return $data;
    }

    //查询邀请人数
    private function inviteTotal($data, $user_id)
    {
        $count = 0;
        $InvitationPartake = new Partake();
        switch ($data['inv_condition']) {
            case '0':
                $count = $InvitationPartake->where('user_id', '=', $user_id)
                    ->where('invitation_gift_id', '=', $data['invitation_gift_id'])
                    ->count();
                break;
            case '1':
                $count = $InvitationPartake->alias('p')
                    ->where('user.pay_money', '>', 0)
                    ->where('p.invitation_gift_id', '=', $data['invitation_gift_id'])
                    ->where('p.user_id', '=', $user_id)
                    ->join('user user', 'p.partake_id=user.user_id')
                    ->count();
                break;
        }
        return $count;

    }

    //获取个人中心显示活动
    public static function getShow()
    {
        $data = SettingModel::getItem('invitation');
        $invitation_gift_id = (new static())->where('is_show', '=', 1)
            ->where('is_delete', '=', 0)
            ->where('start_time', '<', time())
            ->where('end_time', '>', time())
            ->value('invitation_gift_id');
        $data['invitation_id'] = $invitation_gift_id ? $invitation_gift_id : 0;
        return $data;
    }
}