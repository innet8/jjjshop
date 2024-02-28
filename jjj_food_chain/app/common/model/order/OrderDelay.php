<?php

namespace app\common\model\order;

use app\common\model\BaseModel;

/**
 * 订单自助餐模型
 */
class OrderDelay extends BaseModel
{
    protected $name = 'order_delay';

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

}