<?php

namespace app\common\model\plus\driver;

use app\common\model\BaseModel;
use think\facade\Cache;

/**
 * 配送员设置模型
 */
class Setting extends BaseModel
{
    protected $name = 'driver_setting';
    protected $createTime = false;

    /**
     * 转义数组格式
     * @param $value
     * @return mixed
     */
    public function getValuesAttr($value)
    {
        return json_decode($value, true);
    }

    /**
     * 转义成json格式
     * @param $value
     * @return false|string
     */
    public function setValuesAttr($value)
    {
        return json_encode($value);
    }

    /**
     * 获取指定项设置
     * @param $key
     * @param null $app_id
     * @return array|mixed
     */
    public static function getItem($key, $app_id = null)
    {
        $data = static::getAll($app_id);
        return isset($data[$key]) ? $data[$key]['values'] : [];
    }

    /**
     * 获取配送设置
     * @param null $app_id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getAll($app_id = null)
    {
        $self = new static;
        is_null($app_id) && $app_id = $self::$app_id;
        if (!$data = Cache::get('driver_setting_' . $app_id)) {
            $data = array_column($self->select()->toArray(), null, 'key');
            Cache::tag('cache')->set('driver_setting_' . $app_id, $data);
        }
        return array_merge_multiple($self->defaultData(), $data);
    }

    /**
     * 获取设置项信息
     * @param $key
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($key)
    {
        return static::find(compact('key'));
    }

    /**
     * 是否开启配送功能
     * @param null $app_id
     * @return mixed
     */
    public static function isOpen($app_id = null)
    {
        return static::getItem('basic', $app_id)['is_open'];
    }

    /**
     * 默认配置
     * @return array[]
     */
    public function defaultData()
    {
        return [
            'basic' => [
                'key' => 'basic',
                'describe' => '基础设置',
                'values' => [
                    //服务费
                    'take_fee' => 1,
                    //押金
                    'take_cash' => 1000,
                    //押金开关
                    'cash_open' => '1',
                ],
            ],
            'condition' => [
                'key' => 'condition',
                'describe' => '配送条件',
                'values' => [
                    // 成为配送条件
                    'become' => '10',   // 参数值：10填写申请信息(需后台审核) 20填写申请信息(无需审核)
                ]
            ],
            'settlement' => [
                'key' => 'settlement',
                'describe' => '结算',
                'values' => [
                    // 提现方式
                    'pay_type' => [],   // 参数值：10微信支付 20支付宝支付 30银行卡支付
                    // 最低提现额度
                    'min_money' => '10.00',
                    // 佣金结算天数
                    'settle_days' => '10',
                ]
            ],
        ];
    }
}