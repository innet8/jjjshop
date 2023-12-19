<?php

namespace app\api\controller\plus\invitationgift;


use app\api\controller\Controller;
use app\api\model\plus\invitationgift\InvitationGift as InvitationGiftModel;

/**
 * 邀请有礼控制器
 */
class Invitation extends Controller
{
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();   // 用户信息
    }

    /**
     * 获取数据
     */
    public function getDatas($invitation_gift_id = 0, $url = '')
    {
        $model = new InvitationGiftModel();
        $data = $model->getDatas($invitation_gift_id, $this->user['user_id']);
        if (!$data) {
            return $this->renderError($model->getError() ?: '活动不存在');
        }
        // 微信公众号分享参数
        $share = $this->getShareParams($url, $data['share_title'], $data['share_desc'], '/pages/index/index', $data['share']['file_path']);
        return $this->renderSuccess('', compact('data', 'share'));
    }
}