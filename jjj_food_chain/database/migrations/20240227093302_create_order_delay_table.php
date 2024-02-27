<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateOrderDelayTable extends Migrator
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
        $table = $this->table('order_delay', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '订单加钟关联表']);
        $table->addColumn('order_id', 'integer', ['comment' => '关联订单id']);
        $table->addColumn('delay_id', 'integer', ['comment' => '关联加钟id']);
        $table->addColumn('name', 'string', ['limit' => 255, 'default' => '', 'comment' => '名称']);
        $table->addColumn('delay_time', 'integer', ['default' => 0, 'comment' => '加钟时间（分）']);
        $table->addColumn('price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '价格']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['app_id'], ['name' => 'app_id']);
        $table->create();
    }
}
