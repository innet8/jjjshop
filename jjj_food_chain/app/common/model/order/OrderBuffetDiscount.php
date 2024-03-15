<?php

namespace app\common\model\order;

use app\common\enum\order\OrderStatusEnum;
use app\common\library\helper;
use app\common\model\BaseModel;
use app\common\model\order\Order as OrderModel;

/**
 * 订单自助餐优惠模型
 */
class OrderBuffetDiscount extends BaseModel
{
    protected $name = 'order_buffet_discount';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 获取名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['buffet_discount_name']) .'('. extractLanguage($value ?: $data['buffet_name']).')';
    }


    /**
     * 关联自助餐表
     */
    public function buffetDiscount()
    {
        return $this->belongsTo('app\\common\\model\\buffet\\BuffetDiscount', 'buffet_id', 'id');
    }

}