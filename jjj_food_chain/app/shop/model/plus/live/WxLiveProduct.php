<?php

namespace app\shop\model\plus\live;

use app\common\library\easywechat\AppWx;
use app\common\model\plus\live\WxLiveProduct as WxLiveProductModel;
use app\common\exception\BaseException;

/**
 * 直播商品模型
 */
class WxLiveProduct extends WxLiveProductModel
{
    /**
     *列表
     */
    public function getList($params)
    {
        return $this->with(['product'])
            ->where('roomid', '=', $params['room_id'])
            ->where('is_delete', '=', 0)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     *添加直播间商品
     */
    public function addLiveProduct($data)
    {
        if (empty($data['productIds'])) {
            $this->error = '请选择商品';
        }
        $wxData = [
            'ids' => $data['productIds'],
            'roomId' => $data['room_id']
        ];
        $url = "wxaapi/broadcast/room/addgoods?access_token=";
        $result = $this->wxCreate($wxData, $url);
        if ($result) {
            $product = [];
            foreach ($data['productIds'] as $item) {
                $product[] = [
                    'live_id' => $data['live_id'],
                    'roomid' => $data['room_id'],
                    'on_sale' => 1,
                    'goods_id' => $item,
                    'app_id' => self::$app_id,
                ];
            }
            $product && $this->saveAll($product);
            return true;
        } else {
            return false;
        }
    }

    /**
     *推送直播间商品
     */
    public function pushProduct()
    {
        $wxData = [
            'roomId' => $this['roomid'],
            'goodsId' => $this['goods_id']
        ];
        $url = "wxaapi/broadcast/goods/push?access_token=";
        $result = $this->wxCreate($wxData, $url);
        if ($result) {
            return $this->save(['is_push' => 1]);
        } else {
            return false;
        }
    }

    /**
     *上下架直播间商品
     */
    public function onsaleProduct($data)
    {
        $wxData = [
            'roomId' => $this['roomid'],
            'goodsId' => $this['goods_id'],
            'onSale' => $data['on_sale']
        ];
        $url = "wxaapi/broadcast/goods/onsale?access_token=";
        $result = $this->wxCreate($wxData, $url);
        if ($result) {
            return $this->save(['on_sale' => $data['on_sale']]);
        } else {
            return false;
        }
    }

    /**
     *删除直播间商品
     */
    public function delProduct()
    {
        $wxData = [
            'roomId' => $this['roomid'],
            'goodsId' => $this['goods_id'],
        ];
        $url = "wxaapi/broadcast/goods/deleteInRoom?access_token=";
        $result = $this->wxDelProduct($wxData, $url);
        if ($result) {
            return $this->save(['is_delete' => 1]);
        } else {
            return false;
        }
    }


    /**
     * 微信操作
     */
    private function wxCreate($data, $url)
    {
        $app = AppWx::getApp();
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $response = $api->post($url . $token, $data);
        $result = $response->getContent();
        $result = json_decode($result, true);
        if (isset($result['errcode']) && $result['errcode'] == 0) {
            return true;
        } else {
            throw new BaseException(['msg' => '操作失败:' . $response['errmsg']]);
        }
    }

    /*
     * 获取排除id
     */
    public function getExcludeIds($roomid)
    {
        // 获取列表数据
        return $this->where('roomid', '=', $roomid)
            ->where('is_delete', '=', 0)
            ->column('goods_id');
    }
}
