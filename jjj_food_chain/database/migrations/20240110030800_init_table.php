<?php

use think\migration\Migrator;
use think\migration\db\Column;
use think\facade\Env;

class InitTable extends Migrator
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $filePath = realpath(root_path() . 'init.sql');
        $host = Env::get('DB_HOST');
        $port = Env::get('DB_PORT');
        $rootPassword = Env::get('DB_ROOT_PASSWORD');
        $username = Env::get('DB_USERNAME');
        $password = Env::get('DB_PASSWORD');
        $databaseName = Env::get('DB_DATABASE');
        $dsn = "mysql:host={$host};port={$port}";
        $pdo = new PDO($dsn, 'root', $rootPassword);

        // 检测数据库
        $dbExists = $pdo->query("SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = '{$databaseName}'")->fetchColumn();
        if (!$dbExists) {
            $pdo->exec("CREATE DATABASE {$databaseName}");
            $pdo->exec("CREATE USER '{$username}'@'{$host}' IDENTIFIED BY '{$password}'");
            $pdo->exec("GRANT ALL PRIVILEGES ON {$databaseName}.* TO '{$username}'@'{$host}'");
            $pdo->exec("FLUSH PRIVILEGES");
            $pdo->exec("use {$databaseName}");
            $sql = file_get_contents($filePath);
            $pdo->exec($sql);
        }
    }
}
