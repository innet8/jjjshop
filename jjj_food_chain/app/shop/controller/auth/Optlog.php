<?php

namespace app\shop\controller\auth;

use app\shop\controller\Controller;
use app\shop\model\shop\OptLog as OptLogModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 操作日志
 * @Apidoc\Group("shop_user")
 * @Apidoc\Sort(8)
 */
class Optlog extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.optlog/index")
     * @Apidoc\Param("username", type="string", require=true, default="", desc="用户名")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\shop\OptLog\getList", desc="操作日志列表")
     */
    public function index()
    {
        $model = new OptLogModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}