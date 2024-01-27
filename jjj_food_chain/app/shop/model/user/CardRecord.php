<?php

namespace app\shop\model\user;

use app\common\model\user\CardRecord as CardRecordModel;

/**
 * 会员卡记录模型
 */
class CardRecord extends CardRecordModel
{
    /**
     * 获取列表记录
     */
    public function getList($data)
    {
        $model = $this->alias('r')
            ->where('pay_status', '=', 20)
            ->where('r.is_delete', '=', 0)
            ->with(['card', 'user'])
            ->join('user u', 'u.user_id=r.user_id')
            ->join('user_card c', 'c.card_id=r.card_id')
            ->field('r.*')
            ->order(['r.create_time' => 'desc']);

        if (!empty($data['search'])) {
            $model = $model->like('card_name|nickName', $data['search']);
        }

        if (isset($data['status']) && $data['status'] >= 0) {
            $model = $model->where(function ($query) use ($data) {
                if ($data['status'] == 0) {
                    $query->where('r.expire_time', '<', time())->where('r.expire_time', '>', 0);
                } else {
                    $query->where('expire_time', '>=', time())
                        ->whereOr('expire_time', 0);
                }
            });
        }

        return $model->paginate($data);
    }

    /**
     * 延期
     */
    public function delay($data)
    {
        $isExist = self::checkExistByUserId($this['user_id'], $data['order_id']);
        if ($isExist) {
            $this->error = "该会员已存在会员卡，请勿延期";
            return false;
        }
        $update['expire_time'] = strtotime($data['expire_time']);
        // if ($update['expire_time'] < $this['expire_time']) {
        //     $this->error = "延期日期不能小于当前有效期";
        //     return false;
        // }
        return $this->save($update);
    }

}