<?php

namespace app\cashier\controller\store;

use hg\apidoc\annotation as Apidoc;
use app\cashier\controller\Controller;
use app\cashier\model\order\Order as OrderModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\service\order\OrderBusinessPrinterService;

/**
 * 营业数据
 * @Apidoc\Group("base")
 * @Apidoc\Sort(5)
 */
class Business extends Controller
{
    /**
     * @Apidoc\Title("营业数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/cashier/store.business/index")
     * @Apidoc\Param("time_type", type="int",require=true, default=1, desc="时间类型 0-全都,1-今天,2-昨天,3-周")
     * @Apidoc\Param("time", type="string",require=true, default="", desc="时间范围 [2024-01-01, 2024-01-11]")
     * @Apidoc\Param("category_type", type="int",require=true, default=1, desc="分类类型 1-一级,2-二级")
     * @Apidoc\Returned("categorys",type="array",desc="分类列表"),
     * @Apidoc\Returned("sales_num",type="int",desc="銷售筆數"),
     * @Apidoc\Returned("balance_pay",type="int",desc="余额付款"),
     * @Apidoc\Returned("cash_pay",type="int",desc="现金付款"),
     * @Apidoc\Returned("wx_pay",type="int",desc="微信付款"),
     * @Apidoc\Returned("zfb_pay",type="int",desc="支付宝付款"),
     * @Apidoc\Returned("refund_amount",type="int",desc="退款金额"),
     * @Apidoc\Returned("total_amount",type="int",desc="总金额"),
     */
    public function index()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        return $this->renderSuccess('', (new OrderModel)->businessData($data));
    }

    /**
     * @Apidoc\Title("打印小票")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/store.business/print")
     * @Apidoc\Param("time_type", type="int",require=true, default=1, desc="时间类型 0-全都,1-今天,2-昨天,3-周")
     * @Apidoc\Param("time", type="string",require=true, default="", desc="时间范围 [2024-01-01, 2024-01-11]")
     * @Apidoc\Param("category_type", type="int",require=true, default=1, desc="分类类型 1-一级,2-二级")
     */
    public function print()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        // 
        $data = (new OrderModel)->businessData($data);
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem('printer', $data['supplier']['shop_supplier_id'], $data['supplier']['app_id']);
        //发送打印
        $res = (new OrderBusinessPrinterService)->cashierPrint($printerConfig, $data);
        // 
        return $res ? $this->renderSuccess('打印成功') : $this->renderError('打印失败，未连接打印机');
    }

}
