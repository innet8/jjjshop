<?php

namespace app\shop\model\plus\package;

use app\common\model\plus\package\Package as PackageModel;
use app\shop\model\plus\coupon\Coupon;

/**
 * 券包模型
 */
class Package extends PackageModel
{
    /**
     * 礼包列表
     * @param $data
     */
    public function getList($data)
    {
        $model = $this;
        //检索活动名称
        if ($data['search'] != '') {
            $model = $model->where('name', 'like', '%' . trim($data['search']) . '%');
        }
        return $model->where('is_delete', '=', 0)
            ->order('create_time', 'desc')
            ->paginate($data);
    }

    /**
     * 获取未结束的数据列表
     * 单码
     */
    public function getDatas()
    {
        return $this->where('status', '=', 0)
            ->where('end_time', '>', time())
            ->select();
    }

    /**
     * 获取数据
     * @param $id
     */
    public function getPackage($id)
    {
        $data = $this->where('package_id', '=', $id)->find();
        $data = $data->toArray();
        $data['value1'][] = $data['start_time']['text'];
        $data['value1'][] = $data['end_time']['text'];
        $data['grade_ids'] = $data['grade_ids'] ? explode(',', $data['grade_ids']) : '';
        if ($data['coupon_ids']) {
            $model = new Coupon();
            $coupon = json_decode($data['coupon_ids'], true);
            foreach ($coupon as $key => &$value) {
                $couponInfo = $model->getCouponInfo($value['coupon_id']);
                $value['name'] = $couponInfo['name'];
            }
            $data['coupon_list'] = $coupon;
            $data['coupon'] = explode(',', $data['coupon_ids']);
        }
        return $data;
    }

    /**
     * 保存数据
     * @param $data
     */
    public function savePackage($data)
    {
        $this->startTrans();
        try {
            $this->buildData($data);
            $data['app_id'] = self::$app_id;
            // 保存主表
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改
     * @param $value
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            $this->buildData($data);
            // 保存
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 构造数据
     */
    private function buildData(&$data)
    {
        // 优惠券
        $data['coupon_ids'] = $data['coupon'] ? $data['coupon'] : '';
        // 等级限制
        if ($data['is_grade'] == 1) {
            $data['grade_ids'] = implode(',', $data['grade_ids']);
        } else {
            $data['grade_ids'] = '';
        }
        // 购买次数
        if ($data['is_times'] == 0) {
            $data['times'] = 0;
        }
        $data['start_time'] = strtotime(array_shift($data['value1']));
        $data['end_time'] = strtotime(array_pop($data['value1'])) + 86399;
    }


    /**
     * 发布
     */
    public function send($id)
    {
        return $this->where('package_id', '=', $id)->update(['status' => 0]);
    }

    /**
     * 终止
     */
    public function end($id)
    {
        return $this->where('package_id', '=', $id)->update(['status' => 1]);
    }

    /**
     * 删除
     * @param $id
     */
    public function del($id)
    {
        return $this->where('package_id', '=', $id)->update(['is_delete' => 1]);
    }
}