<?php

namespace app\shop\controller\plus\agent;


use app\shop\controller\Controller;
use app\shop\model\plus\agent\Setting as SettingModel;
use app\shop\model\product\Product as ProductModel;

/**
 * 分销设置控制器
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
     * 分销设置
     */
    public function index()
    {
        $pay_type = $this->pay_type;
        $data = SettingModel::getAll();
        // 购买指定商品成为分销商：商品列表
        $product_ids = $data['condition']['values']['become__buy_product_ids'];
        $productList = [];
        if (count($product_ids) > 0) {
            $productList = (new ProductModel)->getListByIds($product_ids);
        }
        return $this->renderSuccess('', compact('data', 'productList', 'pay_type'));
    }

    /**
     * 基础信息设置
     */
    public function basic()
    {
        $param = $this->postData();
        $data['basic'] = $param;
        return $this->edit($data);
    }

    /**
     * 分销商条件设置
     */
    public function condition()
    {
        $param = $this->postData();
        $data['condition'] = $param;
        return $this->edit($data);
    }

    /**
     * 佣金设置
     */
    public function commission()
    {
        $param = $this->postData();
        $data['commission'] = $param;
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
     * 自定义文字设置
     */
    public function words()
    {
        $param = $this->postData();
        $data['words'] = $param;
        return $this->edit($data);
    }

    /**
     * 申请协议设置
     */
    public function license()
    {
        $param = $this->postData();
        $data['license'] = $param;
        return $this->edit($data);
    }

    /**
     * 页面背景设置
     */
    public function background()
    {
        $param = $this->postData();
        $data['background'] = $param;
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


    /**
     * 分销海报
     */
    public function qrcode()
    {
        if (!$this->request->post()) {
            $data = SettingModel::getItem('qrcode');
            return $this->renderSuccess('', ['data' => $data]);
        }
        $model = new SettingModel;
        if ($model->edit(['qrcode' => $this->postData('form')])) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }


}