<?php


namespace app\shop\model\plus\discount;

use app\common\model\plus\discount\Discount as DiscountModel;

/**
 * 第二件折扣模型
 */
class Discount extends DiscountModel
{
    //修改
    public function edit($data, $shop_supplier_id)
    {
        $this->startTrans();
        try {
            $detail = self::detail($shop_supplier_id);
            if ($detail) {
                $model = $detail;
            } else {
                $model = $this;
                $data['app_id'] = self::$app_id;
            }
            $data['start_time'] = strtotime($data['time'][0]);
            $data['end_time'] = strtotime($data['time'][1]);
            $data['shop_supplier_id'] = $shop_supplier_id;
            $model->save($data);
            $this->addProduct($data, $model['discount_id'], $data['discount_product_ids']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }

    }

    //添加商品
    public function addProduct($data, $discount_id, $discount_product_ids)
    {
        $product = json_decode($data['product'], 1);
        $discount_product_ids && $this->product()->where('discount_product_id', 'in', $discount_product_ids)->update(['is_delete' => 1]);
        $products = array_map(function ($product) use ($discount_id) {
            return [
                'app_id' => self::$app_id,
                'discount_id' => $discount_id,
                'product_type' => $product['product_type'],
                'stock' => $product['stock'],
                'product_id' => $product['product_id'],
                'discount' => $product['discount'],
                'discount_product_id' => isset($product['discount_product_id']) ? $product['discount_product_id'] : 0,
            ];
        }, $product);
        $this->product()->saveAll($products);
    }
}