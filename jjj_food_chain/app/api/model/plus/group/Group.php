<?php

namespace app\api\model\plus\group;

use app\api\model\supplier\Supplier as SupplierModel;
use app\common\model\plus\group\Group as GroupModel;
use app\api\model\settings\Setting as SettingModel;
use app\common\library\helper;

/**
 * 团购模型
 */
class Group extends GroupModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [];

    /**
     * 商品详情：HTML实体转换回普通字符
     */
    public function getContentAttr($value)
    {
        return htmlspecialchars_decode($value);
    }

    /**
     * 获取团购列表
     */
    public function getList($param, $sort = "")
    {
        $model = $this;
        if (isset($param['search']) && $param['search']) {
            $model = $model->like('group_name', $param['search']);
        }
        $orderSort = ['group_sort' => 'asc', 'create_time' => 'desc'];
        if ($sort) {
            if ($sort == 'sales') {
                $orderSort = ['product_sales' => 'desc'];
            } elseif ($sort == 'price') {
                $orderSort = ['group_price' => 'desc'];
            }
        }
        $list = $model->with(['image.file'])
            ->where(function ($query) {
                $query->where('expire_type', '=', 10)
                    ->where('group_status', '=', 1)
                    ->where('is_delete', '=', 0);
            })
            ->whereOr(function ($query) {
                $query->where('expire_type', '=', 20)
                    ->where('start_time', '<', time())
                    ->where('end_time', '>', time())
                    ->where('group_status', '=', 1)
                    ->where('is_delete', '=', 0);
            })
            ->field("*,(sales_initial + sales_actual) as product_sales")
            ->order($orderSort)
            ->paginate($param);
        return $list;
    }

    /**
     * 团购详情
     */
    public function getDetail($param)
    {
        //团购详情
        $detail = self::detail($param['group_id']);
        $setting = SettingModel::getItem('group');
        $detail['explain'] = $setting['explain'];
        //查询适用门店
        if ($detail['suit_type'] == 10) {//全部门店
            $supplier = (new SupplierModel)->where('is_recycle', '=', 0)
                ->where('is_delete', '=', 0)
                ->field("link_phone,store_time,shop_supplier_id,name,logo,longitude,latitude,6378.137*2*ASIN(SQRT(POW(SIN(({$param['latitude']} * PI()/180-latitude*PI()/180)/2),2) + COS({$param['latitude']}*PI()/180)*COS(latitude*PI()/180)*POW(SIN(({$param['longitude']} * PI()/180-longitude*PI()/180)/2),2)))*1000 AS distance")
                ->order(['distance' => 'asc', 'create_time' => 'desc'])
                ->find();
            $detail['supplier'] = $supplier;
            $detail['supplierCount'] = (new SupplierModel)->where('is_recycle', '=', 0)
                ->where('is_delete', '=', 0)
                ->count();
        } else {
            $supplier = (new SupplierModel)
                ->where('shop_supplier_id', 'in', $detail['shop_supplier_id'])
                ->where('is_recycle', '=', 0)
                ->where('is_delete', '=', 0)
                ->field("store_time,shop_supplier_id,name,logo,longitude,latitude,6378.137*2*ASIN(SQRT(POW(SIN(({$param['latitude']} * PI()/180-latitude*PI()/180)/2),2) + COS({$param['latitude']}*PI()/180)*COS(latitude*PI()/180)*POW(SIN(({$param['longitude']} * PI()/180-longitude*PI()/180)/2),2)))*1000 AS distance")
                ->order(['distance' => 'asc', 'create_time' => 'desc'])
                ->find();
            $detail['supplier'] = $supplier;
            $detail['supplierCount'] = (new SupplierModel)->where('shop_supplier_id', 'in', $detail['shop_supplier_id'])
                ->where('is_recycle', '=', 0)
                ->where('is_delete', '=', 0)
                ->count();
        }
        return $detail;
    }

    //所有店铺列表
    public function supplierList($param)
    {
        $detail = self::detail($param['group_id']);
        $model = new SupplierModel;
        if ($detail['suit_type'] == 20) {//部分门店
            $model = $model->where('shop_supplier_id', 'in', $detail['shop_supplier_id']);
        }
        // 查询列表数据
        $list = $model->alias('s')
            ->where('is_recycle', '=', 0)
            ->where('s.is_delete', '=', '0')
            ->field("link_phone,is_main,delivery_time,pick_time,store_time,s.shop_supplier_id,s.name,logo,status,store_type,address,longitude,latitude,6378.137*2*ASIN(SQRT(POW(SIN(({$param['latitude']} * PI()/180-latitude*PI()/180)/2),2) + COS({$param['latitude']}*PI()/180)*COS(latitude*PI()/180)*POW(SIN(({$param['longitude']} * PI()/180-longitude*PI()/180)/2),2)))*1000 AS distance")
            ->order(['distance' => 'asc', 'create_time' => 'desc'])
            ->paginate($param);
        foreach ($list as &$supplier) {
            if ($supplier['distance'] >= 1000) {
                $distance = bcdiv($supplier['distance'], 1000, 2);
                $supplier['distance'] = $distance . 'km';
            } else {
                $supplier['distance'] = round($supplier['distance'], 2) . 'm';
            }

        }
        return $list;
    }

    //更新销量
    public function updateSales($productList)
    {
        $productData = [];
        foreach ($productList as $product) {
            // 记录商品的销量
            $product_data = [
                'data' => ['sales_actual' => ['inc', $product['total_num']]],
                'where' => [
                    'group_id' => $product['group_id']
                ],
            ];
            $productData[] = $product_data;
        }
        $this->updateAll($productData);
    }

    //扣除销量
    public function reduceSales($productList)
    {
        $productData = [];
        foreach ($productList as $product) {
            // 记录商品的销量
            $product_data = [
                'data' => ['sales_actual' => ['dec', $product['total_num']]],
                'where' => [
                    'group_id' => $product['group_id']
                ],
            ];
            $productData[] = $product_data;
        }
        $this->updateAll($productData);
    }
}