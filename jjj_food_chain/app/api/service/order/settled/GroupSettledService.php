<?php

namespace app\api\service\order\settled;

use app\api\model\plus\group\Order as OrderModel;
use app\api\model\plus\group\OrderProduct;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\model\settings\Setting as SettingModel;
use app\common\library\helper;
use app\common\service\BaseService;

/**
 * 团购订单结算服务基类
 */
abstract class GroupSettledService extends BaseService
{
    /* $model OrderModel 订单模型 */
    public $model;

    // 当前应用id
    protected $app_id;

    protected $user;

    // 订单结算商品列表
    protected $groupList = [];

    protected $params;

    /**
     * 订单结算数据
     */
    protected $orderData = [];

    /**
     * 构造函数
     */
    public function __construct($user, $groupList, $params)
    {
        $this->model = new OrderModel;
        $this->app_id = OrderModel::$app_id;
        $this->user = $user;
        $this->groupList = $groupList;
        $this->params = $params;
    }

    /**
     * 订单确认-结算台
     */
    public function settlement()
    {
        // 整理订单数据
        $this->orderData = $this->getOrderData();
        // 验证商品状态, 是否允许购买
        $this->validateProductList();
        // 订单商品总数量
        $orderTotalNum = helper::getArrayColumnSum($this->groupList, 'total_num');
        // 计算订单最终金额
        $this->setOrderPayPrice();
        // 返回订单数据
        return array_merge([
            'groupList' => array_values($this->groupList),   // 团购信息
            'order_total_num' => $orderTotalNum,        // 总数量
        ], $this->orderData);
    }

    /**
     * 验证订单商品的状态
     * @return bool
     */
    abstract function validateProductList();

    /**
     * 创建新订单
     */
    public function createOrder($order)
    {
        // 表单验证
        if (!$this->validateOrderForm($order)) {
            return false;
        }
        // 创建新的订单
        $order_id = $this->model->transaction(function () use ($order) {
            // 创建订单事件
            return $this->createOrderEvent($order);
        });
        return $order_id;
    }

    /**
     * 设置订单的实际支付金额
     */
    private function setOrderPayPrice()
    {
        // 订单金额
        $this->orderData['order_pay_price'] = helper::number2(helper::getArrayColumnSum($this->groupList, 'total_price'));
    }

    /**
     * 整理订单数据(结算台初始化)
     */
    private function getOrderData()
    {
        return [
            // 支付方式
            'pay_type' => isset($this->params['pay_type']) ? $this->params['pay_type'] : OrderPayTypeEnum::WECHAT,
        ];
    }

    /**
     * 表单验证 (订单提交)
     */
    private function validateOrderForm($order)
    {
        // 余额支付时，判断用户余额是否足够
        if ($order['pay_type'] == OrderPayTypeEnum::BALANCE) {
            if ($this->user['balance'] < $order['order_pay_price']) {
                $this->error = '用户余额不足，无法使用余额支付';
                return false;
            }
        }
        return true;
    }

    /**
     * 创建订单事件
     */
    private function createOrderEvent($order)
    {
        // 新增订单记录
        $status = $this->add($order);
        // 保存订单课程信息
        $this->saveOrderGroup($order, $status);
        return $status;
    }

    /**
     * 新增订单记录
     */
    private function add($order)
    {
        // 订单数据
        $data = [
            'user_id' => $this->user['user_id'],
            'order_no' => $this->model->orderNo(),
            'trade_no' => $this->model->tradeNo(),
            'total_price' => $order['order_pay_price'],
            'pay_price' => $order['order_pay_price'],
            'pay_type' => $order['pay_type'],
            'app_id' => $this->app_id,
        ];
        $config = SettingModel::getItem('group');
        $closeTime = $config['close_time'];
        $closeTime > 0 && $data['pay_end_time'] = time() + ($closeTime * 60);
        // 保存订单记录
        $this->model->save($data);
        return $this->model['order_id'];
    }

    /**
     * 保存订单团购信息
     */
    private function saveOrderGroup($order, $status)
    {
        // 订单商品列表
        $productList = [];
        foreach ($order['groupList'] as $group) {
            $item = [
                'order_id' => $status,
                'user_id' => $this->user['user_id'],
                'app_id' => $this->app_id,
                'group_id' => $group['group_id'],
                'group_name' => $group['group_name'],
                'image_id' => $group['image'][0]['image_id'],
                'group_price' => $group['group_price'],
                'line_price' => $group['line_price'],
                'total_price' => $group['total_price'],
                'total_num' => $group['total_num'],
                'content' => $group['content'],
                'describe' => $group['describe'],
                'suit_type' => $group['suit_type'],
                'shop_supplier_ids' => $group['shop_supplier_id'],
                'notice' => $group['notice'],
                'expire_type' => $group['expire_type'],
                'expire_day' => $group['expire_day'],
                'start_time' => $group['start_time'],
                'end_time' => $group['end_time'],
            ];
            $productList[] = $item;
        }
        $model = new OrderProduct();
        return $model->saveAll($productList);
    }
}