<?php


namespace app\common\model\store;

use app\common\model\BaseModel;

/**
 * 桌位模型
 */
class Table extends BaseModel
{
    protected $pk = 'table_id';
    protected $name = 'table';

    /**
     * 关联门店
     */
    public function supplier()
    {
        return $this->BelongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联进行中订单
     */
    public function underwayOrder()
    {
        return $this->hasOne('app\\common\\model\\order\\Order', 'table_id', 'table_id')->where('order_status', 10);
    }

    /**
     * 桌位详情
     */
    public static function detail($where)
    {
        $filter = is_array($where) ? $where : ['table_id' => $where];
        return static::where($filter)->find();
    }

    // 查询桌台是否进行中
    public static function isOpen($table_id)
    {
        $tableStatus = static::where('table_id', '=', $table_id)->value('status');

        return $tableStatus == 30;
    }



    // 获取桌台分类
    public static function getAreaType($shop_supplier_id)
    {
        $areaList = (new TableArea)->where('shop_supplier_id', '=', $shop_supplier_id)->select();
        $typeList = (new TableType)->where('shop_supplier_id', '=', $shop_supplier_id)->select();
        return compact('areaList', 'typeList');
    }
}