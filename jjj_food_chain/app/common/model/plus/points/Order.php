<?php

namespace app\common\model\plus\points;

use app\common\library\helper;
use app\common\model\BaseModel;
use app\common\enum\order\OrderStatusEnum;
use app\common\service\order\OrderService;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\model\user\User as UserModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\settings\DeliveryTypeEnum;

/**
 * 订单模型模型
 */
class Order extends BaseModel
{
    protected $pk = 'order_id';
    protected $name = 'points_order';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'state_text',
    ];

    /**
     * 配送方式
     */
    public function getAddressAttr($value)
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * 配送方式
     */
    public function setAddressAttr($value)
    {
        return $value ? json_encode($value) : [];
    }

    /**
     * 订单商品
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\plus\\points\\Product', 'product_id', 'product_id');
    }

    /**
     * 关联物流公司表
     * @return \think\model\relation\BelongsTo
     */
    public function express()
    {
        return $this->belongsTo('app\\common\\model\\settings\\Express', 'express_id', 'express_id');
    }

    /**
     * 关联商品图片表
     */
    public function image()
    {
        return $this->belongsTo('app\\common\\model\\file\\UploadFile', 'image_id', 'file_id')
            ->bind(['file_path', 'file_name', 'file_url']);
    }

    /**
     * 关联自提门店表
     * @return \think\model\relation\BelongsTo
     */
    public function store()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联用户表
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
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
        if ($data['delivery_type'] == 20) {
            return __('待取货');
        }
        // 发货状态
        if ($data['delivery_type'] == 10 && $data['delivery_status'] == 10) {
            return __('待发货');
        }
        if ($data['delivery_type'] == 10 && $data['receipt_status'] == 10) {
            return __('待收货');
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
        return ['text' => OrderPayTypeEnum::data()[$value]['name'], 'value' => $value];
    }

    /**
     * 付款状态
     * @param $value
     * @return array
     */
    public function getPayStatusAttr($value)
    {
        return ['text' => OrderPayStatusEnum::data()[$value]['name'], 'value' => $value];
    }

    /**
     * 发货状态
     * @param $value
     * @return array
     */
    public function getDeliveryStatusAttr($value)
    {
        $status = [10 => __('待发货'), 20 => __('已发货')];
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
        return ['text' => DeliveryTypeEnum::points()[$value]['name'], 'value' => $value];
    }

    /**
     * 订单详情
     */
    public static function detail($where, $with = ['user', 'express', 'store', 'image'])
    {
        is_array($where) ? $filter = $where : $filter['order_id'] = (int)$where;
        return (new static())->with($with)->where($filter)->find();
    }

    /**
     * 订单详情
     */
    public static function detailByNo($order_no, $with = ['user', 'address', 'product' => ['image', 'refund'], 'extract', 'express', 'extractStore.logo', 'extractClerk'])
    {
        return (new static())->with($with)->where('order_no', '=', $order_no)->find();
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
     * 生成交易号
     * @return string
     */
    public function tradeNo()
    {
        return OrderService::createTradeNo();
    }

    /**
     * 确认核销
     * @param $extractClerkId
     * @return bool|mixed
     */
    public function verificationOrder()
    {
        if (
            $this['pay_status']['value'] != 20
            || $this['order_status']['value'] != 10
            || $this['delivery_type']['value'] != 20
        ) {
            $this->error = '该订单不满足核销条件';
            return false;
        }
        return $this->transaction(function () {
            // 更新订单状态：已发货、已收货
            $status = $this->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => 30
            ]);
            $data['user_id'] = $this['user_id'];
            $data['money'] = $this['pay_price'];
            $data['money'] && (new UserModel)->IncExpendMoney($data);
            return $status;
        });
    }

    //获取商品信息
    public static function getProduct($detail)
    {
        $product = [
            [
                'product_name' => $detail['product_name'],
                'file_path' => $detail['file_path'],
                'product_price' => $detail['product_price'],
                'product_points' => $detail['product_points'],
                'total_num' => $detail['total_num'],
                'total_price' => $detail['total_price'],
                'points_num' => $detail['points_num'],
            ],
        ];
        return $product;
    }
}