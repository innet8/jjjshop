<?php

namespace app\shop\model\user;

use app\common\model\user\BalanceOrder as BalanceOrderModel;

/**
 * 充值模型
 */
class BalanceOrder extends BalanceOrderModel
{
    /**
     * 列表
     */
    public function getList($params)
    {
        $list = $this->with(['user'])->order(['create_time' => 'desc'])
            ->paginate($params, false, [
                'query' => request()->request()
            ]);
        foreach ($list as $key => &$value) {
                $value['snapshot'] = json_decode($value['snapshot'],true);
            }    
        return $list;    
    }
}
