<?php

namespace app\api\controller\plus\points;

use app\api\model\plus\points\Category as CategoryModel;
use app\api\controller\Controller;

/**
 * 商品分类控制器
 */
class Category extends Controller
{
    /**
     * 分类页面
     */
    public function index()
    {
        //分类
        $list = CategoryModel::getAll();
        return $this->renderSuccess('', compact('list'));
    }

}