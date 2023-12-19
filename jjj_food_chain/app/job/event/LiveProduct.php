<?php

namespace app\job\event;

use app\job\model\plus\live\WxProduct as WxProductModel;
use think\facade\Cache;

/**
 * 直播商品事件管理
 */
class LiveProduct
{

    /**
     * 执行函数
     */
    public function handle($app_id)
    {
        try {
            $cacheKey = "task_space_Live_Product_" . $app_id;
            if (!Cache::has($cacheKey)) {
                $model = new WxProductModel();
                $model->synProduct($app_id);
                Cache::set($cacheKey, time(), 120);
            }
            log_write('Live_Product TASK : ' . $app_id . '__success', 'task');
        } catch (\Throwable $e) {
            echo 'ERROR Live: ' . $e->getMessage() . PHP_EOL;
            log_write('Live_Product TASK : ' . $app_id . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }
}
