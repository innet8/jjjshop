<?php

namespace app\common\service\example;

use PDO;
use think\facade\Db;
use think\facade\Env;
use app\common\exception\BaseException;

/**
 * 导出示例服务层
 */
class ExampleService
{
    /**
     * 导出
     *
     * @return void
     */
    public function export()
    {
        $allSqlContent = "";
        $rootPath = root_path();
        $examplePath = $rootPath . 'example/';
        $zipFileName = 'example.zip';
        $zipFilePath= $examplePath . 'example.zip';
        $uploadsPath = $rootPath . 'public/uploads/';
        $sqlPath = $examplePath . 'sql/';

        // 检查目录是否存在，不存在则创建
        $this->createDirectoryIfNotExists($uploadsPath);
        $this->createDirectoryIfNotExists($sqlPath);

        // 头部信息
        $prefix = "-- \r\n";
        $prefix .= "-- 导出时间：" . date('Y-m-d H:i:s') . "\r\n";
        $prefix .= "-- \r\n\r\n";
        $prefix .= "SET NAMES utf8mb4;\r\n";
        $prefix .= "SET FOREIGN_KEY_CHECKS = 0;\r\n";
        $prefix .= "SET @appid = CONCAT(LPAD(UNIX_TIMESTAMP(), 9, '0'), FLOOR(RAND() * 10));\r\n\r\n";

        // 要导出SQL的表名
        $list = Db::getTables();
        if (empty($list)) {
            throw new BaseException(['msg' => '没有找到要导出的表']);
        }
        foreach ($list as $v) {
            $sqlContent = $this->getSqlContent($v);
            $allSqlContent .= $sqlContent;
        }

        // 尾部信息
        $end = "\r\n\r\nSET FOREIGN_KEY_CHECKS = 1;\r\n\r\n-- 导出完成，共导出 " . count($list) . " 个表。\r\n";

        // 将头部信息和累加的SQL内容写入文件
        $sqlFilePath = $examplePath . "sql/init.sql";
        if (!file_put_contents($sqlFilePath, $prefix . $allSqlContent . $end)) {
            throw new BaseException(['msg' => '无法写入SQL文件']);
        }

        // 创建一个新的zip实例
        $zip = new \ZipArchive();
        if ($zip->open($zipFilePath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === true) {
            // 添加 public/uploads 目录中的文件到 Zip 文件
            $this->addFilesToZip($zip, $uploadsPath, 'uploads/');
            // 添加 public/sql 目录中的文件到 Zip 文件
            $this->addFilesToZip($zip, $sqlPath, 'sql/');
            $zip->close();
            // 设置内存限制
            ini_set('memory_limit', '256M');
            download($zipFilePath, $zipFileName)->send();
            exit;
        } else {
            @unlink($sqlFilePath);
            throw new BaseException(['msg' => '无法创建zip文件']);
        }
    }

    /**
     * 导入
     *
     * @return void
     */
    public function import()
    {
        $examplePath = root_path() . 'example/';
        $zipFileName = $examplePath . 'example.zip';
        if (!file_exists($zipFileName)) {
            throw new BaseException(['msg' => '实例文件不存在']);
        }

        $zip = new \ZipArchive();
        if ($zip->open($zipFileName) === true) {
            // 解压zip文件到example目录
            if (!is_dir($examplePath)) {
                mkdir($examplePath, 0755, true);
            }
            $zip->extractTo($examplePath);
            $zip->close();

            // 把example目录下的uploads目录移动覆盖到public目录下
            $uploadsPath = $examplePath . 'uploads/';
            if (is_dir($uploadsPath)) {
                $publicPath = root_path() . 'public/';
                $publicUploadsPath = $publicPath . 'uploads';
                // 删除目标目录
                $this->deleteDirectory($publicUploadsPath);
                // 移动源目录
                rename($uploadsPath, $publicUploadsPath);
            }
        } else {
            throw new BaseException(['msg' => '无法打开zip文件']);
        }

        // 执行SQL文件
        $sqlFilePath = $examplePath . 'sql/init.sql';
        if (file_exists($sqlFilePath) && is_readable($sqlFilePath)) {
            $host = Env::get('DB_HOST');
            $port = Env::get('DB_PORT');
            $username = Env::get('DB_USERNAME');
            $password = Env::get('DB_PASSWORD');
            $databaseName = Env::get('DB_DATABASE');
            $dsn = "mysql:host={$host};port={$port}";
            try {
                $pdo = new PDO($dsn, $username, $password);
                // 检测数据库
                $dbExists = $pdo->query("SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = '{$databaseName}'")->fetchColumn();
                if ($dbExists) {
                    $pdo->exec("use {$databaseName}");
                    $sql = file_get_contents($sqlFilePath);
                    $pdo->exec($sql);
                } else {
                    throw new BaseException(['msg' => '数据库不存在']);
                }
            } catch (\PDOException $e) {
                throw new BaseException(['msg' => '数据库连接失败' . $e->getMessage()]);
            }
        } else {
            throw new BaseException(['msg' => 'SQL文件不存在或不可读']);
        }
        //
        $directories = ['sql', 'uploads'];
        foreach ($directories as $dir) {
            $path = $examplePath . $dir . '/';
            if (is_dir($path)) {
                $this->deleteDirectory($path);
            }
        }
        throw new BaseException(['msg' => '数据导入成功' , 'code' => 1]);
    }

    /**
     * 获取SQL内容
     *
     * @param string $table
     * @return string
     */
    public function getSqlContent($table = '')
    {
        $sqlContent = "";
        $sql = "show create table " . $table;
        $res = Db::query($sql);
        $sqlStr = "-- ----------------------------\r\n";
        $sqlStr .= "-- Table structure for `" . $table . "`\r\n";
        $sqlStr .= "-- ----------------------------\r\n";
        $sqlStr .= "DROP TABLE IF EXISTS `" . $table . "`;\r\n";
        $sqlStr .= $res[0]['Create Table'] . ";\r\n\r\n";
        $sqlContent .= $sqlStr;

        // 获取表的列信息
        $columns = Db::query("SHOW COLUMNS FROM " . $table);
        $columnTypes = [];
        // 字段名
        $columnNames = [];
        foreach ($columns as $column) {
            $columnTypes[$column['Field']] = $column['Type'];
            $columnNames[$column['Field']] = $column['Field'];
        }

        // 导出数据表数据
        $sql = "select * from " . $table;
        $res = Db::query($sql);
        if (count($res) >= 1) {
            // 如果是日志表，则不导出数据
            if ($table == 'jjjfood_shop_opt_log' || $table == 'jjjfood_shop_login_log') {
                return $sqlContent;
            }
            // 导出数据表数据
            $info = "-- ----------------------------\r\n";
            $info .= "-- Records of `" . $table . "`\r\n";
            $info .= "-- ----------------------------\r\n";
            $sqlContent .= $info;

            // 拼接插入数据格式
            foreach ($res as $k => $v) {
                $sqlStr = "INSERT INTO `" . $table . "` VALUES (";
                foreach ($v as $key => $zd) {
                    // 处理NULL值
                    if ($zd === null) {
                        $sqlStr .= "NULL, ";
                        continue;
                    }
                    // 处理特殊字符
                    $zd = str_replace("\r\n", "", $zd);
                    // 如果有单引号，则加上转义符
                    if (strpos($zd, "'") !== false) {
                        $zd = str_replace("'", "\\'", $zd);
                    }
                    if (strpos($zd, '\u') !== false) {
                        // 将字符串转换为数组
                        $arr = json_decode($zd, true);
                        if (json_last_error() == JSON_ERROR_NONE) {
                            // 将数组转换回JSON字符串，并转义所有的非打印字符和特殊字符
                            $zd = json_encode($arr, JSON_UNESCAPED_UNICODE);
                            // 将\u替换为\\u，以确保它们在导入SQL文件时不会被去掉
                            $zd = str_replace('\u', '\\u', $zd);
                        } else {
                            // 如果字符串不是有效的JSON字符串，使用addslashes函数来转义它
                            $zd = addslashes($zd);
                        }
                    }
                    // 替换字段值
                    $replaceFields = ['app_id', 'shop_supplier_id', 'admin_user_id'];
                    if (in_array($columnNames[$key], $replaceFields)) {
                        // TODO 如果是shop_user_id，则替换成@appid后，后边需要在@appid基础上+1（关联性表有使用原来的shop_user_id，暂时性无解决方案，后续再优化）
                        if ($columnNames[$key] == 'shop_user_id') {
                            $zd = "@appid + " . $k;
                        } else {
                            // 如果是上传文件表，shop_supplier_id不替换，因为上传文件表的shop_supplier_id默认0
                            if ($table == 'jjjfood_upload_file' && $columnNames[$key] == 'shop_supplier_id') {
                                $zd = 0;
                            } else {
                                $zd = "@appid";
                            }
                        }
                    }
                    // 根据字段类型决定是否添加引号
                    if (strpos($columnTypes[$key], 'int') !== false) {
                        $sqlStr .= $zd . ", ";
                    } else {
                        $sqlStr .= "'" . $zd . "', ";
                    }
                }
                $sqlStr = substr($sqlStr, 0, strlen($sqlStr) - 2);
                $sqlStr .= ");\r\n";
                $sqlContent .= $sqlStr;
            }
            $sqlContent .= "\r\n";
        }

        return $sqlContent;
    }

    /**
     * 用于将文件添加到压缩包中
     *
     * @param [type] $zip
     * @param [type] $sourcePath
     * @param [type] $relativePath
     * @return void
     */
    public function addFilesToZip($zip, $sourcePath, $relativePath)
    {
        $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($sourcePath));
        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativeFilePath = $relativePath . substr($filePath, strlen($sourcePath));
                $zip->addFile($filePath, $relativeFilePath);
            }
        }
    }

    /**
     * 函数用于检查目录是否存在，不存在则创建
     *
     * @param [type] $path
     * @return void
     */
    public function createDirectoryIfNotExists($path) {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    /**
     * 删除目录的函数
     *
     * @param [type] $dir
     * @return bool
     */
    function deleteDirectory($dir) {
        if (!file_exists($dir)) {
            return true;
        }
        if (!is_dir($dir)) {
            return unlink($dir);
        }
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
        }
        return rmdir($dir);
    }
}