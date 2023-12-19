<?php


namespace app\shop\model\plus\queue;

use app\common\model\plus\queue\QueueSetting as QueueSettingModel;

/**
 * 排号设置模型
 */
class QueueSetting extends QueueSettingModel
{
    //修改
    public function edit($data, $shop_supplier_id)
    {
        $detail = self::detail($shop_supplier_id);
        if ($detail) {
            $model = $detail;
        } else {
            $model = $this;
            $data['shop_supplier_id'] = $shop_supplier_id;
            $data['app_id'] = self::$app_id;
        }
        return $model->save($data);
    }
}