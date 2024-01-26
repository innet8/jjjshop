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
    public function getList($params, int $status = 0, int $shopSupplierId = 0)
    {
//        return $this->withoutGlobalScope()->where('status', $status)->where('shop_supplier_id', $shopSupplierId)->paginate($params);
        return $this->withoutGlobalScope()
            ->alias('t1')
            ->where('status', $status)->where('shop_supplier_id', $shopSupplierId)
            ->where('(SELECT MAX(create_time) as max_time FROM jjjfood_call t2  WHERE t2.table_id = t1.table_id) = create_time')
            ->order('create_time', 'desc')
            ->paginate($params);
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
        ]);
    }

    /**
     * 处理
     */
    public function markAsProcessed(int $callId, int $shopSupplierId = 0)
    {
        $call = self::withoutGlobalScope()->where('id', $callId)->where('shop_supplier_id', $shopSupplierId)->find();
        if ($call) {
            self::withoutGlobalScope()->where('table_id', $call['table_id'])->update(['status' => 1]);
        }
    }

    /**
     * 未处理数量
     */
    public function getUnprocessedCount(int $shopSupplierId = 0)
    {
        return $this->withoutGlobalScope()->where('status', 0)->where('shop_supplier_id', $shopSupplierId)->count();
    }

    /**
     * 未发送消息列表
     */
    public function getUnSendList(int $shopSupplierId = 0)
    {
        $unSendList = $this->withoutGlobalScope()->where('is_send', 0)->where('status', 0)->where('shop_supplier_id', $shopSupplierId)->limit(5)->order(['create_time' => 'asc'])->select();
//        $this->withoutGlobalScope()->where('is_send', 0)->where('status', 0)->where('shop_supplier_id', $shopSupplierId)->limit(5)->order(['create_time' => 'asc'])->update(['is_send' => 1]);
        return $unSendList;
    }
}
