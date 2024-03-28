<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
use app\common\model\product\ProductFeedMaterial;

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

    /**
     * 获取器：feed_name_text
     *
     * @param [type] $value
     * @param array $data
     * @return string
     */
    public function getFeedNameTextAttr($value, $data=[])
    {
        return extractLanguage($value ?: $data['feed_name']);
    }

    /**
     * 关联材料
     */
    public function material()
    {
        return $this->hasMany(ProductFeedMaterial::class, 'feed_id')->with(['materialProduct']);
    }

    //更新加料库库
    public function updateFeed($data, $shop_supplier_id)
    {
        if ($data) {
            foreach ($data as $item) {
                $isExit = $this->where('feed_name', '=', $item['feed_name'])
                    ->where('shop_supplier_id', '=', $shop_supplier_id)
                    ->count();
                if ($isExit == 0) {
                    $addData[] = [
                        'feed_name' => $item['feed_name'],
                        'price' => $item['price'],
                        'stock_num' => $item['stock_num'],
                        'shop_supplier_id' => $shop_supplier_id,
                        'app_id' => self::$app_id
                    ];
                    $this->save($addData);
                    // 如果有材料，则添加材料规格
                    if (isset($data['feed']['material']) && !empty($data['feed']['material'])) {
                        $material = [
                            'feed_id' => $this->feed_id,
                        ];
                        $material = array_merge($material, $data['feed']['material'] ?? []);
                        (new ProductFeedMaterial)->add($material);
                    }
                }
            }
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
    public static function detail($feed_id)
    {
        return self::find($feed_id);
    }
}
