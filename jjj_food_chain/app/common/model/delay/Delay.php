<?php

namespace app\common\model\delay;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;

/**
 *
 */
class Delay extends BaseModel
{
    use SoftDelete;
    protected $name = 'delay';

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

    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->select();
    }
}