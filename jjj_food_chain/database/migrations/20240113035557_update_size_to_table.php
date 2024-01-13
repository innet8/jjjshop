<?php

use think\migration\Migrator;
use think\migration\db\Column;

class UpdateSizeToTable extends Migrator
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
    public function up()
    {
        $arr = ['limit' => 500,'null' => false,'default' => '','signed' => true];
        // 
        $this->table('category')->changeColumn('name', 'string', array_merge($arr,['comment' => '分类名称']))->update();
        // 
        $this->table('product')->changeColumn('product_name', 'string', array_merge($arr,['comment' => '产品名称']))->update();
        $this->table('product')->changeColumn('product_unit', 'string', array_merge($arr,['comment' => '商品单位']))->update();
        $this->table('product_attribute')->changeColumn('attribute_name', 'string', array_merge($arr,['comment' => '属性名']))->update();
        $this->table('product_feed')->changeColumn('feed_name', 'string', array_merge($arr,['comment' => '属性名']))->update();
        $this->table('product_unit')->changeColumn('unit_name', 'string',array_merge($arr,['comment' => '属性名']))->update();
        // // 
        $this->table('order_product')->changeColumn('product_name', 'string',['limit' => 500,'null' => false,'default' => '','signed' => true,'comment' => '产品名称'])->update();
    }

    public function down()
    {
       
    }
}
