<?php

namespace app\job\event;

use think\facade\Cache;
use app\job\model\user\Grade as GradeModel;
use app\job\model\user\User as UserModel;

/**
 * 用户等级事件管理
 */
class UserGrade
{
    /**
     * 执行函数
     */
    public function handle($userId)
    {
        // 设置用户的会员等级
        $this->setUserGrade($userId);
        return true;
    }

    /**
     * 设置用户的会员等级
     */
    private function setUserGrade($userId)
    {
        // 用户模型
        $user = UserModel::detail($userId);
        if (!$user || !isset($user['app_id'], $user['grade'], $user['grade_id'], $user['user_id'])) {
            return false;
        }
        // 获取所有等级
        $list = GradeModel::getUsable($user['app_id']);
        if ($list->isEmpty()) {
            return false;
        }
        // 遍历等级，根据升级条件 查询满足消费金额的用户列表，并且他的等级小于该等级
        $upgradeGrade = null;
        foreach ($list as $grade) {
            if ($grade['is_default'] == 1) {
                continue;
            }
            $is_upgrade = $this->checkCanUpdate($user, $grade);
            if ($is_upgrade) {
                $upgradeGrade = $grade;
                break;
            }
        }
        // 如果自定义设置会员的权重比升级的权重大，则不升级
        if ($upgradeGrade && isset($upgradeGrade['weight']) && $user['grade']['weight'] > $upgradeGrade['weight']) {
            return false;
        }
        if ($upgradeGrade &&  $user['grade_id'] != $upgradeGrade['grade_id']) {
            $this->dologs('setUserGrade', [
                'user_id' => $user['user_id'],
                'grade_id' => $upgradeGrade['grade_id'],
            ]);
            // 修改会员的等级
            (new UserModel())->upgradeGrade($user, $upgradeGrade);
        }
    }

    /**
     * 查询满足会员等级升级条件的用户列表
     */
    public function checkCanUpdate($user, $grade)
    {
        // 按积分与消费升级
        if ($grade['open_money'] == 1 && $grade['open_points'] == 1) {
            if ($user['expend_money'] >= $grade['upgrade_money'] && $user['total_points'] >= $grade['upgrade_points']) {
                return true;
            }
        }
        // 按消费升级
        if ($grade['open_money'] == 1) {
            if ($user['expend_money'] >= $grade['upgrade_money']) {
                return true;
            }
        }
        // 按积分升级
        if ($grade['open_points'] == 1) {
            if ($user['total_points'] >= $grade['upgrade_points']) {
                return true;
            }
        }
        return false;
    }

    /**
     * 记录日志
     */
    private function dologs($method, $params = [])
    {
        $value = 'UserGrade --' . $method;
        foreach ($params as $key => $val)
            $value .= ' --' . $key . ' ' . $val;
        return log_write($value, 'task');
    }
}
