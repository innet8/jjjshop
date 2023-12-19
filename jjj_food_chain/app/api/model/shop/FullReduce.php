<?php

namespace app\api\model\shop;

use app\common\library\helper;
use app\common\model\shop\FullReduce as FullReduceModel;

/**
 * 满减模型
 */
class FullReduce extends FullReduceModel
{
    /**
     * 获取列表记录
     */
    public static function getReductList($total_price, $total_num, $shop_supplier_id)
    {
        // 获取所有满减活动
        $list = (new self)->getAll($shop_supplier_id);
        $data = [];
        foreach ($list as $reduce) {
            // 满额
            if ($reduce['full_type'] == 1) {
                if ($total_price < $reduce['full_value']) {
                    continue;
                }
            } else {
                // 满件数
                if ($total_num < $reduce['full_value']) {
                    continue;
                }
            }
            $key = $reduce['fullreduce_id'];
            // 计算减的金额
            $data[$key] = [
                'fullreduce_id' => $reduce['fullreduce_id'],
                'active_name' => $reduce['active_name'],
                'full_type' => $reduce['full_type'],
            ];
            // 计算满减金额
            if ($reduce['reduce_type'] == 1) {
                //满金额
                $data[$key]['reduced_price'] = $reduce['reduce_value'];
            } else {
                // 折扣比例
                $discountRatio = helper::bcdiv($reduce['reduce_value'], 100);
                $data[$key]['reduced_price'] = max(0.01, helper::bcmul($total_price, 1 - $discountRatio));
            }
        }
        if (count($data) == 0) {
            return false;
        } else {
            // 根据折扣金额排序并返回第一个
            $reduce = array_sort($data, 'reduced_price', true);
            $reduce = current($reduce);
            return $reduce;
        }
    }

    /**
     * 列表
     */
    public function getList($shop_supplier_id)
    {
        return $this->where('is_delete', '=', '0')
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['reduce_value' => 'desc', 'create_time' => 'asc'])
            ->select();
    }

    /**
     * 列表
     */
    public function getReduce($shop_supplier_id, $total_money, $total_num)
    {
        //查询当前已满足满减活动
        $now = $this->getReductList($total_money, $total_num, $shop_supplier_id);
        //查询满足下一级活动
        $next = $this->getNextReductList($total_money, $total_num, $shop_supplier_id);
        $data['now'] = $now;
        $data['next'] = $next;
        return $data;
    }

    /**
     * 获取列表记录
     */
    public static function getNextReductList($total_price, $total_num, $shop_supplier_id)
    {
        // 获取所有满减活动
        $list = (new self)->where('is_delete', '=', '0')
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['full_value' => 'asc', 'create_time' => 'asc'])
            ->where(function ($query) use ($total_price, $total_num) {
                $query->where('full_value', '>', $total_price)->whereOr('full_value', '>', $total_num);
            })
            ->select();
        $data = [];
        foreach ($list as $reduce) {
            // 满额
            if ($reduce['full_type'] == 1) {
                if ($total_price >= $reduce['full_value']) {
                    continue;
                }
            } else {
                // 满件数
                if ($total_num >= $reduce['full_value']) {
                    continue;
                }
            }
            $key = $reduce['fullreduce_id'];
            // 计算减的金额
            $data[$key] = [
                'fullreduce_id' => $reduce['fullreduce_id'],
                'active_name' => $reduce['active_name'],
                'full_value' => $reduce['full_value'],
                'full_type' => $reduce['full_type'],
            ];
            // 计算满减金额
            if ($reduce['reduce_type'] == 1) {
                //满金额
                $data[$key]['reduced_price'] = $reduce['reduce_value'];
            } else {
                // 折扣比例
                $discountRatio = helper::bcdiv($reduce['reduce_value'], 100);
                $data[$key]['reduced_price'] = max(0.01, helper::bcmul($total_price, 1 - $discountRatio));
            }
        }
        if (count($data) == 0) {
            return false;
        } else {
            // 根据满减金额排序并返回第一个
            $reduce = array_sort($data, 'full_value', 0);
            $reduce = current($reduce);
            return $reduce;
        }
    }

}