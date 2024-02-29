<?php

namespace app\shop\model\buffet;

use app\common\model\buffet\Buffet as BuffetModel;

/**
 * 自助餐模型
 */
class Buffet extends BuffetModel
{
    /**
     * 获取自助餐详情
     */
    public static function detail($buffet_id)
    {
        return self::with(['buffetProducts', 'buffetLimitProducts'])->find($buffet_id);
    }

    /**
     * 获取自助餐列表
     */
    public function getShopBuffetList($params)
    {
        $model = $this;
        // 名称
        if (isset($params['name']) && $params['name'] != '') {
            $model = $model->like('name', $params['name']);
        }
        // 状态
        if (isset($params['status']) && $params['status'] > -1) {
            $model = $model->where('status', (int)$params['status']);
        }
        // 查询列表数据
        $list = $model->with(['buffetProducts', 'buffetLimitProducts'])
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($params);
        foreach ($list as &$item) {
           $item['can_delete'] = $this->getCanDelete($item);
        }
        return $list;
    }

    /**
     * 添加自助餐
     */
    public function add($data)
    {
        $data['name'] = $data['name'] ?? ''; // 自助餐名称
        $data['sort'] = $data['sort'] ?? 0; // 排序
        $data['price'] = $data['price'] ?? 0; // 价格
        $data['time_limit'] = $data['time_limit'] ?? 0; // 用餐时间
        $data['is_time_limit'] = $data['is_time_limit'] ?? 0; // 是否开启不限制时间 0-否 1-是
        $data['time_limit'] = $data['is_time_limit'] == 1 ? $data['time_limit'] : 0;
        $data['status'] = $data['status'] ?? 0; // 状态 0-未开启 1-已开启
        $data['is_comb'] = $data['is_comb'] ?? 0; // 是否组合 0-否 1-是
        $data['buy_limit_status'] = $data['buy_limit_status'] ?? 0; // 是否限购 0-否 1-是

        if(hasEmptyValue($data['name'])){
            $this->error = '请输入自助餐名称';
            return false;
        }

        // 如果开启组合产品，则必须填写组合产品
        if ($data['is_comb'] == 1 && ($data['product_ids'] ?? '') == '') {
            $this->error = '请选择组合产品';
            return false;
        }
        $productIds = explode(',', $data['product_ids']);

        // 如果开启限购，则必须填写限购数量
        if ($data['buy_limit_status'] == 1 && ($data['buy_limit_products'] ?? []) == []) {
            $this->error = '请输入限购数量';
            return false;
        }
        $buyLimitProducts = $data['buy_limit_status'] == 1 ? $data['buy_limit_products'] : [];
        // 验证副数据
        if (is_array($buyLimitProducts)) {
            $newBuyLimitProducts = [];
            foreach ($buyLimitProducts as &$limitProduct) {
                // 处理负数
                $limitProduct = $this->sanitizeFormData(['limit_num'], $limitProduct);
                // 处理范围值
                if ($text = $this->alertFormData($limitProduct)) {
                    $this->error = $text;
                    return false;
                }
                $newBuyLimitProducts[$limitProduct['product_id']] = $limitProduct;
            }
            unset($limitProduct);
            $buyLimitProducts = $newBuyLimitProducts;
        }

        // 验证主数据
        if (is_array($data)) {
            // 处理负数
            $data = $this->sanitizeFormData(['price', 'time_limit', 'sort'], $data);
            // 处理范围值
            if ($text = $this->alertFormData($data)) {
                $this->error = $text;
                return false;
            }
        }

        // 开启事务
        $this->startTrans();
        try {
            $data['app_id'] = self::$app_id;
            $this->save($data);
            // 新增自助餐关联产品
            $this->updateBuffetProduct($productIds, $buyLimitProducts);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 编辑自助餐
     */
    public function edit($data)
    {
        $data['name'] = $data['name'] ?? ''; // 自助餐名称
        $data['sort'] = $data['sort'] ?? 0; // 排序
        $data['price'] = $data['price'] ?? 0; // 价格
        $data['time_limit'] = $data['time_limit'] ?? 0; // 用餐时间
        $data['is_time_limit'] = $data['is_time_limit'] ?? 0; // 是否开启不限制时间 0-否 1-是
        $data['time_limit'] = $data['is_time_limit'] == 1 ? $data['time_limit'] : 0;
        $data['status'] = $data['status'] ?? 0; // 状态 0-未开启 1-已开启
        $data['is_comb'] = $data['is_comb'] ?? 0; // 是否组合 0-否 1-是
        $data['buy_limit_status'] = $data['buy_limit_status'] ?? 0; // 是否限购 0-否 1-是

        if(hasEmptyValue($data['name'])){
            $this->error = '请输入自助餐名称';
            return false;
        }

        // 如果开启组合产品，则必须填写组合产品
        if ($data['is_comb'] == 1 && ($data['product_ids'] ?? '') == '') {
            $this->error = '请选择组合产品';
            return false;
        }
        $productIds = explode(',', $data['product_ids']);

        // 如果开启限购，则必须填写限购数量
        if ($data['buy_limit_status'] == 1 && ($data['buy_limit_products'] ?? []) == []) {
            $this->error = '请输入限购数量';
            return false;
        }
        $buyLimitProducts = $data['buy_limit_status'] == 1 ? $data['buy_limit_products'] : [];
        // 验证副数据
        if (is_array($buyLimitProducts)) {
            $newBuyLimitProducts = [];
            foreach ($buyLimitProducts as &$limitProduct) {
                // 处理负数
                $limitProduct = $this->sanitizeFormData(['limit_num'], $limitProduct);
                // 处理范围值
                if ($text = $this->alertFormData($limitProduct)) {
                    $this->error = $text;
                    return false;
                }
                $newBuyLimitProducts[$limitProduct['product_id']] = $limitProduct;
            }
            unset($limitProduct);
            $buyLimitProducts = $newBuyLimitProducts;
        }

        // 验证主数据
        if (is_array($data)) {
            // 处理负数
            $data = $this->sanitizeFormData(['price', 'time_limit', 'sort'], $data);
            // 处理范围值
            if ($text = $this->alertFormData($data)) {
                $this->error = $text;
                return false;
            }
        }

        // 开启事务
        $this->startTrans();
        try {
            $this->save($data);
            // 新增自助餐关联产品
            $this->updateBuffetProduct($productIds, $buyLimitProducts);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 新增自助餐关联产品
     */
    private function updateBuffetProduct($productIds, $buyLimitProducts)
    {
        $buffetProducts = new BuffetProduct;
        $buffetProducts->where('buffet_id', $this['id'])->delete();
        // 新增关联产品
        $data = [];
        foreach ($productIds as $id) {
            $data[] = [
                'buffet_id' => $this['id'],
                'product_id' => $id,
                'limit_num' => $buyLimitProducts[$id]['limit_num'] ?? 0,
                'app_id' => self::$app_id,
            ];
        }
        $buffetProducts->saveAll($data);
    }

    /**
     * 设置自助餐组合
     */
    public function setComb($is_comb)
    {
        return $this->save(['is_comb' => (int)$is_comb]);
    }

    /**
     * 设置自助餐状态
     */
    public function setStatus($state)
    {
        return $this->save(['status' => (int)$state]);
    }

    /**
     * 删除自助餐-软删除
     */
    public function setDelete()
    {
        if ($this->getCanDelete($this)) {
            $this->error = '自助餐正在使用中，不可删除';
            return false;
        }
        return $this->destroy(['id' => $this['id']]);
    }

    /**
     * 处理数据超过范围值时，返回提示信息
     */
    private function alertFormData($data)
    {
        $limits = [
            'price' => ['range' => [0, 1000000], 'message' => '价格必须在0到1000000之间'],
            'time_limit' => ['range' => [0, 999], 'message' => '用餐时间必须在0到999之间'],
            'sort' => ['range' => [0, 999], 'message' => '排序必须在0到999之间'],
            'limit_num' => ['range' => [1, 999], 'message' => '限购数量必须在1到999之间'],
        ];
        foreach ($limits as $key => $value) {
            if (array_key_exists($key, $data) && ($data[$key] < $value['range'][0] || $data[$key] > $value['range'][1])) {
                return $value['message'];
            }
        }
        return '';
    }

    /**
     * 处理数据为负数时，自动转换为0
     */
    private function sanitizeFormData($keys, $data) {
        foreach ($keys as $key) {
            if (array_key_exists($key, $data)) {
                $data[$key] = max(0, $data[$key]);
            }
        }
        return $data;
    }
}