<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;

/**
 *
 */
class Buffet extends BaseModel
{
    protected $name = 'buffet';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [

    ];

    /**
     * 关联供应商表
     */
    public function orders()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order', 'order_id', 'order_id');
    }

    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->select();
    }

}