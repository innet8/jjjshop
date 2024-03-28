<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateProductFeedMaterialTable extends Migrator
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
        $table = $this->table('product_feed_material', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '产品加料材料关联表']);
        $table->addColumn('feed_id', 'integer', ['default' => 0, 'comment' => '加料id']);
        $table->addColumn('material_id', 'integer', ['default' => 0, 'comment' => '材料id']);
        $table->addColumn('material_num', 'decimal', ['precision' => 12, 'scale' => 4, 'default' => 0, 'comment' => '使用库存数量']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addIndex(['feed_id'], ['name' => 'feed_id']);
        $table->addIndex(['material_id'], ['name' => 'material_id']);
        $table->create();
    }
}
