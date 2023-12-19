<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Cash as SupplierCashModel;
use app\shop\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\Account as SupplierAccountModel;
use app\common\exception\BaseException;

/**
 * 后台管理员登录模型
 */
class Cash extends SupplierCashModel
{
    /**
     * 获取列表数据
     */
    public function getList($params)
    {
        $model = $this;
        if ($params['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        if (isset($params['start_day']) && !empty($params['start_day'])) {
            $model = $model->where('create_time', '>=', strtotime($params['start_day']));
        }
        if (isset($params['end_day']) && !empty($params['end_day'])) {
            $model = $model->where('create_time', '<', strtotime($params['end_day']) + 86400);
        }
        // 查询列表数据
        return $model->with(['supplier', 'account'])
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 提交申请
     */
    public function apply($shop_supplier_id, $data)
    {
        $supplier = SupplierModel::detail($shop_supplier_id);
        $account = SupplierAccountModel::detail($shop_supplier_id);
        if (!$account) {
            throw new BaseException(['msg' => '请填写提现账户信息']);
        }
        // 数据验证
        $this->validation($supplier, $data, $account);
        // 新增申请记录
        $this->save(array_merge($data, [
            'shop_supplier_id' => $shop_supplier_id,
            'apply_status' => 10,
            'app_id' => self::$app_id,
        ]));
        // 冻结用户资金
        $supplier->freezeMoney($data['money']);
        return true;
    }

    /**
     * 数据验证
     */
    private function validation($supplier, $data, $account)
    {
        // 最低提现佣金
        if ($data['money'] <= 0) {
            throw new BaseException(['msg' => '提现金额不正确']);
        }
        if ($supplier['money'] <= 0) {
            throw new BaseException(['msg' => '没有可提现金额']);
        }
        if ($data['money'] > $supplier['money']) {
            throw new BaseException(['msg' => '提现金额不能大于可提现金额']);
        }
        if ($data['pay_type'] == '10') {
            if (empty($account['alipay_name']) || empty($account['alipay_account'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        } elseif ($data['pay_type'] == '20') {
            if (empty($account['bank_name']) || empty($account['bank_account']) || empty($account['bank_card'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        } else {
            throw new BaseException(['msg' => '提现方式不正确']);
        }
    }

    /**
     * 分销商提现审核
     */
    public function submit($param)
    {
        $data = ['apply_status' => $param['apply_status']];
        if ($param['apply_status'] == 30) {
            $data['reject_reason'] = $param['reject_reason'];
        }
        // 更新申请记录
        $data['audit_time'] = time();
        $this->save($data);
        // 提现驳回：解冻分销商资金
        if ($param['apply_status'] == 30) {
            SupplierModel::backFreezeMoney($this['shop_supplier_id'], $this['money']);
        }
        return true;
    }

    /**
     * 确认已打款
     */
    public function money()
    {
        $this->startTrans();
        try {
            // 更新申请状态
            $data = ['apply_status' => 40, 'audit_time' => time()];
            $this->save($data);

            // 更新分销商累积提现佣金
            SupplierModel::totalMoney($this['shop_supplier_id'], $this['money']);
            $add = [
                'shop_supplier_id' => $this['shop_supplier_id'],
                'flow_type' => 20,
                'money' => -$this['money'],
                'describe' => '提现',
                'app_id' => self::$app_id
            ];
            //添加资金明细
            (new Capital)->save($add);
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 获取申请数量
     */
    public static function getApplyCount($apply_status)
    {
        return self::where('apply_status', '=', $apply_status)->count();
    }
}