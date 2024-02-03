<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddCardIdAndUserBalanceAndPointsLogTable extends Migrator
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
        $table = $this->table('user_points_log');
        $table->addColumn(Column::integer('card_id')->setNull(false)->setDefault(0)->setComment('会员卡id')->setAfter('user_id'));
        $table->update();

        $table = $this->table('user_balance_log');
        $table->addColumn(Column::integer('card_id')->setNull(false)->setDefault(0)->setComment('会员卡id')->setAfter('user_id'));
        $table->update();
    }
}
