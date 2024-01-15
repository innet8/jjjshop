<?php

use think\facade\Request;
use think\facade\Log;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use think\facade\Config;

// 应用公共文件
/**
 * 打印调试函数
 * @param $content
 * @param $is_die
 */
function pre($content, $is_die = true)
{

    header('Content-type: text/html; charset=utf-8');
    echo '<pre>' . print_r($content, true);
    $is_die && die();
}

/**
 * 隐藏敏感字符
 * @param $value
 * @return string
 */
function substr_cut($value)
{
    $strlen = mb_strlen($value, 'utf-8');
    if ($strlen <= 1) return $value;
    $firstStr = mb_substr($value, 0, 1, 'utf-8');
    $lastStr = mb_substr($value, -1, 1, 'utf-8');
    return $strlen == 2 ? $firstStr . str_repeat('*', $strlen - 1) : $firstStr . str_repeat("*", $strlen - 2) . $lastStr;
}

/**
 * 获取当前系统版本号
 * @return mixed|null
 * @throws Exception
 */
function get_version()
{
    try {
        $file = root_path() . '/version.json';
        $version = json_decode(file_get_contents($file), true);
        return $version['version'];
    } catch (\Exception $e) {
        return '';
    }

}

/**
 * 驼峰命名转下划线命名
 * @param $str
 * @return string
 */
function toUnderScore($str)
{
    $dstr = preg_replace_callback('/([A-Z]+)/', function ($matchs) {
        return '_' . strtolower($matchs[0]);
    }, $str);
    return trim(preg_replace('/_{2,}/', '_', $dstr), '_');
}

/**
 * 生成密码hash值
 * @param $password
 * @return string
 */
function salt_hash($password)
{
    return md5(md5($password) . 'jjjshop_salt_2020');
}

/**
 * curl请求指定url (post)
 * @param $url
 * @param array $data
 * @return mixed
 */
function curlPost($url, $data = [])
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

/**
 * 多维数组合并
 * @param $array1
 * @param $array2
 * @return array
 */
function array_merge_multiple($array1, $array2)
{
    $merge = $array1 + $array2;
    $data = [];
    foreach ($merge as $key => $val) {
        if (
            isset($array1[$key])
            && is_array($array1[$key])
            && isset($array2[$key])
            && is_array($array2[$key])
        ) {
            $data[$key] = array_merge_multiple($array1[$key], $array2[$key]);
        } else {
            $data[$key] = isset($array2[$key]) ? $array2[$key] : $array1[$key];
        }
    }
    return $data;
}

/**
 * 二维数组排序
 * @param $arr
 * @param $keys
 * @param bool $desc
 * @return mixed
 */
function array_sort($arr, $keys, $desc = false)
{
    $key_value = $new_array = array();
    foreach ($arr as $k => $v) {
        $key_value[$k] = $v[$keys];
    }
    if ($desc) {
        arsort($key_value);
    } else {
        asort($key_value);
    }
    reset($key_value);
    foreach ($key_value as $k => $v) {
        $new_array[$k] = $arr[$k];
    }
    return $new_array;
}

/**
 * 数据导出到excel(csv文件)
 * @param $fileName
 * @param array $tileArray
 * @param array $dataArray
 */
function export_excel($fileName, $tileArray = [], $dataArray = [])
{
    ini_set('memory_limit', '512M');
    ini_set('max_execution_time', 0);
    ob_end_clean();
    ob_start();
    header("Content-Type: text/csv");
    header("Content-Disposition:filename=" . $fileName);
    $fp = fopen('php://output', 'w');
    fwrite($fp, chr(0xEF) . chr(0xBB) . chr(0xBF));// 转码 防止乱码(比如微信昵称)
    fputcsv($fp, $tileArray);
    $index = 0;
    foreach ($dataArray as $item) {
        if ($index == 1000) {
            $index = 0;
            ob_flush();
            flush();
        }
        $index++;
        fputcsv($fp, $item);
    }
    ob_flush();
    flush();
    ob_end_clean();
}

/**
 * 写入日志
 * @param $value
 * @param string $type
 */
function log_write($value, $channel = '')
{
    $msg = is_string($value) ? $value : var_export($value, true);
    Log::channel($channel)->write($msg);
}

/**
 * 获取当前域名及根路径
 * @return string
 */
function base_url()
{
    static $baseUrl = '';
    if (empty($baseUrl)) {
        $request = Request::instance();
        //$subDir = str_replace('\\', '/', dirname($request->server('PHP_SELF')));
        $baseUrl = $request->scheme() . '://' . $request->host() . '/';
    }
    return $baseUrl;
}

/**
 * 左侧填充0
 * @param $value
 * @param int $padLength
 * @return string
 */
function pad_left($value, $padLength = 2)
{
    return \str_pad($value, $padLength, "0", STR_PAD_LEFT);
}

