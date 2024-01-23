<?php

namespace app\kitchen\model\order;

use app\common\model\product\Category as CategoryModel;

/**
 * 分类
 */
class Category extends CategoryModel
{
    /**
     * 获取厨显分类
     */
    public static function getKitchenCategory($type, $is_special, $shop_supplier_id = 0)
    {
        $model = new static;
        return $model->where('parent_id', '=', 0)
            ->where('type', '=', $type)
            ->where('status', '=', 1)
            ->where('is_special', '=', $is_special)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->select();
    }
}
