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
    private $targetFiles = ['zh', 'zhtw', 'en', 'tr'];

    // 谷歌语言集
    private $googleTargetFiles = ['zh', 'zh-TW', 'en', 'tr'];

    // 有道语言集
    private $youdaoTargetFiles = ['zh-CHS', 'zh-CHT', 'en', 'tr'];

    // 当前语言文件路径
    private $langFilePath = 'lang/';

    // 有道翻译参数
    const YOUDAO_APP_KEY = "41dfa0e454e1efa1";
    const YOUDAO_SEC_KEY = "oGOP7927lLseJpRQtaF6lChs2vw7wz2R";

    // extractTexts 语言提取
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

    // getTranslatedTexts 获取已翻译中文
    public function getTranslatedTexts()
    {
        $translated = !is_file('lang/zh/auto.php') ? [] : include('lang/zh/auto.php');
        return $translated;
    }

    // filterTexts 过滤已翻译中文
    public function filterTexts($texts, $translated)
    {
        $texts = array_filter($texts, function ($text) use ($translated) {
            return empty(($translated[$text] ?? '')) && !str_contains($text, '$') && !str_contains($text, '","');
        });
        return $texts;
    }

    // getTargets 获取目标语言
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

    // getTranslator 获取翻译引擎
    public function getTranslator($channel)
    {
        if ($channel == 'google') {
            $tr = new Google(); // Translates to 'en' from auto-detected language by default
        } else if ($channel == 'youdao') {
            $tr = new YouDao(self::YOUDAO_APP_KEY, self::YOUDAO_SEC_KEY);
        } else {
            return;
        }
        return $tr;
    }

    // getSavePath 获取保存路径
    public function getSavePath($file)
    {
        return $this->langFilePath . $file . '/auto.php';
    }

    // initSavePath 初始化保存路径
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

    // 执行翻译
    public function execute($targets = [], $textChunks = [], $tr = null)
    {
        if (empty($targets) || empty($textChunks) || empty($tr)) {
            return;
        }

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
                    $transArray = explode("\n", $trans);
                    // 确保 $chunk 和 $transArray 的元素数量相同
                    $count = min(count($chunk), count($transArray));
                    $count = intval($count); // 显式地将 $count 转换为整数
                    $chunk = array_slice($chunk, 0, (int)$count);
                    $transArray = array_slice($transArray, 0, (int)$count);
                    $translation = array_merge($translation, array_combine($chunk, $transArray));
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
    private function makeDir($path)
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
    private function getDirAllFile($path, $arr = [])
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


