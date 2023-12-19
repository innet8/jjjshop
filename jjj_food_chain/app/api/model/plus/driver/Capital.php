<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\Capital as CapitalModel;

/**
 * 配送员资金明细模型
 */
class Capital extends CapitalModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        //'create_time',
        'update_time',
    ];
    /**
     * 获取配送员提现明细
     */
    public function getList($user_id,$limit=15)
    {
        $model = $this;
        return $model->where('user_id', '=', $user_id)
        	->where('flow_type','=',10)
        	->order(['create_time' => 'desc'])
            ->paginate($limit, false, [
                'query' => \request()->request()
            ]);
    }
}