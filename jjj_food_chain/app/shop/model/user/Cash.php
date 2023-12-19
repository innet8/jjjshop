<?php

namespace app\shop\model\user;

use app\common\model\settings\Setting as SettingModel;
use app\common\library\easywechat\AppWx;
use app\common\library\easywechat\AppMp;
use app\common\model\app\App as AppModel;
use app\common\model\app\AppMp as AppMpModel;
use app\common\model\app\AppOpen as AppOpenModel;
use app\common\model\app\AppWx as AppWxModel;
use app\common\service\order\OrderService;
use app\common\library\easywechat\WxPay;
use app\common\model\user\Cash as CashModel;
use app\shop\model\user\User as UserModel;
use app\shop\service\order\ExportService;
use app\common\model\user\BalanceLog as BalanceLogModel;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;

/**
 * 余额提现明细模型
 */
class Cash extends CashModel
{
    /**
     * 获取器：申请时间
     */
    public function getAuditTimeAttr($value)
    {
        return $value > 0 ? date('Y-m-d H:i:s', $value) : '--';
    }

    /**
     * 获取器：打款方式
     */
    public function getPayTypeAttr($value)
    {
        return ['text' => $this->payType[$value], 'value' => $value];
    }

    /**
     * 获取提现列表
     */
    public function getList($user_id = null, $apply_status = -1, $pay_type = -1, $search = '')
    {
        $model = $this;
        // 构建查询规则
        $model = $model->alias('cash')
            ->with(['user'])
            ->field('cash.*, user.nickName, user.avatarUrl')
            ->join('user user', 'user.user_id = cash.user_id')
            ->order(['cash.create_time' => 'desc']);
        // 查询条件
        if ($user_id > 0) {
            $model = $model->where('cash.user_id', '=', $user_id);
        }
        if (!empty($search)) {
            $model = $model->where('user.nickName|user.mobile', 'like', '%' . $search . '%');
        }
        if ($apply_status > 0) {
            $model = $model->where('cash.apply_status', '=', $apply_status);
        }
        if ($pay_type > 0) {
            $model = $model->where('cash.pay_type', '=', $pay_type);
        }
        // 获取列表数据
        return $model->paginate(15);
    }

    /**
     * 提现审核
     */
    public function submit($param)
    {
        $data = ['apply_status' => $param['apply_status']];
        if ($param['apply_status'] == 30) {
            $data['reject_reason'] = $param['reject_reason'];
        }
        // 更新申请记录
        $data['audit_time'] = time();
        self::update($data, ['id' => $param['id']]);
        // 提现驳回：解冻余额
        if ($param['apply_status'] == 30) {
            User::backFreezeMoney($param['user_id'], $param['money']);
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
            self::update($data, ['id' => $this['id']]);

            // 更新累积提现
            User::totalMoney($this['user_id'], $this['money']);
            //添加余额记录
            BalanceLogModel::add(BalanceLogSceneEnum::CASH, [
                'user_id' => $this['user_id'],
                'money' => -$this['money'],
                'app_id' => self::$app_id,
            ], '');
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
     * 商家转账到零钱
     */
    public function wechatPay()
    {
        // 微信用户信息
        $user = UserModel::detail($this['user_id']);
        // 生成付款订单号
        $orderNO = OrderService::createOrderNo();
        // 付款描述
        $desc = '余额提现付款';
        // 微信支付api：企业付款到零钱
        $open_id = '';
        $app_id = '';
        if ($user['reg_source'] == 'mp') {
            $open_id = $user['mpopen_id'];
            $wxConfig = AppMpModel::getAppMpCache($app_id);
            $app_id = $wxConfig['mpapp_id'];
        } else if ($user['reg_source'] == 'wx') {
            $open_id = $user['open_id'];
            $wxConfig = AppWxModel::getAppWxCache($app_id);
            $app_id = $wxConfig['wxapp_id'];
        } else if ($user['reg_source'] == 'app') {
            $open_id = $user['appopen_id'];
            $wxConfig = AppOpenModel::getAppOpenCache($app_id);
            $app_id = $wxConfig['openapp_id'];
        }

        if ($open_id == '') {
            $this->error = '未找到用户open_id';
            return false;
        }
        $wxPay = new WxPay(null);
        $user_name = $wxPay->getEncrypt($user['real_name'], $user['app_id']);
        $pars = [];
        $pars['appid'] = $app_id;//直连商户的appid
        $pars['out_batch_no'] = 'sjzz' . date('Ymd') . mt_rand(1000, 9999);//商户系统内部的商家批次单号，要求此参数只能由数字、大小写字母组成，在商户系统内部唯一
        $pars['batch_name'] = $desc;//该笔批量转账的名称
        $pars['batch_remark'] = $desc;//转账说明，UTF8编码，最多允许32个字符
        $pars['total_amount'] = intval($this['real_money'] * 100);//转账总金额 单位为“分”
        $pars['total_num'] = 1;//转账总笔数
        $pars['transfer_detail_list'][0] = [
            'out_detail_no' => 'Dh' . $orderNO,
            'transfer_amount' => $pars['total_amount'],
            'transfer_remark' => $desc,
            'openid' => $open_id,
            'user_name' => $user_name
        ];//转账明细列表
        //获取token
        $res = $wxPay->wechatTrans($pars, $user['app_id']);
        $resArr = json_decode($res, true);
        if (isset($resArr['batch_id'])) {
            $this->save([
                'batch_id' => $resArr['batch_id']
            ]);
            // 确认打款
            $this->money();
            return true;
        } else {
            $this->error = $resArr['message'];
            return false;
        }
    }

    /*
     *统计提现总数量
     */
    public function getUserCashTotal()
    {
        return $this->where('apply_status', '=', 10)->count();
    }

    /*
    *统计提现总数量
    */
    public function getUserApplyTotal()
    {
        return $this->where('apply_status', '=', '10')->count();
    }

    /**
     * 导出用户余额提现
     */
    public function exportList($user_id = null, $apply_status = -1, $pay_type = -1, $search = '')
    {
        $model = $this;
        // 构建查询规则
        $model = $model->alias('cash')
            ->with(['user'])
            ->field('cash.*, user.nickName, user.avatarUrl,user.mobile')
            ->join('user user', 'user.user_id = cash.user_id')
            ->order(['cash.create_time' => 'desc']);
        // 查询条件
        if ($user_id > 0) {
            $model = $model->where('cash.user_id', '=', $user_id);
        }
        if (!empty($search)) {
            $model = $model->where('user.nickName|user.mobile', 'like', '%' . $search . '%');
        }
        if ($apply_status > 0) {
            $model = $model->where('cash.apply_status', '=', $apply_status);
        }
        if ($pay_type > 0) {
            $model = $model->where('cash.pay_type', '=', $pay_type);
        }
        // 获取列表数据
        $list = $model->select();
        // 导出excel文件
        (new Exportservice)->userCashList($list);

    }
}