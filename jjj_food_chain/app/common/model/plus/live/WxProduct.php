<?php

namespace app\common\model\plus\live;

use app\common\model\BaseModel;

/**
 * 直播商品模型
 */
class WxProduct extends BaseModel
{
    protected $name = 'app_wx_product';
    protected $pk = 'wx_product_id';
    //附加字段
    protected $append = ['price_type_text', 'price_text', 'audit_status_text'];

    /**
     * 价格类型
     */
    public function getPriceTypeTextAttr($value, $data)
    {
        return $this->getPriceType()[$data['price_type']]['name'];
    }

    /**
     * 价格
     */
    public function getPriceTextAttr($value, $data)
    {
        $price = '';
        if ($data['price_type'] == 1) {
            $price = $data['price'];
        } elseif ($data['price_type'] == 2) {
            $price = $data['price'] . '-' . $data['price2'];
        } else {
            $price = '原价:' . $data['price'] . ',折扣价:' . $data['price2'];
        }
        return $price;
    }

    /**
     * 审核状态
     */
    public function getAuditStatusTextAttr($value, $data)
    {
        return $this->getAuditStatus()[$data['audit_status']]['name'];
    }

    /**
     * 关联商品
     */
    public function product()
    {
        return $this->BelongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id');
    }

    /**
     * 详情
     */
    public static function detail($wx_product_id)
    {
        return (new static())->find($wx_product_id);
    }

    /**
     * 价格类型
     */
    public function getPriceType()
    {
        $type = [
            1 => ['value' => 1, 'name' => '一口价'],
            2 => ['value' => 2, 'name' => '价格区间'],
            3 => ['value' => 3, 'name' => '显示折扣价'],
        ];
        return $type;
    }

    /**
     * 审核状态 0：未审核。1：审核中，2：审核通过，3：审核驳回
     */
    public function getAuditStatus()
    {
        $status = [
            0 => ['value' => 0, 'name' => '未审核'],
            1 => ['value' => 1, 'name' => '审核中'],
            2 => ['value' => 2, 'name' => '审核通过'],
            3 => ['value' => 3, 'name' => '审核驳回'],
        ];
        return $status;
    }

}
