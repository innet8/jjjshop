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
        $vars['values'] = SettingModel::getSupplierItem(SettingEnum::TABLET, $this->cashier['user']['shop_supplier_id']);
        if($this->request->isGet()){
            unset($vars['values']['cashier_password']);
            unset($vars['values']['advanced_password']);
            unset($vars['values']['language_list']);
            return $this->renderSuccess('', compact('vars'));
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if(!in_array($data['default_language'], $vars['values']['language'])){
            return $this->renderError('不在支持语言列表中');
        }

        $arr = $vars['values'];
        $arr['is_show_sold_out'] = $data['is_show_sold_out'] ?? 0;
        $arr['default_language'] = $data['default_language'] ?? 'en';
        if (SettingModel::updateSetting(SettingEnum::TABLET, $arr)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

}