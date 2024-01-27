<?php

namespace app\shop\model\plus\driver;

use app\common\model\plus\driver\Apply as ApplyModel;
use app\common\service\order\OrderRefundService;
use app\common\model\plus\driver\DepositOrder;

/**
 * 配送员入驻申请模型
 */
class Apply extends ApplyModel
{
    /**
     * 获取配送员申请列表
     */
    public function getList($search)
    {
        $model = $this->alias('apply')
            ->with(['user'])
            ->field('apply.*, user.nickName')
            ->join('user', 'user.user_id = apply.user_id')
            ->order(['apply.create_time' => 'desc']);
        if (!empty($search['nick_name'])) {
            $model = $model->like('user.nickName|apply.real_name|apply.mobile', $search['nick_name']);
        }
        // 获取列表数据
        $list = $model->paginate($search);
        return $list;
    }

    /**
     * 配送员入驻审核
     * @param $data
     * @return bool
     */
    public function submit($data)
    {
        if ($this['cash_open'] == 1 && $this['deposit_money'] > 0 && $this['is_pay'] == 10) {
            $this->error = '未支付押金';
            return false;
        }
        if ($data['apply_status'] == 30 && empty($data['reject_reason'])) {
            $this->error = '请填写驳回原因';
            return false;
        }
        $this->startTrans();
        try {
            if ($data['apply_status'] == 20) {
                $userInfo = User::where('user_id', '=', $data['user_id'])->find();
                if ($userInfo) {
                    User::where('user_id', '=', $data['user_id'])->update([
                        'real_name' => $data['real_name'],
                        'mobile' => $data['mobile'],
                        'identfy_card' => $data['identfy_card'],
                        'deposit_money' => $data['deposit_money']
                    ]);
                } else {
                    // 新增配送员用户
                    User::add($data['user_id'], [
                        'real_name' => $data['real_name'],
                        'mobile' => $data['mobile'],
                        'deposit_money' => $data['deposit_money'],
                        'identfy_card' => $data['identfy_card']
                    ]);
                }
            }
            $save_data = [
                'audit_time' => time(),
                'apply_status' => $data['apply_status'],
                'reject_reason' => $data['reject_reason'],
            ];
            $this->save($save_data);
            //存在押金退款
            if ($data['apply_status'] == 30 && $data['deposit_money'] > 0) {
                $order = DepositOrder::where('user_id', '=', $data['user_id'])
                    ->where('pay_status', '=', 20)
                    ->where('is_refund', '=', 0)
                    ->order('order_id desc')
                    ->find();
                if ($order) {
                    $order = $order->toArray();
                }
                $orders = $order;
                unset($orders['pay_type']);
                $orders['pay_type']['value'] = $order['pay_type'];
                $order && (new OrderRefundService)->execute($orders, $data['deposit_money']);
                (new DepositOrder)->where('order_id', '=', $order['order_id'])->update(['is_refund' => 1]);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

}