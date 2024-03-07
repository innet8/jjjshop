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
     * 关联自助餐
     */
    public function buffet()
    {
        return $this->belongsTo('app\\common\\model\\buffet\\Buffet', 'id', 'buffet_id');
    }

    /**
     * 关联产品
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id')->field(['product_id', 'product_name', 'sales_initial', 'sales_actual']);
    }
}