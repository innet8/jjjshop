<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单错误类型枚举类,用于后期扩展，比如虚拟物品
 */
class OrderErrorEnum extends Enum
{
    // 商城订单
    const OUT_LIMIT_NUM = -11;
    const OUT_LIMIT_TIME = -12;
}