<?php

namespace app\api\model\plus\points;

use app\common\model\plus\points\Category as CategoryModel;

/**
 * 积分商品分类模型
 */
class Category extends CategoryModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'app_id',
        'update_time'
    ];

}