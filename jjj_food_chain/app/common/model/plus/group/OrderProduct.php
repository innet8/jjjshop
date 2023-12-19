<?php

namespace app\common\model\plus\group;

use app\common\model\BaseModel;

/**
 * 团购订单商品模型
 */
class OrderProduct extends BaseModel
{
    protected $name = 'group_order_product';
    protected $pk = 'order_product_id';

    /**
     * 设置适用门店
     */
    public function setShopSupplierIdsAttr($value, $data)
    {
        return $value ? json_encode($value) : [];
    }

    /**
     * 获取适用门店
     */
    public function getShopSupplierIdsAttr($value, $data)
    {
        return $value ? json_decode($value, 1) : [];
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
        return $this->belongsTo('app\\common\\model\\plus\\group\\Group', 'group_id', 'group_id');
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
}