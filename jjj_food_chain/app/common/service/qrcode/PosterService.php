<?php

namespace app\common\service\qrcode;

use app\common\model\settings\Setting as SettingModel;
use Endroid\QrCode\QrCode;
use Grafika\Color;
use Grafika\Grafika;
use app\common\model\plus\agent\Setting;

/**
 * 分销二维码
 */
class PosterService extends Base
{
    // 分销商用户信息
    private $agent;
    // 分销商海报设置
    private $config;
    // 来源
    private $source;

    /**
     * 构造方法
     */
    public function __construct($agent, $source)
    {
        parent::__construct();
        // 分销商用户信息
        $this->agent = $agent;
        $this->source = $source;
        // 分销商海报设置
        $this->config = Setting::getItem('qrcode', $agent['app_id']);
    }

    /**
     * 获取分销二维码
     */
    public function getImage()
    {
//        if (file_exists($this->getPosterPath())) {
//            return $this->getPosterUrl();
//        }
        // 小程序id
        $appId = $this->agent['app_id'];
        // 1. 下载背景图
        $backdrop = $this->saveTempImage($appId, $this->config['backdrop']['src'], 'backdrop');
        // 2. 下载用户头像
        $avatarUrl = $this->saveTempImage($appId, $this->agent['user']['avatarUrl'], 'avatar');
        if($this->source == 'wx') {
            // 3. 下载小程序码
            $scene = 'uid:' . $this->agent['user_id'];
            $qrcode = $this->saveQrcode($appId, $scene, 'pages/index/index');
        } else if($this->source == 'mp' || $this->source == 'h5'){
            $scene = 'uid:' . $this->agent['user_id'];
            $qrcode = new QrCode(base_url().'h5/pages/index/index?referee_id='.$this->agent['user_id'].'&app_id='.$appId);
            $qrcode = $this->saveMpQrcode($qrcode, $appId, $scene, 'mp');
        } else if($this->source == 'app'){
            $appshare = SettingModel::getItem('appshare');
            if($appshare['type'] == 1){
                $down_url = $appshare['open_site']. '?app_id='.$this->agent['app_id'].'&referee_id=' .$this->agent['user_id'];
            }else{
                //下载页
                if($appshare['bind_type'] == 1){
                    $down_url = $appshare['down_url'];
                }else{
                    $down_url = base_url(). "/index.php/api/user.useropen/invite?app_id=".$this->agent['app_id']."&referee_id=" .$this->agent['user_id'];
                }
            }

            $scene = 'uid:' . $this->agent['user_id'];
            $qrcode = new QrCode($down_url);
            $qrcode = $this->saveMpQrcode($qrcode, $appId, $scene, 'mp');
        }
        // 4. 拼接海报图
        return $this->savePoster($backdrop, $avatarUrl, $qrcode);
    }

    /**
     * 海报图文件路径
     */
    private function getPosterPath()
    {
        // 保存路径
        $tempPath = root_path('public') . 'temp/' . $this->agent['app_id'] . '/' . $this->source. '/';
        !is_dir($tempPath) && mkdir($tempPath, 0755, true);
        return $tempPath . $this->getPosterName();
    }

    /**
     * 海报图文件名称
     */
    private function getPosterName()
    {
        return 'poster_' . md5($this->agent['user_id']) . '.png';
    }

    /**
     * 海报图url
     */
    private function getPosterUrl()
    {
        return \base_url() . 'temp/' . $this->agent['app_id'] . '/' .$this->source . '/' . $this->getPosterName() . '?t=' . time();
    }

    /**
     * 拼接海报图
     */
    private function savePoster($backdrop, $avatarUrl, $qrcode)
    {
        // 实例化图像编辑器
        $editor = Grafika::createEditor(['Gd']);
        // 打开海报背景图
        $editor->open($backdropImage, $backdrop);
        // 生成圆形用户头像
        $this->config['avatar']['style'] === 'circle' && $this->circular($avatarUrl, $avatarUrl);
        // 打开用户头像
        $editor->open($avatarImage, $avatarUrl);
        // 重设用户头像宽高
        $avatarWidth = $this->config['avatar']['width'] * 2;
        $editor->resizeExact($avatarImage, $avatarWidth, $avatarWidth);
        // 用户头像添加到背景图
        $avatarX = $this->config['avatar']['left'] * 2;
        $avatarY = $this->config['avatar']['top'] * 2;
        $editor->blend($backdropImage, $avatarImage, 'normal', 1.0, 'top-left', $avatarX, $avatarY);

        // 生成圆形小程序码，仅小程序支持
        if($this->source == 'wx'){
            $this->config['qrcode']['style'] === 'circle' && $this->circular($qrcode, $qrcode);
        }
        // 打开小程序码
        $editor->open($qrcodeImage, $qrcode);
        // 重设小程序码宽高
        $qrcodeWidth = $this->config['qrcode']['width'] * 2;
        $editor->resizeExact($qrcodeImage, $qrcodeWidth, $qrcodeWidth);
        // 小程序码添加到背景图
        $qrcodeX = $this->config['qrcode']['left'] * 2;
        $qrcodeY = $this->config['qrcode']['top'] * 2;
        $editor->blend($backdropImage, $qrcodeImage, 'normal', 1.0, 'top-left', $qrcodeX, $qrcodeY);

        // 写入用户昵称
        $fontSize = $this->config['nickName']['fontSize'] * 2;
        $fontX = $this->config['nickName']['left'] * 2;
        $fontY = $this->config['nickName']['top'] * 2;
        $Color = new Color($this->config['nickName']['color']);
        $fontPath = public_path() . '/static/' . 'st-heiti-light.ttc';
        $editor->text($backdropImage, $this->agent['user']['nickName'], $fontSize, $fontX, $fontY, $Color, $fontPath);

        // 保存图片
        $editor->save($backdropImage, $this->getPosterPath());
        return $this->getPosterUrl();
    }

    /**
     * 生成圆形图片
     */
    private function circular($imgpath, $saveName = '')
    {
        $srcImg = imagecreatefromstring(file_get_contents($imgpath));
        $w = imagesx($srcImg);
        $h = imagesy($srcImg);
        $w = $h = min($w, $h);
        $newImg = imagecreatetruecolor($w, $h);
        // 这一句一定要有
        imagesavealpha($newImg, true);
        // 拾取一个完全透明的颜色,最后一个参数127为全透明
        $bg = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
        imagefill($newImg, 0, 0, $bg);
        $r = $w / 2; //圆半径
        for ($x = 0; $x < $w; $x++) {
            for ($y = 0; $y < $h; $y++) {
                $rgbColor = imagecolorat($srcImg, $x, $y);
                if (((($x - $r) * ($x - $r) + ($y - $r) * ($y - $r)) < ($r * $r))) {
                    imagesetpixel($newImg, $x, $y, $rgbColor);
                }
            }
        }
        // 输出图片到文件
        imagepng($newImg, $saveName);
        // 释放空间
        imagedestroy($srcImg);
        imagedestroy($newImg);
    }

}