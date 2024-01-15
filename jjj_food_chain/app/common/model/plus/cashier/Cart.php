<?php

namespace app\common\model\plus\cashier;

use app\common\model\BaseModel;

/**
 * 收银台购物车模型模型
 */
class Cart extends BaseModel
{
    protected $pk = 'cart_id';
    protected $name = 'cashier_cart';
    protected $append = [
        'describe_text'
    ];
    
    /**
     * 属性
     */
    public function getDescribeTextAttr($value, $data)
    {
        $values = explode(";", $data['describe'] ?? '');
        foreach ($values as $key => $data) {
            $values[$key] = extractLanguage($values[$key]);
        }
        return implode(";", $values);
    }
    
    /**
     * 购物车详情
     */
    public static function detail($where, $with = [])
    {
        is_array($where) ? $filter = $where : $filter['cart_id'] = (int)$where;
        return self::with($with)->where($filter)->find();
    }

    /**
     * 关联商品表
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id');
    }

    /**
     * 关联商品表
     */
    public function sku()
    {
        return $this->belongsTo('app\\common\\model\\product\\ProductSku', 'product_sku_id', 'product_sku_id');
    }

    /**
     * 关联商品图片表
     */
    public function image()
    {
        return $this->hasOne('app\\common\\model\\product\\ProductImage', 'product_id', 'product_id')->order(['id' => 'asc']);
    }

}