<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\shop\User;
use think\model\concern\SoftDelete;

/**
 * 采购订单模型
 */
class ErpPurchaseOrder extends BaseModel
{
    use SoftDelete;
    protected $name = 'erp_purchase_order';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [];

    /**
     * 采购方式 10-总部采购 20-自行采购
     */
    const TYPE_ALL = 10;
    const TYPE_SELF = 20;

    /**
     * 状态 10-待审核 20-已驳回 30-采购中 40-已采购 50-已入库
     */
    const STATUS_WAIT = 10;
    const STATUS_REJECTED = 20;
    const STATUS_PURCHASING = 30;
    const STATUS_PURCHASED = 40;
    const STATUS_STORED = 50;

    /**
     * 采购员
     */
    public function purchaser()
    {
        return $this->belongsTo(User::class, 'purchaser_id', 'shop_user_id')->field('shop_user_id, real_name');
    }

    /**
     * 申请人
     */
    public function applicant()
    {
        return $this->belongsTo(User::class, 'applicant_id', 'shop_user_id')->field('shop_user_id, real_name');
    }

    /**
     * 采购单明细
     */
    public function details()
    {
        return $this->hasMany(ErpPurchaseDetail::class, 'purchase_order_id', 'id')->with(['product']);
    }

    /**
     * 采购单操作日志
     */

    public function logs()
    {
        return $this->hasMany(ErpPurchaseOperationLog::class, 'purchase_order_id', 'id')->with('operator');
    }

    /**
     * 获取列表
     *
     * @param [type] $params
     * @return object
     */
    public function getList($params)
    {
        $model = new self;
        if (isset($params['name']) && $params['name']) {
            $model = $model->like('name', $params['name']);
        }
        $list = $model->with(['purchaser', 'applicant', 'details'])->order('create_time desc')->paginate($params);
        return $list;
    }

    /**
     * 详情
     *
     * @param [type] $id
     * @return object
     */
    public function detail($id)
    {
        $model = new self;
        $info = $model->with(['purchaser', 'applicant', 'details', 'logs'])->find($id);
        return $info;
    }

