<?php

use think\migration\Migrator;
use Phinx\Db\Adapter\MysqlAdapter;

class AddCallTable extends Migrator
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
        $table = $this->table('call', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '呼叫表']);
        $table->addColumn('table_id', 'integer', ['comment' => '桌位ID'])
            ->addColumn('table_no', 'string', ['limit' => 20, 'comment' => '桌位号'])
            ->addColumn('call_type', 'integer', ['comment' => '呼叫类型(1服务员,2收款)'])
            ->addColumn('status', 'integer', ['default' => 0, 'comment' => '状态(0未处理,1已处理)'])
            ->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id'])
            ->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id'])
            ->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '创建时间',])
            ->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '更新时间',])
            ->create();
    }
}
