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

    /**
     * 创建交班记录
     *
     * @param array $params
     * @return bool
     */
    public function shiftLog($params): bool
    {
        $shop_user_id = $params['shop_user_id'] ?? 0;
        $cash_taken_out = $params['cash_taken_out'] ?? 0;
        $cash_left = $params['cash_left'] ?? 0;
        //
        $shopUserModel = new User;
        $shopUser = $shopUserModel->where('shop_user_id', '=', $shop_user_id)->where('cashier_online', '=', 1)->find();
        if (!$shopUser) {
            $this->error = '收银员不存在或未交班';
            return false;
        }
        //
        $orderModel = new OrderModel;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $orderModel = $orderModel->where('a.shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        $startTime = strtotime(date('Y-m-d')); // 今天
        $endTime = $startTime + 86399;
        if ($startTime && $endTime) {
            $orderModel = $orderModel->where('a.create_time', 'between', [$startTime, $endTime]);
        }
        $orderModel = $orderModel->alias('a')
            ->where('a.pay_status', '=', 20)
            ->where('a.order_status', '=', 30)
            ->where('a.eat_type', '<>', 0)
            ->where('a.cashier_id', '=', $shop_user_id);
        // 上一班遗留备用金
        $lastRecord = $this->order('id', 'desc')->find();
        $previous_shift_cash = $lastRecord ? $lastRecord->cash_left : 0;
        // 当前钱箱现金总计(现金收入+上一班遗留备用金)
        $cash_income = (clone $orderModel)->where('pay_type', 10)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? 0;
        if ($cash_taken_out > $cash_income) {
            $this->error = '本班取出現金不能大于当前钱箱现金总额';
            return false;
        }
        if ($cash_left > $cash_income) {
            $this->error = '本班遗留备用金不能大于当前钱箱现金总额';
            return false;
        }
        // todo 对接打印机
        $is_printed = $this->print() ?? 0;
        $this->startTrans();
        try {
            $this->save([
                'shift_user_id' => $params['shop_user_id'] ?? 0, // 交班人id
                'shift_no' => generateNumber(), // 交班编号
                'previous_shift_cash' => $previous_shift_cash, // 上一班遗留备用金
                'current_cash_total' => $previous_shift_cash + $cash_income, // 当前钱箱现金总计(现金收入+上一班遗留备用金)
                'cash_income' => $cash_income, // 现金收入
                'balance_income' => (clone $orderModel)->where('pay_type', 40)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? 0, // 余额收入
                'wechat_income' => (clone $orderModel)->where('pay_type', 50)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? 0, // 微信收入
                'alipay_income' => (clone $orderModel)->where('pay_type', 60)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? 0, // 支付宝收入
                'refund_amount' => number_format((clone $orderModel)->sum("refund_money"), 2, '.', '') ?? 0, // 退款金额
                'cash_taken_out' => $cash_taken_out, // 本班取出现金
                'cash_left' => $cash_left, // 本班遗留备用金
                'is_printed' => $is_printed, // 是否打印 0-未打印 1-已打印
                'remark' => $params['remark'] ?? '', // 备注
                'app_id' => self::$app_id,
                'shop_supplier_id' => $params['shop_supplier_id'] ?? 0,
                'shift_start_time' => $shopUser->cashier_login_time,
                'shift_end_time' => time(),
                'create_time' => time(),
                'update_time' => time()
            ]);
            // 更新收银员在线状态
            $shopUser->update(['cashier_online' => 0, 'cashier_login_time' => 0]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 打印
     *
     * @return bool
     */
    public function print()
    {
        return true;
    }
}
