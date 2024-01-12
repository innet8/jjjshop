<?php

namespace help;

use think\facade\Cache;
use function openssl_encrypt;

class EncryptionHelp
{
    /**
     * 加密
     * @param $input
     * @param $key
     * @return string
     */
    public static function encryptBase64($input, $key='!~21h39(w3'): string
    {
        $encData = openssl_encrypt($input, 'DES-EDE3', str_pad($key, 24, '0'), OPENSSL_RAW_DATA);
        return base64_encode($encData);
    }

    /**
     * 解密
     * @param $encrypted
     * @param $key
     * @return false|string
     */
    public static function decryptBase64($encrypted, $key='!~21h39(w3')
    {
        $encrypted = base64_decode($encrypted);
        return openssl_decrypt($encrypted, 'DES-EDE3', str_pad($key, 24, '0'), OPENSSL_RAW_DATA);
    }

    /**
     * 加密字符串
     * @param $input
     * @param $key
     * @return string
     */
    public static function encryptString($input, $key): string
    {
        $keys = StringHelp::generatePassword(32);
        Cache::set($keys,self::encryptBase64($input,$key));
        return $keys;
    }

    /**
     * 解密字符串
     * @param $input
     * @param $key
     * @return string
     */
    public static function decryptString($input, $key): string
    {
        return self::decryptBase64( Cache::get($input,'') ,$key);
    }

    /**
     * 获取随机加密字符串
     * @return false|string
     */
    public static function makeEncrypt()
    {
        return substr(md5(StringHelp::generatePassword(16)), 8, 16);
    }

}
