<?php

namespace app\cashier\service\order\settled;

use app\common\enum\order\OrderSourceEnum;
use app\cashier\model\order\Order as OrderModel;

/**
 * 普通订单结算服务类
 */
class CashierOrderSettledService extends CashierSettledService
{
    /**
     * 构造函数
     */
    public function __construct($user, $productList, $params)
    {
        parent::__construct($user, $productList, $params);
        //订单来源
        $this->orderSource = [
            'source' => OrderSourceEnum::CASHIER,
            'eat_type' => $params['eat_type']
        ];
        //自身构造,差异化规则
    }

    /**
     * 验证订单商品的状态
     */
    public function validateProductList()
    {
        //判断桌号是否被使用
        if ($this->orderSource['eat_type'] == 10) {
            if (isset($this->params['table_id']) && $this->params['table_id'] == 0) {
                $this->error = "桌号不能为空";
                return false;
            }
            $cashierOrder = OrderModel::where('table_id', '=', $this->params['table_id'])
                ->where('order_status', '=', 10)
                ->where('order_source', '=', 20)
                ->where('eat_type', '=', 10)
                ->find();
            if ($cashierOrder) {
                $this->error = "桌号已被使用";
                return false;
            }
            $Order = OrderModel::where('table_id', '=', $this->params['table_id'])
                ->where('order_status', '=', 10)
                ->where('pay_status', '=', 20)
                ->where('order_source', '=', 10)
                ->where('eat_type', '=', 10)
                ->find();
            if ($Order) {
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
            if ($product['product']['total_num'] > $product['sku']['stock_num']) {
                $this->error = "很抱歉，商品 [{$product['product']['product_name']}] 库存不足";
                return false;
            }
        }
        return true;
    }
}