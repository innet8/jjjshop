<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\Printer as PrinterModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 打印机管理
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Printer extends Controller
{
    /**
     * @Apidoc\Title("列表")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printer/index")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("list", type="array", ref="app\shop\model\settings\Printer\getList", desc="打印机列表")
     */
    public function index()
    {
        $model = new PrinterModel;
        $list = $model->getList($this->postData(),$this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 打印机类型
     */
    public function type()
    {
        $model = new PrinterModel;
        $printerType = $model::getPrinterTypeList();
        return $this->renderSuccess('', compact('printerType'));
    }

    /**
     * @Apidoc\Title("添加（get-获取类型/post-添加）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printer/add")
     * @Apidoc\Param("printer_name", type="string", require=true, default="", desc="打印机名称")
     * @Apidoc\Param("printer_type", type="string", require=true, default="", desc="打印机类型")
     * @Apidoc\Param("printer_config", type="string", require=true, default="", desc="打印机配，json格式")
     * @Apidoc\Param("print_times", type="int", require=true, default=0, desc="打印联数")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function add()
    {
        if($this->request->isGet()){
            return  $this->type();
        }
        // 新增记录
        $model = new PrinterModel;
        $data = $this->postData();
        //
        if (empty($data['printer_name'])) {
            return $this->renderError('请输入打印机名称');
        }
        if (mb_strlen($data['printer_name'] ?? '') > 50) {
            return $this->renderError('名称限制输入50字符');
        }
        if (empty($data['printer_type'])) {
            return $this->renderError('请选择打印机类型');
        }
        $data['shop_supplier_id'] = $this->store['user']['shop_supplier_id'];
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * @Apidoc\Title("打印机详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printer/detail")
     * @Apidoc\Param("printer_id", type="int", require=true, default=0, desc="打印机id")
     * @Apidoc\Returned("detail", type="array", ref="app\shop\model\settings\Printer\detail", desc="打印机详情")
     * @Apidoc\Returned("printerType", type="array", ref="app\shop\model\settings\Printer\getPrinterTypeList", desc="打印机类型")
     */
    public function detail($printer_id)
    {
        $detail = PrinterModel::detail($printer_id);
        $detail['printer_config'] = json_decode($detail['printer_config'], true);
        $printerType = $detail::getPrinterTypeList();
        return $this->renderSuccess('', compact('detail', 'printerType'));
    }

    /**
     * @Apidoc\Title("编辑（get-获取类型/post-编辑）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printer/edit")
     * @Apidoc\Param("printer_id", type="int", require=true, default=0, desc="打印机id")
     * @Apidoc\Param("printer_name", type="string", require=true, default="", desc="打印机名称")
     * @Apidoc\Param("printer_type", type="string", require=true, default="", desc="打印机类型")
     * @Apidoc\Param("printer_config", type="string", require=true, default="", desc="打印机配，json格式")
     * @Apidoc\Param("print_times", type="int", require=true, default=0, desc="打印联数")
     * @Apidoc\Param("sort", type="int", require=true, default=0, desc="排序")
     * @Apidoc\Returned()
     */
    public function edit($printer_id)
    {
        if($this->request->isGet()){
            return $this->detail($printer_id);
        }
        $model = PrinterModel::detail($printer_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * @Apidoc\Title("删除记录")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printer/delete")
     * @Apidoc\Param("printer_id", type="int", require=true, default=0, desc="打印机id")
     * @Apidoc\Returned()
     */
    public function delete($printer_id)
    {
        $model = PrinterModel::detail($printer_id);
        if ($model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?:'删除失败');
    }
}
