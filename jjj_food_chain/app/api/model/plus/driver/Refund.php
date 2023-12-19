<?php

namespace app\api\model\plus\driver;

use app\common\model\plus\driver\Refund as RefundModel;

/**
 * 配送员退出模型
 */
class Refund extends RefundModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'create_time',
        'update_time',
    ];

    /**
     * 提交申请
     */
    public function submit($user)
    {   
        //判断是否存在未结算订单
        $existOrder = Order::where('user_id','=',$user['user_id'])->where('is_settled','=',0)->find();
        if($existOrder){
            $this->error = "存在未结算订单";
            return false;
        }
        $exist = $this->where('user_id','=',$user['user_id'])->where('apply_status','=',10)->find();
        if($exist){
            $this->error = "已经申请";
            return false;
        }
        $this->startTrans();
        try {
        // 数据整理
            $data = [
                'user_id' => $user['user_id'],
                'deposit_money'=>$user['deposit_money'],
                'app_id' => self::$app_id,
            ];  
            $this->save($data);
            $user->save(['status'=>1]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
        
    }
    

}
