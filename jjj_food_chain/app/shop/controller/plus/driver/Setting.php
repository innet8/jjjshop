<?php

namespace app\shop\controller\plus\driver;


use app\shop\controller\Controller;
use app\shop\model\plus\driver\Setting as SettingModel;

/**
 * 配送设置控制器
 */
class Setting extends Controller
{

    public $pay_type = [
        ['id' => '10', 'name' => '微信支付'],
        ['id' => '20', 'name' => '支付宝'],
        ['id' => '30', 'name' => '银行卡']
    ];

    public $pay_type1 = [
        10 => '微信支付',
        20 => '支付宝',
        30 => '银行卡'
    ];

    /**
     * 配送设置
     */
    public function index()
    {
        $pay_type = $this->pay_type;
        $data = SettingModel::getAll();
        return $this->renderSuccess('', compact('data', 'pay_type'));
    }

    /**
     * 基础信息设置
     */
    public function basic()
    {
        $param = $this->postData();
        if ($param['take_cash'] == 0 && $param['cash_open'] == 1) {
            $param['cash_open'] = '0';
        }
        $data['basic'] = $param;
        return $this->edit($data);
    }

    /**
     * 配送条件设置
     */
    public function condition()
    {
        $param = $this->postData();
        $data['condition'] = $param;
        return $this->edit($data);
    }

    /**
     * 结算设置
     */
    public function settlement()
    {
        $param = $this->postData('form');
        $data['settlement'] = [
            'min_money' => $param['min_money'],
            'settle_days' => $param['settle_days'],
            'pay_type' => $param['pay_type'],
            'wechat_type' => $param['wechat_type']
        ];
        return $this->edit($data);
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        $model = new SettingModel;
        if ($model->edit($data)) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }


}