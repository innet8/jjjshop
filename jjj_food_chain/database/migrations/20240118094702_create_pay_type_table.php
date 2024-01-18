<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreatePayTypeTable extends Migrator
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
        $table = $this->table('pay_type', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '支付类型表']);
        $table->addColumn('name', 'string', ['limit' => 500, 'comment' => '名称']);
        $table->addColumn('value', 'integer', ['comment' => 'value值']);
        $table->addColumn('status', 'integer', ['default' => 1, 'comment' => '状态(0启动,1启用)']);
        $table->addColumn('img', 'string', ['limit' => 500, 'comment' => '图像']);
        $table->addColumn('sort', 'string', ['limit' => 25, 'default' => '0', 'comment' => '排序']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '更新时间']);
        $table->create();
    }
}
