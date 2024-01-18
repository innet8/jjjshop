<?php

namespace app\common\model\user;

use app\common\model\BaseModel;
use app\common\service\order\OrderService;
use app\common\model\user\WxCard as WxCardModel;

/**
 * 会员卡领取记录模型
 */
class CardRecord extends BaseModel
{
    protected $pk = 'order_id';
    protected $name = 'user_card_record';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'expire_time_text',
        'pay_time_text',
        'pay_type_text',
    ];

    /**
     * 会员卡有效期
     * @param $value
     * @param $data
     * @return string
     */
    public function getExpireTimeTextAttr($value, $data)
    {
        return $data['expire_time'] ? __('有效期至') . date('Y-m-d', $data['expire_time']) : __('永久有效');
    }

    /**
     * 会员卡有效期
     * @param $value
     * @param $data
     * @return string
     */
    public function getPayTimeTextAttr($value, $data)
    {
        return date('Y-m-d H:i:s', $data['pay_time']);
    }

    /**
     * 会员卡有效期
     * @param $value
     * @param $data
     * @return string
     */
    public function getPayTypeTextAttr($value, $data)
    {
        $pay_type = [10 => __('余额支付'), 20 => __('微信支付'), 30 => __('支付宝支付'), 40 => __('后台发卡')];
        return $pay_type[$data['pay_type']];
    }

    /**
     * 优惠券数组转换
     * @param $value
     * @param $data
     * @return string
     */
    public function setOpenCouponsAttr($value)
    {
        return $value ? json_encode($value) : '';
    }

    /**
     * 优惠券数组转换
     * @param $value
     * @param $data
     * @return string
     */
    public function getOpenCouponsAttr($value)
    {
        return $value ? json_decode($value, 1) : [];
    }

    /**
     * 关联会员卡表
     */
    public function card()
    {
        return $this->belongsTo('app\\common\\model\\user\\Card', 'card_id', 'card_id');
    }

    /**
     * 关联会员表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 获取详情
     */
    public static function detail($order_id)
    {
        return (new static())->with(['card'])->find($order_id);
    }

    /**
     * 指定卡下是否存在用户
     */
    public static function checkExistByRecordId($card_id)
    {
        $model = new static;
        return !!$model->where('card_id', '=', (int)$card_id)->count();
    }

    /**
     * 指定用户是否存在卡
     */
    public static function checkExistByUserId($user_id, $order_id = 0)
    {
        $model = new static;
        if ($order_id) {
            $model = $model->where('order_id', '<>', $order_id);
        }
        return $model->where('is_delete', '=', 0)
            ->where('pay_status', '=', 20)
            ->where('user_id', '=', $user_id)
            ->where(function ($query) {
                $query->where('expire_time', '=', 0)->whereOr('expire_time', '>', time());
            })
            ->count();
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
     * @return string
     */
    public function tradeNo()
    {
        return OrderService::createTradeNo();
    }
}