<?php

use think\migration\Migrator;
use think\migration\db\Column;
use think\facade\Env;

class UpdateShopAccessV101Table extends Migrator
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
        $filePath = realpath(root_path() . '/database/seeds/jjjfood_shop_access.sql');
        if (!file_exists($filePath)) {
            throw new \Exception('shop_access sql file not exists');
        }
        $host = Env::get('DB_HOST');
        $port = Env::get('DB_PORT');
        $username = Env::get('DB_USERNAME');
        $password = Env::get('DB_PASSWORD');
        $databaseName = Env::get('DB_DATABASE');
        $dsn = "mysql:host={$host};port={$port}";
        $pdo = new PDO($dsn, $username, $password);

        $dbExists = $pdo->query("SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = '{$databaseName}'")->fetchColumn();
        if (!$dbExists) {
            throw new \Exception('database not exists');
        }
        $pdo->exec("use {$databaseName}");
        $sql = file_get_contents($filePath);
        $pdo->exec($sql);
    }
}
