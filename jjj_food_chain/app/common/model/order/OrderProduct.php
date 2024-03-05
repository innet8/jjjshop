<?php

namespace app\common\model\order;

use app\common\enum\order\OrderErrorEnum;
use app\common\enum\settings\SettingEnum;
use app\common\library\helper;
use app\common\model\BaseModel;
use app\common\model\settings\Setting as SettingModel;
use think\model\concern\SoftDelete;
use app\common\enum\order\OrderStatusEnum;
use app\common\model\order\Order as OrderModel;
use app\common\enum\product\DeductStockTypeEnum;
use app\common\service\order\OrderPrinterService;
use app\common\model\product\Product as ProductModel;
use app\common\service\product\factory\ProductFactory;
use app\common\model\product\ProductSku as ProductSkuModel;
use app\common\model\order\OrderProduct as OrderProductModel;

/**
 * 订单商品模型
 */
class OrderProduct extends BaseModel
{
    use SoftDelete;
    protected $name = 'order_product';
    protected $pk = 'order_product_id';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    protected $append = [
        'product_name_text',
        'kitchen_status', // 菜品状态 0-制作中 1-已完成
    ];

    /**
     * 菜品状态
     */
    public function getKitchenStatusAttr($value, $data)
    {
        try {
           return $data['is_send_kitchen'] == 1 && $data['finish_num'] == $data['total_num'] ? 1 : 0;
        } catch (\Throwable $th) {
            return 0;
        }
    }

    /**
     * 获取商品数据 (可指定某天)
     */
    public function getProductNameTextAttr($value, $data)
    {
        return extractLanguage($data['product_name']);
    }

    /**
     * 属性
     */
    public function getProductAttrAttr($value)
    {
        $values = explode(";", $value);
        foreach ($values as $key => $data) {
            $values[$key] = extractLanguage($values[$key]);
        }
        return trim(implode(";", $values), ";");
    }

    /**
     * 订单商品列表
     * @return \think\model\relation\BelongsTo
     */
    public function image()
    {
        return $this->belongsTo('app\\common\\model\\file\\UploadFile', 'image_id', 'file_id');
    }

    /**
     * 关联商品表
     * @return \think\model\relation\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product');
    }

    /**
     * 关联商品sku表
     * @return \think\model\relation\BelongsTo
     */
    public function sku()
    {
        return $this->belongsTo('app\\common\\model\\product\\ProductSku', 'spec_sku_id', 'spec_sku_id');
    }

    /**
     * 关联订单主表
     * @return \think\model\relation\BelongsTo
     */
    public function orderM()
    {
        return $this->belongsTo('Order', 'order_id', 'order_id');
    }

    /**
     * 关联分销商
     * @return \think\model\relation\BelongsTo
     */
    public function agent()
    {
        return $this->belongsTo('app\\common\\model\\agent\\Apply', 'agent_user_id', 'user_id');
    }

