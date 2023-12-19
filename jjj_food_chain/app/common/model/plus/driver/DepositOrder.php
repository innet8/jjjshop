<?php


namespace app\common\model\plus\driver;

use app\common\model\BaseModel;
use app\common\service\order\OrderService;

/**
 * 配送员申请模型
 */
class DepositOrder extends BaseModel
{
    protected $pk = 'order_id';
    protected $name = 'driver_deposit_order';

    /**
     * 生成订单号
     */
    public function orderNo()
    {
        return OrderService::createOrderNo();
    }

    /**
     * 生成交易号
     */
    public function tradeNo()
    {
        return OrderService::createTradeNo();
    }

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 获取订单详情
     */
    public static function detail($where)
    {
        $model = (new static())->where($where)->find();
        return $model;
    }

}