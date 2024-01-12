<?php


namespace app\common\model\user;

use app\api\controller\points\Log;
use app\common\model\BaseModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\user\Grade as GradeModel;
use app\common\model\user\PointsLog as PointsLogModel;

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
        return $model->where($filter)->with(['address', 'addressDefault', 'grade', 'card'])->find();
    }

    /**
     * 获取用户信息
     */
    public static function detailByUnionid($unionid)
    {
        $model = new static;
        $filter = ['is_delete' => 0];
        $filter = array_merge($filter, ['union_id' => $unionid]);
        return $model->where($filter)->with(['address', 'addressDefault', 'grade', 'card'])->find();
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
        if (empty($data['nick_name'])) {
            $this->error = '昵称不能为空';
            return false;
        }
        if (empty($data['mobile'])) {
            $this->error = '手机号不能为空';
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
}