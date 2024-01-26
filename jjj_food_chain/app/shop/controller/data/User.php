<?php

namespace app\shop\controller\data;

use app\shop\controller\Controller;
use app\shop\model\user\Grade;
use app\shop\model\user\User as UserModel;

/**
 * 用户数据控制器
 */
class User extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/data.user/lists")
     * @Apidoc\Param("keyword", type="string", require=false, default="", desc="昵称/手机号/ID")
     * @ApiDoc\Param("gender", type="int", require=false, default="", desc="性别 0=女 1=男 2=未知")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\User\getList", desc="列表")
     */
    public function lists()
    {
        $model = new UserModel();
        $params = $this->postData();
        $list = $model->getList($params);
        $GradeModel = new Grade();
        $grade = $GradeModel->getLists();
        return $this->renderSuccess('', compact('list', 'grade'));
    }
}
