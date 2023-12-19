<?php

namespace app\shop\controller\plus\group;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;

/**
 * Class Officia
 * 团购设置控制器
 * @package app\shop\controller\plus\officia
 */
class Setting extends Controller
{
    /**
     * 团购设置
     */
    public function index()
    {
        $key = 'group';
        if($this->request->isGet()){
            $vars['values'] = SettingModel::getItem($key);
            return $this->renderSuccess('', compact('vars'));
        }

        $model = new SettingModel;
        if ($model->edit($key, $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
    }

}