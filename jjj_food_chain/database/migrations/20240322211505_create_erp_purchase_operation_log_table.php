<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateErpPurchaseOperationLogTable extends Migrator
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
        $table = $this->table('erp_purchase_operation_log', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => 'erp采购单操作日志表']);
        $table->addColumn('purchase_order_id', 'integer', ['default' => 0, 'comment' => '采购单id']);
        $table->addColumn('operator_id', 'integer', ['default' => 0, 'comment' => '操作人id']);
        $table->addColumn('status', 'integer', ['default' => 10, 'comment' => '操作状态 10-待审核 20-已驳回 30-采购中 40-已采购 50-已入库']);
        $table->addColumn('remark', 'string', ['limit' => 2000, 'default' => '', 'comment' => '操作说明']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['purchase_order_id'], ['name' => 'purchase_order_id']);
        $table->addIndex(['operator_id'], ['name' => 'operator_id']);
        $table->create();
    }
}
