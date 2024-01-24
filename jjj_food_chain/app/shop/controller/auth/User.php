<?php

namespace app\shop\controller\auth;

use app\shop\model\shop\Access as AccessModel;
use app\common\model\settings\Setting as SettingModel;
use app\shop\controller\Controller;
use app\shop\model\auth\User as UserModel;
use app\shop\model\auth\Role;
use app\shop\model\auth\User as AuthUserModel;
use hg\apidoc\annotation as Apidoc;

 /**
 * 用户管理
 * @Apidoc\Group("shop_user")
 * @Apidoc\Sort(8)
 */
class User extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.user/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\auth\User\getList", desc="管理员列表")
     * @Apidoc\Returned("roleList", type="array", ref="app\shop\model\auth\Role\getTreeData", desc="角色列表")
     */
    public function index()
    {
        $model = new UserModel();
        $list = $model->getList($this->postData());
        $roleModel = new Role();
        // 角色列表
        $roleList = $roleModel->getTreeData();
        return $this->renderSuccess('', compact('list', 'roleList'));
    }

    /**
     * 新增信息
     * @return \think\response\Json
     */
    public function addInfo()
    {
        $model = new Role();
        // 角色列表
        $roleList = $model->getTreeData();
        return $this->renderSuccess('', compact('roleList'));
    }

    /**
     * @Apidoc\Title("新增")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.user/add")
     * @Apidoc\Param("user_name", type="string", require=true, default="001", desc="用户名")
     * @Apidoc\Param("role_id", type="array", require=true, desc="角色ids")
     * @Apidoc\Param("password", type="string", require=true, default="123456", desc="密码")
     * @Apidoc\Param("confirm_password", type="string", require=true, default="123456", desc="确认密码")
     * @Apidoc\Param("real_name", type="string", require=true, desc="真实姓名")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->postData();
        $model = new UserModel();
        $username = $data['user_name'] ?? '';
        $password = $data['password'] ?? '';
        // 用户名是否为4-16位纯数字
        if (!validateNumber($username)) {
            return $this->renderError('用户名必须为4-16位纯数字');
        }
        // 密码是否为4-16位纯数字
        if (!validateNumber($password)) {
            return $this->renderError('密码必须为4-16位纯数字');
        }
        // 姓名
        if (empty($data['real_name'])) {
            return $this->renderError('请输入姓名');
        }
        $num = $model->getUserName(['user_name' => $username]);
        if ($num > 0) {
            return $this->renderError('用户名已存在');
        }
        if (!isset($data['role_id']) || empty($data['role_id'])) {
            return $this->renderError('请选择所属角色');
        }
        if ($data['confirm_password'] != $password) {
            return $this->renderError('确认密码和登录密码不一致');
        }
        $model = new UserModel();
        if ($model->add($data, $this->store['user'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 修改信息
     * @param $shop_user_id
     * @return \think\response\Json
     */
    public function editInfo($shop_user_id)
    {
        $info = UserModel::detail(['shop_user_id' => $shop_user_id], ['UserRole']);

        $role_arr = array_column($info->toArray()['UserRole'], 'role_id');

        $model = new Role();
        // 角色列表
        $roleList = $model->getTreeData();
        return $this->renderSuccess('', compact('info', 'roleList', 'role_arr'));
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.user/edit")
     * @Apidoc\Param("shop_user_id", type="int", require=true, desc="管理员id")
     * @Apidoc\Param("user_name", type="string", require=true, default="001", desc="用户名")
     * @Apidoc\Param("role_id", type="array", require=true, desc="角色ids")
     * @Apidoc\Param("password", type="string", require=true, default="123456", desc="密码")
     * @Apidoc\Param("confirm_password", type="string", require=true, default="123456", desc="确认密码")
     * @Apidoc\Param("real_name", type="string", require=true, desc="真实姓名")
     * @Apidoc\Returned()
     */
    public function edit($shop_user_id)
    {
        $data = $this->postData();
        if ($this->request->isGet()) {
            return $this->editInfo($shop_user_id);
        }
        $username = $data['user_name'] ?? '';
        $password = $data['password'] ?? '';
        $model = new UserModel();
        // 用户名是否为4-16位纯数字
        if (!validateNumber($username)) {
            return $this->renderError('用户名必须为4-16位纯数字');
        }
        // 密码是否为4-16位纯数字
        if (!empty($password) && !validateNumber($password)) {
            return $this->renderError('密码必须为4-16位纯数字');
        }
        // 姓名
        if (empty($data['real_name'])) {
            return $this->renderError('请输入姓名');
        }
        $num = $model->getUserName(['user_name' => $username], $data['shop_user_id']);
        if ($num > 0) {
            return $this->renderError('用户名已存在');
        }
        if (!isset($data['role_id'])) {
            return $this->renderError('请选择所属角色');
        }
        if (isset($password) && !empty($password)) {
            if (!isset($data['confirm_password'])) {
                return $this->renderError('请输入确认密码');
            } else {
                if ($data['confirm_password'] != $password) {
                    return $this->renderError('确认密码和登录密码不一致');
                }
            }
        }
        if (empty($password)) {
            if (isset($data['confirm_password']) && !empty($data['confirm_password'])) {
                return $this->renderError('请输入登录密码');
            }
        }

        // 更新记录
        if ($model->edit($data)) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');


    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.user/delete")
     * @Apidoc\Param("shop_user_id", type="int", require=true, desc="管理员id")
     * @Apidoc\Returned()
     */
    public function delete($shop_user_id)
    {
        $model = new UserModel();
        if ($model->del($shop_user_id, $this->store['user'])) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }

    /**
     * 获取角色菜单信息
     */
    public function getRoleList()
    {
        $user = $this->store['user'];
        $supplier = $this->store['supplier'];
        $menus = [];
        $user_info = AuthUserModel::find($user['shop_user_id']);

        if ($user_info['is_super'] == 1) {
            $model = new AccessModel();
            $menus = $model->getList($user['user_type'], $supplier);
        } else {
            $model = new AccessModel();
            $menus = $model->getListByUser($user['shop_user_id'], $user['user_type'], $supplier);

            foreach ($menus as $key => $val) {
                if (!isset($val['children'][0]['path'])) {
                    continue;
                }
                if ($val['redirect_name'] != $val['children'][0]['path']) {
                    $menus[$key]['redirect_name'] = $menus[$key]['children'][0]['path'];
                }
            }
        }
        $menus = $model->formatShopMenu($menus);
        return $this->renderSuccess('', compact('menus'));
    }

    /**
     * 获取用户信息
     */
    public function getUserInfo()
    {
        $store = session('jjjshop_store');
        $user = [];
        if (!empty($store)) {
            $user = $store['user'];
        }
        // 商城名称
        $shop_name = SettingModel::getItem('store')['name'];
        //当前系统版本
        $version = get_version();
        //门店名称
        $supplier_name = $store['supplier']['name'];
        return $this->renderSuccess('', compact('supplier_name', 'user', 'shop_name', 'version'));
    }

    /**
     * @Apidoc\Title("权限状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.user/setStatus")
     * @Apidoc\Param("shop_user_id", type="int", require=true, desc="管理员id")
     * @Apidoc\Param("status", type="int", require=true, desc="状态")
     * @Apidoc\Returned()
     */
    public function setStatus($shop_user_id, $status)
    {
        if (in_array($status, [0, 1]) === false) {
            return $this->renderError('状态参数错误');
        }
        $model = UserModel::detail($shop_user_id);
        if (!$model) {
            return $this->renderError('用户不存在');
        }
        if ($model->setStatus($status)) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }
}
