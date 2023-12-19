<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;

/**
 * 满额包邮控制器
 */
class Fullfree extends Controller
{
    /**
     *满额包邮
     */
    public function index()
    {
        $key = 'full_free';
        if($this->request->isGet()){
            $vars['values'] = SettingModel::getSupplierItem($key,$this->store['user']['shop_supplier_id']);
            return $this->renderSuccess('', compact('vars'));
        }
        $model = new SettingModel;
        if ($model->edit($key, $this->postData(),$this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('操作成功');
        }
    }

}