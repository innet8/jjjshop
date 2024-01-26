<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddDiscountRatioToOrderTable extends Migrator
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
        $table->addColumn(Column::integer('discount_ratio')->setNull(false)->setDefault(0)->setComment('优惠折扣比例 如：50-百分之五十')->setAfter('discount_money'));
        $table->addColumn(Column::decimal('original_price', 11, 2)->setNull(false)->setDefault(0)->setComment('订单原始价格')->setAfter('pay_price'));
        $table->update();
    }
}
