<?php

namespace app\shop\controller\setting;

use app\common\enum\order\OrderPayTypeEnum;
use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\common\enum\settings\DeliveryTypeEnum;

/**
 * 商城设置控制器
 */
class Store extends Controller
{
    /**
     * 商城设置
     */
    public function index()
    {
        if ($this->request->isGet()) {
            return $this->fetchData();
        }
        $model = new SettingModel;
        $data = $this->request->param();
        $arr = [
            'name' => $data['name'],
            'kuaidi100' => ['customer' => $data['customer'], 'key' => $data['key']],
            'sms_open' => $data['sms_open'],
            'is_get_log' => $data['is_get_log'],
            'wx_open' => $data['wx_open'],
            'avatarUrl' => $data['avatarUrl'],
            'logoUrl' => $data['logoUrl'],
        ];
        if ($model->edit('store', $arr)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取商城配置
     */
    public function fetchData()
    {
        $vars['values'] = SettingModel::getItem('store');
        return $this->renderSuccess('', compact('vars'));
    }

}
