<?php

namespace app\shop\model\user;

use app\shop\controller\plus\queue\Record;
use app\common\model\user\Card as CardModel;
use app\common\enum\user\pointsLog\PointsLogSceneEnum;
use app\shop\model\user\CardRecord as CardRecordModel;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;
use app\common\model\user\BalanceLog as BalanceLogModel;
use app\common\model\user\PointsLog as PointsLogModel;
use app\shop\model\plus\coupon\UserCoupon as UserCouponModel;

/**
 * 会员卡模型
 */
class Card extends CardModel
{
    /**
     * 获取列表记录
     */
    public function getList($data)
    {
        $model = $this;
        if ($data['card_name']) {
            $model = $model->like('card_name', $data['card_name']);
        }
        if ($data['status'] >= 0) {
            $model = $model->where('status', '=', $data['status']);
        }
        $list = $model->where('is_delete', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($data);
        return $list;
    }

    /**
     * 获取列表记录
     */
    public function getDeleteList($data)
    {
        $model = $this;
        if ($data['card_name']) {
            $model = $model->like('card_name', $data['card_name']);
        }
        $list = $model->where('is_delete', '=', 1)
            ->order(['create_time' => 'desc'])
            ->paginate($data);
        return $list;
    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        $data = json_decode($data, 1);
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 发卡
     */
    public function put($data)
    {
        $userIds = $data['user_ids'];
        if (empty($userIds)) {
            $this->error = "请选择会员";
            return false;
        }
        $userIdsArr = array_unique(explode(',', $userIds));
        foreach ($userIdsArr as $userId) {
            $isExist = (new CardRecord())->checkExistByUserId($userId);
            if (!$isExist->isEmpty()) {
                if ($data['card_id'] == $isExist['card_id']) {
                    $this->error = "会员已拥有此会员卡";
                    return false;
                    continue;
                }
                // 删除原有的会员卡
                (new CardRecord())->where('user_id', $userId)->save(['is_delete' => 1]);
            }

            $detail = self::detail($data['card_id']);
            $this->startTrans();
            try {
                //添加会员卡
                $record = [
                    'user_id' => $userId,
                    'card_id' => $data['card_id'],
                    'expire_time' => $detail['expire'] ? (time() + $detail['expire'] * 86400 * 30) : 0,
                    'money' => $detail['money'],
                    'discount' => $detail['is_discount'] ? $detail['discount'] : 0,
                    'open_points' => $detail['open_points'],
                    'open_points_num' => $detail['open_points_num'],
                    'open_coupon' => $detail['open_coupon'],
                    'open_coupons' => $detail['open_coupons'],
                    'open_money' => $detail['open_money'],
                    'open_money_num' => $detail['open_money_num'],
                    'pay_status' => 20,
                    'pay_type' => 30,
                    'pay_time' => time(),
                    'app_id' => self::$app_id,
                ];
                $CardRecordModel = new CardRecordModel;
                $CardRecordModel->save($record);
                $user = (new User)::detail($userId);
                // 会员卡id
                if ($data['card_id']) {
                    $user->setCardId($data['card_id']);
                }
                // 赠送积分
                if ($detail['open_points'] && $detail['open_points_num']) {
                    $user->setIncPoints($detail['open_points_num'], '发会员卡获取积分');
                }
                // 赠送优惠券
                if ($detail['open_coupon'] && $detail['open_coupons']) {
                    (new UserCouponModel)->addUserCardCoupon($detail['open_coupons'], $user, $CardRecordModel['order_id']);
                }
                // 赠送余额
                if ($detail['open_money'] && $detail['open_money_num']) {
                    (new User())->where('user_id', '=', $user['user_id'])
                        ->inc('balance', $detail['open_money_num'])->update();

                    BalanceLogModel::add(BalanceLogSceneEnum::ADMIN, [
                        'user_id' => $user['user_id'],
                        'card_id' => $data['card_id'],
                        'money' => $detail['open_money_num'],
                    ], ['order_no' => '后台发放会员卡赠送']);
                }
                $detail->save(['receive_num' => $detail['receive_num'] + 1]);
                $this->commit();
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
                $this->rollback();
                return false;
            }
        }
        return true;
    }

    // 检测用户是否有余额/积分消费记录
    public function checkUserConsumeRecord($user_id, $card_id = 0)
    {
        if (!(new BalanceLogModel)->where('user_id', $user_id)->where('card_id', $card_id)->where('scene', BalanceLogSceneEnum::CONSUME)->findOrEmpty()->isEmpty())
        {
            return true;
        }
        return !(new PointsLogModel)->where('user_id', $user_id)->where('card_id', $card_id)->where('scene', PointsLogSceneEnum::CONSUME)->findOrEmpty()->isEmpty();
    }


    /**
     * 撤销
     */
    public function cancel($data)
    {
        $CardRecordModel = new CardRecordModel;
        $detail = $CardRecordModel::detail($data['order_id']);
        $cardDetail = self::detail($detail['card_id']);
        //
        if (!$detail || $detail['is_delete'] != 0) {
            $this->error = "记录不存在";
            return false;
        }
        if ($this->checkUserConsumeRecord($detail['user_id'], $detail['card_id'])) {
            $this->error = "会员卡已使用，无法撤销";
            return false;
        }
        //
        $this->startTrans();
        try {
            $detail->save(['is_delete' => 1]);
            $user = (new User)::detail($detail['user_id']);
            // 撤销会员卡id
            $user->setCardId(0);
            // 撤销积分
            if ($detail['open_points'] && $detail['open_points_num']) {
                $user->setIncPoints(-$detail['open_points_num'], '撤销会员卡减少积分');
            }
            // 撤销优惠券
            if ($detail['open_coupon'] && $detail['open_coupons']) {
                (new UserCouponModel)->cancelUserCardCoupon($detail['open_coupons'], $user, $detail['order_id']);
            }
            if ($detail['open_money'] && $detail['open_money_num']) {
                (new User())->where('user_id', '=', $user['user_id'])
                    ->dec('balance', $detail['open_money_num'])->update();

                BalanceLogModel::add(BalanceLogSceneEnum::ADMIN, [
                    'user_id' => $user['user_id'],
                    'card_id' => $detail['card_id'],
                    'money' => -$detail['open_money_num'],
                ], ['order_no' => '撤销会员卡减少余额']);
            }
            $cardDetail->save(['receive_num' => $cardDetail['receive_num'] - 1]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 处理数据超过最大值时，返回提示信息
     */
    private function alertCardNumber($data)
    {
        $limits = [
            'open_points_num' => ['limit' => 100000000, 'message' => '积分最大可设置为100000000'],
            'open_money_num' => ['limit' => 100000000, 'message' => '余额最大可设置为100000000'],
            'money' => ['limit' => 100000000, 'message' => '价格最大可设置为100000000'],
            'sort' => ['limit' => 999, 'message' => '排序最大可设置为999'],
            'expire' => ['limit' => 999, 'message' => '有效期最大可设置为999'],
        ];

        foreach ($limits as $key => $value) {
            trace($key);
            if (array_key_exists($key, $data) && $data[$key] > $value['limit']) {
                return $value['message'];
            }
        }
        return '';
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        $data = json_decode($data, true);
        //
        if(mb_strlen($data['card_name']) > 50){
            $this->error = '会员卡名称最大长度限制为50个字符';
            return false;
        }
        if ($text = $this->alertCardNumber($data)) {
            $this->error = $text;
            return false;
        }
        if(mb_strlen($data['content']) > 200){
            $this->error = '使用须知最大长度限制为200个字符';
            return false;
        }
        unset($data['create_time']);
        unset($data['update_time']);
        return $this->save($data);
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        // 判断该卡下是否存在会员
        if (CardRecordModel::checkExistByRecordId($this['card_id'])) {
            return false;
        }
        return $this->save(['is_delete' => 1]);
    }

    /**
     * 设置状态
     */
    public function setStatus($status)
    {
        return $this->save(['status' => $status]);
    }
}