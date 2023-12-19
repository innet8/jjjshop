<?php

namespace app\common\model\plus\group;

use app\common\model\BaseModel;

/**
 * 团购模型
 */
class Group extends BaseModel
{
    protected $name = 'group';
    protected $pk = 'group_id';
    protected $append = ['group_sales', 'time', 'discount'];

    /**
     * 团购折扣
     */
    public function getDiscountAttr($value, $data)
    {
        if ($data['line_price'] > 0) {
            $discount = $data['group_price'] / $data['line_price'];
            if ($discount < 1) {
                return round($discount * 10, 1) . '折';
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    /**
     * 有效期
     */
    public function getTimeAttr($value, $data)
    {
        if ($data['start_time'] && $data['end_time']) {
            return [
                date('Y-m-d', $data['start_time']),
                date('Y-m-d', $data['end_time']),
            ];
        } else {
            return [];
        }
    }

    /**
     * 设置适用门店
     */
    public function setShopSupplierIdAttr($value, $data)
    {
        return $value ? json_encode($value) : [];
    }

    /**
     * 获取适用门店
     */
    public function getShopSupplierIdAttr($value, $data)
    {
        return $value ? json_decode($value, 1) : [];
    }

    /**
     * 计算显示销量 (初始销量 + 实际销量)
     */
    public function getGroupSalesAttr($value, $data)
    {
        return $data['sales_initial'] + $data['sales_actual'];
    }

    /**
     * 关联团购图片表
     */
    public function image()
    {
        return $this->hasMany('app\\common\\model\\plus\\group\\GroupImage')->order(['id' => 'asc']);
    }

    /**
     * 团购详情
     */
    public static function detail($group_id)
    {
        return (new static())->with(['image.file'])->find($group_id);
    }
}
