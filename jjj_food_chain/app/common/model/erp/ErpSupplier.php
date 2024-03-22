<?php

namespace app\common\model\erp;

use app\common\model\BaseModel;
use app\common\model\shop\User;
use think\model\concern\SoftDelete;

/**
 * 供应商模型
 */
class ErpSupplier extends BaseModel
{
    use SoftDelete;
    protected $name = 'erp_supplier';
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;

    /**
     * 追加字段
     * @var string[]
     */
    protected $append = [];

    /**
     * 采购负责人
     */
    public function purchaser()
    {
        return $this->belongsTo(User::class, 'purchaser_id', 'shop_user_id')->field('shop_user_id, real_name');
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
        $list = $model->with(['purchaser'])->order('create_time desc')->paginate($params);
        return $list;
    }

    /**
     * 详情
     *
     * @param [type] $erp_supplier_id
     * @return object
     */
    public function detail($erp_supplier_id)
    {
        $model = new self;
        $info = $model->with(['purchaser'])->find($erp_supplier_id);
        return $info;
    }

    /**
     * 新增
     */
    public function add($data)
    {
        $model = new self;
        $data['app_id'] = self::$app_id;
        $model->save($data);
        return $model->id;
    }

    /**
     * 编辑
     */
    public function edit($data)
    {
        $this->save($data);
        return $this->id;
    }

    /**
     * 删除
     */
    public function del()
    {
        return $this->destroy(['id' => $this['id']]);
    }
}