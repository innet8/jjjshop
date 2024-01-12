<?php

namespace help;

use function exec;
use think\Exception;
use think\facade\Log;

// 执行本地cmd 			SystemHelp::cmd($cmd);
// 执行远程cmd命令 		 SystemHelp::sshCmd($host,$user,$password,$cmd);

class SystemHelp
{
    /**
     * @param $command
     * @return array
     * @throws Exception
     */
    public static function exec($command): array
    {
        exec($command, $output, $ret);
        if ($ret) {
            $output = implode("\n", $output);
            throw new Exception( "System call failed.\nCommand: {$command}\n\n{$output}" );
        }
        return $output;
    }

    /**
     * @param $command
     * @param int $retryNum
     * @return string|null
     */
    public static function shot($command, $retryNum = 5): ?string
    {
        try {
            $ret = self::exec($command);
        } catch (Exception $errA) {
            // 服务重启，循环5次，每次等待5秒后重新获取
            if ($retryNum > 0) {
                for ($i = 1; $i < $retryNum; $i++) {
                    sleep(1);
                    try {
                        $ret = self::exec($command);
                        break;
                    } catch (Exception $errB) {
                        if ($i == 4) {
                            $ret = [$errB->getMessage()];
                            Log::info($errB->getMessage());
                        }
                    }
                }
            } else {
                $ret = [$errA->getMessage()];
                Log::info($errA->getMessage());
            }
        }
        return $ret[0] ?? null;
    }

    /**
     * @param $command
     * @param $appendLog
     * @return string|null
     */
    public static function cmd($command, $appendLog = false): ?string
    {
        if ($appendLog === true) {
            Log::info($command);
        }
        return self::shot($command, 1);
    }

    /**
     * 执行远程cmd命令
     *
     * @param [type] $host
     * @param [type] $user
     * @param [type] $password
     * @param [type] $cmd
     * @return void
     */
    public static function sshCmd($host,$user,$password,$cmd)
    {
        $ret = '';
        try {
            self::exec("sshpass -p $password ssh -o StrictHostKeyChecking=no $user@$host '$cmd'");
        } catch (Exception $errA) {
            $ret = 'system call failed';
        }
        return $ret;
    }

}
