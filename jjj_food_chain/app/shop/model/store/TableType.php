<?php


namespace app\shop\model\store;

use app\common\model\store\TableType as TableTypeModel;

/**
 * 桌位类型模型
 */
class TableType extends TableTypeModel
{

    const FORM_SCENE_ADD = 'add';
    const FORM_SCENE_EDIT = 'edit';

    /**
     * 获取列表数据
     */
    public function getList($params, $shop_supplier_id)
    {
        $model = $this;
        if (!empty($search)) {
            $model = $model->like('type_name', $search);
        }
        // 查询列表数据
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        // 表单验证
        if (!$this->validateForm($data, self::FORM_SCENE_ADD)) {
            return false;
        }
        $data['app_id'] = self::$app_id;
        return self::create($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        // 表单验证
        if (!$this->validateForm($data, self::FORM_SCENE_EDIT)) {
            return false;
        }
        return $this->save($data);
    }

    /**
     * 删除
     */
    public function setDelete()
    {
        return $this->delete();
    }

    /**
     * 表单验证
     */
    private function validateForm($data, $scene = self::FORM_SCENE_ADD)
    {
        if (strlen($data['type_name'] ?? '') > 50) {
            $this->error = '类型名称不得超过50字符';
            return false;
        }
        if ($data['min_num'] < 1 || $data['min_num'] > 100) {
            $this->error = '请输入1-100之间的数';
            return false;
        }
        if ($data['max_num'] < 1 || $data['max_num'] > 100) {
            $this->error = '请输入1-100之间的数';
            return false;
        }
        if ($data['min_num'] > $data['max_num']) {
            $this->error = '最多人数不可小于最少人数';
            return false;
        }
        if ($scene === self::FORM_SCENE_ADD) {
            //查询桌号是否存在
            $count = $this->where('shop_supplier_id', '=', $data['shop_supplier_id'])
                ->where('type_name', '=', $data['type_name'])
                ->count();
            if ($count) {
                $this->error = '桌号类型名已存在';
                return false;
            }
        } else {
            $count = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
                ->where('type_name', '=', $data['type_name'])
                ->where('type_id', '<>', $data['type_id'])
                ->count();
            if ($count) {
                $this->error = '桌号类型名已存在';
                return false;
            }
        }
        return true;
    }

}