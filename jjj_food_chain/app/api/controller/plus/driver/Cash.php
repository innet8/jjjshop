<?php

namespace app\api\controller\plus\driver;

use app\api\controller\Controller;
use app\api\model\plus\driver\Setting;
use app\api\model\plus\driver\User as DriverUserModel;
use app\api\model\plus\driver\Cash as CashModel;
use app\api\model\plus\driver\Capital as CapitalModel;

/**
 * 配送员提现
 */
class Cash extends Controller
{
    private $user;

    private $Driver;
    private $setting;

    /**
     * 构造方法
     */
    public function initialize()
    {
        // 用户信息
        $this->user = $this->getUser();
        // 分销商用户信息
        $this->Driver = DriverUserModel::detail($this->user['user_id']);
        // 分销商设置
        $this->setting = Setting::getAll();
    }

    /**
     * 提交提现申请
     */
    public function submit($data)
    {
        $formData = json_decode(htmlspecialchars_decode($data), true);

        $model = new CashModel;
        if ($model->submit($this->Driver, $formData)) {
            return $this->renderSuccess('申请提现成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 配送员提现明细
     */
    public function lists($status = -1)
    {

        $model = new CashModel;
        return $this->renderSuccess('', [
            // 提现明细列表
            'list' => $model->getList($this->user['user_id'], (int)$status, $this->postData()),
        ]);
    }

    /**
     * 收益明细
     */
    public function incomelists()
    {

        $model = new CapitalModel;
        return $this->renderSuccess('', [
            // 收益明细列表
            'list' => $model->getList($this->user['user_id'], $this->postData()),
        ]);
    }

}