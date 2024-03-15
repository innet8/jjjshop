<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;

/**
 *
 */
class BuffetDiscountRel extends BaseModel
{
    protected $name = 'buffet_discount_rel';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [

    ];

    /**
     * 关联自助餐
     */
    public function buffet()
    {
        return $this->belongsTo('app\\common\\model\\buffet\\Buffet', 'id', 'buffet_id');
    }

}