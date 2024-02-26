<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;

/**
 *
 */
class Buffet extends BaseModel
{
    use SoftDelete;
    protected $name = 'buffet';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

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
    public function buffetProducts()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'id')->with('product');
    }

    /**
     * 关联自助餐限购产品
     */
    public function buffetLimitProducts()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'id')->where('limit_num', '>', 0)->with('product');
    }

    /**
     * 获取自助餐名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['name']);
    }

    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->order('sort asc')
            ->select();
    }
}