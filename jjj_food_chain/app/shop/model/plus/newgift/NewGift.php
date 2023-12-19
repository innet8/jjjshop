<?php


namespace app\shop\model\plus\newgift;

use app\common\model\plus\newgift\NewGift as NewGiftModel;

/**
 * 新人有礼模型
 */
class NewGift extends NewGiftModel
{
    //修改
    public function edit($data, $shop_supplier_id)
    {
        $detail = self::detail($shop_supplier_id);
        if ($detail) {
            $model = $detail;
        } else {
            $model = $this;
            $data['app_id'] = self::$app_id;
        }
        $data['start_time'] = $data['time'] ? strtotime($data['time'][0]) : '';
        $data['end_time'] = $data['time'] ? strtotime($data['time'][1]) : '';
        $data['shop_supplier_id'] = $shop_supplier_id;
        $data['coupon_ids'] = $data['coupon_ids'] ? implode(',', $data['coupon_ids']) : '';
        return $model->save($data);
    }
}