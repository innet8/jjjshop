<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateErpSupplierTable extends Migrator
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
        $table = $this->table('erp_supplier', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => 'erp供应商表']);
        $table->addColumn('name', 'string', ['limit' => 255, 'default' => '', 'comment' => '供应商名称']);
        $table->addColumn('address', 'string', ['limit' => 2000, 'default' => '', 'comment' => '供应商地址']);
        $table->addColumn('contact_person', 'string', ['limit' => 255, 'default' => '', 'comment' => '联系人']);
        $table->addColumn('contact_phone', 'string', ['limit' => 20, 'default' => '', 'comment' => '联系电话']);
        $table->addColumn('position', 'string', ['limit' => 255, 'default' => '', 'comment' => '职位']);
        $table->addColumn('purchaser_id', 'integer', ['default' => 0, 'comment' => '采购负责人id']);
        $table->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addColumn('delete_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '删除时间']);
        $table->addIndex(['purchaser_id'], ['name' => 'purchaser_id']);
        $table->create();
    }
}
