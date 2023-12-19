<?php

namespace app\api\model\plus\driver;

use app\common\exception\BaseException;
use app\common\model\plus\driver\Cash as CashModel;

/**
 * 配送员提现明细模型
 */
class Cash extends CashModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'update_time',
    ];

    /**
     * 获取分销商提现明细
     */
    public function getList($user_id, $apply_status = -1,$limit=15)
    {
        $model = $this;
        $apply_status > -1 && $model = $model->where('apply_status', '=', $apply_status);
        return $model->where('user_id', '=', $user_id)->order(['create_time' => 'desc'])
            ->paginate($limit, false, [
                'query' => \request()->request()
            ]);
    }

    /**
     * 提交申请
     */
    public function submit($driver, $data)
    {
        // 数据验证
        $this->validation($driver, $data);
        // 新增申请记录
        $this->save(array_merge($data, [
            'user_id' => $driver['user_id'],
            'apply_status' => 10,
            'app_id' => self::$app_id,
        ]));
        // 冻结用户资金
        $driver->freezeMoney($data['money']);
        return true;
    }

    /**
     * 数据验证
     */
    private function validation($driver, $data)
    {
        // 结算设置
        $settlement = Setting::getItem('settlement');
        // 最低提现佣金
        if ($data['money'] <= 0) {
            throw new BaseException(['msg' => '提现金额不正确']);
        }
        if ($driver['money'] <= 0) {
            throw new BaseException(['msg' => '当前用户没有可提现佣金']);
        }
        if ($data['money'] > $driver['money']) {
            throw new BaseException(['msg' => '提现金额不能大于可提现佣金']);
        }
        if ($data['money'] < $settlement['min_money']) {
            throw new BaseException(['msg' => '最低提现金额为' . $settlement['min_money']]);
        }
        if (!in_array($data['pay_type'], $settlement['pay_type'])) {
            throw new BaseException(['msg' => '提现方式不正确']);
        }
        if ($data['pay_type'] == '20') {
            if (empty($data['alipay_name']) || empty($data['alipay_account'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        } elseif ($data['pay_type'] == '30') {
            if (empty($data['bank_name']) || empty($data['bank_account']) || empty($data['bank_card'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        }
    }

}