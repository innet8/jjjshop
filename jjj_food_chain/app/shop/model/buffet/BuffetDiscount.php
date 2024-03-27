<?php

namespace app\shop\model\buffet;

use app\common\model\buffet\BuffetDiscount as BuffetDiscountModel;
use app\common\model\buffet\BuffetDiscountRel as BuffetDiscountRelModel;

/**
 * 折扣模型
 */
class BuffetDiscount extends BuffetDiscountModel
{
    /**
     * 新增折扣
     *
     * @param [type] $data
     * @return bool
     */
    public function add($data)
    {
        $this->startTrans();
        try {
            $buffet_ids = explode(',', $data['buffet_ids']);
            unset($data['buffet_ids']);
            $this->save($data);
            $discount_id = $this->getLastInsID();
            $rel_model = new BuffetDiscountRelModel();
            $rel_data = [];
            foreach ($buffet_ids as $buffet_id) {
                if (empty($buffet_id)) {
                    continue;
                }
                $rel_data[] = [
                    'buffet_id' => $buffet_id,
                    'buffet_discount_id' => $discount_id,
                    'app_id' => self::$app_id,
                ];
            }
            $rel_model->saveAll($rel_data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            return false;
        }
    }

    /**
     * 编辑折扣
     *
     * @param [type] $data
     * @return bool
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            $buffet_ids = explode(',', $data['buffet_ids']);
            unset($data['buffet_ids']);
            $this->where('id', '=', $data['id'])->save($data);
            $discount_id = $data['id'];
            $rel_model = new BuffetDiscountRelModel();
            $existing_ids = $rel_model->where('buffet_discount_id', '=', $discount_id)->column('buffet_id');
            $delete_ids = array_diff($existing_ids, $buffet_ids);
            $add_ids = array_diff($buffet_ids, $existing_ids);
            if (!empty($delete_ids)) {
                $rel_model->where('buffet_discount_id', '=', $discount_id)->whereIn('buffet_id', $delete_ids)->delete();
            }
            $rel_data = [];
            foreach ($add_ids as $buffet_id) {
                if (empty($buffet_id)) {
                    continue;
                }
                $rel_data[] = [
                    'buffet_id' => $buffet_id,
                    'buffet_discount_id' => $discount_id,
                    'app_id' => self::$app_id,
                ];
            }
            if (!empty($rel_data)) {
                $rel_model->saveAll($rel_data);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            return false;
        }
    }
}