<?php

namespace app\common\library\alipay;

use app\api\service\order\paysuccess\type\PayTypeSuccessFactory;
use app\common\enum\order\OrderTypeEnum;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\settings\SettingEnum;
use app\common\exception\BaseException;
use app\common\library\helper;
use app\common\model\app\App as AppModel;
use app\common\model\settings\Setting;
use Alipay\EasySDK\Kernel\Factory;
use Alipay\EasySDK\Kernel\Config;

/**
 * 支付宝支付
 */
class AliPay
{
    // app_id
    public $app_id = '';
    // 支付宝公钥
    public $publicKey = '';
    // 应用私钥
    public $privateKey = '';

    /**
     * 构造函数
     */
    public function __construct($app_id = null)
    {
        $this->init($app_id);
    }

    public function init($app_id)
    {
        // 获取配置
        $config = AppModel::detail($app_id);
        if($config != null){
            $this->app_id = $config['alipay_appid'];
            $this->privateKey = $config['alipay_privatekey'];
            $this->publicKey = $config['alipay_publickey'];
        }
    }

    private function getOptions($notify_url = '')
    {
        $options = new Config();
        $options->protocol = 'https';
        $options->gatewayHost = 'openapi.alipay.com';
        $options->signType = 'RSA2';
        $options->appId = $this->app_id;
        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        $options->merchantPrivateKey = $this->privateKey;
        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        $options->alipayPublicKey = $this->publicKey;
        $options->notifyUrl = $notify_url;
        return $options;
    }

    public function auth($param)
    {
        try {
            $result = Factory::setOptions($this->getOptions())::base()->oauth()->getToken($param['code']);
            return $result->userId;
        } catch (\Exception $e) {
            echo "调用失败，" . $e->getMessage() . PHP_EOL;;
            return 0;
        }
    }

    /**
     * 统一下单API
     */
    public function unifiedorder($order_no, $totalFee, $orderType, $pay_source, $alipay_id = '')
    {
        // 小程序
        if ($pay_source == 'alipay') {
            $notify_url = base_url() . 'index.php/job/notify/alipay_notify?order_type=' . $orderType . '&pay_source=' . $pay_source;
            $result = Factory::setOptions($this->getOptions($notify_url))->payment()->common()->create("订单支付", $order_no, helper::number2($totalFee), $alipay_id);
            return $result->tradeNo;
        } else {
            //请求参数
            $requestConfigs = array(
                'out_trade_no' => $order_no,
                'product_code' => 'QUICK_WAP_WAY',
                'total_amount' => helper::number2($totalFee), //单位 元
                'subject' => '订单支付',  //订单标题
            );
            $commonConfigs = array(
                //公共参数
                'app_id' => $this->app_id,
                'method' => 'alipay.trade.wap.pay',             //接口名称
                'format' => 'JSON',
                'return_url' => base_url() . 'index.php/job/notify/alipay_return?order_type=' . $orderType . '&pay_source=' . $pay_source,
                'charset' => 'utf-8',
                'sign_type' => 'RSA2',
                'timestamp' => date('Y-m-d H:i:s'),
                'version' => '1.0',
                'notify_url' => base_url() . 'index.php/job/notify/alipay_notify?order_type=' . $orderType . '&pay_source=' . $pay_source,
                'biz_content' => json_encode($requestConfigs, JSON_UNESCAPED_UNICODE),
            );
            $commonConfigs["sign"] = $this->generateSign($commonConfigs, $commonConfigs['sign_type']);
            return $this->buildRequestForm($commonConfigs);
        }
    }


