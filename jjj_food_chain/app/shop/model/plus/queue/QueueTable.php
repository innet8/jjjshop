<?php


namespace app\shop\model\plus\queue;

use app\common\model\plus\queue\QueueTable as QueueTableModel;

/**
 * 桌位模型
 */
class QueueTable extends QueueTableModel
{
    const FORM_SCENE_ADD = 'add';
    const FORM_SCENE_EDIT = 'edit';

    /**
     * 获取列表数据
     */
    public function getList($params, $shop_supplier_id)
    {
        $model = $this;
        if (!empty($params['search']) && $params['search']) {
            $model = $model->where('table_name', 'like', '%' . $params['search'] . '%');
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
     * 编辑记录
     */
    public function onwitch($data)
    {
        return $this->save($data);
    }
    /**
     * 删除
     */
    public function setDelete($table_id)
    {
        //判断桌号是否使用
        $is_exist = (new QueueRecord())->where('table_id', '=', $table_id)->count();
        if ($is_exist) {
            $this->error = '桌位已使用，不允许删除';
            return false;
        }
        return $this->delete();
    }

    /**
     * 表单验证
     */
    private function validateForm($data, $scene = self::FORM_SCENE_ADD)
    {
        if ($scene === self::FORM_SCENE_ADD) {
            //查询桌号是否存在
            $count = $this->where('shop_supplier_id', '=', $data['shop_supplier_id'])
                ->where('table_name', '=', $data['table_name'])
                ->count();
            if ($count) {
                $this->error = '桌号已存在';
                return false;
            }
        } else {
            $count = $this->where('shop_supplier_id', '=', $this['shop_supplier_id'])
                ->where('table_name', '=', $data['table_name'])
                ->where('table_id', '<>', $data['table_id'])
                ->count();
            if ($count) {
                $this->error = '桌号已存在';
                return false;
            }
        }
        return true;
    }
}