<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddIsStayToOrderTable extends Migrator
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
        // 桌台表
        $table = $this->table('order');
        $table->addColumn(Column::integer('is_stay')->setNull(false)->setDefault(0)->setComment('挂单状态 0-否 1-是')->setAfter('order_price'));
        $table->addColumn(Column::integer('stay_time')->setNull(false)->setDefault(0)->setComment('挂单时间')->setAfter('order_price'));
        $table->update();
    }
}
