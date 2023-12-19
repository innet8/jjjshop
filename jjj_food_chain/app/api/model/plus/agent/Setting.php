<?php

namespace app\api\model\plus\agent;

use app\common\model\plus\agent\Setting as SettingModel;

/**
 * 分销商设置模型
 */
class Setting extends SettingModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'update_time',
    ];

}