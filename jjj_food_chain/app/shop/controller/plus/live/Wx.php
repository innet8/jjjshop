<?php

namespace app\shop\controller\plus\live;

use app\common\enum\settings\SettingEnum;
use app\shop\controller\Controller;
use app\shop\model\plus\live\WxLive as WxLiveModel;
use app\shop\model\settings\Setting as SettingModel;

/**
 * 微信小程序直播控制器
 */
class Wx extends Controller
{
    /**
     *直播列表
     */
    public function index()
    {
        $model = new WxLiveModel();
        $list = $model->getList($this->postData());
        $auto_syn = SettingModel::getItem(SettingEnum::LIVE)['auto_syn'];
        return $this->renderSuccess('', compact('list', 'auto_syn'));
    }

    /**
     * 创建直播
     */
    public function add()
    {
        // 直播间详情
        $model = new WxLiveModel();
        if (!$model->createRoom($this->postData())) {
            return $this->renderError($model->getError() ?: '创建失败');
        }
        return $this->renderSuccess('创建成功');
    }

    /**
     * 编辑直播
     */
    public function edit($live_id)
    {
        $model = WxLiveModel::detail($live_id);
        if (!$model->editRoom($this->postData())) {
            return $this->renderError($model->getError() ?: '修改失败');
        }
        return $this->renderSuccess('修改成功');
    }

    /**
     * 删除直播
     */
    public function delete($live_id)
    {
        $model = WxLiveModel::detail($live_id);
        if (!$model->delRoom()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

    /**
     *直播列表同步
     */
    public function syn()
    {
        $model = new WxLiveModel();
        if ($model->syn()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 修改直播间置顶状态
     */
    public function settop($live_id)
    {
        // 直播间详情
        $model = WxLiveModel::detail($live_id);
        if (!$model->setTop($this->postData())) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * 修改自动同步
     */
    public function setSyn()
    {
        $model = new SettingModel;
        $data = $this->request->param();
        $arr = [
            'auto_syn' => $data['auto_syn'],
        ];
        if ($model->edit(SettingEnum::LIVE, $arr)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}