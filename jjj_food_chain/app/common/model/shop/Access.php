<?php

namespace app\common\model\shop;

use app\common\model\BaseModel;

/**
 * 商家用户权限模型
 */
class Access extends BaseModel
{
    protected $name = 'shop_access';
    protected $pk = 'access_id';

    // 路由筛选名称
    const SHOP_ROUTE_NAME = '管理后台';
    const CASHIER_ROUTE_NAME = '收银机';

    /*
     * 获取所有权限
     */
    protected static function getAll($isShow = 1, $user_type = 0, $supplier = '')
    {
        $model = (new static)::withoutGlobalScope();
        if ($user_type == 1) {
            if ($supplier && $supplier['category_set'] == 10) {
                $model = $model->where('path', 'not in', ['/product/takeaway/category/index', '/product/store/category/index']);
            }
            $model = $model->where('is_supplier', '=', 1);
        }
        if ($isShow != -1) {
            $data = $model->where('is_show', '=', $isShow)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->select();
        } else {
            $data = $model->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->select();
        }

        return $data ? $data->toArray() : [];
    }


    /**
     * 权限信息
     */
    public static function detail($where)
    {
        if (is_array($where)) {
            return static::where($where)->find();
        } else {
            return static::where('access_id', '=', $where)->find();
        }
    }

    /**
     * 获取权限url集
     */
    public static function getAccessUrls($accessIds, $user_type, $supplier)
    {
        $urls = [];
        foreach (static::getAll(1, $user_type, $supplier) as $item) {
            in_array($item['access_id'], $accessIds) && $urls[] = $item['path'];
        }
        return $urls;
    }

    /**
     * 获取后台路径权限url集
     */
    public static function getApiAccessUrls($accessIds, $user_type, $supplier)
    {
        $urls = [];
        foreach (static::getAll(1, $user_type, $supplier) as $item) {
            in_array($item['access_id'], $accessIds) && $urls[] = $item['api_path'];
        }
        return $urls;
    }

    /**
     * 获取权限url集
     */
    public static function getAccessList($accessIds, $user_type, $supplier)
    {
        $model = (new static)::withoutGlobalScope();
        if ($user_type == 1) {
            if ($supplier['category_set'] == 10) {
                $model = $model->where('path', 'not in', ['/product/takeaway/category/index', '/product/store/category/index']);
            }
            $model = $model->where('is_supplier', '=', 1);
        }
        return $model->where('access_id', 'in', $accessIds)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }

    /**
     * 获取收银机权限url集
     */
    public static function getCashierAccessList($accessIds, $user_type, $supplier)
    {
        $model = (new static)::withoutGlobalScope();
        return $model->where('access_id', 'in', $accessIds)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }


    /**
     * 通过插件分类id查询
     */
    public static function getListByPlusCategoryId($category_id)
    {
        $model = new static();
        return $model::withoutGlobalScope()->where('plus_category_id', '=', $category_id)
            ->where('is_show', '=', 1)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }

    /**
     * 根据名称获取菜单的子菜单
     * @param array $menus
     * @param string $name
     * @return array
     */
    public function getRouteMenu(array $menus, string $name): array
    {
        foreach ($menus as $menu) {
            if (!isset($menu['children'])) {
                continue;
            }
            $adminMenu = array_filter($menu['children'], function ($val) use($name) {
                return $val['name'] == $name;
            });
            if (!empty($adminMenu)) {
                return reset($adminMenu)['children'];
            }
        }
        return [];
    }

    /**
     * 获取权限
     * @return array
     */
    public function getPermission($name, $user, $supplier)
    {
        if ($user['is_super'] == 1) {
            $menus = self::getList($user['user_type'], $supplier);
        }else{
            $menus = self::getCashierListByUser($user['shop_user_id'], $user['user_type'], $supplier);
            foreach ($menus as $key => $val) {
                if (!isset($val['children'][0]['path'])) {
                    continue;
                }
                if ($val['redirect_name'] != $val['children'][0]['path']) {
                    $menus[$key]['redirect_name'] = $menus[$key]['children'][0]['path'];
                }
            }
        }
        return $this->getRouteMenu($menus, $name);
    }

    /**
     * 获取后台用户权限列表
     */
    public function getListByUser($shop_user_id, $user_type, $supplier)
    {
        // 获取当前用户的角色集
        $roleIds = UserRole::getRoleIds($shop_user_id);
        // 根据已分配的权限
        $accessIds = RoleAccess::getAccessIds($roleIds);
        // 获取当前角色所有权限链接
        $menus_list = self::getAccessList($accessIds, $user_type, $supplier);
        // 格式化
        return $this->formatTreeData($menus_list, 0);
    }

    /**
     * 获取收银机权限列表
     */
    public function getCashierListByUser($shop_user_id, $user_type, $supplier)
    {
        // 获取当前用户的角色集
        $roleIds = UserRole::getRoleIds($shop_user_id);
        // 根据已分配的权限
        $accessIds = RoleAccess::getAccessIds($roleIds);
        // 获取当前角色所有权限链接
        $menus_list = self::getCashierAccessList($accessIds, $user_type, $supplier);
        // 格式化
        return $this->formatTreeData($menus_list, 0);
    }

    /**
     * 循环获取分类
     */
    private function formatTreeData($all, $parent_id = 0)
    {
        $tree = array();
        foreach ($all as $k => $v) {
            if ($v['parent_id'] == $parent_id) {
                //父亲找到儿子
                $v['children'] = $this->formatTreeData($all, $v['access_id']);
                $tree[] = $v;
            }
        }
        return $tree;
    }

    /**
     * 获取权限列表
     */
    public function getList($user_type = 0, $supplier = "")
    {
        $all = static::getAll(1, $user_type, $supplier);
        $res = $this->recursiveMenuArray($all, 0);
        return array_values($this->foo($res));
    }

    /**
     * 递归获取获取分类
     */
    private function recursiveMenuArray($data, $pid)
    {
        $re_data = [];
        foreach ($data as $key => $value) {
            if ($value['parent_id'] == $pid) {
                $re_data[$value['access_id']] = $value;
                $re_data[$value['access_id']]['children'] = $this->recursiveMenuArray($data, $value['access_id']);
            } else {
                continue;
            }
        }
        return $re_data;
    }

    /**
     * 格式化递归数组下标
     */
    private function foo(&$ar)
    {
        if (!is_array($ar)) return;
        foreach ($ar as $k => &$v) {
            if (is_array($v)) $this->foo($v);
            if ($k == 'children') $v = array_values($v);
        }
        return $ar;
    }
}