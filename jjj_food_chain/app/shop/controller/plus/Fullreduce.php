<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\shop\FullReduce as FullReduceModel;

/**
 * 满减
 */
class Fullreduce extends Controller
{
    /**
     * 会员等级列表
     */
    public function index()
    {
        $model = new FullReduceModel;
        $user = $this->store['user'];
        $data['shop_supplier_id'] = $user['shop_supplier_id'];
        $list = $model->getList($data);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加等级
     */
    public function add()
    {
        $model = new FullReduceModel;
        // 新增记录
        if ($model->add($this->postData(),$this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 编辑会员等级
     */
    public function edit($fullreduce_id)
    {
        $model = FullReduceModel::detail($fullreduce_id);
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess();
        }
        return $this->renderError();
    }

    /**
     * 删除会员等级
     */
    public function delete($fullreduce_id)
    {
        // 会员等级详情
        $model = FullReduceModel::detail($fullreduce_id);
        if ($model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

}