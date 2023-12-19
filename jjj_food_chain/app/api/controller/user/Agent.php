<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\plus\agent\Referee;
use app\api\model\plus\agent\Setting;
use app\api\model\plus\agent\User as AgentUserModel;
use app\api\model\plus\agent\Apply as AgentApplyModel;
use app\api\model\settings\Message as MessageModel;

/**
 * 分销中心
 */
class Agent extends Controller
{
    // 用户
    private $user;
    // 分销商
    private $agent;
    // 分销设置
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
        $this->agent = AgentUserModel::detail($this->user['user_id']);
        // 分销商设置
        $this->setting = Setting::getAll();
    }

    /**
     * 分销商中心
     */
    public function center()
    {
        return $this->renderSuccess('', [
            // 当前是否为分销商
            'is_agent' => $this->isAgentUser(),
            // 当前是否在申请中
            'is_applying' => AgentApplyModel::isApplying($this->user['user_id']),
            // 当前用户信息
            'user' => $this->user,
            // 分销商用户信息
            'agent' => $this->agent,
            // 背景图
            'background' => $this->setting['background']['values']['index'],
            // 页面文字
            'words' => $this->setting['words']['values'],
        ]);
    }

    /**
     * 分销商申请状态
     */
    public function apply($referee_id = null, $platform= '')
    {
        // 推荐人昵称
        $referee_name = '平台';
        // 如果之前有关联分销商，则继续关联之前的分销商
        $has_referee_id = Referee::getRefereeUserId($this->user['user_id'], 1);
        if($has_referee_id > 0){
            $referee_id = $has_referee_id;
        }
        if ($referee_id > 0 && ($referee = AgentUserModel::detail($referee_id))) {
            $referee_name = $referee['user']['nickName'];
        }

        return $this->renderSuccess('', [
            // 当前是否为分销商
            'is_agent' => $this->isAgentUser(),
            // 当前是否在申请中
            'is_applying' => AgentApplyModel::isApplying($this->user['user_id']),
            // 推荐人昵称
            'referee_name' => $referee_name,
            // 背景图
            'background' => $this->setting['background']['values']['apply'],
            // 页面文字
            'words' => $this->setting['words']['values'],
            // 申请协议
            'license' => $this->setting['license']['values']['license'],
            // 如果来源是小程序, 则获取小程序订阅消息id.获取售后通知.
            'template_arr' => MessageModel::getMessageByNameArr($platform, ['agent_apply_user']),
        ]);
    }

    /**
     * 分销商提现信息
     */
    public function cash($platform = '')
    {
        // 如果来源是小程序, 则获取小程序订阅消息id.获取售后通知.
        $template_arr = MessageModel::getMessageByNameArr($platform, ['agent_cash_user']);
        return $this->renderSuccess('', [
            // 分销商用户信息
            'agent' => $this->agent,
            // 结算设置
            'settlement' => $this->setting['settlement']['values'],
            // 背景图
            'background' => $this->setting['background']['values']['cash_apply'],
            // 页面文字
            'words' => $this->setting['words']['values'],
            // 小程序消息
            'template_arr' => $template_arr
        ]);
    }

    /**
     * 当前用户是否为分销商
     */
    private function isAgentUser()
    {
        return !!$this->agent && !$this->agent['is_delete'];
    }

}