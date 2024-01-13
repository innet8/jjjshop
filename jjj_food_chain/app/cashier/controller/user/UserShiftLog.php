<?php

namespace app\cashier\controller\user;

use app\cashier\controller\Controller;
use app\common\model\shop\UserShiftLog as UserShiftLogModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 收银交班
 * @Apidoc\Group("base")
 * @Apidoc\Sort(7)
 */
class UserShiftLog extends Controller
{
    /**
     * @Apidoc\Title("收银交班")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.UserShiftLog/index")
     * @Apidoc\Param("cash_taken_out", type="float", require=true, desc="本班取出現金")
     * @Apidoc\Param("cash_left", type="float", require=true, desc="本班遗留备用金")
     * @Apidoc\Returned()
     */
    public function index($mobile)
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->cashier['user']['shop_supplier_id'];
        $data['shop_user_id'] = $this->cashier['user']['cashier_id'];
        if (UserShiftLogModel::shiftLog($data)) {
            return $this->renderSuccess('交班成功');
        }
        return $this->renderError('交班失败');
    }
}
