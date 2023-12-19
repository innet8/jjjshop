<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\user\Cash as CashModel;
use app\api\model\settings\Setting as SettingModel;

/**
 * 用户余额提现
 */
class Cash extends Controller
{
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        // 用户信息
        $this->user = $this->getUser();
    }

    /**
     * 提现数据
     */
    public function index()
    {
        $cash_ratio = SettingModel::getItem('balance_cash')['cash_ratio'];
        $balance = $this->user['balance'];
        $real_name = $this->user['real_name'];
        return $this->renderSuccess('', compact('cash_ratio', 'balance', 'real_name'));
    }

    /**
     * 提交提现申请
     */
    public function submit($data)
    {
        $formData = json_decode(htmlspecialchars_decode($data), true);
        $model = new CashModel;
        if ($model->submit($this->user, $formData)) {
            return $this->renderSuccess('申请提现成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 余额提现明细
     */
    public function lists($status = -1)
    {

        $model = new CashModel;
        return $this->renderSuccess('', [
            // 提现明细列表
            'list' => $model->getList($this->user['user_id'], (int)$status, $this->postData()),
        ]);
    }

}