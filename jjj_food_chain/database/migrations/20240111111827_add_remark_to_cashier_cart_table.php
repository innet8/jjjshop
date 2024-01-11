<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddRemarkToCashierCartTable extends Migrator
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
        // 收银机购物车表
        $table = $this->table('cashier_cart');
        $table->addColumn(Column::string('remark')->setNull(false)->setDefault("")->setComment('自定义商品备注')->setAfter('table_id'));
        $table->addColumn(Column::integer('order_id')->setNull(false)->setDefault(0)->setComment('订单id')->setAfter('table_id'));
        $table->update();

        // 订单商品记录表
        $table = $this->table('order_product');
        $table->addColumn(Column::string('remark')->setNull(false)->setDefault("")->setComment('自定义商品备注')->setAfter('order_id'));
        $table->update();
    }
}
