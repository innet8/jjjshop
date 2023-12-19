<?php

namespace app\job\event;

use think\facade\Cache;
use app\job\model\plus\agent\Order as AgentOrderModel;

/**
 * 分销商订单事件管理
 */
class AgentOrder
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new AgentOrderModel();
            $cacheKey = "task_space_AgentOrder";
            if (!Cache::has($cacheKey)) {
                $this->model->startTrans();
                try {
                    // 发放分销订单佣金
                    $this->grantMoney();
                    $this->model->commit();
                } catch (\Exception $e) {
                    $this->model->rollback();
                }
                Cache::set($cacheKey, time(), 60);
            }
        } catch (\Throwable $e) {
            echo 'ERROR AgentOrder: ' . $e->getMessage() . PHP_EOL;
            log_write('AgentOrder TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 发放分销订单佣金
     */
    private function grantMoney()
    {
        // 获取未结算佣金的订单列表
        $list = $this->model->getUnSettledList();
        if ($list->isEmpty()) return false;

        // 整理id集
        $invalidIds = [];
        $grantIds = [];
        // 发放分销订单佣金
        foreach ($list->toArray() as $item) {
            // 已失效的订单
            if ($item['order_master']['order_status']['value'] == 20) {
                $invalidIds[] = $item['id'];
            }
            // 已完成的订单
            if ($item['order_master']['order_status']['value'] == 30) {
                $grantIds[] = $item['id'];
                AgentOrderModel::grantMoney($item['order_master'], $item['order_type']['value']);
            }
        }

        // 标记已失效的订单
        $this->model->setInvalid($invalidIds);

        // 记录日志
        $this->dologs('invalidIds', ['Ids' => $invalidIds]);
        $this->dologs('grantMoney', ['Ids' => $grantIds]);
        return true;
    }

    /**
     * 记录日志
     */
    private function dologs($method, $params = [])
    {
        $value = 'behavior AgentOrder --' . $method;
        foreach ($params as $key => $val) {
            $value .= ' --' . $key . ' ' . (is_array($val) ? json_encode($val) : $val);
        }
        return log_write($value, 'task');
    }

}