    /**
     * 同步通知
     */
    public function return()
    {
        $params = $_GET;
        $order_type = $_GET['order_type'];
        $pay_source = $_GET['pay_source'];
        $attach = '{"order_type": "' . $order_type . '"}';
        // 实例化订单模型
        $PaySuccess = PayTypeSuccessFactory::getFactory($_GET['out_trade_no'], json_decode($attach, true), 0);
        // 订单信息
        $app_id = $PaySuccess->isExist(0);
        if ($app_id == 0) {
            echo 'error';
            exit();
        }
        $this->init($app_id);
        unset($params['order_type']);
        unset($params['pay_source']);
        $result = $this->rsaCheck($params);
        if ($result === true) {
            $query_result = $this->query($params);
            if ($query_result['alipay_trade_query_response']['code'] == '10000') {
                if ($query_result['alipay_trade_query_response']['trade_status'] == 'TRADE_SUCCESS') {
                    log_write('支付成功' . $params['out_trade_no'] . ';pay_source:' . $pay_source);
                }
                if ($order_type == OrderTypeEnum::MASTER) {
                    return base_url() . 'h5/pages/order/myorder';
                } elseif ($order_type == OrderTypeEnum::BALANCE) {
                    return base_url() . 'h5/pages/user/my-wallet/my-wallet';
                } else {
                    return base_url() . 'h5/pages/user/index/index';
                }
            }
        } else {
            log_write('支付失败');
            log_write($_GET);
            echo 'error';
            return false;
        }
    }


    private function query($params)
    {
        //请求参数
        $requestConfigs = array(
            'out_trade_no' => $params['out_trade_no'],
            'trade_no' => $params['trade_no'],
        );
        $commonConfigs = array(
            //公共参数
            'app_id' => $this->app_id,
            'method' => 'alipay.trade.query',             //接口名称
            'format' => 'JSON',
            'charset' => 'utf-8',
            'sign_type' => 'RSA2',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0',
            'biz_content' => json_encode($requestConfigs),
        );
        $commonConfigs["sign"] = $this->generateSign($commonConfigs, $commonConfigs['sign_type']);
        $result = curlPost('https://openapi.alipay.com/gateway.do?charset=utf-8', $commonConfigs);
        return json_decode($result, true);
    }


    /**
     * 支付成功异步通知
     */
    public function notify()
    {
        $params = $_POST;
        $order_type = $_POST['order_type'];
        $pay_source = $_POST['pay_source'];
        unset($params['order_type']);
        unset($params['pay_source']);
        log_write('支付宝回调');
        //处理你的逻辑，例如获取订单号$_POST['out_trade_no']，订单金额$_POST['total_amount']等
        $attach = '{"order_type": "' . $order_type . '","pay_source":"' . $pay_source . '"}';
        // 实例化订单模型
        $PaySuccess = PayTypeSuccessFactory::getFactory($_POST['out_trade_no'], json_decode($attach, true));
        // 订单信息
        $app_id = $PaySuccess->isExist(10);
        if ($app_id == 0) {
            echo 'error';
            exit();
        }
        $this->init($app_id);
        //验证签名
        $result = $this->rsaCheck($params, $params['sign_type']);
        if ($result === true && $_POST['trade_status'] == 'TRADE_SUCCESS') {
            log_write('支付宝回调----验证成功');

            // 订单支付成功业务处理,兼容微信参数
            $data['attach'] = '{"order_type": "' . $order_type . '","pay_source":"' . $pay_source . '"}';
            $data['transaction_id'] = $params['trade_no'];
            $status = $PaySuccess->onPaySuccess(OrderPayTypeEnum::ALIPAY, $data);
            if ($status == false) {
                echo 'error';
                exit();
            }
            //程序执行完后必须打印输出“success”（不包含引号）。如果商户反馈给支付宝的字符不是success这7个字符，支付宝服务器会不断重发通知，直到超过24小时22分钟。一般情况下，25小时以内完成8次通知（通知的间隔频率一般是：4m,10m,10m,1h,2h,6h,15h）；
            echo 'success';
            exit();
        }
        log_write('支付宝回调----验证失败');
        echo 'error';
        exit();
    }

    /**
     * 申请退款API
     */
    public function refund($transaction_id, $order_no, $refund_fee)
    {
        //请求参数
        $requestConfigs = array(
            'trade_no' => $transaction_id,
            'out_trade_no' => $order_no,
            'refund_amount' => $refund_fee,
        );
        $commonConfigs = array(
            //公共参数
            'app_id' => $this->app_id,
            'method' => 'alipay.trade.refund',             //接口名称
            'format' => 'JSON',
            'charset' => 'utf-8',
            'sign_type' => 'RSA2',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0',
            'biz_content' => json_encode($requestConfigs),
        );
        $commonConfigs["sign"] = $this->generateSign($commonConfigs, $commonConfigs['sign_type']);
        $result = curlPost('https://openapi.alipay.com/gateway.do?charset=utf-8', $commonConfigs);
        $resultArr = json_decode($result, true);
        $result = $resultArr['alipay_trade_refund_response'];
        if ($result['code'] && $result['code'] == '10000') {
            return true;
        } else {
            throw new BaseException(['msg' => 'return_msg: ' . $result['msg'] . ',' . $result['sub_msg']]);
        }
    }

