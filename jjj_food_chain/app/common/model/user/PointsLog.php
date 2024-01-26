<?php

namespace app\common\model\user;

use app\common\model\BaseModel;
use app\common\enum\user\pointsLog\PointsLogSceneEnum;

class PointsLog extends BaseModel
{
    protected $name = 'user_points_log';
    protected $pk = 'log_id';
    protected $updateTime = false;

    /**
     * 获取当前模型属性
     */
    public static function getAttributes()
    {
        return [
            // 充值方式
            'scene' => PointsLogSceneEnum::data(),
        ];
    }

    /**
     * 积分变动场景
     */
    public function getSceneAttr($value)
    {
        try {
            return ['text' => PointsLogSceneEnum::data()[$value]['name'], 'value' => $value];
        } catch (\Exception $e) {
            return ['text' => '-', 'value' => $value];
        }
    }

    /**
     * 关联会员记录表
     */
    public function user()
    {
        $module = self::getCalledModule() ?: 'common';
        return $this->belongsTo("app\\{$module}\\model\\user\\User");
    }

    /**
     * 新增记录
     */
    public static function add($data)
    {
        $static = new static;
        $static->save(array_merge(['app_id' => $static::$app_id], $data));
    }

    /**
     * 新增记录 (批量)
     */
    public function onBatchAdd($saveData)
    {
        return $this->saveAll($saveData);
    }

}