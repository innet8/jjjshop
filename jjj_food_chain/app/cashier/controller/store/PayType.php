<?php

namespace app\cashier\controller\store;

use app\common\model\store\PayType as PayTypeModel;
use app\cashier\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\order\OrderPayTypeEnum;

/**
 * 付款方式
 * @Apidoc\Group("base")
 * @Apidoc\Sort(10)
 */
class PayType extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/store.paytype/index")
     * @Apidoc\Returned("", type="array", ref="app\common\model\store\PayType\lists", desc="列表")
     */
    public function index()
    {
        $app_id = $this->cashier['app']['app_id'];
        $shop_supplier_id = $this->cashier['user']['shop_supplier_id'];
        $data = PayTypeModel::getEnablelist($shop_supplier_id, $app_id);
        return $this->renderSuccess('', $data);
    }

}
