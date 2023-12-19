<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\user\UserMp as UserMpModel;
use app\common\library\easywechat\AppMp;

/**
 * 公众号用户管理
 */
class Usermp extends Controller
{

    /**
     * 用户自动登录
     */
    public function login()
    {
        $data = $this->request->post();
        $referee_id = isset($data['referee_id']) && $data['referee_id'] > 0 ? $data['referee_id'] : 0;
        $invitation_id = isset($data['invitation_id']) && $data['invitation_id'] > 0 ? $data['invitation_id'] : 0;
        $redirect_uri = "index.php/api/user.usermp/login_callback?app_id={$this->app_id}&referee_id={$referee_id}&invitation_id={$invitation_id}";
        $app = AppMp::getApp($this->app_id, $redirect_uri);
        $oauth = $app->getOAuth();
        //生成完整的授权URL
        $redirectUrl = $oauth->scopes(['snsapi_userinfo'])->redirect();
        return redirect($redirectUrl);
    }

    /**
     * 用户自动登录
     */
    public function login_callback()
    {
        $app = AppMp::getApp($this->app_id);
        $oauth = $app->getOauth();
        // 获取 OAuth 授权用户信息
        $user = $oauth->userFromCode($this->request->param('code'));
        $userInfo = $user->toArray();
        // 保存数据库
        $model = new UserMpModel;
        $referee_id = $this->request->param('referee_id');
        $invitation_id = $this->request->param('invitation_id');
        $user_id = $model->login($userInfo, $referee_id, $invitation_id);
        return redirect(base_url() . 'h5/pages/login/mplogin?token=' . $model->getToken() . '&user_id=' . $user_id);
    }
}
