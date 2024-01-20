<?php

namespace app\cashier\controller\user;

use app\cashier\controller\Controller;
use app\cashier\model\user\User as UserModel;
use app\cashier\model\order\Cart as CartModel;
use app\common\model\user\User as MemberModel;
use hg\apidoc\annotation as Apidoc;

/**
 * 会员相关
 * @Apidoc\Group("base")
 * @Apidoc\Sort(3)
 */
class User extends Controller
{
    /**
     * @Apidoc\Title("查找会员列表（手机号）")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/index")
     * @Apidoc\Param("mobile", type="string", require=true, default="", desc="用户手机号")
     * @Apidoc\Returned()
     */
    public function index($mobile)
    {
        $list = UserModel::getUserList($mobile);
        if (empty($list) || count($list) == 0) {
            return $this->renderError('用户不存在');
        }
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * @Apidoc\Title("查找会员详情")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/detail")
     * @Apidoc\Param("user_id", type="int", require=false, desc="用户id")
     * @Apidoc\Param("mobile", type="string", require=false, desc="用户手机号")
     * @Apidoc\Returned()
     */
    public function detail($user_id = 0, $mobile = '')
    {
        if (!$user_id && !$mobile) {
            return $this->renderError('请输入用户信息');
        }
        $where = [];
        if ($user_id) {
            $where['user_id'] = $user_id;
        }
        if ($mobile) {
            $where['mobile'] = $mobile;
        }
        $detail = UserModel::detail($where);
        if (!$detail) {
            return $this->renderError('用户不存在');
        }
        return $this->renderSuccess('', $detail);
    }

    /**
     * @Apidoc\Title("添加会员")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/add")
     * @Apidoc\Param("mobile", type="string", require=true, desc="手机号")
     * @Apidoc\Param("nick_name", type="string", require=false, desc="昵称")
     * @Apidoc\Param("password", type="string", require=true, desc="密码")
     * @Apidoc\Returned()
     */
    public function add()
    {
        $model = new MemberModel();
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加会员成功');
        }
        return $this->renderError($model->getError() ?: '添加会员失败');
    }

    /**
     * @Apidoc\Title("会员充值")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/recharge")
     * @Apidoc\Param("user_id", type="int", require=true, default="", desc="用户ID")
     * @Apidoc\Param("source", type="int", require=true, default="", desc="充值类型 0-金额 1-积分")
     * @Apidoc\Param("recharge_value", type="float", require=true, default="", desc="充值数额")
     * @Apidoc\Param("mode", type="string", require=true, default="", desc="inc-增加 dec-减少 final-最终结果")
     * @Apidoc\Returned()
     */
    public function recharge($user_id, $source)
    {
        // 用户详情
        $model = MemberModel::detail($user_id);

        if ($model->recharge($this->cashier['user']['user_name'], $source, $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * @Apidoc\Title("查找会员及折扣信息")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/cashier/user.User/OrderUseCard")
     * @Apidoc\Param("mobile", type="string", require=true, default="", desc="用户手机号")
     * @Apidoc\Param("table_id", type="string", require=false, default="", desc="桌台ID")
     * @Apidoc\Param("order_id", type="string", require=false, default="", desc="订单ID")
     * @Apidoc\Returned()
     */
    public function OrderUseCard($mobile, $table_id = 0, $order_id = 0)
    {
        $model = new CartModel;
        $list = $model->preOrderCartPrice($this->cashier['user']['shop_supplier_id'], $mobile, $table_id, $order_id);
        if (!$list) {
            return $this->renderError($model->getError() ?: '请求失败');
        }
        return $this->renderSuccess('请求成功', $list);
    }
}
