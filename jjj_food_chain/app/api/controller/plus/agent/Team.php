<?php

namespace app\api\controller\plus\agent;

use app\api\controller\Controller;
use app\api\model\plus\agent\Setting;
use app\api\model\plus\agent\User as AgentUserModel;
use app\api\model\plus\agent\Referee as RefereeModel;

/**
 * 我的团队
 */
class Team extends Controller
{
    // 用户信息
    private $user;
    // 分销商用户信息
    private $Agent;
    // 分销商设置
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
     * 我的团队列表
     */
    public function lists($level = -1)
    {
        $model = new RefereeModel;
        return $this->renderSuccess('', [
            // 分销商用户信息
            'agent' => $this->Agent,
            // 我的团队列表
            'list' => $model->getList($this->user['user_id'], (int)$level),
            // 基础设置
            'setting' => $this->setting['basic']['values'],
            // 页面文字
            'words' => $this->setting['words']['values'],
        ]);
    }

}