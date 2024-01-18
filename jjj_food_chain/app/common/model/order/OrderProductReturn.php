<?php

namespace app\common\model\order;

use app\common\model\BaseModel;

/**
 * 订单商品退货
 */
class OrderProductReturn extends BaseModel
{
    protected $name = 'order_product_return';
    protected $pk = 'id';

    /**
     * 关联商品表
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product' , 'product_id', 'product_id');
    }

    /**
     * 关联供应商表
     */
    public function order()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order', 'order_id', 'order_id');
    }

    /**
     * 关联订单商品记录表表
     */
    public function orderProduct()
    {
        return $this->belongsTo('app\\common\\model\\order\\OrderProduct', 'order_product_id', 'order_product_id');
    }

    // 新增退货记录
    public static function add($data)
    {
        $order_id = $data['order_id'];
        $order_product_id = $data['order_product_id'];
        $product_id = $data['product_id'];
        $num = $data['num'];
        $reason = $data['reason'];

        $model = new static();
        $model->save([
            'order_id' => $order_id,
            'order_product_id' => $order_product_id,
            'product_id' => $product_id,
            'num' => $num,
            'reason' => $reason,
        ]);
    }
}