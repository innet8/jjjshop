<?php
declare (strict_types = 1);

namespace app\common\command;

use think\facade\Cache;
use think\console\Input;
use think\console\Output;
use think\console\Command;
use app\common\model\shop\User;

// 清空缓存
// ./cmd think clear-cache
class ClearCache extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('clear-cache')->setDescription('清空所有缓存');
    }

    protected function execute(Input $input, Output $output)
    {
        $shop_supplier_id = User::getShopInfo('shop_supplier_id');
        // 
        Cache::tag('cache')->clear();
        Cache::tag('common'.$shop_supplier_id)->clear();
        Cache::tag('category'. $shop_supplier_id. '0' . '0');
        Cache::tag('category'. $shop_supplier_id. '0' . '1');
        Cache::tag('category'. $shop_supplier_id. '1' . '0');
        Cache::tag('category'. $shop_supplier_id. '1' . '1');
    }
}
