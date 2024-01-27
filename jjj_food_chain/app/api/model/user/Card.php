<?php

namespace app\api\model\user;

use app\common\model\user\Card as CardModel;

/**
 * 会员卡模型
 */
class Card extends CardModel
{
    /**
     * 获取列表
     */
    public function getList($data)
    {
        $model = $this;
        if (isset($data['card_name']) && $data['card_name']) {
            $model = $model->like('card_name', $data['card_name']);
        }
        $list = $model->where('is_delete', '=', 0)
            ->where('status', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->paginate($data);
        return $list;
    }

    /**
     * 获取数量
     */
    public function getCount($user)
    {
        $cardCount = $this->where('is_delete', '=', 0)
            ->where('status', '=', 0)
            ->where('type_id', '<>', 3)
            ->count();
        $myCount = (new CardRecord())->alias('r')
            ->where('c.is_delete', '=', 0)
            ->where('c.status', '=', 0)
            ->where('r.is_delete', '=', 0)
            ->where('r.pay_status', '=', 20)
            ->where('user_id', '=', $user['user_id'])
            ->join('user_card c', 'c.card_id=r.card_id')
            ->where(function ($query) {
                $query->where('expire_time', '=', 0)->whereOr('expire_time', '>', time());
            })
            ->count();
        $info['cardCount'] = $cardCount;
        $info['myCount'] = $myCount;
        return $info;
    }

}