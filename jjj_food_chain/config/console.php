<?php
// +----------------------------------------------------------------------
// | 控制台配置
// +----------------------------------------------------------------------
return [
    // 指令定义
    'commands' => [
        // 定时任务
        'job' => \app\job\command\Job::class,
        // 多语言
        'lang' => app\common\command\Lang::class,
        // 
        'clear-cache' => app\common\command\ClearCache::class,
    ],
];
