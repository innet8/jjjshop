<?php

namespace app\shop\controller\plus\agent;

use app\shop\controller\Controller;
use app\shop\model\plus\agent\User as UserModel;
use app\shop\model\plus\agent\Setting as SettingModel;
use app\shop\model\plus\agent\Referee as RefereeModel;

/**
 * 分销控制器
 */
class User extends Controller
{
    /**
     * 分销商申请列表
     */
    public function index($nick_name = '')
    {
        $model = new UserModel;
        $list = $model->getList($nick_name, $this->postData());

        foreach ($list as $key => $val) {
            $list[$key]['cash_total'] = sprintf('%.2f', $val['moeny'] + $val['freeze_money'] + $val['total_money']);
        }
        $basicSetting = SettingModel::getItem('basic');
        return $this->renderSuccess('', compact('list', 'basicSetting'));
    }

    /**
     * 编辑分销商
     */
    public function edit($user_id)
    {
        $model = UserModel::detail($user_id);
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('model'));
        }
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 分销商用户列表
     */
    public function fans($user_id, $level = -1)
    {
        $model = new RefereeModel;
        $list = $model->getList($user_id, $level);
        $basicSetting = SettingModel::getItem('basic');
        return $this->renderSuccess('', compact('list', 'basicSetting'));
    }

    /**
     * 软删除分销商用户
     */
    public function delete($user_id)
    {
        $model = UserModel::detail($user_id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}