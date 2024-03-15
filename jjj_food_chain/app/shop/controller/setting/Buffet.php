<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\settings\SettingEnum;
use app\shop\model\delay\Delay as DelayModel;
use app\shop\model\settings\Setting as SettingModel;
use app\shop\model\buffet\BuffetDiscount as BuffetDiscountModel;

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
     * @Apidoc\Param("is_buffet_discount", type="string", require=true, desc="是否开启自助餐折扣 0-否 1-是")
     * @Apidoc\Param("add_buffet_discount", type="array", require=true, desc="", children={
     *     @Apidoc\Returned("id", type="int", desc="自助餐折扣id"),
     *     @Apidoc\Returned("name", type="string", desc="名称"),
     *     @Apidoc\Returned("discount_type", type="string", desc="折扣类型 1-比例 2-优惠金额"),
     *     @Apidoc\Returned("discount_ratio", type="string", desc="折扣百分比"),
     *     @Apidoc\Returned("discount_price", type="string", desc="优惠金额"),
     *     @Apidoc\Returned("buffet_ids", type="string", desc="自助餐id，多个以英文逗号分隔"),
     *     @Apidoc\Returned("action", type="string", desc="操作结果 delete-删除 edit-编辑 add-新增"),
     * })
     * @Apidoc\Param("is_add_clock", type="string", require=true, desc="是否开启加钟 0-否 1-是")
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
        // 自助餐折扣
        if (!empty($data['is_buffet_discount']) && isset($data['add_buffet_discount'])) {
            if (empty($data['add_buffet_discount'])) {
                return $this->renderError('自助餐折扣设置不能为空');
            }
            foreach ($data['add_buffet_discount'] as $discount) {
                $buffetDiscountModel = new BuffetDiscountModel;
                if (empty($discount['name'])) {
                    return $this->renderError('自助餐折扣名称不能为空');
                }
                if (!in_array($discount['discount_type'], [1, 2])) {
                    return $this->renderError('自助餐折扣类型错误');
                }
                if ($discount['discount_type'] == 1 && ($discount['discount_ratio'] < 0 || $discount['discount_ratio'] > 100)) {
                    $discount['discount_price'] = 0;
                    return $this->renderError('自助餐折扣百分比错误');
                }
                if ($discount['discount_type'] == 2 && $discount['discount_price'] < 0) {
                    $discount['discount_ratio'] = 0;
                    return $this->renderError('自助餐折扣金额错误');
                }
                if (empty($discount['buffet_ids'])) {
                    return $this->renderError('自助餐id不能为空');
                }
                // 如果是新增
                if (isset($discount['action']) && $discount['action'] == 'add') {
                    $discount['app_id'] = $this->store['app']['app_id'];
                    unset($discount['action']);
                    $buffetDiscountModel->add($discount);
                    continue;
                }
                // 如果是删除 - 保留数据，只是修改状态
                if (isset($discount['action']) && $discount['action'] == 'delete') {
                    if (isset($discount['id'])) {
                        $buffetDiscountModel->where('id', $discount['id'])->save(['status' => 0]);
                    }
                    continue;
                }
                // 如果是编辑
                if (isset($discount['action']) && $discount['action'] == 'edit') {
                    if (isset($discount['id'])) {
                        unset($discount['action']);
                        $buffetDiscountModel->edit($discount);
                    }
                    continue;
                }
            }
        }
        // 加钟
        if (!empty($data['is_add_clock']) && isset($data['add_clock'])) {
            if (empty($data['add_clock'])) {
                return $this->renderError('加钟设置不能为空');
            }
            foreach ($data['add_clock'] as $clock) {
                $delayModel = new DelayModel;
                if (empty($clock['name']) || empty($clock['delay_time']) || $clock['price'] < 0) {
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
        // 获取自助餐折扣列表
        $buffetDiscount = BuffetDiscountModel::getList();
        $ret['add_buffet_discount'] = $buffetDiscount;
        // 获取加钟列表
        $delay = DelayModel::getList();
        $ret['add_clock'] = $delay;
        $vars['values'] = $ret;
        return $this->renderSuccess('', compact('vars'));
    }
}
