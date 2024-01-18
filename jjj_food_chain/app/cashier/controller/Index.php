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
        $currency = SettingModel::getItem('currency');
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
}