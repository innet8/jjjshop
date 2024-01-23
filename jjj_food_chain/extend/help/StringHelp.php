<?php

namespace help;

use Exception;
use think\facade\Cache;

class StringHelp
{

    //密码字典   
    private $dic = array(   
        0=>'0', 1=>'1', 2=>'2', 3=>'3', 4=>'4', 5=>'5', 6=>'6', 7=>'7', 8=>'8',       
        9=>'9', 10=>'A',  11=>'B', 12=>'C', 13=>'D', 14=>'E', 15=>'F',  16=>'G',  17=>'H',       
        18=>'I',19=>'J',  20=>'K', 21=>'L',  22=>'M',  23=>'N', 24=>'O', 25=>'P', 26=>'Q',       
    27=>'R',28=>'S',  29=>'T',  30=>'U', 31=>'V',  32=>'W',  33=>'X', 34=>'Y', 35=>'Z'   
    ); 

    /* 
	*获取订单号 
	* @return string  2106071808016498
	*/  
	public static function createOrderNo($prefix='')  
	{
		$str = strtoupper(date('ymd')) . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
	   	$str = $prefix.$str;
	   	$cacheStr = Cache::get('base\other\Strings\createOrderNo') ?: [];
	    if( in_array($str,$cacheStr) ) return self::createOrderNo();
	    if( count($cacheStr) > 1000) {
	    	$cacheStr = [$str];
	    }else{
	    	$cacheStr[] = $str;
	    }
	    Cache::set('base\other\Strings\createOrderNo',$cacheStr,1);
	    return $str;
	}
	
	/**
 	* 随机生成n位数字
 	* @return string 生成的字符串
	 */
	public function createNumber($length=8)
	{
		return self::encodeID( self::createOrderNo(), $length );
	}
	
	/**
 	* 随机生成n位字符串
 	* @return string 生成的字符串
	 */
	public static function getRandomStr($n=16){
		$str = "";
	    $str_pol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
	    $max = strlen($str_pol) - 1;
	    for ($i = 0; $i < $n; $i++) {
	        $str .= $str_pol[mt_rand(0, $max)];
	    }
	    return $str;
	}
	
	/**
	 * 获取guid
	 * @param  null
	 */
	public static function uuid() {
	    list($usec, $sec) = explode(" ", microtime(false));
	    $usec = (string)($usec * 10000000);
	    $timestamp = bcadd(bcadd(bcmul($sec, "10000000"), (string)$usec), "621355968000000000");
	    $ticks = bcdiv($timestamp, 10000);
	    $maxUint = 4294967295;
	    $high = bcdiv($ticks, $maxUint) + 0;
	    $low = bcmod($ticks, $maxUint) - $high;
	    $highBit = (pack("N*", $high));
	    $lowBit = (pack("N*", $low));
	    $guid = str_pad(dechex(ord($highBit[2])), 2, "0", STR_PAD_LEFT) . str_pad(dechex(ord($highBit[3])), 2, "0", STR_PAD_LEFT) . str_pad(dechex(ord($lowBit[0])), 2, "0", STR_PAD_LEFT) . str_pad(dechex(ord($lowBit[1])), 2, "0", STR_PAD_LEFT) . "-" . str_pad(dechex(ord($lowBit[2])), 2, "0", STR_PAD_LEFT) . str_pad(dechex(ord($lowBit[3])), 2, "0", STR_PAD_LEFT) . "-";
	    $chars = "abcdef0123456789";
	    for ($i = 0; $i < 4; $i++) {
	        $guid .= $chars[mt_rand(0, 15)];
	    }
	    $guid .= "-";
	    for ($i = 0; $i < 4; $i++) {
	        $guid .= $chars[mt_rand(0, 15)];
	    }
	    $guid .= "-";
	    for ($i = 0; $i < 12; $i++) {
	        $guid .= $chars[mt_rand(0, 15)];
	    }
	    return $guid;
	}
    
    /**
	 * 加密订单号，卡号
	 * @param  null
	 */
    public static function encodeID($int, $format=8) {   
        $dics = (new self)->dic;   
        $dnum = 36; //进制数   
        $arr = array ();   
        $loop = true;   
        while ($loop) {   
            $arr[] = $dics[bcmod($int, $dnum)];   
            $int = bcdiv($int, $dnum, 0);   
            if ($int == '0') {   
                $loop = false;   
            }   
        }   
        if (count($arr) < $format)   
            $arr = array_pad($arr, $format, $dics[0]);   
   
        return implode('', array_reverse($arr));   
    }   
   
