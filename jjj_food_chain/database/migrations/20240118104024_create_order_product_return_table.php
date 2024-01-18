<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateOrderProductReturnTable extends Migrator
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
        $table = $this->table('order_product_return', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '订单商品退货表']);
        $table->addColumn('order_id', 'integer', ['limit' => 11, 'default' => 0, 'comment' => '订单id']);
        $table->addColumn('order_product_id', 'integer', ['limit' => 11, 'default' => 0, 'comment' => '订单商品id']);
        $table->addColumn('product_id', 'integer', ['limit' => 11, 'default' => 0, 'comment' => '商品id']);
        $table->addColumn('num', 'integer', ['limit' => 11, 'default' => 0, 'comment' => '数量']);
        $table->addColumn('reason', 'string', ['limit' => 255, 'default' => '', 'comment' => '原因']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '更新时间']);
        $table->create();
    }
}
