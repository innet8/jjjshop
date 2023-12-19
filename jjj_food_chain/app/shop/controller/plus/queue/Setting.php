<?php

namespace app\shop\controller\plus\queue;

use app\shop\controller\Controller;
use app\shop\model\plus\queue\QueueSetting as QueueSettingModel;
use app\shop\model\settings\Printer as PrinterModel;

/**
 * 满额包邮控制器
 */
class Setting extends Controller
{
    /**
     *满额包邮
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $detail = QueueSettingModel::detail($this->store['user']['shop_supplier_id']);
            // 获取打印机列表
            $detail['printerList'] = PrinterModel::getAll($this->store['user']['shop_supplier_id'])->toArray();
            return $this->renderSuccess('', compact('detail'));
        }
        $model = new QueueSettingModel;
        if ($model->edit($this->postData(), $this->store['user']['shop_supplier_id'])) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

}