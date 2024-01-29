<?php

namespace app\shop\service;

use app\common\service\product\BaseProductService;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\product\Attribute as AttributeModel;
use app\shop\model\product\Label as LabelModel;
use app\shop\model\product\Unit as UnitModel;
use app\shop\model\product\Spec as SpecModel;
use app\shop\model\product\Feed as FeedModel;
use app\shop\model\user\Grade as GradeModel;
use app\common\model\plus\agent\Setting as AgentSetting;

/**
 * 商品服务类
 */
class ProductService extends BaseProductService
{
    /**
     * 商品管理公共数据
     */
    public static function getEditData($type, $store)
    {
        // 商品分类
        $category = CategoryModel::getCacheTree($type, 0, $store);
        // 属性
        $attribute = (new AttributeModel)->getAllList($store['user']['shop_supplier_id']);
        // 加料
        $feed = (new FeedModel)->getAllList($store['user']['shop_supplier_id']);
        // 单位
        $unit = (new UnitModel)->getAllList($store['user']['shop_supplier_id']);
        // 规格
        $spec = (new SpecModel)->getAllList($store['user']['shop_supplier_id']);
        // 打印标签
        $labelList = (new LabelModel)->getAllList($store['user']['shop_supplier_id']);
        // 特殊分类
        $special = CategoryModel::getCacheTree($type, 1, $store);
        // 会员等级列表
        $gradeList = GradeModel::getUsableList();
        // 平台分销规则
        $basicSetting = AgentSetting::getItem('basic');
        return compact('attribute', 'feed', 'unit', 'spec', 'special', 'category', 'gradeList', 'basicSetting', 'labelList');
    }
}