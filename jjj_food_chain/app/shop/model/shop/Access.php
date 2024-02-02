<?php

namespace app\shop\model\shop;

use app\common\model\shop\Access as AccessModel;
use app\shop\model\auth\RoleAccess;
use app\shop\model\auth\UserRole;

/**
 * Class Access
 *  商家用户权限模型
 */
class Access extends AccessModel
{
    /**
     * 获取商家后台路由
     */
    public function formatShopMenu($menus)
    {
        return $this->getRouteMenu($menus, AccessModel::SHOP_ROUTE_NAME);
    }
}