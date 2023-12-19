<?php

namespace app\shop\controller\plus\agent;

use app\shop\controller\Controller;
use app\shop\model\plus\agent\Apply as ApplyModel;

/**
 * 分销控制器
 */
class Apply extends Controller
{

    /**
     * 分销商申请列表
     */
    public function index()
    {
        $model = new ApplyModel;
        $apply_list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('apply_list'));
    }

    /**
     * 审核分销商
     */
    public function editApplyStatus($apply_id)
    {
        $model = ApplyModel::detail($apply_id);
        if ($model->submit($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError('修改失败');

    }


}