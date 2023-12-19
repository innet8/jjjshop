<?php

namespace app\api\model\page;

use app\api\model\product\Product as ProductModel;
use app\common\model\page\Page as PageModel;
use app\api\model\plus\coupon\Coupon;
use app\api\model\plus\live\WxLive;
use app\api\model\plus\article\Article;
use app\api\model\plus\group\Group;

/**
 * 首页模型
 */
class Page extends PageModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * DIY页面详情
     */
    public static function getPageData($user, $page_id = 0)
    {
        // 页面详情
        $detail = $page_id > 0 ? parent::detail($page_id) : parent::getDefault();

        // 页面diy元素
        $items = $detail['page_data']['items'];
        // 页面顶部导航
        isset($detail['page_data']['page']) && $items['page'] = $detail['page_data']['page'];
        // 获取动态数据
        $model = new self;

        foreach ($items as $key => $item) {
            unset($items[$key]['defaultData']);
            if ($item['type'] === 'window') {
                $items[$key]['data'] = array_values($item['data']);
            } else if ($item['type'] === 'coupon') {
                $items[$key]['data'] = $model->getCouponList($user, $item);
            } else if ($item['type'] === 'wxlive') {
                $items[$key]['data'] = $model->getWxLiveList($item);
            } else if ($item['type'] === 'article') {
                $items[$key]['data'] = $model->getArticleList($item);
            } else if ($item['type'] === 'group') {
                $items[$key]['data'] = $model->getGroupList($item);
            }
        }
        return ['page' => $items['page'], 'items' => $items];
    }

    /**
     * 优惠券组件：获取优惠券列表
     */
    private function getCouponList($user, $item)
    {
        // 获取优惠券数据
        return (new Coupon)->getList($user, $item['params']['limit'], true);
    }

    /**
     * 微信直播
     */
    private function getWxLiveList($item)
    {
        // 获取头条数据
        $model = new WxLive();
        $liveList = $model->getList($item['params']['showNum']);
        return $liveList->isEmpty() ? [] : $liveList->toArray()['data'];
    }

    /**
     * 资讯组件：获取资讯列表
     */
    private function getArticleList($item)
    {
        // 获取文章数据
        $model = new Article;
        $articleList = $model->getList($item['params']['auto']['category'], $item['params']['auto']['showNum']);
        return $articleList->isEmpty() ? [] : $articleList->toArray()['data'];
    }

    /**
     * 资讯组件：获取资讯列表
     */
    private function getGroupList($item)
    {
        // 获取文章数据
        $model = new Group;
        $groupList = $model->getList($item['params']['showNum'], $item['params']['auto']['productSort']);
        return $groupList->isEmpty() ? [] : $groupList->toArray()['data'];
    }
}