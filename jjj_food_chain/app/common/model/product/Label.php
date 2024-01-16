<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 打印标签模型
 */
class Label extends BaseModel
{
    protected $name = 'product_print_label';
    protected $pk = 'label_id';

    /**
     * 处理多语言
     */
    protected $append = ['label_name_text'];
    public function getLabelNameTextAttr($value, $data=[])
    {
        return extractLanguage($value ?: $data['label_name']);
    }

    //更新标签
    public function updateLabel($data)
    {
        if ($data) {
            $addData = [];
            foreach ($data as $item) {
                $isExit = $this->where('label_name', '=', $item['label_name'])->count();
                if ($isExit == 0) {
                    $addData[] = [
                        'label_name' => $item['label_name'],
                        'app_id' => self::$app_id
                    ];
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
        return $this->where('shop_supplier_id', '=', $shop_supplier_id)->order(['sort' => 'asc', 'create_time' => 'desc'])->select();
    }

    /**
     * 详情
     */
    public static function detail($label_id)
    {
        return self::find($label_id);
    }
}
