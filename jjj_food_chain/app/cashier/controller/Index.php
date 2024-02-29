<?php

namespace app\cashier\controller;

use think\facade\Cache;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\settings\SettingEnum;
use app\shop\model\auth\User as UserModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\shop\BindRecord as BindRecordModel;

/**
 * 基础信息
 * @Apidoc\Sort(2)
 * @Apidoc\Group("base")
 */
class Index extends Controller
{
    /**
     * @Apidoc\Title("绑定")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/bind")
     * @Apidoc\Param("key", type="string", require=true, desc="唯一设备标识")
     * @Apidoc\Param("address", type="string", require=true, desc="绑定地址")
     * @Apidoc\Param("port", type="string", require=true, desc="绑定端口")
     * @Apidoc\Returned("shop", type="object", desc="门店信息", children={
     *   @Apidoc\Param ("app_id",type="string",desc="商户id"),
     *   @Apidoc\Param ("shop_supplier_id",type="string",desc="商户门店id"),
     * })
     */
    public function bind()
    {
        $data = $this->postData();
        if (empty($data['key']) || empty($data['address']) || empty($data['port'])) {
            return $this->renderError('参数错误');
        }
        $shop = UserModel::getShopInfo();
        $data = array_merge($data, [
            'source' => BindRecordModel::SOURCE_CASHIER,
            'app_id' => $shop['app_id'],
            'shop_supplier_id' => $shop['shop_supplier_id'],
        ]);
        if (!BindRecordModel::add($data)) {
            return $this->renderError('绑定失败');
        }
        return $this->renderSuccess('', compact('shop'));
    }

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
     * @Apidoc\Returned("cashier", type="object", desc="收银机设置", children={
     *    @Apidoc\Param ("carousel",type="array",desc="轮播内容url（图片 + 视频）"),
     *    @Apidoc\Param ("is_auto_send",type="string",desc="收银结账自动送厨房 0-关闭 1-开启"),
     *    @Apidoc\Param ("auto_lock_screen",type="string",desc="自动锁屏（秒），默认5分钟"),
     *    @Apidoc\Param ("server",type="object",desc="服务器连接",children={
     *       @Apidoc\Param ("ip",type="string",desc="ip地址"),
     *      @Apidoc\Param ("port",type="float",desc="端口号"),
     *   }),
     *    @Apidoc\Param ("language",type="array",desc="常用语言，默认th, en, zh, zh-tw"),
     *    @Apidoc\Param ("default_language",type="array",desc="默认语言，默认en"),
     * })
     * @Apidoc\Returned("buffet", type="object", desc="自助餐设置", children={
     *    @Apidoc\Param ("is_open",type="string",desc="是否开启自助餐 0-关闭 1-开启"),
     *    @Apidoc\Param ("tablet_end_time",type="string",desc="平板结束时间提醒（分）"),
     *    @Apidoc\Param ("is_buy_continue",type="string",desc="非自助餐商品到时是否能继续选购 0-关闭 1-开启"),
     *    @Apidoc\Param ("is_add_clock",type="string",desc="是否开启加钟 0-关闭 1-开启"),
     * })
     */
    public function index()
    {
        $user = $this->cashier;
        // 货币信息
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $user['currency'] = [
            'unit' => $currency['unit'],
            'is_open' => $currency['is_open'],
            'vices' => [
                'vice_unit' => $currency['vice_unit'],
                'unit_rate' => $currency['unit_rate'],
            ],
        ];
        // 收银机设置
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        unset($cashier['cashier_password']);
        unset($cashier['advanced_password']);
        $user['cashier'] = $cashier;
        // 平板端设置
        $tablet = SettingModel::getSupplierItem(SettingEnum::TABLET, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $user['tablet']['is_show_sold_out'] = $tablet['is_show_sold_out'];
        // 自助餐设置
        $buffet = SettingModel::getSupplierItem(SettingEnum::BUFFET, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $user['buffet'] = $buffet;
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
        $shop_supplier_id = Request()->header('sid');
        if (empty($shop_supplier_id)) {
            return $this->renderError('sid不能为空');
        }
        $cashier = SettingModel::detail(SettingEnum::CASHIER, $shop_supplier_id);
        $lang['language'] = $cashier['values']['language'] ?? [];
        $lang['language_list'] = [];
        $languageList = SettingModel::getSupplierLanguage($shop_supplier_id) ?? [];
        foreach ($languageList as $language) {
            if (in_array($language['name'], $lang['language'])) {
                $language['key'] = $language['name'];
                unset($language['name']);
                $lang['language_list'][] = $language;
            }
        }
        $lang['default_language'] = $cashier['values']['default_language'] ?? '';
        return $this->renderSuccess('请求成功', $lang);
    }

    /**
     * @Apidoc\Title("收银机/副屏广告")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/ad")
     * @Apidoc\Param("appid", type="string", require=true, desc="appid-从header传递")
     * @Apidoc\Param("sid", type="string", require=true, desc="sid-从header传递")
     * @Apidoc\Returned()
     */
    public function ad()
    {
        $appid = Request()->header('appid');
        $shop_supplier_id = Request()->header('sid');
        if (empty($appid)) {
            return $this->renderError('appid不能为空');
        }
        if (empty($shop_supplier_id)) {
            return $this->renderError('sid不能为空');
        }
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $shop_supplier_id, $appid);
        $list = [];
        if ($cashier && isset($cashier['carousel']) && !empty($cashier['carousel'])) {
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
        if (empty($password)) {
            return $this->renderError('请输入密码');
        }
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
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
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        if ($password == $cashier['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("设置服务连接地址（废除）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/setServer")
     * @Apidoc\Param("ip", type="string", require=true, desc="ip地址")
     * @Apidoc\Param("port", type="string", require=true, desc="端口号")
     * @Apidoc\Returned()
     */
    public function setServer($ip, $port)
    {
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $this->cashier['user']['shop_supplier_id'], $this->cashier['user']['app_id']);
        $cashier['server']['ip'] = $ip;
        $cashier['server']['port'] = $port;
        SettingModel::updateSetting(SettingEnum::CASHIER, $cashier, $this->cashier['user']['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }

    /**
     * @Apidoc\Title("获取打印数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/index/printData")
     * @Apidoc\Returned()
     */
    public function printData()
    {
        return $this->renderSuccess('', Cache::pull("printer_data_cache") ?: []);
    }
}