    /**
	 * 解密订单号，卡号
	 * @param  null
	 */
    public static function decodeID($ids) {   
        $dics = (new self)->dic;   
        $dnum = 36; //进制数   
        //键值交换   
        $dedic = array_flip($dics);   
        //去零   
        $id = ltrim($ids, $dics[0]);   
        //反转   
        $id = strrev($id);   
        $v = 0;   
        for ($i = 0, $j = strlen($id); $i < $j; $i++) {   
            $v = bcadd(bcmul($dedic[$id[$i] ], bcpow($dnum, $i, 0), 0), $v, 0);   
        }   
        return $v;   
    } 

    /**
     * 判断字符串存在(包含)
     * @param string $string
     * @param string $find
     * @return bool
     */
    public static function strExists($string, $find)
    {
        if (!is_string($string) || !is_string($find)) {
            return false;
        }
        return !(strpos($string, $find) === FALSE);
    }

    /**
     * 判断字符串开头包含
     * @param string $string //原字符串
     * @param string $find //判断字符串
     * @param bool|false $lower //是否不区分大小写
     * @return int
     */
    public static function leftExists($string, $find, $lower = false)
    {
        if (!is_string($string) || !is_string($find)) {
            return false;
        }
        if ($lower) {
            $string = strtolower($string);
            $find = strtolower($find);
        }
        return (substr($string, 0, strlen($find)) == $find);
    }

    /**
     * 判断字符串结尾包含
     * @param string $string //原字符串
     * @param string $find //判断字符串
     * @param bool|false $lower //是否不区分大小写
     * @return int
     */
    public static function rightExists($string, $find, $lower = false)
    {
        if (!is_string($string) || !is_string($find)) {
            return false;
        }
        if ($lower) {
            $string = strtolower($string);
            $find = strtolower($find);
        }
        return (substr($string, strlen($find) * -1) == $find);
    }

    /**
     * 删除开头指定字符串
     * @param $string
     * @param $find
     * @param bool $lower
     * @return string
     */
    public static function leftDelete($string, $find, $lower = false)
    {
        if (self::leftExists($string, $find, $lower)) {
            $string = substr($string, strlen($find));
        }
        return $string ? $string : '';
    }

    /**
     * 删除结尾指定字符串
     * @param $string
     * @param $find
     * @param bool $lower
     * @return string
     */
    public static function rightDelete($string, $find, $lower = false)
    {
        if (self::rightExists($string, $find, $lower)) {
            $string = substr($string, 0, strlen($find) * -1);
        }
        return $string;
    }

    /**
     * 截取指定字符串
     * @param $str
     * @param string $ta
     * @param string $tb
     * @return string
     */
    public static function getMiddle($str, $ta = '', $tb = '')
    {
        if ($ta && strpos($str, $ta) !== false) {
            $str = substr($str, strpos($str, $ta) + strlen($ta));
        }
        if ($tb && strpos($str, $tb) !== false) {
            $str = substr($str, 0, strpos($str, $tb));
        }
        return $str;
    }


    /**
     * 用户名、邮箱、手机账号、银行卡号中间字符串以*隐藏
     * @param $str
     * @return mixed|string
     */
    public static function cardFormat($str)
    {
        if (strpos($str, '@')) {
            $email_array = explode("@", $str);
            $prevfix = (strlen($email_array[0]) < 4) ? "" : substr($str, 0, 3); //邮箱前缀
            $count = 0;
            $str = preg_replace('/([\d\w+_-]{0,100})@/', '***@', $str, -1, $count);
            return $prevfix . $str;
        }
        if (self::isMobile($str)) {
            return substr($str, 0, 3) . "****" . substr($str, -4);
        }
        $pattern = '/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/i';
        if (preg_match($pattern, $str)) {
            return preg_replace($pattern, '$1 **** **** **** $5', $str);
        }
        $pattern = '/([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/i';
        if (preg_match($pattern, $str)) {
            return preg_replace($pattern, '$1 **** **** $4', $str);
        }
        $pattern = '/([\d]{4})([\d]{4})([\d]{0,})?/i';
        if (preg_match($pattern, $str)) {
            return preg_replace($pattern, '$1 **** $3', $str);
        }
        return substr($str, 0, 3) . "***" . substr($str, -1);
    }

