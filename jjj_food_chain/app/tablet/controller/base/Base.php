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
     */
    public function getInfo()
    {
        $detail = (new SupplierModel)->withoutGlobalScope()->where('is_delete', '=', 0)->find();
        return $this->renderSuccess('基础信息', $detail);
    }

    /**
     * @Apidoc\Title("语言获取")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/lang")
     * @Apidoc\Returned()
     */
    public function lang()
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'], $this->table['app_id'] ?? 0);
        $lang['language'] = $tablet['language'];
        $lang['default_language'] = $tablet['default_language'];
        return $this->renderSuccess('请求成功', $lang);
    }

    /**
     * @Apidoc\Title("首页广告")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/tablet/base.base/ad")
     * @Apidoc\Returned()
     */
    public function ad()
    {
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'], $this->table['app_id'] ?? 0);
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
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'], $this->table['app_id'] ?? 0);
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
        $tablet = SettingModel::getSupplierItem('tablet', $this->table['shop_supplier_id'], $this->table['app_id'] ?? 0);
        $tablet['server']['ip'] = $ip;
        $tablet['server']['port'] = $port;
        SettingModel::updateSetting('tablet', $tablet, $this->table['shop_supplier_id']);
        return $this->renderSuccess('设置成功');
    }
}