    /**
     * 新增
     */
    public function add($params)
    {
        if (!isset($params['purchase_detail']) || empty($params['purchase_detail'])) {
            $this->error = '请选择采购明细';
            return false;
        }
        $this->startTrans();
        try {
            $model = new self;
            $total_num = 0;
            $total_amount = 0;
            foreach ($params['purchase_detail'] as &$value) {
                $total_num += $value['estimate_purchase_num'];
                $total_amount += $value['estimate_purchase_price'] * $value['estimate_purchase_num'];
            }
            $data = [
                'number' => $this->getPurchaseNumber(),
                'name' => $params['name'],
                'type' => $params['type'],
                'applicant_id' => $params['applicant_id'],
                'total_num' => $total_num,
                'total_amount' => $total_amount,
                'arrival_time' => strtotime($params['arrival_time']),
                'remark' => $params['remark'],
                'shop_supplier_id' => $params['shop_supplier_id'],
                'app_id' => self::$app_id,
            ];
            $model->save($data);
            //
            foreach ($params['purchase_detail'] as &$value) {
                $value['purchase_order_id'] = $model->id;
                $value['estimate_total_amount'] = $value['estimate_purchase_price'] * $value['estimate_purchase_num'];
            }
            $purchaseDetailModel = new ErpPurchaseDetail;
            $purchaseDetailModel->saveAll($params['purchase_detail']);
            $this->commit();
            return $model->id;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 编辑
     */
    public function edit($params)
    {
        if (!isset($params['purchase_detail']) || empty($params['purchase_detail'])) {
            $this->error = '请选择采购明细';
            return false;
        }

        $this->startTrans();
        try {
            $total_num = 0;
            $total_amount = 0;
            foreach ($params['purchase_detail'] as &$value) {
                $total_num += $value['estimate_purchase_num'];
                $total_amount += $value['estimate_purchase_price'] * $value['estimate_purchase_num'];
                //
                $value['purchase_order_id'] = $this->id;
                $value['estimate_total_amount'] = $value['estimate_purchase_price'] * $value['estimate_purchase_num'];
            }

            $data = [
                'name' => $params['name'],
                'type' => $params['type'],
                'applicant_id' => $params['applicant_id'],
                'total_num' => $total_num,
                'total_amount' => $total_amount,
                'arrival_time' => strtotime($params['arrival_time']),
                'remark' => $params['remark'],
                'app_id' => self::$app_id,
            ];
            $this->save($data);

            $purchaseDetailModel = new ErpPurchaseDetail;
            $purchaseDetailModel->where('purchase_order_id', $this->id)->delete(); // 先删后加
            $purchaseDetailModel->saveAll($params['purchase_detail']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 调整数据
     */
    public function adjust($params)
    {
        if (!isset($params['purchase_detail']) || empty($params['purchase_detail'])) {
            $this->error = '请选择采购明细';
            return false;
        }
        $purchaseDetailModel = new ErpPurchaseDetail;
        $total_num = 0;
        $total_amount = 0;
        foreach ($params['purchase_detail'] as &$value) {
            $total_num += $value['actual_purchase_num'];
            $total_amount += $value['actual_purchase_price'] * $value['actual_purchase_num'];
            //
            $value['id'] = $value['purchase_detail_id'];
            $value['actual_total_amount'] = $value['actual_purchase_price'] * $value['actual_purchase_num'];
        }
        $data = [
            'total_num' => $total_num,
            'total_amount' => $total_amount,
        ];
        $this->save($data);
        return $purchaseDetailModel->saveAll($params['purchase_detail']);
    }

    /**
     * 操作
     */
    public function operate($params)
    {
        // 通过和驳回操作，需要状态为待审核
        if (in_array($params['status'], [self::STATUS_PURCHASING, self::STATUS_REJECTED], true)) {
           if ($this['status'] !== self::STATUS_WAIT) {
               $this->error = '订单状态不能操作';
               return false;
           }
        }
        // 已采购操作，需要状态为通过
        if ($params['status'] === self::STATUS_PURCHASED) {
            if ($this['status'] !== self::STATUS_PURCHASING) {
                $this->error = '订单状态不能操作';
                return false;
            }
         }
        // 已入库操作，需要状态为已采购
        if ($params['status'] === self::STATUS_STORED) {
            if ($this['status'] !== self::STATUS_PURCHASED) {
                $this->error = '订单状态不能操作';
                return false;
            }
        }
        $this->startTrans();
        try {
            $this->status = $params['status'];
            $this->save();
            // 采购单明细实际采购数量和实际价格
            $purchaseDetailModel = new ErpPurchaseDetail;
            $detailList = $purchaseDetailModel->where('purchase_order_id', $this->id)->select();
            foreach ($detailList as $detail) {
                $detail->actual_purchase_num = $detail['actual_purchase_num'] ?: $detail['estimate_purchase_num'];
                $detail->actual_purchase_price = $detail['actual_purchase_price'] ?: $detail['estimate_purchase_price'];
                $detail->actual_total_amount = $detail->actual_purchase_price * $detail->actual_purchase_num;
                $detail->save();
            }
            // 操作日志
            $data = [
                'purchase_order_id' => $this->id,
                'operator_id' => $params['shop_user_id'],
                'status' => $this->status,
                'remark' => $params['remark'] ?? '',
            ];
            (new ErpPurchaseOperationLog)->save($data);
            // 入库记录
            if ($params['status'] === self::STATUS_STORED) {
                $inventoryRecordData = [
                    'purchase_order_id' => $this->id,
                    'type' => ErpInventoryRecord::TYPE_PURCHASE_IN,
                    'num' => $this->total_num,
                    'operator_id' => $params['shop_user_id'],
                    'remark' => '',
                    'shop_supplier_id' => $this->shop_supplier_id,
                ];
                (new ErpInventoryRecord)->add(ErpInventoryRecord::INVENTORY_TYPE_IN, $inventoryRecordData);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 删除
     */
    public function del()
    {
        // 待审核和驳回的订单才能删除
        if (!in_array($this['status'], [self::STATUS_WAIT, self::STATUS_REJECTED], true)) {
            $this->error = '订单状态不能删除';
            return false;
        }
        return $this->destroy(['id' => $this['id']]);
    }

    /**
     * 采购编号：18位纯数字（前2位PU，2-10位是年月日，中间位是0000，后4位随机生成）
     */
    public function getPurchaseNumber()
    {
        $prefix = 'PU';
        $date = date('Ymd');
        $random = rand(1000, 9999);
        $number = $prefix. $date. '0000'. $random;
        return $number;
    }
}