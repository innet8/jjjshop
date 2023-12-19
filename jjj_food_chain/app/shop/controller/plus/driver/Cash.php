<?php

namespace app\shop\controller\plus\driver;

use app\shop\controller\Controller;
use app\shop\model\plus\driver\Cash as CashModel;

/**
 * 提现申请制器
 */
class Cash extends Controller
{
    /**
     * 提现记录列表
     */
    public function index($user_id = null, $apply_status = -1, $pay_type = -1, $search = '')
    {
        $model = new CashModel;
        $list = $model->getList($user_id, $apply_status, $pay_type, $search);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 提现审核
     */
    public function submit($id)
    {
        $model = CashModel::detail($id);
        if ($model->submit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 确认打款
     */
    public function money($id)
    {
        $model = CashModel::detail($id);

        if ($model->money()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 分销商提现：微信支付企业付款
     */
    public function wechat_pay($id)
    {
        $model = CashModel::detail($id);
        if ($model->wechatPay()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}