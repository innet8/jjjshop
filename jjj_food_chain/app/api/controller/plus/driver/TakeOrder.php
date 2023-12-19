<?php

namespace app\api\controller\plus\driver;

use app\api\model\plus\driver\Order as DriverOrderModel;
use app\common\model\plus\driver\Setting;
use app\api\controller\Controller;
use app\api\model\order\Order as OrderModel;
/**
 * 接单大厅
 */
class TakeOrder extends Controller
{
    // user
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();   // 用户信息

    }

    /**
     * 订单大厅列表
     */
    public function lists()
    {
        $data = $this->postData();
        $model = new DriverOrderModel;
        $list = $model->getTakeList($data);
        $take_fee = Setting::getItem('basic')['take_fee'];//服务费
        return $this->renderSuccess('', compact('list', 'take_fee'));
    }

    /**
     * 订单详情信息
     */
    public function detail($order_id)
    {
        // 订单详情
        $model = OrderModel::detail($order_id);
        return $this->renderSuccess('', [
            'order' => $model,  // 订单详情
            'take_fee' => Setting::getItem('basic')['take_fee'],
        ]);
    }

    //接订单
    public function receiveOrder($order_id)
    {
        $model = new DriverOrderModel;
        if ($model->receiveOrder($order_id, $this->getUser())) {
            return $this->renderSuccess('接单成功');
        }
        return $this->renderError($model->getError() ?: '接单失败');
    }

    //我的订单
    public function driverList()
    {
        $data = $this->postData();
        $model = new DriverOrderModel;
        $list = $model->driverList($data, $this->user);
        return $this->renderSuccess('', compact('list'));
    }
}