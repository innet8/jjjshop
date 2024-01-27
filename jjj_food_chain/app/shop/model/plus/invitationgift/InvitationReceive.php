<?php

namespace app\shop\model\plus\invitationgift;

use app\common\model\plus\invitationgift\InvitationReceive as InvitationReceiveModel;

/**
 * 获取礼品模型
 */
class InvitationReceive extends InvitationReceiveModel
{
   /**
     * 参与记录列表
     */
    public function getList($id, $data)
    {
        $model = $this;
        if ($data['search'] != '') {
            $model = $model->like('user.nickName|user.mobile', trim($data['search']));
        }
        return $model->alias('receive')->field('receive.*')->with(['user','invite'])
            ->join('user', 'user.user_id = receive.user_id', 'left')
            ->where('receive.invitation_gift_id', '=', $id)
            ->order('receive.create_time', 'desc')
            ->paginate(15);
    }
}