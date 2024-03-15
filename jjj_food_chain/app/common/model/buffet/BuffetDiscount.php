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
    protected $name = 'buffet_discount';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 定义与Buffet模型的多对多关联
     */
    public function buffets()
    {
        return $this->belongsToMany(Buffet::class, 'buffet_discount_rel', 'buffet_id', 'buffet_discount_id');
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