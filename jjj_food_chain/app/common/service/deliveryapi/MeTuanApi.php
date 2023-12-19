<?php

namespace app\common\service\deliveryapi;

use app\common\model\settings\Setting as SettingModel;
use app\common\exception\BaseException;

/**
 * 美团配送api
 */
class MeTuanApi
{
    /**
     * @var string
     */
    private $appKey;

    /**
     * @var string
     */
    private $secret;

    /**
     * @var string
     */
    private $shop_id;

    protected $Api = 'https://peisongopen.meituan.com/api/';

    public function __construct($shop_supplier_id, $app_id)
    {
        $deliver = SettingModel::getSupplierItem('deliver', $shop_supplier_id, $app_id)['engine']['meituan'];
        $this->appKey = $deliver['app_key'];
        $this->secret = $deliver['app_secret'];
        $this->shop_id = $deliver['shop_id'];
    }

    /**
     * @param string $method
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function request($url, $params)
    {
        $params = array_merge($params, [
            'appkey' => $this->appKey,
            'timestamp' => time(),
            'version' => '1.0',
        ]);
        $params['sign'] = $this->signature($params);
        $result = self::http_post($this->Api . $url, $params);
        return $result;
    }

    /**
     * 订单创建(门店方式)
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function createByShop($info)
    {
        $data['delivery_id'] = $info['order_id'];
        $data['order_id'] = $info['order_no'];
        $data['outer_order_source_desc'] = '202';
        $data['shop_id'] = $this->shop_id;
        $data['delivery_service_code'] = '4012';
        $data['receiver_name'] = $info['address']['name'];
        $data['receiver_address'] = $info['address']['detail'] . $info['address']['address'];
        $data['receiver_phone'] = $info['address']['phone'];
        $data['receiver_lng'] = $info['address']['longitude'] * 1000000;
        $data['receiver_lat'] = $info['address']['latitude'] * 1000000;
        $data['coordinate_type'] = 0;
        $data['goods_value'] = $info['pay_price'];
        $data['goods_weight'] = 0.2;//kg
        $data['pay_type_code'] = 1;//支付方式，0、账期支付，1、余额支付；
        return $this->request('order/createByShop', $data);
    }

    /**
     * 查询订单状态
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function queryStatus(array $params)
    {
        return $this->request('order/status/query', $params);
    }

    /**
     * 订单创建(送货分拣方式)
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function createByCoordinates(array $params)
    {
        return $this->request('order/createByCoordinates', $params);
    }

    /**
     * 删除订单
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function delete($params)
    {
        $data['delivery_id'] = $params['order_id'];
        $data['mt_peisong_id'] = $params['client_id'];
        $data['cancel_reason_id'] = 101;
        $data['cancel_reason'] = $params['cancel_reason'];
        return $this->request('order/delete', $data);
    }

    /**
     * 评价骑手
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function evaluate(array $params)
    {
        return $this->request('order/evaluate', $params);
    }

    /**
     * 配送能力校验
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function check(array $params)
    {
        return $this->request('order/check', $params);
    }

    /**
     * 获取骑手当前位置
     *
     * @param array $params
     * @return mixed
     * @throws DispatchException
     */
    public function location(array $params)
    {
        return $this->request('order/rider/location', $params);
    }

    public function signature(array $params)
    {
        ksort($params);

        $waitSign = '';
        foreach ($params as $key => $item) {
            if ($item) {
                $waitSign .= $key . $item;
            }
        }

        return strtolower(sha1($this->secret . $waitSign));
    }

    /**
     * @param $result
     * @throws DispatchException
     */
    public function checkErrorAndThrow($result)
    {
        if (!$result || $result['code'] != 0) {
            throw new BaseException(['msg' => $result['message']]);
        }
    }

    /**
     * POST 请求
     * @param string $url
     * @param array $param
     * @param boolean $post_file 是否文件上传
     * @return string content
     */
    private function http_post($url, $param, $post_file = false)
    {
        if (is_string($param) || $post_file) {
            $post_data = $param;
        } else {
            $post_data = '';
            foreach ($param as $key => $val) {
                if ($key == "timestamp") {
                    $post_data .= 'amp;' . $key . '=' . urlencode($val) . '&';
                } else {
                    $post_data .= $key . '=' . urlencode($val) . '&';
                }
            }
            $post_data = substr($post_data, 0, -1);
        }
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检测
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Expect:'
        )); // 解决数据包大不能提交
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $sContent = curl_exec($curl);
        $aStatus = curl_getinfo($curl);
        curl_close($curl);
        if (intval($aStatus["http_code"]) == 200) {
            return json_decode($sContent, true);
        } else {
            return false;
        }
    }

}