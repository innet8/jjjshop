<?php

namespace app\api\service\order\settled;

use app\api\model\plus\group\Order as OrderModel;
use app\common\enum\order\OrderSourceEnum;

/**
 * 团购订单结算服务类
 */
class GroupOrderSettledService extends GroupSettledService
{
    /**
     * 构造函数
     */
    public function __construct($user, $groupList, $params)
    {
        parent::__construct($user, $groupList, $params);
    }

    /**
     * 验证订单商品的状态
     */
    public function validateProductList()
    {
        foreach ($this->groupList as $group) {
            if ($group['expire_type'] == 20) {
                if ($group['start_time'] > time()) {
                    $this->error = "团购活动还未开始";
                    return false;
                }
                if ($group['end_time'] < time()) {
                    $this->error = "团购活动已结束";
                    return false;
                }
            }
            // 判断团购是否存在
            if ($group['is_delete'] != 0) {
                $this->error = "很抱歉，团购商品 [{$group['group_name']}] 不存在";
                return false;
            }
            // 判断团购是否下架
            if ($group['group_status'] != 1) {
                $this->error = "很抱歉，团购商品 [{$group['group_name']}] 已下架";
                return false;
            }
            $payCount = (new OrderModel())->getHasBuyOrderNum($group['group_id'], $this->user['user_id']);
            if ($group['limit_num'] > 0 && $payCount + 1 > $group['limit_num']) {
                $this->error = "很抱歉，团购商品 [{$group['group_name']}] 今日购买已达最大次数";
                return false;
            }
        }
        return true;
    }
}