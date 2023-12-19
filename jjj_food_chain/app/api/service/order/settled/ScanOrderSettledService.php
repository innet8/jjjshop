<?php

namespace app\api\service\order\settled;

use app\common\enum\order\OrderSourceEnum;
use app\api\model\order\Order as OrderModel;
use app\api\model\supplier\Supplier as SupplierModel;

/**
 * 扫码点餐订单结算服务类
 */
class ScanOrderSettledService extends OrderSettledService
{
    /**
     * 构造函数
     */
    public function __construct($user, $productList, $params)
    {
        parent::__construct($user, $productList, $params);
        //订单来源
        $this->orderSource = [
            'source' => OrderSourceEnum::SCAN,
            'activity_id' => 0
        ];
        //自身构造,差异化规则
    }

    /**
     * 验证订单商品的状态
     */
    public function validateProductList()
    {
        if (isset($this->params['table_id']) && $this->params['table_id'] > 0) {
            $order = OrderModel::where('table_id', '=', $this->params['table_id'])
                ->where('order_status', '=', 10)
                ->find();
            if ($order) {
                $this->error = "桌号已被使用";
                return false;
            }
        }
        foreach ($this->productList as $product) {
            // 判断商品是否下架
            if ($product['product']['product_status']['value'] != 10) {
                $this->error = "很抱歉，商品 [{$product['product']['product_name']}] 已下架";
                return false;
            }
            // 判断商品库存
            if ($product['product_num'] > $product['sku']['stock_num']) {
                $this->error = "很抱歉，商品 [{$product['product']['product_name']}] 库存不足";
                return false;
            }
            // 判断是否超过限购数量
            if ($product['product']['limit_num'] > 0) {
                $hasNum = OrderModel::getHasBuyOrderNum($this->user['user_id'], $product['product_id']);
                if ($hasNum + $product['product_num'] > $product['product']['limit_num']) {
                    $this->error = "很抱歉，购买超过此商品最大限购数量";
                    return false;
                }
            }
        }
        return true;
    }
}