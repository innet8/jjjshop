<?php
declare (strict_types = 1);

namespace app\job\command;

use think\facade\Log;
use workermans\Worker;
use think\console\Input;
use Workerman\Lib\Timer;
use think\console\Output;
use think\console\Command;
use think\console\input\Option;
use think\console\input\Argument;

class Job extends Command
{
    private $task;
    private $second = 5;
    protected function configure()
    {
        // 指令配置
        $this->setName('job')
            ->addArgument('action', Argument::OPTIONAL, "start|stop|restart|reload|status|connections", 'start')
            ->addOption('mode', 'm', Option::VALUE_OPTIONAL, 'Run the workerman server in daemon mode.')
            ->setDescription('定时任务');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $action = $input->getArgument('action');
        $mode = $input->getOption('mode');
        // 重新构造命令行参数,以便兼容workerman的命令
        global $argv;
        $argv = [];
        array_unshift($argv, 'think', $action);
        if ($mode == 'd') {
            $argv[] = '-d';
        } else if ($mode == 'g') {
            $argv[] = '-g';
        }

        // 创建定时任务
        $worker = new Worker();
        $worker->onWorkerStart = [$this, 'start'];

        //
        Worker::runAll();
    }

    /**
     * 定时器执行的内容
     * @return false|int
     */
    public function start()
    {
        return $this->task = Timer::add($this->second, function () use (&$task) {
            try {
                event('JobScheduler');
                // 
                // Log::channel("task")->write('job');
                // 
            } catch (\Throwable $e) {
                echo 'ERROR: ' . $e->getMessage() . PHP_EOL;
            }
        });
    }
}
