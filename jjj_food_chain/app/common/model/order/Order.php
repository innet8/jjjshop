<?php

namespace app\common\model\order;

use app\api\model\user\CardRecord as CardRecordModel;
use app\cashier\service\order\settled\CashierOrderSettledService;
use app\common\enum\order\OrderSourceEnum;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\settings\SettingEnum;
use app\common\model\BaseModel;
use app\common\enum\settings\DeliveryTypeEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\library\helper;
use app\common\model\order\OrderProduct as OrderProductModel;
use app\common\model\product\Product as ProductModel;
use app\common\model\product\ProductSku as ProductSkuModel;
use app\common\model\plus\discount\DiscountProduct;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderPrinterService;
use app\common\service\order\OrderService;
use app\common\service\order\OrderCompleteService;
use app\common\service\deliveryapi\DadaApi;
use app\common\exception\BaseException;
use app\common\service\deliveryapi\MeTuanApi;
use app\common\service\deliveryapi\UuApi;
use app\common\service\product\factory\ProductFactory;
use think\facade\Log;
use think\model\concern\SoftDelete;
use app\common\model\user\User as UserModel;

/**
 * 订单模型模型
 */
class Order extends BaseModel
{
    use SoftDelete;
    protected $pk = 'order_id';
    protected $name = 'order';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'state_text',
        'order_source_text',
        'order_type_text',
        'deliver_text',
        'elapsed_time',
        'pay_time_text'
    ];

    /**
     * 订单商品列表
     */
    public function product()
    {
        return $this->hasMany('app\\common\\model\\order\\OrderProduct', 'order_id', 'order_id')->hidden(['content']);
    }

    /**
     * 收银员
     */
    public function cashier()
    {
        return $this->hasOne('app\\common\\model\\shop\\User', 'shop_user_id', 'cashier_id')->hidden(['update_time','password','user_name']);
    }
    /**
     * 关联订单收货地址表
     */
    public function address()
    {
        return $this->hasOne('app\\common\\model\\order\\OrderAddress');
    }

    /**
     * 关联自提订单联系方式
     */
    public function extract()
    {
        return $this->hasOne('app\\common\\model\\order\\OrderExtract');
    }

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联配送信息
     */
    public function deliver()
    {
        return $this->belongsTo('app\\common\\model\\order\\OrderDeliver', 'order_id', 'order_id')->order('deliver_id desc');
    }

    //  已送厨
    public function sendKitchenProduct()
    {
        return $this->hasMany('app\\common\\model\\order\\OrderProduct', 'order_id', 'order_id')->where('is_send_kitchen', 1)->hidden(['content']);
    }

    // 未送厨
    public function unSendKitchenProduct()
    {
        return $this->hasMany('app\\common\\model\\order\\OrderProduct', 'order_id', 'order_id')->where('is_send_kitchen', 0)->hidden(['content']);
    }

    // 订单生成时间长度
    public function getElapsedTimeAttr($value, $data)
    {
        if (isset($data['create_time'])) {
            // 获取当前时间
            $currentTime = time();
            // 获取订单生成时间
            $generateTime = $data['create_time'];
            // 返回时间长度
            return $currentTime - $generateTime;
        }
        return 0;
    }

    // 支付时间格式化
    public function getPayTimeTextAttr($value, $data)
    {
        return isset($data['pay_time']) && $data['pay_time'] != 0 ? format_time_his($data['pay_time']) : '-';
    }

    /**
     * 订单状态文字描述
     * @param $value
     * @param $data
     * @return string
     */
    public function getStateTextAttr($value, $data)
    {

        // 订单状态
        if (in_array($data['order_status'], [20, 30])) {
            return OrderStatusEnum::data($data['order_status'])['name'];
        }
        // 付款状态
        if ($data['pay_status'] == 10) {
            return OrderPayStatusEnum::data($data['pay_status'])['name'];
        }
        // 发货状态
        if ($data['order_status'] == 10) {
            if ($data['delivery_type'] == 10 && $data['delivery_status'] == 10) {
                return __('待配送');
            }
            if ($data['delivery_type'] == 10 && $data['delivery_status'] == 20) {
                return __('配送中');
            }
            return OrderStatusEnum::data($data['order_status'])['name'];
        }

        return $value;
    }

    /**
     * 订单状态文字描述
     * @param $value
     * @param $data
     * @return string
     */
    public function getDeliverTextAttr($value, $data)
    {
        // 订单状态待接单＝1,待取货＝2,配送中＝3,已完成＝4,已取消＝5, 指派单=8
        if (in_array($data['order_status'], [20, 30])) {
            return OrderStatusEnum::data($data['order_status'])['name'];
        }
        // 发货状态
        if ($data['delivery_status'] == 10) {
            return __('待配送');
        }
        // 发货状态
        if ($data['delivery_status'] == 20) {
            $deliverStatus = [0 => __('待接单'), 1 => __('待接单'), 2 => __('待取货'), 3 => __('配送中'), 4 => __('已完成')];
            return $deliverStatus[$data['deliver_status']];
        }
        return $value;
    }

    /**
     * 付款状态
     * @param $value
     * @return array
     */
    public function getPayTypeAttr($value)
    {
        return [
            'text' => OrderPayTypeEnum::data($value)['name'],
            'value' => $value
        ];
    }

    /**
     * 订单类型
     * @param $value
     * @return string
     */
    public function getOrderTypeTextAttr($value, $data)
    {
        return $data['order_type'] == 0 ? __('外卖订单') : __('店内订单');
    }

    /**
     * 订单来源
     * @param $value
     * @return string
     */
    public function getOrderSourceTextAttr($value, $data)
    {
        return OrderSourceEnum::data($data['order_source'])['name'];
    }

    /**
     * 付款状态
     * @param $value
     * @return array
     */
    public function getPayStatusAttr($value)
    {
        return [
            'text' => OrderPayStatusEnum::data($value)['name'],
            'value' => $value
        ];
    }

    /**
     * 改价金额（差价）
     * @param $value
     * @return array
     */
    public function getUpdatePriceAttr($value)
    {
        return [
            'symbol' => $value < 0 ? '-' : '+',
            'value' => sprintf('%.2f', abs($value))
        ];
    }

    /**
     * 发货状态
     * @param $value
     * @return array
     */
    public function getDeliveryStatusAttr($value)
    {
        $status = [10 => __('待配送'), 20 => __('已配送')];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 收货状态
     * @param $value
     * @return array
     */
    public function getReceiptStatusAttr($value)
    {
        $status = [10 => __('待收货'), 20 => __('已收货')];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 收货状态
     * @param $value
     * @return array
     */
    public function getOrderStatusAttr($value)
    {
        return [
            'text' => OrderStatusEnum::data($value)['name'],
            'value' => $value
        ];
    }

    /**
     * 配送方式
     * @param $value
     * @return array
     */
    public function getDeliveryTypeAttr($value)
    {
        return [
            'text' => DeliveryTypeEnum::data($value)['name'],
            'value' => $value
        ];
    }

    /**
     * 发送第三方配送
     * @param $value
     * @return array
     */
    public function addOrder($deliver)
    {
        if ($deliver['default'] == 'local') {
            $this->sendLocal($this);
        } else if ($deliver['default'] == 'dada') {
            $is_exist = (new OrderDeliver())->where('order_id', '=', $this['order_id'])
                ->where('status', '=', 20)
                ->where('deliver_source', '=', 20)
                ->count();
            if ($is_exist) {
                $result = (new DadaApi($this['shop_supplier_id']))->reAddOrder($this);
            } else {
                $result = (new DadaApi($this['shop_supplier_id']))->addOrder($this);
            }
            if ($result && $result['status'] == 'fail') {
                throw new BaseException(['msg' => $result['msg']]);
            } else {
                $this->save(['deliver_status' => 1, 'deliver_source' => 20, 'delivery_status' => 20]);
                $add = [
                    'deliver_source' => 20,
                    'order_id' => $this['order_id'],
                    'order_no' => $this['order_no'],
                    'distance' => $result['result']['distance'],
                    'price' => $result['result']['fee'],
                    'shop_supplier_id' => $this['shop_supplier_id'],
                    'app_id' => self::$app_id
                ];
                (new OrderDeliver())->save($add);
            }
        } else if ($deliver['default'] == 'driver') {
            $this->save(['deliver_source' => 30]);
        } else if ($deliver['default'] == 'meituan') {
            $result = (new MeTuanApi($this['shop_supplier_id'], self::$app_id))->createByShop($this);
            if ($result && $result['code'] != 0) {
                throw new BaseException(['msg' => $result['message']]);
            } else {
                $this->save(['deliver_status' => 1, 'deliver_source' => 40, 'delivery_status' => 20]);
                $add = [
                    'client_id' => $result['data']['mt_peisong_id'],
                    'deliver_source' => 40,
                    'order_id' => $this['order_id'],
                    'order_no' => $this['order_no'],
                    'distance' => $result['data']['delivery_distance'],
                    'price' => $result['data']['delivery_fee'],
                    'shop_supplier_id' => $this['shop_supplier_id'],
                    'app_id' => self::$app_id
                ];
                (new OrderDeliver())->save($add);
            }
        } else if ($deliver['default'] == 'uu') {
            $result = (new UuApi($this['shop_supplier_id'], self::$app_id))->addOrder($this);
            if ($result && $result['return_code'] != "ok") {
                throw new BaseException(['msg' => $result['return_msg']]);
            } else {
                $this->save(['deliver_status' => 1, 'deliver_source' => 50, 'delivery_status' => 20]);
                $add = [
                    'client_id' => $result['ordercode'],
                    'deliver_source' => 50,
                    'order_id' => $this['order_id'],
                    'order_no' => $this['order_no'],
                    'distance' => $result['distance'],
                    'price' => $result['total_money'],
                    'shop_supplier_id' => $this['shop_supplier_id'],
                    'app_id' => self::$app_id
                ];
                (new OrderDeliver())->save($add);
            }
        }
    }

    //商家配送
    public function sendLocal($data)
    {
        $data->save(['deliver_status' => 3, 'deliver_source' => 10, 'delivery_status' => 20]);
        $add = [
            'deliver_source' => 10,
            'order_id' => $data['order_id'],
            'order_no' => $data['order_no'],
            'distance' => $data->getDistance($data['supplier']['longitude'], $data['supplier']['latitude'], $data['address']['longitude'], $data['address']['latitude']),
            'price' => 0,
            'shop_supplier_id' => $data['shop_supplier_id'],
            'deliver_status' => 3,
            'phone' => $data['supplier']['link_phone'],
            'app_id' => self::$app_id
        ];
        return (new OrderDeliver())->save($add);
    }

    public static function getDistance($ulon, $ulat, $slon, $slat)
    {
        // 地球半径
        $R = 6378137;
        // 将角度转为狐度
        $radLat1 = deg2rad($ulat);
        $radLat2 = deg2rad($slat);
        $radLng1 = deg2rad($ulon);
        $radLng2 = deg2rad($slon);
        // 结果
        $s = acos(cos($radLat1) * cos($radLat2) * cos($radLng1 - $radLng2) + sin($radLat1) * sin($radLat2)) * $R;
        // 精度
        $s = round($s * 10000) / 10000;
        return round($s);
    }

    /**
     * 订单详情
     * @param $where
     * @param string[] $with
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($where, $with = ['user', 'address', 'product' => ['image'], 'extract', 'supplier', 'cashier'])
    {
        is_array($where) ? $filter = $where : $filter['order_id'] = (int)$where;
        return self::with($with)->where($filter)->find();
    }

    /**
     * 获取桌台进行中订单
     * @param $table_id
     * @return array|mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getTableUnderwayOrder($table_id)
    {
        return self::with('product')->where([
            ['table_id', '=', $table_id],
            ['order_status', '=', OrderStatusEnum::NORMAL]
        ])->order('order_id', 'desc')->find();
    }

    /**
     * 订单详情
     * @param $where
     * @param string[] $with
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detailByNo($order_no, $with = ['user', 'address', 'product' => ['image', 'refund'], 'extract', 'express', 'extractStore.logo', 'extractClerk', 'supplier'])
    {
        return self::with($with)->where('order_no', '=', $order_no)->find();
    }

    /**
     * 批量获取订单列表
     * @param $orderIds
     * @param array $with
     * @return array
     */
    public function getListByIds($orderIds, $with = [])
    {
        $data = $this->getListByInArray('order_id', $orderIds, $with);
        return helper::arrayColumn2Key($data, 'order_id');
    }

    /**
     * 批量更新订单
     * @param $orderIds
     * @param $data
     * @return bool
     */
    public function onBatchUpdate($orderIds, $data)
    {
        return $this->where('order_id', 'in', $orderIds)->save($data);
    }

    /**
     * 批量更新订单状态
     * @param $orderIds
     * @param $data
     * @return bool
     */
    public function onBatchUpdateStatus($orderIds, $data)
    {
        return $this->where('order_id', 'in', $orderIds)->where('delivery_status', '=', 10)->save($data);
    }

    /**
     * 批量获取订单列表
     * @param $field
     * @param $data
     * @param array $with
     * @return \think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function getListByInArray($field, $data, $with = [])
    {
        return $this->with($with)
            ->where($field, 'in', $data)
            ->where('is_delete', '=', 0)
            ->select();
    }

    /**
     * 生成订单号
     * @return string
     */
    public function orderNo()
    {
        return OrderService::createOrderNo();
    }

    /**
     * 生成新版订单号
     * @return string
     */
    public function newOrderNo($order_source)
    {
        return OrderService::createNewOrderNo($order_source);
    }

    /**
     * 生成交易号
     * @return string
     */
    public function tradeNo()
    {
        return OrderService::createTradeNo();
    }

    /**
     * 确认核销（自提订单）
     * @param $extractClerkId
     * @return bool|mixed
     */
    public function verificationOrder()
    {
        if ($this['pay_status']['value'] != 20 || in_array($this['order_status']['value'], [20, 30])) {
            $this->error = '该订单不满足核销条件';
            return false;
        }
        return $this->transaction(function () {
            $deliver = (new OrderDeliver())::detail(['order_id' => $this['order_id'], 'status' => 10]);
            if ($deliver) {
                $deliver->updateDeliver();
            }
            // 更新订单状态：已发货、已收货
            $status = $this->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => OrderStatusEnum::COMPLETED
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$this], static::$app_id);
            return $status;
        });
    }


    /**
     * 获取已付款订单总数 (可指定某天)
     */
    public function getOrderData($startDate, $endDate, $type, $shop_supplier_id, $order_type = -1)
    {
        $model = $this;

        if (!is_null($startDate)) {
            $model = $model->where('pay_time', '>=', strtotime($startDate));
            $endDate = $endDate ?? $startDate;
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }

        if ($shop_supplier_id > 0) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }

        if ($order_type >= 0) {
            $model = $model->where('order_type', '=', $order_type);
        }

        $model = $model->where('is_delete', '=', 0)
            ->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20);

        switch ($type) {
            case 'order_total': // 订单数量
                return $model->count();
            case 'order_total_price': // 订单数量
                return $model->sum('pay_price');
            case 'order_user_total': // 支付用户数
                return count($model->distinct(true)->column('user_id'));
            case 'order_refund_money': // 退款金额
                return $model->sum('refund_money');
            case 'order_refund_total': // 退款订单数
                return $model->where('refund_money', '>', 0)->count();
            case 'order_discount_money': // 折扣总金额
                return $model->sum('discount_money') + $model->sum('user_discount_money');;
            case 'income_price': // 预计收入
                return $model->sum('pay_price') - $model->sum('refund_money');
            default:
                return 0;
        }
    }

    /**
     * 交易记录列表
     */
    public function getRecordList($data, $type = 0)
    {
        $model = $this;
        //门店
        if (isset($data['shop_supplier_id']) && $data['shop_supplier_id']) {
            $model = $model->where('shop_supplier_id', '=', $data['shop_supplier_id']);
        }
        //订单状态
        if (isset($data['order_status']) && $data['order_status']) {
            switch ($data['order_status']) {
                case '1'://待支付
                    $model = $model->where('pay_status', '=', 10)->where('order_status', '<>', 20);
                    break;
                case '2'://进行中
                    $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 10);
                    break;
                case '3'://已取消
                    $model = $model->where('order_status', '=', 20);
                    break;
                case '4'://已完成
                    $model = $model->where('pay_status', '=', 20)->where('order_status', '=', 30);
                    break;
            }
        }
        //订单类型
        if (isset($data['order_type']) && $data['order_type'] >= 0) {
            $model = $model->where('order_type', '=', $data['order_type']);
        }
        //支付方式
        if (isset($data['pay_type']) && $data['pay_type']) {
            $model = $model->where('pay_type', '=', $data['pay_type']);
        }
        //查询日期
        switch ($data['type']) {
            case '1'://今天
                $model = $model->where('create_time', '>=', strtotime(date('Y-m-d')));
                break;
            case '2'://近7天
                $model = $model->where('create_time', '>=', strtotime(-6 . ' days', strtotime(date('Y-m-d'))));
                break;
            case '3'://近15天
                $model = $model->where('create_time', '>=', strtotime(-14 . ' days', strtotime(date('Y-m-d'))));
                break;
            case '4'://自定义
                $start = strtotime($data['time'][0]);
                $end = strtotime($data['time'][1]) + 86399;
                $model = $model->where('create_time', 'between', "$start,$end");
                break;
            default:
                $model = $model->where('create_time', '>=', strtotime(date('Y-m-d')));
                break;
        }
        // 获取数据列表
        if ($type == 0) {
            return $model->order(['create_time' => 'desc'])
                ->paginate($data);
        } else {
            return $model->order(['create_time' => 'desc'])
                ->select();
        }

    }

    /**
     * 获取各类型总销售额
     */
    public function getOrderTotalMoney($order_type, $shop_supplier_id, $data = [])
    {
        $model = $this;
        $userModel = UserModel::where('is_delete', '=', 0);
        if (isset($data['type']) && $data['type']) {
            switch ($data['type']) {
                case '1'://今天
                    $model = $model->where('create_time', '>=', strtotime(date('Y-m-d')));
                    break;
                case '2'://近7天
                    $model = $model->where('create_time', '>=', strtotime(-6 . ' days', strtotime(date('Y-m-d'))));
                    break;
                case '3'://近15天
                    $model = $model->where('create_time', '>=', strtotime(-14 . ' days', strtotime(date('Y-m-d'))));
                    break;
                case '4'://自定义
                    $start = strtotime($data['time'][0]);
                    $end = strtotime($data['time'][1]) + 86399;
                    $model = $model->where('create_time', 'between', "$start,$end");
                    $userModel = $userModel->where('create_time', 'between', "$start,$end");
                    break;
            }
        }
        if ($shop_supplier_id) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        $model = $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('order_type', '=', $order_type)
            ->where('is_delete', '=', 0);
        $detail['express_price'] = helper::number2($model->sum('express_price') ? $model->sum('express_price') : 0); //配送费
        $detail['bag_price'] = helper::number2($model->sum('bag_price') ? $model->sum('bag_price') : 0); //包装费
        $detail['product_price'] = helper::number2($model->sum('total_price') ? $model->sum('total_price') : 0); //商品总金额
        $detail['refund_money'] = helper::number2($model->sum('refund_money') ? $model->sum('refund_money') : 0); //退款金额
        $detail['total_price'] = helper::number2($model->sum('pay_price') ? $model->sum('pay_price') : 0); //订单总金额（营业总额）
        $detail['income_money'] = helper::number2(round($detail['total_price'] - $detail['refund_money'], 2)); //预计收入
        $detail['order_count'] = $model->count(); //有效订单数量
        // 有效用户数量
        $detail['user_count'] = $userModel->count();
        // 折扣总额(优惠折扣 + 会员折扣)
        $discount_money = $model->sum('discount_money') ? $model->sum('discount_money') : 0;
        $user_discount_money = $model->sum('user_discount_money') ? $model->sum('user_discount_money') : 0;
        $detail['total_discount_money'] = helper::bcadd($discount_money, $user_discount_money, 2);
        return $detail;
    }

    /**
     * 获取商品销量Top10
     */
    public function getProductRank($type, $product_type, $shop_supplier_id = 0, $data = [])
    {
        $start_time = isset($data['date'][0]) ? $data['date'][0] : 0;
        $end_time = isset($data['date'][1]) ? $data['date'][1] : 0;
        $model = new OrderProduct;
        if ($type == 0) {
            $order = 'total_num desc';
        } else {
            $order = 'total_price desc';
        }
        if ($product_type >= 0) {
            $model = $model->where('p.product_type', '=', $product_type);
        }
        if ($shop_supplier_id) {
            $model = $model->where('p.shop_supplier_id', '=', $shop_supplier_id);
        }
        if ($start_time && $end_time) {
            $model = $model->where('o.create_time', 'between', [strtotime($start_time), strtotime($end_time) + 86399]);
        }
        $list = $model->alias('op')
            ->where('o.pay_status', '=', 20)
            ->where('o.order_status', '<>', 20)
            ->join('order o', 'op.order_id=o.order_id')
            ->join('product p', 'p.product_id=op.product_id')
            ->field('p.product_name,sum(total_pay_price) as total_price,sum(total_num) as total_num')
            ->group('op.product_id')
            ->order($order)
            ->limit(10)
            ->select();
        return $list;
    }

    /**
     * 生成加餐订单
     */
    public function mealHallOrder($productList, $data)
    {
        $order_id = $data['order_id']; //订单id
        $meal_num = $data['meal_num'] ?? 0; //就餐人数

        $this->startTrans();
        try {
            if (!isset($order_id) && $order_id == 0) {
                $this->error = "加餐订单号不能为空";
                return false;
            }
            $order = self::detail($order_id);
            if ($order['pay_status'] == 20) {
                $this->error = '订单已支付，不允许加菜';
                return false;
            }
            if ($order['order_status'][ 'value'] != 10) {
                $this->error = '订单已结束';
                return false;
            }
//            $setting = SettingModel::getItem('points');
//            // 条件：后台开启开启购物送积分
//            $points_bonus = 0;
//            $settle_type = $order['supplier']['settle_type'];
//            $serviceType = $order['supplier']['serviceType'];
//            $service_money = $order['supplier']['service_money'];
//            if ($serviceType == 0) {
//                $service_money = round($service_money * $meal_num, 2);
//            }
            //查询加餐次数
            $extra_times = OrderProductModel::where('order_id', '=', $order_id)
                ->order('create_time desc')
                ->value('extra_times');
            $productData = [];
            $pay_money = 0;
            foreach ($productList as $product) {
                if ($product['product']['product_status']['value'] != 10) {
                    $this->error = "很抱歉，商品 [{$product['product']['product_name']}] 已下架";
                    return false;
                }
                // 判断商品库存
                if ($product['product']['total_num'] > $product['sku']['stock_num']) {
                    $this->error = "很抱歉，商品 [{$product['product']['product_name']}] 库存不足";
                    return false;
                }
                // 标记参与会员折扣
                $is_user_grade = false;
                // 会员等级抵扣的金额
                $grade_ratio = 0;
                // 会员折扣的商品单价
                $grade_product_price = 0;
                // 会员折扣的总额差
                $grade_total_money = 0;

//                if ($product['product']['is_enable_grade']) {
//                    $user = $order['user'];
//                    trace($user);
//                    $discount = (new CardRecordModel)->getDiscount($user['user_id']);
////                    $discount = (new CardRecordModel)->getDiscount($order['user_id']);
//                    $alone_grade_type = 10;
//                    // 商品单独设置了会员折扣
//                    if ($product['product']['is_alone_grade'] && isset($product['product']['alone_grade_equity'][$user['grade_id']])) {
//                        if ($product['product']['alone_grade_type'] == 10) {
//                            // 折扣比例
//                            $discountRatio = helper::bcdiv($product['product']['alone_grade_equity'][$user['grade_id']], 100);
//                        } else {
//                            $alone_grade_type = 20;
//                            $discountRatio = helper::bcdiv($product['product']['alone_grade_equity'][$user['grade_id']], $product['product_price'], 2);
//                        }
//                    } else {
//                        // 折扣比例
//                        $discountRatio = helper::bcdiv($user['grade']['equity'], 100);
//                    }
//                    // 计算最终折扣
//                    if ($discount && $discountRatio) {
//                        // 会员等级 * 会员卡
//                        $discountRatio = round($discountRatio * $discount, 2);
//                    } elseif ($discount) {
//                        // 会员卡
//                        $discountRatio = $discount;
//                    }
//
//                    if ($discountRatio < 1) {
//                        if ($alone_grade_type == 20) {
//                            // 固定金额
//                            $grade_product_price = $product['alone_grade_equity'][$user['grade_id']];
//                            $discount && $grade_product_price = round($grade_product_price * $discount, 2);
//                        } else {
//                            // 商品会员折扣后价格
//                            $grade_product_price = helper::number2(helper::bcmul($product['product_price'], $discountRatio), true);
//                        }
//                        $productDiscount = DiscountProduct::getDiscount($product['product_id']);
//                        if ($product['product_num'] > 1 && $productDiscount) {
//                            $gradeTotalPrice = $grade_product_price * ($product['product_num'] - 1) + round($grade_product_price * $productDiscount['discount'] / 10, 2);
//                            trace('dddd');
//                        } else {
//                            trace('cccc');
//                            $gradeTotalPrice = $grade_product_price * $product['product_num'];
//                        }
//                        $is_user_grade = true;
//                        $grade_ratio = $discountRatio;
//                        //
//                        $grade_total_money = helper::number2(helper::bcsub($product['total_price'], $gradeTotalPrice));
//                        $product['total_price'] = $gradeTotalPrice;
//                    }
//                }
//                $product_points_bonus = 0;
//                if ($setting['is_shopping_gift']) {
//                    // 积分赠送比例
//                    $ratio = $setting['gift_ratio'] / 100;
//                    // 计算抵扣积分数量
//                    $product_points_bonus = !$product['is_points_gift'] ? 0 : helper::bcmul($product['total_price'], $ratio, 2);
//                }
//                $points_bonus += $product_points_bonus;
//                $pay_money += $product['total_price'];
                $item = [
                    'order_id' => $order_id,
//                    'user_id' => $order['user_id'],
                    'app_id' => self::$app_id,
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
                    'total_pay_price' => $product['total_price'],
//                    'points_bonus' => $product_points_bonus,
                    'extra_times' => $extra_times + 1,
//                    'is_user_grade' => (int)$is_user_grade,
//                    'grade_ratio' => $grade_ratio,
//                    'grade_product_price' => $grade_product_price,
//                    'grade_total_money' => $grade_total_money,
                ];
                $productData[] = $item;
            }
            // 更新商品库存 (针对下单减库存的商品)
            ProductFactory::getFactory($order['order_source'])->updateProductStock($productList);
            $model = new OrderProductModel();
            $model->saveAll($productData);

//            $total_price = $order['total_price'] + $pay_money;  // 原本 + 新加
//            // 消费税计算
//            $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $order['supplier']['shop_supplier_id']);
//            $consume_fee = 0;
//            if ($consumeFee['is_open']) {
//                $consume_rate = $consumeFee['tax_rate'];
//                $consume_fee = helper::bcmul($total_price, $consume_rate);
//            }
//            $addMeal = [
//                'order_no' => $this->orderNo(),  // TODO 又重新生成了订单号
//                'total_price' => $order['total_price'] + $pay_money,
//                'order_price' => $order['order_price'] + $pay_money - $order['service_money'] + $service_money -$order['consumption_tax_money'] + $consume_fee,
//                'pay_price' => $order['pay_price'] + $pay_money - $order['service_money'] + $service_money - $order['consumption_tax_money'] + $consume_fee,
//                'points_bonus' => $order['points_bonus'] + $points_bonus,
//                'service_money' => $service_money,
//                'meal_num' => $meal_num,
//                'settle_type' => $settle_type,
//                'consumption_tax_money' => $consume_fee
//            ];
//            $order->save($addMeal);
            $this->reloadPrice($order_id, true);
            $order['product'] = $productData;
            // 菜品打印
            (new OrderPrinterService)->printProductTicket($order, 20);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            Log::error($e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改桌台就餐人数
     */
    public function updateMealNum($meal_num)
    {
        $this->startTrans();
        try {
            // 检查桌台状态
            if ($this['order_status'][ 'value'] != OrderStatusEnum::NORMAL) {
                $this->error = '订单已结束';
                return false;
            }
            $this->save(['meal_num' => $meal_num]);
            $this->reloadPrice($this['order_id']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 取消订单
     * @param $extractClerkId
     * @return bool|mixed
     */
    public function cancels()
    {
        if ($this->pay_status['value'] == 20) {
            $this->error = "订单已付款，不允许取消";
            return false;
        }
        if ($this->order_status['value'] != 10) {
            $this->error = "订单状态错误，不允许取消";
            return false;
        }
        return $this->save(['order_status' => 20]);
    }

    /**
     * 删除订单
     * @param $extractClerkId
     * @return bool|mixed
     */
    public function remove()
    {
        if ($this->pay_status['value'] == 20) {
            $this->error = "订单已付款，不允许删除";
            return false;
        }
        if ($this->order_status['value'] != 20) {
            $this->error = "订单状态错误，不允许取消";
            return false;
        }
        $this->is_delete = 1;
        $this->save();
        return $this->delete($this->order_id);
    }

    /**
     * 删除订单
     */
    public function orderDelete()
    {
        if ($this->pay_status['value'] == 20) {
            $this->error = "订单已付款，不允许删除";
            return false;
        }
        if ($this->order_status['value'] != 20) {
            $this->error = "订单状态错误，不允许取消";
            return false;
        }
        $this->startTrans();
        try {
            $this->is_delete = 1;
            $this->save();
            $this->delete();
            $this->product()->delete();  // 删除订单商品
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 重新计算订单价格信息（服务费+消费税+会员折扣）（折扣抹零计算重置)
     * @param $order_id
     * @param $re_order_no
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function reloadPrice($order_id, $re_order_no = false)
    {
        $order = self::detail($order_id);
        $setting = SettingModel::getItem('points');
        $pay_money = 0;
        $order_price = 0;
        $points_bonus = 0;
        $user_discount_money = 0;
        $settle_type = $order['supplier']['settle_type'];
        $serviceType = $order['supplier']['serviceType'];
        $service_money = $order['supplier']['service_money'];
        $meal_num = $order['meal_num'] ?? 0; //就餐人数
        if ($serviceType == 0) {
            $service_money = round($service_money * $meal_num, 2);
        }

        foreach ($order['product'] as $product) {
            // 标记参与会员折扣
            $is_user_grade = false;
            // 会员等级抵扣的金额
            $grade_ratio = 0;
            // 会员折扣的商品单价
            $grade_product_price = 0;
            // 会员折扣的总额差
            $grade_total_money = 0;
            $user = null;
            if ($product['product']['is_enable_grade'] && $product['total_price'] > 0) {
                $user = $order['user'];
//                trace($user);
                if ($user) {
                    $discount = (new CardRecordModel)->getDiscount($user['user_id']);
                } else {
                    $discount = 0;
                }
                $alone_grade_type = 10;
                // 商品单独设置了会员折扣  （折扣类型 alone_grade_type 10-百分比 20-固定金额）
                if ($user) {
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
                        $discountRatio = helper::bcdiv($user['grade']['equity'], 100);
                    }
                } else {
                    $discountRatio = 1;
                }

                // 计算最终折扣
                if ($discount && $discountRatio) {
                    // 会员等级 * 会员卡
                    $discountRatio = round($discountRatio * $discount, 3);
                } elseif ($discount) {
                    // 会员卡
                    $discountRatio = $discount;
                }
//                trace('折扣');
//                trace($discountRatio);
                if ($discountRatio <= 1) {
                    if ($alone_grade_type == 20) {
                        // 固定金额
                        $grade_product_price = $product['product']['alone_grade_equity'][$user['grade_id']];
                        $discount && $grade_product_price = round($grade_product_price * $discount, 2);
                    } else {
                        // 商品会员折扣后单价
                        $grade_product_price = helper::number2(helper::bcmul($product['product_price'], $discountRatio, 3), true);
//                        trace('商品会员折扣后单价');
//                        trace($grade_product_price);
                    }
                    $productDiscount = DiscountProduct::getDiscount($product['product_id']);
//                    trace('========');
//                    trace($product['total_num']);
//                    trace('========');
                    if ($product['total_num'] > 1 && $productDiscount) {
                        $gradeTotalPrice = $grade_product_price * ($product['total_num'] - 1) + round($grade_product_price * $productDiscount['discount'] / 10, 2);
                    } else {
                        $gradeTotalPrice = $grade_product_price * $product['total_num'];
//                        trace('商品会员折扣后单价 * 数量');
//                        trace($gradeTotalPrice);
                    }
                    $is_user_grade = !($discountRatio == 1);
                    $grade_ratio = $discountRatio == 1 ? 0 : $discountRatio;
//                    trace('折扣');
//                    trace($grade_ratio);
                    // 原商品总价 - 折扣后
//                    trace('原商品总价');
//                    trace($product['total_price']);
//                    trace($product['product_price']);
                    $grade_total_money = helper::number2(helper::bcsub($product['product_price'] * $product['total_num'], $gradeTotalPrice, 3));
//                    trace('优惠后与原商品差价');
//                    trace($grade_total_money);
                    $product['total_price'] = $gradeTotalPrice;
                }
            }
            $product_points_bonus = 0;
            if ($setting['is_shopping_gift']) {
                // 积分赠送比例
                $ratio = $setting['gift_ratio'] / 100;
                // 计算抵扣积分数量
                $product_points_bonus = !$product['product']['is_points_gift'] ? 0 : helper::bcmul($product['total_price'], $ratio, 2);
//                trace('商品原价');
//                trace($product['product_price']);
//                trace('数量');
//                trace($product['total_num']);
//                trace('积分');
//                trace($product_points_bonus);
            }
            $updateArr = [
                'user_id' => $order['user_id'],
                'total_price' => $product['total_price'],   // 商品总价(数量×单价)
                'total_pay_price' => $product['total_price'],   //  订单副表的total_pay_price 业务好像没有用到
                'points_bonus' => $product_points_bonus,    // 奖励积分
                'is_user_grade' => (int)$is_user_grade, //  是否存在会员等级折扣
                'grade_ratio' => $grade_ratio,  // 会员折扣比例(0-10)
                'grade_product_price' => $user ? $grade_product_price : 0,  //  会员折扣后的商品单价
                'grade_total_money' => $grade_total_money,  // 会员折扣的总额差 （商品总价 - 商品折扣后总价）
            ];
            $product->save($updateArr);

            // 主表order数据累加
            $points_bonus += $product_points_bonus; // 积分
            $pay_money += $product['total_price'];  // 实付金额
            $order_price += $product['product_price'] * $product['total_num'];  // 商品原价
            $user_discount_money += $grade_total_money; // 商品优惠金额
        }

        $total_price = round($pay_money, 2); // 订单商品总价（不是商品原价总价、是商品折扣后(如果有)的总价）
        // 订单服务费（非桌台）计算
        $serviceFee = SettingModel::getSupplierItem(SettingEnum::SERVICE_CHARGE, $order['supplier']['shop_supplier_id']);
        if ($serviceFee['is_open']) {
            $service_fee = $serviceFee['service_charge'];
        } else {
            $service_fee = 0;
        }
        // 消费税计算
        $consumeFee = SettingModel::getSupplierItem(SettingEnum::TAX_RATE, $order['supplier']['shop_supplier_id']);
        $consume_fee = 0;
        $original_consume_fee = 0;
        if ($consumeFee['is_open']) {
            $consume_rate = helper::bcdiv($consumeFee['tax_rate'], 100);
            $consume_fee = helper::bcmul($total_price, $consume_rate, 3);
            $original_consume_fee = helper::bcmul($order_price, $consume_rate, 3); // 原消费税
            $consume_fee = round($consume_fee, 2);
            $original_consume_fee = round($original_consume_fee, 2);
        }
        // 应付
        $pay_price = $total_price + $service_money + $service_fee + $consume_fee; // 应付金额 = 商品折扣总价（会员折扣） + 原服务费 + 新服务费用 + 消费税
        // 优惠折扣
        $discount_money = 0;
        if ($order['discount_ratio'] > 0) {
            $pay_price = round($pay_price * $order['discount_ratio'] / 100, 2);;
            $discount_money = round($pay_price * (100 - $order['discount_ratio']) / 100, 2);
        } else if ($order['discount_ratio'] == -1){
            $discount_money = $pay_price;
            $pay_price = 0;
        }

        // 会员优惠金额
        $updateOrderArr = [
            'order_no' => $re_order_no ? $this->newOrderNo($order['order_source']) : $order['order_no'],
            'discount_money' => $discount_money,  // 折扣优惠重置
            'total_price' => $total_price,
            'order_price' => $order_price + $service_money + $service_fee + $consume_fee, // 订单总额 = 商品原始总价 + 原服务费 + 新服务费用 + 消费税
            'original_price' => $order_price + $service_money + $service_fee + $original_consume_fee, // 订单总额 = 商品原始总价 + 原服务费 + 新服务费用 + 消费税
            'pay_price' => $pay_price,  // 应付
            'points_bonus' => $points_bonus,
            'service_money' => $service_money,
            'meal_num' => $meal_num,
            'settle_type' => $settle_type,
            'setting_service_money' => $service_fee,
            'consumption_tax_money' => $consume_fee,
            'user_discount_money' => $user_discount_money
        ];
        $order->save($updateOrderArr);
        return $order;
    }

    /**
     * 商品直接加入订单
     */
    public function addToOrder($data, $user)
    {
        $param = $data;
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
        // 判断限购
        $limitNum = ProductModel::getProductLimitNum($data['product_id']);
        if ($limitNum && $data['product_num'] > $limitNum) {
            $this->error = '超过限购数量';
            return false;
        }
        $this->startTrans();
        try {

            // 已存在order_id，直接添加到订单
            if (isset($data['order_id']) && $data['order_id'] > 0) {
                // 检查订单状态
                $detail = self::detail([
                    ['order_id', '=', $data['order_id']],
                    ['order_status', '=', OrderStatusEnum::NORMAL]
                ]);
                if (!$detail) {
                    $this->error = '订单不存在';
                    return false;
                }

                // 判断当前订单
                $curNum = (new OrderProduct())->where([
                    'order_id' => $data['order_id'],
                    'product_id' => $data['product_id'],
                ])->sum('total_num');
                if ($limitNum && (($param['product_num'] + $curNum) > $limitNum)) {
                    $this->error = '超过限购数量';
                    return false;
                }

                $orderProduct = new OrderProductModel;
//                $order_product_id = $orderProduct->isExist($data);
                $order_product_id = 0;
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

            } else if(isset($data['table_id']) && $data['table_id'] > 0) {
                // 检查订单状态
                $detail = self::detail([
                    ['table_id', '=', $data['table_id']],
                    ['order_status', '=', OrderStatusEnum::NORMAL]
                ]);
                if (!$detail) {
                    $this->error = '订单不存在';
                    return false;
                }
                $order_id = $detail['order_id'];
                $data['order_id'] = $order_id;


                // 判断当前订单
                $curNum = (new OrderProduct())->where([
                    'order_id' => $data['order_id'],
                    'product_id' => $data['product_id'],
                ])->sum('total_num');
                if ($limitNum && (($param['product_num'] + $curNum) > $limitNum)) {
                    $this->error = '超过限购数量';
                    return false;
                }

                $orderProduct = new OrderProductModel;
//                $order_product_id = $orderProduct->isExist($data);
                $order_product_id = 0;
                // 存在修改数量、否则新增
                if ($order_product_id) {
                    $orderProduct->where('order_product_id', '=', $order_product_id)->inc('total_num', $data['product_num'])->update();
                } else {
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

                    $orderProduct->save($inArr);
                }
                $return_order = $data['order_id'];
            } else {
                // order_id不存在创建新订单再加入商品

                // 实例化订单service
                $param['eat_type'] = 10;
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

            (new self)->reloadPrice($return_order);
            $this->commit();
            return $return_order;

        } catch (\Exception $e) {
            Log::error($e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }

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

    //查询桌号订单未送厨商品
    public function getUnSendKitchen($table_id)
    {
        return $this->with('unSendKitchenProduct')
            ->where('table_id', '=', $table_id)
            ->where('order_status', '=', OrderStatusEnum::NORMAL)
            ->where('is_delete', '=', 0)
            ->find();
    }

    //查询桌号订单已送厨商品
    public function getSendKitchen($table_id)
    {
        return $this->with('sendKitchenProduct')
            ->where('table_id', '=', $table_id)
            ->where('order_status', '=', OrderStatusEnum::NORMAL)
            ->where('is_delete', '=', 0)
            ->find();
    }
}