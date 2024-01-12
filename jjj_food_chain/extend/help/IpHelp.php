<?php
namespace help;

class IpHelp
{
    /**
     * 获取在线IP
     *
     * @return mixed|string
     */
    public static function getOnlineIp()
    {
        if (getenv('HTTP_CLIENT_IP') and strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
            $onlineIp = getenv('HTTP_CLIENT_IP');
        } elseif (isset($_SERVER['HTTP_CLIENT_IP']) and $_SERVER['HTTP_CLIENT_IP'] and strcasecmp($_SERVER['HTTP_CLIENT_IP'], 'unknown')) {
            $onlineIp = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (getenv('HTTP_X_FORWARDED_FOR') and strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
            $onlineIp = getenv('HTTP_X_FORWARDED_FOR');
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) and $_SERVER['HTTP_X_FORWARDED_FOR'] and strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], 'unknown')) {
            $onlineIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (getenv('REMOTE_ADDR') and strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
            $onlineIp = getenv('REMOTE_ADDR');
        } elseif (isset($_SERVER['REMOTE_ADDR']) and $_SERVER['REMOTE_ADDR'] and strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
            $onlineIp = $_SERVER['REMOTE_ADDR'];
        } elseif ($ip = request()->header('X-Real-IP')) {
            $onlineIp = $ip;
        } else {
            $onlineIp = '0,0,0,0';
        }
        preg_match("/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/", $onlineIp, $match);
        return $match ? ($match[0] ?: $onlineIp) : 'unknown';
    }

    /**
     * 判断是否内网IP
     *
     * @param string $ip IP
     * @return bool
     */
    public static function isInternalIp(string $ip): bool
    {
        if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            return false;
        }
        $ip = ip2long($ip);
        if (!$ip) {
            return false;
        }
        $net_l = ip2long('127.255.255.255') >> 24;          //127.x.x.x
        $net_a = ip2long('10.255.255.255') >> 24;           //A类网预留ip的网络地址
        $net_b = ip2long('10.32.255.255') >> 20;            //B类网预留ip的网络地址
        $net_c = ip2long('192.168.255.255') >> 16;          //C类网预留ip的网络地址
        return $ip >> 24 === $net_l || $ip >> 24 === $net_a || $ip >> 20 === $net_b || $ip >> 16 === $net_c;
    }

    /**
     * 判断IP是否正确
     *
     * @param string $ip
     * @return bool
     */
    public static function isIpv4(string $ip): bool
    {
        return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false;
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
     * 是否是系统内部IP
     * @param $ip
     * @return bool
     */
    public static function isInvalidIP($ip)
    {
        $segments = [
            '172.20.',  // 172.20.0.0/16（路由器Lan）
            '10.188.', // 10.188.0.0/16（入口）
            '10.200.10.', // 10.200.10.0/24（出口）
            '10.200.11.', // 10.200.11.0/24（中转）
            '10.155.', // 10.155.0.0/16（三跳）
            '10.166.', // 10.166.0.0/16（分流）
            '10.167.', // 10.167.0.0/16（三跳分流）
            '10.250.250' // 10.250.250.0/24（创建的docker网卡）
        ];
        $flag = false;
        foreach ($segments as $segment) {
            if (stripos($ip, $segment) === 0) {
                $flag = true;
            }
        }
        return $flag;
    }

    /**
     * 是否IP，包含ipv4和ipv6
     *
     * @param $ip
     * @return bool
     */
    public static function isIp($ip): bool
    {
        return filter_var($ip, FILTER_VALIDATE_IP) !== false;
    }

    /**
     * 是否是域名
     *
     * @param $ip
     * @return bool
     */
    public static function isDomain($ip): bool
    {
        $str = "/^((?!-)[A-Za-z0-9-_]{1,255}(?<!-)\.)+[A-Za-z]{2,30}$/";
        if (!preg_match($str, $ip)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 验证IP地址范围
     * $range 支持多种写法
     *  - Wildcard： 1.2.3.*
     *  - CIRD：1.2.3/24 或者 1.2.3.4/255.255.255.0
     *  - Start-End: 1.2.3.0-1.2.3.255
     * @param $ip
     * @param $range
     * @return bool
     */
    public static function ipInRange($ip, $range)
    {
        if (substr_count($ip, '.') == 3 && $ip == $range) {
            return true;
        }
        if (str_contains($range, '/')) {
            list($range, $netmask) = explode('/', $range, 2);
            if (str_contains($netmask, '.')) {
                $netmask = str_replace('*', '0', $netmask);
                $netmask_dec = ip2long($netmask);
                return ((ip2long($ip) & $netmask_dec) == (ip2long($range) & $netmask_dec));
            } else {
                $x = explode('.', $range);
                while (count($x) < 4) {
                    $x[] = '0';
                }
                list($a, $b, $c, $d) = $x;
                $range = sprintf("%u.%u.%u.%u", empty($a) ? '0' : $a, empty($b) ? '0' : $b, empty($c) ? '0' : $c, empty($d) ? '0' : $d);
                $range_dec = ip2long($range);
                $ip_dec = ip2long($ip);
                $wildcard_dec = pow(2, (32 - $netmask)) - 1;
                $netmask_dec = ~$wildcard_dec;
                return (($ip_dec & $netmask_dec) == ($range_dec & $netmask_dec));
            }
        } else {
            if (str_contains($range, '*')) {
                $lower = str_replace('*', '0', $range);
                $upper = str_replace('*', '255', $range);
                $range = "$lower-$upper";
            }
            if (str_contains($range, '-')) {
                list($lower, $upper) = explode('-', $range, 2);
                $lower_dec = (float)sprintf("%u", ip2long($lower));
                $upper_dec = (float)sprintf("%u", ip2long($upper));
                $ip_dec = (float)sprintf("%u", ip2long($ip));
                return (($ip_dec >= $lower_dec) && ($ip_dec <= $upper_dec));
            }
            return false;
        }
    }

    /**
     * 获取IP地址最后一段
     * @param $ip
     * @return mixed|string
     */
    public static function getIpLast($ip)
    {
        $ip = explode('.', $ip);
        return $ip[count($ip) - 1];
    }

}
