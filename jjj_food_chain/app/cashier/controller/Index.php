<?php

namespace app\cashier\controller;

use app\common\model\settings\Setting as SettingModel;

/**
 * 后台首页控制器
 */
class Index extends Controller
{
    /**
     * 后台首页
     */
    public function index()
    {
        $user = $this->cashier;
        return $this->renderSuccess('', compact('user'));
    }

    /**
     * 登录数据
     */
    public function base()
    {
        $config = SettingModel::getSysConfig();
        $settings = [
            'cashier_name' => isset($config['cashier_name']) && $config['cashier_name'] ? $config['cashier_name'] : '收银台',
            'cashier_bg_img' => isset($config['cashier_bg_img']) ? $config['cashier_bg_img'] : ''
        ];
        return $this->renderSuccess('', compact('settings'));
    }
}