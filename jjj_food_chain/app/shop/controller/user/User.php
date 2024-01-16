<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\user\User as UserModel;
use app\shop\model\user\Grade;
use hg\apidoc\annotation as Apidoc;

 /**
 * 会员管理
 * @Apidoc\Group("user")
 * @Apidoc\Sort(5)
 */
class User extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/index")
     * @Apidoc\Param("keyword", type="string", require=false, default="", desc="昵称/手机号/ID")
     * @Apidoc\Param("grade_id", type="int", require=false, default="", desc="等级id")
     * @Apidoc\Param("reg_date", type="array", require=false, default="", desc="注册时间")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\User\getList", desc="列表")
     */
    public function index()
    {
        $list = UserModel::getList($this->postData());
        $GradeModel = new Grade();
        $grade = $GradeModel->getLists();
        return $this->renderSuccess('', compact('list', 'grade'));
    }

    /**
     * @Apidoc\Title("删除用户")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/delete")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户id")
     * @Apidoc\Returned()
     */
    public function delete($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        if ($model && $model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * @Apidoc\Title("添加用户")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/add")
     * @Apidoc\Param("nick_name", type="string", require=true, default="", desc="昵称")
     * @Apidoc\Param("gender", type="int", require=true, desc="性别")
     * @Apidoc\Param("grade_id", type="int", require=true, desc="等级id")
     * @Apidoc\Param("mobile", type="string", require=true, default="", desc="手机号")
     * @Apidoc\Param("password", type="string", require=true, default="", desc="密码")
     * @Apidoc\Param("birthday", type="string", require=true, default="", desc="生日")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new UserModel;
        // 新增记录
        if ($model->add($this->request->param())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("用户充值")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/recharge")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户id")
     * @Apidoc\Param("source", type="int", require=true, default="", desc="充值方式 0-余额 1-积分")
     * @Apidoc\Param("params", type="array", require=true, default="", desc="充值参数", children={
     *    @Apidoc\Param("balance", type="array", require=true, default="", desc="充值金额", children={
     *     @Apidoc\Param("mode", type="string", require=true, default="", desc="充值方式 inc-增加 dec-减少 final-最终金额"),
     *     @Apidoc\Param("money", type="float", require=true, default="", desc="充值金额"),
     *     @Apidoc\Param("remark", type="string", require=true, default="", desc="备注"),
     *  }),
     *   @Apidoc\Param("points", type="array", require=true, default="", desc="充值积分", children={
     *    @Apidoc\Param("mode", type="string", require=true, default="", desc="充值方式 inc-增加 dec-减少 final-最终金额"),
     *    @Apidoc\Param("money", type="float", require=true, default="", desc="充值金额"),
     *    @Apidoc\Param("remark", type="string", require=true, default="", desc="备注"),
     * }),
     * })
     * @Apidoc\Returned()
     */
    public function recharge($user_id, $source)
    {
        // 用户详情
        $model = UserModel::detail($user_id);

        if ($model->recharge($this->store['user']['user_name'], $source, $this->postData('params'))) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("会员等级")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/grade")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户id")
     * @Apidoc\Param("grade_id", type="int", require=true, default="", desc="等级id")
     * @Apidoc\Param("remark", type="string", require=true, default="", desc="备注")
     * @Apidoc\Returned()
     */
    public function grade($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        // 修改记录
        if ($model->updateGrade($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * @Apidoc\Title("编辑用户")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.user/edit")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户id")
     * @Apidoc\Param("nick_name", type="string", require=true, default="", desc="昵称")
     * @Apidoc\Param("gender", type="int", require=true, desc="性别")
     * @Apidoc\Param("grade_id", type="int", require=true, desc="等级id")
     * @Apidoc\Param("mobile", type="string", require=true, default="", desc="手机号")
     * @Apidoc\Param("password", type="string", require=true, default="", desc="密码")
     * @Apidoc\Param("birthday", type="string", require=true, default="", desc="生日")
     * @Apidoc\Returned()
     */
    public function edit($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('model'));
        }
        // 修改记录
        if ($model->editUser($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }
}
