<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateErpInventoryRecordTable extends Migrator
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
        $table = $this->table('erp_inventory_record', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => 'erp出入库记录表']);
        $table->addColumn('number', 'string', ['limit' => 255, 'default' => '', 'comment' => '记录编号']);
        $table->addColumn('inventory_type', 'integer', ['default' => 1, 'comment' => '类型 1-入库 2-出库']);
        $table->addColumn('type', 'integer', ['default' => 10, 'comment' => '操作类型 10-采购入库 20-调整入库 30-销售出库 40-调整出库']);
        $table->addColumn('purchase_order_id', 'integer', ['default' => 0, 'comment' => '采购订单id']);
        $table->addColumn('product_sku_id', 'integer', ['default' => 0, 'comment' => '商品规格id']);
        $table->addColumn('product_id', 'integer', ['default' => 0, 'comment' => '商品id']);
        $table->addColumn('num', 'integer', ['default' => 0, 'comment' => '商品数量']);
        $table->addColumn('remark', 'string', ['limit' => 2000, 'default' => '', 'comment' => '备注']);
        $table->addColumn('status', 'integer', ['default' => 10, 'comment' => '状态 10-已入库 20-已出库 30-已撤销']);
        $table->addColumn('operator_id', 'integer', ['default' => 0, 'comment' => '操作人id']);
        $table->addColumn('in_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'comment' => '入库时间']);
        $table->addColumn('out_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'comment' => '出库时间']);
        $table->addColumn('revoke_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'comment' => '撤销时间']);
        $table->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addColumn('delete_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '删除时间']);
        $table->addIndex(['operator_id'], ['name' => 'operator_id']);
        $table->create();
    }
}
