<?php

namespace app\api\controller\plus\agent;

use app\api\controller\Controller;
use app\api\model\plus\agent\Setting;
use app\api\model\plus\agent\User as AgentUserModel;
use app\api\model\plus\agent\Cash as CashModel;

/**
 * 分销商提现
 */
class Cash extends Controller
{
    private $user;

    private $Agent;
    private $setting;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        // 用户信息
        $this->user = $this->getUser();
        // 分销商用户信息
        $this->Agent = AgentUserModel::detail($this->user['user_id']);
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
        if ($model->submit($this->Agent, $formData)) {
            return $this->renderSuccess('申请提现成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 分销商提现明细
     */
    public function lists($status = -1)
    {

        $model = new CashModel;
        return $this->renderSuccess('', [
            // 提现明细列表
            'list' => $model->getList($this->user['user_id'], (int)$status,$this->postData()),
            // 页面文字
            'words' => $this->setting['words']['values'],
        ]);
    }

}