<?php

namespace app\common\library\printer\party;

class SunmiCloudPrinter
{
    // 替换为您申请的APPID&APPKEY Replace the applied APPID&APPKEY
    private const APP_ID = "00000000000000000000000000000000";
    private const APP_KEY = "00000000000000000000000000000000";

    public const ALIGN_LEFT   = 0;
    public const ALIGN_CENTER = 1;
    public const ALIGN_RIGHT  = 2;

    public const HRI_POS_ABOVE = 1;
    public const HRI_POS_BELOW = 2;

    public const DIFFUSE_DITHER   = 0;
    public const THRESHOLD_DITHER = 2;

    public const COLUMN_FLAG_BW_REVERSE = 1 << 0;
    public const COLUMN_FLAG_BOLD       = 1 << 1;
    public const COLUMN_FLAG_DOUBLE_H   = 1 << 2;
    public const COLUMN_FLAG_DOUBLE_W   = 1 << 3;

    private $DOTS_PER_LINE = 384;
    private $charHSize = 1;
    private $asciiCharWidth = 12;
    private $cjkCharWidth = 24;
    public $orderData = "";
    private $columnSettings = array();

    public function __construct($dots_per_line = 384)
    {
        $this->DOTS_PER_LINE = $dots_per_line;
    }

    private function generateSign($body_data, $timestamp, $nonce)
    {
        $msg = $body_data . self::APP_ID . $timestamp . $nonce;
        return hash_hmac("sha256", $msg, self::APP_KEY, false);
    }

