<?php

namespace app\tablet\controller\base;

use app\tablet\controller\Controller;
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
     * @Apidoc\Title("基础信息")
     * @Apidoc\Desc("基础信息")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/tablet/base.base/getInfo")
     * @Apidoc\Returned("detail.currency", type="object", desc="货币", children={
     *    @Apidoc\Param ("unit",type="string",desc="主单位"),
     *    @Apidoc\Param ("is_open",type="string",desc="是否开启副单位 0-关闭 1-开启"),
     *    @Apidoc\Param ("vices",type="object",desc="副单位",children={
     *       @Apidoc\Param ("vice_unit",type="string",desc="副单位"),
     *      @Apidoc\Param ("unit_rate",type="float",desc="副单位比例"),
     *   }),
     * })
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
        $info = SupplierModel::getTabletBaseInfo();
        return $this->renderSuccess('基础信息', $info);
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
        $tablet = SettingModel::getSupplierItem(SettingEnum::TABLET, $this->table['shop_supplier_id'] ?? 0, $this->table['app_id'] ?? 0);
        if ($password == $tablet['advanced_password']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }
}
