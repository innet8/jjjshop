<?php

use think\migration\Migrator;
use think\migration\db\Column;
use think\facade\Env;
use app\shop\model\auth\Role as RoleModel;
use app\shop\model\auth\User as UserModel;

class InitShopRoleTable extends Migrator
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
        // 店长角色
        $managerParams = '{"access_id":[1705899112,1705895562,1704878353,14,1625541086,1625541117,1625559492,1625559529,1625559776,1626918191,1625541135,1625558095,1625558125,1625559901,1684827061,1704783435,1704789776,1705907014,1705908244,1705908269,1625541971,1625542711,1625730490,1625730528,1625730576,1705908423,1625542733,1625730620,1625730827,1625730840,1705908545,1625736208,1625736231,1625736247,1625736260,1705908593,1625736411,1625736427,1625736438,1625736452,1705908651,1696835617,1696835638,1696835672,1696835684,1705908693,1626506017,1626686852,1626687165,1705908826,1626690277,255,1632883327,1636183779,54,55,1705909167,1696645520,150,148,56,151,152,153,96,1704854227,120,1636183893,1704851926,1636183925,1636183938,1636183949,1636183986,1705910132,1704852136,1705910270,1705910313,1704852166,263,1704867118,1628585013,1628587603,1628587636,1628587709,1680923022,1680923037,1680923047,1680923058,1705910738,1704867681,1705910774,1628585034,1626508855,1626509081,1626509294,1626509307,1626509360,1632895470,1626510037,1626510086,1626510100,1626510112,1626510131,1626510168,1626510182,1626510196,1704876850,1704876957,1704877002,1704877033,1705911214,1705911230,1705911249,1705911263,61,62,251,1705911330,1705911352,89,90,92,93,164,1692166660,91,94,95,165,252,253,1705911687,1626688443,1704872593,85,86,87,88,52,53,84,1704880670,1704880795,1704881323,1704881335,1704881374,1704881398,1704884808,1704884996,1704885043,1704885066,1704885080,1704880828,1704885103,1704885126,1704885204,1704885224,1704885238,1704885250,1704885829,1704885844,1704885864,1704885879,1704886019,1704881076,1705913077,1705913110,1705913130,1705913156,1705913175,1705913202,1704881095,1704881136,1704881155,1704881189,1704881218],"sort":1,"role_name":"Store Manager"}';
        $managerParams = json_decode($managerParams, true);

        // 收银员角色
        $cashierParams = '{"access_id":[1704878353,14,1625541086,1625541117,1625559492,1625559529,1625559776,1626918191,1625541135,1625558095,1625558125,1625559901,1684827061,1704783435,1704789776,1705907014,1705908244,1705908269,1625541971,1625542711,1625730490,1625730528,1625730576,1705908423,1625542733,1625730620,1625730827,1625730840,1705908545,1625736208,1625736231,1625736247,1625736260,1705908593,1625736411,1625736427,1625736438,1625736452,1705908651,1696835617,1696835638,1696835672,1696835684,1705908693,1626687165,1705908826,1626690277,1632883327,1705909167,1696645520,148,1704854227,120,1636183986,1705910313,1626508855,1626509081,1626509294,1626509307,1626509360,1632895470,1626510037,1626510086,1626510100,1626510112,1626510131,1626510168,1626510182,1626510196,1704881323,1704881335,1704881398,1704884808,1704884996,1704885066,1704885080,1704885103,1704885126,1704885204,1704885238,1704885250,1704885829,1704885844,1704885879,1704886019,1705913110,1705913130,1705913156,1705913202,1704881095,1704881155,1704881189,1704881218,1705899112,1705895562,1626506017,1626686852,1636183779,54,55,1636183893,1704851926,1704852136,263,1704880670,1704880795,1704880828,1704881076,1705913077],"sort":1,"role_name":"Cashier"}';
        $cashierParams = json_decode($cashierParams, true);

        // 获取appid
        $userModel = new UserModel();
        $info = $userModel->where('app_id', '>', 0)->find();
        if (!$info?->app_id) {
            throw new \Exception('No appid found');
        }

        // 添加角色
        $model = new RoleModel();
        $roles = [$managerParams, $cashierParams];
        foreach ($roles as $roleParams) {
            $roleParams['app_id'] = $info->app_id;
            if (!$model->addFromMigrate($roleParams)) {
                throw new \Exception($model->getError() ?? 'Role addition failure');
            }
        }
    }
}
