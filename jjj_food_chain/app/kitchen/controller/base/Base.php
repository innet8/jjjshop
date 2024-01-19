<?php

namespace app\kitchen\controller\base;

use app\kitchen\controller\Controller;
use app\common\model\supplier\Supplier as SupplierModel;
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
     * @Apidoc\Title("验证密码")
     * @Apidoc\Desc("验证密码")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/kitchen/base.base/verifyPassword")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     */
    public function verifyPassword($password)
    {
        $detail = (new SupplierModel)->find();
        if ($password == $detail['shop_supplier_id']) {
            return $this->renderSuccess('验证成功');
        }
        return $this->renderError('验证失败');
    }

    /**
     * @Apidoc\Title("首页广告")
     * @Apidoc\Desc("首页广告")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/kitchen/base.base/ad")
     */
    public function ad()
    {
        $list = [
            [
                'name' => 'ad_1',
                'url' => 'https://www.baidu.com/'
            ],
            [
                'name' => 'ad_2',
                'url' => 'https://www.baidu.com/'
            ]
        ];
        return $this->renderSuccess('请求成功', $list);
    }
}
