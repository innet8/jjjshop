<?php

namespace app\common\library\printer\engine;

/**
 * 飞鹅打印机API引擎
 */
class Xprinter extends Basics
{
    // 接口路径
    const PATH = '/cgi-bin/print.cgi';

    //网口小票打印机IP，连接端口
    const PRINTER_IP = "";
    const PRINTER_PORT = "9100";

    /**
     * 执行订单打印
     */
    public function printTicket($content)
    {
        $config = json_decode($this->config, true);
        $content = hex2bin($content);
        $fp=@fsockopen( $config['IP'] ?? self::PRINTER_IP, $config['PORT'] ??  self::PRINTER_PORT,$errno,$errstr, 3);
        if($fp===false){ //连接打印机出错
            // DOTO 记录日志
            trace("连接打印机出错");
            return false;
        }
        if (!preg_match('/[\x{0E00}-\x{0E7F}]/u', $content) ) {
            $content = iconv("UTF-8", "GBK//IGNORE" ,$content);
        } 
        fwrite($fp, $content);
        //关闭打印机连接
        fclose($fp);
        // 
        return true;
    }


}