    /**
     * 替换字符串
     * @param array $search
     * @param $replace
     * @param $arr
     * @return array
     */
    public static function recursiveStrReplace(array $search, $replace, $arr)
    {
        if (is_array($arr) && !empty($arr)) {
            foreach ($arr as $key => $item) {
                if (is_array($item)) {
                    $arr[$key] = self::recursiveStrReplace($search, $replace, $item);
                } else if (is_string($item)) {
                    $arr[$key] = str_replace($search, $replace, $item);
                } else {
                    $arr[$key] = $item;
                }
            }
            return $arr;
        } else {
            return $arr;
        }
    }

    /**
     * 判断字符串是否IP获取子掩码IP
     * @param $cidr
     * @return bool
     */
    public static function isCidr($cidr): bool
    {
        if (str_contains($cidr, '/')) {
            list($cidr, $netmask) = explode('/', $cidr, 2);
            if ($netmask > 32 || $netmask < 0 || trim($netmask) == '') {
                return false;
            }
        }
        return filter_var($cidr, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false;
    }


    /**
     * 截取字符串
     * @param string $string 字符串
     * @param int $length 截取长度
     * @param int $start 何处开始
     * @param string $dot 超出尾部添加
     * @param string $charset 默认编码
     * @return mixed|string
     */
    public static function cutStr(string $string, int $length, int $start = 0, string $dot = '', string $charset = 'utf-8')
    {
        if (strtolower($charset) == 'utf-8') {
            if (self::getStrlen($string) <= $length) return $string;
            $strcut = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array('&', '"', '<', '>'), $string);
            $strcut = self::utf8Substr($strcut, $length, $start);
            $strcut = str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $strcut);
            return $strcut . $dot;
        } else {
            $length = $length * 2;
            if (strlen($string) <= $length) return $string;
            $string = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array('&', '"', '<', '>'), $string);
            $strcut = '';
            for ($i = 0; $i < $length; $i++) {
                $strcut .= ord($string[$i]) > 127 ? $string[$i] . $string[++$i] : $string[$i];
            }
            $strcut = str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $strcut);
        }
        return $strcut . $dot;
    }

    /**
     * PHP获取字符串中英文混合长度
     * @param string $str 字符串
     * @param string $charset 编码
     * @return float            返回长度，1中文=1位，2英文=1位
     */
    public static function getStrlen(string $str, string $charset = 'utf-8')
    {
        if (strtolower($charset) == 'utf-8') {
            $str = iconv('utf-8', 'GBK//IGNORE', $str);
        }
        $num = strlen($str);
        $cnNum = 0;
        for ($i = 0; $i < $num; $i++) {
            if (ord(substr($str, $i + 1, 1)) > 127) {
                $cnNum++;
                $i++;
            }
        }
        $enNum = $num - ($cnNum * 2);
        $number = ($enNum / 2) + $cnNum;
        return ceil($number);
    }

    /**
     * PHP截取UTF-8字符串，解决半字符问题。
     * @param string $str 源字符串
     * @param int $len 左边的子串的长度
     * @param int $start 何处开始
     * @return string           取出的字符串, 当$len小于等于0时, 会返回整个字符串
     */
    public static function utf8Substr($str, $len, $start = 0)
    {
        $len = $len * 2;
        $new_str = [];
        for ($i = 0; $i < $len; $i++) {
            $temp_str = substr($str, 0, 1);
            if (ord($temp_str) > 127) {
                $i++;
                if ($i < $len) {
                    $new_str[] = substr($str, 0, 3);
                    $str = substr($str, 3);
                }
            } else {
                $new_str[] = substr($str, 0, 1);
                $str = substr($str, 1);
            }
        }
        return join(array_slice($new_str, $start));
    }

    /**
     * 将字符串转换为数组
     * @param string $data 字符串
     * @param array $default 为空时返回的默认数组
     * @return    array    返回数组格式，如果，data为空，则返回$default
     */
    public static function string2array($data, $default = [])
    {
        if (is_array($data)) {
            return $data ? $data : $default;
        }
        $data = trim($data);
        if ($data == '') return $default;
        if (strpos(strtolower($data), 'array') === 0 && strtolower($data) !== 'array') {
            @ini_set('display_errors', 'on');
            @eval("\$array = $data;");
            @ini_set('display_errors', 'off');
        } else {
            if (strpos($data, '{\\') === 0) {
                $data = stripslashes($data);
            }
            $array = json_decode($data, true);
        }
        return isset($array) && is_array($array) && $data ? $array : $default;
    }

    /**
     * 检测手机号码格式
     * @param string $str 需要检测的字符串
     * @return bool
     */
    public static function isMobile($str)
    {
        if (preg_match("/^1([3456789])\d{9}$/", $str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 返回经stripslashes处理过的字符串或数组
     * @param array|string $string 需要处理的字符串或数组
     * @return mixed
     */
    public static function newStripslashes($string)
    {
        if (is_numeric($string)) {
            return $string;
        } elseif (!is_array($string)) {
            return stripslashes($string);
        }
        foreach ($string as $key => $val) $string[$key] = self::newStripslashes($val);
        return $string;
    }


    /**
     * 返回经addslashes处理过的字符串或数组
     * @param array|string $string 需要处理的字符串或数组
     * @return mixed
     */
    public static function newAddslashes($string)
    {
        if (is_numeric($string)) {
            return $string;
        } elseif (!is_array($string)) {
            return addslashes($string);
        }
        foreach ($string as $key => $val) $string[$key] = self::newAddslashes($val);
        return $string;
    }


    /**
     * 随机字符串
     * @param int $length 随机字符长度
     * @param string $type
     * @return string 1数字、2大小写字母、21小写字母、22大写字母、默认全部;
     */
    public static function generatePassword($length = 8, $type = '')
    {
        // 密码字符集，可任意添加你需要的字符
        switch ($type) {
            case '1':
                $chars = '0123456789';
                break;
            case '2':
                $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case '21':
                $chars = 'abcdefghijklmnopqrstuvwxyz';
                break;
            case '22':
                $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            default:
                $chars = $type ?: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                break;
        }
        $passwordstr = '';
        $max = strlen($chars) - 1;
        for ($i = 0; $i < $length; $i++) {
            $passwordstr .= $chars[mt_rand(0, $max)];
        }
        return $passwordstr;
    }

    /**
     * json字符串转换成array
     * @param $string
     * @return array|mixed
     */
    public static function json2array($string)
    {
        if (is_array($string)) {
            return $string;
        }
        try {
            $array = json_decode($string, true);
            return is_array($array) ? $array : [];
        } catch (Exception $e) {
            return [];
        }
    }

    /**
     * 生成SN
     * @return false|string
     */
    public static function makeSN()
    {
        return substr(md5(self::strRandom(16, 'abcdefghijklmnopqrstuvwxyz1234567890')), 0, 16);
    }


    /**
     * 同 generate_password 默认获取纯数字
     * @param $length
     * @param string $chars
     * @return string
     */
    public static function strRandom($length, $chars = '0123456789')
    {
        return self::generatePassword($length, $chars);
    }

    /**
     * @return string
     */
    public static function makeToken(): string
    {
        return md5(self::strRandom(32));
    }

    /**
     * 验证SN格式，只支持10-32位大小写字母、数字组合
     * @param string $sn
     * @return bool
     */
    public static function checkSn(string $sn): bool
    {
        if (!preg_match('/^[a-zA-Z0-9]{10,32}$/', $sn)) {
            return false;
        }
        return true;
    }

    /**
     * array转换成功json字符串
     * @param $array
     * @param int $options
     * @return string
     */
    public static function array2json($array, $options = 0)
    {
        if (!is_array($array)) {
            return $array;
        }
        try {
            return json_encode($array, $options);
        } catch (Exception $e) {
            return '';
        }
    }

    /**
     * 转义like查询
     * @param string $str 转义的字符串
     * @return boolean
     */
    public static function escapeLikeStr(string $str){
        $escape_like_str = function ($str) {
            $like_escape_char = '\\';
            return str_replace([$like_escape_char, '%', '_'], [
                $like_escape_char.$like_escape_char,
                $like_escape_char.'%',
                $like_escape_char.'_',
            ], $str);
        };
        return $escape_like_str($str);
    }

}
