<?php

namespace app\shop\model\plus\agent;

use app\api\model\plus\agent\Referee as RefereeModel;
use app\common\model\plus\agent\Apply as ApplyModel;
use app\common\service\message\MessageService;

/**
 * 分销商入驻申请模型
 */
class Apply extends ApplyModel
{
    /**
     * 获取分销商申请列表
     */
    public function getList($search)
    {
        $model = $this->alias('apply')
            ->field('apply.*, user.nickName, user.avatarUrl')
            ->with(['referee'])
            ->join('user', 'user.user_id = apply.user_id')
            ->order(['apply.create_time' => 'desc']);
        if (!empty($search['nick_name'])) {
            $model = $model->where('user.nickName|apply.real_name|apply.mobile', 'like', '%' . $search['nick_name'] . '%');
        }

        // 获取列表数据
        return $model->paginate($search);
    }

    /**
     * 分销商入驻审核
     * @param $data
     * @return bool
     */
    public function submit($data)
    {
        if ($data['apply_status'] == '30' && empty($data['reject_reason'])) {
            $this->error = '请填写驳回原因';
            return false;
        }
        $this->startTrans();
        if ($data['apply_status'] == '20') {
            // 新增分销商用户
            User::add($data['user_id'], [
                'real_name' => $data['real_name'],
                'mobile' => $data['mobile'],
                'referee_id' => $data['referee_id'],
            ]);
        }
        $save_data = [
            'audit_time' => time(),
            'apply_status' => $data['apply_status'],
            'reject_reason' => $data['reject_reason'],
        ];
        $this->save($save_data);
        // 记录推荐人关系
        if ($data['referee_id'] > 0) {
            RefereeModel::createRelation($data['user_id'], $data['referee_id']);
        }
        // 发送模板消息
        (new MessageService)->agent($this);
        $this->commit();
        return true;
    }

}