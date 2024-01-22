<?php

namespace app\shop\controller\supplier;

use app\shop\controller\Controller;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\product\Label as LabelModel;
use app\shop\model\settings\Printer as PrinterModel;
use app\shop\model\supplier\Printing as PrintingModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 商品打印
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Printing extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/supplier.Printing/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\supplier\Printing\getList", desc="列表")
     */
    public function index()
    {
        // 供应商列表
        $model = new PrintingModel;
        $list = $model->getLists($this->postData(), $this->store['user']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("添加(get-获取信息/post-添加）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/supplier.Printing/add")
     * @Apidoc\Param("name", type="string", require=true, default="", desc="名称")
     * @Apidoc\Param("printer_id", type="int", require=true, default=0, desc="打印机id")
     * @Apidoc\Param("is_open", type="int", require=true, default=0, desc="是否开启 0-关闭 1-开启")
     * @Apidoc\Param("product_type", type="int", require=true, default=0, desc="用餐类型 0-外卖 1-店内")
     * @Apidoc\Param("print_type", type="int", require=true, default=0, desc="打印模式 10-付款打印 20-下单打印")
     * @Apidoc\Param("category_id", type="array", require=true, default="", desc="商品分组，菜品id")
     * @Apidoc\Param("type", type="int", require=true, default=0, desc="打印类型 10-小票打印 20-标签打印")
     * @Apidoc\Param("print_method", type="int", require=true, default=0, desc="打印方式 10-整单打印 20-商品分组打印 30-按标签打印")
     * @Apidoc\Returned("printerList", type="array", ref="app\shop\model\settings\Printer\getNoteAll", desc="打印机列表")
     * @Apidoc\Returned("printerTagList", type="array", ref="app\shop\model\settings\Printer\getTagAll", desc="标签打印机列表")
     * @Apidoc\Returned("storeList", type="array", ref="app\shop\model\product\Category\getAllCategory", desc="店内商品分类")
     * @Apidoc\Returned("takeList", type="array", ref="app\shop\model\product\Category\getAllCategory", desc="外卖商品分类")
     * @Apidoc\Returned("labelList", type="array", ref="app\shop\model\product\Label\getAllList", desc="打印标签")
     */
    public function add()
    {
        $model = new PrintingModel;
        if ($this->request->isGet()) {
            // 获取打印机列表
            $printerList = PrinterModel::getNoteAll($this->store['user']['shop_supplier_id']);
            // 获取标签打印机列表
            $printerTagList = PrinterModel::getTagAll($this->store['user']['shop_supplier_id']);
            //店内商品分类
            $storeList = (new CategoryModel)->getAllCategory(1, $this->store['user']['shop_supplier_id']);
            //外卖商品分类
            $takeList = (new CategoryModel)->getAllCategory(0, $this->store['user']['shop_supplier_id']);
            //打印标签
            $labelList = (new LabelModel)->getAllList($this->store['user']['shop_supplier_id']);
            return $this->renderSuccess('', compact('printerList', 'printerTagList', 'storeList', 'takeList', 'labelList'));
        }
        // 新增记录
        if ($model->add($this->postData(), $this->store['user'])) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("编辑(get-获取信息/post-添加）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/supplier.Printing/edit")
     * @Apidoc\Param("id", type="int", require=true, default=0, desc="id")
     * @Apidoc\Param("name", type="string", require=true, default="", desc="名称")
     * @Apidoc\Param("printer_id", type="int", require=true, default=0, desc="打印机id")
     * @Apidoc\Param("is_open", type="int", require=true, default=0, desc="是否开启 0-关闭 1-开启")
     * @Apidoc\Param("product_type", type="int", require=true, default=0, desc="用餐类型 0-外卖 1-店内")
     * @Apidoc\Param("print_type", type="int", require=true, default=0, desc="打印模式 10-付款打印 20-下单打印")
     * @Apidoc\Param("category_id", type="array", require=true, default="", desc="商品分组，菜品id")
     * @Apidoc\Param("type", type="int", require=true, default=0, desc="打印类型 10-小票打印 20-标签打印")
     * @Apidoc\Param("print_method", type="int", require=true, default=0, desc="打印方式 10-整单打印 20-商品分组打印 30-按标签打印")
     * @Apidoc\Returned("printerList", type="array", ref="app\shop\model\settings\Printer\getNoteAll", desc="打印机列表")
     * @Apidoc\Returned("printerTagList", type="array", ref="app\shop\model\settings\Printer\getTagAll", desc="标签打印机列表")
     * @Apidoc\Returned("storeList", type="array", ref="app\shop\model\product\Category\getAllCategory", desc="店内商品分类")
     * @Apidoc\Returned("takeList", type="array", ref="app\shop\model\product\Category\getAllCategory", desc="外卖商品分类")
     * @Apidoc\Returned("labelList", type="array", ref="app\shop\model\product\Label\getAllList", desc="打印标签")
     */
    public function edit($id)
    {
        $param = $this->postData();
        $model = PrintingModel::detail($id);
        if ($this->request->isGet()) {
            // 获取打印机列表
            $printerList = PrinterModel::getNoteAll($this->store['user']['shop_supplier_id']);
            // 获取标签打印机列表
            $printerTagList = PrinterModel::getTagAll($this->store['user']['shop_supplier_id']);
            //店内商品分类
            $storeList = (new CategoryModel)->getAllCategory(1, $this->store['user']['shop_supplier_id']);
            //外卖商品分类
            $takeList = (new CategoryModel)->getAllCategory(0, $this->store['user']['shop_supplier_id']);
            //打印标签
            $labelList = (new LabelModel)->getAllList($this->store['user']['shop_supplier_id']);
            return $this->renderSuccess('', compact('model', 'printerList', 'printerTagList', 'storeList', 'takeList', 'labelList'));
        }
        // 
        if (strlen($param['name'] ?? '') > 50) {
            return $this->renderError('名称限制输入50字符');
        }
        // 
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/supplier.Printing/delete")
     * @Apidoc\Param("id", type="int", require=true, default=0, desc="id")
     * @Apidoc\Returned()
     */
    public function delete($id)
    {
        // 详情
        $model = PrintingModel::detail($id);
        if (!$model->setDelete()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess($model->getError() ?: '删除成功');
    }
}
