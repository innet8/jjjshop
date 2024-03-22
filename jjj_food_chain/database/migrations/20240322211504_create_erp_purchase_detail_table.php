<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateErpPurchaseDetailTable extends Migrator
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
        $table = $this->table('erp_purchase_detail', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => 'erp采购单明细表']);
        $table->addColumn('purchase_order_id', 'integer', ['default' => 0, 'comment' => '采购单id']);
        $table->addColumn('product_id', 'integer', ['default' => 0, 'comment' => '产品表id']);
        $table->addColumn('actual_purchase_price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => '0.00', 'comment' => '实际采购单价']);
        $table->addColumn('actual_purchase_num', 'integer', ['default' => 0, 'comment' => '实际采购数量']);
        $table->addColumn('actual_total_amount', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => '0.00', 'comment' => '实际采购总额']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['purchase_order_id'], ['name' => 'purchase_order_id']);
        $table->addIndex(['product_id'], ['name' => 'product_id']);
        $table->create();
    }
}
