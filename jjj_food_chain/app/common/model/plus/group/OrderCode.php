<?php

namespace app\common\model\plus\group;

use app\common\model\BaseModel;

/**
 * 团购码模型
 */
class OrderCode extends BaseModel
{
    protected $name = 'group_order_code';
    protected $pk = 'code_id';

    /**
     * 关联订单主表
     * @return \think\model\relation\BelongsTo
     */
    public function orderM()
    {
        return $this->belongsTo('Order', 'order_id', 'order_id');
    }

    //查询券码
    public function getOrderCode($order)
    {
        $codeDetail = $this->where('order_id', '=', $order['order_id'])->find();
        return $codeDetail;
    }

}