<?php

namespace app\api\model\plus\package;

use app\common\model\plus\package\Package as PackageModel;
use app\api\model\plus\coupon\Coupon;

/**
 * 券包模型
 */
class Package extends PackageModel
{
    /**
     * 获取数据
     */
    public function getlist($param)
    {
        $list = $this->where('is_delete', '=', 0)
            ->where('status', '=', 0)
            ->where('end_time', '>', time())
            ->paginate($param);
        $this->buildData($list);
        return $list;
    }

    private function buildData(&$list)
    {
        foreach ($list as &$item) {
            $model = new Coupon();
            $coupon = json_decode($item['coupon_ids'], true);
            $coupon_num = 0;
            $coupon_money = 0;
            foreach ($coupon as $key => &$value) {
                $coupon_num += $value['coupon_num'];
                $couponInfo = $model->getCouponInfo($value['coupon_id']);
                $value['name'] = $couponInfo['name'];
                $value['reduce_price'] = $couponInfo['reduce_price'];
                $value['expire_type'] = $couponInfo['expire_type'];
                $value['expire_day'] = $couponInfo['expire_day'];
                $value['start_time'] = $couponInfo['start_time'];
                $value['end_time'] = $couponInfo['end_time'];
                $value['coupon_type'] = $couponInfo['coupon_type'];
                $value['min_price'] = $couponInfo['min_price'];
                $value['discount'] = $couponInfo['discount'];
                if ($couponInfo['coupon_type']['value'] == 10) {
                    $coupon_money += $couponInfo['reduce_price'];
                } else {
                    $coupon_money += round((1 - $couponInfo['discount'] / 10) * $couponInfo['min_price'], 2);
                }
            }
            $item['coupon_list'] = $coupon;
            $item['coupon'] = explode(',', $item['coupon_ids']);
            $item['coupon_num'] = $coupon_num;
            $item['coupon_money'] = $coupon_money;
        }
    }
}