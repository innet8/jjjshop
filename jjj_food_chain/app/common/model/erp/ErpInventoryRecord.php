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
     * 产品信息
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
    public function getList($params)
    {
        $model = new self;
        if (isset($params['name']) && $params['name']) {
            $model = $model->like('name', $params['name']);
        }
        $list = $model->with(['product', 'purchaser'])->order('create_time desc')->paginate($params);
        return $list;
    }

    /**
     * 新增（出/入库）
     */
    public function add($inventory_type, $product_id, $data)
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
        $data['number'] = $inventory_type;
        $data['inventory_type'] = $inventory_type;
        $data['product_id'] = $product_id;
        $data['type'] = $data['type']?? 0;
        $data['num'] = $data['num']?? 0;
        $data['remark'] = $data['remark']?? '';
        $data['operator_id'] = $data['shop_user_id'];
        $data['num'] = $data['num']?? 0;
        $data['shop_supplier_id'] = $data['supplier_id']?? 0;
        $data['app_id'] = self::$app_id;
        $model->save($data);
        return $model->id;
    }

    /**
     * 撤销
     */
    public function cancel($data)
    {
        $model = new self;
        $data['status'] = self::STATUS_REVOKED;
        $data['revoke_time'] = time();
        $model->save($data);
        return $model->id;
    }

    /**
     * 删除
     */
    public function del()
    {
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