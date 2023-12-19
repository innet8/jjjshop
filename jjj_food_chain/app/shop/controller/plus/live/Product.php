<?php

namespace app\shop\controller\plus\live;

use app\shop\controller\Controller;
use app\shop\model\plus\live\WxProduct as WxProductModel;
use app\shop\model\plus\live\WxLiveProduct as WxLiveProductModel;

/**
 * 直播商品管理
 */
class Product extends Controller
{
    /**
     *直播商品列表
     */
    public function index()
    {
        $model = new WxProductModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     *审核通过商品列表
     */
    public function list($room_id)
    {
        $model = new WxProductModel();
        $list = $model->getOnList($this->postData());
        $excludeIds = (new WxLiveProductModel)->getExcludeIds($room_id);
        return $this->renderSuccess('', compact('list', 'excludeIds'));
    }

    /**
     *审核通过商品列表
     */
    public function liveProduct()
    {
        $model = new WxProductModel();
        $list = $model->getliveProduct($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加商品
     */
    public function add()
    {
        // 直播间详情
        $model = new WxProductModel();
        if (!$model->addProduct($this->postData())) {
            return $this->renderError($model->getError() ?: '添加失败');
        }
        return $this->renderSuccess('添加成功');
    }

    /**
     * 编辑商品
     */
    public function edit($wx_product_id)
    {
        $model = WxProductModel::detail($wx_product_id);
        if (!$model->editProduct($this->postData())) {
            return $this->renderError($model->getError() ?: '修改失败');
        }
        return $this->renderSuccess('修改成功');
    }

    /**
     * 删除商品
     */
    public function delete($wx_product_id)
    {
        $model = WxProductModel::detail($wx_product_id);
        if (!$model->delProduct()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }


}