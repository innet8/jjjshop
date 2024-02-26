<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateOrderBuffetTable extends Migrator
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
        $table = $this->table('order_buffet', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '订单自助餐表']);
        $table->addColumn('order_id', 'integer', ['comment' => '关联订单id']);
        $table->addColumn('buffet_id', 'integer', ['comment' => '关联自助餐id']);
        $table->addColumn('name', 'string', ['limit' => 255, 'default' => '', 'comment' => '名称']);
        $table->addColumn('price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '价格']);
        $table->addColumn('buy_limit_status', 'integer', ['default' => 0, 'comment' => '是否限购 0-否 1-是']);
        $table->addColumn('is_comb', 'integer', ['default' => 0, 'comment' => '是否组合 0-否 1-是']);
        $table->addColumn('time_limit', 'integer', ['default' => 0, 'comment' => '用餐时间（分）']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['order_id'], ['name' => 'order_id']);
        $table->create();
    }
}
