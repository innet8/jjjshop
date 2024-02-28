<?php

namespace app\common\model\order;

use app\common\model\BaseModel;

/**
 * 订单自助餐模型
 */
class OrderBuffet extends BaseModel
{
    protected $name = 'order_buffet';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 获取自助餐名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['name']);
    }

    /**
     * 订单商品列表
     */
    public function buffetProduct()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'buffet_id');
    }
}