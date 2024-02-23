<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateBuffetProductTable extends Migrator
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
        $table = $this->table('buffet_product', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '自助餐商品表']);
        $table->addColumn('buffet_id', 'integer', ['comment' => '关联id']);
        $table->addColumn('product_id', 'integer', ['comment' => '商品id']);
        $table->addColumn('product_name', 'string', ['limit' => 255, 'default' => '', 'comment' => '商品名']);
        $table->addColumn('limit_num', 'integer', ['default' => 0, 'comment' => '限购数量']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['buffet_id'], ['name' => 'buffet_id']);
        $table->create();
    }
}
