<?php

use think\migration\Migrator;
use think\migration\db\Column;

class AddAreaIdToSupplierPrintingTable extends Migrator
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
        $table = $this->table('supplier_printing');
        $table->addColumn(Column::longText('area_id')->setComment('区域id')->setAfter('label_id'));
        $table->addColumn(Column::integer('is_open_one_food')->setDefault(0)->setComment('是否开启一菜一单 0-关闭 1-开启')->setAfter('area_id'));
        $table->update();
    }
}
