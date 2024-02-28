<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateDelayTable extends Migrator
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
        $table = $this->table('delay', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '加钟表']);
        $table->addColumn('name', 'string', ['limit' => 2000, 'default' => '', 'comment' => '名称']);
        $table->addColumn('delay_time', 'integer', ['default' => 0, 'comment' => '加钟时间（分）']);
        $table->addColumn('status', 'integer', ['default' => 1, 'comment' => '状态']);
        $table->addColumn('price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '价格']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['app_id'], ['name' => 'app_id']);
        $table->create();
    }
}
