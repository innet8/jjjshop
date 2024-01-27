<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\common\enum\settings\SettingEnum;
use app\shop\model\settings\Setting as SettingModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 商城设置
 * @Apidoc\Group("system_setting")
 * @Apidoc\Sort(11)
 */
class Store extends Controller
{
    /**
     * @Apidoc\Title("商城设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Store/index")
     * @Apidoc\Param("name", type="string", require=true, default="", desc="商城名称")
     * @Apidoc\Param("logoUrl", type="string", require=true, default="", desc="商城logo")
     * @Apidoc\Returned()
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $ret = $this->fetchData();
            $ret['shop']['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
            // 获取当前设备机器码
            $ret['shop']['device_code'] = getMachineCode();
            return $this->renderSuccess('', $ret);
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if (empty($data['name'])) {
            return $this->renderError('名称不能为空');
        }
        if (empty($data['logoUrl'])) {
            return $this->renderError('商城logo不能为空');
        }
        $arr = [
            'name' => $data['name'],
            'kuaidi100' => ['customer' => $data['customer'] ?? '', 'key' => $data['key'] ?? ''],
           'sms_open' => $data['sms_open'] ?? 0,
            'is_get_log' => $data['is_get_log'] ?? 0,
            'wx_open' => $data['wx_open'] ?? 0,
            'avatarUrl' => $data['avatarUrl'] ?? '',
            'logoUrl' => $data['logoUrl'] ?? '',
        ];
        if ($model->edit(SettingEnum::STORE, $arr)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取商城配置
     */
    public function fetchData()
    {
        $vars['values'] = SettingModel::getItem(SettingEnum::STORE);
        return compact('vars');
    }

}
