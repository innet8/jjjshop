<?php

namespace app\shop\controller\setting;

use app\common\model\store\PayType as PayTypeModel;
use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\order\OrderPayTypeEnum;

/**
 * 支付方式
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(10)
 */
class Paytype extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/setting.Paytype/index")
     * @Apidoc\Returned("", type="array", ref="app\common\model\store\PayType\lists", desc="列表")
     */
    public function index()
    {
        $app_id = $this->store['app']['app_id'];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        $data = PayTypeModel::list($shop_supplier_id, $app_id);
        return $this->renderSuccess('', $data);
    }

    /**
     * @Apidoc\Title("设置状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/setting.paytype/edit")
     * @Apidoc\Param("key", type="int", require=true, default=0, desc="支付方式的key")
     * @Apidoc\Param("status", type="int", require=true, default=1, desc="状态 0禁用 1启用")
     * @Apidoc\Returned("", type="array", ref="app\common\model\store\PayType\lists", desc="列表")
     */
    public function edit()
    {
        $param = $this->postData();
        if (!$param['key'] || !$data = OrderPayTypeEnum::data($param['key'])) {
            return $this->renderError('无效的key');
        }
        if (!in_array($param['status'], [0,1])) {
            return $this->renderError('无效的status');
        }
        // 
        $payType = PayTypeModel::where('value', $param['key'])->findOrEmpty();
        $data['status'] = $param['status'];
        if (isset($param['sort'])) {
            $data['sort'] = $param['sort'];
        }
        $data['shop_supplier_id'] =  $this->store['user']['shop_supplier_id'];
        $data['app_id'] =  $this->store['app']['app_id'];
        $payType->save( $data );
        // 
        return $this->renderSuccess('',$data);
    }
}
