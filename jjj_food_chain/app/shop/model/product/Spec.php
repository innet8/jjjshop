<?php

namespace app\shop\model\product;

use app\common\model\product\Spec as SpecModel;

/**
 * 规格/属性(组)模型
 */
class Spec extends SpecModel
{
    /**
     * 获取列表数据
     */
    public function getList($data, $shop_supplier_id)
    {
        $model = $this;
        if (isset($data['spec_name']) && $data['spec_name'] != '') {
            $model = $model->like('spec_name', $data['spec_name']);
        }
        return $model->with('material')->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 新增规格组
     */
    public function add($data, $shop_supplier_id)
    {
        if(hasEmptyValue($data['spec_name'] ?? '')){
            $this->error = '规格名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('spec_name', '=', $data['spec_name'])
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
        if(hasEmptyValue($data['spec_name'] ?? '')){
            $this->error = '规格名称不能为空';
            return false;
        }
        $isExist = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
            ->where('spec_name', '=', $data['spec_name'])
            ->where('spec_id', '<>', $this['spec_id'])
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
    public function setDelete($spec_id)
    {
        return $this->where('spec_id', 'in', $spec_id)->delete();
    }
}
