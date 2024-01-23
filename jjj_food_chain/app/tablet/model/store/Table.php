<?php


namespace app\tablet\model\store;

use app\common\model\store\Table as TableModel;

/**
 * 桌台模型
 */
class Table extends TableModel
{
    /**
     * 获取门店所有未绑定桌位
     */
    public function getAll(int $shopSupplierId = 0)
    {
        return $this->where('shop_supplier_id', $shopSupplierId)->where('is_bind', 0)->select();
    }

    // 绑定桌位
    public function bindTable($shop_supplier_id, $table_id)
    {
        $table = $this->where('shop_supplier_id', $shop_supplier_id)->where('table_id', $table_id)->where('is_bind', 0)->find();
        if (!$table) {
            $this->error = "桌台已被占用";
            return false;
        }
        return $table->save(['is_bind' => 1]);
    }

    // 解绑桌位
    public function unbindTable($shop_supplier_id, $table_id)
    {
        $table = $this->where('shop_supplier_id', $shop_supplier_id)->where('table_id', $table_id)->find();
        if ($table) {
            return $table->save(['is_bind' => 0]);
        }
        return true;
    }

    // 开台
    public static function open($table_id)
    {
        return self::where('table_id', '=', $table_id)->update(['status' => 30]);
    }

    // 关台
    public static function close($table_id)
    {
        return self::where('table_id', '=', $table_id)->update(['status' => 10]);
    }
}