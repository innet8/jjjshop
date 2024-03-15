<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class CreateOrderBuffetDiscountTable extends Migrator
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
        $table = $this->table('order_buffet_discount', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci', 'comment' => '订单自助餐优惠表']);
        $table->addColumn('order_id', 'integer', ['comment' => '关联订单id']);
        $table->addColumn('buffet_discount_id', 'integer', ['comment' => '关联自助餐id']);
        $table->addColumn('name', 'string', ['limit' => 2000, 'default' => '', 'comment' => '名称']);
        $table->addColumn('discount_type', 'integer', ['default' => 1, 'comment' => '折扣类型 1-比例 2-优惠金额']);
        $table->addColumn('discount_ratio', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '折扣百分比']);
        $table->addColumn('discount_price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '优惠金额']);
        $table->addColumn('price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '优惠单价']);
        $table->addColumn('num', 'integer', ['default' => 0, 'comment' => '数量']);
        $table->addColumn('total_price', 'decimal', ['precision' => 12, 'scale' => 2, 'default' => 0, 'comment' => '优惠总价(优惠单价 * 数量)']);
        $table->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id']);
        $table->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '创建时间']);
        $table->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR, 'null' => false, 'default' => 0, 'signed' => true, 'comment' => '更新时间']);
        $table->addIndex(['order_id'], ['name' => 'order_id']);
        $table->create();
    }
}
