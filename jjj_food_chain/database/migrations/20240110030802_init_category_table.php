<?php

use think\migration\Migrator;
use think\migration\db\Column;
use think\facade\Env;

class InitCategoryTable extends Migrator
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
        $prefix = Env::get('DB_PREFIX');
        $categories = [
            '新品' => [
                "th" => "สินค้าใหม่",
                "en" => "New",
                "zh" => "新品",
                "zhtw" => "新品",
            ],
            '热卖' => [
                "th" => "สินค้าขายดี",
                "en" => "Hot",
                "zh" => "热卖",
                "zhtw" => "熱賣",
            ],
            '套餐' => [
                "th" => "แพ็กเกจ",
                "en" => "Set",
                "zh" => "套餐",
                "zhtw" => "套餐",
            ],
        ];
        $this->table('category')->changeColumn('name', 'string', array_merge(['limit' => 2000,'null' => false,'default' => '','signed' => true],['comment' => '分类名称']))->update();
        foreach ($categories as $oldName => $newName) {
            $newNameJson = json_encode($newName, JSON_UNESCAPED_UNICODE);
            $this->execute("UPDATE {$prefix}category SET name ='{$newNameJson}'  WHERE name = '{$oldName}'");
        }
    }
}
