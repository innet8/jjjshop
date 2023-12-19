<?php

namespace app\api\model\plus\agent;

use app\common\model\plus\agent\Capital as CapitalModel;

/**
 * 分销商资金明细模型
 */
class Capital extends CapitalModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'create_time',
        'update_time',
    ];

}