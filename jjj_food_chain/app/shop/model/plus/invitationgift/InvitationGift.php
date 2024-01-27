<?php

namespace app\shop\model\plus\invitationgift;

use app\common\model\plus\invitationgift\InvitationGift as InvitationGiftModel;
use app\shop\model\plus\coupon\Coupon;
use app\common\exception\BaseException;

/**
 * 邀请有礼模型
 */
class InvitationGift extends InvitationGiftModel
{
    /**
     * 获取列表
     * @param $data
     */
    public function getList($data)
    {
        $model = $this;
        //检索活动名称
        if ($data['search'] != '') {
            $model = $model->like('name', trim($data['search']));
        }
        $list = $model->with(['Reward'])->where('is_delete', '=', 0)
            ->order('create_time', 'desc')
            ->paginate($data);
        foreach ($list as $k => $val) {
            if ($val['start_time']['value'] > time()) {
                $list[$k]['text'] = '未开始';
            }
            if ($val['end_time']['value'] < time()) {
                $list[$k]['text'] = '已结束';
            }
            if ($val['start_time']['value'] < time() && $val['end_time']['value'] > time()) {
                $list[$k]['text'] = '进行中';
            }
        }
        return $list;
    }

    /**
     * 保存
     */
    public function add($data)
    {
        $this->startTrans();
        try {
            $this->save($this->getSaveData($data));
            $arr1 = [];
            foreach ($data['reward_data'] as $val) {

                if ($val['is_coupon'] == 'true') {
                    $is_coupon = 1;
                    $coupon_ids = $val['coupon_ids'];
                } else {
                    $is_coupon = 0;
                    $coupon_ids = '';

                }
                if ($val['is_point'] == 'true') {
                    $is_point = 1;
                    $point = $val['point'];
                } else {
                    $is_point = 0;
                    $point = 0;
                }
                $arr1[] = [
                    'invitation_gift_id' => $this->invitation_gift_id,
                    'invitation_num' => $val['invitation_num'],
                    'is_point' => $is_point,
                    'point' => $point,
                    'is_coupon' => $is_coupon,
                    'coupon_ids' => trim($coupon_ids,','),
                    'app_id' => self::$app_id,
                    'coupon_name' => trim($val['coupon_name'], ','),

                ];
            }
            $model = new InvitationReward();
            $model->saveAll($arr1);
            if ($data['is_show'] == 1) {
                $this->updateShow($this->invitation_gift_id);
            }
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            $this->where('invitation_gift_id', '=', $data['invitation_gift_id'])->save($this->getSaveData($data));
            // 先删除
            (new InvitationReward())->where('invitation_gift_id', '=', $data['invitation_gift_id'])->delete();
            foreach ($data['reward_data'] as $val) {
                // 优惠券
                if ($val['is_coupon'] == 'true') {
                    $is_coupon = 1;
                    $coupon_ids = $val['coupon_ids'];
                } else {
                    $is_coupon = 0;
                    $coupon_ids = '';
                }
                // 积分
                if ($val['is_point'] == 'true') {
                    $is_point = 1;
                    $point = $val['point'];
                } else {
                    $is_point = 0;
                    $point = 0;
                }
                $reward_data = [
                    'invitation_gift_id' => $data['invitation_gift_id'],
                    'invitation_num' => $val['invitation_num'],
                    'is_point' => $is_point,
                    'point' => $point,
                    'is_coupon' => $is_coupon,
                    'coupon_ids' => trim($coupon_ids,','),
                    'app_id' => self::$app_id,
                    'coupon_name' => trim($val['coupon_name'], ','),
                ];
                if (isset($val['invitation_reward_id'])) {
                    $reward_data['invitation_reward_id'] = $val['invitation_reward_id'];
                }
                (new InvitationReward())->save($reward_data);
            }
            if ($data['is_show'] == 1) {
                $this->updateShow($data['invitation_gift_id']);
            }
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    private function getSaveData($data){
        return [
            'name' => $data['name'],
            'start_time' => strtotime(array_shift($data['value1'])),
            'end_time' => strtotime(array_pop($data['value1'])),
            'inv_condition' => $data['inv_condition'],
            'app_id' => self::$app_id,
            'image_id' => $data['image_id'],
            'is_show' => $data['is_show'],
            'share_image_id'=>$data['share_image_id'],
            'share_title' => $data['share_title'],
            'share_desc' => $data['share_desc']
        ];
    }

    //更新活动状态
    private function updateShow($invitation_gift_id)
    {
        $this->where('invitation_gift_id', '<>', $invitation_gift_id)->update(['is_show' => 0]);
    }

    /**
     * 发布
     */
    public function send($id)
    {
        return $this->where('invitation_gift_id', '=', $id)->update(['status' => 0]);
    }

    /**
     * 终止
     */
    public function end($id)
    {
        return $this->where('invitation_gift_id', '=', $id)->update(['status' => 1]);
    }

    /**
     * 删除
     */
    public function del($id)
    {
        return $this->where('invitation_gift_id', '=', $id)->update(['is_delete' => 1]);
    }

    /**
     * 后去数据
     */
    public function getDatas($id)
    {
        $data = $this->with(['Reward','image','share'])->where('invitation_gift_id', '=', $id)->find();
        if (empty($data)) {
            throw new BaseException(['msg' => '没有相关信息']);
        }
        $data = $data->toArray();
        $data['value1'][] = $data['start_time']['text'];
        $data['value1'][] = $data['end_time']['text'];
        $data['inv_condition'] = $data['inv_condition'] . '';
        foreach ($data['Reward'] as $k => $val) {
            if ($val['is_point'] == 1) {
                $data['Reward'][$k]['is_point'] = true;
            } else {
                $data['Reward'][$k]['is_point'] = false;
            }
            if ($val['is_coupon'] == 1) {
                $data['Reward'][$k]['is_coupon'] = true;
            } else {
                $data['Reward'][$k]['is_coupon'] = false;
            }
            $model = new Coupon();
            $coupon = $model->getCoupons($val['coupon_ids']);
            $data['Reward'][$k]['coupon_name'] = $coupon;
        }
        return $data;
    }

    /**
     * 获取未结束的数据列表
     */
    public function getLinkDatas()
    {
        return $this->where('status', '=', 0)
            ->where('is_delete', '=', 0)
            ->where('end_time', '>', time())
            ->select();
    }
}