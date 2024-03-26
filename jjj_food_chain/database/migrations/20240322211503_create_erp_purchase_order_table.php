<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateErpPurchaseOrderTable extends Migrator
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
        $table = $this->table('erp_purchase_order', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => 'erp采购单表']);
        $table->addColumn('number', 'string', ['limit' => 255, 'default' => '', 'comment' => '采购编号']);
        $table->addColumn('name', 'string', ['limit' => 255, 'default' => '', 'comment' => '采购名称']);
        $table->addColumn('type', 'integer', ['default' => 10, 'comment' => '采购方式 10-总部采购 20-自行采购']);
        $table->addColumn('applicant_id', 'integer', ['default' => 0, 'comment' => '申请人id']);
        $table->addColumn('total_num', 'integer', ['default' => 0, 'comment' => '商品总数']);
        $table->addColumn('total_amount', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => '0.00', 'comment' => '采购总额']);
        $table->addColumn('arrival_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'comment' => '到货时间']);
        $table->addColumn('status', 'integer', ['default' => 10, 'comment' => '状态 10-待审核 20-已驳回 30-采购中 40-已采购 50-已入库']);
        $table->addColumn('remark', 'string', ['limit' => 2000, 'default' => '', 'comment' => '备注']);
        $table->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addColumn('delete_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '删除时间']);
        $table->addIndex(['purchaser_id'], ['name' => 'purchaser_id']);
        $table->addIndex(['applicant_id'], ['name' => 'applicant_id']);
        $table->create();
    }
}
