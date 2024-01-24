<?php

namespace app\cashier\service\order\settled;

use app\cashier\model\order\Order as OrderModel;
use app\common\enum\settings\SettingEnum;
use app\common\model\order\OrderProduct;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\model\settings\Setting as SettingModel;
use app\common\library\helper;
use app\common\service\BaseService;
use app\common\service\order\OrderPrinterService;
use app\common\service\product\factory\ProductFactory;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\store\Table as TableModel;
use app\common\model\user\User as UserModel;

/**
 * 订单结算服务基类
 */
abstract class CashierSettledService extends BaseService
{
    /* $model OrderModel 订单模型 */
    public $model;

    // 当前应用id
    protected $app_id;

    protected $user;

    // 订单结算商品列表
    protected $productList = [];

    protected $params;
    /**
     * 订单结算的规则
     * 主商品默认规则
     */
    protected $settledRule = [
        'is_agent' => false,     // 商品是否开启分销,最终还是支付成功后判断分销活动是否开启
    ];

    /**
     * 订单结算数据
     */
    protected $orderData = [];
    /**
     * 订单来源
     */
    protected $orderSource;

    /**
     * 构造函数
     */
    public function __construct($user, $productList, $params)
    {

        $this->model = new OrderModel;
        $this->app_id = OrderModel::$app_id;
        $this->user = $user;
        $this->productList = $productList;
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
        $orderTotalNum = helper::getArrayColumnSum($this->productList, 'product_num');
        // 设置订单商品总金额(不含优惠折扣)
        $this->setOrderTotalPrice();
        // 计算订单商品的实际付款金额
        $this->setOrderProductPayPrice();
        // 计算订单最终金额
        $this->setOrderPayPrice();
        // 计算订单积分赠送数量
        $this->setOrderPointsBonus();
        // 返回订单数据
        return array_merge([
            'product_list' => $this->productList,   // 商品信息
            'order_total_num' => $orderTotalNum,        // 商品总数量
        ], $this->orderData, $this->settledRule);
    }

    /**
     * 订单确认-收银端
     */
    public function settlementCashier()
    {
        // 整理订单数据
        $this->orderData = $this->getOrderData();
        // 订单商品总数量
        $orderTotalNum = helper::getArrayColumnSum($this->productList, 'product_num');
        // 设置订单商品总金额(不含优惠折扣)
        $this->setOrderTotalPrice();
        // 计算订单商品的实际付款金额
        $this->setOrderProductPayPrice();
        // 计算订单最终金额
        $this->setOrderPayPrice();
        // 计算订单积分赠送数量
        $this->setOrderPointsBonus();
        // 返回订单数据
        return array_merge([
            'product_list' => $this->productList,   // 商品信息
            'order_total_num' => $orderTotalNum,        // 商品总数量
        ], $this->orderData, $this->settledRule);
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
        if (!$this->validateOrderForm($order, $this->params)) {
            return false;
        }
        // 创建新的订单
        $status = $this->model->transaction(function () use ($order) {
            // 创建订单事件
            return $this->createOrderEvent($order);
        });
        // 标记订单已支付
        if ($status && $order['pay_type'] && $this->orderSource['eat_type'] == 20) {
            $this->model->onPayment($this->model['order_no'], $order['pay_type']);
        }
        $orderDetail = OrderModel::detail($this->model['order_id']);
        // 菜品打印
        (new OrderPrinterService)->printProductTicket($orderDetail, 20);
        return $this->model['order_id'];
    }


    /**
     * 整理订单数据(结算台初始化)
     */
    private function getOrderData()
    {
        $supplier = SupplierModel::detail($this->user['shop_supplier_id']);
        //获取桌号信息
        $table_no = '';
        if (isset($this->params['table_id']) && ($this->params['table_id'] > 0)) {
            $table = TableModel::detail($this->params['table_id']);
            $table_no = $table['table_no'];
        }

        return [
            // 支付方式
            'pay_type' => isset($this->params['pay_type']) ? $this->params['pay_type'] : 40,
            // 包装费
            'order_bag_price' => 0,
            // 门店信息
            'supplier' => $supplier,
            // 桌号id
            'table_id' => isset($this->params['table_id']) && ($this->params['table_id']) ? $this->params['table_id'] : 0,
            // 桌号信息
            'table_no' => $table_no,
            // 订单类型
            'order_type' => 1,
            // 备注
            'remark' => isset($this->params['remark']) ? $this->params['remark'] : '',
            // 就餐人数
            'meal_num' => isset($this->params['meal_num']) ? $this->params['meal_num'] : 0,
            // 服务费
            'service_money' => 0,
            // 服务费类型
            'serviceType' => 0,
            // 结算模式
            'settle_type' => 0,
            // 优惠金额
            'discount_money' => isset($this->productList[0]) ? $this->productList[0]['discount_money'] : 0,
            // 用餐方式
            'delivery' => isset($this->params['delivery']) ? $this->params['delivery'] : 40,
            'user_id' => isset($this->params['user_id']) ? $this->params['user_id'] : 0,
        ];
    }

