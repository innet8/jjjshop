<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddIsSendKitchenToOrderProductTable extends Migrator
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
        $table = $this->table('order_product');
        $table->addColumn(Column::integer('is_send_kitchen')->setNull(false)->setDefault(0)->setComment('送厨状态 0-否 1-是')->setAfter('product_name'));
        $table->addColumn(Column::integer('send_kitchen_time')->setNull(false)->setDefault(0)->setComment('送厨时间')->setAfter('product_name'));
        $table->update();
    }
}
