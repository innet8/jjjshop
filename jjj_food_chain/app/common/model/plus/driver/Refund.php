<?php

namespace app\common\model\plus\driver;

use app\common\model\BaseModel;

/**
 * 配送申请退出模型
 */
class Refund extends BaseModel
{
    protected $name = 'driver_refund';
    protected $pk = 'refund_id';

    /**
     * 申请状态
     * @var array
     */
    public $applyStatus = [
        10 => '待审核',
        20 => '审核通过',
        30 => '驳回',
    ];


    /**
     * 关联配送员表
     * @return \think\model\relation\BelongsTo
     */
    public function driverUser()
    {
        return $this->belongsTo('app\common\model\plus\driver\User', 'user_id','user_id');
    }

    /**
     * 配送申请记录详情
     * @param $where
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($where)
    {
        $filter = is_array($where) ? $where : ['refund_id' => $where];
        return static::where($filter)->with(['driverUser'])->find();
    }
    /**
     * 审核状态
     * @param $value
     * @return array
     */
    public function getApplyStatusAttr($value)
    {
        $method = [10 => '待审核', 20 => '审核通过', '30' => '驳回'];
        return ['text' => $method[$value], 'value' => $value];
    }

}