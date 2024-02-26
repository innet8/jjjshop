<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;

/**
 *
 */
class Buffet extends BaseModel
{
    protected $name = 'buffet';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;


    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [

    ];


    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->order('sort asc')
            ->select();
    }

}