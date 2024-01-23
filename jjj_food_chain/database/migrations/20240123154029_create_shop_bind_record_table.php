<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateShopBindRecordTable extends Migrator
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
        $table = $this->table('shop_bind_record', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '商家设备绑定记录表']);
        $table->addColumn('source', 'string', ['limit' => 255, 'default' => '', 'comment' => '来源 cashier-收银机 tablet-平板端 kitchen-厨显端']);
        $table->addColumn('key', 'string', ['limit' => 255, 'default' => '', 'comment' => '唯一设备标识key']);
        $table->addColumn('address', 'string', ['limit' => 255, 'default' => '', 'comment' => '绑定地址']);
        $table->addColumn('port', 'integer', ['limit' => 11, 'default' => 0, 'comment' => '绑定端口']);
        $table->addColumn('remark', 'string', ['limit' => 255, 'default' => '', 'comment' => '备注']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->create();
    }
}
