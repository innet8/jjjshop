<?php

namespace app\kitchen\controller;
use app\common\exception\BaseException;
use app\JjjController;


/**
 * API控制器基类
 */
class Controller extends JjjController
{
    // 厨显
    protected array $kitchen;

    /** @var string $route 当前控制器名称 */
    protected string $controller = '';

    /** @var string $route 当前方法名称 */
    protected string $action = '';

    /** @var string $route 当前路由uri */
    protected string $routeUri = '';

    /** @var array $allowAllAction 登录验证白名单 */
    protected array $allowAllAction = [
        '/base/base/bind', // 绑定设备
    ];

    /**
     * 后台初始化
     */
    public function initialize()
    {
        // 当前路由信息
        $this->getRouteInfo();
        $this->checkBind();
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
     * 验证绑定状态
     * @throws BaseException
     */
    private function checkBind()
    {
        if (in_array($this->routeUri, $this->allowAllAction)) {
            return true;
        }
        $appid = Request()->header('appid');
        if (!$appid) {
            throw new BaseException(['msg' => '登录失效', 'code' => -1]);
        }
        $sid = Request()->header('sid');
        if (!$sid) {
            throw new BaseException(['msg' => '缺少必要的参数：Sid', 'code' => -1]);
        }
        $this->kitchen = [
            'shop_supplier_id' => $sid ?? 0,
            'app_id' => $appid ?? 0,
        ];
        return true;
    }
}
