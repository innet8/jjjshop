<?php

namespace app\common\model\plus\points;

use think\facade\Cache;
use app\common\model\BaseModel;

/**
 * 积分商品分类模型
 */
class Category extends BaseModel
{
    protected $pk = 'category_id';
    protected $name = 'points_category';

    /**
     * 充值套餐详情
     */
    public static function detail($category_id)
    {
        return (new static())->find($category_id);
    }

    /**
     * 所有分类
     */
    public static function getALL()
    {
        $model = new static;
        if (!Cache::get('points_category_' . $model::$app_id)) {
            $data = $model->with(['image'])->order(['sort' => 'asc', 'create_time' => 'asc'])->select();
            $all = !empty($data) ? $data->toArray() : [];
            Cache::tag('cache')->set('points_category_' . $model::$app_id, compact('all'));
        }
        return Cache::get('points_category_' . $model::$app_id);
    }

    /**
     * 关联图片
     */
    public function image()
    {
        return $this->belongsTo('app\common\model\file\UploadFile', 'image_id', 'file_id');
    }
}
