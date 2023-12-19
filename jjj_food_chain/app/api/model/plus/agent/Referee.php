<?php

namespace app\api\model\plus\agent;

use app\common\model\plus\agent\Referee as RefereeModel;

/**
 * 分销商推荐关系模型
 */
class Referee extends RefereeModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [];

    /**
     * 创建推荐关系
     */
    public static function createRelation($user_id, $referee_id)
    {
        // 分销商基本设置
        $setting = Setting::getItem('basic');
        // 是否开启分销功能
        if (!$setting['is_open']) {
            return false;
        }
        // 自分享
        if ($user_id == $referee_id) {
            return false;
        }
        // # 记录一级推荐关系
        // 判断当前用户是否已存在推荐关系
        if (self::isExistReferee($user_id)) {
            return false;
        }
        // 判断推荐人是否为分销商
        if (!User::isAgentUser($referee_id)) {
            return false;
        }
        // 新增关系记录
        $model = new self;
        $model->add($referee_id, $user_id, 1);
        // # 记录二级推荐关系
        if ($setting['level'] >= 2) {
            // 二级分销商id
            $referee_2_id = self::getRefereeUserId($referee_id, 1, true);
            // 新增关系记录
            $referee_2_id > 0 && $model->add($referee_2_id, $user_id, 2);
        }
        // # 记录三级推荐关系
        if ($setting['level'] == 3) {
            // 三级分销商id
            $referee_3_id = self::getRefereeUserId($referee_id, 2, true);
            // 新增关系记录
            $referee_3_id > 0 && $model->add($referee_3_id, $user_id, 3);
        }
        return true;
    }

    /**
     * 新增关系记录
     */
    private function add($agent_id, $user_id, $level = 1)
    {
        // 新增推荐关系
        $app_id = self::$app_id;
        $create_time = time();
        $this->insert(compact('agent_id', 'user_id', 'level', 'app_id', 'create_time'));
        // 记录分销商成员数量
        User::setMemberInc($agent_id, $level);
        return true;
    }

    /**
     * 是否已存在推荐关系
     */
    private static function isExistReferee($user_id)
    {
        return !!(new static())->where(['user_id' => $user_id])->find();
    }

}