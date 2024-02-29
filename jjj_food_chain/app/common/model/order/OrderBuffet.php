<?php

namespace app\common\model\order;

use app\common\enum\order\OrderStatusEnum;
use app\common\library\helper;
use app\common\model\BaseModel;
use app\common\model\order\Order as OrderModel;

/**
 * 订单自助餐模型
 */
class OrderBuffet extends BaseModel
{
    protected $name = 'order_buffet';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 获取自助餐名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['name']);
    }

    /**
     * 订单商品列表
     */
    public function buffetProduct()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'buffet_id');
    }

    // 删除订单自助餐
    public function del($order_buffet_id)
    {
        $this->startTrans();
        try {
            $model = $this->where('id', '=', $order_buffet_id)->find();
            if (!$model) {
                $this->error = '记录不存在';
                return false;
            }
            // 检查订单状态
            $order = OrderModel::detail([
                ['order_id', '=', $model['order_id']],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
            if (!$order) {
                $this->rollback();
                $this->error = '当前订单不可修改';
                return false;
            }
            if ($order['is_lock'] == 1) {
                $this->rollback();
                $this->error = '当前订单已被锁定';
                return false;
            }
            $model->force()->delete();
            // 就餐剩余时间变化
            $time_limit = (new OrderBuffet())->where('order_id', '=', $order['order_id'])->min('time_limit');
            //
            if (!(new OrderBuffet())->where('order_id', '=', $order['order_id'])->find()) {
                $order->save(['buffet_expired_time' => 0]);
            } else if ($time_limit > 0) {
                $time_limit = floatval($time_limit);
                $buffet_expired_time = helper::bcadd(strtotime($order['create_time']), helper::bcmul($time_limit, 60));
                $order->save(['buffet_expired_time' => $buffet_expired_time]);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }
}