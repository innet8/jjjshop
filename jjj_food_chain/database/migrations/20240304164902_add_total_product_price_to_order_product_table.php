<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddTotalProductPriceToOrderProductTable extends Migrator
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
        $table->addColumn(Column::decimal('total_product_price', 12 )->setDefault(0)->setComment('订单商品总价(单价x数量原价)')->setAfter('total_price'));
        $table->update();
    }
}
