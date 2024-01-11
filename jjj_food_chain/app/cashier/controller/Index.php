<?php

namespace app\cashier\controller;

use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 首页
 */
class Index extends Controller
{
    /**
     * @Apidoc\Title("首页")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/index")
     * @Apidoc\Returned()
     */
    public function index()
    {
        $user = $this->cashier;
        return $this->renderSuccess('', compact('user'));
    }

    /**
     * @Apidoc\Title("登录数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/base")
     * @Apidoc\Returned()
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