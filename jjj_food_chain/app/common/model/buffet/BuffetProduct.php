<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;

/**
 *
 */
class BuffetProduct extends BaseModel
{
    protected $name = 'buffet_product';

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
        return $this->belongsTo('app\\common\\model\\buffet\\Buffet', 'id', 'buffet_id');
    }

}