    /**
     * 建立请求，以表单HTML形式构造（默认）
     * 请求参数数组
     * 提交表单HTML文本
     */
    protected function buildRequestForm($para_temp)
    {
        $sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=utf-8' method='POST'>";
        foreach ($para_temp as $key => $val) {
            if (false === $this->checkEmpty($val)) {
                $val = str_replace("'", "&apos;", $val);
                $sHtml .= "<input type='hidden' name='" . $key . "' value='" . $val . "'/>";
            }
        }
        //submit按钮控件请不要含有name属性
        $sHtml = $sHtml . "<input type='submit' value='ok' style='display:none;''></form>";
        return $sHtml;
    }


    public function generateSign($params, $signType = "RSA")
    {
        return $this->sign($this->getSignContent($params), $signType);
    }

    protected function sign($data, $signType = "RSA")
    {
        $res = "-----BEGIN RSA PRIVATE KEY-----\n" .
            wordwrap($this->privateKey, 64, "\n", true) .
            "\n-----END RSA PRIVATE KEY-----";
        ($res) or die('您使用的私钥格式错误，请检查RSA私钥配置');
        if ("RSA2" == $signType) {
            openssl_sign($data, $sign, $res, version_compare(PHP_VERSION, '5.4.0', '<') ? SHA256 : OPENSSL_ALGO_SHA256); //OPENSSL_ALGO_SHA256是php5.4.8以上版本才支持
        } else {
            openssl_sign($data, $sign, $res);
        }
        $sign = base64_encode($sign);
        return $sign;
    }

    public function getSignContent($params)
    {
        ksort($params);
        $stringToBeSigned = "";
        $i = 0;
        foreach ($params as $k => $v) {
            if (false === $this->checkEmpty($v) && "@" != substr($v, 0, 1)) {
                // 转换成目标字符集
                $v = $this->characet($v, 'utf-8');
                if ($i == 0) {
                    $stringToBeSigned .= "$k" . "=" . "$v";
                } else {
                    $stringToBeSigned .= "&" . "$k" . "=" . "$v";
                }
                $i++;
            }
        }
        unset ($k, $v);
        return $stringToBeSigned;
    }

    /**
     * 转换字符集编码
     * @param $data
     * @param $targetCharset
     * @return string
     */
    function characet($data, $targetCharset)
    {
        if (!empty($data)) {
            $fileType = 'utf-8';
            if (strcasecmp($fileType, $targetCharset) != 0) {
                $data = mb_convert_encoding($data, $targetCharset, $fileType);
            }
        }
        return $data;
    }

    /**
     * 校验$value是否非空
     *  if not set ,return true;
     *    if is null , return true;
     **/
    protected function checkEmpty($value)
    {
        if (!isset($value))
            return true;
        if ($value === null)
            return true;
        if (trim($value) === "")
            return true;
        return false;
    }

    /**
     *  验证签名
     **/
    public function rsaCheck($params)
    {
        $sign = $params['sign'];
        $signType = $params['sign_type'];
        unset($params['sign_type']);
        unset($params['sign']);
        return $this->verify($this->getSignContent($params), $sign, $signType);
    }


    function verify($data, $sign, $signType = 'RSA')
    {
        $res = "-----BEGIN PUBLIC KEY-----\n" .
            wordwrap($this->publicKey, 64, "\n", true) .
            "\n-----END PUBLIC KEY-----";
        ($res) or die('支付宝RSA公钥错误。请检查公钥文件格式是否正确');

        //调用openssl内置方法验签，返回bool值
        if ("RSA2" == $signType) {
            $result = (bool)openssl_verify($data, base64_decode($sign), $res, version_compare(PHP_VERSION, '5.4.0', '<') ? SHA256 : OPENSSL_ALGO_SHA256);
        } else {
            $result = (bool)openssl_verify($data, base64_decode($sign), $res);
        }
        return $result;
    }
}
