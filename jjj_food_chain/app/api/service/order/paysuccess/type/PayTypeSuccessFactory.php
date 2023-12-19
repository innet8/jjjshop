<?php

namespace app\api\service\order\paysuccess\type;

use app\common\enum\order\OrderTypeEnum;

/**
 * 支付成功辅助工厂类
 */
class PayTypeSuccessFactory
{
    public static function getFactory($out_trade_no, $attach, $pay_status = 10)
    {
        switch ($attach['order_type']) {
            case OrderTypeEnum::MASTER:
                return new MasterPaySuccessService($out_trade_no, $attach);
                break;
            case OrderTypeEnum::BALANCE;
                return new BalancePaySuccessService($out_trade_no, $pay_status);
                break;
            case OrderTypeEnum::POINTS;
                return new PointsPaySuccessService($out_trade_no, $attach);
                break;
            case OrderTypeEnum::CARD;
                return new CardPaySuccessService($out_trade_no, $pay_status);
                break;
            case OrderTypeEnum::PACKAGE;
                return new PackagePaySuccessService($out_trade_no, $pay_status);
                break;
            case OrderTypeEnum::DRIVER;
                return new DriverPaySuccessService($out_trade_no, $pay_status);
                break;
            case OrderTypeEnum::Group;
                return new GroupSuccessService($out_trade_no, $pay_status);
                break;
        }
    }
}