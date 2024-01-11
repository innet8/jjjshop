<?php

namespace app\cashier\model\order;

use app\common\model\plus\cashier\Cart as CartModel;
use app\common\model\plus\discount\DiscountProduct;
use app\common\model\supplier\Supplier as SupplierModel;
use app\cashier\model\product\Product as ProductModel;
use app\cashier\model\product\ProductSku as ProductSkuModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use app\common\library\helper;

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
     * 整单取消
     */
    public function delStay()
    {
        return $this->where('eat_type', '=', 20)
            ->where('is_stay', '=', 0)
            ->delete();
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
    public function stayCart($user)
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
        return $this->where('cart_id', 'in', $cartIds)->update($data);
    }

    /**
     * 取单
     */
    public function pickCart($cart_no, $user)
    {
        $status = $this->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('cashier_id', '=', $user['cashier_id'])
            ->where('eat_type', '=', 20)
            ->where('is_stay', '=', 0)
            ->count();
        if ($status > 0) {
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
        //购物车价格
        $cartInfo = $this->getCartInfo($user, $eat_type, $table_id);
        // 购物车商品总数量
        $cartInfo['cart_total_num'] = $this->getProductNum($user, $eat_type, $table_id);
        //门店信息
        $supplier = SupplierModel::detail($user['shop_supplier_id']);
        //购物车总价
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
     * @return void
     */
    public function updateRemark($cart_id, $remark)
    {
        return $this->where('cart_id', '=', $cart_id)->update(['remark' => $remark]);
    }

    /**
     * 送厨
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
            return $this->renderError('购物车商品不能为空');
        }
        $params['eat_type'] = 20;
        // 实例化订单service
        $orderService = new CashierOrderSettledService($user, $productList, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        // 订单结算提交
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        // 创建订单
        $order_id = $orderService->createOrder($orderInfo);
        if (!$order_id) {
            return $this->renderError($orderService->getError() ?: '订单创建失败');
        }
        // 移出购物车中已下单的商品
        $CartModel->deleteAll($this->cashier['user']);
        return $order_id;
    }
}