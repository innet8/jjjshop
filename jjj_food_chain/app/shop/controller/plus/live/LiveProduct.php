<?php

namespace app\shop\controller\plus\live;

use app\shop\controller\Controller;
use app\shop\model\plus\live\WxLiveProduct as WxLiveProductModel;

/**
 * 直播间商品管理
 */
class LiveProduct extends Controller
{
    /**
     *直播间商品列表
     */
    public function index()
    {
        $model = new WxLiveProductModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     *审核通过商品列表
     */
    public function liveProduct()
    {
        $model = new WxLiveProductModel();
        $list = $model->getliveProduct($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加商品
     */
    public function add()
    {
        // 直播间详情
        $model = new WxLiveProductModel();
        if (!$model->addLiveProduct($this->postData())) {
            return $this->renderError($model->getError() ?: '添加失败');
        }
        return $this->renderSuccess('添加成功');
    }

    /**
     * 推送商品
     */
    public function push($live_product_id)
    {
        $model = WxLiveProductModel::detail($live_product_id);
        if (!$model->pushProduct()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

    /**
     * 上下架商品
     */
    public function onsale($live_product_id)
    {
        $model = WxLiveProductModel::detail($live_product_id);
        if (!$model->onsaleProduct($this->postData())) {
            return $this->renderError($model->getError() ?: '操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * 删除商品
     */
    public function delete($live_product_id)
    {
        $model = WxLiveProductModel::detail($live_product_id);
        if (!$model->delProduct()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }


}