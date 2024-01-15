<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 规格/属性(组)模型
 */
class Attribute extends BaseModel
{
    protected $name = 'product_attribute';
    protected $pk = 'attribute_id';

    /**
     * 设置属性值
     */
    public function setAttributeValueAttr($value)
    {
        return $value ? json_encode($value) : '';
    }

    /**
     * 获取属性值
     */
    public function getAttributeValueAttr($value)
    {
        return $value ? json_decode($value, true) : '';
    }

    //更新属性库
    public function updateAttr($data, $shop_supplier_id)
    {
        if ($data) {
            $addData = [];
            foreach ($data as $item) {
                $isExit = $this->where('attribute_name', '=', $item['attribute_name'])
                    ->where('shop_supplier_id', '=', $shop_supplier_id)
                    ->count();
                if ($isExit == 0) {
                    $addData[] = [
                        'attribute_name' => $item['attribute_name'],
                        'attribute_value' => $item['attribute_value'],
                        'shop_supplier_id' => $shop_supplier_id,
                        'app_id' => self::$app_id
                    ];
                }
            }
            $addData && $this->saveAll($addData);
        }
    }

    /**
     * 获取列表数据
     */
    public function getAllList($shop_supplier_id)
    {
        return $this->where('shop_supplier_id', '=', $shop_supplier_id)->order(['sort' => 'asc', 'create_time' => 'desc'])->select();
    }

    /**
     * 详情
     */
    public static function detail($attribute_id)
    {
        return self::find($attribute_id);
    }

}
