<?php

namespace app\api\model\order;

use app\common\model\order\OrderProduct as OrderProductModel;

/**
 * 商品订单模型
 */
class OrderProduct extends OrderProductModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'content',
        'app_id',
        'create_time',
    ];
}