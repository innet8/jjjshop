<?php

namespace app\api\model\user;

use app\api\model\plus\agent\Referee as RefereeModel;
use app\api\model\settings\Setting as SettingModel;
use think\facade\Cache;
use app\common\exception\BaseException;
use app\common\model\user\User as UserModel;
use app\common\model\user\Sms as SmsModel;
use app\common\model\user\Grade as GradeModel;
use app\api\model\plus\invitationgift\Partake;

/**
 * 公众号用户模型类
 */
class UserOpen extends UserModel
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
    public function login($userInfo, $referee_id, $invitation_id = 0)
    {
        // 自动注册用户
        $user_id = $this->register($userInfo, $referee_id, $invitation_id);
        // 生成token (session3rd)
        $this->token = $this->token($userInfo['openid']);
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
        $app_id = self::$app_id;
        // 生成一个不会重复的随机字符串
        $guid = \getGuidV4();
        // 当前时间戳 (精确到毫秒)
        $timeStamp = microtime(true);
        // 自定义一个盐
        $salt = 'token_salt';
        return md5("{$app_id}_{$timeStamp}_{$openid}_{$guid}_{$salt}");
    }

    /**
     * 自动注册用户
     */
    private function register($userInfo, $referee_id, $invitation_id = 0)
    {
        $data = [];
        //通过unionid查询用户是否存在
        $user = null;
        if (isset($userInfo['unionid']) && !empty($userInfo['unionid'])) {
            $data['union_id'] = $userInfo['unionid'];
            $user = self::detailByUnionid($userInfo['unionid']);
        }
        // 查询用户是否已存在
        if (!$user) {
            $user = self::detail(['appopen_id' => $userInfo['openid']]);
        }
        if ($user) {
            $model = $user;
        } else {
            $model = $this;
            $data['referee_id'] = $referee_id;
        }

        $data['appopen_id'] = $userInfo['openid'];

        // 用户昵称
        if (!$user) {
            $data['nickName'] = preg_replace('/[\xf0-\xf7].{3}/', '', $userInfo['nickname']);
        }
        $data['avatarUrl'] = $userInfo['headimgurl'];
        $data['gender'] = $userInfo['sex'];
        $data['province'] = $userInfo['province'];
        $data['country'] = $userInfo['country'];
        $data['city'] = $userInfo['city'];
        $data['reg_source'] = 'app';

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
                //邀请好友送好礼
                $invitation_id > 0 && (new Partake())->addPartake($invitation_id, $referee_id, $model['user_id']);
            }
            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            throw new BaseException(['msg' => $e->getMessage()]);
        }
        return $model['user_id'];
    }

    /**
     * 手机号密码用户登录
     */
    public function phoneLogin($data)
    {
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('password', '=', md5($data['password']))
            ->where('reg_source', '=', 'h5')
            ->where('is_delete', '=', 0)
            ->order('user_id desc')
            ->find();
        if (!$user) {
            $this->error = '手机号或密码错误';
            return false;
        } else {
            $user_id = $user['user_id'];
            $mobile = $user['mobile'];
        }
        // 生成token (session3rd)
        $this->token = $this->token($mobile);
        // 记录缓存, 30天
        Cache::tag('cache')->set($this->token, $user_id, 86400 * 7);
        return $user_id;
    }

    /**
     * 手机号密码用户登录
     */
    public function smslogin($data)
    {
        if (!$this->check($data)) {
            return false;
        }
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('reg_source', '=', 'h5')
            ->where('is_delete', '=', 0)
            ->order('user_id desc')
            ->find();
        if (!$user) {
            $this->error = '手机号不存在';
            return false;
        } else {
            $user_id = $user['user_id'];
            $mobile = $user['mobile'];
        }
        // 生成token (session3rd)
        $this->token = $this->token($mobile);
        // 记录缓存, 30天
        Cache::tag('cache')->set($this->token, $user_id, 86400 * 7);
        return $user_id;
    }

    /*
    *重置密码
    */
    public function resetpassword($data)
    {
        if (!$this->check($data)) {
            return false;
        }
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('reg_source', '=', 'h5')
            ->where('is_delete', '=', 0)
            ->order('user_id desc')->find();
        if ($user) {
            return $this->where('mobile', '=', $data['mobile'])->update([
                'password' => md5($data['password'])
            ]);
        } else {
            $this->error = '手机号不存在';
            return false;
        }

    }

    /*
    *手机号注册
    */
    public function phoneRegister($data)
    {
        $setting = SettingModel::getItem('store');
        if ($setting['sms_open']) {
            if (!$this->check($data)) {
                return false;
            }
        }
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('is_delete', '=', 0)
            ->where('reg_source', '=', 'h5')
            ->find();
        if (!$user) {
            return $this->save([
                'mobile' => $data['mobile'],
                'reg_source' => 'h5',
                //默认等级
                'grade_id' => GradeModel::getDefaultGradeId(),
                'app_id' => self::$app_id,
                'password' => md5($data['password'])
            ]);
        } else {
            $this->error = '手机号已存在';
            return false;
        }

    }

    /**
     * 验证
     */
    private function check($data)
    {
        //判断验证码是否过期、是否正确
        $sms_model = new SmsModel();
        $sms_record_list = $sms_model
            ->where('mobile', '=', $data['mobile'])
            ->order(['create_time' => 'desc'])
            ->limit(1)->select();

        if (count($sms_record_list) == 0) {
            $this->error = '未查到短信发送记录';
            return false;
        }
        $sms_model = $sms_record_list[0];
        if ((time() - strtotime($sms_model['create_time'])) / 60 > 30) {
            $this->error = '短信验证码超时';
            return false;
        }
        if ($sms_model['code'] != $data['code']) {
            $this->error = '验证码不正确';
            return false;
        }
        return true;
    }
}
