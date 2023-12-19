<?php

namespace app\shop\model\app;

use app\common\model\app\AppUpdate as AppUpdateModel;

/**
 * 角色模型
 */
class AppUpdate extends AppUpdateModel
{

    public function getList($data)
    {
        return $this->where('is_delete', '=', 0)
            ->order(['create_time' => 'desc'])
            ->paginate($data, false, [
                'query' => \request()->request()
            ]);
    }

    /**
     * 新增
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        return $this->save($data);
    }

    /**
     * 删除
     */
    public function setDelete()
    {
        return $this->save([
            'is_delete' => 1
        ]);
    }
}
