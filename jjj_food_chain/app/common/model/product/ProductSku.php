<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
use app\common\model\erp\ErpPurchaseDetail;

/**
 * 商品SKU模型
 */
class ProductSku extends BaseModel
{
    protected $name = 'product_sku';
    protected $pk = 'product_sku_id';

    /**
     * 处理多语言
     */
    protected $append = ['spec_name_text'];
    public function getSpecNameTextAttr($value, $data)
    {
        return extractLanguage($data['spec_name']);
    }

    /**
     * 隐藏字段
     */
    protected $hidden = [
        // 'create_time',
        // 'update_time',
    ];

    /**
     * 规格图片
     */
    public function image()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'image_id');
    }

    /**
     * 关联产品
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id')->with(['image', 'image.file', 'erpSupplier', 'erpSupplier.purchaser']);
    }

    /**
     * 产品规格关联材料（一对一）
     */
    public function material()
    {
        return $this->hasOne(ProductSkuMaterial::class, 'product_sku_id')->with(['materialProduct']);
    }

    /**
     * 通过规格获取商品SKU列表
     */
    public static function getSkuProductList($params)
    {
        $model = new ProductSku();
        $model = $model->alias('ps')
            ->field('ps.*, p.category_id, p.erp_supplier_id')
            ->join('product p', 'p.product_id = ps.product_id')
            ->with(['product' => function ($query) use ($params) {
                $query->with(['image', 'image.file', 'category', 'erpSupplier', 'erpSupplier.purchaser']);
            }]);
        // 规格库存
        if (isset($params['stock_num']) && $params['stock_num'] > 0) {
            $model = $model->where('ps.stock_num', '<', $params['stock_num']);
        }
        // 规格库存排序
        if (isset($params['sort']) && $params['sort'] == 'asc') {
            $model = $model->order('ps.stock_num', 'asc');
        } else {
            $model = $model->order('ps.stock_num', 'desc');
        }
        // 类型
        if (isset($params['type']) && $params['type'] > 0) {
            $model->where('p.type', '=', $params['type']);
        }
        // 状态
        if (isset($params['product_status']) && $params['product_status'] > 0) {
            $model->where('p.product_status', '=', $params['product_status']);
        }
        // 分类
        if (isset($params['category_id']) && $params['category_id'] > 0) {
            $categoryIds =  Category::getSubCategoryId($params['category_id']);
            $model->where('p.category_id', 'IN', $categoryIds);
        }
        // 商品名称
        if (isset($params['product_name']) && $params['product_name'] != '') {
            $model->like('p.product_name', trim($params['product_name']));
        }
        $list = $model->paginate($params);
        foreach ($list as &$item) {
            // 历史进货数
            $item['history_purchase_num'] = (new ErpPurchaseDetail())->sumActualPurchaseNum($item['product_sku_id']);
            // 历史报损数
            $item['historical_loss_num'] = (new ErpPurchaseDetail())->sumActualPurchaseNum($item['product_sku_id']);
        }
        return $list;
    }

    /**
     * 获取sku信息详情
     */
    public static function detail($productId, $specSkuId)
    {
        return static::where('product_id', '=', $productId)
            ->where('spec_sku_id', '=', $specSkuId)->find();
    }

    /**
     * 获取sku信息详情
     */
    public static function getDetailSku($productId, $productSkuId)
    {
        return static::where('product_id', '=', $productId)
            ->where('product_sku_id', '=', $productSkuId)->find();
    }
}
