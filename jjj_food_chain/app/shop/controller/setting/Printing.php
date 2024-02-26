<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\settings\SettingEnum;
use app\shop\model\settings\Printer as PrinterModel;
use app\shop\model\settings\Setting as SettingModel;

/**
 * 打印设置
 * @Apidoc\Group("supplier")
 * @Apidoc\Sort(6)
 */
class Printing extends Controller
{
    /**
     * @Apidoc\Title("打印设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Printing/index")
     * @Apidoc\Param("room_open", type="int", require=true, default="", desc="是否开启打印 0-关闭 1-开启")
     * @Apidoc\Param("room_printer_id", type="int", require=true, default="", desc="打印机id")
     * @Apidoc\Param("buyer_open", type="int", require=true, default="", desc="顾客是否开启打印 0-关闭 1-开启")
     * @Apidoc\Param("buyer_printer_id", type="int", require=true, default="", desc="顾客打印机id")
     * @Apidoc\Param("seller_open", type="int", require=true, default="", desc="商家是否开启打印 0-关闭 1-开启")
     * @Apidoc\Param("seller_printer_id", type="int", require=true, default="", desc="商家打印机id")
     * @Apidoc\Param("default_language", type="int", require=true, default="", desc="默认语言")
     * @Apidoc\Returned()
     */
    public function index()
    {
        if ($this->request->isGet()) {
            return $this->fetchData();
        }

        $postData = $this->postData();
        $printerSettings = SettingModel::getSupplierItem(SettingEnum::PRINTER, $this->store['user']['shop_supplier_id']);
        // 收银机设置
        if (isset($postData['cashier_open']) && isset($postData['cashier_printer_id'])) {
            $printerSettings['cashier_open'] = $postData['cashier_open'];
            $printerSettings['cashier_printer_id'] = $postData['cashier_printer_id'];
        }
        // 语言
        if (isset($postData['default_language'])) {
            $printerSettings['default_language'] = $postData['default_language'];
        }
        if (isset($printerSettings['language_list'])) {
            unset($printerSettings['language_list']);
        }
        $model = new SettingModel;
        if ($model->edit(SettingEnum::PRINTER, $printerSettings, $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取打印配置
     */
    public function fetchData()
    {
        // 获取打印机列表
        $vars['printerList'] = PrinterModel::getAll($this->store['user']['shop_supplier_id']);
        $vars['values'] = SettingModel::getSupplierItem(SettingEnum::PRINTER, $this->store['user']['shop_supplier_id']);
        return $this->renderSuccess('', compact('vars'));
    }
}
