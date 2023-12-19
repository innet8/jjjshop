<?php

namespace app\shop\controller\plus\invitation;

use app\shop\controller\Controller;
use app\shop\model\plus\invitationgift\InvitationGift as InvitationModel;
use app\shop\model\plus\invitationgift\Partake;
use app\common\service\qrcode\InvitationService;
use app\shop\model\plus\invitationgift\InvitationReceive;
/**
 * 邀请有礼活动控制器
 */
class Active extends Controller
{
    /*
       * 邀请列表
       */
    public function lists()
    {  
        $model = new InvitationModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加
     */
    public function add()
    {
        $model = new InvitationModel();
        if ($model->add($this->postData())) {
            return $this->renderSuccess('保存成功');
        }
        return $this->renderError('保存失败');
    }

    /**
     * 编辑
     */
    public function edit($invitation_gift_id)
    {
        if($this->request->isGet()){
            $model = new InvitationModel();
            $data = $model->getDatas($invitation_gift_id);
            return $this->renderSuccess('', compact('data'));
        }
        $model = new InvitationModel();
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('保存成功');
        }
        return $this->renderError($model->getError() ?: '保存失败');
    }

    /**
     * 操作活动
     * @param $id
     */
    public function send($id)
    {
        $model = new InvitationModel();
        if ($model->send($id)) {
            return $this->renderSuccess('保存成功');
        }
        return $this->renderError('保存失败');
    }

    /**
     * 终止
     * @param $id
     */
    public function end($id)
    {
        $model = new InvitationModel();
        if ($model->end($id)) {
            return $this->renderSuccess('保存成功');
        }
        return $this->renderError('保存失败');
    }

    /**
     * 删除
     * @param $id
     */
    public function delete($id)
    {
        $model = new InvitationModel();
        if ($model->del($id)) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

 
    /**
     * 获取推广二维码
     */
    public function qrcode($id, $source)
    {
        $Qrcode = new InvitationService($id, $source);
        $Qrcode->getImage();
    }
    /**
     * 参与记录
     */
    public function partake($id)
    {
        $model = new Partake();
        $list = $model->getList($id, $this->postData());
        return $this->renderSuccess('', compact('list'));
    }
    /**
     * 参与记录
     */
    public function receive($id)
    {
        $model = new InvitationReceive();
        $list = $model->getList($id, $this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}