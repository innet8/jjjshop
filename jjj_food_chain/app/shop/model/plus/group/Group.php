<?php

namespace app\shop\model\plus\group;

use app\common\model\plus\group\Group as GroupModel;

/**
 * 团购模型
 */
class Group extends GroupModel
{
    /**
     * 获取团购列表
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['search']) && $params['search']) {
            $model = $model->where('group_name', 'like', '%' . $params['search'] . '%');
        }
        return $model->with(['image.file'])
            ->where('is_delete', '=', 0)
            ->order(['group_sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($params);

    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        // 开启事务
        $this->startTrans();
        try {
            if ($data['expire_type'] == 20) {
                $data['start_time'] = $data['time'] ? strtotime($data['time'][0]) : '';
                $data['end_time'] = $data['time'] ? strtotime($data['time'][1]) : '';
            }
            $data['app_id'] = self::$app_id;
            $this->save($data);
            // 图片
            $this->addProductImages($data['image']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 更新记录
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            if ($data['expire_type'] == 20) {
                $data['start_time'] = $data['time'] ? strtotime($data['time'][0]) : '';
                $data['end_time'] = $data['time'] ? strtotime($data['time'][1]) + 86399 : '';
            }
            $this->save($data);
            // 图片
            $this->addProductImages($data['image']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 添加图片
     */
    private function addProductImages($images)
    {
        $this->image()->delete();
        $data = array_map(function ($images) {
            return [
                'image_id' => isset($images['file_id']) ? $images['file_id'] : $images['image_id'],
                'app_id' => self::$app_id
            ];
        }, $images);
        return $this->image()->saveAll($data);
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }

}