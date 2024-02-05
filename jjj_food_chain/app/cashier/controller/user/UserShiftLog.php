<?php

namespace app\cashier\controller\user;

use think\facade\Cache;
use hg\apidoc\annotation as Apidoc;
use app\cashier\controller\Controller;
use app\common\model\shop\UserShiftLog as UserShiftLogModel;

/**
 * 收银交班
 * @Apidoc\Group("base")
 * @Apidoc\Sort(7)
 */
class UserShiftLog extends Controller
{
    /**
     * @Apidoc\Title("交班数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.UserShiftLog/index")
     * @Apidoc\Param("cash_taken_out", type="float", require=true, desc="本班取出現金")
     * @Apidoc\Param("cash_left", type="float", require=true, desc="本班遗留备用金")
     * @Apidoc\Returned("shift_no", type="string", desc="交班编号")
     * @Apidoc\Returned("shift_user_id", type="int", desc="交班人id")
     * @Apidoc\Returned("previous_shift_cash", type="float", desc="上一班遗留备用金")
     * @Apidoc\Returned("current_cash_total", type="float", desc="当前钱箱现金总计(现金收入+上一班遗留备用金)")
     * @Apidoc\Returned("incomes", type="array", desc="收入详情", children={
     *    @Apidoc\Param ("pay_type",type="int",desc="支付方式"),
     *    @Apidoc\Param ("pay_type_name",type="string",desc="支付方式名称"),
     *    @Apidoc\Param ("price",type="string",desc="销售金额"),
     * })
     * @Apidoc\Returned("total_income", type="float", desc="总收入")
     * @Apidoc\Returned("refund_amount", type="float", desc="退款金额")
     * @Apidoc\Returned("cash_taken_out", type="float", desc="本班取出現金")
     * @Apidoc\Returned("cash_left", type="float", desc="本班遗留备用金")
     * @Apidoc\Returned("remark", type="string", desc="备注")
     * @Apidoc\Returned("shop_supplier_id", type="int", desc="店铺供应商id")
     */
    public function index()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        $data['shop_user_id'] = $this->cashier['user']['cashier_id'];
        $data = (new UserShiftLogModel)->getShiftInfo($data);
        return $this->renderSuccess('', $data);
    }

    /**
     * @Apidoc\Title("确定交班")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.UserShiftLog/shift")
     * @Apidoc\Param("cash_taken_out", type="float", require=true, desc="本班取出現金")
     * @Apidoc\Param("cash_left", type="float", require=true, desc="本班遗留备用金")
     * @Apidoc\Returned()
     */
    public function shift()
    {
        $data = $this->postData();
        if (!isset($data['cash_taken_out']) || $data['cash_taken_out'] < 0) {
            return $this->renderError('请输入本班取出現金正确金额');
        }
        if (!isset($data['cash_left']) || $data['cash_left'] < 0) {
            return $this->renderError('请输入本班遗留备用金正确金额');
        }
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        $data['shop_user_id'] = $this->cashier['user']['cashier_id'];
        $userShiftLogModel = new UserShiftLogModel;
        if ($userShiftLogModel->shiftLog($data)) {
            return $this->renderSuccess('交班成功', Cache::pull("printer_handover_data_cache") ?: []);
        }
        return $this->renderError($userShiftLogModel->getError() ?: '交班失败');
    }
}
