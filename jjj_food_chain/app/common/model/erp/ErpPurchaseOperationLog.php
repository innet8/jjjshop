<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\shop\User;

/**
 * 采购单操作日志模型
 */
class ErpPurchaseOperationLog extends BaseModel
{
    protected $name = 'erp_purchase_operation_log';

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [];

    /**
     * 操作人
     */
    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id', 'shop_user_id')->field('shop_user_id, real_name');
    }
}