<?php

namespace app\shop\controller\product\store;

use app\shop\model\product\Product as ProductModel;
use app\shop\model\product\Category as CategoryModel;
use app\shop\service\ProductService;
use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 店内商品
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Product extends Controller
{
    /**
     * @Apidoc\Title("商品列表(全部)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/index")
     * @Apidoc\Param("product_name", type="string", require=false, desc="商品名称")
     * @Apidoc\Param("category_id", type="int", default=0, require=false, desc="分类id")
     * @Apidoc\Param("type", type="string", require=false, desc="是否上架 sell-上架 lower-下架")
     * @Apidoc\Param("stock", type="int", default=0, require=false, desc="库存 0-全部 10-低于10 20-低于20 ....")
     * @Apidoc\Param("product_ids", type="string", require=false, desc="商品ids，逗号分隔")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Product\getList")
     */
    public function index()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->getList(array_merge([
            'status' => -1,
            'product_type' => 1,
            'shop_supplier_id' => $this->store['user']['shop_supplier_id']
        ], $this->postData()));
        // 商品分类
        $category = CategoryModel::getCacheTree(1, 0, $this->store);
        // 数量
        $product_count = [
            'lower' => $model->getCount('lower', $this->store['user']['shop_supplier_id'], 1),
        ];
        return $this->renderSuccess('', compact('list', 'category', 'product_count'));
    }

    /**
     * @Apidoc\Title("商品列表(在售)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/lists")
     * @Apidoc\Param("product_name", type="string", require=false, desc="商品名称")
     * @Apidoc\Param("category_id", type="int", default=0, require=false, desc="分类id")
     * @Apidoc\Param("type", type="string", require=false, desc="是否上架 sell-上架 lower-下架")
     * @Apidoc\Param("stock", type="int", default=0, require=false, desc="库存 0-全部 10-低于10 20-低于20 ....")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\product\Product\getLists")
     */
    public function lists()
    {
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->getLists($this->postData());
        // 商品分类
        $catgory = CategoryModel::getCacheTree(1, 0, $this->store);
        return $this->renderSuccess('', compact('list', 'catgory'));
    }

    /**
     * @Apidoc\Title("添加商品")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/add")
     * @Apidoc\Param("product_name", type="string", require=false, desc="商品名称")
     * @Apidoc\Param("category_id", type="int", default=0, require=false, desc="分类id")
     * @Apidoc\Param("type", type="string", require=false, desc="是否上架 sell-上架 lower-下架")
     * @Apidoc\Param("stock", type="int", default=0, require=false, desc="库存 0-全部 10-低于10 20-低于20 ....")
     * @Apidoc\Returned()
     */
    public function add($scene = 'add')
    {
        // get请求
        if ($this->request->isGet()) {
            return $this->getBaseData();
        }
        //post请求
        $data = json_decode($this->postData()['params'], true);
        $model = new ProductModel;
        $data['product_type'] = 1;
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 获取基础数据
     */
    public function getBaseData()
    {
        return $this->renderSuccess('', array_merge(ProductService::getEditData(1, $this->store), []));
    }

    /**
     * @Apidoc\Title("编辑商品")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/edit")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品id")
     * @Apidoc\Param("product_name", type="string", require=false, desc="商品名称")
     * @Apidoc\Param("category_id", type="int", default=0, require=false, desc="分类id")
     * @Apidoc\Param("type", type="string", require=false, desc="是否上架 sell-上架 lower-下架")
     * @Apidoc\Param("stock", type="int", default=0, require=false, desc="库存 0-全部 10-低于10 20-低于20 ....")
     * @Apidoc\Returned()
     */
    public function edit($product_id, $scene = 'edit')
    {
        if ($this->request->isGet()) {
            $model = ProductModel::detail($product_id);
            return $this->renderSuccess('', array_merge(ProductService::getEditData(1, $this->store), compact('model')));
        }
        // 商品详情
        $model = ProductModel::detail($product_id);
        // 更新记录
        if ($model->edit(json_decode($this->postData()['params'], true))) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("修改商品状态")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/state")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品id")
     * @Apidoc\Param("state", type="int", require=true, desc="状态 0-下架 1-上架")
     * @Apidoc\Returned()
     */
    public function state($product_id, $state)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if (!$model->setStatus($state)) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * @Apidoc\Title("删除商品")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/delete")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品id")
     * @Apidoc\Returned()
     */
    public function delete($product_id)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

    /**
     * @Apidoc\Title("同步商品到门店")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/product.store.product/transmit")
     * @Apidoc\Param("product_id", type="int", require=true, desc="商品id")
     * @Apidoc\Param("sku", type="array", require=true, desc="商品sku")
     * @Apidoc\Returned()
     */
    public function transmit()
    {
        $model = new ProductModel;
        if (!$model->transmit($this->postData())) {
            return $this->renderError($model->getError() ?: '操作失败');
        }
        return $this->renderSuccess('操作成功');
    }
}
