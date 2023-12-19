<?php

namespace app\api\controller\plus\driver;

use app\api\controller\Controller;
use app\api\model\plus\driver\Setting;
use app\api\model\plus\driver\User as DriverUserModel;
use app\api\model\plus\driver\Order as OrderModel;

/**
 * 分销商订单
 */
class Order extends Controller
{
    // 当前用户
    private $user;
    // 配送员用户信息
    private $Driver;
    // 配送员设置
    private $setting;

    /**
     * 构造方法
     */
    public function initialize()
    {
        // 用户信息
        $this->user = $this->getUser();
        // 分销商用户信息
        $this->Driver = DriverUserModel::detail($this->user['user_id']);
        // 分销商设置
        $this->setting = Setting::getAll();
    }

    /**
     * 配送员订单列表
     */
    public function lists($settled = -1)
    {
        $model = new OrderModel;
        return $this->renderSuccess('', [
            // 提现明细列表
            'list' => $model->getList($this->user['user_id'], (int)$settled),
        ]);
    }

}