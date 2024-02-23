<?php

namespace app\common\library\language;

use think\facade\Filesystem;
use app\common\library\language\engine\Google;
use app\common\library\language\engine\YouDao;

/**
 * 多语言管理类
 */
class Language
{
    // 当前文件语言集
    // zh: 中文 | zhtw: 繁体中文 | en: 英文 | th: 泰文 | ja: 日文 | tr: 土耳其文 | ko：韩语
    private $targetFiles = ['zh', 'zhtw', 'en', 'th', 'ja', 'tr', 'ko'];

    // 谷歌语言集
    private $googleTargetFiles = ['zh', 'zh-TW', 'en', 'th', 'ja', 'tr', 'ko'];

    // 有道语言集
    private $youdaoTargetFiles = ['zh-CHS', 'zh-CHT', 'en', 'th', 'ja', 'tr', 'ko'];

    // 当前语言文件路径
    private $langFilePath = 'lang/';

    // 有道翻译参数
    private $youdaoAppKey;
    private $youdaoSecKey;


    public function __construct()
    {
        $this->youdaoAppKey = env('YOUDAO_APP_KEY') ?? '';
        $this->youdaoSecKey = env('YOUDAO_SEC_KEY') ?? '';
    }

    /**
     * 语言提取
     *
     * @param array $texts
     * @return array
     */
    public function extractTexts($texts = [])
    {
        if (!empty($texts)) {
            return $texts;
        }
        $arr = [];
        $files = self::getDirAllFile(app_path());
        foreach ($files as $file) {
            $contents = file_get_contents($file);
            $contents = preg_replace('/\/\*\*.*\n(.*\*.*\n)+/', '', $contents); // 去掉注释
            preg_match_all("/(\'|\")((auto\.)?(([a-zA-Z0-9\/\-]+)?[\x{4e00}-\x{9fa5}]+.*?))(\'|\")/u", $contents, $match); // 匹配中文
            $arr = array_merge($arr, $match[4] ?? []);
        }
        $texts = array_values(array_filter(array_unique($arr)));
        return $texts;
    }

    /**
     * 获取已翻译中文
     *
     * @return array
     */
    public function getTranslatedTexts()
    {
        $translated = !is_file('lang/zh/auto.php') ? [] : include('lang/zh/auto.php');
        return $translated;
    }

    /**
     * 过滤已翻译中文
     *
     * @param array $texts
     * @param array $translated
     * @return array
     */
    public function filterTexts($texts, $translated)
    {
        $texts = array_filter($texts, function ($text) use ($translated) {
            return empty(($translated[$text] ?? '')) && !str_contains($text, '$') && !str_contains($text, '","');
        });
        return $texts;
    }

    /**
     * 获取目标语言
     *
     * @param string $channel
     * @return array
     */
    public function getTargets($channel)
    {
        $targets = [];
        if ($channel == 'google') {
            $targets = array_combine($this->targetFiles, $this->googleTargetFiles);
        } else if ($channel == 'youdao') {
            $targets = array_combine($this->targetFiles, $this->youdaoTargetFiles);
        }
        return $targets;
    }

    /**
     * 获取翻译引擎
     *
     * @param string $channel
     * @return Google|YouDao|null
     */
    public function getTranslator($channel)
    {
        if ($channel == 'google') {
            $tr = new Google(); // Translates to 'en' from auto-detected language by default
        } else if ($channel == 'youdao') {
            $tr = new YouDao($this->youdaoAppKey, $this->youdaoSecKey);
        } else {
            return;
        }
        return $tr;
    }

    /**
     * 获取保存路径
     *
     * @param string $file
     * @return string
     */
    public function getSavePath($file)
    {
        return $this->langFilePath . $file . '/auto.php';
    }

    /**
     * 初始化保存路径
     *
     * @param string $file
     * @return string
     */
    public function initSavePath($file)
    {
        $savePath = $this->getSavePath($file);
        $this->makeDir($this->langFilePath . $file);
        if (!is_file($savePath)) {
            $emptyContent = <<<EOF
                <?php
                return [];
                EOF;
            file_put_contents($savePath, $emptyContent);
        }
        return $savePath;
    }

    /**
     * 获取新翻译语言
     */
    public function getTranslatedLang()
    {
        $newTargets = [];
        foreach ($this->targetFiles as $target) {
            $savePath = $this->getSavePath($target);
            if (!file_exists($savePath)) {
                $newTargets[$target] = $target;
            }
        }
        return array_merge($newTargets, ['zh' => 'zh']);
    }

    /**
     * 执行翻译
     *
     * @param array $targets
     * @param array $texts
     * @param [type] $tr
     * @return void
     */
    public function commandExecute($targets = [], $texts = [], $tr = null)
    {
        if (empty($targets) || empty($texts) || empty($tr)) {
            return;
        }
        //
        $textChunks = array_chunk(array_values($texts), 200);
        foreach ($targets as $file => $target) {
            $savePath = $this->initSavePath($file);
            $translation = include($savePath);

            foreach ($textChunks as $chunk) {
                if ($file == 'zh') {
                    foreach ($chunk as $item) {
                        $translation[$item] = $item;
                    }
                } else {
                    $q = implode("\n", $chunk);
                    $trans = $tr->translate($q, $targets['zh'], $target);
                    //
                    $trans = is_string($trans) ? $trans : '';
                    $translation = array_merge($translation, array_combine($chunk, explode("\n", $trans)));
                }
            }

            // 有替换符的放最下面，按照长度排序
            uksort($translation, function ($text1, $text2) {
                $idx1 = strlen($text1);
                $idx2 = strlen($text2);
                if (preg_match('/:[a-zA-Z_]+/', $text1)) {
                    $idx1 = 99999;
                }
                if (preg_match('/:[a-zA-Z_]+/', $text2)) {
                    $idx2 = 99999;
                }
                if (99999 == $idx1 && $idx1 == $idx2) {
                    $idx1 += strlen($text1);
                    $idx2 += strlen($text2);
                }
                return $idx1 - $idx2;
            });

            $translationContent = '';
            foreach ($translation as $k => $v) {
                $translationContent .= sprintf('    "%s" => "%s",' . PHP_EOL, $k, $v);
            }
            $filledContent = <<<EOF
            <?php
            return [
            $translationContent];
            EOF;
            file_put_contents($savePath, $filledContent);
        }
    }

    /**
     * 新建目录
     * @param $path
     * @return mixed
     */
    public function makeDir($path)
    {
        try {
            Filesystem::createDirectory($path);
        } catch (\Exception $e) {
        }
        if (!file_exists($path)) {
            $this->makeDir(dirname($path));
            @mkdir($path, 0777);
            @chmod($path, 0777);
        }
        return $path;
    }

    /**
     * 获取目录下所有文件
     * @param $path
     * @param array $arr
     * @return array
     */
    public function getDirAllFile($path, $arr = [])
    {
        $arr = array();
        if (is_file($path)) {
            if (str_ends_with($path, '.php')) {
                $arr[] = $path;
            }
        } else {
            if (is_dir($path)) {
                $data = scandir($path);
                if (!empty($data)) {
                    foreach ($data as $value) {
                        if ($value != '.' && $value != '..') {
                            $sub_path = $path . "/" . $value;
                            $temp = self::getDirAllFile($sub_path);
                            $arr = array_merge($temp, $arr);
                        }
                    }
                }
            }
        }
        return $arr;
    }
}


