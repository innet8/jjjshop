<?php

namespace app\shop\model\user;

use app\common\model\user\Grade as GradeModel;
use app\shop\model\user\User as UserModel;

/**
 * 用户会员等级模型
 */
class Grade extends GradeModel
{

    /**
     * 获取列表记录
     */
    public function getList($data)
    {
        return $this->where('is_delete', '=', 0)
            ->order(['weight' => 'asc', 'create_time' => 'asc'])
            ->paginate($data, false, [
                'query' => request()->request()
            ]);
    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        if (!$data['weight']) {
            $this->error = "等级权重不能为空";
            return false;
        }
        if ($data['weight'] < 1 || $data['weight'] > 99) {
            $this->error = "等级权重范围1-99";
            return false;
        }
        $exist = self::where('weight', $data['weight'])->count();
        if ($exist > 0) {
            $this->error = "等级权重不能重复";
            return false;
        }
        $data['app_id'] = self::$app_id;
        $data['is_default'] = 0;
        $data['remark'] = $this->setRemark($data);
        return $this->save($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        if (!$data['weight']) {
            $this->error = "等级权重不能为空";
            return false;
        }
        if ($data['weight'] < 1 || $data['weight'] > 99) {
            $this->error = "等级权重范围1-99";
            return false;
        }
        //
        $exist = self::where('weight', $data['weight'])->where('grade_id', '<>', $data['grade_id'])->findOrEmpty();
        if (!$exist->isEmpty()) {
            $this->error = "等级权重不能重复";
            return false;
        }
        if($this['is_default'] == 0){

            $data['remark'] = $this->setRemark($data);
        }
        return $this->save($data);
    }

    private function setRemark($data){
        $remark = '';
        if($data['open_money'] == 1){
            $money = sprintf('%.2f',$data['upgrade_money']);
            $remark .= __("会员消费满") . "{$money}" . __("元可升级到此等级");
        }
        if($data['open_points'] == 1){
            if(!empty($remark)){
                $remark .= '\r\n';
            }
            $remark .= __("会员积分满") . "{$data['upgrade_points']}" . __("可升级到此等级");
        }
        if($data['open_invite'] == 1){
            if(!empty($remark)){
                $remark .= '\r\n';
            }
            $remark .= __("会员邀请人数满") . "{$data['upgrade_invite']}" . __("可升级到此等级");
        }
        return $remark;
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        // 判断该等级下是否存在会员
        if (UserModel::checkExistByGradeId($this['grade_id'])) {
            return false;
        }
        return $this->save(['is_delete' => 1]);
    }

}