<?php

namespace app\common\model\plus\driver;

use app\common\model\BaseModel;
use app\common\enum\order\OrderTypeEnum;

/**
 * 分销商订单模型
 */
class Order extends BaseModel
{
    protected $name = 'driver_order';
    protected $pk = 'id';

    /**
     * 订单模型初始化
     */
    public static function init()
    {
        parent::init();
        // 监听分销商订单行为管理
        $static = new static;
        event('DriverOrder', $static);
    }

    /**
     * 订单所属用户
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\common\model\user\User');
    }

    /**
     * 配送员用户
     * @return \think\model\relation\BelongsTo
     */
    public function driverUser()
    {
        return $this->belongsTo('app\common\model\plus\driver\User', 'user_id', 'user_id');
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
        return static::where('order_id', '=', $orderId)
            ->where('order_type', '=', $orderType)
            ->find();
    }

}
