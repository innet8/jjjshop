<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
use app\shop\model\delay\Delay as DelayModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 自助餐设置
 * @Apidoc\Group("product")
 * @Apidoc\Sort(4)
 */
class Buffet extends Controller
{
    /**
     * @Apidoc\Title("自助餐设置(get-获取/post-设置)")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/setting.Buffet/index")
     * @Apidoc\Param("is_open", type="string", require=true, desc="是否开启自助餐")
     * @Apidoc\Param("tablet_end_time", type="string", require=true, default="5", desc="平板结束时间提醒（分）")
     * @Apidoc\Param("is_buy_continue", type="string", require=true, desc="非自助餐商品到时是否能继续选购")
     * @Apidoc\Param("is_add_clock", type="string", require=true, desc="是否开启加钟")
     * @Apidoc\Param("add_clock", type="array", require=true, desc="名称 - 加钟时间（分）- 价格", children={
     *     @Apidoc\Returned("id", type="int", desc="加钟id"),
     *     @Apidoc\Returned("name", type="string", desc="名称"),
     *     @Apidoc\Returned("delay_time", type="string", desc="时间（分）"),
     *     @Apidoc\Returned("price", type="string", desc="价格"),
     *     @Apidoc\Returned("action", type="string", desc="操作结果 delete-删除 edit-编辑 add-新增"),
     * })
     * @Apidoc\Returned()
     */
    public function index()
    {
        if($this->request->isGet()){
            return $this->fetchData(SettingEnum::BUFFET);
        }
        $model = new SettingModel;
        $data = $this->request->param();
        //
        if (empty($data['tablet_end_time'])) {
            return $this->renderError('平板结束时间提醒不能为空');
        }
        if (!empty($data['is_add_clock']) && isset($data['add_clock'])) {
            if (empty($data['add_clock'])) {
                return $this->renderError('加钟设置不能为空');
            }
            $delayModel = new DelayModel;
            foreach ($data['add_clock'] as &$clock) {
                if (empty($clock['name']) || empty($clock['delay_time']) || empty($clock['price'])) {
                    return $this->renderError('加钟设置参数错误');
                }
                // 如果是新增
                if (isset($clock['action']) && $clock['action'] == 'add') {
                    $clock['app_id'] = $this->store['app']['app_id'];
                    unset($clock['action']);
                    $delayModel->save($clock);
                    continue;
                }
                // 如果是删除 - 保留数据，只是修改状态
                if (isset($clock['action']) && $clock['action'] == 'delete') {
                    if (isset($clock['id'])) {
                        $delayModel->where('id', $clock['id'])->save(['status' => 0]);
                    }
                    continue;
                }
                // 如果是编辑
                if (isset($clock['action']) && $clock['action'] == 'edit') {
                    if (isset($clock['id'])) {
                        unset($clock['action']);
                        $delayModel->update($clock, ['id' => $clock['id']]);
                    }
                    continue;
                }
            }
        }
        $arr = [
            'is_open' => $data['is_open'] ?? 0, // 是否开启自助餐
            'tablet_end_time' => $data['tablet_end_time'], // 平板结束时间提醒（分）
            'is_buy_continue' => $data['is_buy_continue'] ?? 0, // 非自助餐商品到时是否能继续选购
            'is_add_clock' => $data['is_add_clock'] ?? 0, // 是否开启加钟
            'add_clock' => [], // 名称 - 加钟时间（分）- 价格（放表，不放设置里）
        ];
        $shop_supplier_id = $this->store['user']['shop_supplier_id'];
        if ($model->edit(SettingEnum::BUFFET, $arr, $shop_supplier_id)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取配置值
     */
    public function fetchData($key)
    {
        if ($key == '') {
            return $this->renderError('缺少参数');
        }
        $ret = SettingModel::getSupplierItem($key, $this->store['user']['shop_supplier_id']);
        // 获取加钟列表
        $delay = DelayModel::getList();
        $ret['add_clock'] = $delay;
        $vars['values'] = $ret;
        return $this->renderSuccess('', compact('vars'));
    }
}
