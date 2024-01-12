<?php

namespace help;


class UrlHelp
{

    /**
     * 相对路径补全
     * @param string|array $str
     * @return string|array
     */
    public static function fillUrl($str = '')
    {
        if (is_array($str)) {
            foreach ($str as $key => $item) {
                $str[$key] = self::fillUrl($item);
            }
            return $str;
        }
        if (empty($str)) {
            return $str;
        }
        if (
            str_starts_with($str, "//") ||
            str_starts_with($str, "http://") ||
            str_starts_with($str, "https://") ||
            str_starts_with($str, "ftp://") ||
            str_starts_with($str, "/") ||
            str_starts_with(str_replace(' ', '', $str), "data:image/")
        ) {
            return $str;
        } else {
            return url($str);
        }
    }

    /**
     * 反 fillUrl
     * @param string $str
     * @return array|string
     */
    public static function unFillUrl($str = '')
    {
        if (is_array($str)) {
            foreach ($str as $key => $item) {
                $str[$key] = self::unFillUrl($item);
            }
            return $str;
        }
        return StringHelp::leftDelete($str, url('') . '/');
    }

    /**
     * 格式化内容图片地址
     * @param $content
     * @return mixed
     */
    public static function formatContentImg($content)
    {
        $pattern = '/<img(.*?)src=("|\')(.*?)\2/is';
        if (preg_match($pattern, $content)) {
            preg_match_all($pattern, $content, $matchs);
            foreach ($matchs[3] as $index => $value) {
                if (!(str_starts_with($value, "http://") ||
                    str_starts_with($value, "https://") ||
                    str_starts_with($value, "ftp://") ||
                    str_starts_with(str_replace(' ', '', $value), "data:image/")
                )) {
                    if (str_starts_with($value, "//")) {
                        $value = "http:" . $value;
                    } elseif (str_starts_with($value, "/")) {
                        $value = substr($value, 1);
                    }
                    $newValue = "<img" . $matchs[1][$index] . "src=" . $matchs[2][$index] . self::fillUrl($value) . $matchs[2][$index];
                    $content = str_replace($matchs[0][$index], $newValue, $content);
                }
            }
        }
        return $content;
    }


    /**
     * 判断是否域名格式
     * @param $domain
     * @return bool
     */
    public static function isDomain($domain): bool
    {
        $str = "/^((?!-)[A-Za-z0-9-_]{1,255}(?<!-)\.)+[A-Za-z]{2,30}$/";
        if (!preg_match($str, $domain)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 给url添加新的queries参数
     * @param $url
     * @param array $appendQueries
     * @return string
     */
    public static function handleUrl($url, array $appendQueries): string
    {
        $urlInfo = parse_url($url);

        $queries = [];
        if (isset($urlInfo['query'])) {
            parse_str($urlInfo['query'], $queries);
            $queries = array_merge($queries, $appendQueries);
        } else {
            $queries = $appendQueries;
        }

        $urlInfo['query'] = http_build_query($queries);
        return UrlHelp::httpBuildUrl($urlInfo);
    }

    /**
     * 根据parse_url的结果，返回url
     * @param $urlArr
     * @return string
     */
    public static function httpBuildUrl($urlArr): string
    {
        $newUrl = $urlArr['scheme'] . "://" . $urlArr['host'];
        if (isset($urlArr['port'])) {
            $newUrl = $newUrl . ":" . $urlArr['port'];
        }
        if (isset($urlArr['path'])) {
            $newUrl = $newUrl . $urlArr['path'];
        }
        if (isset($urlArr['query'])) {
            $newUrl = $newUrl . "?" . $urlArr['query'];
        }
        if (isset($urlArr['fragment'])) {
            $newUrl = $newUrl . "#" . $urlArr['fragment'];
        }
        return $newUrl;
    }

    /**
     * api域名
     * @return string
     */
    public static function apiUrl()
    {
        $urlInfo = parse_url(config('app.url'));
        $url = ($urlInfo['scheme'] == 'https' ? 'https' : 'http') . '://' . env('API_DOMAIN');
        if ($urlInfo['port']) {
            $url .= ':' . $urlInfo['port'];
        }
        return $url;
    }

}
