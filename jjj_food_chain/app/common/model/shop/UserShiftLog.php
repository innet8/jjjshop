<?php

namespace app\common\model\shop;

use think\facade\Cache;
use app\common\library\helper;
use app\common\model\BaseModel;
use app\common\model\store\PayType;
use app\shop\model\product\Category;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\model\order\Order as OrderModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderHandoverPrinterService;
/**
 * 用户交班记录模型
 */
class UserShiftLog extends BaseModel
{

    protected $name = 'shop_user_shift_log';
    protected $pk = 'id';


    /**
    *  设置incomes配置
    */
    public function setIncomesAttr($value)
    {
        return $value ? json_encode($value) : '';
    }

    /**
    *  获取incomes 配置
    */
    public function getIncomesAttr($value, $data)
    {
        $value= $value ? json_decode($value,true) : [];
        if ($value) {
            foreach ($value as $key => $v) {
                $value[$key]['pay_type_name'] = OrderPayTypeEnum::data($v['pay_type'])['name'];
            }
        }
        return $value;
    }

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\shop\\User', 'shift_user_id', 'shop_user_id');
    }

    /**
     * 获取列表记录
     */
    public function getList($params)
    {
        $username = $params['user_name'] ?? '';
        $userId = $params['user_id'] ?? 0;
        $startTime = isset($params['date'][0]) ? strtotime($params['date'][0]) : 0;
        $endTime = isset($params['date'][1]) ? strtotime($params['date'][1]) : 0;
        $model = $this;
        $model = $model->alias('a')->leftJoin('shop_user su','a.shift_user_id = su.shop_user_id');

        if ($username) {
            $model = $model->where(function ($q) use ($username) {
                $q->where('su.user_name', 'like', '%' . $username . '%');
                $q->whereOr('su.real_name', 'like', '%' . $username . '%');
            });
        }

        if ($userId) {
            $model = $model->where('a.shift_user_id', '=', $userId);
        }

        if ($startTime && $endTime) {
            $model = $model->where('a.create_time', 'between', [$startTime, $endTime]);
        }

        $orderSort = ['a.create_time' => 'desc'];
        $list = $model->with('user')
            ->order($orderSort)
            ->paginate($params);
        foreach ($list as &$item) {
            // 时间处理
            $item['shift_start_time'] = $item['shift_start_time'] ? format_time_his($item['shift_start_time']) : '-';
            $item['shift_end_time'] = $item['shift_end_time'] ? format_time_his($item['shift_end_time']) : '-';
        }
        return $list;
    }

    /**
     * 获取详情
     */
    public function detail($id)
    {
        $detail = $this->with('user')->find($id);
        return $detail;
    }

    /**
     * 获取销售信息
     */
    public function getSalesInfo($shift_user_id, $shop_user_id, $startTime, $endTime)
    {
        $datas = OrderModel::alias('a')
            ->leftJoin('order_product rp','a.order_id = rp.order_id')
            ->leftJoin('product p','p.product_id = rp.product_id')
            ->leftJoin('category c','c.category_id = p.category_id')
            ->where('a.pay_status', '=',  OrderPayStatusEnum::SUCCESS)
            ->where('a.order_status', '=', OrderStatusEnum::COMPLETED)
            ->where('a.eat_type', '<>', 0)
            ->where('a.shop_supplier_id', '=', $shop_user_id)
            ->where('a.cashier_id', '=', $shift_user_id)
            ->where('a.create_time', 'between', [$startTime, $endTime])
            ->group("c.category_id")
            ->field("c.name, count(a.order_id) as sales, sum(a.pay_price - a.refund_money) as prices")
            ->select()
            ->append([])?->toArray();
        //
        foreach ($datas as $key => $data){
            $datas[$key]['name_text'] = Category::getNameTextAttr($data['name'] ?: '');
        }
        //
        return $datas;
    }

    /**
     * 获取交班信息
     *
     * @param array $params
     * @return bool
     */
    public function getShiftInfo($params): array
    {
        $shop_user_id = $params['shop_user_id'] ?? 0;
        //
        $shopUserModel = new User;
        $shopUser = $shopUserModel->where('shop_user_id', '=', $shop_user_id)->find();
        //
        $orderModel = new OrderModel;
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $orderModel = $orderModel->where('a.shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        $startTime = $shopUser->cashier_login_time;
        $endTime = time();
        if ($startTime && $endTime) {
            $orderModel = $orderModel->where('a.create_time', 'between', [$startTime, $endTime]);
        }
        $orderModel = $orderModel->alias('a')
            ->where('a.pay_status', '=', OrderPayStatusEnum::SUCCESS)
            ->where('a.order_status', '=', OrderStatusEnum::COMPLETED)
            ->where('a.eat_type', '<>', 0)
            ->where('a.cashier_id', '=', $shop_user_id);
        // 上一班遗留备用金
        $lastRecord = $this->order('id', 'desc')->find();
        $previous_shift_cash = $lastRecord ? $lastRecord->cash_left : 0;
        // 当前钱箱现金总计(现金收入+上一班遗留备用金)
        $cash_income = (clone $orderModel)->where('pay_type', 10)->field("sum(pay_price - refund_money) as price")->find()->append([])['price'] ?? 0;
        //
        $incomes = [];
        $payTypes = PayType::getEnableListAll($shop_user_id, self::$app_id);
        $totalIncome = 0;
        foreach ($payTypes as $payType){
            $value = (clone $orderModel)
                ->where('pay_type', $payType['value'])
                ->field("sum(pay_price - refund_money) as price")
                ->find()
                ->append([])['price'] ?? 0;
            if ($value > 0) {
                $totalIncome = helper::bcadd($totalIncome, $value);
                $incomes[] = [
                    'pay_type' => $payType['value'],
                    'pay_type_name' => OrderPayTypeEnum::data($payType['value'])['name'],
                    'price' => $value,
                ];
            }
        }
        //
        $totalIncome = number_format($totalIncome, 2);
        return [
            'shift_user_id' => $params['shop_user_id'] ?? 0, // 交班人id
            'shift_no' => generateNumber(), // 交班编号
            'previous_shift_cash' => $previous_shift_cash, // 上一班遗留备用金
            'current_cash_total' => number_format($previous_shift_cash + $cash_income, 2), // 当前钱箱现金总计(现金收入+上一班遗留备用金)
            'incomes' => $incomes,
            'total_income' => $totalIncome,
            'refund_amount' => number_format((clone $orderModel)->sum("refund_money"), 2, '.', '') ?? 0, // 退款金额
            'cash_taken_out' => '0.00', // 本班取出现金
            'cash_left' => '0.00', // 本班遗留备用金
            'remark' => $params['remark'] ?? '', // 备注
            'shop_supplier_id' => $params['shop_supplier_id'] ?? 0,
        ];
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
        $startTime = $shopUser->cashier_login_time;
        $endTime = time();
        if ($startTime && $endTime) {
            $orderModel = $orderModel->where('a.create_time', 'between', [$startTime, $endTime]);
        }
        $orderModel = $orderModel->alias('a')
            ->where('a.pay_status', '=', OrderPayStatusEnum::SUCCESS)
            ->where('a.order_status', '=', OrderStatusEnum::COMPLETED)
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
        $this->startTrans();
        try {
            //
            $incomes = [];
            $payTypes = PayType::getEnableListAll($shop_user_id, self::$app_id);
            $totalIncome = 0;
            foreach ($payTypes as $payType){
                $value = (clone $orderModel)
                    ->where('pay_type', $payType['value'])
                    ->field("sum(pay_price - refund_money) as price")
                    ->find()
                    ->append([])['price'] ?? 0;
                if ($value > 0) {
                    $totalIncome = helper::bcadd($totalIncome, $value);
                    $incomes[] = [
                        'pay_type' => $payType['value'],
                        'price' => $value,
                    ];
                }
            }
            //
            $data = [
                'shift_user_id' => $params['shop_user_id'] ?? 0, // 交班人id
                'shift_no' => generateNumber(), // 交班编号
                'previous_shift_cash' => $previous_shift_cash, // 上一班遗留备用金
                'current_cash_total' => $previous_shift_cash + $cash_income, // 当前钱箱现金总计(现金收入+上一班遗留备用金)
                'incomes' => $incomes,
                'total_income' => $totalIncome,
                'refund_amount' => number_format((clone $orderModel)->sum("refund_money"), 2, '.', '') ?? 0, // 退款金额
                'cash_taken_out' => $cash_taken_out, // 本班取出现金
                'cash_left' => $cash_left, // 本班遗留备用金
                'is_printed' => 0, // 是否打印 0-未打印 1-已打印
                'remark' => $params['remark'] ?? '', // 备注
                'app_id' => self::$app_id,
                'shop_supplier_id' => $params['shop_supplier_id'] ?? 0,
                'shift_start_time' => $shopUser->cashier_login_time,
                'shift_end_time' => time(),
                'create_time' => time(),
                'update_time' => time()
            ];
            $this->save($data);
            // 更新收银员在线状态
            $shopUser->update(['cashier_online' => 0, 'cashier_login_time' => 0]);
            $this->commit();
            // 打印
            $printerConfig = SettingModel::getSupplierItem('printer', $this->shop_supplier_id, $this->app_id);
            $res = (new OrderHandoverPrinterService)->cashierPrint($printerConfig, $this);
            // 语言缓存，用于打印
            Cache::set('language_' . $this->shop_supplier_id . '_' . $this->app_id, checkDetect(), 86400);
            if ($res) {
                $this->is_printed = 1;
                $this->save();
            }
            //
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }
}
