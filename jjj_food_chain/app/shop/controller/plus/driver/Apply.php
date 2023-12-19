<?php

namespace app\shop\controller\plus\driver;

use app\shop\controller\Controller;
use app\shop\model\plus\driver\Apply as ApplyModel;
use app\shop\model\plus\driver\Refund as RefundModel;

/**
 * 配送控制器
 */
class Apply extends Controller
{

    /**
     * 配送员申请列表
     */
    public function index()
    {
        $model = new ApplyModel;
        $apply_list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('apply_list'));
    }

    /**
     * 审核配送员
     */
    public function edit($apply_id)
    {
        $model = ApplyModel::detail($apply_id);
        if ($model->submit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');

    }

    /**
     * 配送申请列表
     */
    public function refund()
    {
        $model = new RefundModel;
        $apply_list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('apply_list'));
    }

    /**
     * 审核配送员退出
     */
    public function refundStatus($refund_id)
    {
        $model = RefundModel::detail($refund_id);
        if ($model->submit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');

    }


}