<?php

namespace app\job\event;

use think\facade\Cache;
use app\common\model\shop\OptLog;

/**
 * 记录操作日志
 */
class RecordShopLog
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new OptLog();
            $this->record();
        } catch (\Throwable $e) {
            echo 'ERROR RecordShopLog: ' . $e->getMessage() . PHP_EOL;
            log_write('RecordShopLog TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 记录日志
     */
    private function record()
    {
        // 删除一个月之前的记录
        $this->model->where('create_time', '<', strtotime('-1 month'))->delete();

        // 记录缓存
        $list = Cache::pull('shop_opt_log', []);
        if (!empty($list)) {
            $chunks = array_chunk($list, 100);
            foreach ($chunks as $chunk) {
                $this->model->saveAll($chunk);
            }
        }
    }
}
