<?php

namespace app\common\model\plus\driver;

use app\common\model\BaseModel;

/**
 * 配送员资金明细模型
 */
class Capital extends BaseModel
{
    protected $name = 'driver_capital';
    protected $pk = 'id';

    /**
     * 分销商资金明细
     * @param $data
     */
    public static function add($data)
    {
        $model = new static;
        $model->save(array_merge([
            'app_id' => $model::$app_id
        ], $data));
    }
}