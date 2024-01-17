<?php

namespace app\common\model\plus\cashier;

use think\Model;
use think\facade\Cache;
use app\common\model\BaseModel;
use app\common\enum\settings\SettingEnum;
use app\common\enum\settings\OperateTypeEnum;
use app\common\enum\settings\DeliveryTypeEnum;

/**
 * 系统设置模型
 */
class Setting extends BaseModel
{
    protected $name = 'cashier_setting';

    /**
     * 获取器: 转义数组格式
     */
    public function getValuesAttr($value)
    {
        return json_decode($value, true);
    }

    /**
     * 修改器: 转义成json格式
     */
    public function setValuesAttr($value)
    {
        return json_encode($value);
    }

    /**
     * 获取指定项设置
     */
    public static function getItem($key, $app_id = null)
    {
        $data = self::getAll($app_id);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }
        return $data_key;
    }


    /**
     * 获取指定项设置
     */
    public static function getSupplierItem($key, $shop_supplier_id, $app_id = null)
    {
        $data = self::getAll($app_id, $shop_supplier_id);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }

        return $data_key;
    }

    /**
     * 获取设置项信息
     */
    public static function detail($key, $shop_supplier_id = 0)
    {
        $where = [];
        if ($shop_supplier_id) {
            $where['shop_supplier_id'] = $shop_supplier_id;
        }

        return self::where('key', '=', $key)->where($where)->find();
    }

    /**
     * 全局缓存: 系统设置
     */
    public static function getAll($app_id = null, $shop_supplier_id = 0)
    {
        $static = new static;
        is_null($app_id) && $app_id = $static::$app_id;
        if (!$data = Cache::get('setting_cashier' . $app_id . '_' . $shop_supplier_id)) {
            $setting = $static->where(compact('app_id'))->where('shop_supplier_id', $shop_supplier_id)->select();
            $data = empty($setting) ? [] : array_column($static->collection($setting)->toArray(), null, 'key');
            Cache::tag('cache')->set('setting_cashier' . $app_id . '_' . $shop_supplier_id, $data);
        }
        return $static->getMergeData($data);
    }

    /**
     * 数组转换为数据集对象
     */
    public function collection($resultSet)
    {
        $item = current(get_mangled_object_vars($resultSet));
        if ($item instanceof Model) {
            return \think\model\Collection::make($resultSet);
        } else {
            return \think\Collection::make($resultSet);
        }
    }


    /**
     * 合并用户设置与默认数据
     */
    private function getMergeData($userData)
    {
        $defaultData = $this->defaultData();
        // 商城设置：配送方式
        if (isset($userData['basic']['values']['checkedPay'])) {
            unset($defaultData['basic']['values']['checkedPay']);
        }
        if (isset($userData['basic']['values']['function'])) {
            unset($defaultData['basic']['values']['function']);
        }
        return array_merge_multiple($defaultData, $userData);
    }

    /**
     * 默认配置
     */
    public function defaultData($storeName = null)
    {
        return [
            'basic' => [
                'key' => 'basic',
                'describe' => __('基础设置'),
                'values' => [
                    // 余额支付
                    'checkedPay' => [10, 20, 30],
                    // 功能
                    'function' => [10, 20],
                    // 绑定会员开启关闭
                    'bind_user' => '1',
                ],
            ],

        ];
    }

    /**
     * 支付方式
     */
    public static function pay()
    {
        return [
            10 => [
                'name' => __('余额支付'),
                'value' => 10,
            ],
            20 => [
                'name' => __('现金支付'),
                'value' => 20,
            ],
            30 => [
                'name' => __('其他支付'),
                'value' => 30,
            ],
        ];
    }

    /**
     * 功能
     */
    public static function funMethod()
    {
        return [
            10 => [
                'name' => __('收银功能'),
                'value' => 10,
            ],
            20 => [
                'name' => __('堂食功能'),
                'value' => 20,
            ],
        ];
    }

}
