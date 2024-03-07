<?php

namespace app\shop\model\product;

use app\common\model\product\Feed as FeedModel;

/**
 * 加料模型
 */
class Feed extends FeedModel
{
    /**
     * 获取列表数据
     */
    public function getList($data, $shop_supplier_id)
    {
        $model = $this;
        if (isset($data['feed_name']) && $data['feed_name'] != '') {
            $model = $model->like('feed_name', trim($data['feed_name']));
        }
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 添加
     */
    public function add($data,$shop_supplier_id)
    {
        if(hasEmptyValue($data['feed_name'] ?? '')){
            $this->error = '加料名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('feed_name', '=', $data['feed_name'])
            ->count();
        if ($isExist) {
            $this->error = '名称已存在';
            return false;
        }
        $data['shop_supplier_id'] = $shop_supplier_id;
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        if(hasEmptyValue($data['feed_name'] ?? '')){
            $this->error = '加料名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
            ->where('feed_name', '=', $data['feed_name'])
            ->where('feed_id', '<>', $this['feed_id'])
            ->count();
        if ($isExist) {
            $this->error = '名称已存在';
            return false;
        }
        return $this->save($data);
    }

    /**
     * 删除
     */
    public function setDelete($feed_id)
    {
        return $this->where('feed_id', 'in', $feed_id)->delete();
    }
}
