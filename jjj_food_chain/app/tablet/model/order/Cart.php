<?php

namespace app\tablet\model\order;

use app\common\library\helper;
use app\common\model\user\User as UserModel;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\settings\SettingEnum;
use app\common\model\order\OrderProduct;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\plus\cashier\Cart as CartModel;
use app\common\model\plus\discount\DiscountProduct;
use app\common\model\order\Order as CommonOrderModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\product\ProductSku as ProductSkuModel;
use app\common\model\order\OrderProduct as OrderProductModel;
use app\tablet\model\order\Order as OrderModel;
use app\tablet\model\product\Product as ProductModel;
use app\cashier\model\user\CardRecord as CardRecordModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use think\facade\Log;


/**
 * 收银购物车模型
 */
class Cart extends CartModel
{
    protected $table = 'jjjfood_cashier_cart';
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'app_id',
        'update_time'
    ];

    /**
     * 获取当前购物车列表 (含商品信息)
     */
    public function getList($data, $eat_type = 20, $table_id = 0)
    {
        // 获取购物车商品列表
        $model = $this;
        if ($table_id) {
            $model = $model->where('table_id', '=', $table_id);
        }
        if ($eat_type == 10) {
            $model = $model->where(function ($query) use ($data) {
                $query->where('c.cashier_id', '=', 0)->whereOr('c.cashier_id', '=', $data['cashier_id']);
            });
        } else {
            $model = $model->where('c.cashier_id', '=', $data['cashier_id']);
        }
        $list = $model->alias('c')
            ->with(['product'])
            ->where('c.shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', $eat_type)
            ->field('c.*')
            ->select();
        return $list;
    }

    //查询桌号订单信息
    public static function getTableCartInfo($user, $table_id)
    {
        return (new static())->with('product')
            ->where('cashier_id', '=', $user['cashier_id'])
            ->where('table_id', '=', $table_id)
            ->select();
    }

    // 重新计算购物车价格信息
    public function reloadPrice($shop_supplier_id, $table_id, $order_id = 0)
    {
        if ($order_id > 0) {
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->where('order_id', '=', $order_id)
                ->select();
            // 是否存在订单
            $order = OrderModel::detail($order_id);
        } else {
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->where('table_id', '=', $table_id)
                ->select();
            // 是否存在订单
            $order = OrderModel::detail([
                ['table_id', '=', $table_id],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
        }
        $user_id = $order ? $order['user_id'] : 0;
        trace('会员ID');
        trace($user_id);

        $pay_money = 0;
        $order_price = 0;
        $user_discount_money = 0;
        $user = UserModel::detail($user_id);

        foreach ($cartList as $product) {
            // 标记参与会员折扣
            $is_user_grade = false;
            // 会员等级抵扣的金额
            $grade_ratio = 0;
            // 会员折扣的商品单价
            $grade_product_price = 0;
            // 会员折扣的总额差
            $grade_total_money = 0;
            if ($product->product['is_enable_grade'] && $product['price'] > 0) {

                if ($user) {
                    $discount = (new CardRecordModel)->getDiscount($user['user_id']);
                    trace('折扣信息');
                    trace($discount);
                } else {
                    $discount = 0;
                }
                $alone_grade_type = 10;
                // 商品单独设置了会员折扣
                if ($product['product']['is_alone_grade'] && isset($product['product']['alone_grade_equity'][$user['grade_id']])) {
                    if ($product['product']['alone_grade_type'] == 10) {
                        // 折扣比例
                        $discountRatio = helper::bcdiv($product['product']['alone_grade_equity'][$user['grade_id']], 100);
                    } else {
                        $alone_grade_type = 20;
                        $discountRatio = helper::bcdiv($product['product']['alone_grade_equity'][$user['grade_id']], $product['product_price'], 2);
                    }
                } else {
                    // 折扣比例
                    if ($user) {
                        $discountRatio = helper::bcdiv($user['grade']['equity'], 100);
                    } else {
                        $discountRatio = 1;
                    }

                }
                // 计算最终折扣
                if ($discount && $discountRatio) {
                    // 会员等级 * 会员卡
                    $discountRatio = round($discountRatio * $discount, 3);
                } elseif ($discount) {
                    // 会员卡
                    $discountRatio = $discount;
                }
                trace('折扣');
                trace($discountRatio);
                if ($discountRatio <= 1) {
                    if ($alone_grade_type == 20) {
                        // 固定金额
                        $grade_product_price = $product['alone_grade_equity'][$user['grade_id']];
                        $discount && $grade_product_price = round($grade_product_price * $discount, 2);
                    } else {
                        // 商品会员折扣后单价
                        $grade_product_price = helper::number2(helper::bcmul($product['price'], $discountRatio), true);
                        trace('商品会员折扣后单价');
                        trace($grade_product_price);
                    }
                    $productDiscount = DiscountProduct::getDiscount($product['product_id']);
                    trace('========');
                    trace($product['product_num']);
                    trace('========');
                    if ($product['product_num'] > 1 && $productDiscount) {
                        $gradeTotalPrice = $grade_product_price * ($product['product_num'] - 1) + round($grade_product_price * $productDiscount['discount'] / 10, 2);
                    } else {
                        $gradeTotalPrice = $grade_product_price * $product['product_num'];
                        trace('商品会员折扣后单价 * 数量');
                        trace($gradeTotalPrice);
                    }

                    trace('折扣');
                    trace($grade_ratio);
                    // 原商品总价 - 折扣后
                    trace('原商品总价');
                    trace($product['total_price']);
                    trace($product['product_price']);
                    $grade_total_money = helper::number2(helper::bcsub($product['price'] * $product['product_num'], $gradeTotalPrice));
                    trace('优惠后与原商品差价');
                    trace($grade_total_money);
                    $product['total_price'] = $gradeTotalPrice;
                }
            }
            $product_points_bonus = 0;

            $updateArr = [
                'user_id' => $user_id,
                'product_price' => $grade_product_price,   // 购物车价格（可能是原价或折扣的）
//                'price' => $product['total_price'],   // 商品总价(数量×单价)
//                'grade_total_money' => $grade_total_money,  // 会员折扣的总额差 （商品总价 - 商品折扣后总价）
            ];
            $product->save($updateArr);

            // 累加
            $pay_money += $product['total_price'];  // 实付金额
            $order_price += $product['price'] * $product['product_num'];  // 商品原价
            $user_discount_money += $grade_total_money; // 商品优惠金额
        }

        $total_price = $pay_money; // 订单商品总价（不是商品原价总价、是商品折扣后(如果有)的总价）
        // 消费税计算
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $shop_supplier_id);
        $consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $consume_fee = floatval(helper::bcmul($total_price, $consume_rate));
        }

//        $updateOrderArr = [
//            'order_no' => $re_order_no ? $this->orderNo() : $order['order_no'],
//            'discount_money' => 0,  // 折扣优惠重置
//            'total_price' => $total_price,
//            'order_price' => $order_price + $service_money + $service_fee + $consume_fee, // 订单总额 = 商品原始总价 + 原服务费 + 新服务费用 + 消费税
//            'pay_price' => $total_price + $service_money + $service_fee + $consume_fee, // 应付金额 = 商品折扣总价（会员折扣） + 原服务费 + 新服务费用 + 消费税
//            'points_bonus' => $points_bonus,
//            'service_money' => $service_money,
//            'meal_num' => $meal_num,
//            'settle_type' => $settle_type,
//            'setting_service_money' => $service_fee,
//            'consumption_tax_money' => $consume_fee,
//            'user_discount_money' => $user_discount_money
//        ];
//        $order->save($updateOrderArr);

        return [
            'cart_product_price' => $order_price,                                   // 购物车商品原价
            'cart_product_pay_price' => $pay_money,                                 // 购物车商品实付价钱
            'cart_pay_price' => floatval(helper::bcadd($pay_money, $consume_fee)),  // 购物车实付价钱
            'cart_consumption_tax_money' => $consume_fee,                           // 消费税
            'cart_user_discount_money' => $user_discount_money,                     // 会员折扣
        ];

    }

    /**
     * 改价
     */
    public function changePrice($cart_id, $price, $user)
    {
        $this->where('is_stay', '=', 0)
            ->where('eat_type', '=', 20)
            ->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('cashier_id', '=', $user['cashier_id'])
            ->update(['discount_money' => 0]);
        return $this->where('cart_id', '=', $cart_id)->update(['price' => $price]);
    }

    /**
     * 删除商品
     */
    public function delProduct($cart_id)
    {
        return $this->where('cart_id', '=', $cart_id)->delete();
    }

    /**
     * 是否已生成订单（已送厨）
     *
     * @param string $cart_no
     * @return int
     */
    public function checkOrderByCardNo($cart_no)
    {
        $order_id = $this->where('cart_no', '=', $cart_no)
                    ->where('order_id', '>', 0)
                    ->value('order_id');
        return $order_id ?: 0;
    }

    /**
     * 整单取消
     *
     * @param string $cart_no
     * @return bool
     */
    public function delStay($cart_no = '')
    {
        $query = $this->where('eat_type', '=', 20);
        if ($cart_no) {
            $query = $query->where('cart_no', '=', $cart_no);
        }else{
            $query = $query->where('is_stay', '=', 0);
        }
        // 是否有订单（已送厨）
        if ($order_id = $this->checkOrderByCardNo($cart_no)) {
            // 把送厨的订单删除
            (new OrderProduct)->where('order_id', '=', $order_id)->delete();
            // 把订单取消
            $detail = CommonOrderModel::detail($order_id);
            $detail?->cancels();
        }
        return $query->delete();
    }


    /**
     * 购物车列表 (含商品信息)
     */
    public function getCartList($shop_supplier_id, $table_id = 0, $eat_type = 20)
    {
        // 获取购物车商品列表
        $model = $this;
        if ($table_id) {
            $model = $model->where('table_id', '=', $table_id);
        }

        $list = $model->with(['product', 'sku', 'image.file'])
            ->field("*,(bag_price*product_num) as total_bag_price,(product_price*product_num) as line_money")
            ->where('eat_type', '=', $eat_type)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('is_stay', '=', 0)
            ->select();
        if ($list) {
            foreach ($list as $item) {
                $discount = DiscountProduct::getDiscount($item['product_id']);
                if ($item['product_num'] > 1 && $discount) {
                    $money = $item['price'] * ($item['product_num'] - 1) + round($item['price'] * $discount['discount'] / 10, 2);
                } else {
                    $money = $item['price'] * $item['product_num'];
                }
                $item['total_price'] = $money;
                $item['is_points_gift'] = $item['product']['is_points_gift'];
            }
        }
        return $list;
    }

    /**
     * 加入购物车
     */
    public function add($data, $shop_supplier_id)
    {
        //判断商品是否下架
        $product = $this->productState($data['product_id']);
        if (!$product) {
            $this->error = '商品已下架';
            return false;
        }
        $stockStatus = $this->productStockState($data['product_id'], $data['product_sku_id']);
        if (!$stockStatus) {
            $this->error = '商品库存不足';
            return false;
        }
        //判断是否存在
        $cart_id = $this->isExist($data, $shop_supplier_id);
        if ($cart_id) {
            return $this->where('cart_id', '=', $cart_id)->inc('product_num', $data['product_num'])->update();
        } else {
            $data['describe'] = trim($data['describe'], ';');
            $data['shop_supplier_id'] = $shop_supplier_id;
            return $this->save($data);
        }

    }

    /**
     * 判断购物车商品是否存在
     */
    public function isExist($data, $shop_supplier_id)
    {
        $model = $this;
        if (isset($data['table_id']) && $data['table_id']) {
            $model = $model->where('table_id', '=', $data['table_id']);
        }

        return $model->where('is_stay', '=', 0)
            ->where('product_id', '=', $data['product_id'])
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('product_sku_id', '=', $data['product_sku_id'])
            ->where('feed', '=', $data['feed'])
            ->where('attr', '=', $data['attr'])
            ->where('eat_type', '=', $data['eat_type'])
            ->value('cart_id');
    }

    /**
     * 加减商品
     */
    public function sub($param)
    {
        //判断商品是否下架
        $product = $this->productState($this['product_id']);
        if (!$product && $param['type'] != 'down') {
            $this->error = '商品已下架';
            return false;
        }
//        if ($param['type'] == 'down') {
//            if ($this['product_num'] <= 1) {
//                return $this->delete();
//            }
//            return $this->where('cart_id', '=', $this['cart_id'])->dec('product_num', 1)->update();
//        } elseif ($param['type'] == 'up') {
//            $stockStatus = $this->productStockState($this['product_id'], $this['product_sku_id']);
//            if (!$stockStatus) {
//                $this->error = '商品库存不足';
//                return false;
//            }
//            return $this->where('cart_id', '=', $this['cart_id'])->inc('product_num', 1)->update();
//        } elseif ($param['type'] == 'mid') {
//            $stockStatus = $this->getStockState($this['product_id'], $this['product_sku_id'], $param['product_num']);
//            if (!$stockStatus) {
//                $this->error = '商品库存不足';
//                return false;
//            }
//            return $this->save(['product_num' => $param['product_num']]);
//        }

        $stockStatus = $this->getStockState($this['product_id'], $this['product_sku_id'], $param['product_num']);
        if (!$stockStatus) {
            $this->error = '商品库存不足';
            return false;
        }
        if ($param['product_num'] <= 0) {
            return $this->delete();
        }
        return $this->save(['product_num' => $param['product_num']]);
    }

    /**
     *清空购物车
     */
    public function deleteAll($user)
    {
        return $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('cashier_id', '=', $user['cashier_id'])
            ->where('eat_type', '=', 20)
            ->where('is_stay', '=', 0)
            ->delete();
    }

    /**
     *清空桌号购物车
     */
    public function deleteTableAll($shop_supplier_id, $table_id)
    {
        $model = $this;
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('table_id', '=', $table_id)
            ->delete();
    }

    /**
     * 获取当前用户购物车商品总数量(含件数)
     */
    public function getProductNum($param, $eat_type, $table_id = 0)
    {
        $model = $this;
        if ($eat_type == 10) {
            $model = $model->where('table_id', '=', $table_id)->where(function ($query) use ($param) {
                $query->where('c.cashier_id', '=', 0)->whereOr('c.cashier_id', '=', $param['cashier_id']);
            });
        } else {
            $model = $model->where('c.cashier_id', '=', $param['cashier_id']);
        }
        $count = $model->alias('c')
            ->where('c.shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', $eat_type)
            ->sum('product_num');
        return $count ? $count : 0;
    }

    //获取购物车价格
    public function getCartInfo($param, $eat_type = 20, $table_id = 0)
    {
        $model = $this;
        if ($table_id) {
            $model = $model->where('table_id', '=', $table_id);
        }
        if ($eat_type == 10) {
            $model = $model->where(function ($query) use ($param) {
                $query->where('cashier_id', '=', 0)->whereOr('cashier_id', '=', $param['cashier_id']);
            });
        } else {
            $model = $model->where('cashier_id', '=', $param['cashier_id']);
        }
        $cartInfo = $model->where('shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', $eat_type)
            ->field("count(cart_id) as cart_num,sum(discount_money) as discount_money,sum(product_price*product_num) as line_money,sum(bag_price*product_num) as total_bag_price,sum(price*product_num) as total_price")
            ->find();
        if ($cartInfo && $cartInfo['cart_num'] > 0) {
            $cartInfo['discount_money'] = round($cartInfo['discount_money'] / $cartInfo['cart_num'], 2);
        }
        return $cartInfo;
    }

    //判断商品是否下架
    public function productState($product_id)
    {
        return (new ProductModel)->where('product_id', '=', $product_id)
            ->where('product_status', '=', 10)
            ->where('is_delete', '=', 0)
            ->count();
    }

    //判断商品库存
    public function productStockState($product_id, $product_sku_id)
    {
        return (new ProductSkuModel)->where('product_id', '=', $product_id)
            ->where('product_sku_id', '=', $product_sku_id)
            ->where('stock_num', '>', 0)
            ->count();
    }

    //判断商品库存
    public function getStockState($product_id, $product_sku_id, $product_num)
    {
        return (new ProductSkuModel)->where('product_id', '=', $product_id)
            ->where('product_sku_id', '=', $product_sku_id)
            ->where('stock_num', '>', $product_num)
            ->count();
    }

    //获取购物车数据
    public function getCartPrice($user, $delivery = 40, $eat_type = 20, $table_id = 0)
    {
        // 购物车价格
        $cartInfo = $this->getCartInfo($user, $eat_type, $table_id);
        // 购物车商品总数量
        $cartInfo['cart_total_num'] = $this->getProductNum($user, $eat_type, $table_id);
        // 门店信息
        $supplier = SupplierModel::detail($user['shop_supplier_id']);
        // 购物车总价
        $total_price = $cartInfo['total_price'];
        if ($supplier['storebag_type'] == 1) {
            $cartInfo['total_bag_price'] = $supplier['storebag_price'];
        }
        if ($delivery == 30) {
            $total_price = round($total_price + $cartInfo['total_bag_price'], 2);
        }
        $total_price = round($total_price - $cartInfo['discount_money'], 2);
        $cartInfo['total_pay_price'] = round($total_price, 2);
        return $cartInfo;
    }

    /**
     * 修改商品备注
     *
     * @param int $cart_id
     * @param string $remark
     * @return static
     */
    public function updateRemark($cart_id, $remark)
    {
        return $this->where('cart_id', '=', $cart_id)->update(['remark' => $remark]);
    }

    // 获取购物车 + 订单统计数据
    public function getOrderCartDetail($cashier, $table_id, $order_id = 0)
    {
        if ($order_id > 0) {
            // 购物车商品列表
            $order = OrderModel::detail($order_id);
            $cartList = (new static())->with('product')
                ->where('cashier_id', '=', $cashier['cashier_id'])
                ->where('order_id', '=', $order_id)
                ->select();
        } else if($table_id > 0){
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('cashier_id', '=', $cashier['cashier_id'])
                ->where('table_id', '=', $table_id)
                ->select();
            // 是否存在订单
            $order = OrderModel::detail([
                ['table_id', '=', $table_id],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
        } else {
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('cashier_id', '=', $cashier['cashier_id'])
                ->where('table_id', '=', 0)
                ->select();
            // 是否存在订单
            $order = null;
        }

        // 购物车列表统计
        $cart_product_price = 0;              // 购物车商品原价
        $cart_product_pay_price = 0;          // 购物车商品实付价钱
        $cart_user_discount_money = 0;        // 会员折扣
        foreach ($cartList as $product) {
            $cart_product_price += $product['price'] * $product['product_num'];
            $cart_product_pay_price += $product['product_price'] * $product['product_num'];
            $cart_user_discount_money += $product['price'] - $product['product_price'];
        }
        // 购物车消费税
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $cashier['shop_supplier_id']);
        $cart_consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $cart_consume_fee = floatval(helper::bcmul($cart_product_pay_price, $consume_rate));
        }
        // 购物车应付
        $cart_pay_price = helper::bcadd($cart_product_pay_price, $cart_consume_fee);
        // 订单信息
        if ($order) {
            $order_total_price = $order['total_price'];
            $order_service_money = $order['service_money'];
            $order_setting_service_money = $order['setting_service_money'];
            $order_discount_money = $order['discount_money'];
            $order_consumption_tax_money = $order['consumption_tax_money'];
            $order_user_discount_money = $order['user_discount_money'];
            $order_pay_price = $order['pay_price'];
        } else {
            $order_total_price = 0;
            $order_service_money = 0;
            $order_setting_service_money = 0;
            $order_discount_money = 0;
            $order_consumption_tax_money = 0;
            $order_user_discount_money = 0;
            $order_pay_price = 0;
        }
        // 订单 + 购物车 统计
        $total_price = helper::bcadd($order_total_price, $cart_product_pay_price);                         // 小计
        $service_money = helper::bcadd($order_service_money, $order_setting_service_money);                // 服务费
        $special_discount = $order_discount_money;                                                         // 優惠折扣
        $total_consumption_tax_money = helper::bcadd($order_consumption_tax_money, $cart_consume_fee);     // 消费税
        $total_user_discount_money = helper::bcadd($order_user_discount_money, $cart_user_discount_money); // 會員折扣
        $total_pay_price = helper::bcadd($order_pay_price, $cart_pay_price);                               // 应收

        return [
            'orderInfo' => $order ?? [],
            'cartInfo' => [
                'list' => $cartList,
                'cart_product_price' => $cart_product_price,                                 // 购物车商品原价
                'cart_product_pay_price' => $cart_product_pay_price,                         // 购物车商品实付价钱
                'cart_pay_price' => $cart_pay_price,                                         // 购物车实付价钱
                'cart_consumption_tax_money' => $cart_consume_fee,                           // 消费税
                'cart_user_discount_money' => $cart_user_discount_money,                     // 会员折扣
            ],
            'sumInfo' => [
                'subtotal' => $total_price,                                         // 小计
                'service_money' => $service_money,                                  // 服务费
                'special_discount' => $special_discount,                            // 優惠折扣
                'total_consumption_tax_money' => $total_consumption_tax_money,      // 消费税
                'total_user_discount_money' => $total_user_discount_money,          // 會員折扣
                'total_pay_price' => $total_pay_price,                              // 应收
            ],
        ];
    }

    public function getCartDetail($shop_supplier_id, $table_id)
    {
        $cartList = (new static())->with('product')
            ->where('table_id', '=', $table_id)
            ->select();

        // 购物车列表统计
        $cart_product_price = 0;              // 购物车商品原价
        $cart_product_pay_price = 0;          // 购物车商品实付价钱
        $cart_user_discount_money = 0;        // 会员折扣
        foreach ($cartList as $product) {
            $cart_product_price += $product['price'] * $product['product_num'];
            $cart_product_pay_price += $product['product_price'] * $product['product_num'];
            $cart_user_discount_money += $product['price'] - $product['product_price'];
        }
        // 购物车消费税
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $shop_supplier_id);
        $cart_consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $cart_consume_fee = floatval(helper::bcmul($cart_product_pay_price, $consume_rate));
        }
        // 购物车应付
        $cart_pay_price = helper::bcadd($cart_product_pay_price, $cart_consume_fee);

        return [
            'list' => $cartList,
            'cart_product_price' => $cart_product_price,                                 // 购物车商品原价
            'cart_product_pay_price' => $cart_product_pay_price,                         // 购物车商品实付价钱
            'cart_pay_price' => $cart_pay_price,                                         // 购物车实付价钱
            'cart_consumption_tax_money' => $cart_consume_fee,                           // 消费税
            'cart_user_discount_money' => $cart_user_discount_money,                     // 会员折扣
        ];
    }

    /**
     * 商品直接加入订单
     */
    public function addToOrder($data, $user)
    {
        //判断商品是否下架
        $product = $this->productState($data['product_id']);
        if (!$product) {
            $this->error = '商品已下架';
            return false;
        }
        $stockStatus = $this->productStockState($data['product_id'], $data['product_sku_id']);
        if (!$stockStatus) {
            $this->error = '商品库存不足';
            return false;
        }

        $this->startTrans();
        try {

            // 已存在order_id，直接添加到订单
            if (isset($data['order_id']) && $data['order_id'] > 0) {
                $orderProduct = new OrderProductModel;
                $order_product_id = $orderProduct->isExist($data);
                // 存在修改数量、否则新增
                if ($order_product_id) {
                    $orderProduct->where('order_product_id', '=', $order_product_id)->inc('total_num', $data['product_num'])->update();
                } else {
                    $productDetail = ProductModel::where('product_id', '=', $data['product_id'])->find();
                    $inArr = [
                        'order_id' => $data['order_id'],
                        'app_id' => self::$app_id,
                        'product_id' => $data['product_id'],
                        'product_name' => $productDetail['product_name'],
                        'image_id' => $productDetail['logo']['image_id'],
                        'deduct_stock_type' => $productDetail['deduct_stock_type'],
                        'spec_type' => $productDetail['spec_type'],
                        'product_sku_id' => $data['product_sku_id'],
                        'product_attr' => $data['describe'],
                        'content' => $productDetail['content'],
                        'product_price' => $data['price'],
                        'line_price' => $data['product_price'],
                        'total_num' => $data['product_num'],
                        'total_price' => $data['product_num'] * $data['price'],
                        'total_pay_price' => $data['product_num'] * $data['price'],
                    ];

                    $orderProduct->save($inArr);
                }
                $return_order = $data['order_id'];

            } else {
                // order_id不存在创建新订单再加入商品

                // 实例化订单service
                $param = [
                    'eat_type' => 10
                ];
                $orderService = new CashierOrderSettledService($user, [], $param);
                // 初始化订单信息
                $orderInfo = $orderService->settlementCashier();
                if ($orderService->hasError()) {
                    return $this->renderError($orderService->getError());
                }
                // 创建订单
                $order_id = $orderService->createOrder($orderInfo);
                if (!$order_id) {
                    return $this->renderError($orderService->getError() ?: '订单创建失败');
                }

                $productDetail = ProductModel::where('product_id', '=', $data['product_id'])->find();
                $inArr = [
                    'order_id' => $order_id,
                    'app_id' => self::$app_id,
                    'product_id' => $data['product_id'],
                    'product_name' => $productDetail['product_name'],
                    'image_id' => $productDetail['logo']['image_id'],
                    'deduct_stock_type' => $productDetail['deduct_stock_type'],
                    'spec_type' => $productDetail['spec_type'],
                    'product_sku_id' => $data['product_sku_id'],
                    'product_attr' => $data['describe'],
                    'content' => $productDetail['content'],
                    'product_price' => $data['price'],
                    'line_price' => $data['product_price'],
                    'total_num' => $data['product_num'],
                    'total_price' => $data['product_num'] * $data['price'],
                    'total_pay_price' => $data['product_num'] * $data['price'],
                ];

                (new OrderProductModel)->save($inArr);

                $return_order = $order_id;
            }

            (new OrderModel)->reloadPrice($return_order);
            $this->commit();
            return $return_order;

        } catch (\Exception $e) {
//            Log::error($e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }

    }
}