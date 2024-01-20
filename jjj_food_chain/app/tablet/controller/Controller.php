<?php

namespace app\tablet\controller;
use app\cashier\model\cashier\User as UserModel;
use app\common\exception\BaseException;
use app\JjjController;


/**
 * API控制器基类
 */
class Controller extends JjjController
{

    // app_id
    protected int $app_id;

    // 桌台
    protected array $table;

    /** @var string $route 当前控制器名称 */
    protected string $controller = '';

    /** @var string $route 当前方法名称 */
    protected string $action = '';

    /** @var string $route 当前路由uri */
    protected string $routeUri = '';

    /** @var array $allowAllAction 登录验证白名单 */
    protected array $allowAllAction = [
        '/base/base/getInfo'
    ];

    /**
     * 后台初始化
     */
    public function initialize()
    {
        // 当前路由信息
        $this->getRouteinfo();
        $this->checkBind();
    }

    /**
     * 解析当前路由参数 （分组名称、控制器名称、方法名）
     */
    protected function getRouteinfo()
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
        $sid = Request()->header('sid');
        if (!$sid) {
            throw new BaseException(['msg' => '缺少必要的参数：sid', 'code' => -1]);
        }
        $tid = Request()->header('tid');
//        if (!$tid) {
//            throw new BaseException(['msg' => '缺少必要的参数：tableid', 'code' => -1]);
//        }
        $this->table = [
            'shop_supplier_id' => $sid ?? 0,
            'table_id' => $tid ?? 0,
            'cashier_id' => 0,
        ];
        return true;
    }
}
