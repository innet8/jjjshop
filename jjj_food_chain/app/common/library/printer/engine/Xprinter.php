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
        dump($content);
        die;
        $config = json_decode($this->config, true);
        $content = hex2bin($content);
        $fp=@fsockopen( $config['IP'] ?? self::PRINTER_IP, $config['PORT'] ??  self::PRINTER_PORT,$errno,$errstr, 3);
        if($fp===false){ //连接打印机出错
            // DOTO 记录日志
            trace("连接打印机出错");
            return false;
        }
        if (!preg_match('/[\p{Thai}]/u', $content)) {
            $content = iconv("UTF-8", "GBK//IGNORE", $content);
        } else {
            $content = iconv("UTF-8", "UTF-8//IGNORE", $content);
        }
        
        // 发送指令和数据
        fwrite($fp, "\x1B@");  // 初始化打印机
        fwrite($fp, "\x1BA");  // 选择字符编码
        fwrite($fp, "\x1BB\x0D");  // 设置字符大小
        fwrite($fp, "\x1BT\x03");  // 设置字符间距

        // 发送泰语文本
        $thai_text = "สวัสดีชาวโลก";  // "世界你好"的泰语翻译
        fwrite($fp, iconv("UTF-8", "CP874", $thai_text));  // 将UTF-8编码转换为泰语编码CP874

        // 发送打印指令
        fwrite($fp, "\x1BD");  // 切纸

        // fwrite($fp, $content);
        //关闭打印机连接
        fclose($fp);
        // 
        return true;
    }


}