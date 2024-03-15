<?php

namespace app\shop\model\product;

use think\facade\Cache;
use app\common\model\product\Category as CategoryModel;

/**
 * 商品分类模型
 */
class Category extends CategoryModel
{
    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        $res = $this->save($data);
        $this->deleteCache($data['type'] ?? 0, $data['is_special'] ?? 0, $data['shop_supplier_id'] ?? 0);
        return $res;
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        !array_key_exists('image_id', $data) && $data['image_id'] = 0;
        $res = $this->save($data) !== false;
        $this->deleteCache($this['type'], $this['is_special'], $this['shop_supplier_id']);
        return $res;
    }

    /**
     * 删除商品分类
     */
    public function remove($categoryId)
    {
        // 判断是否存在商品
        if ($productCount = (new Product)->getProductTotal(['category_id' => $categoryId])) {
            $this->error = '该分类下存在' . $productCount . '个商品，不允许删除';
            return false;
        }
        $res = $this->delete();
        $this->deleteCache($this['type'], $this['is_special'], $this['shop_supplier_id']);
        return $res;
    }

    /**
     * 编辑记录
     */
    public function setStatus($data)
    {
        $res = $this->save($data) !== false;
        $this->deleteCache($this['type'], $this['is_special'], $this['shop_supplier_id']);
        return $res;
    }

    /**
     * 删除缓存
     */
    public function deleteCache($type, $is_special, $shop_supplier_id)
    {
        Cache::tag('category'. $shop_supplier_id. $is_special . $type)->clear();
        return true;
    }

}
