<?php

namespace app\common\model\order;

use app\common\enum\order\OrderStatusEnum;
use app\common\model\BaseModel;
use app\common\model\order\Order as OrderModel;

/**
 * 订单自助餐模型
 */
class OrderDelay extends BaseModel
{
    protected $name = 'order_delay';

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

    // 删除订单加钟
    public function del($order_delay_id)
    {
        $this->startTrans();
        try {
            $model = $this->where('id', '=', $order_delay_id)->find();
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
                $this->error = '订单已被锁定，请解锁后重新操作';
                return false;
            }
            $del_model_delay_time = $model['delay_time'];
            $model->force()->delete();
            // 订单剩余时间扣除
            if ($order['buffet_expired_time'] != 1) {
                $buffet_expired_time = $order['buffet_expired_time'] - $del_model_delay_time * 60;
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