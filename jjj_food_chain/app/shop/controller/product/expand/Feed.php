<?php

namespace app\shop\controller\product\expand;

use app\shop\controller\Controller;
use app\shop\model\product\Feed as FeedModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 加料库
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Feed extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.feed/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Feed\getList", desc="列表")
     */
    public function index()
    {
        $model = new FeedModel;
        $list = $model->getList($this->postData(), $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.feed/add")
     * @Apidoc\Param("feed_name", type="string", require=true, desc="加料名称")
     * @Apidoc\Param("price", type="float", require=true, desc="加料价格")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new FeedModel();
        if ($model->add($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.feed/edit")
     * @Apidoc\Param("feed_id", type="int", require=true, desc="加料id")
     * @Apidoc\Param("feed_name", type="string", require=true, desc="加料名称")
     * @Apidoc\Param("price", type="float", require=true, desc="加料价格")
     * @Apidoc\Param("sort", type="int", require=false, default="100", desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($feed_id)
    {
        // 详情
        $model = FeedModel::detail($feed_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url("/index.php/shop/product.expand.feed/delete")
     * @Apidoc\Param("feed_id", type="string", require=true, desc="加料id，多个逗号隔开")
     * @Apidoc\Returned()
     */
    public function delete($feed_id)
    {
        $model = new FeedModel;
        if (!$model->setDelete($feed_id)) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}
