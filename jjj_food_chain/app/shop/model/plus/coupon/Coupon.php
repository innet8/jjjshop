<?php

namespace app\shop\model\plus\coupon;

use app\common\model\plus\coupon\Coupon as CouponModel;

/**
 * 优惠券模型
 */
class Coupon extends CouponModel
{
    /**
     * 获取优惠券列表
     */
    public function getList($data, $user)
    {
        $model = $this;
        $model = $model->where('coupon.shop_supplier_id', '=', $user['shop_supplier_id']);
        return $model->alias('coupon')->field(['coupon.*,supplier.name as supplier_name'])
            ->join('supplier', 'coupon.shop_supplier_id = supplier.shop_supplier_id', 'left')
            ->where('coupon.is_delete', '=', 0)
            ->order(['coupon.sort' => 'asc', 'coupon.create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 获取优惠券列表
     */
    public function getAllList($user)
    {
        $model = $this;
        $model = $model->where('coupon.shop_supplier_id', '=', $user['shop_supplier_id']);
        return $model->alias('coupon')->field(['coupon.*,supplier.name as supplier_name'])
            ->join('supplier', 'coupon.shop_supplier_id = supplier.shop_supplier_id', 'left')
            ->where('coupon.is_delete', '=', 0)
            ->order(['coupon.sort' => 'asc', 'coupon.create_time' => 'desc'])
            ->select();
    }

    /**
     * 获取优惠券列表
     */
    public static function getAllLists()
    {
        return (new static())->where('is_delete', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
    }

    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        if ($data['expire_type'] == '20') {
            $data['start_time'] = strtotime($data['active_time'][0]);
            $data['end_time'] = strtotime($data['active_time'][1]);
        }
        return self::create($data);
    }

    /**
     * 更新记录
     */
    public function edit($data)
    {
        if ($data['expire_type'] == '20') {
            $data['start_time'] = strtotime($data['active_time'][0]);
            $data['end_time'] = strtotime($data['active_time'][1]);
        }
        $where['coupon_id'] = $data['coupon_id'];
        unset($data['coupon_id']);
        return self::update($data, $where);
    }

    /**
     * 删除记录 (软删除)
     */
    public function setDelete($where)
    {
        return self::update(['is_delete' => 1], $where);
    }

    /**
     * 查询指定优惠券
     * @param $value
     */
    public function getCoupon($value)
    {
        return $this->where('coupon_id', 'in', $value)->select();
    }

    /**
     * 查询指定优惠券
     * @param $value
     */
    public function getCoupons($value)
    {
        $data = $this->where('coupon_id', 'in', $value)->select();
        $name = '';
        if (!empty($data)) {
            foreach ($data as $val) {
                $name .= $val['name'] . ',';
            }
        }

        return $name;
    }

    /**
     * 获取优惠券列表
     */
    public static function getTotalList()
    {
        $model = new static();
        return $model->alias('coupon')->field(['coupon.*,supplier.name as supplier_name'])
            ->join('supplier', 'coupon.shop_supplier_id = supplier.shop_supplier_id', 'left')
            ->where('coupon.is_delete', '=', 0)
            ->order(['coupon.sort' => 'asc', 'coupon.create_time' => 'desc'])
            ->select();
    }
}