/**
 * 过滤emoji表情
 * @param $text
 * @return null|string|string[]
 */
function filter_emoji($text)
{
    // 此处的preg_replace用于过滤emoji表情
    // 如需支持emoji表情, 需将mysql的编码改为utf8mb4
    return preg_replace('/[\xf0-\xf7].{3}/', '', $text);
}


/**
 * 获取全局唯一标识符
 * @param bool $trim
 * @return string
 */
function getGuidV4($trim = true)
{
    // Windows
    if (function_exists('com_create_guid') === true) {
        $charid = com_create_guid();
        return $trim == true ? trim($charid, '{}') : $charid;
    }
    // OSX/Linux
    if (function_exists('openssl_random_pseudo_bytes') === true) {
        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);    // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);    // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
    // Fallback (PHP 4.2+)
    mt_srand((double)microtime() * 10000);
    $charid = strtolower(md5(uniqid(rand(), true)));
    $hyphen = chr(45);                  // "-"
    $lbrace = $trim ? "" : chr(123);    // "{"
    $rbrace = $trim ? "" : chr(125);    // "}"
    $guidv4 = $lbrace .
        substr($charid, 0, 8) . $hyphen .
        substr($charid, 8, 4) . $hyphen .
        substr($charid, 12, 4) . $hyphen .
        substr($charid, 16, 4) . $hyphen .
        substr($charid, 20, 12) .
        $rbrace;
    return $guidv4;
}

function format_time($value)
{
    return date('Y-m-d', $value);
}


/**
 * curl请求指定url (get)
 * @param $url
 * @param array $data
 * @return mixed
 */
function curl($url, $data = [])
{
    // 处理get数据
    if (!empty($data)) {
        $url = $url . '?' . http_build_query($data);
    }
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);//这个是重点。
    $result = curl_exec($curl);
    curl_close($curl);
    return $result;
}

/**
 * json 转换true,false
 */
function jsonRecursive(&$array)
{
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            jsonRecursive($array[$key]);
        } else {
            if ($value === 'true') {
                $array[$key] = true;
            } else if ($value === 'false') {
                $array[$key] = false;
            }
        }
    }
}

/**
 * 判断浏览器名称和版本
 */
function get_client_browser()
{
    if (empty($_SERVER['HTTP_USER_AGENT'])) {
        return 'robot！';
    }
    if ((false == strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE')) && (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident') !== FALSE)) {
        return 'Internet Explorer 11.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 10.0')) {
        return 'Internet Explorer 10.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 9.0')) {
        return 'Internet Explorer 9.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 8.0')) {
        return 'Internet Explorer 8.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7.0')) {
        return 'Internet Explorer 7.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 6.0')) {
        return 'Internet Explorer 6.0';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'Edge')) {
        return 'Edge';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'Firefox')) {
        return 'Firefox';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome')) {
        return 'Chrome';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'Safari')) {
        return 'Safari';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'Opera')) {
        return 'Opera';
    }
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], '360SE')) {
        return '360SE';
    }
    //微信浏览器
    if (false !== strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessage')) {
        return 'MicroMessage';
    }
    return '';
}

//生成验签
function signToken($uid, $type)
{
    $key = Config::get('app.salt') . $type;//这里是自定义的一个随机字串，应该写在config文件中的，解密时也会用，相当    于加密中常用的 盐  salt
    $token = array(
        "iss" => $key,        //签发者 可以为空
        "aud" => '',          //面象的用户，可以为空
        "iat" => time(),      //签发时间
        "nbf" => time() + 3,    //在什么时候jwt开始生效  （这里表示生成100秒后才生效）
        "exp" => time() + 86400, //token 过期时间
        "data" => [           //记录的userid的信息，这里是自已添加上去的，如果有其它信息，可以再添加数组的键值对
            'uid' => $uid,
            'type' => $type
        ]
    );
    $jwt = JWT::encode($token, $key, "HS256");  //根据参数生成了 token
    return $jwt;
}

//验证token
function checkToken($token, $type)
{
    $key = Config::get('app.salt') . $type;
    $status = array("code" => -1);
    try {
        JWT::$leeway = 60;//当前时间减去60，把时间留点余地
        $decoded = JWT::decode($token, new Key($key, 'HS256')); //HS256方式，这里要和签发的时候对应
        $arr = json_decode(json_encode($decoded), 1);
        $res['code'] = 1;
        $res['data'] = $arr['data'];
        return $res;
    } catch (\Firebase\JWT\SignatureInvalidException $e) { //签名不正确
        $status['msg'] = "签名不正确";
        return $status;
    } catch (\Firebase\JWT\BeforeValidException $e) { // 签名在某个时间点之后才能用
        $status['msg'] = "token失效";
        return $status;
    } catch (\Firebase\JWT\ExpiredException $e) { // token过期
        $status['msg'] = "token失效";
        return $status;
    } catch (Exception $e) { //其他错误
        $status['msg'] = "未知错误";
        return $status;
    }
}

