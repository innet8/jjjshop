<?php

namespace app\common\model\plus\live;

use app\common\model\BaseModel;

/**
 * 直播间商品模型
 */
class WxLiveProduct extends BaseModel
{
    protected $name = 'app_wx_live_product';
    protected $pk = 'live_product_id';

    /**
     * 关联商品
     */
    public function product()
    {
        return $this->BelongsTo('app\\common\\model\\plus\\live\\WxProduct', 'goods_id', 'goods_id');
    }

    /**
     * 详情
     */
    public static function detail($live_product_id)
    {
        return (new static())->find($live_product_id);
    }

}
