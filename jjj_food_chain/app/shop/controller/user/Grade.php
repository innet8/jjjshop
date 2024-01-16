<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\user\Grade as GradeModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 等级管理
 * @Apidoc\Group("user")
 * @Apidoc\Sort(5)
 */
class Grade extends Controller
{
    /**
     * @Apidoc\Title("等级列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.grade/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\user\Grade\getList", desc="列表")
     */
    public function index()
    {
        $model = new GradeModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加等级")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.grade/add")
     * @Apidoc\Param("name", type="string", require=true, default="", desc="等级名称")
     * @Apidoc\Param("weight", type="int", require=true, default="", desc="等级权重")
     * @Apidoc\Param("equity", type="int", require=true, default="", desc="等级权益")
     * @Apidoc\Param("open_money", type="int", require=true, default="", desc="累计消费满")
     * @Apidoc\Param("upgrade_money", type="float", require=true, default="", desc="累计消费满多少升级")
     * @Apidoc\Param("open_points", type="int", require=true, default="", desc="累计积分满")
     * @Apidoc\Param("upgrade_points", type="float", require=true, default="", desc="累计积分满多少升级")
     * @Apidoc\Param("open_invite", type="int", require=true, default="", desc="推荐人数满")
     * @Apidoc\Param("upgrade_invite", type="float", require=true, default="", desc="推荐人数满多少升级")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new GradeModel;
        // 新增记录
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * @Apidoc\Title("编辑等级")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.grade/edit")
     * @Apidoc\Param("grade_id", type="int", require=true, default="", desc="等级id")
     * @Apidoc\Param("name", type="string", require=true, default="", desc="等级名称")
     * @Apidoc\Param("weight", type="int", require=true, default="", desc="等级权重")
     * @Apidoc\Param("equity", type="int", require=true, default="", desc="等级权益")
     * @Apidoc\Param("open_money", type="int", require=true, default="", desc="累计消费满")
     * @Apidoc\Param("upgrade_money", type="float", require=true, default="", desc="累计消费满多少升级")
     * @Apidoc\Param("open_points", type="int", require=true, default="", desc="累计积分满")
     * @Apidoc\Param("upgrade_points", type="float", require=true, default="", desc="累计积分满多少升级")
     * @Apidoc\Param("open_invite", type="int", require=true, default="", desc="推荐人数满")
     * @Apidoc\Param("upgrade_invite", type="float", require=true, default="", desc="推荐人数满多少升级")
     * @Apidoc\Returned()
     */
    public function edit($grade_id)
    {
        $model = GradeModel::detail($grade_id);
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess();
        }
        return $this->renderError();
    }

    /**
     * @Apidoc\Title("删除等级")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/user.grade/delete")
     * @Apidoc\Param("grade_id", type="int", require=true, default="", desc="等级id")
     * @Apidoc\Returned()
     */
    public function delete($grade_id)
    {
        // 会员等级详情
        $model = GradeModel::detail($grade_id);
        if (!$model->setDelete()) {
            return $this->renderError('已存在用户，删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}