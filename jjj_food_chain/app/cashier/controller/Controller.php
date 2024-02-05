<?php

namespace app\cashier\controller;

use think\facade\Env;
use app\JjjController;
use app\cashier\service\AuthService;
use app\common\exception\BaseException;
use app\common\enum\settings\SettingEnum;
use app\common\model\settings\Setting;
use app\cashier\model\cashier\User as UserModel;
use app\common\model\shop\Access as AccessModel;
use app\common\model\shop\OptLog as OptLogModel;
use app\common\model\settings\Setting as SettingModel;

/**
 * 商户后台控制器基类
 */
class Controller extends JjjController
{
    /** @var array $store 登录信息 */
    protected $cashier;

    /** @var string $route 当前控制器名称 */
    protected $controller = '';

    /** @var string $route 当前方法名称 */
    protected $action = '';

    /** @var string $route 当前路由uri */
    protected $routeUri = '';

    /** @var array $allowAllAction 验证全局白名单 */
    protected $allowAllAction = [
        '/index/bind', // 绑定设备
    ];
    /** @var array $allowCashierAction 收银机验证白名单 */
    protected $allowCashierAction = [
        '/index/lang', // 语言获取
        '/index/ad', // 广告
        '/passport/login', // 登录页面
        '/index/base', // 登录信息
    ];

    /**
     * 后台初始化
     */
    public function initialize()
    {
        // 当前路由信息
        $this->getRouteInfo();
        // 验证状态
        $this->checkAuth();
        // 写入操作日志
        $this->saveOptLog();
        // 验证当前页面权限
        $this->checkPrivilege();
    }

    /**
     * 解析当前路由参数 （分组名称、控制器名称、方法名）
     */
    protected function getRouteInfo()
    {
        // 控制器名称
        $this->controller = strtolower($this->request->controller());
        $this->controller = str_replace(".", "/", $this->controller);
        // 方法名称
        $this->action = Request()->action();
        // 当前uri
        $this->routeUri = '/' . $this->controller . '/' . $this->action;
    }

    /**
     * 验证登录状态
     */
    private function checkAuth()
    {
        // 验证当前请求是否在白名单
        if (in_array($this->routeUri, $this->allowAllAction)) {
            return true;
        }

        $appid = Request()->header('appid');
        if (!$appid) {
            throw new BaseException(['msg' => '登录失效', 'code' => -2]);
        }
        $sid = Request()->header('sid');
        if (!$sid) {
            throw new BaseException(['msg' => '登录失效', 'code' => -2]);
        }

        // 验证当前请求是否在白名单
        if (in_array($this->routeUri, $this->allowCashierAction)) {
            return true;
        }

        $token = Request()->header('token');
        if (!$token) {
            throw new BaseException(['msg' => '登录失效', 'code' => -2]);
        }
        $data = checkToken($token, 'cashier');
        if ($data['code'] != 1) {
            throw new BaseException(['msg' => $data['msg'], 'code' => -2]);
        }
        if ($data['data']['type'] != 'cashier') {
            throw new BaseException(['msg' => '用户信息错误', 'code' => -1]);
        }
        if (!$user = UserModel::getUser($data['data'])) {
            throw new BaseException(['msg' => '没有找到用户信息', 'code' => -1]);
        }
        // 商家后台设置的名称
        $shop = SettingModel::getSupplierItem(SettingEnum::STORE, $user['shop_supplier_id'] ?? 0, $user['app_id'] ?? 0);
        // 权限
        $supplier = [
            'name' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['name'] : '',
            'category_set' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['category_set'] : 10,
            'is_main' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['is_main'] : 1,
        ];
        $permission = (new AccessModel)->getPermission(AccessModel::CASHIER_ROUTE_NAME, $user, $supplier);
        $this->cashier = [
            'user' => [
                'shop_user_id' => $user['shop_user_id'],
                'cashier_id' => $user['shop_user_id'],
                'user_name' => $user['user_name'],
                'account' => $user['user_name'],
                'mobile' => $user['mobile'],
                'shop_supplier_id' => $user['shop_supplier_id'],
                'name' => $shop['name'],
                'app_id' => $user['app_id'],
                'permission' => $permission,
            ],
            'app' => $user['app']->toArray(),
        ];
        return true;
    }

    /**
     * 获取供应商id
     */
    protected function getCashierId()
    {
        return $this->cashier['user']['cashier_id'];
    }

    /**
     * 验证当前页面权限
     */
    private function checkPrivilege()
    {
        if ($this->cashier == null) {
            return false;
        }
        $AuthService = new AuthService($this->cashier);
        if (!$AuthService->checkPrivilege($this->routeUri)) {
            throw new BaseException(['msg' => '当前没有权限使用此功能']);
        }
        return true;
    }

    /**
     * 操作日志
     */
    private function saveOptLog()
    {
        // 过滤循环请求
        $allowLoopUrl = [
            '/call/call/unprocessed',
            '/store/table/tableType',
            '/product/product/index',
            '/product/category/index',
            '/order/cart/add',
        ];
        if (in_array($this->routeUri, $allowLoopUrl)) {
            return;
        }
        if (Env::get('env') == 'uat'){
            return;
        }
        if ($this->cashier == null) {
            return;
        }
        $shop_user_id = $this->cashier['user']['shop_user_id'];
        if (!$shop_user_id) {
            return;
        }
        // 如果不记录查询日志
        $config = Setting::getItem('store');
        if (!$config || !$config['is_get_log']) {
            return;
        }
        $model = new OptLogModel();
        $model->save([
            'shop_user_id' => $shop_user_id,
            'ip' => \request()->ip(),
            'request_type' => $this->request->isGet() ? 'Get' : 'Post',
            'url' => $this->routeUri,
            'content' => json_encode($this->request->param(), JSON_UNESCAPED_UNICODE),
            'browser' => get_client_browser(),
            'agent' => $_SERVER['HTTP_USER_AGENT'],
            'title' => (new AuthService($this->cashier))::getAccessNameByApiPath($this->routeUri, $this->cashier['app']['app_id']),
            'app_id' => $this->cashier['app']['app_id']
        ]);
    }
}
