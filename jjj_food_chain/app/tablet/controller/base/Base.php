<?php

namespace app\tablet\controller\base;

use app\tablet\controller\Controller;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;


/**
 * 基础
 */
class Base extends Controller
{
    /**
     * @Apidoc\Title("基础信息")
     * @Apidoc\Desc("基础信息")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/tablet/base.base/getInfo")
     * @Apidoc\Returned("detail.tablet", type="object", desc="平板端设置", children={
     *    @Apidoc\Param ("carousel",type="array",desc="轮播内容url（图片 + 视频）"),
     *    @Apidoc\Param ("is_call_service",type="string",desc="是否开启呼叫服务员 0-关闭 1-开启"),
     *    @Apidoc\Param ("is_customer_order",type="string",desc="是否开启顾客自助下单 0-关闭 1-开启"),
     *    @Apidoc\Param ("is_show_sold_out",type="string",desc="是否显示售罄商品 0-关闭 1-开启"),
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
        $detail = (new SupplierModel)->withoutGlobalScope()->where('is_delete', '=', 0)->find();
        // 平板端设置
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        unset($tablet['advanced_password']);
        unset($tablet['language_list']);
        $detail['tablet'] = $tablet;
        return $this->renderSuccess('基础信息', $detail);
    }

    /**
     * @Apidoc\Title("语言获取（废弃）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/lang")
     * @Apidoc\Returned()
     */
    public function lang()
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        $lang['language'] = $tablet['language'];
        $lang['default_language'] = $tablet['default_language'];
        return $this->renderSuccess('请求成功', $lang);
    }

    /**
     * @Apidoc\Title("首页广告（废弃）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/ad")
     * @Apidoc\Returned()
     */
    public function ad()
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        $list = [];
        if (isset($tablet['carousel']) && !empty($tablet['carousel'])) {
            $list = $tablet['carousel'];
        }
        return $this->renderSuccess('请求成功', $list);
    }

    /**
     * @Apidoc\Title("校验高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/verifyPassword")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     * @Apidoc\Returned()
     */
    public function verifyPassword($password)
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        if ($password == $tablet['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("设置服务连接地址")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/setServer")
     * @Apidoc\Param("ip", type="string", require=true, desc="ip地址")
     * @Apidoc\Param("port", type="string", require=true, desc="端口号")
     * @Apidoc\Returned()
     */
    public function setServer($ip, $port)
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        $tablet['server']['ip'] = $ip;
        $tablet['server']['port'] = $port;
        SettingModel::updateSetting('tablet', $tablet, $this->table['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }
}
