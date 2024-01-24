<?php

namespace app\common\library\printer\engine;

use help\HttpHelp;

// "http://192.168.100.85/cgi-bin/status.cgi?sn=N439233P10468&copies=1"
// "http://192.168.100.85/cgi-bin/print.cgi?sn=N439233P10468&copies=1"

/**
 * 飞鹅打印机API引擎
 */
class Sunmi extends Basics
{
    // 接口路径
    const PATH = '/cgi-bin/print.cgi';

    /**
     * 执行订单打印
     */
    public function printTicket($content)
    {
        $config = json_decode($this->config, true);
        $url = 'http://' . $config['IP'] . self::PATH . "?sn={$config['SN']}&copies={$this->times}";
        return HttpHelp::postRequest($url, $content ,['Content-Type: text/plain; charset=uft-8'], 3);
    }


}