    private function httpPost($path, $body)
    {
        $url = "https://openapi.sunmi.com" . $path;
        $timestamp = sprintf("%d", time());
        $nonce = sprintf("%06d", mt_rand(0, 999999));
        $body_data = json_encode($body, JSON_UNESCAPED_UNICODE);

        $header = [
            "Sunmi-Appid:"     . self::APP_ID,
            "Sunmi-Timestamp:" . $timestamp,
            "Sunmi-Nonce:"     . $nonce,
            "Sunmi-Sign:"      . $this->generateSign($body_data, $timestamp, $nonce),
            "Source:"          . "openapi",
            "Content-Type:"    . "application/json"
        ];

        print $url . "<br>";
        print $header[0] . "<br>";
        print $header[1] . "<br>";
        print $header[2] . "<br>";
        print $header[3] . "<br>";
        print $body_data . "<br>";
        print "<br>";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body_data);
        $data = curl_exec($ch);
        if (curl_errno($ch)) {
            print("FAILED<br>");
            $res = curl_error($ch);
        } else {
            print("OK<br>");
            $res = json_decode($data, true);
        }
        curl_close($ch);
        print($data);
        return $res;
    }

    function bindShop($sn, $shop_id)
    {
        $body = [
            "sn"        => $sn,
            "shop_id"   => $shop_id
        ];
        $this->httpPost("/v2/printer/open/open/device/bindShop", $body);
    }

    function unbindShop($sn, $shop_id)
    {
        $body = [
            "sn"        => $sn,
            "shop_id"   => $shop_id
        ];
        $this->httpPost("/v2/printer/open/open/device/unbindShop", $body);
    }

    function onlineStatus($sn)
    {
        $body = [
            "sn" => $sn
        ];
        $this->httpPost("/v2/printer/open/open/device/onlineStatus", $body);
    }

    function clearPrintJob($sn)
    {
        $body = [
            "sn" => $sn
        ];
        $this->httpPost("/v2/printer/open/open/device/clearPrintJob", $body);
    }

    function pushVoice($sn, $content, $cycle = 1, $interval = 2, $expire_in = 300)
    {
        $body = [
            "sn"        => $sn,
            "content"   => $content,
            "cycle"     => $cycle,
            "interval"  => $interval,
            "expire_in" => $expire_in
        ];
        $this->httpPost("/v2/printer/open/open/device/pushVoice", $body);
    }

    function pushContent($sn, $trade_no, $order_type = 1, $count = 1, $media_text = "", $cycle = 1)
    {
        $body = [
            "sn"            => $sn,
            "trade_no"      => $trade_no,
            "content"       => $this->orderData,
            "order_type"    => $order_type,
            "count"         => $count,
            "media_text"    => $media_text,
            "cycle"         => $cycle
        ];
        $this->httpPost("/v2/printer/open/open/device/pushContent", $body);
    }

    function printStatus($trade_no)
    {
        $body = [
            "trade_no" => $trade_no
        ];
        $this->httpPost("/v2/printer/open/open/ticket/printStatus", $body);
    }

    function newTicketNotify($sn)
    {
        $body = [
            "sn" => $sn
        ];
        $this->httpPost("/v2/printer/open/open/ticket/newTicketNotify", $body);
    }

    //////////////////////////////////////////////////
    // Basic ESC/POS Commands
    //////////////////////////////////////////////////

    function clear()
    {
        $this->orderData = "";
    }

    // Append raw data.
    function appendRawData($data)
    {
        $this->orderData .= strtolower($data);
    }

    function unicode_to_utf8($unicode)
    {
        if ($unicode <= 0x7f) {
            $n = $unicode & 0x7f;
            return sprintf("%02x", $n);
        }
        if ($unicode >= 0x80 && $unicode <= 0x7ff) {
            $n  = ((($unicode >> 6) & 0x1f) | 0xc0) << 8;
            $n |= ((($unicode     ) & 0x3f) | 0x80);
            return sprintf("%04x", $n);
        }
        if ($unicode >= 0x800 && $unicode <= 0xffff) {
            $n  = ((($unicode >> 12) & 0x0f) | 0xe0) << 16;
            $n |= ((($unicode >> 6 ) & 0x3f) | 0x80) << 8;
            $n |= ((($unicode      ) & 0x3f) | 0x80);
            return sprintf("%06x", $n);
        }
        if ($unicode >= 0x10000 && $unicode <= 0x10ffff) {
            $n  = ((($unicode >> 18) & 0x07) | 0xf0) << 24;
            $n |= ((($unicode >> 12) & 0x3f) | 0x80) << 16;
            $n |= ((($unicode >> 6 ) & 0x3f) | 0x80) << 8;
            $n |= ((($unicode      ) & 0x3f) | 0x80);
            return sprintf("%08x", $n);
        }
        return "";
    }

    function utf8_to_unicode($str, $size, &$unicode)
    {
        $unicode = 0;

        if ($size < 1)
            return 0;
        $v0 = ord($str[0]);
        if (($v0 & 0x80) == 0x00) {
            $unicode = $v0;
            return 1;
        }

        if ($size < 2)
            return $size;
        $v1 = ord($str[1]);
        if (($v0 & 0xe0) == 0xc0 &&
            ($v1 & 0xc0) == 0x80) {
            $unicode = (($v0 & 0x1f) << 6) + ($v1 & 0x3f);
            return 2;
        }

        if ($size < 3)
            return $size;
        $v2 = ord($str[2]);
        if (($v0 & 0xf0) == 0xe0 &&
            ($v1 & 0xc0) == 0x80 &&
            ($v2 & 0xc0) == 0x80) {
            $unicode = (($v0 & 0x0f) << 12) + (($v1 & 0x3f) << 6) + ($v2 & 0x3f);
            return 3;
        }

        if ($size < 4)
            return $size;
        $v3 = ord($str[3]);
        if (($v0 & 0xF8) == 0xf0 &&
            ($v1 & 0xc0) == 0x80 &&
            ($v2 & 0xc0) == 0x80 &&
            ($v3 & 0xc0) == 0x80) {
            $unicode = (($v0 & 0x07) << 18) + (($v1 & 0x3f) << 12) + (($v2 & 0x3f) << 6) + ($v3 & 0x3f);
            return 4;
        }

        return 1;
    }

    // Append unicode character.
    function appendUnicode($unicode, $count)
    {
        $utf8 = $this->unicode_to_utf8($unicode);
        for ($i = 0; $i < $count; $i++)
            $this->orderData .= $utf8;
    }

    // Append text.
    function appendText($text)
    {
        for ($i = 0; $i < strlen($text); $i++)
            $this->orderData .= sprintf("%02x", ord($text[$i]));
    }

    // [LF] Print data in the buffer and feed lines.
    function lineFeed($n = 1)
    {
        for ($i = 0; $i < $n; $i++)
            $this->orderData .= "0a";
    }

    // [ESC @] Restore default settings.
    function restoreDefaultSettings()
    {
        $this->charHSize = 1;
        $this->orderData .= "1b40";
    }

    // [ESC 2] Restore default line spacing.
    function restoreDefaultLineSpacing()
    {
        $this->orderData .= "1b32";
    }

    // [ESC 3] Set line spacing.
    function setLineSpacing($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1b33%02x", $n);
    }

    // [ESC !] Set print modes.
    function setPrintModes($bold, $double_h, $double_w)
    {
        $n = 0;
        if ($bold)
            $n |= 8;
        if ($double_h)
            $n |= 16;
        if ($double_w)
            $n |= 32;
        $this->charHSize = ($double_w) ? 2 : 1;
        $this->orderData .= sprintf("1b21%02x", $n);
    }

    // [GS !] Set character size.
    function setCharacterSize($h, $w)
    {
        $n = 0;
        if ($h >= 1 && $h <= 8)
            $n |= ($h - 1);
        if ($w >= 1 && $w <= 8) {
            $n |= ($w - 1) << 4;
            $this->charHSize = $w;
        }
        $this->orderData .= sprintf("1d21%02x", $n);
    }

    // [HT] Jump to next TAB position.
    function horizontalTab($n)
    {
        for ($i = 0; $i < $n; $i++)
            $this->orderData .= "09";
    }

    // [ESC $] Set absolute print position.
    function setAbsolutePrintPosition($n)
    {
        if ($n >= 0 && $n <= 65535)
            $this->orderData .= sprintf("1b24%02x%02x", ($n & 0xff), (($n >> 8) & 0xff));
    }

    // [ESC \] Set relative print position.
    function setRelativePrintPosition($n)
    {
        if ($n >= -32768 && $n <= 32767)
            $this->orderData .= sprintf("1b5c%02x%02x", ($n & 0xff), (($n >> 8) & 0xff));
    }

    // [ESC a] Set alignment.
    function setAlignment($n)
    {
        if ($n >= 0 && $n <= 2)
            $this->orderData .= sprintf("1b61%02x", $n);
    }

    // [ESC -] Set underline mode.
    function setUnderlineMode($n)
    {
        if ($n >= 0 && $n <= 2)
            $this->orderData .= sprintf("1b2d%02x", $n);
    }

    // [GS B] Set black-white reverse mode.
    function setBlackWhiteReverseMode($enabled)
    {
        $this->orderData .= sprintf("1d42%02x", ($enabled) ? 1 : 0);
    }

    // [ESC {] Set upside down mode.
    function setUpsideDownMode($enabled)
    {
        $this->orderData .= sprintf("1b7b%02x", ($enabled) ? 1 : 0);
    }

    // [GS V m] Cut paper.
    function cutPaper($full_cut)
    {
        $this->orderData .= sprintf("1d56%02x", ($full_cut) ? 48 : 49);
    }

    // [GS V m n] Postponed cut paper.
    // Upon receiving this command, the printer will not perform the cut until
    // (d + n) dot lines are fed, where d is the distance between the print position
    // and the cut position.
    function postponedCutPaper($full_cut, $n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d56%02x%02x", ($full_cut) ? 97 : 98, $n);
    }

    //////////////////////////////////////////////////
    // Sunmi Proprietary Commands
    //////////////////////////////////////////////////

    // Set CJK encoding (effective when UTF-8 mode is disabled).
    //   n  encoding
    // ---  --------
    //   0  GB18030
    //   1  BIG5
    //  11  Shift_JIS
    //  12  JIS 0208
    //  21  KS C 5601
    // 128  Disable CJK mode
    // 255  Restore to default
    function setCjkEncoding($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d284503000601%02x", $n);
    }

    // Set UTF-8 mode.
    //   n  mode
    // ---  ----
    //   0  Disabled
    //   1  Enabled
    // 255  Restore to default
    function setUtf8Mode($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d284503000603%02x", $n);
    }

    // Set Latin character size of vector font.
    function setHarfBuzzAsciiCharSize($n)
    {
        if ($n >= 0 && $n <= 255) {
            $this->asciiCharWidth = $n;
            $this->orderData .= sprintf("1d28450300060a%02x", $n);
        }
    }

    // Set CJK character size of vector font.
    function setHarfBuzzCjkCharSize($n)
    {
        if ($n >= 0 && $n <= 255) {
            $this->cjkCharWidth = $n;
            $this->orderData .= sprintf("1d28450300060b%02x", $n);
        }
    }

    // Set other character size of vector font.
    function setHarfBuzzOtherCharSize($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d28450300060c%02x", $n);
    }

    // Select font for Latin characters.
    //     n  font
    // -----  ----
    //     0  Built-in lattice font
    //     1  Built-in vector font
    // >=128  The (n-128)th custom vector font
    function selectAsciiCharFont($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d284503000614%02x", $n);
    }

    // Select font for CJK characters.
    //     n  font
    // -----  ----
    //     0  Built-in lattice font
    //     1  Built-in vector font
    // >=128  The (n-128)th custom vector font
    function selectCjkCharFont($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d284503000615%02x", $n);
    }

    // Select font for other characters.
    //     n  font
    // -----  ----
    //   0,1  Built-in vector font
    // >=128  The (n-128)th custom vector font
    function selectOtherCharFont($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d284503000616%02x", $n);
    }

    // Set print density.
    function setPrintDensity($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d2845020007%02x", $n);
    }

    // Set print speed.
    function setPrintSpeed($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d2845020008%02x", $n);
    }

    // Set cutter mode.
    // n  mode
    // -  ----
    // 0  Perform full-cut or partial-cut according to the cutting command
    // 1  Perform partial-cut always on any cutting command
    // 2  Perform full-cut always on any cutting command
    // 3  Never cut on any cutting command
    function setCutterMode($n)
    {
        if ($n >= 0 && $n <= 255)
            $this->orderData .= sprintf("1d2845020010%02x", $n);
    }

    // Clear paper-not-taken alarm.
    function clearPaperNotTakenAlarm()
    {
        $this->orderData .= "1d2854010004";
    }

    //////////////////////////////////////////////////
    // Print in Columns
    //////////////////////////////////////////////////

    function widthOfChar($c)
    {
        if (($c >= 0x00020 && $c <= 0x0036f))
            return $this->asciiCharWidth;
        if (($c >= 0x0ff61 && $c <= 0x0ff9f))
            return $this->cjkCharWidth / 2;
        if (($c == 0x02010                 ) ||
            ($c >= 0x02013 && $c <= 0x02016) ||
            ($c >= 0x02018 && $c <= 0x02019) ||
            ($c >= 0x0201c && $c <= 0x0201d) ||
            ($c >= 0x02025 && $c <= 0x02026) ||
            ($c >= 0x02030 && $c <= 0x02033) ||
            ($c == 0x02035                 ) ||
            ($c == 0x0203b                 ))
            return $this->cjkCharWidth;
        if (($c >= 0x01100 && $c <= 0x011ff) ||
            ($c >= 0x02460 && $c <= 0x024ff) ||
            ($c >= 0x025a0 && $c <= 0x027bf) ||
            ($c >= 0x02e80 && $c <= 0x02fdf) ||
            ($c >= 0x03000 && $c <= 0x0318f) ||
            ($c >= 0x031a0 && $c <= 0x031ef) ||
            ($c >= 0x03200 && $c <= 0x09fff) ||
            ($c >= 0x0ac00 && $c <= 0x0d7ff) ||
            ($c >= 0x0f900 && $c <= 0x0faff) ||
            ($c >= 0x0fe30 && $c <= 0x0fe4f) ||
            ($c >= 0x1f000 && $c <= 0x1f9ff))
            return $this->cjkCharWidth;
        if (($c >= 0x0ff01 && $c <= 0x0ff5e) ||
            ($c >= 0x0ffe0 && $c <= 0x0ffe5))
            return $this->cjkCharWidth;
        return $this->asciiCharWidth;
    }

    function widthOfString($str)
    {
        $w = 0;
        $i = 0;
        while ($i < strlen($str)) {
            $s = substr($str, $i);
            $i += $this->utf8_to_unicode($s, strlen($s), $c);
            $w += $this->widthOfChar($c) * $this->charHSize;
        }
        return $w;
    }

    function setupColumns()
    {
        unset($this->columnSettings);
        $remain = $this->DOTS_PER_LINE;
        for ($i = 0; $i < func_num_args(); $i++) {
            $s = func_get_arg($i);
            if ($s[0] == 0 || $s[0] > $remain)
                $s[0] = $remain;
            $this->columnSettings[] = $s;
            $remain -= $s[0];
            if ($remain == 0)
                return;
        }
    }

    function printInColumns()
    {
        if (count($this->columnSettings) == 0)
            return;

        $strcur = array();
        $strrem = array();
        $strwidth = array();

        $num_of_columns = 0;
        for ($i = 0; $i < func_num_args(); $i++) {
            if ($i == count($this->columnSettings))
                break;
            $strcur[] = "";
            $strrem[] = func_get_arg($i);
            $strwidth[] = 0;
            $num_of_columns++;
        }

        do {
            $done = true;
            $pos = 0;

            for ($i = 0; $i < $num_of_columns; $i++) {
                $width = $this->columnSettings[$i][0];
                $alignment = $this->columnSettings[$i][1];
                $flag = $this->columnSettings[$i][2];

                if (strlen($strrem[$i]) == 0) {
                    $pos += $width;
                    continue;
                }

                $done = false;
                $strcur[$i] = "";
                $strwidth[$i] = 0;
                while (strlen($strrem[$i]) > 0) {
                    $bytes = $this->utf8_to_unicode($strrem[$i], strlen($strrem[$i]), $c);
                    if ($c == 0x0a) {
                        $strrem[$i] = substr($strrem[$i], 1);
                        break;
                    } else {
                        $w = $this->widthOfChar($c) * $this->charHSize;
                        if (($flag & self::COLUMN_FLAG_DOUBLE_W) != 0)
                            $w *= 2;
                        if ($strwidth[$i] + $w > $width) {
                            break;
                        } else {
                            $strcur[$i] .= substr($strrem[$i], 0, $bytes);
                            $strwidth[$i] += $w;
                            $strrem[$i] = substr($strrem[$i], $bytes);
                        }
                    }
                }

                switch ($alignment) {
                case self::ALIGN_CENTER:
                    $this->setAbsolutePrintPosition($pos + ($width - $strwidth[$i]) / 2);
                    break;
                case self::ALIGN_RIGHT:
                    $this->setAbsolutePrintPosition($pos + ($width - $strwidth[$i]));
                    break;
                default:
                    $this->setAbsolutePrintPosition($pos);
                    break;
                }
                if (($flag & self::COLUMN_FLAG_BW_REVERSE) != 0)
                    $this->setBlackWhiteReverseMode(true);
                if (($flag & (self::COLUMN_FLAG_BOLD | self::COLUMN_FLAG_DOUBLE_H | self::COLUMN_FLAG_DOUBLE_W)) != 0)
                    $this->setPrintModes(($flag & self::COLUMN_FLAG_BOLD) != 0, ($flag & self::COLUMN_FLAG_DOUBLE_H) != 0, ($flag & self::COLUMN_FLAG_DOUBLE_W) != 0);
                $this->appendText($strcur[$i]);
                if (($flag & (self::COLUMN_FLAG_BOLD | self::COLUMN_FLAG_DOUBLE_H | self::COLUMN_FLAG_DOUBLE_W)) != 0)
                    $this->setPrintModes(false, false, false);
                if (($flag & self::COLUMN_FLAG_BW_REVERSE) != 0)
                    $this->setBlackWhiteReverseMode(false);
                $pos += $width;
            }
            if (!$done)
                $this->lineFeed();
        } while (!$done);
    }

    //////////////////////////////////////////////////
    // Barcode & QR Code Printing
    //////////////////////////////////////////////////

    // Append a barcode.
    function appendBarcode($hri_pos, $height, $module_size, $barcode_type, $text)
    {
        $text_length = strlen($text);
        if ($text_length == 0)
            return;
        if ($text_length > 255)
            $text_length = 255;
        if ($height < 1)
            $height = 1;
        else if ($height > 255)
            $height = 255;
        if ($module_size < 1)
            $module_size = 1;
        else if ($module_size > 6)
            $module_size = 6;

        $this->orderData .= sprintf("1d48%02x", ($hri_pos & 3));
        $this->orderData .= "1d6600";
        $this->orderData .= sprintf("1d68%02x", $height);
        $this->orderData .= sprintf("1d77%02x", $module_size);
        $this->orderData .= sprintf("1d6b%02x%02x", $barcode_type, $text_length);

        for ($i = 0; $i < $text_length; $i++)
            $this->orderData .= sprintf("%02x", ord($text[$i]));
    }

    // Append a QR code.
    function appendQRcode($module_size, $ec_level, $text)
    {
        $text_length = strlen($text);
        if ($text_length == 0)
            return;
        if ($text_length > 65535)
            $text_length = 65535;
        if ($module_size < 1)
            $module_size = 1;
        else if ($module_size > 16)
            $module_size = 16;
        if ($ec_level < 0)
            $ec_level = 0;
        else if ($ec_level > 3)
            $ec_level = 3;

        $this->orderData .= "1d286b040031410000";
        $this->orderData .= sprintf("1d286b03003143%02x", $module_size);
        $this->orderData .= sprintf("1d286b03003145%02x", $ec_level + 48);
        $this->orderData .= sprintf("1d286b%02x%02x315030", (($text_length + 3) & 0xFF), ((($text_length + 3) >> 8) & 0xFF));

        for ($i = 0; $i < $text_length; $i++)
            $this->orderData .= sprintf("%02x", ord($text[$i]));

        $this->orderData .= "1d286b0300315130";
    }

    //////////////////////////////////////////////////
    // Image Printing
    //////////////////////////////////////////////////

    // Grayscale to monochrome - diffuse dithering algorithm.
    function diffuseDither($src_data, $width, $height)
    {
        $line1 = 0;
        $line2 = 1;
        $bmwidth = intval(($width + 7) / 8);

        $dst_data = array_fill(0, $bmwidth * $height, 0);
        $linebuf[0] = array_fill(0, $width * $height, 0);
        $linebuf[1] = array_fill(0, $width * $height, 0);

        for ($x = 0; $x < $width; $x++)
            $linebuf[1][$x] = $src_data[$x];

        for ($y = 0; $y < $height; $y++) {
            $tmp = $line1;
            $line1 = $line2;
            $line2 = $tmp;
            $not_last_line = ($y < $height - 1) ? true : false;
            if ($not_last_line) {
                $p = ($y + 1) * $width;
                for ($x = 0; $x < $width; $x++)
                    $linebuf[$line2][$x] = $src_data[$p + $x];
            }

            $q = $bmwidth * $y;
            for ($i = 0; $i < $bmwidth; $i++)
                $dst_data[$q + $i] = 0;
            $b1 = 0;
            $b2 = 0;
            $mask = 0x80;
            for ($x = 1; $x <= $width; $x++) {
                if ($linebuf[$line1][$b1] < 128) { // black pixel
                    $err = $linebuf[$line1][$b1++];
                    $dst_data[$q] |= $mask;
                } else { // white pixel
                    $err = $linebuf[$line1][$b1++] - 255;
                }
                if ($mask == 1) {
                    $q++;
                    $mask = 0x80;
                } else {
                    $mask >>= 1;
                }
                $e7 = (($err * 7) + 8) >> 4;
                $e5 = (($err * 5) + 8) >> 4;
                $e3 = (($err * 3) + 8) >> 4;
                $e1 = $err - ($e7 + $e5 + $e3);
                if ($x < $width)
                    $linebuf[$line1][$b1] += $e7; // spread error to right pixel
                if ($not_last_line) {
                    $linebuf[$line2][$b2] += $e5; // pixel below
                    if ($x > 1)
                        $linebuf[$line2][$b2 - 1] += $e3; // pixel below left
                    if ($x < $width)
                        $linebuf[$line2][$b2 + 1] += $e1; // pixel below right
                }
                $b2++;
            }
        }

        $dst_data = array_pad($dst_data, -(count($dst_data) + 8), 0);
        $dst_data[0] = 0x1d;
        $dst_data[1] = 0x76;
        $dst_data[2] = 0x30;
        $dst_data[3] = 0x00;
        $dst_data[4] = ($bmwidth     ) & 0xff;
        $dst_data[5] = ($bmwidth >> 8) & 0xff;
        $dst_data[6] = ($height      ) & 0xff;
        $dst_data[7] = ($height  >> 8) & 0xff;

        for ($i = 0; $i < count($dst_data); $i++)
            $this->orderData .= sprintf("%02x", $dst_data[$i]);
    }

    // Grayscale to monochrome - threshold dithering algorithm.
    function thresholdDither($src_data, $width, $height)
    {
        $bmwidth = intval(($width + 7) / 8);

        $dst_data = array_fill(0, $bmwidth * $height, 0);

        $p = 0;
        $q = 0;
        for ($y = 0; $y < $height; $y++) {
            $mask = 0x80;
            $k = 0;
            for ($x = 0; $x < $width; $x++) {
                if ($src_data[$p + $x] < 128) // black pixel
                    $dst_data[$q + $k] |= $mask;
                if ($mask == 1) {
                    $k++;
                    $mask = 0x80;
                } else {
                    $mask >>= 1;
                }
            }
            $p += $width;
            $q += $bmwidth;
        }

        $dst_data = array_pad($dst_data, -(count($dst_data) + 8), 0);
        $dst_data[0] = 0x1d;
        $dst_data[1] = 0x76;
        $dst_data[2] = 0x30;
        $dst_data[3] = 0x00;
        $dst_data[4] = ($bmwidth     ) & 0xff;
        $dst_data[5] = ($bmwidth >> 8) & 0xff;
        $dst_data[6] = ($height      ) & 0xff;
        $dst_data[7] = ($height  >> 8) & 0xff;

        for ($i = 0; $i < count($dst_data); $i++)
            $this->orderData .= sprintf("%02x", $dst_data[$i]);
    }

    // Append an image.
    function appendImage($image_file, $mode, $max_width = 0)
    {
        list($org_width, $org_height, $type) = getimagesize($image_file);

        switch ($type) {
        case 1: // GIF
            $org_image = imagecreatefromgif($image_file);
            break;
        case 2: // JPG
            $org_image = imagecreatefromjpeg($image_file);
            break;
        case 3: // PNG
            $org_image = imagecreatefrompng($image_file);
            break;
        case 6: // BMP
            $org_image = imagecreatefrombmp($image_file);
            break;
        default:
            return;
        }

        if ($max_width <= 0 || $max_width > $this->DOTS_PER_LINE)
            $max_width = $this->DOTS_PER_LINE;

        $w = $org_width;
        $h = $org_height;

        if ($w > $max_width) {
            $h = $max_width * $h / $w;
            $w = $max_width;
        }

        $image = imagecreatetruecolor($w, $h);
        imagecopyresampled($image, $org_image, 0, 0, 0, 0, $w, $h, $org_width, $org_height);

        $i = 0;
        for ($y = 0; $y < $h; $y++) {
            for ($x = 0; $x < $w; $x++) {
                $rgb = imagecolorat($image, $x, $y);
                $r = ($rgb >> 16) & 0xff;
                $g = ($rgb >> 8 ) & 0xff;
                $b = ($rgb      ) & 0xff;
                $grayscale[$i++] = (($r * 11 + $g * 16 + $b * 5) / 32) & 0xff;
            }
        }
        imagedestroy($image);

        switch ($mode) {
        case self::DIFFUSE_DITHER:
            $this->orderData .= $this->diffuseDither($grayscale, $w, $h);
            break;
        case self::THRESHOLD_DITHER:
            $this->orderData .= $this->thresholdDither($grayscale, $w, $h);
            break;
        default:
            break;
        }
    }

    //////////////////////////////////////////////////
    // Page Mode Commands
    //////////////////////////////////////////////////

    // [ESC L] Enter page mode.
    function enterPageMode()
    {
        $this->orderData .= "1b4c";
    }

    // [ESC W] Set print area in page mode.
    // x, y: origin of the print area
    // w, h: width and height of the print area
    function setPrintAreaInPageMode($x, $y, $w, $h)
    {
        $this->orderData .= "1b57";
        $this->orderData .= sprintf("%02x%02x", ($x & 0xff), (($x >> 8) & 0xff));
        $this->orderData .= sprintf("%02x%02x", ($y & 0xff), (($y >> 8) & 0xff));
        $this->orderData .= sprintf("%02x%02x", ($w & 0xff), (($w >> 8) & 0xff));
        $this->orderData .= sprintf("%02x%02x", ($h & 0xff), (($h >> 8) & 0xff));
    }

    // [ESC T] Select print direction in page mode.
    // dir: 0:normal; 1:rotate 90-degree clockwise; 2:rotate 180-degree clockwise; 3:rotate 270-degree clockwise
    function setPrintDirectionInPageMode($dir)
    {
        if ($dir >= 0 && $dir <= 3)
            $this->orderData .= sprintf("1b54%02x", $dir);
    }

    // [GS $] Set absolute vertical print position in page mode.
    function setAbsoluteVerticalPrintPositionInPageMode($n)
    {
        if ($n >= 0 && $n <= 65535)
            $this->orderData .= sprintf("1d24%02x%02x", ($n & 0xff), (($n >> 8) & 0xff));
    }

    // [GS \] Set relative vertical print position in page mode.
    function setRelativeVerticalPrintPositionInPageMode($n)
    {
        if ($n >= -32768 && $n <= 32767)
            $this->orderData .= sprintf("1d5c%02x%02x", ($n & 0xff), (($n >> 8) & 0xff));
    }

    // [FF] Print data in the buffer and exit page mode.
    function printAndExitPageMode()
    {
        $this->orderData .= "0c";
    }

    // [ESC FF] Print data in the buffer (and keep in page mode).
    function printInPageMode()
    {
        $this->orderData .= "1b0c";
    }

    // [CAN] Clear data in the buffer (and keep in page mode).
    function clearInPageMode()
    {
        $this->orderData .= "18";
    }

    // [ESC S] Exit page mode and discard data in the buffer without printing.
    function exitPageMode()
    {
        $this->orderData .= "1b53";
    }
}
