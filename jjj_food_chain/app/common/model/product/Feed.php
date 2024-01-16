<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 加料模型
 */
class Feed extends BaseModel
{
    protected $name = 'product_feed';
    protected $pk = 'feed_id';

    /**
     * 处理多语言
     */
    protected $append = ['feed_name_text'];
    public function getFeedNameTextAttr($value, $data=[])
    {
        return extractLanguage($value ?: $data['feed_name']);
    }

    //更新加料库库
    public function updateFeed($data, $shop_supplier_id)
    {
        if ($data) {
            $addData = [];
            foreach ($data as $item) {
                $isExit = $this->where('feed_name', '=', $item['feed_name'])
                    ->where('shop_supplier_id', '=', $shop_supplier_id)
                    ->count();
                if ($isExit == 0) {
                    $addData[] = [
                        'feed_name' => $item['feed_name'],
                        'price' => $item['price'],
                        'shop_supplier_id' => $shop_supplier_id,
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
    public static function detail($feed_id)
    {
        return self::find($feed_id);
    }
}
