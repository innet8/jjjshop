<?php

namespace app\api\model\order;

use app\common\model\plus\cashier\Cart as CartModel;
use app\api\model\supplier\Supplier as SupplierModel;
use app\api\model\product\Product as ProductModel;
use app\common\library\helper;
use app\api\model\product\ProductSku as ProductSkuModel;
use app\common\model\plus\discount\DiscountProduct;

/**
 * 收银购物车模型
 */
class CashierCart extends CartModel
{
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
    public function getList($data)
    {
        // 获取购物车商品列表
        $model = $this;
        $list = $model->alias('c')
            ->with(['product', 'image.file'])
            ->where('table_id', '=', $data['table_id'])
            ->where('c.shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', 10)
            ->field('c.*')
            ->select();
        return $list;
    }

    /**
     * 删除商品
     */
    public function delProduct($cart_id)
    {
        return $this->where('cart_id', '=', $cart_id)->delete();
    }


    /**
     * 购物车列表 (含商品信息)
     */
    public function getCartList($data)
    {
        // 获取购物车商品列表
        $model = $this;
        $list = $model->with(['product', 'sku', 'image.file'])
            ->where('table_id', '=', $data['table_id'])
            ->where('eat_type', '=', 10)
            ->where('shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->field("*,(bag_price*product_num) as total_bag_price")
            ->select();
        if ($list) {
            foreach ($list as &$item) {
                $discount = DiscountProduct::getDiscount($item['product_id']);
                if ($item['product_num'] > 1 && $discount) {
                    $money = $item['price'] * ($item['product_num'] - 1) + round($item['price'] * $discount['discount'] / 10, 2);
                } else {
                    $money = $item['price'] * $item['product_num'];
                }
                $item['total_price'] = $money;
                $item['is_points_gift'] = $item['product']['is_points_gift'];
                $item['is_enable_grade'] = $item['product']['is_enable_grade'];
                $item['total_line_money'] += $item['product_price'] * $item['product_num'];
            }
        }
        return $list;
    }

    /**
     * 购物车列表 (含商品信息)
     */
    public function getMealList($data)
    {
        // 获取购物车商品列表
        $model = $this;
        $list = $model->with(['product', 'sku', 'image.file'])
            ->where('table_id', '=', $data['table_id'])
            ->where('eat_type', '=', 10)
            ->where('shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->field("*,(bag_price*product_num) as total_bag_price,(product_price*product_num) as line_money")
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
                $item['is_enable_grade'] = $item['product']['is_enable_grade'];
                $item['total_line_money'] += $item['product_price'] * $item['product_num'];
            }
        }
        return $list;
    }

    /**
     * 加入购物车
     */
    public function add($data)
    {
        //判断商品是否下架
        $product = $this->productState($data['product_id']);
        if (!$product) {
            $this->error = '商品已下架';
            return false;
        }
        $stockStatus = $this->productStockState($data['product_id'], $data['product_sku_id']);
        if (!$stockStatus) {
            $this->error = '商品库存不足，请重新选择';
            return false;
        }
        //判断是否存在
        $cart_id = $this->isExist($data);
        if ($cart_id) {
            return $this->where('cart_id', '=', $cart_id)->inc('product_num', $data['product_num'])->update();
        } else {
            $data['describe'] = trim($data['describe'], ';');
            $data['app_id'] = self::$app_id;
            return $this->save($data);
        }

    }

    /**
     * 判断购物车商品是否存在
     */
    public function isExist($data)
    {
        $model = $this;
        if (isset($data['table_id']) && $data['table_id']) {
            $model = $model->where('table_id', '=', $data['table_id']);
        }
        $cart_id = $model->where('is_stay', '=', 0)
            ->where('product_id', '=', $data['product_id'])
            ->where('shop_supplier_id', '=', $data['shop_supplier_id'])
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
        if (!$product) {
            $this->error = '商品已下架';
            return false;
        }
        if ($param['type'] == 'down') {
            if ($this['product_num'] <= 1) {
                return $this->delete();
            }
            return $this->where('cart_id', '=', $this['cart_id'])->dec('product_num', 1)->update();
        } elseif ($param['type'] == 'up') {
            $stockStatus = $this->productStockState($this['product_id'], $this['product_sku_id']);
            if (!$stockStatus) {
                $this->error = '商品库存不足，请重新选择';
                return false;
            }
            return $this->where('cart_id', '=', $this['cart_id'])->inc('product_num', 1)->update();
        } elseif ($param['type'] == 'mid') {
            $stockStatus = $this->getStockState($this['product_id'], $this['product_sku_id'], $param['product_num']);
            if (!$stockStatus) {
                $this->error = '商品库存不足，请重新选择';
                return false;
            }
            return $this->save(['product_num' => $param['product_num']]);
        }
    }

    /**
     *清空桌号购物车
     */
    public function deleteTableAll($data)
    {
        return $this->where('shop_supplier_id', '=', $data['shop_supplier_id'])
            ->where('eat_type', '=', 10)
            ->where('table_id', '=', $data['table_id'])
            ->delete();
    }

    /**
     * 获取当前用户购物车商品总数量(含件数)
     */
    public function getProductNum($param)
    {
        $model = $this;
        $count = $model->alias('c')
            ->where('table_id', '=', $param['table_id'])
            ->where('c.shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', 10)
            ->sum('product_num');
        return $count ? $count : 0;
    }

    //获取购物车单个商品数量
    public function getSingleProductNum($product_id, $param)
    {
        $model = $this;
        $count = $model->alias('c')
            ->where('table_id', '=', $param['table_id'])
            ->where('c.shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', 10)
            ->where('product_id', '=', $product_id)
            ->sum('product_num');
        return $count ? $count : 0;
    }

    //获取购物车价格
    public function getCartInfo($param)
    {
        $model = $this;
        $cartInfo = $model->where('table_id', '=', $param['table_id'])
            ->where('shop_supplier_id', '=', $param['shop_supplier_id'])
            ->where('is_stay', '=', 0)
            ->where('eat_type', '=', 10)
            ->field("sum(product_price*product_num) as total_line_money,sum(bag_price*product_num) as total_bag_price,sum(price*product_num) as total_price,discount_money")
            ->find();
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

    //判断商品是否下架
    public function getStockState($product_id, $product_sku_id, $product_num)
    {
        return (new ProductSkuModel)->where('product_id', '=', $product_id)
            ->where('product_sku_id', '=', $product_sku_id)
            ->where('stock_num', '>', $product_num)
            ->count();
    }

    //获取购物车数据
    public function getCartPrice($data)
    {
        //购物车价格
        $cartInfo = $this->getCartInfo($data);
        // 购物车商品总数量
        $cartInfo['cart_total_num'] = $this->getProductNum($data);
        //门店信息
        $supplier = SupplierModel::detail($data['shop_supplier_id']);
        //购物车总价
        $total_price = $cartInfo['total_price'];
        if ($supplier['storebag_type'] == 1) {
            $cartInfo['total_bag_price'] = $supplier['storebag_price'];
        }
        if ($data['delivery'] == 30) {
            $total_price = round($total_price + $cartInfo['total_bag_price'], 2);
        } else {
            $cartInfo['total_bag_price'] = 0;
        }
        $total_price = round($total_price - $cartInfo['discount_money'], 2);
        $cartInfo['total_pay_price'] = round($total_price, 2);
        return $cartInfo;
    }

}