<?php


namespace app\shop\model\plus\birthgift;

use app\common\model\plus\birthgift\BirthGift as BirthGiftModel;

/**
 * 生日有礼模型
 */
class BirthGift extends BirthGiftModel
{
    //修改
    public function edit($data)
    {
        $detail = self::detail();
        if ($detail) {
            $model = $detail;
        } else {
            $model = $this;
            $data['app_id'] = self::$app_id;
        }
        if (isset($data['coupon_ids'])) {
            $data['coupon_ids'] = implode(',', $data['coupon_ids']);
        }
        return $model->save($data);
    }
}