<?php

namespace app\common\model\shop;


use app\common\model\BaseModel;

/**
 * 应用模型
 */
class RoleAccess extends BaseModel
{
    protected $name = 'shop_role_access';
    protected $pk = 'id';

    /**
     * 权限
     * @return \think\model\relation\BelongsTo
     */
    public function shopAccess()
    {
        return $this->belongsTo('Access', 'access_id', 'access_id');
    }

    /**
     * 获取指定角色的所有权限id
     * @param int|array $role_id 角色id (支持数组)
     */
    public static function getAccessIds($role_id)
    {
        $roleIds = is_array($role_id) ? $role_id : [(int)$role_id];
        return (new self)->where('role_id', 'in', $roleIds)->column('access_id');
    }
}
