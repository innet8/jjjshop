<?php

namespace app\kitchen\controller\base;

use app\kitchen\controller\Controller;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
use app\shop\model\auth\User as UserModel;
use app\common\model\shop\BindRecord as BindRecordModel;
use hg\apidoc\annotation as Apidoc;


/**
 * 基础
 */
class Base extends Controller
{
    /**
     * @Apidoc\Title("绑定")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/bind")
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
            'source' => BindRecordModel::SOURCE_KITCHEN,
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
     * @Apidoc\Desc("基础信息")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/kitchen/base.base/getInfo")
     * @Apidoc\Returned("currency", type="object", desc="货币", children={
     *    @Apidoc\Param ("unit",type="string",desc="主单位"),
     *    @Apidoc\Param ("is_open",type="string",desc="是否开启副单位 0-关闭 1-开启"),
     *    @Apidoc\Param ("vices",type="object",desc="副单位",children={
     *       @Apidoc\Param ("vice_unit",type="string",desc="副单位"),
     *      @Apidoc\Param ("unit_rate",type="float",desc="副单位比例"),
     *   }),
     * })
     * @Apidoc\Returned("kitchen", type="object", desc="厨显端设置", children={
     *    @Apidoc\Param ("is_wait_color",type="string",desc="是否开启等待时长颜色 0-关闭 1-开启"),
     *    @Apidoc\Param ("wait_color",type="array",desc="是时长颜色 10分钟-黄色#ffff00 20分钟-红色#ff0000"),
     *    @Apidoc\Param ("server",type="object",desc="服务器连接",children={
     *       @Apidoc\Param ("ip",type="string",desc="ip地址"),
     *      @Apidoc\Param ("port",type="float",desc="端口号"),
     *   }),
     *    @Apidoc\Param ("language",type="array",desc="常用语言，默认th, en, zh, zh-tw"),
     *    @Apidoc\Param ("default_language",type="array",desc="默认语言，默认en"),
     * })
     */
    public function getInfo()
    {
        $app = (new SupplierModel)->find();
        // 货币信息
        $currency = SettingModel::getSupplierItem(SettingEnum::CURRENCY, $this->kitchen['shop_supplier_id'], $this->kitchen['app_id']);
        $user['currency'] = [
            'unit' => $currency['unit'],
            'is_open' => $currency['is_open'],
            'vices' => [
                'vice_unit' => $currency['vice_unit'],
                'unit_rate' => $currency['unit_rate'],
            ],
        ];
        // 厨显端设置
        $kitchen = SettingModel::getSupplierItem(SettingEnum::KITCHEN, $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        unset($kitchen['advanced_password']);
        unset($kitchen['language_list']);
        $supplier['kitchen'] = $kitchen;
        return $this->renderSuccess('基础信息', compact('app', 'kitchen'));
    }

    /**
     * @Apidoc\Title("语言获取 （废弃）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/lang")
     * @Apidoc\Returned()
     */
    public function lang()
    {
        $kitchen = SettingModel::getSupplierItem(SettingEnum::KITCHEN, $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        $lang['language'] = $kitchen['language'];
        $lang['default_language'] = $kitchen['default_language'];
        return $this->renderSuccess('请求成功', $lang);
    }

    /**
     * @Apidoc\Title("校验高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/verifyAdvancedPassword")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     * @Apidoc\Returned()
     */
    public function verifyAdvancedPassword($password)
    {
        $kitchen = SettingModel::getSupplierItem(SettingEnum::KITCHEN, $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        if ($password == $kitchen['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("设置服务连接地址（废弃）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/setServer")
     * @Apidoc\Param("ip", type="string", require=true, desc="ip地址")
     * @Apidoc\Param("port", type="string", require=true, desc="端口号")
     * @Apidoc\Returned()
     */
    public function setServer($ip, $port)
    {
        $kitchen = SettingModel::getSupplierItem(SettingEnum::KITCHEN, $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        $kitchen['server']['ip'] = $ip;
        $kitchen['server']['port'] = $port;
        SettingModel::updateSetting(SettingEnum::KITCHEN, $kitchen, $this->kitchen['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }
}
