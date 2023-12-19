<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\order\Order as OrderModel;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\user\UserAlipay as UserAlipayModel;
use app\api\model\user\UserMp as UserMpModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\library\easywechat\AppMp;
use app\common\library\alipay\AliPay;

/**
 * app用户管理
 */
class Useralipay extends Controller
{
    /**
     * 用户自动登录
     */
    public function login($referee_id)
    {
        $alipay = new AliPay();
        $user_info = $this->request->param();
        $user_info['user_id'] = $alipay->auth($user_info);
        $model = new UserAlipayModel;
        $user_id = $model->login((array)$user_info, $referee_id);
        return $this->renderSuccess('', [
            'user_id' => $user_id,
            'token' => $model->getToken()
        ]);
    }
}
