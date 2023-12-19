<?php

namespace app\shop\model\plus\live;

use app\common\library\easywechat\AppWx;
use app\common\model\plus\live\WxProduct as WxProductModel;
use app\common\exception\BaseException;
use EasyWeChat\Kernel\Form\File;
use EasyWeChat\Kernel\Form\Form;

/**
 * 直播商品模型
 */
class WxProduct extends WxProductModel
{
    /**
     *列表
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['status'])) {
            $model = $model->where('audit_status', '=', $params['status']);
        }
        return $model->with(['product'])->where('is_delete', '=', 0)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     *列表
     */
    public function getOnList($params)
    {
        return $this->with(['product'])->where('is_delete', '=', 0)
            ->where('audit_status', '=', 2)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 添加商品
     */
    public function addProduct($data)
    {
        $wxData = [
            'goodsInfo' => [
                'name' => $data['name'],
                'coverImgUrl' => $this->getMediaID($data['cover_img']),
                'priceType' => intval($data['price_type']),
                'price' => round($data['price'], 2),
                'price2' => $data['price2'] ? round($data['price2'], 2) : 0,
                'url' => "pages/plus/group/detail?group_id={$data['product_id']}",
            ]
        ];
        $url = "wxaapi/broadcast/goods/add?access_token=";
        $result = $this->wxCreate($wxData, $url);
        if ($result) {
            $data['app_id'] = self::$app_id;
            $data['goods_id'] = $result['goodsId'];
            $data['audit_id'] = $result['auditId'];
            return $this->save($data);
        } else {
            return false;
        }
    }

    /**
     * 编辑商品
     */
    public function editProduct($data)
    {
        $wxData = [
            'goodsInfo' => [
                'name' => $data['name'],
                'coverImgUrl' => $this->getMediaID($data['cover_img']),
                'priceType' => intval($data['price_type']),
                'price' => round($data['price'], 2),
                'price2' => $data['price2'] ? round($data['price2'], 2) : 0,
                'url' => "pages/plus/group/detail?group_id={$data['product_id']}",
                'goodsId' => $this['goods_id']
            ]
        ];
        $url = "wxaapi/broadcast/goods/update?access_token=";
        $result = $this->wxCreate($wxData, $url);
        if ($result) {
            return $this->save($data);
        } else {
            return false;
        }
    }

    /**
     * 删除商品
     */
    public function delProduct()
    {
        $wxData = [
            'goodsId' => $this['goods_id']
        ];
        $url = "wxaapi/broadcast/goods/delete?access_token=";
        $status = $this->wxCreate($wxData, $url);
        if ($status) {
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
            return $result;
        } else {
            throw new BaseException(['msg' => '操作失败:' . $response['errmsg']]);
        }
    }

    /**
     * 获取微信图片mediaID
     */
    public function getMediaID($url)
    {
        $path = $this->saveTempImage(self::$app_id, $url);
        $app = AppWx::getApp();
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $options = Form::create(
            [
                'media' => File::fromPath($path),
            ]
        )->toArray();
        $response = $api->post("cgi-bin/media/upload?access_token={$token}&type=image", $options);
        if (isset($response['errcode']) && $response['errcode']) {
            @unlink($path);
            throw new BaseException(['msg' => '获取微信mediaID失败:' . $response['errmsg']]);
        } else {
            @unlink($path);
            @unlink($path);
            return $response['media_id'];
        }
    }

    /**
     * 获取网络图片到临时目录
     */
    protected function saveTempImage($app_id, $url, $mark = 'live')
    {
        $dirPath = root_path('public') . "temp/{$app_id}/{$mark}";
        !is_dir($dirPath) && mkdir($dirPath, 0755, true);
        $savePath = $dirPath . '/' . $mark . '_' . md5($url) . '.png';
        if (file_exists($savePath)) return $savePath;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        $img = curl_exec($ch);
        curl_close($ch);
        $fp = fopen($savePath, 'w');
        fwrite($fp, $img);
        fclose($fp);
        return $savePath;
    }
}
