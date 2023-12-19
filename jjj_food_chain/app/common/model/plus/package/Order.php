<?php

namespace app\common\model\plus\package;

use app\common\enum\order\OrderPayTypeEnum;
use app\common\model\BaseModel;
use app\common\service\order\OrderService;

/**
 * Class Order
 * 券包订单模型
 * @package app\common\model\plus\package
 */
class Order extends BaseModel
{
    protected $name = 'package_order';
    protected $pk = 'order_id';

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo("app\\common\\model\\user\\User", 'user_id', 'user_id')->field('user_id,nickName');
    }

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
     * 关联礼包购活动
     */
    public function gift()
    {
        return $this->belongsTo("app\\common\\model\\plus\\package\\Package", 'package_id', 'package_id')->field('package_id,name');
    }

    /**
     * 支付状态
     */
    public function getPayStatusAttr($value)
    {
        $status = [10 => '未付款', 20 => '已付款'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 支付方式
     */
    public function getPayTypeAttr($value)
    {
        return ['text' => OrderPayTypeEnum::pay()[$value]['name'], 'value' => $value];
    }

    /**
     * 详情
     */
    public static function detail($order_id)
    {
        return (new static())->find($order_id);
    }
}