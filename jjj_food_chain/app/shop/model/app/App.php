<?php

namespace app\shop\model\app;

use app\common\library\easywechat\AesUtil;
use app\common\model\app\App as AppModel;
use EasyWeChat\Pay\Application;
use think\facade\Cache;
use WeChatPay\Util\PemUtil;

/**
 * 应用模型
 */
class App extends AppModel
{
    /**
     * 更新应用设置
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            // 删除app缓存
            self::deleteCache();
            $where['app_id'] = self::$app_id;

            $count = $this->count($where);
            // 更新小程序设置
            if ($count > 0) {
                self::update($data, $where);
            }
            if ($count == 0) {
                $data['app_id'] = self::$app_id;
                self::create($data);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    public function count($where)
    {
        return $this->where($where)->count();
    }

    /**
     * 删除app缓存
     */
    public static function deleteCache()
    {
        return Cache::delete('app_' . self::$app_id);
    }

    public function editPay($data)
    {
        $this->startTrans();
        try {
            $data['pay_type'] = json_encode($data['pay_type']);
            if (!empty($data['cert_pem']) && !empty($data['key_pem'])) {
                // 写入微信支付证书文件
                $this->writeCertPemFiles($data['cert_pem'], $data['key_pem']);
                $platform_pem = $this->createCert($data);
                if ($platform_pem) {
                    $data['platform_pem'] = $platform_pem;
                }
                $serial_no = $this->createSerial();
                if ($serial_no) {
                    $data['serial_no'] = $serial_no;
                }
            }
            $this->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 写入cert证书文件
     */
    private function writeCertPemFiles($cert_pem = '', $key_pem = '')
    {
        // 证书目录
        $filePath = root_path() . 'runtime/cert/app/' . self::$app_id . '/';
        // 目录不存在则自动创建
        if (!is_dir($filePath)) {
            mkdir($filePath, 0755, true);
        }
        // 写入cert.pem文件
        if (!empty($cert_pem)) {
            file_put_contents($filePath . 'cert.pem', $cert_pem);
        }
        // 写入key.pem文件
        if (!empty($key_pem)) {
            file_put_contents($filePath . 'key.pem', $key_pem);
        }
        return true;
    }

    //生成平台证书
    public function createCert($data)
    {
        // cert目录
        $filePath = root_path() . 'runtime/cert/app/' . self::$app_id . '/';
        $config = [
            'mch_id' => $data['mchid'],
            // 商户证书
            'certificate' => $filePath . 'cert.pem',
            'private_key' => $filePath . 'key.pem',
            // v3 API 秘钥
            'secret_key' => $data['apikey'],
            'http' => [
                'throw' => true,
                'timeout' => 5.0,
            ],
        ];
        $app = new Application($config);
        $api = $app->getClient();
        $response = $api->get('/v3/certificates');
        $response = $response->toArray();
        //获得加密证书信息
        $cert = end($response['data']);
        $tool = new AesUtil($config['secret_key']);
        $res = $tool->decryptToString($cert['encrypt_certificate']['associated_data'], $cert['encrypt_certificate']['nonce'], $cert['encrypt_certificate']['ciphertext']);
        // 证书目录
        $filePath = root_path() . 'runtime/cert/app/' . self::$app_id . '/';
        file_put_contents($filePath . 'platform.pem', $res);
        return $res;

    }

    //生成证书序列号
    public function createSerial()
    {
        $filePath = root_path() . 'runtime/cert/app/' . self::$app_id . '/';
        // 从本地文件中加载「微信支付平台证书」，用来验证微信支付应答的签名
        $platformCertificateFilePath = "file://" . $filePath . 'platform.pem';
        // 从「微信支付平台证书」中获取「证书序列号」
        return PemUtil::parseCertificateSerialNo($platformCertificateFilePath);
    }

}
