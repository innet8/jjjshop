<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 单位模型
 */
class Unit extends BaseModel
{
    protected $name = 'product_unit';
    protected $pk = 'unit_id';

    //更新单位
    public function updateUnit($unit_name, $shop_supplier_id)
    {
        if ($unit_name) {
            $isExit = $this->where('unit_name', '=', $unit_name)
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->count();
            if ($isExit == 0) {
                $addData = [
                    'unit_name' => $unit_name,
                    'shop_supplier_id' => $shop_supplier_id,
                    'app_id' => self::$app_id
                ];
                $this->save($addData);
            }
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
    public static function detail($unit_id)
    {
        return self::find($unit_id);
    }
}
