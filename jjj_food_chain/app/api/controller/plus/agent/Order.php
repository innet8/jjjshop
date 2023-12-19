<?php

namespace app\api\controller\plus\agent;

use app\api\controller\Controller;
use app\api\model\plus\agent\Setting;
use app\api\model\plus\agent\User as AgentUserModel;
use app\api\model\plus\agent\Order as OrderModel;

/**
 * 分销商订单
 */
class Order extends Controller
{
    // 当前用户
    protected $user;
    // 分销商用户信息
    protected $Agent;
    // 分销商设置
    protected $setting;

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
     * 分销商订单列表
     */
    public function lists($settled = -1)
    {
        $model = new OrderModel;
        return $this->renderSuccess('', [
            // 提现明细列表
            'list' => $model->getList($this->user['user_id'], (int)$settled),
            // 页面文字
            'words' => $this->setting['words']['values'],
        ]);
    }

}