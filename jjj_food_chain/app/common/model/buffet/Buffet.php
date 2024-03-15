<?php

namespace app\common\model\buffet;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;
use app\common\model\order\OrderBuffet as OrderBuffetModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\model\order\Order as OrderModel;

/**
 *
 */
class Buffet extends BaseModel
{
    use SoftDelete;
    protected $name = 'buffet';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [
        'name_text',
    ];

    /**
     * 关联自助餐产品
     */
    public function buffetProducts()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'id')->with('product');
    }

    // 与BuffetDiscount模型的多对多关联
    public function buffetDiscount()
    {
        return $this->belongsToMany(BuffetDiscount::class, 'buffet_discount_rel', 'buffet_id', 'buffet_discount_id');
    }

    /**
     * 关联自助餐限购产品
     */
    public function buffetLimitProducts()
    {
        return $this->hasMany('app\\common\\model\\buffet\\BuffetProduct', 'buffet_id', 'id')->where('limit_num', '>', 0)->with('product');
    }

    /**
     * 获取自助餐名称
     */
    public function getNameTextAttr($value, $data = [])
    {
        return extractLanguage($value ?: $data['name']);
    }

    /**
     * 获取自助餐是否能删除 0-否 1-是
     */
    public function getCanDelete($data = [])
    {
        $isDeletable = 1;
        $orderBuffetModel = new OrderBuffetModel();
        $orderModel = new OrderModel();
        $buffetOrders = $orderBuffetModel->where('buffet_id', '=', $data['id'] ?? 0)->column('order_id');
        if (!empty($buffetOrders)) {
            $pendingOrderCount = $orderModel->whereIn('order_id', $buffetOrders)
                ->where('order_status', '=', OrderPayStatusEnum::PENDING)
                ->count();

            if ($pendingOrderCount > 0) {
                $isDeletable = 0;
            }
        }
        return $isDeletable;
    }

    public static function getList()
    {
        return (new self())->where('status', '=', 1)
            ->order('sort asc,id desc')
            ->select();
    }

    // 获取自助餐优惠列表
    public static function getBuffetDiscountList($buffet_id)
    {
        return (new self)->with(['buffetDiscount'])->where('id', '=', $buffet_id)->find();
    }
}