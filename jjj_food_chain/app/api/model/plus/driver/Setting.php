<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\Setting as SettingModel;

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