<?php

namespace app\api\model\user;

use think\facade\Cache;
use app\common\exception\BaseException;
use app\common\model\user\User as UserModel;
use app\common\library\easywechat\AppWx;
use app\common\model\user\Grade as GradeModel;
use app\common\library\wechat\WxBizDataCrypt;
use app\common\model\page\CenterMenu as CenterMenuModel;
use app\api\model\plus\invitationgift\Partake;
use app\api\model\plus\driver\User as DriverUserModel;
use app\api\model\plus\driver\Apply as DriverApplyModel;
use app\api\model\plus\agent\Referee as RefereeModel;
use app\api\model\supplier\Supplier as SupplierModel;

/**
 * 用户模型类
 */
class User extends UserModel
{
    private $token;

    /**
     * 隐藏字段
     */
    protected $hidden = [
        'open_id',
        'is_delete',
        'create_time',
        'update_time'
    ];

    /**
     * 获取用户信息
     */
    public static function getUser($token)
    {
        $userId = Cache::get($token);
        return self::where(['user_id' => $userId])->with(['address', 'addressDefault', 'grade'])->find();
    }

    /**
     * 用户登录
     */
    public function login($post)
    {
        // 微信登录 获取session_key
        $app = AppWx::getApp();
        $utils = $app->getUtils();
        $session = $utils->codeToSession($post['code']);
        $userInfo = json_decode(htmlspecialchars_decode($post['user_info']), true);
        // 自动注册用户
        $refereeId = isset($post['referee_id']) && $post['referee_id'] > 0 ? $post['referee_id'] : 0;
        //邀请好友
        $invitation_id = isset($post['invitation_id']) && $post['invitation_id'] > 0 ? $post['invitation_id'] : 0;
        $reg_source = $post['source'];
        $user_id = $this->register($session['openid'], $userInfo, $session, $reg_source, $refereeId, $invitation_id);
        // 生成token (session3rd)
        $this->token = $this->token($session['openid']);
        // 记录缓存, 7天
        Cache::tag('cache')->set($this->token, $user_id, 86400 * 7);
        return $user_id;
    }

    /**
     * 用户登录
     */
    public function bindMobile($post)
    {
        try {
            // 微信登录 获取session_key
            $app = AppWx::getApp();
            $iv = $post['iv'];
            $encrypted_data = $post['encrypted_data'];
            $utils = $app->getUtils();
            $result = $utils->decryptSession($post['session_key'], $iv, $encrypted_data);
            if (isset($result['phoneNumber']) && $result['phoneNumber']) {
                $this->save([
                    'mobile' => $result['phoneNumber']
                ]);
                return $result['phoneNumber'];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            $this->error = '获取手机号失败，请重试';
            return false;
        }
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
    private function register($open_id, $data, $decryptedData, $reg_source, $refereeId, $invitation_id)
    {
        //通过unionid查询用户是否存在
        $user = null;
        if (isset($decryptedData['unionid']) && !empty($decryptedData['unionid'])) {
            $data['union_id'] = $decryptedData['unionid'];
            $user = self::detailByUnionid($decryptedData['unionid']);
        }
        if (!$user) {
            // 通过open_id查询用户是否已存在
            $user = self::detail(['open_id' => $open_id]);
        }
        if ($user) {
            $model = $user;
            unset($data['nickName']);
            unset($data['avatarUrl']);
        } else {
            $model = $this;
            $data['referee_id'] = $refereeId;
            $data['reg_source'] = 'wx';
            //默认等级
            $data['grade_id'] = GradeModel::getDefaultGradeId();
        }
        $this->startTrans();
        try {
            // 保存/更新用户记录
            if (!$model->save(array_merge($data, [
                'open_id' => $open_id,
                'app_id' => self::$app_id
            ]))
            ) {
                throw new BaseException(['msg' => '用户注册失败']);
            }
            if (!$user && $refereeId > 0) {
                // 记录推荐人关系
                RefereeModel::createRelation($model['user_id'], $refereeId);
                //更新用户邀请数量
                (new UserModel())->setIncInvite($refereeId);
                //邀请好友送好礼
                $invitation_id > 0 && (new Partake())->addPartake($invitation_id, $refereeId, $model['user_id']);
            }
            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            throw new BaseException(['msg' => $e->getMessage()]);
        }
        return $model['user_id'];
    }

    /**
     * 签到更新用户积分
     */
    public function setPoints($user_id, $days, $sign_conf, $sign_date)
    {
        $rank = $sign_conf['ever_sign'];
        if ($sign_conf['is_increase'] == 'true') {
            if ($days >= $sign_conf['no_increase']) {
                $days = $sign_conf['no_increase'] - 1;
            }
            $rank = ($days - 1) * $sign_conf['increase_reward'] + $rank;
        }
        //是否奖励
        if (isset($sign_conf['reward_data'])) {
            $arr = array_column($sign_conf['reward_data'], 'day');
            if (in_array($days, $arr)) {
                $key = array_search($days, $arr);
                if ($sign_conf['reward_data'][$key]['is_point'] == 'true') {
                    $rank = $sign_conf['reward_data'][$key]['point'] + $rank;
                }
            }
        }
        // 新增积分变动明细
        $this->setIncPoints($rank, '用户签到：签到日期' . $sign_date);
        return $rank;
    }

    //修改个人资料
    public function updateInfo($data)
    {
        if (isset($data['birthday']) && $data['birthday']) {
            $data['birthday'] = strtotime($data['birthday']);
        } else {
            unset($data['birthday']);
        }
        return $this->allowField(['avatarUrl', 'nickName', 'birthday', 'gender'])->save($data);
    }

    /**
     * 个人中心菜单列表
     */
    public static function getMenus($user, $source)
    {
        //配送员申请状态
        $takeStatus = (new DriverApplyModel)->applyStatus($user);
        //判断是否绑定门店
        $supplierCount = (new SupplierModel)->isBind($user);
        // 查询用户菜单
        $model = new CenterMenuModel();
        $user_menus = $model->getAll();
        foreach ($user_menus as $key => &$menus) {
            if ($menus['sys_tag'] == 'driver' && ($takeStatus == 0 || $takeStatus == 3)) {
                $menus['link_url'] = "/pages/order/rider-apply";
            }
            if ($menus['sys_tag'] == 'driver' && $takeStatus == 1) {
                $menus['link_url'] = "/pages/plus/rider/inreview";
            }
            if (strpos($menus['image_url'], 'http') !== 0) {
                $menus['image_url'] = base_url() . $menus['image_url'];
            }
            if ($menus['sys_tag'] == 'receipt' && $supplierCount <= 0) {
                unset($user_menus[$key]);
            }
        }
        return $user_menus;
    }

    /**
     * 资金冻结
     */
    public function freezeMoney($money)
    {
        return $this->save([
            'balance' => $this['balance'] - $money,
            'freeze_money' => $this['freeze_money'] + $money,
        ]);
    }

}
