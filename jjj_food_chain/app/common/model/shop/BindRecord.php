<?php

namespace app\common\model\shop;


use app\common\model\BaseModel;



/**
 * 设备绑定模型
 */
class BindRecord extends BaseModel
{
    protected $name = 'shop_bind_record';
    protected $pk = 'id';

    const SOURCE_CASHIER = 'cashier'; // 收银机
    const SOURCE_TABLET = 'tablet'; // 平板端
    const SOURCE_KITCHEN = 'kitchen'; // 厨显端

    /**
     * 新增绑定记录
     */
    public static function add($data)
    {
        $model = new self();
        return $model->save([
            'source' => $data['source'],
            'key' => $data['key'],
            'address' => $data['address'],
            'port' => $data['port'],
            'remark' => $data['remark'] ?? '',
            'app_id' => $data['app_id'] ?: self::$app_id,
            'shop_supplier_id' => $data['shop_supplier_id'] ?? 0,
        ]);
    }
}
