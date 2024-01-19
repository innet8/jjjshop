<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
use hg\apidoc\annotation as Apidoc;

/**
 * 各端设置
 * @Apidoc\Group("terminal_setting")
 * @Apidoc\Sort(10)
 */
class Terminal extends Controller
{
    /**
     * @Apidoc\Title("收银机设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/cashier")
     * @Apidoc\Param("carousel", type="array", require=true, desc="上传后的轮播内容url（图片 + 视频）")
     * @Apidoc\Param("is_auto_send", type="int", require=true, default=0, desc="收银结账自动送厨房 0-关闭 1-开启")
     * @Apidoc\Param("server", type="array", require=true, desc="收银机服务器连接，【ip、port】")
     * @Apidoc\Param("auto_lock_screen", type="int", require=true, default=0, desc="自动锁屏")
     * @Apidoc\Param("language", type="array", require=true, desc="常用语言")
     * @Apidoc\Param("default_language", type="string", require=true, default="", desc="默认语言")
     * @Apidoc\Returned()
     */
    public function cashier()
    {
        if($this->request->isGet()){
            return $this->fetchData(SettingEnum::CASHIER);
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if (empty($data['carousel'])) {
            return $this->renderError('轮播内容不能为空');
        }
        if (empty($data['server']['ip']) || empty($data['server']['port'])) {
            return $this->renderError('收银机服务器连接的 IP 和端口不能为空');
        }
        if (empty($data['auto_lock_screen'])) {
            return $this->renderError('自动锁屏不能为空');
        }
        if (empty($data['language'])) {
            return $this->renderError('常用语言不能为空');
        }
        if (empty($data['default_language'])) {
            return $this->renderError('默认语言不能为空');
        }

        $arr = [
            'carousel' => $data['carousel'] ?? [], // 轮播内容url
            'is_auto_send' => $data['is_auto_send'] ?? 0, // 收银结账自动送厨房
            'server' => $data['server'] ??  ['ip' => '', 'port' => ''], // 收银机服务器连接
            'auto_lock_screen' => $data['auto_lock_screen'] ?? 300, // 自动锁屏 5分钟
            'language' => $data['language'] ?? [], // 常用语言
            'default_language' => $data['default_language'] ?? 'en', // 默认语言
        ];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::CASHIER, $arr, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("收银端-设置高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/editCashierAdvancedPassword")
     * @Apidoc\Param("new_advanced_password", type="string", require=true, default="", desc="新密码")
     * @Apidoc\Param("confirm_advanced_password", type="string", require=true, default="", desc="确认密码")
     * @Apidoc\Returned()
     */
    public function editCashierAdvancedPassword()
    {
        $model = new SettingModel;
        $data = $this->request->param();
        //
        $setting = SettingModel::getItem(SettingEnum::KITCHEN);
        if (empty($data['new_advanced_password']) || empty($data['confirm_advanced_password'])) {
            return $this->renderError('请输入新密码');
        }
        if ($data['new_advanced_password'] != $data['confirm_advanced_password']) {
            return $this->renderError('两次密码不一致');
        }
        $setting['advanced_password'] = $data['new_advanced_password'];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::KITCHEN, $setting, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("收银机-设置钱箱密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/editCashierPassword")
     * @Apidoc\Param("new_cashier_password", type="string", require=true, default="", desc="新密码")
     * @Apidoc\Param("confirm_cashier_password", type="string", require=true, default="", desc="确认密码")
     * @Apidoc\Returned()
     */
    public function editCashierPassword()
    {
        $model = new SettingModel;
        $data = $this->request->param();
        //
        $setting = SettingModel::getItem(SettingEnum::CASHIER);
        if (empty($data['new_cashier_password']) || empty($data['confirm_cashier_password'])) {
            return $this->renderError('请输入新密码');
        }
        if ($data['new_cashier_password'] != $data['confirm_cashier_password']) {
            return $this->renderError('两次密码不一致');
        }
        $setting['cashier_password'] = $data['new_cashier_password'];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::CASHIER, $setting, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("平板端设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/tablet")
     * @Apidoc\Param("carousel", type="array", require=true, desc="上传后的轮播内容url（图片 + 视频）")
     * @Apidoc\Param("is_call_service", type="int", require=true, default=0, desc="呼叫服务员 0-关闭 1-开启")
     * @Apidoc\Param("is_customer_order", type="int", require=true, default=0, desc="顾客可开桌 0-关闭 1-开启")
     * @Apidoc\Param("is_show_sold_out", type="int", require=true, default=0, desc="显示售罄商品 0-关闭 1-开启")
     * @Apidoc\Param("server", type="array", require=true, desc="平板服务器连接，【ip、port】")
     * @Apidoc\Param("language", type="array", require=true, desc="常用语言")
     * @Apidoc\Param("default_language", type="string", require=true, default="", desc="默认语言")
     * @Apidoc\Returned()
     */
    public function tablet()
    {
        if($this->request->isGet()){
            return $this->fetchData(SettingEnum::TABLET);
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if (empty($data['carousel'])) {
            return $this->renderError('轮播内容不能为空');
        }
        if (empty($data['server']['ip']) || empty($data['server']['port'])) {
            return $this->renderError('平板服务器连接的 IP 和端口不能为空');
        }
        if (empty($data['language'])) {
            return $this->renderError('常用语言不能为空');
        }
        if (empty($data['default_language'])) {
            return $this->renderError('默认语言不能为空');
        }

        $arr = [
            'carousel' => $data['carousel'] ?? [], // 轮播内容url
            'is_call_service' => $data['is_call_service'] ?? 0, // 是否开启呼叫服务员
            'is_customer_order' => $data['is_customer_order'] ?? 0, // 是否开启顾客可开桌
            'is_show_sold_out' => $data['is_show_sold_out'] ?? 0, // 是否显示售罄商品
            'server' => $data['server'] ??  ['ip' => '', 'port' => ''], // 平板服务器连接
            'language' => $data['language'] ?? [], // 常用语言
            'default_language' => $data['default_language'] ?? 'en', // 默认语言
        ];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::TABLET, $arr, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("平板端-设置高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/editAdvancedPassword")
     * @Apidoc\Param("new_advanced_password", type="string", require=true, default="", desc="新密码")
     * @Apidoc\Param("confirm_advanced_password", type="string", require=true, default="", desc="确认密码")
     * @Apidoc\Returned()
     */
    public function editAdvancedPassword()
    {
        $model = new SettingModel;
        $data = $this->request->param();
        //
        $setting = SettingModel::getItem(SettingEnum::TABLET);
        if (empty($data['new_advanced_password']) || empty($data['confirm_advanced_password'])) {
            return $this->renderError('请输入新密码');
        }
        if ($data['new_advanced_password'] != $data['confirm_advanced_password']) {
            return $this->renderError('两次密码不一致');
        }
        $setting['advanced_password'] = $data['new_advanced_password'];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::TABLET, $setting, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("厨显设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/kitchen")
     * @Apidoc\Param("server", type="array", require=true, desc="厨显服务器连接")
     * @Apidoc\Param("is_wait_color", type="int", require=true, default=0, desc="是否开启等待颜色 0-关闭 1-开启")
     * @Apidoc\Param("wait_color", type="array", require=true, desc="等待颜色")
     * @Apidoc\Param("language", type="array", require=true, desc="常用语言")
     * @Apidoc\Param("default_language", type="string", require=true, default="", desc="默认语言")
     * @Apidoc\Returned()
     */
    public function kitchen()
    {
        if($this->request->isGet()){
            return $this->fetchData(SettingEnum::KITCHEN);
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if (empty($data['server']['ip']) || empty($data['server']['port'])) {
            return $this->renderError('厨显服务器连接的 IP 和端口不能为空');
        }
        if (empty($data['language'])) {
            return $this->renderError('常用语言不能为空');
        }
        if (empty($data['default_language'])) {
            return $this->renderError('默认语言不能为空');
        }

        $arr = [
            'server' => $data['server'] ??  ['ip' => '', 'port' => ''], // 厨显服务器连接
            'is_wait_color' => $data['is_wait_color'] ?? 0, // 是否开启等待颜色
            'wait_color' => $data['wait_color'] ??  [], // 等待颜色
            'language' => $data['language'] ?? [], // 常用语言
            'default_language' => $data['default_language'] ?? 'en', // 默认语言
        ];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::KITCHEN, $arr, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("厨显端-设置高级密码")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Terminal/editKitchenAdvancedPassword")
     * @Apidoc\Param("new_advanced_password", type="string", require=true, default="", desc="新密码")
     * @Apidoc\Param("confirm_advanced_password", type="string", require=true, default="", desc="确认密码")
     * @Apidoc\Returned()
     */
    public function editKitchenAdvancedPassword()
    {
        $model = new SettingModel;
        $data = $this->request->param();
        //
        $setting = SettingModel::getItem(SettingEnum::KITCHEN);
        if (empty($data['new_advanced_password']) || empty($data['confirm_advanced_password'])) {
            return $this->renderError('请输入新密码');
        }
        if ($data['new_advanced_password'] != $data['confirm_advanced_password']) {
            return $this->renderError('两次密码不一致');
        }
        $setting['advanced_password'] = $data['new_advanced_password'];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::KITCHEN, $setting, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }


    /**
     * 获取配置值
     */
    public function fetchData($key)
    {
        if ($key == '') {
            return $this->renderError('缺少参数');
        }
        $ret = SettingModel::getSupplierItem($key, $this->store['user']['shop_supplier_id']);
        // 收银机密码
        if ($key == SettingEnum::CASHIER) {
            if (!empty($ret['advanced_password'])) {
                $ret['advanced_password'] = true;
            }else{
                $ret['advanced_password'] = false;
            }
            if (!empty($ret['cashier_password'])) {
                $ret['cashier_password'] = true;
            }else{
                $ret['cashier_password'] = false;
            }
        }
        // 平板端高级设置密码
        if ($key == SettingEnum::TABLET) {
            if (!empty($ret['advanced_password'])) {
                $ret['advanced_password'] = true;
            }else{
                $ret['advanced_password'] = false;
            }
        }
        // 厨显端高级设置密码
        if ($key == SettingEnum::KITCHEN) {
            if (!empty($ret['advanced_password'])) {
                $ret['advanced_password'] = true;
            }else{
                $ret['advanced_password'] = false;
            }
        }
        $vars['values'] = $ret;
        return $this->renderSuccess('', compact('vars'));
    }
}
