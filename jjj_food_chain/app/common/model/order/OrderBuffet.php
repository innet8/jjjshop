<?php

namespace app\common\model\order;

use app\common\model\BaseModel;

/**
 * 订单自助餐模型
 */
class OrderBuffet extends BaseModel
{
    protected $pk = 'deliver_id';
    protected $name = 'order_buffet';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [

    ];

    /**
     * 关联订单表
     */
    public function orders()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order', 'order_id', 'order_id');
    }

}