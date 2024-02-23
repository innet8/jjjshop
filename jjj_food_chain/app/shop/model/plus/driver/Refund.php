<?php

namespace app\shop\model\plus\driver;

use app\common\model\plus\driver\Refund as RefundModel;
use app\common\model\plus\driver\DepositOrder as DepositOrderModel;

/**
 * 分配送员退出申请模型
 */
class Refund extends RefundModel
{
    /**
     * 获取分销商申请列表
     */
    public function getList($search)
    {
        $model = $this->alias('apply')
            ->with(['driverUser'])
            ->field('apply.*, user.nickName, user.avatarUrl')
            ->join('user', 'user.user_id = apply.user_id')
            ->order(['apply.create_time' => 'desc']);
        if (isset($search['nick_name']) && $search['nick_name'] != '') {
            $model = $model->like('user.nickName|apply.real_name|apply.mobile', $search['nick_name']);
        }

        // 获取列表数据
        return $model->paginate($search['list_rows'], false, [
            'query' => \request()->request()
        ]);
    }

    /**
     * 配送员退出审核
     * @param $data
     * @return bool
     */
    public function submit($data)
    {
        if ($data['apply_status'] == '30' && empty($data['reject_reason'])) {
            $this->error = '请填写驳回原因';
            return false;
        }
        $this->startTrans();
        try {
            $user = User::detail($data['user_id']);
            if ($data['apply_status'] == '20' && $data['deposit_money'] > 0) {
                DepositOrderModel::where('user_id', '=', $this['user_id'])
                    ->where('is_refund', '=', 0)
                    ->where('pay_status', '=', 20)
                    ->update(['is_refund' => 1]);
                //存在押金退到个人账户
                $user->save([
                    'money' => $data['deposit_money'] + $user['money'],
                    'all_money' => $data['deposit_money'] + $user['all_money'],
                    'deposit_money' => 0,
                ]);
                // 记录分销商资金明细
                Capital::add([
                    'user_id' => $data['user_id'],
                    'flow_type' => 10,
                    'money' => $data['deposit_money'],
                    'describe' => '退押金收入',
                    'app_id' => $data['app_id'],
                ]);
            }
            $save_data = [
                'audit_time' => time(),
                'apply_status' => $data['apply_status'],
                'reject_reason' => $data['reject_reason'],
            ];
            $this->save($save_data);
            if ($data['apply_status'] == '30') {
                $user->save(['status' => 0]);
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