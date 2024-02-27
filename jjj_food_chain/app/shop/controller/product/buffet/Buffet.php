<?php

namespace app\shop\controller\product\buffet;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\shop\model\buffet\Buffet as BuffetModel;

/**
 * 自助餐
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Buffet extends Controller
{
    /**
     * @Apidoc\Title("自助餐列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/list")
     * @Apidoc\Param("name", type="string", require=false, desc="自助餐名称")
     * @Apidoc\Param("status", type="int", default=-1, require=false, desc="状态 -1-全部 0-未开启 1-已开启")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\buffet\Buffet\getShopBuffetList", children={
     *  @Apidoc\Returned("name_text", type="string", desc="自助餐名称(多语言)"),
     * })
     */
    public function list()
    {
        // 获取全部商品列表
        $model = new BuffetModel;
        $list = $model->getShopBuffetList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

     /**
     * @Apidoc\Title("自助餐详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/detail")
     * @Apidoc\Param("buffet_id", type="int", require=true, desc="自助餐id")
     * @Apidoc\Returned("detail", type="object", ref="app\shop\model\buffet\Buffet\detail" , children={
     * @Apidoc\Returned("name_text", type="string", desc="自助餐名称(多语言)"),
     * })
     */
    public function detail($buffet_id)
    {
        // 获取全部商品列表
        $detail = BuffetModel::detail($buffet_id ?? 0);
        if (!$detail) {
            return $this->renderError('数据不存在');
        }
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * @Apidoc\Title("添加自助餐")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/add")
     * @Apidoc\Param("name", type="string", require=true, desc="自助餐名称")
     * @Apidoc\Param("sort", type="int", require=true, desc="排序")
     * @Apidoc\Param("price", type="float", require=true, desc="价格")
     * @Apidoc\Param("time_limit", type="int", require=true, desc="用餐时间")
     * @Apidoc\Param("is_time_limit", type="int", require=true, desc="是否开启不限制时间 0-否 1-是")
     * @Apidoc\Param("status", type="int", require=true, desc="状态 0-未开启 1-已开启")
     * @Apidoc\Param("is_comb", type="int", require=true, desc="是否组合 0-否 1-是")
     * @Apidoc\Param("buy_limit_status", type="int", require=true, desc="是否限购 0-否 1-是")
     * @Apidoc\Param("product_ids", type="string", require=true, desc="组合产品ids，逗号分隔")
     * @Apidoc\Param("buy_limit_products", type="array", require=true, desc="限购产品", children={
     *   @Apidoc\Param("product_id", type="int", require=true, desc="商品id"),
     *   @Apidoc\Param("limit_num", type="int", require=true, desc="限购数量"),
     * })
     * @Apidoc\Returned()
     */
    public function add()
    {
        $data = $this->postData();
        $model = new BuffetModel;
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        if ($model?->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model?->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑自助餐")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/edit")
     * @Apidoc\Param("buffet_id", type="int", require=true, desc="自助餐id")
     * @Apidoc\Param("name", type="string", require=true, desc="自助餐名称")
     * @Apidoc\Param("sort", type="int", require=true, desc="排序")
     * @Apidoc\Param("price", type="float", require=true, desc="价格")
     * @Apidoc\Param("time_limit", type="int", require=true, desc="用餐时间")
     * @Apidoc\Param("is_time_limit", type="int", require=true, desc="是否开启不限制时间 0-否 1-是")
     * @Apidoc\Param("status", type="int", require=true, desc="状态 0-未开启 1-已开启")
     * @Apidoc\Param("is_comb", type="int", require=true, desc="是否组合 0-否 1-是")
     * @Apidoc\Param("buy_limit_status", type="int", require=true, desc="是否限购 0-否 1-是")
     * @Apidoc\Param("product_ids", type="string", require=true, desc="组合产品ids，逗号分隔")
     * @Apidoc\Param("buy_limit_products", type="array", require=true, desc="限购产品", children={
     *   @Apidoc\Param("product_id", type="int", require=true, desc="商品id"),
     *   @Apidoc\Param("limit_num", type="int", require=true, desc="限购数量"),
     * })
     * @Apidoc\Returned()
     */
    public function edit($buffet_id)
    {
        $model = BuffetModel::detail($buffet_id ?? 0);
        if (!$model) {
            return $this->renderError('数据不存在');
        }
        if ($model?->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model?->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("修改自助餐组合")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/comb")
     * @Apidoc\Param("buffet_id", type="int", require=true, desc="自助餐id")
     * @Apidoc\Param("is_comb", type="int", require=true, desc="'是否组合 0-否 1-是")
     * @Apidoc\Returned()
     */
    public function comb($buffet_id, $is_comb)
    {
        $model = BuffetModel::detail($buffet_id ?? 0);
        if (!$model) {
            return $this->renderError('数据不存在');
        }
        if ($model?->setComb($is_comb)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model?->getError() ?:'操作失败');
    }

    /**
     * @Apidoc\Title("修改自助餐状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/state")
     * @Apidoc\Param("buffet_id", type="int", require=true, desc="自助餐id")
     * @Apidoc\Param("state", type="int", require=true, desc="状态 0-未开启 1-已开启")
     * @Apidoc\Returned()
     */
    public function state($buffet_id, $state)
    {
        $model = BuffetModel::detail($buffet_id ?? 0);
        if (!$model) {
            return $this->renderError('数据不存在');
        }
        if ($model?->setStatus($state)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model?->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("删除自助餐")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.buffet.buffet/delete")
     * @Apidoc\Param("buffet_id", type="int", require=true, desc="自助餐id")
     * @Apidoc\Returned()
     */
    public function delete($buffet_id)
    {
        $model = BuffetModel::detail($buffet_id ?? 0);
        if (!$model) {
            return $this->renderError('数据不存在');
        }
        if ($model?->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model?->getError() ?: '删除失败');
    }
}
