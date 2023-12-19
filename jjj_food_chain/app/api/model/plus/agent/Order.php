<?php

namespace app\api\model\plus\agent;

use app\common\model\plus\agent\Order as OrderModel;
use app\common\service\order\OrderService;
use app\common\enum\order\OrderTypeEnum;

/**
 * 分销商订单模型
 */
class Order extends OrderModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'update_time',
    ];

    /**
     * 获取分销商订单列表
     */
    public function getList($user_id, $is_settled = -1)
    {
        $model = $this;
        $is_settled > -1 && $model = $model->where('is_settled', '=', !!$is_settled);
        $data = $model->with(['user'])
            ->where('first_user_id|second_user_id|third_user_id', '=', $user_id)
            ->order(['create_time' => 'desc'])
            ->paginate(15);
        if ($data->isEmpty()) {
            return $data;
        }
        // 整理订单信息
        $with = ['product' => ['image'], 'address', 'user'];
        return OrderService::getOrderList($data, 'order_master', $with);
    }

    /**
     * 创建分销商订单记录
     */
    public static function createOrder($order, $order_type = OrderTypeEnum::MASTER)
    {
        // 分销订单模型
        $model = new self;
        // 分销商基本设置
        $setting = Setting::getItem('basic', $order['app_id']);
        // 是否开启分销功能
        if (!$setting['is_open']) {
            return false;
        }
        // 获取当前买家的所有上级分销商用户id
        $agentUser = $model->getAgentUserId($order['user_id'], $setting['level'], $setting['self_buy']);
        // 非分销订单
        if (!$agentUser['first_user_id']) {
            return false;
        }
        // 计算订单分销佣金
        $capital = $model->getCapitalByOrder($order);
        // 保存分销订单记录
        return $model->save([
            'user_id' => $order['user_id'],
            'order_id' => $order['order_id'],
            'order_type' => $order_type,
            'order_price' => $capital['orderPrice'],
            'first_money' => $agentUser['first_user_id'] > 0?max($capital['first_money'], 0):0,
            'second_money' => $agentUser['second_user_id'] > 0?max($capital['second_money'], 0):0,
            'third_money' => $agentUser['third_user_id'] > 0?max($capital['third_money'], 0):0,
            'first_user_id' => $agentUser['first_user_id'],
            'second_user_id' => $agentUser['second_user_id'],
            'third_user_id' => $agentUser['third_user_id'],
            'is_settled' => 0,
            'app_id' => $order['app_id']
        ]);
    }

    /**
     * 获取当前买家的所有上级分销商用户id
     */
    private function getAgentUserId($user_id, $level, $self_buy)
    {
        $agentUser = [
            'first_user_id' => $level >= 1 ? Referee::getRefereeUserId($user_id, 1, true) : 0,
            'second_user_id' => $level >= 2 ? Referee::getRefereeUserId($user_id, 2, true) : 0,
            'third_user_id' => $level == 3 ? Referee::getRefereeUserId($user_id, 3, true) : 0
        ];
        // 分销商自购
        if ($self_buy && User::isAgentUser($user_id)) {
            return [
                'first_user_id' => $user_id,
                'second_user_id' => $agentUser['first_user_id'],
                'third_user_id' => $agentUser['second_user_id'],
            ];
        }
        return $agentUser;
    }

}