/**
 * 判断字符串存在(包含)
 * @param string $string
 * @param string $find
 * @return bool
 */
function strExists($string, $find)
{
    if (!is_string($string) || !is_string($find)) {
        return false;
    }
    return str_contains($string, $find);
}

/**
 * 自动侦测设置获取语言选择
 * @return string
 */
function checkDetect(): string
{
    if ($langSet = Request::get("language")) {
        // url中设置了语言变量
        return $langSet;
    }

    if ($langSet = Request::header("language")) {
        // Header中设置了语言变量
        return $langSet;
    }

    if ($langSet = Request::cookie("language")) {
        // Cookie中设置了语言变量
        return $langSet;
    }

    if ($langSet = Request::server('HTTP_ACCEPT_LANGUAGE')) {
        // 自动侦测浏览器语言
        return parse_accept_language($langSet);
    }

    return '';
}

/**
 * 解析语言参数
 *
 * @param string $header
 * @return string
 */
function parse_accept_language(string $header): string {
    $langMap = [
        'zh-tw' => 'zhtw',
        'zh-cn' => 'zh',
        'en-us' => 'en',
    ];

    if (preg_match('/^([a-z\d\-]+)/i', $header, $matches)) {
        $langSet = strtolower($matches[1]);
        return $langMap[$langSet] ?? $langSet;
    }

    return '';
}

/**
 * 国际化（替换国际语言）
 * @param $val
 * @param string $language
 * @return mixed
 */
function langTrans(string $val, string $language = 'zh'): string
{
    $language = checkDetect() ?: $language;
    $data = langData($language);

    if (array_key_exists($val, $data)) {
        return $data[$val];
    }

    return $val;
}

/**
 * 国际化（替换国际语言）
 * @param $val
 * @param string $language
 * @return mixed
 */
function __(string $val): string
{
    return langTrans($val);
}

/**
 * 加载语言数据
 * @param string language 语言
 * @return array
 */
function langData($language = 'zh')
{
    $langpath = root_path().'lang/' . strtolower($language). '/auto.php';
    if (file_exists($langpath)) {
        $data = include $langpath;
        if (is_array($data)) {
            return $data;
        }
    }
    return [];
}


/**
 * 打印文本
 * @return string
 */
function printText($leftText, $centerText="", $rightText="", $total = 32, $leftNum=0) {
    $afterLeftText = "";
    if ($leftNum > 0 && $leftText) {
        $leftNums = $leftNum - 2;
        if (preg_match('/[\x{4e00}-\x{9fa5}]+/u', $leftText)) {
            $afterLeftText = mb_substr($leftText, ceil( $leftNums / 2), 1000, 'UTF-8');
            $leftText = mb_substr($leftText, 0, ceil( $leftNums / 2) , 'UTF-8');
        } else {
            $afterLeftText = mb_substr($leftText, $leftNums, 1000, 'UTF-8');
            $leftText = mb_substr($leftText, 0, $leftNums, 'UTF-8');
        }
    }
    $leftWidth = strlen(iconv("UTF-8", "GBK//IGNORE", $leftText));
    $leftPadding = $leftNum - $leftWidth > 0 ? str_repeat(" ", intval($leftNum - $leftWidth)) : "";
    $leftPaddingWidth = strlen(iconv("UTF-8", "GBK//IGNORE", $leftPadding));
    //
    $centerWidth = strlen(iconv("UTF-8", "GBK//IGNORE", $centerText));
    $rightWidth = strlen(iconv("UTF-8", "GBK//IGNORE", $rightText));
    $centerPaddingWidth = ($total - $leftWidth - $leftPaddingWidth - $centerWidth - $rightWidth);
    $centerPadding = str_repeat(" ", $centerPaddingWidth );
    //
    $content = $leftText . $leftPadding . $centerText . $centerPadding . $rightText;
    if ($afterLeftText) {
        $content .= "<BR>" . $afterLeftText . '<BR>';
    }
    //
    return $content;
}

/**
 * 提取语言
 * @return array
 */
function extractLanguage($json)
{
    try {
        $texts = json_decode($json, true);
        return $texts ? $texts[checkDetect()] : $json;
    } catch (\Throwable $th) {
        return $json;
    }
}

/**
 * 生成编号
 *
 * @return string
 */
function generateNumber()
{
    $datePart = date('Ymd'); // 获取当前日期
    $fixedPart = '01'; // 固定部分
    $randomPart = str_pad(rand(0, 99999999), 8, '0', STR_PAD_LEFT); // 生成一个8位的随机数

    return $datePart . $fixedPart . $randomPart;
}