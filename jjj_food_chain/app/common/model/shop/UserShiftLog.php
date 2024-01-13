<?php

namespace app\common\model\shop;

use app\common\model\BaseModel;
use app\common\model\order\Order as OrderModel;

/**
 * 用户交班记录模型
 */
class UserShiftLog extends BaseModel
{

    protected $name = 'shop_user_shift_log';
    protected $pk = 'shift_user_id';

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\shop\\User', 'shop_user_id', 'shift_user_id');
    }

    /**
     * 获取列表记录
     */
    public function getList(int $shopSupplierId = 0)
    {
        return $this->withoutGlobalScope()->where('shop_supplier_id', $shopSupplierId)->select();
    }

    // 创建交班记录
    public static function shiftLog($params)
    {
        $model = new OrderModel;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $model = $model->where('a.shop_supplier_id', '=', $params['shop_supplier_id']);
        }

        //今天
        $startTime = strtotime(date('Y-m-d'));
        $endTime = $startTime + 86399;
        if ($startTime && $endTime) {
            $model = $model->where('a.create_time', 'between', [$startTime, $endTime]);
        }

        $model = $model->alias('a')
            ->leftJoin('order_product rp','a.order_id = rp.order_id')
            ->leftJoin('product p','p.product_id = rp.product_id')
            ->leftJoin('category c','c.category_id = p.category_id')
            ->where('a.pay_status', '=', 20)
            ->where('a.order_status', '=', 30)
            ->where('a.eat_type', '<>', 0);

        $lastRecord = UserShiftLog::orderBy('id', 'desc')->find();
        $previous_shift_cash = $lastRecord ? $lastRecord->cash_left : 0;

        static::save([
            'shift_user_id' => $params['shift_user_id'], // 交班人id
            'previous_shift_cash' => $previous_shift_cash, // 上一班遗留备用金
            'current_cash_total' => 0, // 当前钱箱现金总计
            'cash_income' => (clone $model)->where('pay_type', 10)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'], // 现金收入
            'balance_income' => (clone $model)->where('pay_type', 40)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'], // 余额收入
            'wechat_income' => (clone $model)->where('pay_type', 50)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] , // 微信收入
            'alipay_income' => (clone $model)->where('pay_type', 60)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'], // 支付宝收入
            'refund_amount' => number_format((clone $model)->sum("refund_money"), 2, '.', ''), // 退款金额
            'cash_taken_out' => $params['cash_taken_out'], // 本班取出现金
            'cash_left' => $params['cash_left'], // 本班遗留备用金
            'is_printed' => $params['is_printed'], // 是否打印 0-未打印 1-已打印
            'remark' => $params['remark'], // 备注
            'app_id' => $params['app_id'],
            'shop_supplier_id' => $params['shop_supplier_id'],
            'shift_time' => time(),
            'create_time' => time(),
            'update_time' => time()
        ]);
    }
}
