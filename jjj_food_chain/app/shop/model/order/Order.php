<?php

namespace app\shop\model\order;

use app\common\model\order\Order as OrderModel;
use app\common\library\helper;
use app\common\enum\order\OrderTypeEnum;
use app\common\service\message\MessageService;
use app\common\service\order\OrderRefundService;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\service\product\factory\ProductFactory;
use app\common\model\plus\coupon\UserCoupon as UserCouponModel;
use app\common\model\user\User as UserModel;
use app\common\enum\settings\DeliveryTypeEnum;
use app\shop\service\order\ExportService;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderCompleteService;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 订单列表
     */
    public function getList($dataType, $data = null)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->with(['product' => ['image'], 'user', 'supplier'])
            ->order(['create_time' => 'desc'])
            ->where($this->transferDataType($dataType))
            ->paginate($data);
    }

    /**
     * 获取订单总数
     */
    public function getCount($type, $data)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->alias('order')
            ->where($this->transferDataType($type))
            ->count();
    }

    /**
     * 订单列表(全部)
     */
    public function getListAll($dataType, $query = [])
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $query);
        // 获取数据列表
        return $model->with(['product.image', 'address', 'user', 'extract'])
            ->alias('order')
            ->field('order.*')
            ->where($this->transferDataType($dataType))
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->select();
    }

    /**
     * 订单导出
     */
    public function exportList($dataType, $query)
    {
        // 获取订单列表
        $list = $this->getListAll($dataType, $query);
        // 导出excel文件
        return (new Exportservice)->orderList($list);
    }

    /**
     * 设置检索查询条件
     */
    private function setWhere($model, $data)
    {
        // 时间类型 0-全都 1-今天 2-昨天 3-周
        $startTime = 0;
        $endTime = 0;
        if (isset($data['time_type']) && $data['time_type']) {
            switch ($data['time_type'] ?? 1) {
                case '1'://今天
                    $startTime = strtotime(date('Y-m-d'));
                    $endTime = $startTime + 86399;
                    break;
                case '2'://昨天
                    $startTime = strtotime("-1 days", strtotime(date('Y-m-d')));
                    $endTime = $startTime + 86399;
                    break;
                case '3'://一周
                    $startTime = strtotime("-7 days", strtotime(date('Y-m-d')));
                    $endTime = time();
                    break;
            }
        }
        // 收银类型 0-全都 10-桌台 20-收银
        if (isset($data['order_source']) && $data['order_source']) {
            $model = $model->where('order_source', '=', $data['order_source']);
        }
        // 搜索订单号
        if (isset($data['order_no']) && $data['order_no'] != '') {
            $model = $model->like('order_no', trim($data['order_no']));
        }
        // 搜索配送方式
        if (isset($data['style_id']) && $data['style_id'] != '') {
            $model = $model->where('delivery_type', '=', $data['style_id']);
        }
        // 搜索配送方式
        if (isset($data['order_type'])) {
            $model = $model->where('order_type', '=', $data['order_type']);
        }
        // 搜索配送方式
        if (isset($data['shop_supplier_id']) && $data['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $data['shop_supplier_id']);
        }
        // 搜索时间段
        if (isset($data['date']) && is_array($data['date']) && isset($data['date'][0]) && isset($data['date'][1])) {
            $model = $model->where('create_time', 'between', [strtotime($data['date'][0]), strtotime($data['date'][1]) + 86399]);
        } else if ($data['create_time']) {
            // 开始时间 + 结束时间
            if ($data['create_time'][0] && $data['create_time'][1]) {
                $startTime = strtotime($data['create_time'][0]);
                $endTime = strtotime($data['create_time'][1]);
                if ($startTime == $endTime) {
                    $endTime = $startTime + 86399;
                }
                $model = $model->where('create_time', 'between', [$startTime, $endTime]);
            } else if ($data['create_time'][0]) {
                // 只有开始时间
                $startTime = strtotime($data['create_time'][0]);
                $model = $model->where('create_time', '>', $startTime);
            } else if ($data['create_time'][1]) {
                // 只有结束时间
                $endTime = strtotime($data['create_time'][1]);
                $model = $model->where('create_time', '<', $endTime);
            }
        } else if ($startTime && $endTime) {
            // 没有时间范围才按 time_type 查询
            $model = $model->where('create_time', 'between', [$startTime, $endTime]);
        }
        // 已送厨
        return $model;
    }

    /**
     * 转义数据类型条件
     */
    private function transferDataType($dataType)
    {
        $filter = [];
        // 订单数据类型
        switch ($dataType) {
            case 'all':
                break;
            case 'payment';
//                $filter['pay_status'] = OrderPayStatusEnum::PENDING;
//                $filter['order_status'] = 10;
//                $filter['extra_times'] = ['>', 0];
                $filter[] = ['pay_status', '=', OrderPayStatusEnum::PENDING];
                $filter[] = ['order_status', '=', 10];
                $filter[] = ['extra_times', '>', 0];
                break;
            case 'process';
//                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
////                $filter['delivery_status'] = 10;
//                $filter['order_status'] = 10;
//                $filter['extra_times'] = ['>', 0];
                $filter[] = ['pay_status', '=', OrderPayStatusEnum::SUCCESS];
                $filter[] = ['order_status', '=', 10];
                $filter[] = ['extra_times', '>', 0];
                break;
            case 'complete';
//                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
//                $filter['order_status'] = 30;
//                $filter['extra_times'] = ['>', 0];
                $filter[] = ['pay_status', '=', OrderPayStatusEnum::SUCCESS];
                $filter[] = ['order_status', '=', 30];
                $filter[] = ['extra_times', '>', 0];
                break;
            case 'cancel';
////                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
//                $filter['order_status'] = 20;
//                $filter['extra_times'] = ['>', 0];
//                $filter[] = ['pay_status', '=', OrderPayStatusEnum::SUCCESS];
                $filter[] = ['order_status', '=', 20];
                $filter[] = ['extra_times', '>', 0];
                break;
        }
        return $filter;
    }

    /**
     * 发送订单
     * @return bool
     */
    public function sendOrder($order_id)
    {
        $deliver = SettingModel::getSupplierItem('deliver', $this['supplier']['shop_supplier_id']);
        if ($this['order_status']['value'] != 10 || $this['deliver_status'] != 0) {
            $this->error = '订单已发送或已完成';
            return false;
        }
        // 开启事务
        $this->startTrans();
        try {
            $this->addOrder($deliver);
            // 实例化消息通知服务类
            $Service = new MessageService;
            // 发送消息通知
            $Service->delivery($this, OrderTypeEnum::MASTER);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 取消订单
     */
    public function orderCancel($data)
    {
        // 待付款状态才可以取消订单
        if ($this['order_status']['value'] != 10 || $this['pay_status']['value'] != 10) {
            $this->error = "订单不允许取消";
            return false;
        }

        $this->startTrans();
        try {
            // 执行退款操作
            $this['pay_type']['value'] < 40 && (new OrderRefundService)->execute($this);
            // 回退商品库存
            ProductFactory::getFactory($this['order_source'])->backProductStock($this['product'], true);
            // 回退用户优惠券
            $this['coupon_id'] > 0 && UserCouponModel::setIsUse($this['coupon_id'], false);
            // 更新订单状态
            $this->save(['order_status' => 20, 'cancel_remark' => $data['cancel_remark']]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 审核：用户取消订单
     */
    public function refund($data)
    {
        // 判断订单是否有效
        if ($this['pay_status']['value'] != 20 || $this['order_status']['value'] != 10) {
            $this->error = '该订单不合法';
            return false;
        }
        if ($data['refund_money'] + $this['refund_money'] > $this['pay_price']) {
            $this->error = '退款金额不能超过支付金额';
            return false;
        }
        // 订单取消事件
        $status = $this->transaction(function () use ($data) {
            // 执行退款操作
            $this['pay_type']['value'] < 40 && (new OrderRefundService)->execute($this, $data['refund_money']);
            $deliver = (new OrderDeliver())::detail(['order_id' => $this['order_id'], 'status' => 10]);
            if ($deliver) {
                $deliver->updateDeliver();
            }
            // 更新订单状态：已发货、已收货
            $this->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => 30,
                'refund_money' => $this['refund_money'] + $data['refund_money']
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$this], static::$app_id);
            return true;
        });
        return $status;
    }

    /**
     * 获取待处理订单
     */
    public function getReviewOrderTotal($shop_supplier_id = 0)
    {
        $model = $this;
        $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
        $filter['delivery_status'] = 10;
        $filter['order_status'] = 10;
        if ($shop_supplier_id) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        return $model->where($filter)->count();
    }

    /**
     * 获取某天的总销售额
     * 结束时间不传则查一天
     */
    public function getOrderTotalPrice($startDate, $endDate, $shop_supplier_id = 0)
    {
        $model = $this;
        $startDate && $model = $model->where('pay_time', '>=', strtotime($startDate));
        if (is_null($endDate) && $startDate) {
            $model = $model->where('pay_time', '<', strtotime($startDate) + 86400);
        } else if ($endDate) {
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }
        if ($shop_supplier_id) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0)
            ->sum('pay_price');
    }

    /**
     * 获取某天的客单价
     * 结束时间不传则查一天
     */
    public function getOrderPerPrice($startDate, $endDate = null)
    {
        $model = $this;
        $model = $model->where('pay_time', '>=', strtotime($startDate));
        if (is_null($endDate)) {
            $model = $model->where('pay_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }
        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0)
            ->avg('pay_price');
    }

    /**
     * 获取某天的下单用户数
     */
    public function getPayOrderUserTotal($day, $shop_supplier_id = 0)
    {
        $model = $this;
        $startTime = strtotime($day);
        if ($shop_supplier_id) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        $userIds = $model->distinct(true)
            ->where('pay_time', '>=', $startTime)
            ->where('pay_time', '<', $startTime + 86400)
            ->where('pay_status', '=', 20)
            ->where('is_delete', '=', 0)
            ->column('user_id');
        return count($userIds);
    }

    /**
     * 获取平台的总销售额
     */
    public function getTotalMoney($type, $is_settled = -1)
    {
        $model = $this;
        $model = $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0);
        if ($is_settled == 0) {
            $model = $model->where('is_settled', '=', 0);
        }
        if ($type == 'all') {
            return $model->sum('pay_price');
        } else if ($type == 'supplier') {
            return ($model->sum('pay_price')) - ($model->sum('refund_money'));
        } else if ($type == 'sys') {
            return $model->sum('sys_money');
        }
        return 0;
    }


}