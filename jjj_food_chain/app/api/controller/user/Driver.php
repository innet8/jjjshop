<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\plus\driver\Setting;
use app\api\model\plus\driver\User as DriverUserModel;
use app\api\model\plus\driver\Apply as DriverApplyModel;
use app\api\model\settings\Message as MessageModel;
use app\api\model\order\Order as OrderModel;

/**
 * 配送中心
 */
class Driver extends Controller
{
    // 用户
    private $user;
    // 配送员
    private $driver;
    // 配送设置
    private $setting;

    /**
     * 构造方法
     */
    public function initialize()
    {
        // 用户信息
        $this->user = $this->getUser();
        // 分销商用户信息
        $this->driver = DriverUserModel::detail($this->user['user_id']);
        // 分销商设置
        $this->setting = Setting::getAll();
    }

    /**
     * 分销商中心
     */
    public function center()
    {
        $orderCount = OrderModel::where('delivery_type', '=', 10)
            ->where('delivery_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('pay_status', '=', 20)
            ->where('is_delete', '=', 0)
            ->count();
        return $this->renderSuccess('', [
            // 配送用户信息
            'driver' => $this->driver,
            //收益数据
            'basedata' => DriverUserModel::basedata($this->user),
            //待接单数量
            'orderCount' => $orderCount,
            //骑手退出申请状态
            'refundStatus' => (new DriverApplyModel)->refundStatus($this->user),
        ]);
    }

    /**
     * 配送员申请状态
     */
    public function apply($platform = '')
    {

        return $this->renderSuccess('', [
            // 当前是否为分销商
            'is_driver' => $this->isDriverUser(),
            // 当前是否在申请中
            'is_applying' => DriverApplyModel::isApplying($this->user['user_id']),
        ]);
    }

    /**
     * 分销商提现信息
     */
    public function cash($platform = '')
    {
        return $this->renderSuccess('', [
            // 分销商用户信息
            'driver' => $this->driver,
            // 结算设置
            'settlement' => $this->setting['settlement']['values'],
        ]);
    }

    /**
     * 当前用户是否为配送员
     */
    private function isDriverUser()
    {
        return !!$this->driver && !$this->driver['is_delete'];
    }

}