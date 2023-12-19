<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\plus\driver\Setting as DriverSetting;
use app\api\model\user\User as UserModel;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\plus\coupon\UserCoupon as UserCouponModel;
use app\common\enum\settings\GetPhoneTypeEnum;
use app\common\exception\BaseException;
use think\facade\Cache;
use app\api\model\user\CardRecord as CardRecordModel;
use app\api\model\plus\driver\Apply as DriverApplyModel;

/**
 * 个人中心主页
 */
class Index extends Controller
{
    /**
     * 获取当前用户信息
     */
    public function detail($source = 'wx', $url = '')
    {
        // 当前用户信息
        $user = $this->getUser();
        $coupon_model = new UserCouponModel();
        $coupon = count($coupon_model->getList($user['user_id'], -1, false, false));
        $cardDetail = CardRecordModel::getCardDetail($user['user_id']);
        $setting = DriverSetting::getItem('basic');
        $cash_open = $setting['cash_open'];
        if ($setting['take_cash'] <= 0) {
            $cash_open = 0;
        }
        return $this->renderSuccess('', [
            'signPackage' => $this->getScanParams($url)['signPackage'],//签名
            'coupon' => $coupon,
            'userInfo' => $user,
            'setting' => [
                'points_name' => SettingModel::getPointsName(),
            ],
            'sign' => SettingModel::getItem('sign'),
            'getPhone' => $this->isGetPhone(),
            'menus' => UserModel::getMenus($user, $source),   // 个人中心菜单列表
            'cardDetail' => $cardDetail,//会员卡信息
            'take_cash' => $setting['take_cash'],//骑手押金
            'takeStatus' => (new DriverApplyModel)->applyStatus($user),//骑手申请状态
            'cash_open' => $cash_open,
            'refundStatus' => (new DriverApplyModel)->refundStatus($user),//骑手退出申请状态
            'applyInfo' => (new DriverApplyModel)->getApplyInfo($user),//骑手申请信息
        ]);
    }

    /**
     * 当前用户设置
     */
    public function setting()
    {
        // 当前用户信息
        $user = $this->getUser();

        return $this->renderSuccess('', [
            'userInfo' => $user
        ]);
    }

    private function isGetPhone()
    {
        $user = $this->getUser();
        if ($user['mobile'] != '') {
            return false;
        }
        $settings = SettingModel::getItem('getPhone');
        if (in_array(GetPhoneTypeEnum::USER, $settings['area_type'])) {
            // 缓存时间
            $key = 'get_phone_' . $user['user_id'];
            if (!$data = Cache::get($key)) {
                $settings['send_day'] > 0 && Cache::set($key, '1', 86400 * $settings['send_day']);
                return true;
            }
        }
        return false;
    }
}