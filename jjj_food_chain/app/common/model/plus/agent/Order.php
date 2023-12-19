<?php

namespace app\common\model\plus\agent;

use app\common\model\BaseModel;
use app\common\enum\order\OrderTypeEnum;

/**
 * 分销商订单模型
 */
class Order extends BaseModel
{
    protected $name = 'agent_order';
    protected $pk = 'id';

    /**
     * 订单所属用户
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\common\model\user\User');
    }

    /**
     * 一级分销商用户
     * @return \think\model\relation\BelongsTo
     */
    public function agentFirst()
    {
        return $this->belongsTo('app\common\model\user\User', 'first_user_id');
    }

    /**
     * 二级分销商用户
     * @return \think\model\relation\BelongsTo
     */
    public function agentSecond()
    {
        return $this->belongsTo('app\common\model\user\User', 'second_user_id');
    }

    /**
     * 三级分销商用户
     * @return \think\model\relation\BelongsTo
     */
    public function agentThird()
    {
        return $this->belongsTo('app\common\model\user\User', 'third_user_id');
    }

    /**
     * 订单类型
     * @param $value
     * @return array
     */
    public function getOrderTypeAttr($value)
    {
        $types = OrderTypeEnum::getTypeName();
        return ['text' => $types[$value], 'value' => $value];
    }

    /**
     * 订单详情
     * @param $orderId
     * @param $orderType
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getDetailByOrderId($orderId, $orderType)
    {
        return (new static())->where('order_id', '=', $orderId)
            ->where('order_type', '=', $orderType)
            ->find();
    }

    /**
     * 发放分销订单佣金
     * @param $order
     * @param int $orderType
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function grantMoney($order, $orderType = OrderTypeEnum::MASTER)
    {
        // 订单是否已完成
        if ($order['order_status']['value'] != 30) {
            return false;
        }
        // 佣金结算天数
        $settleDays = Setting::getItem('settlement', $order['app_id'])['settle_days'];
        // 判断该订单是否满足结算时间 (订单完成时间 + 佣金结算时间) ≤ 当前时间
        $deadlineTime = $order['receipt_time'] + ((int)$settleDays * 86400);
        if ($settleDays > 0 && $deadlineTime > time()) {
            return false;
        }
        // 分销订单详情
        $model = self::getDetailByOrderId($order['order_id'], $orderType);
        if (!$model || $model['is_settled'] == 1) {
            return false;
        }
        // 重新计算分销佣金
        $capital = $model->getCapitalByOrder($order);
        // 发放一级分销商佣金
        $model['first_user_id'] > 0 && User::grantMoney($model['first_user_id'], $capital['first_money']);
        // 发放二级分销商佣金
        $model['second_user_id'] > 0 && User::grantMoney($model['second_user_id'], $capital['second_money']);
        // 发放三级分销商佣金
        $model['third_user_id'] > 0 && User::grantMoney($model['third_user_id'], $capital['third_money']);
        // 更新分销订单记录
        return $model->save([
            'order_price' => $capital['orderPrice'],
            'first_money' => $model['first_user_id'] > 0? $capital['first_money']:0,
            'second_money' => $model['second_user_id'] > 0? $capital['second_money']:0,
            'third_money' => $model['third_user_id'] > 0? $capital['third_money']:0,
            'is_settled' => 1,
            'settle_time' => time()
        ]);
    }

    /**
     * 计算订单分销佣金
     * @param $order
     * @return array
     */
    protected function getCapitalByOrder($order)
    {
        // 分销佣金设置
        $setting = Setting::getItem('commission', $order['app_id']);
        // 分销层级
        $level = Setting::getItem('basic', $order['app_id'])['level'];
        // 分销订单佣金数据
        $capital = [
            // 订单总金额(不含运费)
            'orderPrice' => bcsub($order['pay_price'], $order['express_price'], 2),
            // 一级分销佣金
            'first_money' => 0.00,
            // 二级分销佣金
            'second_money' => 0.00,
            // 三级分销佣金
            'third_money' => 0.00
        ];
        // 计算分销佣金
        foreach ($order['product'] as $product) {
            // 判断商品存在售后退款则不计算佣金
//            if ($this->checkProductRefund($product)) {
//                continue;
//            }
            // 商品实付款金额
            $productPrice = min($capital['orderPrice'], $product['total_pay_price']);
            // 计算商品实际佣金
            $productCapital = $this->calculateProductCapital($setting, $product, $productPrice);
            // 累积分销佣金
            $level >= 1 && $capital['first_money'] += $productCapital['first_money'];
            $level >= 2 && $capital['second_money'] += $productCapital['second_money'];
            $level == 3 && $capital['third_money'] += $productCapital['third_money'];
        }
        return $capital;
    }

    /**
     * 计算商品实际佣金
     * @param $setting
     * @param $product
     * @param $productPrice
     * @return float[]|int[]
     */
    private function calculateProductCapital($setting, $product, $productPrice)
    {
        // 判断是否开启商品单独分销
        if ($product['is_ind_agent'] == false) {
            // 全局分销比例
            return [
                'first_money' => $productPrice * ($setting['first_money'] * 0.01),
                'second_money' => $productPrice * ($setting['second_money'] * 0.01),
                'third_money' => $productPrice * ($setting['third_money'] * 0.01)
            ];
        }
        // 商品单独分销
        if ($product['agent_money_type'] == 10) {
            // 分销佣金类型：百分比
            return [
                'first_money' => $productPrice * ($product['first_money'] * 0.01),
                'second_money' => $productPrice * ($product['second_money'] * 0.01),
                'third_money' => $productPrice * ($product['third_money'] * 0.01)
            ];
        } else {
            return [
                'first_money' => $product['total_num'] * $product['first_money'],
                'second_money' => $product['total_num'] * $product['second_money'],
                'third_money' => $product['total_num'] * $product['third_money']
            ];
        }
    }

    /**
     * 验证商品是否存在售后
     * @param $product
     * @return bool
     */
    private function checkProductRefund($product)
    {
        return !empty($product['refund'])
            && $product['refund']['type']['value'] != 20
            && $product['refund']['is_agree']['value'] != 20;
    }

}
