<?php

namespace app\api\controller;

use app\api\model\page\Page as AppPage;
use app\api\model\settings\Setting as SettingModel;
use app\common\model\app\AppUpdate as AppUpdateModel;
use app\api\model\supplier\Supplier as SupplierModel;
use app\common\library\easywechat\AppMp;

/**
 * 页面控制器
 */
class Index extends Controller
{
    /**
     * 首页
     */
    public function index($url = '')
    {
        $data = $this->request->post();
        $page_id = isset($data['page_id']) && $data['page_id'] > 0 ? $data['page_id'] : 0;
        // 页面元素
        $data = AppPage::getPageData($this->getUser(false), $page_id);
        // 页面元素
        $user = $this->getUser(false);
        //获取默认门店id
        $supplier = (new SupplierModel)->getDefault($this->postData());
        $signPackage = $this->getScanParams($url)['signPackage'];
        $data['setting'] = array(
            'collection' => SettingModel::getItem('collection'),
            'officia' => SettingModel::getItem('officia'),
            'homepush' => SettingModel::getItem('homepush'),
        );
        return $this->renderSuccess('', compact('data', 'user', 'supplier', 'signPackage'));
    }

    //主题
    public function nav()
    {
        $data['theme'] = SettingModel::getItem('theme');
        return $this->renderSuccess('', $data);
    }

    /**
     * 用户注册登录设置
     */
    public function loginSetting()
    {
        $setting = SettingModel::getItem('store');
        return $this->renderSuccess('', compact('setting'));
    }

    /**
     * 获取公众号签名
     */
    public function getSign($url = '')
    {
        $signPackage = '';
        if ($url != '') {
            $app = AppMp::getApp($this->app_id);
            $utils = $app->getUtils();
            $signPackage = $utils->buildJsSdkConfig(
                url: $url,
                jsApiList: ['getLocation', 'openLocation'],
                openTagList: [],
                debug: false,
            );
        }
        return $this->renderSuccess('', compact('signPackage'));
    }

    /**
     * 首页
     */
    public function diy($page_id = null, $url = '')
    {
        // 页面元素
        $data = AppPage::getPageData($this->getUser(false), $page_id);
        // 微信公众号分享参数
        $data['share'] = $this->getShareParams($url, $data['page']['params']['share_title'], $data['page']['params']['share_title'], '/pages/diy-page/diy-page');
        return $this->renderSuccess('', $data);
    }

    //用户信息
    public function userInfo()
    {
        $user = $this->getUser(false);
        return $this->renderSuccess('', compact('user'));
    }
}
