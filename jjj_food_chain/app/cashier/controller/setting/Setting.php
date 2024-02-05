<?php

namespace app\cashier\controller\setting;

use app\cashier\controller\Controller;
use app\common\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
use hg\apidoc\annotation as Apidoc;


/**
 * 设置相关
 * @Apidoc\Group("base")
 * @Apidoc\Sort(6)
 */
class Setting extends Controller
{
    /**
     * @Apidoc\Title("设置")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/cashier/setting.setting/index")
     * @Apidoc\Param("is_show_sold_out", type="int", require=false, default="0", desc="是否显示售罄商品")
     * @Apidoc\Param("default_language", type="string", require=false, default="", desc="默认语言")
     * @Apidoc\Returned()
     */
    public function index()
    {
        $shop_supplier_id = $this->cashier['user']['shop_supplier_id'];
        $cashier = SettingModel::getSupplierItem(SettingEnum::CASHIER, $shop_supplier_id);
        $tablet = SettingModel::getSupplierItem(SettingEnum::TABLET, $shop_supplier_id);
        if($this->request->isGet()){
            $vars['values']['is_show_sold_out'] = $tablet['is_show_sold_out'];
            $vars['values']['default_language'] = $cashier['default_language'];
            return $this->renderSuccess('', compact('vars'));
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if(isset($data['default_language']) && !in_array($data['default_language'], $cashier['language'])){
            return $this->renderError('不在支持语言列表中');
        }

        $tablet['is_show_sold_out'] = $data['is_show_sold_out'] ?? 0;
        if (SettingModel::updateSetting(SettingEnum::TABLET, $tablet, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}