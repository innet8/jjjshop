<?php

namespace app\shop\controller;

use think\facade\Env;
use app\JjjController;
use think\facade\Cache;
use app\shop\service\AuthService;
use app\common\model\settings\Setting;
use app\common\exception\BaseException;
use app\shop\model\shop\User as UserModel;
use app\common\model\shop\OptLog as OptLogModel;

/**
 * 商户后台控制器基类
 */
class Controller extends JjjController
{
    /** @var array $store 商家登录信息 */
    protected $store;

    /** @var string $route 当前控制器名称 */
    protected $controller = '';

    /** @var string $route 当前方法名称 */
    protected $action = '';

    /** @var string $route 当前路由uri */
    protected $routeUri = '';

    /** @var string $route 当前路由：分组名称 */
    protected $group = '';

    /** @var string $route 当前路由：分组名称 */
    protected $menu = '';
    /** @var array $allowAllAction 登录验证白名单 */
    protected $allowAllAction = [
        // 登录页面
        '/passport/login',
        // 语言列表
        '/index/lang'
    ];

    /**
     * 后台初始化
     */
    public function initialize()
    {
        // 当前路由信息
        $this->getRouteInfo();
        //  验证登录状态
        $this->checkLogin();
        // 写入操作日志
        $this->saveOptLog();
        // 验证当前页面权限
        $this->checkPrivilege();
    }

    /**
     * 验证当前页面权限
     */
    private function checkPrivilege()
    {
        if ($this->store == null) {
            return false;
        }
        $AuthService = new AuthService($this->store);
        // 把uri转换成小写，兼容旧版本请求不区分大小写
        $this->routeUri = strtolower($this->routeUri);
        if (!$AuthService->checkPrivilege($this->routeUri)) {
            throw new BaseException(['msg' => '当前没有权限使用此功能']);
        }
        return true;
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
        // 控制器分组 (用于定义所属模块)
        $groupstr = strstr($this->controller, '.', true);
        $this->group = $groupstr !== false ? $groupstr : $this->controller;
        // 当前uri
        $this->routeUri = '/' . $this->controller . '/' . $this->action;
    }

    /**
     * 验证登录状态
     */
    private function checkLogin()
    {
        // 验证当前请求是否在白名单
        if (in_array($this->routeUri, $this->allowAllAction)) {
            return true;
        }
        $token = Request()->header('token');
        if (!$token) {
            $token = Request()->param('token');
        }
        if (!$token) {
            throw new BaseException(['msg' => '缺少必要的参数：token', 'code' => -1]);
        }
        $data = checkToken($token, 'shop');
        // 验证登录状态
        if ($data['code'] != 1) {
            throw new BaseException(['msg' => $data['msg'], 'code' => -1]);
        }
        if ($data['data']['type'] != 'shop') {
            throw new BaseException(['msg' => '用户信息错误', 'code' => -1]);
        }
        if (!$user = UserModel::getUser($data['data'])) {
            throw new BaseException(['msg' => '没有找到用户信息', 'code' => -1]);
        }
        if ($user->is_delete == 1) {
            throw new BaseException(['msg' => '账号被删除，请联系管理员', 'code' => -1]);
        }
        if ($user->is_status == 1) {
            throw new BaseException(['msg' => '账号被禁用，请联系管理员', 'code' => -1]);
        }
        // 保存登录状态
        $this->store = [
            'user' => [
                'shop_user_id' => $user['shop_user_id'],
                'user_name' => $user['user_name'],
                'shop_supplier_id' => $user['shop_supplier_id'],
                'user_type' => $user['user_type'],
            ],
            'supplier' => [
                'name' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['name'] : '',
                'category_set' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['category_set'] : 10,
                'is_main' => isset($user['supplier']) && $user['supplier'] ? $user['supplier']['is_main'] : 1,
            ],
            'app' => $user['app']->toArray(),
        ];
        return true;
    }

    /**
     * 操作日志
     */
    private function saveOptLog()
    {
        // 过滤循环请求
        $allowLoopUrl = [
            '/auth/loginlog/index',
            '/auth/optlog/index',
            '/auth/role/index',
            // 以下：秋香提的不用记录
            '/auth/role/index',
            '/auth/user/index',
            '/auth/loginlog/index',
            '/product/store/product/index',
            '/index/index',
            '/product/store/category/index',
            '/product/store/category/list',
            '/product/expand/attr/index',
            '/product/expand/spec/index',
            '/product/expand/feed/index',
            '/product/expand/label/index',
            '/product/expand/unit/index',
            '/setting/buffet/index',
            '/product/buffet/buffet/list',
            '/store/order/index',
            '/user/user/index',
            '/user/points/setting',
            '/user/grade/index',
            '/user/points/log',
            '/card/card/index',
            '/user/balance/log',
            '/card/card/record',
            '/card/card/deleterecord',
            '/setting/printer/index',
            '/supplier/printing/index',
            '/setting/printing/index',
            '/setting/supplier/currencyUnit',
            '/store/table/table/index',
            '/store/table/table/index',
            '/setting/supplier/currencyUnit',
            '/store/table/type/index',
            '/store/table/area/index',
            '/setting/supplier/taxRate',
            '/setting/supplier/serviceCharge',
            '/setting/paytype/index',
            '/user/usershiftlog/index',
            '/store/survey/index',
            '/setting/terminal/cashier',
            '/setting/terminal/tablet',
            '/setting/terminal/kitchen',
            '/setting/store/index',
            '/setting/clear/index',
            '/order/cart/list',
            '/store/table/table',
            '/order/order/index'
        ];
        if (in_array($this->routeUri, $allowLoopUrl)) {
            return;
        }
        if (Env::get('env') == 'uat'){
            return;
        }
        if ($this->store == null) {
            return;
        }
        $shop_user_id = $this->store['user']['shop_user_id'];
        if (!$shop_user_id) {
            return;
        }
        // 如果不记录查询日志
        $config = Setting::getItem('store');
        if (!$config || !$config['is_get_log']) {
            return;
        }
        // 
        $title = (new AuthService($this->store))::getAccessNameByApiPath($this->routeUri, $this->store['app']['app_id']);
        if ($title) {
            Cache::tag('optlog')->set('shop_opt_log', array_merge([[
                'shop_user_id' => $shop_user_id,
                'ip' => \request()->ip(),
                'request_type' => $this->request->isGet() ? 'Get' : 'Post',
                'url' => $this->routeUri,
                'content' => json_encode($this->request->param(), JSON_UNESCAPED_UNICODE),
                'browser' => get_client_browser(),
                'agent' => $_SERVER['HTTP_USER_AGENT'],
                'title' => $title,
                'app_id' => $this->store['app']['app_id']
            ]], Cache::get('shop_opt_log', [])));
        }
    }
}
