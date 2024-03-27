<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\shop\User;
use think\model\concern\SoftDelete;
use app\common\model\product\Product;

/**
 * 库存记录模型
 */
class ErpInventoryRecord extends BaseModel
{
    use SoftDelete;
    protected $name = 'erp_inventory_record';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [];

    /**
     * inventory_type 类型 1-入库 2-出库
     */
    const INVENTORY_TYPE_IN = 1;
    const INVENTORY_TYPE_OUT = 2;

    /**
     * type 操作类型 10-采购入库 20-调整入库 30-销售出库 40-调整出库
     */
    const TYPE_PURCHASE_IN = 10;
    const TYPE_ADJUST_IN = 20;
    const TYPE_SALE_OUT = 30;
    const TYPE_ADJUST_OUT = 40;

    /**
     * status 状态 10-已入库 20-已出库 30-已撤销
     */

    const STATUS_IN = 10;
    const STATUS_OUT = 20;
    const STATUS_REVOKED = 30;

    /**
     * 关联采购单
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(ErpPurchaseOrder::class, 'purchase_order_id', 'id');
    }

    /**
     * 关联产品
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    /**
     * 操作人
     */
    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id', 'shop_user_id');
    }

     /**
     * 获取列表
     *
     * @param [type] $params
     * @return object
     */
    public function getList($params, $type = self::INVENTORY_TYPE_IN)
    {
        $model = new self;
        if (isset($params['name']) && $params['name']) {
            $model = $model->like('name', $params['name']);
        }
        $list = $model->with(['purchaseOrder', 'product', 'operator'])->where('inventory_type', $type)->order('create_time desc')->paginate($params);
        return $list;
    }

    /**
     * 详情
     */
    public function detail($id)
    {
        $model = new self;
        $info = $model->with(['purchaseOrder', 'product', 'operator'])
            ->where('id', $id)
            ->find();
        return $info;
    }

    /**
     * 新增（出/入库）
     */
    public function add($inventory_type, $params)
    {
        $model = new self;
        if ($inventory_type == self::INVENTORY_TYPE_IN) {
            $data['number'] = self::generateInCode();
            $data['in_time'] = time();
        } else {
            $data['number'] = self::generateOutCode();
            $data['out_time'] = time();
        }
        //
        $data['inventory_type'] = $inventory_type;
        $data['purchase_order_id'] = $params['purchase_order_id'] ?? 0;
        $data['product_id'] = $params['product_id'] ?? 0;
        $data['type'] = $params['type'] ?? 0;
        $data['num'] = $params['num'] ?? 0;
        $data['remark'] = $params['remark'] ?? '';
        $data['operator_id'] = $params['operator_id'];
        $data['shop_supplier_id'] = $params['shop_supplier_id'] ?? 0;
        $data['app_id'] = self::$app_id;
        $model->save($data);
        return $model->id;
    }

    /**
     * 撤销
     */
    public function cancel()
    {
        // 不是撤销状态的才能撤销
        if ($this->status == self::STATUS_REVOKED) {
            $this->error = '记录已撤销';
            return false;
        }
        $this->status = self::STATUS_REVOKED;
        $this->revoke_time = time();
        $this->save();
        return $this->id;
    }

    /**
     * 删除
     */
    public function del()
    {
        // 撤销状态的才能删除
        if ($this->status != self::STATUS_REVOKED) {
            $this->error = '记录不能删除';
            return false;
        }
        return $this->destroy(['id' => $this['id']]);
    }

    /**
     * 入库编号：18位纯数字（前2位WR，2-10位是年月日，中间位是0000，后4位随机生成）
     *
     * @return string
     */
    public function generateInCode()
    {
        $year = date('y');
        $month = date('m');
        $day = date('d');
        $rand = rand(1000, 9999);
        $code = 'WR'. $year. $month. $day. '0000'. $rand;
        return $code;
    }

    /**
     * 出库编号：18位纯数字（前2位OO，2-10位是年月日，中间位是0000，后4位随机生成）
     *
     * @return string
     */
    public function generateOutCode()
    {
        $year = date('y');
        $month = date('m');
        $day = date('d');
        $rand = rand(1000, 9999);
        $code = 'OO'. $year. $month. $day. '0000'. $rand;
        return $code;
    }
}