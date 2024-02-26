<?php

namespace app\shop\model\plus\sign;

use app\shop\model\user\User as UserModel;
use app\common\model\plus\sign\Sign as SignModel;
use app\common\exception\BaseException;
use app\shop\model\settings\Setting as SettingModel;

/**
 * 用户签到模型模型
 */
class Sign extends SignModel
{
    /**
     * @param $data array 查询条件
     * @param $days array 连续签到天数数组
     * @param $sign_date array 最近签到时间
     * @return mixed
     */
    public function getList($data, $days, $sign_date)
    {
        $model = $this;

        if (isset($data['days']) && $data['days'] > -1) {
            $model = $model->where('sign.days', '=', $days[$data['days']]);
        }
        if (isset($data['sign_date']) && $data['sign_date'] > -1) {
            if ($data['sign_date'] != 3) {
                $dif_time = time() - ($sign_date[$data['sign_date']] * 24 * 60 * 60);
                $model = $model->where('sign.create_time', '>', $dif_time);
            }
            if ($data['sign_date'] == 3 && isset($data['create_time']) && !empty($data['create_time'])) {
                $data['create_time'][0] = strtotime($data['create_time'][0]);
                $data['create_time'][1] = strtotime($data['create_time'][1]);
                $model = $model->where('sign.create_time', 'between', [$data['create_time'][0], $data['create_time'][1]]);
            }
        }
        if (isset($data['nickName']) && $data['nickName'] != '') {
            $model = $model->like('user.nickName', trim($data['nickName']));
        }

        return $model->with(['user'])->alias('sign')
            ->join('user', 'user.user_id = sign.user_id')
            ->order(['sign.create_time' => 'desc'])
            ->paginate($data, false, [
                'query' => request()->request()
            ]);
    }

}
