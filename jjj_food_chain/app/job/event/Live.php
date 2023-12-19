<?php

namespace app\job\event;

use app\common\enum\settings\SettingEnum;
use app\common\model\plus\live\WxLive as WxLiveModel;
use app\common\model\settings\Setting as SettingModel;
use think\facade\Cache;

/**
 * 直播事件管理
 */
class Live
{

    /**
     * 执行函数
     */
    public function handle($app_id)
    {
        try {
            $cacheKey = "task_space_Live_".$app_id;
            if (!Cache::has($cacheKey)) {
                $auto_syn = SettingModel::getItem(SettingEnum::LIVE, $app_id)['auto_syn'];
                if($auto_syn){
                    $model = new WxLiveModel();
                    $model->syn($app_id);
                }
                Cache::set($cacheKey, time(), 120);
            }
            log_write('Live TASK : ' . $app_id . '__success', 'task');
        } catch (\Throwable $e) {
            echo 'ERROR Live: ' . $e->getMessage() . PHP_EOL;
            log_write('Live TASK : ' . $app_id . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }
}
