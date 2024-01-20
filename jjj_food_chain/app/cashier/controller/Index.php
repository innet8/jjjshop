<?php

namespace app\cashier\controller;

use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 基础信息
 * @Apidoc\Sort(2)
 * @Apidoc\Group("base")
 */
class Index extends Controller
{
    /**
     * @Apidoc\Title("基础信息")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/index")
     * @Apidoc\Returned("currency", type="object", desc="货币", children={
     *    @Apidoc\Param ("unit",type="string",desc="主单位"),
     *    @Apidoc\Param ("is_open",type="string",desc="是否开启副单位 0-关闭 1-开启"),
     *    @Apidoc\Param ("vices",type="object",desc="副单位",children={
     *       @Apidoc\Param ("vice_unit",type="string",desc="副单位"),
     *      @Apidoc\Param ("unit_rate",type="float",desc="副单位比例"),
     *   }),
     * })
     */
    public function index()
    {
        $user = $this->cashier;
        // 货币信息
        $currency = SettingModel::getSupplierItem('currency', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $user['currency'] = [
            'unit' => $currency['unit'],
            'is_open' => $currency['is_open'],
            'vices' => [
                'vice_unit' => $currency['vice_unit'],
                'unit_rate' => $currency['unit_rate'],
            ],
        ];
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

    /**
     * @Apidoc\Title("语言获取")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/lang")
     * @Apidoc\Returned()
     */
    public function lang()
    {
        $cashier = SettingModel::getSupplierItem('cashier', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $lang['language'] = $cashier['language'];
        $lang['default_language'] = $cashier['default_language'];
        return $this->renderSuccess('请求成功', $lang);
    }

    /**
     * @Apidoc\Title("首页广告")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/ad")
     * @Apidoc\Returned()
     */
    public function ad()
    {
        $cashier = SettingModel::getSupplierItem('cashier', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $list = [];
        if (isset($cashier['carousel']) && !empty($cashier['carousel'])) {
            $list = $cashier['carousel'];
        }
        return $this->renderSuccess('请求成功', $list);
    }

    /**
     * @Apidoc\Title("校验钱箱密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/verifyPassword")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     * @Apidoc\Returned()
     */
    public function verifyPassword($password)
    {
        $cashier = SettingModel::getSupplierItem('cashier', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        if ($password == $cashier['cashier_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("校验高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/verifyAdvancedPassword")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     * @Apidoc\Returned()
     */
    public function verifyAdvancedPassword($password)
    {
        $cashier = SettingModel::getSupplierItem('cashier', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        if ($password == $cashier['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("设置服务连接地址")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/setServer")
     * @Apidoc\Param("ip", type="string", require=true, desc="ip地址")
     * @Apidoc\Param("port", type="string", require=true, desc="端口号")
     * @Apidoc\Returned()
     */
    public function setServer($ip, $port)
    {
        $cashier = SettingModel::getSupplierItem('cashier', $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $cashier['server']['ip'] = $ip;
        $cashier['server']['port'] = $port;
        SettingModel::updateSetting('cashier', $cashier, $this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }
}