<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\auth\User as UserModel;
use app\common\model\shop\UserShiftLog as UserShiftLogModel;
use app\shop\service\statistics\UserShiftLogService as UserShiftLogService;
use hg\apidoc\annotation as Apidoc;

/**
 * 收银交班
 * @Apidoc\Group("statistics")
 * @Apidoc\Sort(7)
 */
class UserShiftLog extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.UserShiftLog/index")
     * @Apidoc\Param("user_name", type="string", require=true, default="", desc="收银员名称")
     * @Apidoc\Param("start_time", type="string", require=true, default="", desc="开始时间")
     * @Apidoc\Param("end_time", type="string", require=true, default="", desc="结束时间")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\common\model\shop\UserShiftLog\getList", desc="列表",children={
     *     @Apidoc\Param ("total_money",type="float",desc="营业收入"),
     * })
     * @Apidoc\Returned("cashierList", type="array", ref="app\shop\model\auth\User\getList", desc="收银员列表")
     */
    public function index()
    {
        $data = $this->postData();
        $model = new UserShiftLogModel;
        $list = $model->getList($data);
        $model = new UserModel();
        $cashierList = $model->getList($data);
        return $this->renderSuccess('', compact('list', 'cashierList'));
    }

    /**
     * @Apidoc\Title("详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.UserShiftLog/detail")
     * @Apidoc\Param("id", type="int", require=true, default=0, desc="id")
     * @Apidoc\Returned("detail", type="array", ref="app\common\model\shop\UserShiftLog\detail", desc="详情")
     * @Apidoc\Returned("salesInfo",type="array",desc="销售信息",children={
     *     @Apidoc\Param ("name",type="string",desc="分类名称"),
     *     @Apidoc\Param ("sales",type="string",desc="销售数量"),
     *     @Apidoc\Param ("prices",type="string",desc="销售金额"),
     * })
     */
    public function detail()
    {
        $data = $this->postData();
        $model = new UserShiftLogModel;
        $detail = $model->detail($data['id']);
        if (!$detail) {
            return $this->renderError('找不到数据');
        }
        // 销售信息
        $salesInfo = $model->getSalesInfo($detail['shift_user_id'], $detail['shop_supplier_id'], $detail['shift_start_time'], $detail['shift_end_time']);
        return $this->renderSuccess('', compact('detail' , 'salesInfo'));
    }

    /**
     * @Apidoc\Title("导出")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.UserShiftLog/export")
     * @Apidoc\Param("user_name", type="string", require=true, default="", desc="收银员名称")
     * @Apidoc\Param("start_time", type="string", require=true, default="", desc="开始时间")
     * @Apidoc\Param("end_time", type="string", require=true, default="", desc="结束时间")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned()
     */
    public function export()
    {
        $model = new UserShiftLogModel;
        $list = $model->getList($this->postData());
        (new UserShiftLogService())->userShiftLogListExport($list);
        return $this->renderSuccess('');
    }
}
