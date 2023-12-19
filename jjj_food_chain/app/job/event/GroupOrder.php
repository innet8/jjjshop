<?php

namespace app\job\event;

use app\common\library\helper;
use think\facade\Cache;
use app\job\model\plus\group\Order as OrderModel;

/**
 * 团购订单事件管理
 */
class GroupOrder
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new OrderModel();
            $cacheKey = "task_space_GroupOrder";
            if (!Cache::has($cacheKey)) {
                // 关闭未支付订单
                $this->setClose();
                // 过期订单退款
                $this->setRefund();
                Cache::set($cacheKey, time(), 60);
            }
        } catch (\Throwable $e) {
            echo 'ERROR GroupOrder: ' . $e->getMessage() . PHP_EOL;
            log_write('GroupOrder TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 关闭未支付订单
     */
    private function setClose()
    {
        // 获取已过期的团购ID集
        $orderIds = $this->model->getCloseOrderIds();
        // 关闭未支付订单
        $this->model->setIsExpire($orderIds);
        // 记录日志
        $this->dologs('setClose', [
            'orderIds' => json_encode($orderIds),
        ]);
        return true;
    }

    /**
     * 设置团购过期订单退款
     */
    private function setRefund()
    {
        // 获取已过期的团购ID集
        $list = $this->model->getExpiredList();
        // 更新已过期状态
        $orderIds = $this->model->orderRefund($list);
        // 记录日志
        $this->dologs('setRefund', [
            'orderIds' => json_encode($orderIds),
        ]);
        return true;

    }

    /**
     * 记录日志
     */
    private function dologs($method, $params = [])
    {
        $value = 'GroupOrder --' . $method;
        foreach ($params as $key => $val)
            $value .= ' --' . $key . ' ' . $val;
        return log_write($value, 'task');
    }

}