    /**
     * 订单商品详情
     * @param $where
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($where)
    {
        return static::with(['image', 'orderM'])->find($where);
    }

    /**
     * 获取商品数据 (可指定某天)
     */
    public function getProductData($startDate, $endDate, $type, $shop_supplier_id)
    {
        $model = $this;
        if ($shop_supplier_id > 0) {
            $model = $model->where('order.shop_supplier_id', '=', $shop_supplier_id);
        }
        $model = $model->alias('order_product')
            ->join('order order', 'order_product.order_id = order.order_id', 'left');

        $model = $model->where('order.create_time', '>=', strtotime($startDate));
        if (is_null($endDate)) {
            $model = $model->where('order.create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('order.create_time', '<', strtotime($endDate) + 86400);
        }

        if ($type == 'no_pay') {
            // 未支付
            return $model->where('order.pay_status', '=', 10)->sum('order_product.total_num');
        } else if ($type == 'pay') {
            // 已支付
            return $model->where('order.pay_status', '=', 20)->sum('order_product.total_num');
        }
        return 0;
    }

    /**
     * 判断订单未送厨商品是否存在
     */
    public function isExist($data)
    {
        $model = $this;
        $order_product_id = $model->where('is_send_kitchen', '=', 0)
            ->where('order_id', '=', $data['order_id'])
            ->where('product_id', '=', $data['product_id'])
            ->where('product_sku_id', '=', $data['product_sku_id'])
            ->where('product_attr', '=', $data['describe'])
            ->value('order_product_id');
        return $order_product_id;
    }

    //判断商品库存
    public function getStockState($product_num)
    {
        $deductStockType = ProductModel::where('product_id', $this->product_id)->value('deduct_stock_type');
        $orderProductNum = !$this->order_id ? 0 : OrderProductModel::where('order_id', $this->order_id)
            // 下单减库存
            ->when( $deductStockType == DeductStockTypeEnum::CREATE , function($q){
                $q->where('is_send_kitchen', 0);
            })
            //
            ->where('order_product_id', '<>', $this->order_product_id)
            ->where('product_id', '=', $this->product_id)
            ->where('product_sku_id', '=', $this->product_sku_id)
            ->sum('total_num');
        //
        return (new ProductSkuModel)->where('product_id', '=', $this->product_id)
            ->where('product_sku_id', '=', $this->product_sku_id)
            ->where('stock_num', '>', $orderProductNum + $product_num - 1)
            ->count();
    }

    //判断商品是否下架
    public function productState($product_id)
    {
        return (new ProductModel)->where('product_id', '=', $product_id)
            ->where('product_status', '=', 10)
            ->where('is_delete', '=', 0)
            ->count();
    }

    // 更改商品数量
    public function sub($param)
    {
        // 判断是否被锁定
        $order = $this->orderM()->find();
        if ($this->orderM()->value('is_lock') == 1) {
            $this->error = '订单已被锁定，请解锁后重新操作';
            return false;
        }
        // 检查自助餐商品可添加状态
        if ($order['is_buffet'] == 1 && $order['buffet_expired_time'] != -1 && $order['buffet_expired_time'] < time() && $param['type'] != 'down') {
            // 自助餐设置
            $buffetSetting = SettingModel::getSupplierItem(SettingEnum::BUFFET, $order['shop_supplier_id'] ?? 0, $order['app_id'] ?? 0);
            if ($buffetSetting['is_buy_continue'] != 1) {
                $this->error = '用餐时间已到，无法继续下单';
                return false;
            }
            if ($buffetSetting['is_buy_continue'] == 1 && $this['is_buffet_product'] == 1) {
                $this->error = '自助餐时间已到达，自助餐商品不可继续下单';
                return false;
            }

        }

        //判断商品是否下架
        $product = $this->productState($this['product_id']);
        if (!$product && $param['type'] != 'down') {
            $this->error = '商品已下架';
            return false;
        }
        //
        if ($param['type'] != 'down') {
            //
            $deductStockType = ProductModel::where('product_id', $this->product_id)->value('deduct_stock_type');
            if ($deductStockType == DeductStockTypeEnum::CREATE) {
                $stockStatus = $this->getStockState($param['product_num']);
                if (!$stockStatus) {
                    $this->error = '商品库存不足，请重新选择';
                    return false;
                }
            }
            // 判断限购
            if ($this['is_buffet_product'] == 1) {
                $limitNum = Order::getBuffetProductLimitNum($this['order_id'], $this['product_id'])  * $order['meal_num'];
            } else {
                $limitNum = ProductModel::getProductLimitNum($this['product_id']);
            }
            if ($limitNum && $param['product_num'] > $limitNum) {
                $this->error = '超过限购数量';
                return false;
            }
            // 判断当前订单
            $curNum = (new self)->where([
                'order_id' => $this['order_id'],
                'product_id' => $this['product_id'],
            ])->sum('total_num');
            if ($limitNum && (($param['product_num'] - $this['total_num'] + $curNum) > $limitNum)) {
                $this->error = '超过限购数量';
                return false;
            }
        }
        if ($param['product_num'] <= 0) {
            return $this->delete();
        }
        return $this->save(['total_num' => $param['product_num']]);
    }

    // 删除未送厨商品
    public function delProduct($order_product_id)
    {
        $this->startTrans();
        try {
            $orderProductIds = is_array($order_product_id) ? $order_product_id : [$order_product_id];
            $models = $this->where('order_product_id', 'in', $orderProductIds)->select();
            foreach($models as $model){
                $order_id = $model['order_id'];
                if (!$model) {
                    $this->error = '记录不存在';
                    return false;
                }
                // 检查订单状态
                $detail = OrderModel::detail([
                    ['order_id', '=', $order_id],
                    ['order_status', '=', OrderStatusEnum::NORMAL]
                ]);
                if (!$detail) {
                    $this->rollback();
                    $this->error = '当前订单不可修改';
                    return false;
                }
                if ($detail->is_lock == 1) {
                    $this->rollback();
                    $this->error = '订单已被锁定，请解锁后重新操作';
                    return false;
                }
                if ($model->is_send_kitchen == 1) {
                    $this->rollback();
                    $this->error = '商品已送厨，禁止删除';
                    return false;
                }
                $model->force()->delete();
                // 收银台订单副表为空删除主订单
                if (self::where('order_id', '=', $order_id)->count() == 0) {
                    $order = OrderModel::where('order_id', '=', $order_id)->find();
                    if ($order['table_id'] == 0) {
                        $order->force()->delete();
                    } else {
                        (new OrderModel)->reloadPrice($order_id);
                    }
                } else {
                    (new OrderModel)->reloadPrice($order_id);
                }
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }

    }

    // 未送厨商品备注
    public function updateKitchenRemark($order_product_id, $remark)
    {
        $orderProduct = $this->where('order_product_id', '=', $order_product_id)->find();
        if (empty($orderProduct)) {
            $this->error = '商品不存在';
            return false;
        }
        if ($orderProduct->orderM()->value('is_lock') == 1) {
            $this->error = '订单已被锁定，请解锁后重新操作';
            return false;
        }
        //
        $orderProduct->remark = $remark;
        $orderProduct->save();
        //
        return true;
    }

    // 收银端列表商品改价
    public function changePrice($order_product_id, $money)
    {
        $this->startTrans();
        try {
            if ($money < 0 || $money > 1000000) {
                $this->error = "价格错误";
                return false;
            }
            $p = OrderProduct::where('order_product_id', '=', $order_product_id)->find();
            if (!$p) {
                $this->error = "商品不存在";
                return false;
            }
            // 检查订单状态
            $detail = OrderModel::detail([
                ['order_id', '=', $p['order_id']],
                ['order_status', '=', OrderStatusEnum::NORMAL]
            ]);
            if (!$detail) {
                $this->error = '当前订单不可修改';
                return false;
            }
            if ($detail->is_lock == 1) {
                $this->error = '订单已被锁定，请解锁后重新操作';
                return false;
            }
            $p->product_price = $money;
            $p->total_price = helper::bcmul($money, $p->total_num);
            if ($p->save()) {
                // 更新
                (new OrderModel)->reloadPrice($p['order_id']);
                $this->commit();
                return true;
            } else {
                $this->error = "商品不存在";
                return false;
            }
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    // 送厨
    public function sendKitchen($order_id, $type='kitchen')
    {
        $order = (new OrderModel)->with(['unSendKitchenProduct'])->where('order_id', $order_id)->find();
        if (!$order) {
            $this->error = "订单不存在";
            return false;
        }
        if ($type != 'payment' && $order->is_lock == 1) {
            $this->error = '订单已被锁定，请解锁后重新操作';
            return false;
        }

        // 检查待送厨商品状态
        if ($order['is_buffet'] == 1 && $type != 'payment') {
            // 自助餐设置
            $buffetSetting = SettingModel::getSupplierItem(SettingEnum::BUFFET, $order['shop_supplier_id'], $order['app_id']);
            $buffet_remaining_time = Order::getBuffetRemainingTime($order['buffet_expired_time']);
            // 检查非自助餐商品超时
            foreach ($order['unSendKitchenProduct'] as $order_product) {
                if ($order_product['is_buffet_product'] != 1 && $buffet_remaining_time <= 0 && $order['buffet_expired_time'] != -1 && $buffetSetting['is_buy_continue'] != 1) {
                    $this->error = '用餐时间已到，无法继续下单';
                    return false;
                }
            }
            // 检查自助餐商品超时
            foreach ($order['unSendKitchenProduct'] as $order_product) {
                if ($order_product['is_buffet_product'] == 1 && $buffet_remaining_time <= 0 && $order['buffet_expired_time'] != -1) {
                    $this->error = '自助餐时间已到达，自助餐商品不可继续下单';
                    return false;
                }
            }
            // 检查限购
            $out_limit_num = [];
            foreach ($order['unSendKitchenProduct'] as $order_product) {
                if ($order_product['is_buffet_product'] == 1) {
                    $limitNum = Order::getBuffetProductLimitNum($order['order_id'], $order_product['product_id']) * $order['meal_num'];
                } else {
                    $limitNum = ProductModel::getProductLimitNum($order_product['product_id']);
                }
                $total_num = Order::getSendKitchenNum($order['order_id'], $order_product['product_id']) + Order::getUnSendKitchenNum($order['order_id'], $order_product['product_id']);
                if ($limitNum && $total_num > $limitNum) {
                    $out_limit_num[] = $order_product;
                }
            }
            if (count($out_limit_num) > 0) {
                $this->error = "超过限购数量";
                $this->errorData = $out_limit_num;
                $this->errorCode = OrderErrorEnum::OUT_LIMIT_NUM;
                return false;
            }
        }

        // 结账送厨判断
        if ($order['is_buffet'] == 1 && $type == 'payment') {
            // 自助餐设置
            $buffetSetting = SettingModel::getSupplierItem(SettingEnum::BUFFET, $order['shop_supplier_id'], $order['app_id']);
            $buffet_remaining_time = Order::getBuffetRemainingTime($order['buffet_expired_time']);
            // 检查非自助餐商品超时
            $product_list = [];
            $buffet_product_list = [];
            foreach ($order['unSendKitchenProduct'] as $order_product) {
                if ($order_product['is_buffet_product'] != 1 && $buffet_remaining_time <= 0 && $order['buffet_expired_time'] != -1 && $buffetSetting['is_buy_continue'] != 1) {
                    $product_list[] = $order_product;
                } else if($order_product['is_buffet_product'] == 1 && $buffet_remaining_time <= 0 && $order['buffet_expired_time'] != -1) {
                    $buffet_product_list[] = $order_product;
                }
            }
            $notice_list = array_merge($product_list, $buffet_product_list);
            if ($buffetSetting['is_buy_continue'] != 1) {
                $this->error = '用餐时间已到，请先删除未送厨商品';
            } else {
                $this->error = '自助餐时间已到达，请先删除未送厨商品';
            }

            if (count($notice_list) > 0) {
                $this->errorData = $notice_list;
                $this->errorCode = OrderErrorEnum::OUT_LIMIT_TIME;
                return false;
            }
        }

        $this->startTrans();
        try {
            //
            $res = ProductFactory::getFactory($order['order_source'])->updateOrderProductStock($order['unSendKitchenProduct'], $type);
            if ($res !== true) {
                $this->error = "商品库存不足，请重新选择";
                $this->errorData = $res;
                return false;
            }
            //
            $order->where('order_id', $order_id)->inc('extra_times', 1)->update();
            // 送厨更新取单号
            if ($order->table_id == 0 && $order->callNo == ''){
                $order->callNo = getTableNumber();
                $order->save();
            }
            // 获取未送厨产品
            $order['product'] = $order->product()->where('is_send_kitchen', 0)->select();
            // 更新前打印数据
            $printOrder = $order;
            //
            $this->where('order_id', '=', $order_id)->where('is_send_kitchen', '=', 0)->update(['is_send_kitchen' => 1, 'send_kitchen_time' => time()]);
            $this->commit();
            //
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
        // 菜品打印
        (new OrderPrinterService)->printProductTicket($printOrder, 30);
        //
        return true;
    }

    // 订单送厨商品按送厨时间分组
    public static function getGroupByTime($order_id)
    {
        $orderProductList = OrderProduct::where('order_id', '=', $order_id)->where('is_send_kitchen', '=', 1)->select();
        $result = [];
        foreach ($orderProductList as $orderProduct) {
            $sendKitchenTime = $orderProduct->send_kitchen_time;
            if (!isset($result[$sendKitchenTime])) {
                $result[$sendKitchenTime] = [];
            }
            $result[$sendKitchenTime]['plist'][] = $orderProduct;
            $result[$sendKitchenTime]['timestamp'] = $orderProduct->send_kitchen_time;
            $result[$sendKitchenTime]['date'] = format_time_his($orderProduct->send_kitchen_time);
        }
        return $result;
    }
}