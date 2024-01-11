<?php

namespace app\common\model\call;

use app\common\model\BaseModel;

/**
 * 呼叫模型
 */
class Call extends BaseModel
{
    /**
     * 获取列表记录
     */
    public function getList(int $status = 0, int $shopSupplierId = 0)
    {
        return $this->withoutGlobalScope()->where('status', $status)->where('shop_supplier_id', $shopSupplierId)->select();
    }

    /**
     * 发起呼叫
     */
    public function makeCall(int $tableId, string $tableNo, int $callType, int $appId, int $shopSupplierId)
    {
        return $this->save([
            'table_id' => $tableId,
            'table_no' => $tableNo,
            'call_type' => $callType,
            'app_id' => $appId,
            'shop_supplier_id' => $shopSupplierId,
            'status' => 0, // 设置初始状态为未处理
            'create_time' => time(),
            'update_time' => time()
        ]);
    }

    /**
     * 处理
     */
    public function markAsProcessed(int $callId, int $shopSupplierId = 0)
    {
        $call = self::withoutGlobalScope()->where('id', $callId)->where('shop_supplier_id', $shopSupplierId)->find();
        if ($call) {
            $call->status = 1;
            $call->save();
        }
    }
}
