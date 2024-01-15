<?php

namespace app\shop\controller\auth;

use app\shop\controller\Controller;
use app\shop\model\auth\Role as RoleModel;
use app\shop\model\shop\Access as AccessModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 角色管理
 * @Apidoc\Group("shop_user")
 * @Apidoc\Sort(8)
 */
class Role extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Url ("/index.php/shop/auth.role/index")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\auth\Role\getTreeData", desc="角色列表")
     */
    public function index()
    {
        $model = new RoleModel();
        $list = $model->getTreeData();
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 新增get数据
     */
    public function addInfo()
    {
        $menu = (new AccessModel())->getList($this->store['user']['user_type'], $this->store['supplier']);
        $model = new RoleModel();
        // 角色列表
        $roleList = $model->getTreeData();
        return $this->renderSuccess('', compact('menu', 'roleList'));
    }

    /**
     * @Apidoc\Title("新增")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.role/add")
     * @Apidoc\Param("params", type="object", require=true, desc="角色数据")
     * @Apidoc\Param("params.role_name", type="string", require=true, desc="角色名称")
     * @Apidoc\Param("params.sort", type="integer", require=true, desc="排序")
     * @Apidoc\Param("params.access_id", type="array", require=true, desc="权限id数组")
     * @Apidoc\Returned()
     */
    public function add()
    {
        if ($this->request->isGet()) {
            $menu = (new AccessModel())->getList($this->store['user']['user_type'], $this->store['supplier']);
            return $this->renderSuccess('', compact('menu'));
        }
        $data = json_decode($this->postData()['params'], true);
        $model = new RoleModel();
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 修改get数据
     */
    public function editInfo($role_id)
    {
        $menu = (new AccessModel())->getList($this->store['user']['user_type'], $this->store['supplier']);
        $model = RoleModel::detail($role_id);
        $select_menu = array_column($model->toArray()['access'], 'access_id');
        // 角色列表
        $roleList = $model->getTreeData();
        return $this->renderSuccess('', compact('model', 'roleList', 'menu', 'select_menu'));
    }

    /**
     * @Apidoc\Title("修改")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.role/edit")
     * @Apidoc\Param("role_id", type="int", require=true, desc="角色id")
     * @Apidoc\Param("params", type="object", require=true, desc="角色数据")
     * @Apidoc\Param("params.role_name", type="string", require=true, desc="角色名称")
     * @Apidoc\Param("params.sort", type="integer", require=true, desc="排序")
     * @Apidoc\Param("params.access_id", type="array", require=true, desc="权限id数组")
     * @Apidoc\Returned()
     */
    public function edit($role_id)
    {
        if ($this->request->isGet()) {
            return $this->editInfo($role_id);
        }
        $data = json_decode($this->postData()['params'], true);
        if (isset($data['access_id']) && count($data['access_id']) == 0) {
            return $this->renderError('请选择权限');
        }

        $model = RoleModel::detail($role_id);

        // 更新记录
        if ($model->edit($data)) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/auth.role/delete")
     * @Apidoc\Param("role_id", type="int", require=true, desc="角色id")
     * @Apidoc\Returned()
     */
    public function delete($role_id)
    {
        $model = new RoleModel();
        if ($model->del($role_id)) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }
}
