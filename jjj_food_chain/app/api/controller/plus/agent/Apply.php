<?php

namespace app\api\controller\plus\agent;

use app\api\controller\Controller;
use app\api\model\plus\agent\Apply as AgentApplyModel;
use  app\common\model\plus\agent\Setting;
use app\common\exception\BaseException;

/**
 * 分销商申请
 */
class Apply extends Controller
{
    // 当前用户
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();   // 用户信息
    }

    /**
     * 提交分销商申请
     */
    public function submit()
    {
        $data = $this->postData();
        if (empty($data['name']) || empty($data['mobile'])) {
            throw new BaseException(['msg' => '用户名或者手机号为空']);
        }
        $model = new AgentApplyModel;
        if ($model->submit($this->user, $data)) {
            return $this->renderSuccess('成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /*
     *获取分销商协议
     */
    public function getAgreement()
    {
        $model = new Setting();
        $data = $model->getItem('license');
        return $this->renderSuccess('', compact('data'));
    }

}