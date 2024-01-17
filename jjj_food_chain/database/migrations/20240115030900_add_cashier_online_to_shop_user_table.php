<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddCashierOnlineToShopUserTable extends Migrator
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
        $table = $this->table('shop_user');
        $table->addColumn(Column::tinyInteger('cashier_online')->setNull(false)->setDefault(0)->setComment('收银员当班 0-不在线 1-在线')->setAfter('app_id'));
        $table->addColumn(Column::integer('cashier_login_time')->setNull(false)->setDefault(0)->setComment('收银员当班登录时间')->setAfter('cashier_online'));
        $table->update();
    }
}
