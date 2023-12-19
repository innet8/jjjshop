<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\Apply as ApplyModel;
use app\common\model\plus\driver\Refund as RefundModel;

/**
 * 配送员申请模型
 */
class Apply extends ApplyModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'create_time',
        'update_time',
    ];

    /**
     * 是否为配送员申请中
     */
    public static function isApplying($user_id)
    {
        $detail = self::detail(['user_id' => $user_id]);
        return $detail ? ((int)$detail['apply_status']['value'] === 10) : false;
    }

    /**
     * 提交申请
     */
    public function submit($user, $data)
    {
        //判断是否已申请
        $applyStatus = $this->applyStatus($user);
        if ($applyStatus != 0) {
            $this->error = '已申请，请勿重复申请';
            return false;
        }
        // 成为配送员条件
        $config = Setting::getItem('condition');
        $cash_open = Setting::getItem('basic')['cash_open'];
        //判断手机号码是否存在
        $phoneExist = $this->where('mobile', '=', $data['mobile'])
            ->where('apply_status', 'in', [10, 20])
            ->count();
        if ($phoneExist) {
            $this->error = '手机号已存在';
            return false;
        }
        //判断身份证是否存在    
        $idExist = $this->where('identfy_card', '=', $data['identfy_card'])
            ->where('apply_status', 'in', [10, 20])
            ->count();
        if ($idExist) {
            $this->error = '身份证号码已存在';
            return false;
        }
        $data = [
            'user_id' => $user['user_id'],
            'real_name' => trim($data['name']),
            'mobile' => trim($data['mobile']),
            'apply_type' => $config['become'],
            'identfy_card' => $data['identfy_card'],
            'apply_time' => time(),
            'app_id' => self::$app_id,
        ];
        if ($config['become'] == 10) {
            $data['apply_status'] = 10;
        } elseif ($config['become'] == 20) {
            $data['apply_status'] = 20;
        }
        $data['cash_open'] = $cash_open;
        return $this->add($user, $data);
    }

    /**
     * 更新配送员申请信息
     */
    private function add($user, $data)
    {
        // 实例化模型
        $model = $this;
        $take_cash = Setting::getItem('basic')['take_cash'];
        // 更新记录
        $this->startTrans();
        try {
            $data['cash_open'] == 1 && $data['deposit_money'] = $take_cash;
            // 保存申请信息
            $model->save($data);
            // 无需审核，自动通过
            if ($data['apply_type'] == 20 && ($data['cash_open'] == 0 || $take_cash <= 0)) {
                // 新增分销商用户记录
                User::add($user['user_id'], [
                    'real_name' => $data['real_name'],
                    'mobile' => $data['mobile'],
                    'identfy_card' => $data['identfy_card'],
                ]);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    //配送员申请状态
    public function applyStatus($user)
    {
        $apply = $this->where(['user_id' => $user['user_id']])->order('create_time desc')->find();
        $agentUser = User::where(['user_id' => $user['user_id'], 'is_delete' => 0])->find();
        $status = 0;
        if ($apply) {
            //待审核
            if (($apply['apply_status']['value'] == 10 && $apply['cash_open'] == 0) || ($apply['apply_status']['value'] == 10 && $apply['cash_open'] == 1 && $apply['deposit_money'] > 0 && $apply['is_pay'] == 20)) {
                $status = 1;
            } else if ($agentUser) {//通过
                $status = 2;
            } else if (($apply['apply_status']['value'] == 20 || $apply['apply_status']['value'] == 10) && $apply['cash_open'] == 1 && $apply['deposit_money'] > 0 && $apply['is_pay'] == 10) {//待交押金
                $status = 3;
            } else if ($apply['apply_status']['value'] == 30) {
                $status = 0;
            }
        }
        return $status;
    }

    //退出状态
    public function refundStatus($user)
    {
        $refund = RefundModel::where(['user_id' => $user['user_id']])->order('refund_id desc')->find();
        $agentUser = User::where(['user_id' => $user['user_id'], 'is_delete' => 0])->find();
        if ($refund) {
            if ($refund['apply_status']['value'] == 10 && $agentUser['status'] == 1) {//待审核
                $status = 1;
            } else if ($refund['apply_status']['value'] == 20 && $agentUser['status'] == 1) {//通过
                $status = 2;
            } else {
                $status = 0;
            }
        } else {//未申请
            $status = 0;
        }
        return $status;
    }

    //获取申请信息
    public function getApplyInfo($user)
    {
        return $this->where('apply_status', '<>', 30)
            ->where('user_id', '=', $user['user_id'])
            ->order('apply_id desc')->find();
    }
}
