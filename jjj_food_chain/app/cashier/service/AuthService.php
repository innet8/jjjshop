<?php

namespace app\cashier\service;

use think\facade\Cache;
use app\common\model\shop\Access;
use app\common\model\shop\User;
use app\common\model\shop\UserRole;
use app\common\model\shop\RoleAccess;

/**
 * 商家后台权限业务
 */
class AuthService
{
    // 存放实例
    static public $instance;

    // 商家登录信息
    private $cashier;

    // 商家用户信息
    private $user;

    // 权限验证白名单
    protected $allowAllAction = [
        // 用户登录
        '/passport/login',
        '/passport/logout',
        // 通知
        '/call/call/index',
        '/call/call/unprocessed',
        // 首页
        '/index/index',
        '/user/user/detail',
        '/user/user/OrderUseCard',

        '/order/cart/add',
        '/order/cart/sub',
        '/order/cart/list',
        '/order/cart/pick',
        '/order/cart/stayList',
        '/order/order/useMember',

        '/order/hallcart/add',
        '/order/hallcart/tableProductList',

        '/product/product/index',
        '/product/product/detail',
        '/product/category/index',

        '/store/table/table',
        '/store/table/tableType',
    ];

    /** @var array $accessUrls 商家用户权限url */
    private $accessUrls = [];

    /**
     * 公有化获取实例方法
     */
    public static function getInstance()
    {
        if (!(self::$instance instanceof AuthService)) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * 私有化构造方法
     */
    public function __construct($cashier)
    {
        // 商家登录信息
        $this->cashier = $cashier;
        // 当前用户信息
        $this->user = User::detail($this->cashier['user']['shop_user_id']);
    }

    /**
     * 私有化克隆方法
     */
    private function __clone()
    {
    }

    /**
     * 验证指定url是否有访问权限
     */
    public function checkPrivilege($url, $strict = true)
    {
        if (!is_array($url)):
            return $this->checkAccess($url);
        else:
            foreach ($url as $val):
                if ($strict && !$this->checkAccess($val)) {
                    return false;
                }
                if (!$strict && $this->checkAccess($val)) {
                    return true;
                }
            endforeach;
        endif;
        return true;
    }

    /**
     * @param string $url
     */
    private function checkAccess($url)
    {
        // 超级管理员无需验证
        if ($this->user && $this->user['is_super'] ?? '') {
            return true;
        }
        // 验证当前请求是否在白名单
        if (in_array($url, $this->allowAllAction)) {
            return true;
        }

        // 通配符支持
        foreach ($this->allowAllAction as $action) {
            if (strpos($action, '*') !== false
                && preg_match('/^' . str_replace('/', '\/', $action) . '/', $url)
            ) {
                return true;
            }
        }

        // 获取当前用户的权限url列表
        if (!in_array($url, $this->getAccessUrls())) {
            return false;
        }
        return true;
    }

    /**
     * 获取当前用户的权限url列表
     */
    private function getAccessUrls()
    {
        if (empty($this->accessUrls)) {
            // 获取当前用户的角色集
            $roleIds = UserRole::getRoleIds($this->user['shop_user_id']);
            // 根据已分配的权限
            $accessIds = RoleAccess::getAccessIds($roleIds);
            // 获取当前角色所有权限链接
            $this->accessUrls = Access::getApiAccessUrls($accessIds, $this->user['user_type'], '');
        }
        return $this->accessUrls;
    }

    /**
     * 前端路由权限验证
     *
     * @param [type] $path
     * @param [type] $app_id
     * @return string
     */
    public static function getAccessNameByPath($path, $app_id)
    {
        $arr = Cache::get('path_access_' . $app_id);
        if (!$arr) {
            // 查找访问资源
            $list = (new Access())->withoutGlobalScope()->field(['name', 'path'])->select();
            foreach ($list as $access) {
                $arr[$access['path']] = $access['name'];
            }
            Cache::tag('cache')->set('path_access_' . $app_id, $arr, 3600);
        }
        $url = isset($arr[$path]) ? $arr[$path] : '';
        return $url;
    }

    /**
     * 后端路由权限验证
     *
     * @param [type] $path
     * @param [type] $app_id
     * @return string
     */
    public static function getAccessNameByApiPath($path, $app_id)
    {
        $arr = Cache::get('api_path_access_' . $app_id);
        $arr = [];
        if (!$arr) {
            // 查找访问资源
            $list = (new Access())->withoutGlobalScope()->field(['name', 'api_path'])->select();
            foreach ($list as $access) {
                $arr[$access['api_path']] = $access['name'];
            }
            Cache::tag('cache')->set('api_path_access_' . $app_id, $arr, 3600);
        }
        $url = isset($arr[$path]) ? $arr[$path] : '';
        return $url;
    }
}