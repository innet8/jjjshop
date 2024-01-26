<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddNewExpensesToOrderTable extends Migrator
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
        // 订单表
        $table = $this->table('order');
        $table->addColumn(Column::decimal('setting_service_money', 11, 2)->setNull(false)->setDefault(0)->setComment('门店设定服务费')->setAfter('app_id'));
        $table->addColumn(Column::decimal('consumption_tax_money', 11, 2)->setNull(false)->setDefault(0)->setComment('门店设定消费税')->setAfter('setting_service_money'));
        $table->addColumn(Column::decimal('user_discount_money', 11, 2)->setNull(false)->setDefault(0)->setComment('会员折扣金额')->setAfter('consumption_tax_money'));
        $table->update();
    }
}