    /**
     * 设置订单的商品总金额(不含优惠折扣)
     */
    private function setOrderTotalPrice()
    {
        // 订单商品的总金额(不含优惠券折扣)
        $this->orderData['order_total_price'] = helper::number2(helper::getArrayColumnSum($this->productList, 'line_money'));
        // 消费税计算
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $this->orderData['supplier']['shop_supplier_id']);
        $consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $consume_fee = helper::bcmul($this->orderData['order_total_price'], $consume_rate);
        }
        $this->orderData['consumption_tax_money'] = $consume_fee;
        $this->orderData['order_pay_price'] = helper::number2(helper::getArrayColumnSum($this->productList, 'total_price'));
        if ($this->orderData['delivery'] == 30) {
            if ($this->orderData['supplier']['storebag_type'] == 1) {
                $this->orderData['order_bag_price'] = $this->orderData['supplier']['storebag_price'];
            } else {
                $this->orderData['order_bag_price'] = helper::number2(helper::getArrayColumnSum($this->productList, 'total_bag_price'));
            }
        }
        if ($this->orderSource['eat_type'] == 10) {
            $this->orderData['settle_type'] = $this->orderData['supplier']['settle_type'];
            $this->orderData['serviceType'] = $this->orderData['supplier']['serviceType'];
            $this->orderData['service_money'] = $this->orderData['supplier']['service_money'];
            if ($this->orderData['serviceType'] == 0) {
                $this->orderData['service_money'] = round($this->orderData['service_money'] * $this->orderData['meal_num'], 2);
            }
            $serviceFee = SettingModel::getSupplierItem(SettingEnum::SERVICE_CHARGE, $this->orderData['supplier']['shop_supplier_id']);
            // 订单服务费（非桌台）
            if ($serviceFee['is_open']) {
                $this->orderData['setting_service_money'] = $serviceFee['service_charge'];
            } else {
                $this->orderData['setting_service_money'] = 0;
            }
        }
    }

    /**
     * 设置订单的实际支付金额(含包装费+服务费)
     */
    private function setOrderPayPrice()
    {
        // 这里是生成订单表时order_price、pay_price的计算，有额外费用都在这里添加 TODO

        // 订单实付款金额(订单金额 + 包装费)
        $this->orderData['order_pay_price'] = helper::number2(helper::bcadd($this->orderData['order_pay_price'], $this->orderData['order_bag_price']));
        // 订单实付款金额(订单金额 + 服务费)
        $this->orderData['order_pay_price'] = helper::number2(helper::bcadd($this->orderData['order_pay_price'], $this->orderData['service_money']));
        // 订单实付款金额(订单金额 + 服务费2)
        $this->orderData['order_pay_price'] = helper::number2(helper::bcadd($this->orderData['order_pay_price'], $this->orderData['setting_service_money'] ?? 0));
        // 订单实付款金额(订单金额 + 消费税)
        $this->orderData['order_pay_price'] = helper::number2(helper::bcadd($this->orderData['order_pay_price'], $this->orderData['consumption_tax_money']));
        // 订单实付款金额(订单金额 - 优惠金额)
        $this->orderData['order_pay_price'] = helper::number2(helper::bcsub($this->orderData['order_pay_price'], $this->orderData['discount_money']));

        //应付金额+包装费
        $this->orderData['total_order_price'] = helper::number2(helper::bcadd($this->orderData['order_total_price'], $this->orderData['order_bag_price']));
        //应付金额+服务费
        $this->orderData['total_order_price'] = helper::number2(helper::bcadd($this->orderData['total_order_price'], $this->orderData['service_money']));
        //应付金额+服务费2
        $this->orderData['total_order_price'] = helper::number2(helper::bcadd($this->orderData['total_order_price'], $this->orderData['setting_service_money'] ?? 0));
        //应付金额+消费税
        $this->orderData['total_order_price'] = helper::number2(helper::bcadd($this->orderData['total_order_price'], $this->orderData['consumption_tax_money']));

    }

    /**
     * 计算订单商品的实际付款金额
     */
    private function setOrderProductPayPrice()
    {
        // 商品总价 - 优惠抵扣
        foreach ($this->productList as &$product) {
            //计算优惠金额
            $discount_money = 0;
            if ($this->orderData['discount_money'] != 0) {
                $discount_money = round($product['total_price'] / $this->orderData['order_pay_price'] * $this->orderData['discount_money'], 2);
            }
            $value = $product['total_price'];
            // 减去优惠金额
            if ($discount_money > 0) {
                $value = helper::bcsub($value, $discount_money);
            }
            $product['total_pay_price'] = helper::number2($value);
            $product['discount_money'] = $discount_money;
        }
        return true;
    }

    /**
     * 表单验证 (订单提交)
     */
    private function validateOrderForm(&$order, $param)
    {
        // 余额支付时，判断用户余额是否足够
        if ($order['pay_type'] == OrderPayTypeEnum::BALANCE) {
            if ($this->orderData['user_id'] == 0) {
                $this->error = '请选择会员';
                return false;
            }
            $UserInfo = UserModel::detail($this->orderData['user_id']);
            if ($UserInfo['balance'] < $order['order_pay_price']) {
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
        // 保存订单商品信息
        $this->saveOrderProduct($order, $status);
        // 更新商品库存 (针对下单减库存的商品)
        ProductFactory::getFactory($this->orderSource['source'])->updateProductStock($order['product_list']);
        return $status;
    }

    /**
     * 新增订单记录
     */
    private function add($order)
    {
        // 订单数据
        $data = [
            'user_id' => $order['user_id'],
            'order_no' => $this->model->orderNo(),
            'total_price' => $order['order_total_price'],
            'bag_price' => $order['order_bag_price'],
            'order_price' => $order['total_order_price'],
            'pay_price' => $order['order_pay_price'],
            'delivery_type' => $order['delivery'],
            'pay_type' => $order['pay_type'],
            'buyer_remark' => trim($order['remark']),
            'order_source' => $this->orderSource['source'],
            'points_bonus' => isset($order['points_bonus']) ? $order['points_bonus'] : 0,
            'shop_supplier_id' => $this->user['shop_supplier_id'],
            'order_type' => $order['order_type'],
            'table_no' => $order['table_no'],
            'table_id' => $order['table_id'],
            'is_agent' => $this->settledRule['is_agent'] ? 1 : 0,
            'cashier_id' => $this->user['cashier_id'],
            'eat_type' => $this->orderSource['eat_type'],
            'meal_num' => $order['meal_num'],
            'service_money' => $order['service_money'],
            'serviceType' => $order['serviceType'],
            'settle_type' => $order['settle_type'],
            'discount_money' => $order['discount_money'],
            'app_id' => $this->app_id,
            'setting_service_money' => $order['setting_service_money'] ?? 0,
            'consumption_tax_money' => $order['consumption_tax_money'],
        ];
        if ($data['eat_type'] == 20) {
            $startTime = strtotime(date('Y-m-d'));
            $endTime = $startTime + 86399;
            $count = ($this->model)->where('eat_type', '=', 20)
                ->where('shop_supplier_id', '=', $this->user['shop_supplier_id'])
                ->where('create_time', 'between', [$startTime, $endTime])
                ->count();
            if ($count) {
                $num = $count + 1;
            } else {
                $num = 1;
            }
            $data['callNo'] = 'A' . $this->Covering($num);
        }
        // 保存订单记录
        $this->model->save($data);
        $new_order_id = $this->model->order_id;
        return $new_order_id;
    }

    private function Covering($num)
    {
        if ($num < 10) {
            $num = '00' . $num;
        }
        if ($num >= 10 && $num < 100) {
            $num = '0' . $num;
        }
        return $num;
    }

    /**
     * 保存订单商品信息
     */
    private function saveOrderProduct($order, $status)
    {
        // 订单商品列表
        $productList = [];
        foreach ($order['product_list'] as $product) {
            $item = [
                'order_id' => $status,
                'user_id' => $order['user_id'],
                'app_id' => $this->app_id,
                'product_id' => $product['product_id'],
                'product_name' => $product['product']['product_name'],
                'image_id' => $product['product']['logo']['image_id'],
                'deduct_stock_type' => $product['product']['deduct_stock_type'],
                'spec_type' => $product['product']['spec_type'],
                'product_sku_id' => $product['sku']['product_sku_id'],
                'product_attr' => $product['describe'],
                'content' => $product['product']['content'],
                'product_price' => $product['price'],
                'line_price' => $product['product_price'],
                'total_num' => $product['product_num'],
                'total_price' => $product['total_price'],
                'total_pay_price' => $product['total_pay_price'],
                'discount_money' => $product['discount_money'],
                'points_bonus' => isset($product['points_bonus']) ? $product['points_bonus'] : 0,
                'is_ind_agent' => $product['product']['is_ind_agent'],
                'agent_money_type' => $product['product']['agent_money_type'],
                'first_money' => $product['product']['first_money'],
                'second_money' => $product['product']['second_money'],
                'third_money' => $product['product']['third_money'],
            ];
            $productList[] = $item;
        }

        $model = new OrderProduct();
        return $model->saveAll($productList);
    }

    /**
     * 计算订单积分赠送数量
     */
    private function setOrderPointsBonus()
    {
        // 积分设置
        $setting = SettingModel::getItem('points');
        // 条件：后台开启开启购物送积分
        if (!$setting['is_shopping_gift']) {
            return false;
        }
        // 设置商品积分赠送数量
        foreach ($this->productList as &$product) {
            // 积分赠送比例
            $ratio = $setting['gift_ratio'] / 100;
            // 计算赠送积分数量
            $product['points_bonus'] = !$product['is_points_gift'] ? 0 : helper::bcmul($product['total_pay_price'], $ratio, 2);
        }
        //  订单积分赠送数量
        $this->orderData['points_bonus'] = helper::getArrayColumnSum($this->productList, 'points_bonus');
        return true;
    }


}