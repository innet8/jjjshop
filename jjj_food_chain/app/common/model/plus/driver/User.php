<?php

namespace app\common\model\plus\driver;

use app\common\model\BaseModel;
use app\common\model\order\OrderDeliver as OrderDeliverModel;

/**
 * 配送员用户模型
 */
class User extends BaseModel
{
    protected $name = 'driver_user';
    protected $pk = 'user_id';

    /**
     * 关联会员记录表
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 详情
     * @param $userId
     * @param array $with
     * @return static|null
     * @throws \think\exception\DbException
     */
    public static function detail($user_id, $with = ['user'])
    {
        return self::with($with)->find($user_id);
    }

    /**
     * 是否为配送员
     * @param $user_id
     * @return bool
     */
    public static function isDriverUser($user_id)
    {
        $driver = self::detail($user_id);
        return !!$driver && !$driver['is_delete'];
    }

    /**
     * 新增配送员用户记录
     * @param $user_id
     * @param $data
     * @return bool
     */
    public static function add($user_id, $data)
    {
        $model = static::detail($user_id) ?: new static;
        return $model->save(array_merge([
            'user_id' => $user_id,
            'is_delete' => 0,
            'app_id' => $model::$app_id
        ], $data));
    }


    /**
     * 发放配送员佣金
     * @param $user_id
     * @param $money
     * @return bool
     */
    public static function grantMoney($order)
    {
        //订单详情
        $orderInfo = Order::where(['order_id' => $order['order_id'], 'is_settled' => 0])->find();
        if ($orderInfo) {
            OrderDeliverModel::where(['order_id' => $order['order_id'], 'status' => 10, 'deliver_status' => 3])
                ->update(['deliver_status' => 4, 'deliver_time' => time(), 'status' => 30]);
            // 佣金结算时间（小时）
            $settleDays = Setting::getItem('settlement', $order['app_id'])['settle_days'];
            // 判断该订单是否满足结算时间 (订单完成时间 + 佣金结算时间) ≤ 当前时间
            $deadlineTime = $order['receipt_time'] + ((int)$settleDays * 3600);
            if ($settleDays > 0 && $deadlineTime > time()) {
                return false;
            }
            // 配送订单详情
            $Driver = static::detail($orderInfo['user_id']);
            if (!$Driver || $Driver['is_delete']) {
                return true;
            }
            // 累积配送员可提现佣金
            $Driver->save([
                'money' => $orderInfo['take_fee'] + $Driver['money'],
                'all_money' => $orderInfo['take_fee'] + $Driver['all_money'],
            ]);
            // 记录分销商资金明细
            Capital::add([
                'user_id' => $orderInfo['user_id'],
                'flow_type' => 10,
                'money' => $orderInfo['take_fee'],
                'describe' => '订单佣金结算',
                'app_id' => $Driver['app_id'],
            ]);
            Order::where(['order_id' => $order['order_id'], 'is_settled' => 0])
                ->update(['is_settled' => 1, 'settle_time' => time()]);
            return true;
        }
        return true;
    }

}