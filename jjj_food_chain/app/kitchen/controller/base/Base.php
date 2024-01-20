<?php

namespace app\kitchen\controller\base;

use app\kitchen\controller\Controller;
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
     * @Apidoc\Url("/index.php/kitchen/base.base/getInfo")
     */
    public function getInfo()
    {
        $detail = (new SupplierModel)->find();
        return $this->renderSuccess('基础信息', $detail);
    }

    /**
     * @Apidoc\Title("语言获取")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/lang")
     * @Apidoc\Returned()
     */
    public function lang()
    {
        $kitchen = SettingModel::getSupplierItem('kitchen', $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
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
        $kitchen = SettingModel::getSupplierItem('kitchen', $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        if ($password == $kitchen['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("设置服务连接地址")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/kitchen/base.base/setServer")
     * @Apidoc\Param("ip", type="string", require=true, desc="ip地址")
     * @Apidoc\Param("port", type="string", require=true, desc="端口号")
     * @Apidoc\Returned()
     */
    public function setServer($ip, $port)
    {
        $kitchen = SettingModel::getSupplierItem('kitchen', $this->kitchen['shop_supplier_id'], $this->kitchen['app_id'] ?? 0);
        $kitchen['server']['ip'] = $ip;
        $kitchen['server']['port'] = $port;
        SettingModel::updateSetting('kitchen', $kitchen, $this->kitchen['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }
}
