<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 规格/属性(组)模型
 */
class Spec extends BaseModel
{
    protected $name = 'spec';
    protected $pk = 'spec_id';
    protected $updateTime = false;

    /**
     * 处理多语言
     */
    protected $append = ['spec_name_text'];
    public function getSpecNameTextAttr($value, $data)
    {
        return extractLanguage($data['spec_name']);
    }

    /**
     * 关联材料
     */
    public function material()
    {
        return $this->hasMany(ProductSkuMaterial::class, 'spec_id')->with(['materialProduct']);
    }

    //更新规格
    public function updateSpec($data)
    {
        if ($data) {
            $addData = [];
            foreach ($data as $item) {
                if ($item['spec_name']) {
                    $isExit = $this->where('spec_name', '=', $item['spec_name'])->count();
                    if ($isExit == 0) {
                        $addData[] = [
                            'spec_name' => $item['spec_name'],
                            'app_id' => self::$app_id,
                            'shop_supplier_id' => self::$app_id,
                        ];
                    }
                }
            }
            $addData && $this->saveAll($addData);
        }
    }

    /**
     * 获取列表数据
     */
    public function getAllList($shop_supplier_id)
    {
        return $this->with(['material'])->where('shop_supplier_id', '=', $shop_supplier_id)->order(['sort' => 'asc', 'create_time' => 'desc'])->select();
    }

    /**
     * 详情
     */
    public static function detail($spec_id)
    {
        return self::find($spec_id);
    }
}
