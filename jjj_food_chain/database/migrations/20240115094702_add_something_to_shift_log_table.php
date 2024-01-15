<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddSomethingToShiftLogTable extends Migrator
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
        // 商家用户交班记录表
        $table = $this->table('shop_user_shift_log');
        $table->addColumn(Column::string('shift_no')->setNull(false)->setDefault('')->setComment('交班编号')->setAfter('id'));
        $table->addColumn(Column::integer('shift_start_time')->setNull(false)->setDefault(0)->setComment('当班开始时间')->setAfter('shop_supplier_id'));
        $table->renameColumn('shift_time','shift_end_time');
        $table->update();

        // 商家用户记录表
        $table = $this->table('shop_user');
        $table->addColumn(Column::integer('cashier_login_time')->setNull(false)->setDefault(0)->setComment('收银员当班登录时间')->setAfter('cashier_online'));
        $table->update();
    }
}
