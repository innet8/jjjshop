<?php

namespace app\job\event;

use think\facade\Cache;
use app\job\model\plus\driver\Order as DriverOrderModel;
use app\common\model\plus\driver\User as DriverUserModel;
/**
 * 配送员订单事件管理
 */
class DriverOrder
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new DriverOrderModel();
            $cacheKey = "task_space_DriverOrder";
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
            echo 'ERROR DriverOrder: ' . $e->getMessage() . PHP_EOL;
            log_write('DriverOrder TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 发放配送员订单佣金
     */
    private function grantMoney()
    {
        // 获取未结算佣金的订单列表
        $list = $this->model->getUnSettledList();
        if ($list->isEmpty()) return false;

        // 整理id集
        $invalidIds = [];
        $grantIds = [];
        // 发放配送员订单佣金
        foreach ($list->toArray() as $item) {
            // 已失效的订单
            if ($item['order_master']['order_status']['value'] == 20) {
                $invalidIds[] = $item['id'];
            }
            // 已完成的订单
            if ($item['order_master']['order_status']['value'] == 30) {
                $grantIds[] = $item['id'];
                DriverUserModel::grantMoney($item['order_master']);
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
        $value = 'behavior DriverOrder --' . $method;
        foreach ($params as $key => $val) {
            $value .= ' --' . $key . ' ' . (is_array($val) ? json_encode($val) : $val);
        }
        return log_write($value, 'task');
    }

}