<?php

namespace app\shop\controller\supplier;

use app\shop\controller\Controller;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\product\Label as LabelModel;
use app\shop\model\settings\Printer as PrinterModel;
use app\shop\model\supplier\Printing as PrintingModel;

/**
 * 菜品打印控制器
 */
class Printing extends Controller
{

    /**
     * 列表
     */
    public function index()
    {
        // 供应商列表
        $model = new PrintingModel;
        $list = $model->getLists($this->postData(), $this->store['user']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加
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
            return $this->renderSuccess('', '添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 编辑
     */
    public function edit($id)
    {
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
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('', '更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 删除
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
