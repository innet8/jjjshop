<?php
declare (strict_types = 1);

namespace app\common\command;

use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use app\common\library\language\Language;

// 语言翻译
// ./cmd think lang
// ./cmd think lang --text=萨达撒萨达撒萨达 --channel=youdao
class Lang extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('lang')
            ->addOption('text', null, Option::VALUE_REQUIRED, '需要翻译的文本')
            ->addOption('channel', null, Option::VALUE_REQUIRED, 'google|youdao')
            ->setDescription('语言翻译');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('lang');
        $channel = $input->getOption('channel') ?: 'google';

        $output->writeln('#####开始提取所有中文#####');
        $channel = $input->getOption('channel') ?: 'google';

        // 提取所有中文
        $lang = new Language();
        $paramText = $input->getOption('text');
        $texts = $lang->extractTexts($paramText ? [$paramText] : []);

        // 获取已翻译中文
        $translated = $lang->getTranslatedTexts();
        $texts = $lang->filterTexts($texts, $translated);

        $targets = $lang->getTargets($channel);
        $tr = $lang->getTranslator($channel);

        // 执行待翻译中文
        $output->writeln('#####开始翻译#####');

        $lang->commandExecute($targets, $texts, $tr);
        $output->writeln('#####翻译完成#####');
    }
}
