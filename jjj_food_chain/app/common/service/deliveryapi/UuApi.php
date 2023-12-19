<?php

namespace app\common\service\deliveryapi;

use app\common\model\settings\Setting as SettingModel;
use app\common\exception\BaseException;

/**
 * uu跑腿api
 */
class UuApi
{
    private $URL = "";
    private $onURL = 'http://openapi.uupaotui.com/v2_0';  //正式环境
    private $testURL = 'http://openapi.test.uupt.com/v2_0'; //测试环境
    private $api_getcode = '/binduserapply.ashx'; //获取验证码
    private $api_getopenid = '/bindusersubmit.ashx'; //获取openid
    private $api_balance = '/getbalancedetail.ashx';  //获取余额详情
    private $api_recharge = '/getrecharge.ashx';  //充值
    private $api_getorderprice = '/getorderprice.ashx';  //计算订单价格
    private $api_addorder = '/addorder.ashx';   //下单
    private $api_cancelorder = '/cancelorder.ashx';   //取消订单
    private $api_getorderdetail = '/getorderdetail.ashx';   //订单详情
    private $api_getcity = '/getcitylist.ashx';   //订单详情
    /**
     * @var string
     */
    private $appid;

    /**
     * @var string
     */
    private $appkey;

    /**
     * @var string
     */
    private $openid;

    /**
     * @var string
     */
    private $city_name;

    //链接
    public function __construct($shop_supplier_id, $app_id)
    {
        $deliver = SettingModel::getSupplierItem('deliver', $shop_supplier_id, $app_id)['engine']['uu'];
        $this->appid = $deliver['app_id'];
        $this->appkey = $deliver['app_key'];
        $this->openid = $deliver['openid'];
        $this->city_name = $deliver['city_name'];
        $this->URL = $deliver['online'] ? $this->onURL : $this->testURL;

    }

    //获取验证码
    public function getcode($data)
    {
        $path = $this->api_getcode;
        $content = $this->binding($data, $path);
        return $content;
    }

    //获取openid
    public function getopenid()
    {
        $data['app_id'] = $this->appid;
        $path = $this->api_getopenid;
        $content = $this->binding($data, $path);
        return $content;
    }

    //绑定商家公用请求方法
    public function binding($data, $path)
    {
        header("Content-type: text/html; charset=utf-8");
        $data['timestamp'] = time();
        $data['nonce_str'] = $this->randomkeys(32);
        $data['sign'] = $this->sign($data);
        $content = $this->request_post($path, $data);
        return $content;
    }

    //获取余额详情
    public function getbalance($data)
    {
        $path = $this->api_balance;
        $content = $this->uu_request($data, $path);
        return $content;
    }

    //充值
    public function recharge($data)
    {
        $path = $this->api_recharge;
        $content = $this->uu_request($data, $path);
        return $content;
    }

    //订单价格
    public function getorderprice($info)
    {
        $data['origin_id'] = $info['order_no'];
        $data['from_address'] = $info['supplier']['address'];
        $data['to_address'] = $info['address']['detail'] . $info['address']['address'];
        $data['city_name'] = $this->city_name;
        $data['send_type'] = '0';
        $data['to_lat'] = $info['address']['latitude'];
        $data['to_lng'] = $info['address']['longitude'];
        $data['from_lat'] = $info['supplier']['latitude'];
        $data['from_lng'] = $info['supplier']['longitude'];
        $data['openid'] = $this->openid;
        $data['appid'] = $this->appid;
        $path = $this->api_getorderprice;
        $content = $this->uu_request($data, $path);
        return $content;
    }

    //下单
    public function addOrder($info)
    {
        $result = $this->getorderprice($info);
        if ($result['return_code'] != "ok") {
            throw new BaseException(['msg' => $result['return_msg']]);
        }
        $data['price_token'] = $result['price_token'];
        $data['order_price'] = $result['total_money'];
        $data['balance_paymoney'] = $result['need_paymoney'];
        $data['receiver'] = $info['address']['name'];
        $data['receiver_phone'] = $info['address']['phone'];
        $data['callback_url'] = base_url() . '/index.php/job/notify/uu_notify';//回调地址
        $data['push_type'] = 2;//推送方式（0 开放订单，2测试订单）默认传0即可
        $data['special_type'] = 0;//特殊处理类型，是否需要保温箱 1需要 0不需要
        $data['callme_withtake'] = 0;//取件是否给我打电话 1需要 0不需要
        $data['openid'] = $this->openid;
        $data['appid'] = $this->appid;
        $path = $this->api_addorder;
        $res = $this->uu_request($data, $path);
        $res['distance'] = $result['distance'];
        $res['total_money'] = $result['total_money'];
        return $res;
    }

    //取消订单
    public function cancelorder($params)
    {
        $data['origin_id'] = $params['order_no'];
        $data['order_code'] = $params['client_id'];
        $data['reason'] = $params['cancel_reason'];
        $data['openid'] = $this->openid;
        $data['appid'] = $this->appid;
        $path = $this->api_cancelorder;
        $res = $this->uu_request($data, $path);
        return $res;
    }

    //订单详情
    public function getorderdetail($data)
    {
        $path = $this->api_getorderdetail;
        $content = $this->uu_request($data, $path);
        return $content;
    }

    //获取已开通的城市列表
    public function getcitylist()
    {
        $data['openid'] = $this->openid;
        $data['appid'] = $this->appid;
        $path = $this->api_getcity;
        $content = $this->uu_request($data, $path);
        return $content;
    }

    //公共请求方法
    private function uu_request($data, $path)
    {
        $data = array_merge($data, [
            'nonce_str' => $this->randomkeys(32),
            'timestamp' => time(),
        ]);
        $data['sign'] = $this->sign($data);
        $content = $this->request_post($path, $data);
        return $content;
    }

    private function request_post($url = '', $post_data = array())
    {
        if (empty($url) || empty($post_data)) {
            return false;
        }
        $url = $this->URL . $url;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $data = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($data, true);
        return $data;
    }

    // 生成随机字符串
    private function randomkeys($length)
    {
        $pattern = '1234567890abcdefghijklmnopqrstuvwxyz
                   ABCDEFGHIJKLOMNOPQRSTUVWXYZ,./&l
                  t;>?;#:@~[]{}-_=+)(*&^%$?!';    //字符池
        $key = '';
        for ($i = 0; $i < $length; $i++) {
            $key .= $pattern{mt_rand(0, 35)};    //生成php随机数
        }
        return $key;
    }

    // 生成签名
    private function sign($data)
    {
        ksort($data);
        $arr = '';
        foreach ($data as $key => $value) {
            $arr .= $key . '=' . $value . '&';
        }
        $arr .= 'key=' . $this->appkey;
        $str = strtoupper($arr);
        return strtoupper(md5($str));
    }

}