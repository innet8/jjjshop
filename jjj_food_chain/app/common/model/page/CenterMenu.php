<?php

namespace app\common\model\page;

use think\facade\Request;
use app\common\model\BaseModel;
use think\facade\Cache;

/**
 * 个人中心菜单模型
 */
class CenterMenu extends BaseModel
{
    protected $name = 'center_menu';
    protected $pk = 'menu_id';

    /**
     * 详情
     */
    public static function detail($menu_id)
    {
        $detail = self::find($menu_id);
        if (strpos($detail['image_url'], 'http') !== 0) {
            $detail['image_url'] = base_url() . $detail['image_url'];
        }
        return $detail;
    }

    /**
     * 查询所有
     */
    public static function getAll()
    {
        $model = new static();
        if (!Cache::get('center_menu_' . $model::$app_id)) {
            $list = $model->where('status', '=', 1)->order(['sort' => 'asc'])->select();
            if (count($list) == 0) {
                $sys_menus = $model->getSysMenu();
                $save_data = [];
                foreach ($sys_menus as $menu) {
                    $save_data[] = array_merge($sys_menus[$menu['sys_tag']], [
                        'app_id' => self::$app_id
                    ]);
                }
                $model->saveAll($save_data);
            }
            $list = $model->where('status', '=', 1)->order(['sort' => 'asc'])->select();
            Cache::tag('cache')->set('center_menu_' . $model::$app_id, $list);
        }
        return Cache::get('center_menu_' . $model::$app_id);
    }

    /**
     * 系统菜单
     */
    public static function getSysMenu()
    {
        return [
            'address' => [
                'sys_tag' => 'address',
                'title' => '收货地址',
                'link_url' => '/pages/user/address/address',
                'image_url' => 'image/menu/address.png',
                'name' => '收货地址',
                'sort' => 1
            ],
            'coupon' => [
                'sys_tag' => 'coupon',
                'title' => '领券中心',
                'link_url' => '/pages/coupon/coupon',
                'image_url' => 'image/menu/coupon.png',
                'name' => '领券中心',
                'sort' => 2
            ],
            'my_coupon' => [
                'sys_tag' => 'my_coupon',
                'title' => '我的优惠券',
                'link_url' => '/pages/user/my-coupon/my-coupon',
                'image_url' => 'image/menu/mycoupon.png',
                'name' => '我的优惠券',
                'sort' => 3
            ],
            'signin' => [
                'sys_tag' => 'signin',
                'title' => '签到有礼',
                'link_url' => '/pages/plus/signin/signin',
                'image_url' => 'image/menu/signin.png',
                'name' => '签到有礼',
                'sort' => 4
            ],
            'setting' => [
                'sys_tag' => 'setting',
                'title' => '设置',
                'link_url' => '/pages/user/set/set',
                'image_url' => 'image/menu/setting.png',
                'name' => '设置',
                'sort' => 5
            ],
            'newgift' => [
                'sys_tag' => 'newgift',
                'title' => '新客有礼',
                'link_url' => '/pages/plus/newgifts/newgifts',
                'image_url' => 'image/menu/newgift.png',
                'name' => '新客有礼',
                'sort' => 6
            ],
            'birthgift' => [
                'sys_tag' => 'birthgift',
                'title' => '生日有礼',
                'link_url' => '/pages/plus/birthgift/birthgift',
                'image_url' => 'image/menu/birthgift.png',
                'name' => '生日有礼',
                'sort' => 7
            ],
            'points' => [
                'sys_tag' => 'points',
                'title' => '积分商城',
                'link_url' => '/pages/plus/points/list/list',
                'image_url' => 'image/menu/points.png',
                'name' => '积分商城',
                'sort' => 8
            ],
            'invitegift' => [
                'sys_tag' => 'invitegift',
                'title' => '邀请有礼',
                'link_url' => '/pages/plus/invite/invite',
                'image_url' => 'image/menu/invitegift.png',
                'name' => '邀请有礼',
                'sort' => 9
            ],
            'agent' => [
                'sys_tag' => 'agent',
                'title' => '分销中心',
                'link_url' => '/pages/agent/index/index',
                'image_url' => 'image/menu/agent.png',
                'name' => '分销中心',
                'sort' => 10
            ],
            'package' => [
                'sys_tag' => 'package',
                'title' => '券包',
                'link_url' => '/pages/order/package',
                'image_url' => 'image/menu/package.png',
                'name' => '券包',
                'sort' => 11
            ],
            'driver' => [
                'sys_tag' => 'driver',
                'title' => '骑手中心',
                'link_url' => '/pages/plus/rider/rider',
                'image_url' => 'image/menu/driver.png',
                'name' => '骑手中心',
                'sort' => 12
            ],
            'receipt' => [
                'sys_tag' => 'receipt',
                'title' => '团购核销',
                'link_url' => 'receipt',
                'image_url' => 'image/menu/receipt.png',
                'name' => '团购核销',
                'sort' => 13
            ],
            'grouporder' => [
                'sys_tag' => 'grouporder',
                'title' => '团购订单',
                'link_url' => '/pages/order/group-list',
                'image_url' => 'image/menu/grouporder.png',
                'name' => '团购订单',
                'sort' => 14
            ],
        ];

    }

}