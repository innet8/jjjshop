<?php


namespace app\common\model\user;

use app\common\model\BaseModel;
use app\api\controller\points\Log;
use app\common\model\user\Grade as GradeModel;
use app\common\enum\user\pointsLog\PointsLogSceneEnum;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\user\PointsLog as PointsLogModel;
use app\shop\model\user\BalanceLog as BalanceLogModel;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum as SceneEnum;

/**
 * 用户模型
 */
class User extends BaseModel
{
    protected $pk = 'user_id';
    protected $name = 'user';

    /**
     * 默认头像
     */
    public function getAvatarUrlAttr($value)
    {
        return $value ? $value : SettingModel::getItem('store', self::$app_id)['avatarUrl'];
    }

    /**
     * 生日
     */
    public function getBirthdayAttr($value)
    {
        return $value ? date('Y-m-d', $value) : '';
    }

    /**
     * 关联会员等级表
     */
    public function grade()
    {
        return $this->belongsTo('app\\common\\model\\user\\Grade', 'grade_id', 'grade_id');
    }

    /**
     * 关联会员卡表
     */
    public function card()
    {
        return $this->hasOne('app\\common\\model\\user\\Card', 'card_id', 'card_id');
    }

    /**
     * 关联收货地址表
     */
    public function address()
    {
        return $this->hasOne('app\\common\\model\\user\\UserAddress', 'address_id', 'address_id');
    }

    /**
     * 关联收货地址表 (默认地址)
     */
    public function addressDefault()
    {
        return $this->belongsTo('app\\common\\model\\user\\UserAddress', 'address_id', 'address_id');
    }

    /**
     * 获取用户信息
     */
    public static function detail($where)
    {
        $model = new static;
        $filter = ['is_delete' => 0];
        if (is_array($where)) {
            $filter = array_merge($filter, $where);
        } else {
            $filter['user_id'] = (int)$where;
        }
        //
        $info = $model->where($filter)->with(['address', 'addressDefault', 'grade', 'card'])->find();
        if ($info) {
            $info->password = '';
        }
        return $info;
    }

    /**
     * 获取用户信息
     */
    public static function cardDetail($where)
    {
        $model = new static;
        $filter = ['is_delete' => 0];
        if (is_array($where)) {
            $filter = array_merge($filter, $where);
        } else {
            $filter['user_id'] = (int)$where;
        }
        //
        $info = $model->where($filter)->with(['grade', 'card.cardRecord'])->find();
        if ($info) {
            $info->password = '';
        }
        return $info;
    }

    /**
     * 获取用户信息
     */
    public static function detailByUnionid($unionid)
    {
        $model = new static;
        $filter = ['is_delete' => 0];
        $filter = array_merge($filter, ['union_id' => $unionid]);
        //
        $info = $model->where($filter)->with(['address', 'addressDefault', 'grade', 'card'])->find();
        if ($info) {
            $info->password = '';
        }
        return $info;
    }

    /**
     * 指定会员等级下是否存在用户
     */
    public static function checkExistByGradeId($gradeId)
    {
        $model = new static;
        return !!$model->where('grade_id', '=', (int)$gradeId)
            ->where('is_delete', '=', 0)
            ->value('user_id');
    }

    /**
     * 累积用户总消费金额
     */
    public function setIncPayMoney($money)
    {
        return $this->where('user_id', '=', $this['user_id'])->inc('pay_money', $money)->update();
    }

    /**
     * 累积用户实际消费的金额 (批量)
     */
    public function onBatchIncExpendMoney($data)
    {
        foreach ($data as $userId => $expendMoney) {
            $this->where(['user_id' => $userId])->inc('expend_money', $expendMoney)->update();
            event('UserGrade', $userId);
        }
        return true;
    }

    /**
     * 累积用户实际消费的金额
     */
    public function IncExpendMoney($data)
    {
        $this->where(['user_id' => $data['user_id']])->inc('expend_money', $data['money'])->update();
        event('UserGrade', $data['user_id']);
        return true;
    }

    /**
     * 累积用户的可用积分数量 (批量)
     */
    public function onBatchIncPoints($data)
    {
        foreach ($data as $userId => $expendPoints) {
            $this->where(['user_id' => $userId])->inc('points', $expendPoints)->update();
        }
        return true;
    }

    /**
     * 累积用户的可用积分
     */
    public function setIncPoints($points, $describe)
    {
        // 新增积分变动明细
        PointsLogModel::add([
            'scene' => PointsLogSceneEnum::ADMIN,
            'user_id' => $this['user_id'],
            'value' => $points,
            'describe' => $describe,
            'app_id' => $this['app_id'],
        ]);

        // 更新用户可用积分
        $data['points'] = ($this['points'] + $points <= 0) ? 0 : $this['points'] + $points;
        // 用户总积分
        if ($points > 0) {
            $data['total_points'] = $this['total_points'] + $points;
        }
        $this->where('user_id', '=', $this['user_id'])->update($data);
        event('UserGrade', $this['user_id']);
        return true;
    }

