<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
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
     *     @Apidoc\Returned("name", type="string", desc="名称"),
     *     @Apidoc\Returned("time", type="string", desc="时间（分）"),
     *     @Apidoc\Returned("value", type="string", desc="价格"),
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
        if (!empty($data['is_add_clock']) && isset($data['add_clock'])) {
            if (empty($data['add_clock'])) {
                return $this->renderError('加钟设置不能为空');
            }
            foreach ($data['add_clock'] as $clock) {
                if (empty($clock['name']) || empty($clock['time']) || empty($clock['value'])) {
                    return $this->renderError('加钟设置参数错误');
                }
            }
        }
        if (empty($data['tablet_end_time'])) {
            return $this->renderError('平板结束时间提醒不能为空');
        }

        $arr = [
            'is_open' => $data['is_open'] ?? 0, // 是否开启自助餐
            'tablet_end_time' => $data['tablet_end_time'], // 平板结束时间提醒（分）
            'is_buy_continue' => $data['is_buy_continue'] ?? 0, // 非自助餐商品到时是否能继续选购
            'is_add_clock' => $data['is_add_clock'] ?? 0, // 是否开启加钟
            'add_clock' => $data['add_clock'] ??  [], // 加钟时间（分）- 价格
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
        $vars['values'] = $ret;
        return $this->renderSuccess('', compact('vars'));
    }
}
