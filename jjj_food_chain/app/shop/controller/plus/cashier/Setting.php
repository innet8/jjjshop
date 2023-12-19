<?php

namespace app\shop\controller\plus\cashier;

use app\shop\controller\Controller;
use app\shop\model\plus\cashier\Setting as SettingModel;

/**
 * 收银台设置控制器
 */
class Setting extends Controller
{
    /**
     * 基础设置
     */
    public function index()
    {
        if ($this->request->isGet()) {
            return $this->fetchData();
        }
        $model = new SettingModel;
        $data = $this->request->param();
        $arr = [
            'checkedPay' => $data['checkedPay'],
            'function' => $data['function'],
            'bind_user' => $data['bind_user'],
        ];
        if ($model->edit('basic', $arr)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取基础配置
     */
    public function fetchData()
    {
        $vars = SettingModel::getItem('basic');
        //支付方式
        $pay_type = SettingModel::pay();
        //收银功能
        $function = SettingModel::funMethod();
        //收银台链接
        $url = base_url() . 'cashier';
        return $this->renderSuccess('', compact('vars', 'pay_type', 'function', 'url'));
    }

}