    /**
     * 累计邀请书
     */
    public function setIncInvite($user_id)
    {
        $this->where('user_id', '=', $user_id)->inc('total_invite')->update();
        event('UserGrade', $user_id);
    }

    /**
     * 更新会员卡id
     */
    public function setCardId($cardId)
    {
        return $this->save(['card_id' => $cardId]);
    }

    /*
    * 添加会员
    */
    public function add($data)
    {
        if (!empty($data['nick_name'])) {
            if (mb_strlen($data['nick_name']) > 50) {
                $this->error = '昵称不能超过50个字符';
                return false;
            }
        }
        if (empty($data['mobile'])) {
            $this->error = '手机号不能为空';
            return false;
        }
        if (mb_strlen($data['mobile']) > 20) {
            $this->error = '手机号不能超过20个字符';
            return false;
        }
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('is_delete', '=', 0)
            ->find();

        if (!$user) {
            return $this->save([
                'mobile' => $data['mobile'],
                'reg_source' => 'cashier',
                //默认等级
                'app_id' => self::$app_id,
                'grade_id' => GradeModel::getDefaultGradeId(),
                'nickName' => $data['nick_name']
            ]);
        } else {
            $this->error = '会员已存在';
            return false;
        }
    }

    /**
     * 用户充值
     */
    public function recharge($storeUserName, $source, $data)
    {
        if ($source == 0) {
            return $this->rechargeToBalance($storeUserName, $data);
        } elseif ($source == 1) {
            return $this->rechargeToPoints($storeUserName, $data);
        }
        return false;
    }

    /**
     * 用户充值：余额
     */
    private function rechargeToBalance($storeUserName, $data)
    {
        if (!isset($data['recharge_value']) || $data['recharge_value'] === '' || $data['recharge_value'] < 0) {
            $this->error = '请输入正确的金额';
            return false;
        }
        if ($data['recharge_value'] > 100000000) {
            $this->error = '不能大于100000000';
            return false;
        }
        // 判断充值方式，计算最终金额
        $money = 0;
        if ($data['mode'] === 'inc') {
            $diffMoney = $this['balance'] + $data['recharge_value'];
            $money = $data['recharge_value'];
        } elseif ($data['mode'] === 'dec') {
            $diffMoney = $this['balance'] - $data['recharge_value'] <= 0 ? 0 : $this['balance'] - $data['recharge_value'];
            $money = -$data['recharge_value'];
        } else {
            $diffMoney = $data['recharge_value'];
            $money = $diffMoney - $this['balance'];
        }
        $maxLimit = 999999999;
        if ($diffMoney > $maxLimit) {
            $this->error = '充值后的余额不能大于' . $maxLimit;
            return false;
        }
        // 更新记录
        $this->transaction(function () use ($storeUserName, $data, $diffMoney, $money) {
            // 更新账户余额
            $this->where('user_id', '=', $this['user_id'])->update(['balance' => $diffMoney]);
            // 新增余额变动记录
            BalanceLogModel::add(SceneEnum::ADMIN, [
                'user_id' => $this['user_id'],
                'money' => $money,
                'remark' => $data['remark']??'',
            ], [$storeUserName]);
        });
        return true;
    }

    /**
     * 用户充值：积分
     */
    private function rechargeToPoints($storeUserName, $data)
    {
        if (!isset($data['recharge_value']) || $data['recharge_value'] === '' || $data['recharge_value'] < 0) {
            $this->error = '请输入正确的积分数量';
            return false;
        }
        if ($data['recharge_value'] > 100000000) {
            $this->error = '不能大于100000000';
            return false;
        }
        $points = 0;
        // 判断充值方式，计算最终积分
        if ($data['mode'] === 'inc') {
            $diffMoney = $this['points'] + $data['recharge_value'];
            $points = $data['recharge_value'];
        } elseif ($data['mode'] === 'dec') {
            $diffMoney = $this['points'] - $data['recharge_value'] <= 0 ? 0 : $this['points'] - $data['recharge_value'];
            $points = -$data['recharge_value'];
        } else {
            $diffMoney = $data['recharge_value'];
            $points = $data['recharge_value'] - $this['points'];
        }
        $maxLimit = 999999999;
        if ($diffMoney > $maxLimit) {
            $this->error = '充值后的余额不能大于' . $maxLimit;
            return false;
        }
        // 更新记录
        $this->transaction(function () use ($storeUserName, $data, $diffMoney, $points) {
            $totalPoints = $this['total_points'] + $points <= 0 ? 0 : $this['total_points'] + $points;
            // 更新账户积分
            $this->where('user_id', '=', $this['user_id'])->update([
                'points' => $diffMoney,
                'total_points' => $totalPoints
            ]);
            // 新增积分变动记录
            PointsLogModel::add([
                'scene' => PointsLogSceneEnum::ADMIN,
                'user_id' => $this['user_id'],
                'value' => $points,
                'describe' => "后台管理员 [{$storeUserName}] 操作",
                'remark' => $data['remark']??'',
            ]);
        });
        event('UserGrade', $this['user_id']);
        return true;
    }
}