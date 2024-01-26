<?php

namespace app\shop\model\user;

use app\common\model\user\PointsLog as PointsLogModel;

/**
 * 用户余额变动明细模型
 */
class PointsLog extends PointsLogModel
{
    /**
     * 获取积分明细列表
     */
    public function getList($query = [])
    {
        $model = $this;
        // 积分变动场景
        if (!empty($query['scene']) && $query['scene'] > -1) {
            $model = $model->where('log.scene', '=', (int)$query['scene']);
        }
        // 搜索关键词
        if (!empty($query['keyword'])) {
            $keyword = trim($query['keyword']);
            $model = $model->like('user.nickName', $keyword)
                ->orLike('user.mobile', $keyword)
                ->orLike('user.user_id', $keyword);
        }
        // 搜索时间段
        if (isset($query['date']) && $query['date'] != '') {
            $model = $model->where('log.create_time', 'between', [strtotime($query['date'][0]), strtotime($query['date'][1]) + 86399]);
        }
        // 获取列表数据
        return $model->with(['user'])
            ->alias('log')
            ->field('log.*')
            ->join('user', 'user.user_id = log.user_id')
            ->order(['log.create_time' => 'desc'])
            ->paginate($query, false, [
                'query' => \request()->request()
            ]);
    }

    /**
     * 设置查询条件
     */
    private function setQueryWhere($query)
    {
        // 设置默认的检索数据
        $params = $this->setQueryDefaultValue($query, [
            'user_id' => 0,
            'search' => '',
            'start_time' => '',
            'end_time' => '',
        ]);
        // 用户ID
        $params['user_id'] > 0 && $this->where('log.user_id', '=', $params['user_id']);
        // 用户昵称
        !empty($params['search']) && $this->where('user.nickName', 'like', "%{$params['search']}%");
        // 起始时间
        !empty($params['start_time']) && $this->where('log.create_time', '>=', strtotime($params['start_time']));
        // 截止时间
        !empty($params['end_time']) && $this->where('log.create_time', '<', strtotime($params['end_time']) + 86400);
    }

}