<?php

namespace app\api\controller\plus\group;

use app\api\model\plus\group\Group as GroupModel;
use app\api\controller\Controller;
use app\api\model\supplier\Supplier as SupplierModel;

/**
 * 团购控制器
 */
class Group extends Controller
{
    /**
     * 团购列表
     */
    public function list()
    {
        // 获取列表数据
        $model = new GroupModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 团购详情
     */
    public function detail()
    {
        // 获取列表数据
        $model = new GroupModel;
        $detail = $model->getDetail($this->postData());
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 团购门店列表
     */
    public function supplierList()
    {
        // 获取列表数据
        $model = new GroupModel;
        $list = $model->supplierList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}