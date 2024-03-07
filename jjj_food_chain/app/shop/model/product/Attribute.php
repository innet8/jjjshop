<?php

namespace app\shop\model\product;

use app\common\model\product\Attribute as AttributeModel;

/**
 * 规格/属性(组)模型
 */
class Attribute extends AttributeModel
{
    /**
     * 获取列表数据
     */
    public function getList($data, $shop_supplier_id)
    {
        $model = $this;
        if (isset($data['attribute_name']) && $data['attribute_name'] != '') {
            $model = $model->like('attribute_name', $data['attribute_name']);
        }
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 添加
     */
    public function add($data, $shop_supplier_id)
    {
        if(hasEmptyValue($data['attribute_name'] ?? '')){
            $this->error = '属性名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('attribute_name', '=', $data['attribute_name'])
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
        if(hasEmptyValue($data['attribute_name'] ?? '')){
            $this->error = '属性名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
            ->where('attribute_name', '=', $data['attribute_name'])
            ->where('attribute_id', '<>', $this['attribute_id'])
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
    public function setDelete($attribute_id)
    {
        return $this->where('attribute_id', 'in', $attribute_id)->delete();
    }
}
