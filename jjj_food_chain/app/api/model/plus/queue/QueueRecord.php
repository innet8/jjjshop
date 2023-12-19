<?php


namespace app\api\model\plus\queue;

use app\api\model\plus\queue\QueueSetting as QueueSettingModel;
use app\common\model\plus\queue\QueueRecord as QueueRecordModel;
use app\common\service\order\OrderPrinterService;
use app\api\model\supplier\Supplier as SupplierModel;

/**
 * 排队取号记录模型
 */
class QueueRecord extends QueueRecordModel
{
    //添加取号记录
    public function take($param, $user)
    {
        try {
            $param['user_id'] = $user['user_id'];
            $param['app_id'] = self::$app_id;
            //查询今日订单号
            $beginToday = strtotime(date('Y-m-d'));
            $num = $this->where('create_time', '>=', $beginToday)->count();
            if ($num > 0) {
                $queue_no = 'A' . $this->createNo($num + 1);
            } else {
                $queue_no = "A0001";
            }
            $param['queue_no'] = $queue_no;
            // 号码打印
            $setting = (new QueueSetting())::detail($param['shop_supplier_id']);
            if ($setting && $setting['is_print'] && $setting['printer_id']) {
                $supplier = SupplierModel::detail($param['shop_supplier_id']);
                $param['name'] = $supplier['name'];
                $param['wait_num'] = (new QueueRecord())
                    ->where('shop_supplier_id', '=', $param['shop_supplier_id'])
                    ->where('status', '=', 10)
                    ->count();
                (new OrderPrinterService)->printQueueTicket($param, $setting['printer_id']);
            }
            $this->save($param);
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 我的取号
     */
    public function myTake($param, $user)
    {
        //查询今日取号
        $beginToday = strtotime(date('Y-m-d'));
        $detail = $this->alias('r')
            ->join('queue_table t', 't.table_id=r.table_id')
            ->where('r.create_time', '>=', $beginToday)
            ->where('r.user_id', '=', $user['user_id'])
            ->where('r.shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('r.status', '=', 10)
            ->where('r.create_time', '>=', $beginToday)
            ->field('r.*,t.table_name')
            ->find();
        if ($detail) {
            $detail['mobile'] = substr($detail['mobile'], 0, 3) . '****' . substr($detail['mobile'], -4);
            //等待桌数
            $detail['wait_num'] = (new QueueRecord())
                ->where('create_time', '>=', $beginToday)
                ->where('shop_supplier_id', '=', $param['shop_supplier_id'])
                ->where('status', '=', 10)
                ->where('table_id', '=', $detail['table_id'])
                ->where('record_id', '<', $detail['record_id'])
                ->count();
            //等待时长
            $detail['wait_time'] = (new QueueRecord())->alias('r')
                ->where('r.create_time', '>=', $beginToday)
                ->join('queue_table t', 't.table_id=r.table_id')
                ->where('r.shop_supplier_id', '=', $param['shop_supplier_id'])
                ->where('r.status', '=', 10)
                ->where('r.record_id', '<', $detail['record_id'])
                ->where('r.table_id', '=', $detail['table_id'])
                ->sum('wait_time');
            //已等待时长
            $detail['await_time'] = round((time() - strtotime($detail['create_time'])) / 60, 0);
        }
        return $detail;
    }

    /**
     * 取消取号
     */
    public function cancel($param, $user)
    {
        //取消今日取号
        $beginToday = strtotime(date('Y-m-d'));
        return $this->where('create_time', '>=', $beginToday)
            ->where('user_id', '=', $user['user_id'])
            ->where('shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('status', '=', 10)
            ->where('create_time', '>=', $beginToday)
            ->update(['status' => 40]);
    }

    /**
     * 获取列表数据
     */
    public function getList($params, $user)
    {
        $model = $this;
        // 查询列表数据
        return $model->where('shop_supplier_id', '=', $params['shop_supplier_id'])
            ->where('user_id', '=', $user['user_id'])
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    public function createNo($num)
    {
        if ($num < 10) {
            $num = '000' . $num;
        }
        if ($num >= 10 && $num < 100) {
            $num = '00' . $num;
        }
        if ($num >= 100 && $num < 1000) {
            $num = '0' . $num;
        }
        if ($num >= 1000 && $num < 10000) {
            $num = '0' . $num;
        }
        if ($num >= 10000 && $num < 100000) {
            $num = '0' . $num;
        }
        if ($num >= 100000 && $num < 1000000) {
            $num = '0' . $num;
        }
        return $num;
    }
}