<?php

use think\migration\Migrator;
use think\migration\db\Column;

class UpdateSizeToUserCardAndRecordTable extends Migrator
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
        // decimal(11,2)
        // 会员
        $table = $this->table('user');
        $table->changeColumn(Column::decimal('balance', 11, 2)->setNull(false)->setDefault(0)->setComment('用户可用余额'));
        $table->changeColumn(Column::decimal('points', 11, 2)->setNull(false)->setDefault(0)->setComment('用户可用积分'));
        $table->changeColumn(Column::decimal('pay_money', 11, 2)->setNull(false)->setDefault(0)->setComment('用户总支付的金额'));
        $table->changeColumn(Column::decimal('expend_money', 11, 2)->setNull(false)->setDefault(0)->setComment('实际消费的金额(不含退款)'));
        $table->changeColumn(Column::decimal('total_points', 11, 2)->setNull(false)->setDefault(0)->setComment('累计积分'));
        $table->changeColumn(Column::decimal('freeze_money', 11, 2)->setNull(false)->setDefault(0)->setComment('已冻结佣金'));
        $table->changeColumn(Column::decimal('cash_money', 11, 2)->setNull(false)->setDefault(0)->setComment('累积提现佣金'));
        $table->update();

        // 会员卡
        $table = $this->table('user_card');
        $table->changeColumn(Column::decimal('discount', 11, 2)->setNull(false)->setDefault(0)->setComment('折扣'));
        $table->changeColumn(Column::decimal('open_points_num', 11, 2)->setNull(false)->setDefault(0)->setComment('开卡赠送积分数'));
        $table->changeColumn(Column::decimal('open_money_num', 11, 2)->setNull(false)->setDefault(0)->setComment('开卡赠送余额数'));
        $table->changeColumn(Column::decimal('money', 11, 2)->setNull(false)->setDefault(0)->setComment('价格'));
        $table->update();

        // 会员卡记录
        $table = $this->table('user_card_record');
        $table->changeColumn(Column::decimal('pay_price', 11, 2)->setNull(false)->setDefault(0)->setComment('价格'));
        $table->changeColumn(Column::decimal('discount', 11, 2)->setNull(false)->setDefault(0)->setComment('会员折扣'));
        $table->changeColumn(Column::decimal('open_money_num', 11, 2)->setNull(false)->setDefault(0)->setComment('开卡赠送余额数'));
        $table->changeColumn(Column::decimal('balance', 11, 2)->setNull(false)->setDefault(0)->setComment('余额抵扣金额'));
        $table->changeColumn(Column::decimal('online_money', 11, 2)->setNull(false)->setDefault(0)->setComment('在线支付金额'));
        $table->update();

        // 用户余额变动明细
        $table = $this->table('user_balance_log');
        $table->changeColumn(Column::decimal('money', 11, 2)->setNull(false)->setDefault(0)->setComment('变动金额'));
        $table->update();

        // 用户积分变动明细
        $table = $this->table('user_points_log');
        $table->changeColumn(Column::decimal('value', 11, 2)->setNull(false)->setDefault(0)->setComment('变动积分'));
        $table->update();
    }
}
