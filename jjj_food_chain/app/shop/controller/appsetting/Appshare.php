<?php

namespace app\shop\controller\appsetting;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;

/**
 * app 分享设置
 */
class Appshare extends Controller
{
    /**
     * 存储设置
     */
    public function index()
    {
        if($this->request->isGet()){
            return $this->fetchData();
        }
        $model = new SettingModel;
        if ($model->edit('appshare', $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取存储配置
     */
    public function fetchData()
    {
        $data = SettingModel::getItem('appshare');
        return $this->renderSuccess('', compact('data'));
    }

}
