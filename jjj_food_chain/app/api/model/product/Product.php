<?php

namespace app\api\model\product;

use app\api\model\order\CashierCart;
use app\common\model\product\Product as ProductModel;
use app\common\service\product\BaseProductService;
use app\common\library\helper;
use app\api\model\order\Cart as CartModel;
use app\shop\model\plus\discount\DiscountProduct as DiscountProductModel;
use app\api\model\user\CardRecord as CardRecordModel;

/**
 * 商品模型
 */
class Product extends ProductModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'spec_rel',
        'delivery',
        'sales_initial',
        'sales_actual',
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 商品详情：HTML实体转换回普通字符
     */
    public function getContentAttr($value)
    {
        return htmlspecialchars_decode($value);
    }

    /**
     * 获取商品列表
     */
    public function getList($param, $userInfo = false)
    {
        // 获取商品列表
        $data = parent::getList($param, 1);

        // 隐藏api属性
        !$data->isEmpty() && $data->hidden(['content', 'image']);
        // 整理列表数据并返回
        $param['userInfo'] = $userInfo;
        return $this->setProductListDataFromApi($data, true, $param);
    }

    /**
     * 商品详情
     */
    public static function detail($product_id)
    {
        // 商品详情
        $detail = parent::detail($product_id);
        // 多规格商品sku信息
        $detail['product_multi_spec'] = BaseProductService::getSpecData($detail);
        return $detail;
    }

    /**
     * 获取商品详情页面
     */
    public function getDetails($param, $userInfo = false)
    {
        // 获取商品详情
        $detail = $this->with([
            'category',
            'image' => ['file'],
            'sku' => ['image']])
            ->where('product_id', '=', $param['product_id'])
            ->find();
        // 判断商品的状态
        if (empty($detail) || $detail['is_delete'] || $detail['product_status']['value'] != 10) {
            $this->error = '很抱歉，商品信息不存在或已下架';
            return false;
        }
        // 更新访问数据
        $this->where('product_id', '=', $detail['product_id'])->inc('view_times')->update();
        // 设置商品展示的数据
        $param['userInfo'] = $userInfo;
        $detail = $this->setProductListDataFromApi($detail, false, $param);
        return $detail;
    }

    /**
     * 设置商品展示的数据 api模块
     */
    private function setProductListDataFromApi(&$data, $isMultiple, $param)
    {
        return parent::setProductListData($data, $isMultiple, function ($product) use ($param) {
            // 计算并设置商品会员价
            $this->setProductGradeMoney($param, $product);
        });
    }

    /**
     * 设置商品的会员价
     */
    public function setProductGradeMoney($param, &$product)
    {
        $user = $param['userInfo'];
        //折扣商品标识
        $discountInfo = DiscountProductModel::getDiscount($product['product_id']);
        $product['discount'] = 0;
        if ($discountInfo) {
            $product['discount'] = $discountInfo['discount'];
        }
        $discount = 0;
        if ($user) {
            $discount = (new CardRecordModel)->getDiscount($user['user_id']);
        }
        //商品购物车数量
        $product['cart_num'] = 0;
        if ($user && isset($param['order_type'])) {
            if ($param['order_type'] == 2) {
                $num = (new CashierCart())->getSingleProductNum($product['product_id'], $param);
            } else {
                $num = (new CartModel())->getSingleProductNum($product['product_id'], $user);
            }
            $product['cart_num'] = $num;
        }
        if ($product['product_attr'] || $product['product_feed'] || $product['spec_type'] == 20) {
            $product['spec_types'] = 20;
        }
        // 会员等级状态
        $gradeStatus = (!empty($user) && $user['grade_id'] > 0 && !empty($user['grade']))
            && (!$user['grade']['is_delete']);
        // 判断商品是否参与会员折扣
        if (!$gradeStatus || !$product['is_enable_grade']) {
            $product['is_user_grade'] = false;
            return;
        }
        $alone_grade_type = 10;
        // 商品单独设置了会员折扣
        if ($product['is_alone_grade'] && isset($product['alone_grade_equity'][$user['grade_id']])) {
            if ($product['alone_grade_type'] == 10) {
                // 折扣比例
                $discountRatio = helper::bcdiv($product['alone_grade_equity'][$user['grade_id']], 100);
            } else {
                $alone_grade_type = 20;
                $discountRatio = helper::bcdiv($product['alone_grade_equity'][$user['grade_id']], $product['product_price'], 2);
            }
        } else {
            // 折扣比例
            $discountRatio = helper::bcdiv($user['grade']['equity'], 100);
        }
        if ($discount && $discountRatio) {
            $discountRatio = round($discountRatio * $discount, 3);
        } elseif ($discount) {
            $discountRatio = $discount;
        }
        if ($discountRatio < 1) {
            // 标记参与会员折扣
            $product['is_user_grade'] = true;
            // 会员折扣后的商品总金额
            if ($alone_grade_type == 20) {
                $product['product_price'] = $product['alone_grade_equity'][$user['grade_id']];
                $discount && $product['product_price'] = round($product['product_price'] * $discount, 2);
            } else {
                $product['product_price'] = helper::number2(helper::bcmul($product['product_price'], $discountRatio), true);
            }

            // 会员折扣价
            foreach ($product['sku'] as &$skuItem) {
                if ($alone_grade_type == 20) {
                    $skuItem['product_price'] = $product['alone_grade_equity'][$user['grade_id']];
                    $discount && $skuItem['product_price'] = round($skuItem['product_price'] * $discountRatio, 2);
                } else {
                    $skuItem['product_price'] = helper::number2(helper::bcmul($skuItem['product_price'], $discountRatio), true);
                }
            }
            //计算加料折扣
            if ($product['product_feed']) {
                $product_feed = $product['product_feed'];
                foreach ($product_feed as &$feed) {
                    $feed['discount_price'] = round($feed['price'] * $discountRatio, 2);
                }
                $product['product_feed'] = $product_feed;
            }
        } else {
            $product['is_user_grade'] = false;
        }
    }
}