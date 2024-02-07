<?php

use think\migration\Migrator;

class AddIndexToOrderTable extends Migrator
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
        $table = $this->table('order');
        $table->addIndex(['order_id'], ['name' => 'order_id', 'unique' => true]);
        $table->addIndex(['app_id'], ['name' => 'app_id']);
        $table->addIndex(['shop_supplier_id'], ['name' => 'shop_supplier_id']);
        $table->update();
    }
}
