<?php

namespace app\api\model\user;

use app\api\model\plus\agent\Referee as RefereeModel;
use think\facade\Cache;
use app\common\exception\BaseException;
use app\common\model\user\User as UserModel;

/**
 * 公众号用户模型类
 */
class UserAlipay extends UserModel
{
    private $token;

    /**
     * 隐藏字段
     */
    protected $hidden = [
        'open_id',
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 用户登录
     */
    public function login($userInfo, $referee_id = null)
    {
        // 自动注册用户
        $user_id = $this->register($userInfo, $referee_id);
        // 生成token (session3rd)
        $this->token = $this->token($userInfo['user_id']);
        // 记录缓存, 7天
        Cache::set($this->token, $user_id, 86400 * 7);
        return $user_id;
    }

    /**
     * 获取token
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * 生成用户认证的token
     */
    private function token($openid)
    {
        return md5($openid . 'token_salt');
    }

    /**
     * 自动注册用户
     */
    private function register($userInfo, $referee_id = null)
    {
        $data = [];
        //通过unionid查询用户是否存在
        $user  = self::detail(['alipay_id' => $userInfo['user_id']]);
        if($user){
            $model = $user;
        }else{
            $model = $this;
            $data['referee_id'] = $referee_id;
            $data['reg_source'] = 'alipay';
        }

        $data['alipay_id'] = $userInfo['user_id'];

        // 用户昵称
        if(!$user){
            $data['nickName'] = isset($userInfo['nickName'])?preg_replace('/[\xf0-\xf7].{3}/', '', $userInfo['nickName']):'';
        }
        $data['avatarUrl'] = isset($userInfo['avatar'])?$userInfo['avatar']:'';

        try {
            $this->startTrans();
            // 保存/更新用户记录
            if (!$model->save(array_merge($data, [
                'app_id' => self::$app_id
            ]))
            ) {
                throw new BaseException(['msg' => '用户注册失败']);
            }
            if (!$user && $referee_id > 0) {
                // 记录推荐人关系，
                RefereeModel::createRelation($model['user_id'], $referee_id);
                //更新用户邀请数量
                (new UserModel())->where('user_id', '=', $referee_id)->inc('total_invite')->update();
            }
            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            throw new BaseException(['msg' => $e->getMessage()]);
        }
        return $model['user_id'];
    }

}
