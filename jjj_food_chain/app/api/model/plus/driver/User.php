<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\User as UserModel;

/**
 * 分销商用户模型
 */
class User extends UserModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'create_time',
        'update_time',
    ];

    /**
     * 资金冻结
     */
    public function freezeMoney($money)
    {
        return $this->save([
            'money' => $this['money'] - $money,
            'freeze_money' => $this['freeze_money'] + $money,
        ]);
    }

    /**
     * 累计分销商成员数量
     */
    public static function setMemberInc($agent_id, $level)
    {
        $fields = [1 => 'first_num', 2 => 'second_num', 3 => 'third_num'];
        $model = static::detail($agent_id);
        return $model->where('user_id', '=', $agent_id)->inc($fields[$level])->update();
    }

    //配送员中心数据
    public static function basedata($user)
    {
        //昨日
        $beginYesterday = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
        $endYesterday = mktime(0, 0, 0, date('m'), date('d'), date('Y')) - 1;
        //今日
        $begintoday = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        $endtoday = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        //昨日收入
        $yesIncome = Capital::whereBetween('create_time', "$beginYesterday,$endYesterday")->where('flow_type', '=', 10)->where('user_id', '=', $user['user_id'])->sum('money');
        //今日收入
        $toIncome = Capital::whereBetween('create_time', "$begintoday,$endtoday")->where('flow_type', '=', 10)->where('user_id', '=', $user['user_id'])->sum('money');
        //昨日接单量
        $yesOrder = Order::whereBetween('create_time', "$beginYesterday,$endYesterday")->where('user_id', '=', $user['user_id'])->count();
        //今日接单量
        $toOrder = Order::whereBetween('create_time', "$begintoday,$endtoday")->where('user_id', '=', $user['user_id'])->count();
        //总接单量
        $allOrder = Order::where('user_id', '=', $user['user_id'])->count();
        $data['yesIncome'] = $yesIncome ? $yesIncome : 0;
        $data['toIncome'] = $toIncome ? $toIncome : 0;
        $data['yesOrder'] = $yesOrder;
        $data['toOrder'] = $toOrder;
        $data['allOrder'] = $allOrder;
        return $data;
    }
}