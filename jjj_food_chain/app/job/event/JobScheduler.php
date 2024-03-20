<?php

namespace app\job\event;


use app\common\model\app\App as AppModel;

/**
 * 订单事件管理
 */
class JobScheduler
{

    /**
     * 执行函数
     */
    public function handle()
    {
        // 查找所有appid
        $appList = AppModel::getAll();
        // 涉及到应用单独配置的，循环执行
        foreach ($appList as $app){
            // 订单任务
            event('Order', $app['app_id']);
            // doto 暂时用不到该业务，先注释
            // 同步直播 
            // event('Live', $app['app_id']);
            // 同步直播商品
            // event('LiveProduct', $app['app_id']);
        }
        // doto 暂时用不到该业务，先注释
        // 用户优惠券
        // event('UserCoupon');
        // 用户生日信息
        // event('User');
        // 分销商订单结算
        // event('AgentOrder');
        // 团购订单
        // event('GroupOrder');
        // 交班打印
        event('UserShiftLogPrint');
        // 记录日志 
        event('RecordShopLog');
        //
        return true;
    }

}
