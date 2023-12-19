<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Printing as PrintingModel;

/**
 * 菜品打印模型
 */
class Printing extends PrintingModel
{
    /**
     * 获取列表数据
     */
    public function getLists($params, $user)
    {
        $model = $this;
        // 查询列表数据
        return $model->with(['printer'])
            ->where('shop_supplier_id', '=', $user['shop_supplier_id'])
            ->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 添加
     */
    public function add($data, $user)
    {
        // 开启事务
        $this->startTrans();
        try {
            $data['app_id'] = self::$app_id;
            $data['shop_supplier_id'] = $user['shop_supplier_id'];
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        // 开启事务
        $this->startTrans();
        try {
            if (!isset($data['category_id'])) {
                $data['category_id'] = '';
            }
            if (!isset($data['label_id'])) {
                $data['label_id'] = '';
            }
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }
}