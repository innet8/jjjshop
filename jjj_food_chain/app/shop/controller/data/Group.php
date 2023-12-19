<?php

namespace app\shop\controller\data;

use app\shop\controller\Controller;
use app\shop\model\plus\group\Group as GroupModel;

/**
 * 团购控制器
 */
class Group extends Controller
{
    /**
     * 团购列表
     */
    public function index()
    {
        $model = new GroupModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

}