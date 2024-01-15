<?php

use think\migration\Migrator;
use think\migration\db\Column;
use Phinx\Db\Adapter\MysqlAdapter;

class AddShiftLogTable extends Migrator
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
        $table = $this->table('shop_user_shift_log', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_general_ci', 'comment' => '商家用户交班记录表']);
        $table->addColumn('shift_user_id', 'integer', ['comment' => '收银员id'])
        ->addColumn('previous_shift_cash', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '上一班遗留备用金'])
        ->addColumn('current_cash_total', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '当前钱箱现金总计'])
        ->addColumn('cash_income', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '现金收入'])
        ->addColumn('balance_income', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '余额收入'])
        ->addColumn('wechat_income', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '微信收入'])
        ->addColumn('alipay_income', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '支付宝收入'])
        ->addColumn('refund_amount', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '退款金额'])
        ->addColumn('cash_taken_out', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '本班取出现金'])
        ->addColumn('cash_left', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0, 'comment' => '本班遗留备用金'])
        ->addColumn('is_printed', 'boolean', ['default' => false, 'comment' => '是否打印 0-未打印 1-已打印'])
        ->addColumn('remark', 'text', ['null' => true, 'comment' => '备注'])
        ->addColumn('app_id', 'integer', ['default' => 0, 'comment' => '应用id'])
        ->addColumn('shop_supplier_id', 'integer', ['default' => 0, 'comment' => '门店id'])
        ->addColumn('shift_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true, 'comment' => '当班结束时间'])
        ->addColumn('create_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '创建时间',])
        ->addColumn('update_time', 'integer', ['limit' => MysqlAdapter::INT_REGULAR,'null' => false,'default' => 0,'signed' => true,'comment' => '更新时间',])
        ->addIndex(['shift_user_id'], ['name' => 'idx_shift_user_id'])
        ->create();
    }
}
