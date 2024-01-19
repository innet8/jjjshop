<?php

namespace app\cashier\model\order;

use app\common\enum\order\OrderStatusEnum;
use app\common\enum\settings\SettingEnum;
use app\common\model\order\OrderProduct;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\plus\cashier\Cart as CartModel;
use app\common\model\plus\discount\DiscountProduct;
use app\common\model\order\Order as CommonOrderModel;
use app\common\model\order\OrderProduct as OrderProductModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\cashier\model\user\User as UserModel;
use app\cashier\model\order\Order as OrderModel;
use app\cashier\model\product\Product as ProductModel;
use app\cashier\model\user\CardRecord as CardRecordModel;
use app\cashier\model\product\ProductSku as ProductSkuModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use app\common\library\helper;
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

    // 重新计算购物车价格信息 1
    public function reloadPrice($cashier, $table_id, $order_id = 0)
    {
        trace('收银员');
        trace($cashier);
        if ($order_id > 0) {
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('cashier_id', '=', $cashier['cashier_id'])
                ->where('order_id', '=', $order_id)
                ->select();
            // 是否存在订单
            $order = OrderModel::detail($order_id);
        } else {
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
        }
        $user_id = $order ? $order['user_id'] : 0;
        trace('会员ID');
        trace($user_id);

        $pay_money = 0;
        $order_price = 0;
        $user_discount_money = 0;
        $user = UserModel::detail($user_id);

        foreach ($cartList as $product) {
            // 会员等级抵扣的金额
            $grade_ratio = 0;
            // 会员折扣的商品单价
            $grade_product_price = 0;
            // 会员折扣的总额差
            $grade_total_money = 0;
            if ($product->product['is_enable_grade'] && $product['price'] > 0) {

                if ($user) {
                    $discount = (new CardRecordModel)->getDiscount($user['user_id']);
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
                    $discountRatio = round($discountRatio * $discount, 2);
                } elseif ($discount) {
                    // 会员卡
                    $discountRatio = $discount;
                }
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

            $updateArr = [
                'user_id' => $user_id,
                'product_price' => $grade_product_price,   // 购物车价格（可能是原价或折扣的）
            ];
            $product->save($updateArr);

            // 累加
            $pay_money += $product['total_price'];  // 实付金额
            $order_price += $product['price'] * $product['product_num'];  // 商品原价
            $user_discount_money += $grade_total_money; // 商品优惠金额
        }

        $total_price = $pay_money; // 订单商品总价（不是商品原价总价、是商品折扣后(如果有)的总价）
        // 消费税计算
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $cashier['shop_supplier_id']);
        $consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $consume_fee = floatval(helper::bcmul($total_price, $consume_rate));
        }

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
     * 挂单数量
     */
    public function stayNum($user)
    {
        return $this->alias('c')
            ->where('c.shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('c.cashier_id', '=', $user['cashier_id'])
            ->where('is_stay', '=', 1)
            ->where('eat_type', '=', 20)
            ->group('cart_no')
            ->count();
    }

    /**
     * 购物车列表 (含商品信息)
     */
    public function getCartList($user, $table_id = 0, $eat_type = 20)
    {
        // 获取购物车商品列表
        $model = $this;
        if ($table_id) {
            $model = $model->where('table_id', '=', $table_id);
        }
        if ($eat_type == 10) {
            $model = $model->where(function ($query) use ($user) {
                $query->where('cashier_id', '=', 0)->whereOr('cashier_id', '=', $user['cashier_id']);
            });
        } else {
            $model = $model->where('cashier_id', '=', $user['cashier_id']);
        }
        $list = $model->with(['product', 'sku', 'image.file'])
            ->field("*,(bag_price*product_num) as total_bag_price,(product_price*product_num) as line_money")
            ->where('eat_type', '=', $eat_type)
            ->where('shop_supplier_id', '=', $user['shop_supplier_id'])
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
     * 获取挂单列表
     */
    public function getStayList($user)
    {
        $list = $this->alias('c')
            ->where('c.shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('c.cashier_id', '=', $user['cashier_id'])
            ->where('is_stay', '=', 1)
            ->where('eat_type', '=', 20)
            ->group('cart_no')
            ->order('stay_time asc')
            ->field('c.*')
            ->select();
        foreach ($list as &$item) {
            $item['stay_time'] = date('Y-m-d H:i:s', $item['stay_time']);
            $item['total_price'] = $item['price'] * $item['product_num'];
            $item['product'] = $this->alias('c')
                ->with(['product', 'image.file'])
                ->where('c.shop_supplier_id', '=', $user['shop_supplier_id'])
                ->where('c.cashier_id', '=', $user['cashier_id'])
                ->where('is_stay', '=', 1)
                ->where('cart_no', '=', $item['cart_no'])
                ->field('c.*')
                ->select();
        }
        return $list;
    }

    /**
     * 挂单
     */
    public function stayCart($user, $order_id = 0)
    {
        // 获取当前购物车商品列表
        $model = $this;
        $cartIds = $model->alias('c')
            ->where('c.shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('c.cashier_id', '=', $user['cashier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', 20)
            ->column('cart_id');
        if (count($cartIds) == 0) {
            $this->error = "暂无商品挂单";
            return false;
        }
        $data['is_stay'] = 1;
        $cartInfo = $model->where('cart_id', 'in', $cartIds)->find();
        if (!$cartInfo['cart_no']) {
            $data['cart_no'] = date('YmdHis');
            $data['stay_time'] = time();
        }
        // 送厨挂单
        if ($order_id > 0) {
            $data['order_id'] = $order_id;
        }
        return $this->where('cart_id', 'in', $cartIds)->update($data);
    }

    /**
     * 取单
     */
    public function pickCart($cart_no, $user)
    {
        $count = $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('cashier_id', '=', $user['cashier_id'])
            ->where('eat_type', '=', 20)
            ->where('is_stay', '=', 0)
            ->count();
        if ($count > 0) {
            $this->error = "购物车内存在商品,请先结账或者挂单后再取单";
            return false;
        }
        return $this->where('cart_no', 'in', $cart_no)->update(['is_stay' => 0]);
    }

    /**
     * 删单
     */
    public function delCart($cart_no)
    {
        return $this->where('cart_no', '=', $cart_no)->delete();
    }

    /**
     * 折扣抹零
     */
    public function changeMoney($user, $data)
    {
        $cartInfo = $this->getCartPrice($user);
        switch ($data['type']) {
            case '1'://改价
                return $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                    ->where('cashier_id', '=', $user['cashier_id'])
                    ->where('is_stay', '=', 0)
                    ->where('eat_type', '=', 20)
                    ->update(['discount_money' => round($cartInfo['total_price'] - $data['money'], 2)]);
                break;
            case '2'://折扣
                if ($data['rate'] > 10) {
                    $this->error = "请输入合理的折扣";
                    return false;
                }
                return $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                    ->where('cashier_id', '=', $user['cashier_id'])
                    ->where('is_stay', '=', 0)
                    ->where('eat_type', '=', 20)
                    ->update(['discount_money' => round($cartInfo['total_price'] * (10 - $data['rate']) / 10, 2)]);
                break;
            case '3'://抹零
                if ($data['discountType'] == 1) {//抹分
                    return $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                        ->where('cashier_id', '=', $user['cashier_id'])
                        ->where('is_stay', '=', 0)
                        ->where('eat_type', '=', 20)
                        ->update(['discount_money' => round($cartInfo['total_price'] - intval($cartInfo['total_price'] * 10) / 10, 2)]);
                } elseif ($data['discountType'] == 2) {//抹角
                    return $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                        ->where('cashier_id', '=', $user['cashier_id'])
                        ->where('is_stay', '=', 0)
                        ->where('eat_type', '=', 20)
                        ->update(['discount_money' => round($cartInfo['total_price'] - intval($cartInfo['total_price']), 2)]);
                } elseif ($data['discountType'] == 3) {//四舍五入到角
                    $discount_money = $cartInfo['total_price'] - round($cartInfo['total_price'], 1);
                    $discount_money = round($discount_money, 2);
                    $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                        ->where('cashier_id', '=', $user['cashier_id'])
                        ->where('is_stay', '=', 0)
                        ->where('eat_type', '=', 20)
                        ->update(['discount_money' => $discount_money]);
                    return true;
                } elseif ($data['discountType'] == 4) {//四舍五入到元
                    $discount_money = $cartInfo['total_price'] - round($cartInfo['total_price'], 0);
                    $discount_money = round($discount_money, 2);
                    $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
                        ->where('cashier_id', '=', $user['cashier_id'])
                        ->where('is_stay', '=', 0)
                        ->where('eat_type', '=', 20)
                        ->update(['discount_money' => $discount_money]);
                    return true;
                }
                break;
        }
    }

    /**
     * 加入购物车
     */
    public function add($data, $user)
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
        $cart_id = $this->isExist($data, $user);
        if ($cart_id) {
            return $this->where('cart_id', '=', $cart_id)->inc('product_num', $data['product_num'])->update();
        } else {
            $data['describe'] = trim($data['describe'], ';');
            $data['app_id'] = self::$app_id;
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
            $data['cashier_id'] = $user['cashier_id'];
            return $this->save($data);
        }

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
                // 获取订单信息
                $orderInfo = $orderService->settlementCashier();
                // 订单结算提交
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
            Log::error($e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }


    }

    /**
     * 判断购物车商品是否存在
     */
    public function isExist($data, $user)
    {
        $model = $this;
        if (isset($data['table_id']) && $data['table_id']) {
            $model = $model->where('table_id', '=', $data['table_id']);
        }
        if ($data['eat_type'] == 10) {
            $model = $model->where(function ($query) use ($user) {
                $query->where('cashier_id', '=', 0)->whereOr('cashier_id', '=', $user['cashier_id']);
            });
        } else {
            $model = $model->where('cashier_id', '=', $user['cashier_id']);
        }
        $cart_id = $model->where('is_stay', '=', 0)
            ->where('product_id', '=', $data['product_id'])
            ->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('product_sku_id', '=', $data['product_sku_id'])
            ->where('feed', '=', $data['feed'])
            ->where('attr', '=', $data['attr'])
            ->where('eat_type', '=', $data['eat_type'])
            ->value('cart_id');
        return $cart_id;
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
    public function deleteTableAll($user, $table_id)
    {
        $model = $this;
        $model = $model->where(function ($query) use ($user) {
            $query->where('cashier_id', '=', 0)->whereOr('cashier_id', '=', $user['cashier_id']);
        });
        return $model->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('eat_type', '=', 10)
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

    /**
     * 收银-送厨
     *
     * @param [type] $params
     * @param [type] $user
     * @return int
     */
    public function sendKitchen($params, $user)
    {
        $CartModel = new static();
        // 购物车商品列表
        $productList = $CartModel->getCartList($user);
        if (count($productList) <= 0) {
            $this->error = '购物车商品不能为空';
            return false;
        }
        $params['eat_type'] = 20;
        $order_id = isset($params['order_id']) ? $params['order_id'] : 0;
        if ($order_id > 0) {
            // 加餐订单提交
            if (!(new OrderModel)->mealHallOrder($productList, $params)) {
                $this->error = '订单创建失败';
                return false;
            }
        }else{
            // 实例化订单service
            $orderService = new CashierOrderSettledService($user, $productList, $params);
            // 获取订单信息
            $orderInfo = $orderService->settlement();
            // 订单结算提交
            if ($orderService->hasError()) {
                $this->error = $orderService->getError();
                return false;
            }
            // 创建订单
            $order_id = $orderService->createOrder($orderInfo);
            if (!$order_id) {
                $this->error = $orderService->getError() ?: '订单创建失败';
                return false;
            }
        }

        // 移出购物车中已下单的商品
        $CartModel->deleteAll($user);
        return $order_id;
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
                ->where('is_stay', '=', 0)
                ->select();
        } else if($table_id > 0){
            // 购物车商品列表
            $cartList = (new static())->with('product')
                ->where('cashier_id', '=', $cashier['cashier_id'])
                ->where('table_id', '=', $table_id)
                ->where('is_stay', '=', 0)
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
                ->where('order_id', '=', 0)
                ->where('is_stay', '=', 0)
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

    // 预计算 购物车 + 订单 价格
    public function preOrderCartPrice($shop_supplier_id, $mobile, $table_id, $order_id)
    {
        // 用户信息
        $user = (new UserModel)->where('mobile', $mobile)->with(['grade', 'card'])->find();
//        if (!$user) {
//            $this->error = "用户不存在";
//            return false;
//        }

        // 桌台
        $table_service_money = 0;
        if ($table_id > 0) {
            // 计算订单会员优惠后价格
            $order = (new OrderModel())->getOrderInfo($table_id);
            $order_arr = self::prePriceByOrder($order, $user);
            // 桌台服务费
            $serviceType = $order['supplier']['serviceType'];
            $service_money = $order['supplier']['service_money'];
            $meal_num = $order['meal_num'] ?? 0; //就餐人数
            if ($serviceType == 0) {
                $table_service_money = round($service_money * $meal_num, 2);
            }
            // 计算购物车会员优惠后价格
            $cartList = (new static())->with('product')
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->where('table_id', '=', $table_id)
                ->where('is_stay', '=', 0)
                ->select();
            $cart_arr = self::prePriceByCart($cartList, $user);
        } else if ($order_id > 0) {
            $order = OrderModel::detail($order_id);
            $order_arr = self::prePriceByOrder($order, $user);
            // 计算购物车会员优惠后价格
            $cartList = (new static())->with('product')
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->where('order_id', '=', $order_id)
                ->where('is_stay', '=', 0)
                ->select();
            $cart_arr = self::prePriceByCart($cartList, $user);
        } else {
            $order_arr = [
                'order_total_product_price' => 0,
                'order_total_pay_price' => 0,
                'order_total_user_discount_money' => 0
            ];
            // 计算购物车会员优惠后价格
            $cartList = (new static())->with('product')
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->where('table_id', '=', 0)
                ->where('is_stay', '=', 0)
                ->select();
            $cart_arr = self::prePriceByCart($cartList, $user);
        }

        // 订单 + 购物车 总计
        $total_product_price = $order_arr['order_total_product_price'] + $cart_arr['cart_total_product_price'];                              // 总商品原价
        $total_product_pay_price = $order_arr['order_total_pay_price'] + $cart_arr['cart_total_pay_price'];                                  // 总商品实付
        $total_user_discount_money = $order_arr['order_total_user_discount_money'] + $cart_arr['cart_total_user_discount_money'];            // 总会员优惠金额
        // 服务费
        // 订单服务费（非桌台）计算
        $serviceFee = SettingModel::getSupplierItem(SettingEnum::SERVICE_CHARGE, $shop_supplier_id);
        if ($serviceFee['is_open']) {
            $service_fee = $serviceFee['service_charge'];
        } else {
            $service_fee = 0;
        }
        $total_service_money = $table_service_money + $service_fee; // 总服务费
        // 消费税
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $shop_supplier_id);
        $consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = $consumeFee['tax_rate'];
            $consume_fee = floatval(helper::bcmul($total_product_pay_price, $consume_rate));
        }
        $total_consumption_tax_money = $consume_fee;    // 总消费税

        return compact('total_product_price', 'total_product_pay_price', 'total_user_discount_money', 'total_service_money', 'total_consumption_tax_money');

    }

    // 预算订单会员优惠后价格
    public static function prePriceByOrder($order, $user)
    {
        $pay_money = 0;
        $order_price = 0;
        $user_discount_money = 0;

        if ($order) {
            foreach ($order['product'] as $product) {
                // 会员折扣的总额差
                $grade_total_money = 0;
                if ($product->product['is_enable_grade'] && $product['total_price'] > 0) {
                    if ($user) {
                        $discount = (new CardRecordModel)->getDiscount($user['user_id']);
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
                        $discountRatio = round($discountRatio * $discount, 2);
                    } elseif ($discount) {
                        // 会员卡
                        $discountRatio = $discount;
                    }
                    trace('折扣比例');
                    trace($discountRatio);
                    if ($discountRatio <= 1) {
                        if ($alone_grade_type == 20) {
                            // 固定金额
                            $grade_product_price = $product['alone_grade_equity'][$user['grade_id']];
                            $discount && $grade_product_price = round($grade_product_price * $discount, 2);
                        } else {
                            // 商品会员折扣后单价
                            $grade_product_price = helper::number2(helper::bcmul($product['product_price'], $discountRatio), true);
                            trace('商品会员折扣后单价');
                            trace($grade_product_price);
                        }
                        $productDiscount = DiscountProduct::getDiscount($product['product_id']);
                        trace('========');
                        trace($product['total_num']);
                        trace('========');
                        if ($product['total_num'] > 1 && $productDiscount) {
                            $gradeTotalPrice = $grade_product_price * ($product['total_num'] - 1) + round($grade_product_price * $productDiscount['discount'] / 10, 2);
                        } else {
                            $gradeTotalPrice = $grade_product_price * $product['total_num'];
                            trace('商品会员折扣后单价 * 数量');
                            trace($gradeTotalPrice);
                        }
                        $is_user_grade = !($discountRatio == 1);
                        $grade_ratio = $discountRatio == 1 ? 0 : $discountRatio;
                        trace('折扣');
                        trace($grade_ratio);
                        // 原商品总价 - 折扣后
                        trace('原商品总价');
                        trace($product['total_price']);
                        trace($product['product_price']);
                        $grade_total_money = helper::number2(helper::bcsub($product['product_price'] * $product['total_num'], $gradeTotalPrice));
                        trace('优惠后与原商品差价');
                        trace($grade_total_money);
                        $product['total_price'] = $gradeTotalPrice;
                    }
                }

                // 主表order数据累加
                $pay_money += $product['total_price'];  // 实付金额
                $order_price += $product['product_price'] * $product['total_num'];  // 商品原价
                $user_discount_money += $grade_total_money; // 商品优惠金额
            }
        }

        $total_price = $pay_money; // 订单商品总价（不是商品原价总价、是商品折扣后(如果有)的总价）

        return [
            'order_total_product_price' => $order_price,                             // 订单商品原价
            'order_total_pay_price' => $total_price,                                 // 订单商品实付价钱(原价 - 优惠)
            'order_total_user_discount_money' => $order_price - $total_price,               // 订单会员折扣优惠金额
        ];

    }

    // 预算购物车会员优惠后价格
    public static function prePriceByCart($cartList, $user = null)
    {
        $pay_money = 0;
        $order_price = 0;
        $user_discount_money = 0;

        trace('======');
        trace($cartList);
        trace('======');
        foreach ($cartList as $product) {
            // 会员等级抵扣的金额
            $grade_ratio = 0;
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
                    $discountRatio = round($discountRatio * $discount, 2);
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

            // 累加
            $pay_money += $product['total_price'];  // 实付金额
            $order_price += $product['price'] * $product['product_num'];  // 商品原价
            $user_discount_money += $grade_total_money; // 商品优惠金额
        }

        return [
            'cart_total_product_price' => $order_price,                           // 购物车商品原价
            'cart_total_pay_price' => $pay_money,                                 // 购物车商品实付价钱(原价 - 优惠)
            'cart_total_user_discount_money' => $user_discount_money,             // 购物车会员折扣优惠金额
        ];

    }
}