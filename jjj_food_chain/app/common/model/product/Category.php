<?php

namespace app\common\model\product;

use think\facade\Cache;
use app\common\model\BaseModel;
use think\facade\Session;
use app\common\model\supplier\Supplier as SupplierModel;

/**
 * 产品分类模型
 */
class Category extends BaseModel
{
    protected $pk = 'category_id';
    protected $name = 'category';

    /**
     * 处理多语言
     */
    protected $append = ['name_text', 'path_name_text'];
    public static function getNameTextAttr($value, $data=[])
    {
        return extractLanguage($value ?: $data['name'] ?? '');
    }

    /**
     * 全路径分类名称
     *
     * @param [type] $value
     * @param array $data
     * @return string
     */
    public static function getPathNameTextAttr($value, $data=[])
    {
        $text = extractLanguage($data['name'] ?? '');
        if ($data['parent_id'] > 0) {
            try {
                $parentName = self::where('category_id', $data['parent_id'])->value('name');
                $parentText = extractLanguage($parentName ?? '');
                $text = $parentText . '-' . $text;
            } catch (\Exception $e) {
            }
        }
        return $text;
    }

    /**
     * 分类图片
     */
    public function images()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'image_id');
    }

    public function child()
    {
        return $this->hasMany('app\\common\\model\\product\\Category', 'parent_id', 'category_id')->order(['sort' => 'asc', 'create_time' => 'asc'])->with(['images', 'child']);
    }

    /**
     * 充值套餐详情
     */
    public static function detail($category_id)
    {
        return self::find($category_id);
    }


    public function detailWithImage($where)
    {
        return $this->with(['image'])->where($where)->find();
    }

    /**
     * 所有分类
     */
    public static function getALL($type, $is_special, $store = '', $name = '')
    {
        $user = $store['user'];
        $supplier = $store['supplier'];
        if ($supplier['is_main'] == 1 || $supplier['category_set'] == 20) {
            $shop_supplier_id = $user['shop_supplier_id'];
        } else {
            $detail = SupplierModel::where('is_main', '=', 1)->find();
            $shop_supplier_id = $detail['shop_supplier_id'];
        }
        $model = new static;
        // DOTO 去缓存
        // if (!$name && !Cache::get('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special. $name)) {
            $data = $model->with(['images', 'child'])
                ->where('parent_id', '=', 0)
                ->where('type', '=', $type)
                ->where('is_special', '=', $is_special)
                ->order(['sort' => 'asc', 'create_time' => 'desc'])
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->when($name, function($q) use($name) {
                    $q->like('name', $name);
                })
                ->select();
            $all = !empty($data) ? $data->toArray() : [];
            if ($is_special == 1 && empty($all)) {
                (new static)->addSpecial($model::$app_id, $shop_supplier_id);
                $data = $model->with(['images'])
                    ->where('type', '=', $type)
                    ->where('is_special', '=', $is_special)
                    ->when($name, function($q) use($name) {
                        $q->like('name', $name);
                    })
                    ->order(['sort' => 'asc', 'create_time' => 'asc'])
                    ->where('shop_supplier_id', '=', $shop_supplier_id)
                    ->select();
                $all = !empty($data) ? $data->toArray() : [];
            }
            return $all;
            // Cache::tag('cache')->set('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special. $name, $all);
        // }
        // return Cache::get('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special. $name);
    }

    /**
     * 所有父级分类
     */
    public static function getALLParent($type, $is_special, $store = '')
    {
        $user = $store['user'];
        $supplier = $store['supplier'];
        if ($supplier['is_main'] == 1 || $supplier['category_set'] == 20) {
            $shop_supplier_id = $user['shop_supplier_id'];
        } else {
            $detail = SupplierModel::where('is_main', '=', 1)->find();
            $shop_supplier_id = $detail['shop_supplier_id'];
        }
        $model = new static;
        if (!Cache::get('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special)) {
            $data = $model->with(['images'])
                ->where('parent_id', '=', 0)
                ->where('type', '=', $type)
                ->where('is_special', '=', $is_special)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->select();
            $all = !empty($data) ? $data->toArray() : [];
            if ($is_special == 1 && empty($all)) {
                (new static)->addSpecial($model::$app_id, $shop_supplier_id);
                $data = $model->with(['images'])
                    ->where('type', '=', $type)
                    ->where('is_special', '=', $is_special)
                    ->order(['sort' => 'asc', 'create_time' => 'asc'])
                    ->where('shop_supplier_id', '=', $shop_supplier_id)
                    ->select();
                $all = !empty($data) ? $data->toArray() : [];
            }
            Cache::tag('cache')->set('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special, $all);
        }
        return Cache::get('category_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special);
    }

    /**
     * 获取前端分类
     */
    public static function getApiALL($type, $is_special, $shop_supplier_id)
    {
        $model = new static;
        $supplier = SupplierModel::detail($shop_supplier_id);
        if ($supplier['is_main'] == 0 && $supplier['category_set'] == 10) {
            $detail = SupplierModel::where('is_main', '=', 1)->find();
            $shop_supplier_id = $detail['shop_supplier_id'];
        }
        if (!Cache::get('category_api_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special)) {
            $data = $model->with(['images'])
                ->where('type', '=', $type)
                ->where('status', '=', 1)
                ->where('is_special', '=', $is_special)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->select();
            $all = !empty($data) ? $data->toArray() : [];
            Cache::tag('cache')->set('category_api_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special, $all);
        }
        return Cache::get('category_api_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special);
    }

    /**
     * 获取收银台分类
     */
    public static function getCashierALL($type, $shop_supplier_id)
    {
        $model = new static;
        $supplier = SupplierModel::detail($shop_supplier_id);
        if ($supplier && $supplier['is_main'] == 0 && $supplier['category_set'] == 10) {
            $detail = SupplierModel::where('is_main', '=', 1)->find();
            $shop_supplier_id = $detail['shop_supplier_id'];
        }
        // TODO 干掉缓存
        return $model->with(['images', 'child' => function ($query) {
                $query->where('status', '=', 1);
            }])
            ->where('parent_id', '=', 0)
            ->where('type', '=', $type)
            ->where('status', '=', 1)
            ->order(['is_special' => 'desc', 'sort' => 'asc', 'create_time' => 'asc'])
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->select();
        //
        if (!Cache::get('categ2ory_cashier_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special)) {
            $data = $model->with(['images', 'child'])
                ->where('parent_id', '=', 0)
                ->where('type', '=', $type)
                ->where('status', '=', 1)
                ->where('is_special', '=', $is_special)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->where('shop_supplier_id', '=', $shop_supplier_id)
                ->select();
            $all = !empty($data) ? $data->toArray() : [];
            Cache::tag('cache')->set('category_cashier_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special, $all);
        }
        return Cache::get('category_cashier_' . $shop_supplier_id . '_' . $model::$app_id . $type . $is_special);
    }

    /**
     * 获取所有分类
     */
    public static function getCacheAll($type, $is_special, $store = '', $name = '')
    {
        return self::getALL($type, $is_special, $store, $name);
    }

    /**
     * 获取所有分类(树状结构)
     */
    public static function getCacheTree($type, $is_special, $store = '', $name = '')
    {
        return self::getALL($type, $is_special, $store, $name);
    }

    /**
     * 获取所有分类(树状结构)
     * @return string
     */
    public static function getCacheTreeJson()
    {
        return json_encode(static::getCacheTree());
    }

    /**
     * 获取指定分类下的所有子分类id
     */
    public static function getSubCategoryId($parent_id, $all = [])
    {
        $arrIds = [$parent_id];
        empty($all) && $all = self::getCacheAll();
        foreach ($all as $key => $item) {
            if ($item['parent_id'] == $parent_id) {
                unset($all[$key]);
                $subIds = self::getSubCategoryId($item['category_id'], $all);
                !empty($subIds) && $arrIds = array_merge($arrIds, $subIds);
            }
        }
        return $arrIds;
    }

    /**
     * 指定的分类下是否存在子分类
     */
    protected static function hasSubCategory($parentId)
    {
        $all = self::getCacheAll();
        foreach ($all as $item) {
            if ($item['parent_id'] == $parentId) {
                return true;
            }
        }
        return false;
    }


    /**
     * 关联图片
     */
    public function image()
    {
        return $this->belongsTo('app\common\model\file\UploadFile', 'image_id', 'file_id');
    }

    /**
     * 获取所有一级分类
     */
    public static function getFirstCategory()
    {
        return self::where('parent_id', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }

    //新增特殊分类
    public function addSpecial($app_id, $shop_supplier_id)
    {
        $data = [
            ['name' => '新品', 'is_special' => 1, 'type' => 0, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
            ['name' => '热卖', 'is_special' => 1, 'type' => 0, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
            ['name' => '套餐', 'is_special' => 1, 'type' => 0, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
            ['name' => '新品', 'is_special' => 1, 'type' => 1, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
            ['name' => '热卖', 'is_special' => 1, 'type' => 1, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
            ['name' => '套餐', 'is_special' => 1, 'type' => 1, 'app_id' => $app_id, 'shop_supplier_id' => $shop_supplier_id],
        ];
        $this->saveAll($data);
    }

    //获取所有分类
    public function getAllCategory($type, $shop_supplier_id, $isSpecial='', $parentId = '')
    {
        $supplier = SupplierModel::detail($shop_supplier_id);
        if ($supplier['is_main'] == 0 && $supplier['category_set'] == 10) {
            $detail = SupplierModel::where('is_main', '=', 1)->find();
            $shop_supplier_id = $detail['shop_supplier_id'];
        }
        $list = $this->where('type', '=', $type)
            ->when($isSpecial !== '',function($q) use($isSpecial) {
                $q->where('is_special', '=', $isSpecial);
            })
            ->when($parentId !== '',function($q) use($parentId) {
                $q->where('parent_id', '=', $parentId);
            })
            ->where('status',1)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order('is_special desc,sort asc')
            ->select();
        return $list;
    }

    /**
     * 获取活跃的所有分类
     */
    public static function getActiveALL($type, $is_special, $store = '', $name = '')
    {
        $user = $store['user'];
        $supplier = $store['supplier'];
        $shop_supplier_id = $supplier['is_main'] == 1 || $supplier['category_set'] == 20
                            ? $user['shop_supplier_id']
                            : SupplierModel::where('is_main', '=', 1)->value('shop_supplier_id');

        $model = new static;
        $query = $model->with(['images', 'child' => function ($query) {
                    $query->where('status', '=', 1);
                }])
                ->where('parent_id', '=', 0)
                ->where('status',1)
                ->where('type', '=', $type)
                ->where('is_special', '=', $is_special)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->where('shop_supplier_id', '=', $shop_supplier_id);

        if ($name) {
            $query = $query->like('name', "%{$name}%");
        }

        $all = $query->select()->toArray();

        if ($is_special == 1 && empty($all)) {
            (new static)->addSpecial($model::$app_id, $shop_supplier_id);
            $all = $query->select()->toArray();
        }

        return $all;
    }
}
