<?php

namespace help;

use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use Exception;


class ImgHelp
{

     /**
     * @param string $data 内容
     * @param int $size 尺寸
     * @param int $margin 外边距
     * @return string
     * @throws Exception
     */
    public static function qrcode($data, $size = 300, $margin = 0)
    {
        $writer = new PngWriter();
        $qrCode = QrCode::create($data)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(new ErrorCorrectionLevelHigh()) // 错误矫正：高级
            ->setSize($size)
            ->setMargin($margin)
            ->setRoundBlockSizeMode(new RoundBlockSizeModeMargin())
            ->setForegroundColor(new Color(0, 0, 0)) // 前景黑色
            ->setBackgroundColor(new Color(255, 255, 255)); // 背景白色
        return $writer->write($qrCode)->getDataUri(); // 返回base64图片
    }

}
