<?php

namespace app\shop\model\plus\invitationgift;

use app\common\model\plus\invitationgift\Partake as PartakeModel;

/**
 * Class Partake
 * 参加记录模型
 * @package app\shop\model\plus\invitationgift
 */
class Partake extends PartakeModel
{
    /**
     * 参与记录列表
     */
    public function getList($id, $data)
    {
        $model = $this;
        if (isset($data['search']) && $data['search'] != '') {
            $model = $model->like('user.nickName|user.mobile', trim($data['search']));
        }
        return $model->alias('partake')->field('partake.*')->with(['user', 'partake'])
            ->join('user', 'user.user_id = partake.user_id', 'left')
            ->where('invitation_gift_id', '=', $id)
            ->order('partake.create_time', 'desc')
            ->paginate($data);
    }
}