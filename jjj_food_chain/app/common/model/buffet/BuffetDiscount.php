<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;
use app\common\model\order\OrderBuffet as OrderBuffetModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\model\order\Order as OrderModel;

/**
 *
 */
class BuffetDiscount extends BaseModel
{
    use SoftDelete;
    protected $name = 'buffet_discount';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 关联自助餐产品
     */
    public function buffetDiscountRel()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'id')->with('product');
    }


    /**
     * 获取名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['name']);
    }

    /**
     * 列表
     */
    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->order('sort asc,id desc')
            ->select();
    }
}