<?php

namespace app\job\model\plus\live;

use app\common\library\easywechat\AppWx;
use app\common\model\plus\live\WxProduct as WxProductModel;
use think\facade\Cache;

/**
 * 直播商品模型
 */
class WxProduct extends WxProductModel
{
    /**
     * 同步直播间商品
     */
    public function synProduct($app_id)
    {
        $this->startTrans();
        try {
            $response = $this->getProduct($app_id);
            $product = [];
            $goods_id = [];
            if ($response) {
                foreach ($response['goods'] as $item) {
                    $product[] = [
                        'data' => [
                            'audit_status' => $item['audit_status'],
                        ],
                        'where' => [
                            'goods_id' => $item['goods_id'],
                        ],
                    ];
                    $goods_id[] = $item['goods_id'];
                }
            }
            // 批量更新直播商品
            $this->updateAll($product);
            //删除直播商品
            $delGoods = array_diff($goods_id, $response['goods_ids']);
            $delGoods && $this->where('goods_id', 'in', $delGoods)->update(['is_delete' => 1]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->error = '同步直播商品失败,错误信息' . $e->getMessage();
            return false;
        }
    }

    /**
     * 获取直播商品
     */
    public function getProduct($app_id)
    {
        $page = Cache::get('wxLiveProduct');
        if (!$page) {
            $page = 1;
        }
        $total = $this->where('audit_status', 'in', '0,1')
            ->where('is_delete', '=', 0)
            ->where('app_id', '=', $app_id)
            ->count();
        $pageSize = 20;
        $totalPage = ceil($total / $pageSize);
        $nextPage = $page + 1;
        if ($nextPage <= $totalPage) {
            Cache::set('wxLiveProduct', $nextPage);
        } else {
            Cache::delete('wxLiveProduct');
        }
        $goods_id = $this->where('audit_status', 'in', '0,1')
            ->where('is_delete', '=', 0)
            ->where('app_id', '=', $app_id)
            ->page($page, $pageSize)
            ->column('goods_id');
        $data = [
            'goods_ids' => $goods_id,
        ];
        $app = AppWx::getApp($app_id);
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $response = $api->postJson("wxa/business/getgoodswarehouse?access_token={$token}", $data);
        $result = $response->getContent();
        $result = json_decode($result, true);
        if (isset($result['errcode']) && $result['errcode'] == 0 && isset($result['goods'])) {
            $result['goods_ids'] = $goods_id;
            return $result;
        } else {
            log_write("同步直播商品失败" . $response['errmsg'], 'task');
        }
    }

}
