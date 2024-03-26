<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class AddFieldV102ToProductTable extends Migrator
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
        // 产品表
        $table = $this->table('product');
        $table->addColumn(Column::integer('type')->setDefault(10)->setComment('类型 10-成品 20-材料')->setAfter('product_name'));
        $table->addColumn(Column::integer('erp_supplier_id')->setDefault(0)->setComment('供应商id')->setAfter('type'));
        $table->update();

        // 产品SKU表
        $table = $this->table('product_sku');
        $table->addColumn(Column::decimal('purchase_price', 12, 2)->setDefault(0.00)->setComment('采购单价')->setAfter('product_price'));
        $table->addColumn(Column::string('barcode', 255)->setDefault('')->setComment('商品条码')->setAfter('purchase_price'));
        $table->update();

        // 产品Feed表
        $table = $this->table('product_feed');
        $table->addColumn(Column::integer('stock_num')->setDefault(0)->setComment('库存数量')->setAfter('price'));
        $table->update();
    }
}
