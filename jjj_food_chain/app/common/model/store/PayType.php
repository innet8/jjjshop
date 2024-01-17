<?php


namespace app\common\model\store;

use app\common\model\BaseModel;
use app\common\enum\order\OrderPayTypeEnum;

/**
 * 门店支付类型模型
 */
class PayType extends BaseModel
{
    protected $pk = 'id';
    protected $name = 'pay_type';
  
    /**
     * 获取数据
     */
    public static function list($shopSupplierId = 0, $appId=0)
    {
        $data = self::where('shop_supplier_id',$shopSupplierId)->where('app_id',$appId)->select();
        $enumData = array_values(OrderPayTypeEnum::data());
        foreach ($enumData as $key => $item) {
            foreach ($data as $k => $v) {
                if ($item['value'] == $v['value']) {
                    $enumData[$key]['status'] = $v['status'];
                    // if (isset($enumData[$key]['img'])) {
                    //     $enumData[$key]['img'] = $v['img'];
                    // }
                    if (isset($enumData[$key]['sort'])) {
                        $enumData[$key]['sort'] = $v['sort'];
                    }
                }
            }
        }
        return array_values(array_filter($enumData, function($item){
            switch ($item['value']) {
                case OrderPayTypeEnum::BALANCE:
                case OrderPayTypeEnum::WECHAT:
                case OrderPayTypeEnum::ALIPAY:
                case OrderPayTypeEnum::CASH:
                case OrderPayTypeEnum::POS:
                    return false;
                    break;
            }
            return true;
        }));
    }

    /**
     * 获取数据
     */
    public static function getEnablelist($shopSupplierId = 0, $appId=0)
    {
        return array_values(array_filter(self::list($shopSupplierId,$appId), function($item){
            return $item['status'] == 1;
        }));
    }
    

}