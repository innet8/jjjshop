<?php

namespace app\shop\controller;

use app\common\model\shop\User;
use app\shop\service\ShopService;
use hg\apidoc\annotation as Apidoc;
use app\common\enum\settings\SettingEnum;
use app\common\model\settings\Setting as SettingModel;

/**
 * 后台首页
 * @Apidoc\Group("home")
 * @Apidoc\Sort(1)
 */
class Index extends Controller
{
    /**
     * @Apidoc\Title("后台首页")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/index/index")
     * @Apidoc\Param("username", type="string", require=true, default="", desc="用户名")
     * @Apidoc\Param(ref="pageParam")
     * @Apidoc\Returned("top_data", type="array", desc="数据总览", children={
     *    @Apidoc\Returned("total_money", type="float", desc="营业总额"),
     *    @Apidoc\Returned("total_discount_money", type="float", desc="折扣总额"),
     *    @Apidoc\Returned("user_total", type="int", desc="会员数"),
     *    @Apidoc\Returned("order_total", type="int", desc="订单数"),
     *    @Apidoc\Returned("refund_money", type="float", desc="退款金额"),
     *    @Apidoc\Returned("income_money", type="float", desc="预计收入"),
     *    @Apidoc\Returned("supplier_total", type="float", desc="店铺总数"),
     *    @Apidoc\Returned("product_total", type="float", desc="商品总数"),
     * })
     * @Apidoc\Returned("today_data", type="array", desc="今日概况", children={
     *    @Apidoc\Returned("order_total_price", type="array", desc="营业总额", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("order_discount_money", type="array", desc="折扣总额", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("order_refund_money", type="array", desc="退款金额", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("income_money", type="array", desc="预计收入", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("new_supplier_total", type="array", desc="新供应商数", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("order_user_total", type="array", desc="下单用户数", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("order_total", type="array", desc="订单数", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     *    @Apidoc\Returned("new_user_total", type="array", desc="会员数", children={
     *        @Apidoc\Returned("tday", type="string", desc="今日"),
     *        @Apidoc\Returned("ytd", type="string", desc="昨日"),
     *    }),
     * })
     * @Apidoc\Returned("wait_data", type="array", desc="待办事项", children={
     *    @Apidoc\Returned("order", type="array", desc="订单", children={
     *        @Apidoc\Returned("disposal", type="string", desc="待处理订单数量"),
     *    }),
     *    @Apidoc\Returned("stock", type="array", desc="库存", children={
     *        @Apidoc\Returned("product", type="string", desc="库存预警数量"),
     *    }),
     *    @Apidoc\Returned("supplier", type="array", desc="商家", children={
     *        @Apidoc\Returned("cash_apply", type="int", desc="待审核"),
     *        @Apidoc\Returned("cash_money", type="int", desc="审核通过）"),
     *    }),
     * })
     * @Apidoc\Returned("product_data", type="array", desc="列表数据", children={
     *    @Apidoc\Returned("salesNumRank", type="array", desc="销量排行", children={
     *        @Apidoc\Returned("product_name", type="string", desc="商品名称（多语言）"),
     *        @Apidoc\Returned("product_name_text", type="string", desc="商品名称"),
     *        @Apidoc\Returned("total_num", type="int", desc="销量"),
     *        @Apidoc\Returned("total_price", type="float", desc="销售额"),
     *    }),
     *    @Apidoc\Returned("salesMoneyRank", type="array", desc="销售额排行", children={
     *        @Apidoc\Returned("product_name_text", type="string", desc="商品名称"),
     *        @Apidoc\Returned("product_name", type="string", desc="商品名称（多语言）"),
     *        @Apidoc\Returned("total_num", type="int", desc="销量"),
     *        @Apidoc\Returned("total_price", type="float", desc="销售额"),
     *    }),
     * })
     */
    public function index()
    {
        $service = new ShopService;
        return $this->renderSuccess('', ['data' => $service->getHomeData($this->store['user'])]);
    }

    /**
     * @Apidoc\Title("登录数据")
     * @Apidoc\Method ("POST")
     * @Apidoc\Url ("/index.php/shop/index/base")
     * @Apidoc\Returned()
     */
    public function base()
    {
        $config = SettingModel::getSysConfig();
        $settings = [
            'shop_name' => $config['shop_name'],
            'shop_bg_img' => $config['shop_bg_img'],
            'shop_logo_img' => isset($config['shop_logo_img']) ? $config['shop_logo_img'] : '',
        ];
        // 
        $language = getSettingLanguages();
        // 
        return $this->renderSuccess('', compact('settings', 'language'));
    }
}