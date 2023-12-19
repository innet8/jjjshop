<?php

namespace app\api\model\plus\agent;

use app\api\model\plus\agent\Referee as RefereeModel;
use app\common\model\plus\agent\Apply as ApplyModel;

/**
 * 分销商申请模型
 */
class Apply extends ApplyModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'create_time',
        'update_time',
    ];

    /**
     * 是否为分销商申请中
     */
    public static function isApplying($user_id)
    {
        $detail = self::detail(['user_id' => $user_id]);
        return $detail ? ((int)$detail['apply_status']['value'] === 10) : false;
    }

    /**
     * 提交申请
     */
    public function submit($user, $data)
    {
        // 成为分销商条件
        $config = Setting::getItem('condition');
        // 如果之前有关联分销商，则继续关联之前的分销商
        $has_referee_id = Referee::getRefereeUserId($user['user_id'], 1);
        if($has_referee_id > 0){
            $referee_id = $has_referee_id;
        }else{
            $referee_id = $data['referee_id'] > 0 ?$data['referee_id']:0;
        }
        // 数据整理
        $data = [
            'user_id' => $user['user_id'],
            'real_name' => trim($data['name']),
            'mobile' => trim($data['mobile']),
            'referee_id' => $referee_id,
            'apply_type' => $config['become'],
            'apply_time' => time(),
            'app_id' => self::$app_id,
        ];
        if ($config['become'] == 10) {
            $data['apply_status'] = 10;
        } elseif ($config['become'] == 20) {
            $data['apply_status'] = 20;
        }
        return $this->add($user, $data);
    }

    /**
     * 更新分销商申请信息
     */
    private function add($user, $data)
    {
        // 实例化模型
        $model = self::detail(['user_id' => $user['user_id']]) ?: $this;
        // 更新记录
        $this->startTrans();
        try {
            // 保存申请信息
            $model->save($data);
            // 无需审核，自动通过
            if ($data['apply_type'] == 20) {
                // 新增分销商用户记录
                User::add($user['user_id'], [
                    'real_name' => $data['real_name'],
                    'mobile' => $data['mobile'],
                    'referee_id' => $data['referee_id']
                ]);
            }
            // 记录推荐人关系
            if ($data['referee_id'] > 0) {
                RefereeModel::createRelation($user['user_id'], $data['referee_id']);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

}
