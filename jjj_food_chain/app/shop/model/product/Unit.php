<?php

namespace app\shop\model\product;

use app\common\model\product\Unit as UnitModel;

/**
 * 单位模型
 */
class Unit extends UnitModel
{
    /**
     * 获取列表数据
     */
    public function getList($data, $shop_supplier_id)
    {
        $model = $this;
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 添加
     */
    public function add($data, $shop_supplier_id)
    {
        $isExist = $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('unit_name', '=', $data['unit_name'])
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
        $isExist = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
            ->where('unit_name', '=', $data['unit_name'])
            ->where('unit_id', '<>', $this['unit_id'])
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
    public function setDelete($unit_id)
    {
        return $this->where('unit_id', 'in', $unit_id)->delete();
    }
}
