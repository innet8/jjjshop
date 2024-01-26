<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddIsSendToCallTable extends Migrator
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
        $table = $this->table('call');
        $table->addIndex(['table_id'], ['name' => 'idx_table_id']);
        $table->addColumn(Column::integer('is_send')->setNull(false)->setDefault(0)->setComment('消息发送状态 0-否 1-是')->setAfter('shop_supplier_id'));
        $table->update();
    }
}
