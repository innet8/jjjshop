<?php

namespace app\common\model\plus\package;

use app\common\model\BaseModel;

/**
 * Class Package
 * 券包模型
 * @package app\common\model\plus\package
 */
class Package extends BaseModel
{
    protected $name = 'package';
    protected $pk = 'package_id';

    /**
     * 详情
     */
    public static function detail($package_id)
    {
        return (new static())->find($package_id);
    }

    /**
     * 开始时间
     */
    public function getStartTimeAttr($value)
    {
        return ['text' => date('Y-m-d', $value), 'value' => $value];
    }

    /**
     * 有效期-结束时间
     */
    public function getEndTimeAttr($value)
    {
        return ['text' => date('Y-m-d', $value), 'value' => $value];
    }

    /**
     * 状态
     */
    public function getStatusAttr($value, $data)
    {
        $text = '';
        if ($value == 1) {
            $text = '未生效';
        } else {
            if ($data['start_time'] > time()) {
                $text = '未开始';
            }
            if ($data['end_time'] < time()) {
                $text = '已结束';
            }
            if ($data['start_time'] < time() && $data['end_time'] > time()) {
                $text = '进行中';
            }
        }
        return ['text' => $text, 'value' => $value];
    }
}