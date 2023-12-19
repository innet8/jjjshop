<?php

namespace app\common\model\plus\agent;

use app\common\model\BaseModel;

/**
 * 分销商申请模型
 */
class Apply extends BaseModel
{
    protected $name = 'agent_apply';
    protected $pk = 'apply_id';

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
     * 申请时间
     * @param $value
     * @return false|string
     */
    public function getApplyTimeAttr($value)
    {
        return date('Y-m-d H:i:s', $value);
    }

    /**
     * 审核时间
     * @param $value
     * @return false|int|string
     */
    public function getAuditTimeAttr($value)
    {
        return $value > 0 ? date('Y-m-d H:i:s', $value) : 0;
    }

    /**
     * 关联推荐人表
     * @return \think\model\relation\BelongsTo
     */
    public function referee()
    {
        return $this->belongsTo('app\common\model\user\User', 'referee_id')
            ->field(['user_id', 'nickName']);
    }

    /**
     * 销商申请记录详情
     * @param $where
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($where)
    {
        $filter = is_array($where) ? $where : ['apply_id' => $where];
        return (new static())->where($filter)->find();
    }

    /**
     * 购买指定商品成为分销商
     * @param $userId
     * @param $productIds
     * @param $appId
     * @return bool
     */
    public function becomeAgentUser($userId, $productIds, $appId)
    {
        // 验证是否设置
        $config = Setting::getItem('condition', $appId);
        if ($config['become__buy_product'] != '1' || empty($config['become__buy_product_ids'])) {
            return false;
        }
        // 判断商品是否在设置范围内
        $intersect = array_intersect($productIds, $config['become__buy_product_ids']);
        if (empty($intersect)) {
            return false;
        }
        // 新增分销商用户
        User::add($userId, [
            'referee_id' => Referee::getRefereeUserId($userId, 1),
            'app_id' => $appId,
        ]);
        return true;
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

    /**
     * 审核方式
     * @param $value
     * @return array
     */
    public function getApplyTypeAttr($value)
    {
        $method = [10 => '后台审核', 20 => '无需审核'];
        return ['text' => $method[$value], 'value' => $value];
    }

}