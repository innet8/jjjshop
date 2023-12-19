<?php

namespace app\common\model\page;

use app\common\model\BaseModel;

/**
 * diy页面模型
 */
class Page extends BaseModel
{
    protected $pk = 'page_id';
    protected $name = 'page';

    /**
     * 页面标题栏默认数据
     * @return array
     */
    public function getDefaultPage()
    {
        static $defaultPage = [];
        if (!empty($defaultPage)) return $defaultPage;
        return [
            'type' => 'page',
            'name' => '页面设置',
            'params' => [
                'name' => '页面名称',
                'share_title' => '分享标题',
                'share_img' => self::$base_url . 'image/diy/logo.png',
            ],
        ];
    }

    /**
     * 页面diy元素默认数据
     * @return array[]
     */
    public function getDefaultItems()
    {
        return [
            'banner' => [
                'name' => '图片轮播',
                'type' => 'banner',
                'group' => 'media',
                'icon' => 'icon-lunbotu',
                'style' => [
                    'paddingTop' => 0,
                    'paddingBottom' => 0,
                    'paddingLeft' => 0,
                    'topRadio' => 0,
                    'bottomRadio' => 0,
                    'btnColor' => '#ffffff',
                    'background' => '#ffffff',
                    'btnShape' => 'round',//rectangle 长方形，round圆形, square正方形
                    'height' => 340,
                    'isLogin' => 1,
                    'loginBgType' => 1,
                    'loginBackground' => '#FFCC00',
                    'loginBgImage' => self::$base_url . 'image/diy/banner/11.jpg',
                    'loginOpacity' => 100,
                    'loginHeight' => 42,
                    'loginTopRadio' => 5,
                    'loginBottomRadio' => 5,
                    'loginPaddingLeft' => 10,
                    'loginBeforeTxtColor' => '#FFFFFF',
                    'loginBtnBg' => '#FFFFFF',
                    'loginBtnTxtColor' => '#FFCC00',
                    'loginBtnRadius' => 15,
                    'loginAvatarSize' => 80,
                    'loginAvatarRadius' => 100,
                    'loginAfterTxtColor' => '#FFFFFF',
                    'loginAfterRightTxtColor' => '#FFFFFF',
                    'loginMarginLeft' => 10
                ],
                'data' => [
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/09.png',
                        'linkUrl' => ''
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/10.png',
                        'linkUrl' => ''
                    ]
                ]
            ],
            'navBar' => [
                'name' => '导航组',
                'type' => 'navBar',
                'group' => 'media',
                'icon' => 'icon-mulu',
                'style' => [
                    "background" => "#ffffff",
                    "rowsNum" => "2",
                    "bgcolor" => "#f2f2f2",
                    "paddingTop" => 10,
                    "paddingBottom" => 10,
                    "paddingLeft" => 10,
                    "topRadio" => 8,
                    "bottomRadio" => 8,
                    "background1" => "#fff5cf",
                    "background2" => "#fff"
                ],
                'data' => [
                    [
                        'linkUrl' => '',
                        'imageUrl' => '',
                        'title' => '按钮标题',
                        'text' => '按钮文字1',
                        'color' => '#666666'
                    ],
                ]
            ],
            'blank' => [
                'name' => '辅助空白',
                'type' => 'blank',
                'group' => 'tools',
                'icon' => 'icon-kongbaiye',
                'style' => [
                    'height' => 20,
                    'background' => '#ffffff'
                ]
            ],
            'guide' => [
                'name' => '辅助线',
                'type' => 'guide',
                'group' => 'tools',
                'icon' => 'icon-fuzhuxian',
                'style' => [
                    'background' => '#f2f2f2',
                    'lineStyle' => 'solid',
                    'lineHeight' => 1,
                    'lineColor' => "#eeeeee",
                    'paddingTop' => 10,
                    'paddingLeft' => 10,
                    'paddingBottom' => 0,
                ]
            ],
            'window' => [
                'name' => '图片橱窗',
                'type' => 'window',
                'group' => 'media',
                'icon' => 'icon-tupian11',
                'style' => [
                    'paddingTop' => 0,
                    'paddingLeft' => 10,
                    'paddingBottom' => 10,
                    'background' => '#f2f2f2',
                    'layout' => 4
                ],
                'data' => [
                    [
                        'imgUrl' => self::$base_url . 'image/diy/window/01.jpg',
                        'linkUrl' => ''
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/window/02.jpg',
                        'linkUrl' => ''
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/window/03.jpg',
                        'linkUrl' => ''
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/window/04.jpg',
                        'linkUrl' => ''
                    ]
                ],
                'dataNum' => 4
            ],
            'article' => [
                'name' => '文章组',
                'type' => 'article',
                'group' => 'media',
                'icon' => 'icon-wenzhangguanli',
                'params' => [
                    'source' => 'auto', // choice; auto
                    'auto' => [
                        'category' => 0,
                        'showNum' => 2
                    ],
                ],
                'style' => [
                    'display' => 10,
                    'background' => '#FFFFFF',
                    'bgcolor' => '#F2F2F2',
                    'paddingTop' => '',
                    'paddingBottom' => 10,
                    'paddingLeft' => 10,
                    'topRadio' => 5,
                    'bottomRadio' => 5,
                ],
                // '自动获取' => 默认数据
                'defaultData' => [
                    [
                        'article_title' => '此处显示文章标题',
                        'show_type' => 10,
                        'image' => self::$base_url . 'image/diy/article/01.png',
                        'views_num' => 309
                    ],
                    [
                        'article_title' => '此处显示文章标题',
                        'show_type' => 10,
                        'image' => self::$base_url . 'image/diy/article/01.png',
                        'views_num' => 309
                    ]
                ],
                // '手动选择' => 默认数据
                'data' => []
            ],
            'wxlive' => [
                'name' => '微信直播',
                'type' => 'wxlive',
                'group' => 'shop',
                'icon' => 'icon-shipin',
                'params' => [
                    'source' => 'auto', // choice; auto
                    'showNum' => 2
                ],
                'style' => [
                    'background_image' => self::$base_url . 'image/diy/active/live.png',
                    'color' => '#700505',
                    'background' => '#FFFFFF',
                    'bgcolor' => '#f2f2f2',
                    'paddingTop' => 10,
                    'paddingBottom' => 10,
                    'paddingLeft' => 10,
                    'topRadio' => 5,
                    'bottomRadio' => 5
                ],
                // '自动获取' => 默认数据
                'defaultData' => [
                    [
                        'shop_name' => '直播间名称',
                        'logo_image' => self::$base_url . 'image/diy/circular.png',
                        'name' => '主播昵称',
                    ],
                    [
                        'shop_name' => '直播间名称',
                        'logo_image' => self::$base_url . 'image/diy/circular.png',
                        'name' => '主播昵称',
                    ],
                ],
                // '手动选择' => 默认数据
                'data' => [
                    [
                        'shop_name' => '直播间名称',
                        'logo_image' => self::$base_url . 'image/diy/circular.png',
                        'name' => '主播昵称',
                    ],
                    [
                        'shop_name' => '直播间名称',
                        'logo_image' => self::$base_url . 'image/diy/circular.png',
                        'name' => '主播昵称',
                    ],
                ]
            ],
            'group' => [
                'name' => '团购组',
                'type' => 'group',
                'group' => 'media',
                'icon' => 'icon-pintuangou',
                'params' => [
                    'auto' => [
                        'productSort' => 'all', // all; sales; price
                    ],
                    "showNum" => 5,
                    "productName" => 1,
                    "productRemarks" => 1,
                    "producPrice" => 1,
                    "productLine" => 1,
                    "productBtn" => 1,
                    "productDiscount" => 1,
                    "productSales" => 1
                ],
                'style' => [
                    "bgcolor" => "#f2f2f2",
                    "background" => "#fff",
                    "productBg" => "#fff",
                    "paddingLeft" => 10,
                    "bottomRadio" => 8,
                    "productNameColor" => "#333",
                    "productRemarksColor" => "#999",
                    "productPriceColor" => "#ff5800",
                    "productTipsColor" => "#ff5800",
                    "productLineColor" => "#999",
                    "productSalesColor" => "#999",
                    "product_btnRadio" => 15,
                    "btnColor" => "#fff",
                    "btnBg" => "#ffcc00"
                ],
                // '自动获取' => 默认数据
                'defaultData' => [
                    [
                        'group_name' => '此处显示团购标题',
                        'describe' => "描述",
                        'group_price' => "280",
                        'discount' => "5.0折",
                        'line_price' => "560",
                        'image' => self::$base_url . 'image/diy/group/01.png',
                        'group_sales' => 400
                    ],
                    [
                        'group_name' => '此处显示团购标题',
                        'describe' => "描述",
                        'group_price' => "280",
                        'discount' => "5.0折",
                        'line_price' => "560",
                        'image' => self::$base_url . 'image/diy/group/01.png',
                        'group_sales' => 400
                    ]
                ],
                // '手动选择' => 默认数据
                'data' => []
            ],
            'videoLive' => [
                'name' => '视频号直播',
                'type' => 'videoLive',
                'group' => 'tools',
                'icon' => 'icon-shipinbofang',
                'style' => [
                    'right' => 1,
                    'bottom' => 60,
                    'opacity' => 100,
                ],
                'params' => [
                    'finderUserName' => '',
                    'image' => self::$base_url . 'image/diy/videoLive.png',
                ],
            ],
            'title' => [
                'name' => '标题',
                'type' => 'title',
                'group' => 'media',
                'icon' => 'icon-biaoti',
                'style' => [
                    'paddingTop' => 0,
                    'paddingBottom' => 0,
                    'paddingLeft' => 0,
                    'topRadio' => 0,
                    'bottomRadio' => 0,
                    'bgcolor' => '#FFFFFF',
                    'textSize' => 20,
                    'weight' => 800,
                    'isLine' => 1,
                    'lineColor' => '#ff4c01',
                    'isSub' => 1,
                    'subtextSize' => 14,
                    'subtextColor' => '#DDDDDD',
                    'subbackground' => '#FFCCCC',
                    'isMore' => 1,
                    'moretextColor' => '#FF0000',
                    'background' => '#F5F5F5',
                    'textColor' => '#ff4c01',
                    'type' => '1'
                ],
                'params' => [
                    'title' => '标题名称',
                    'subtitle' => '副标题名称',
                    'moretitle' => '更多',
                    'show_icon' => 'yes',
                    'icon' => '',
                    'linkUrl' => '',
                    'sublinkUrl' => ''
                ]
            ],
            'imageNav' => [
                'name' => '图文导航',
                'type' => 'imageNav',
                'group' => 'shop',
                'icon' => 'icon-mulu',
                'style' => [
                    "bgcolor" => "#f2f2f2",
                    "background" => "#fff",
                    "paddingLeft" => 10,
                    "bottomRadio" => 8,
                    "topRadio" => 8,
                    "rowsNum" => 5
                ],
                // '手动选择' => 默认数据
                'data' => [
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/05.png',
                        'linkUrl' => '/pages/plus/newgifts/newgifts',
                        'text' => '新客专享'
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/06.png',
                        'linkUrl' => '/pages/order/package',
                        'text' => '优惠券'
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/07.png',
                        'linkUrl' => '/pages/plus/invite/invite',
                        'text' => '邀请有礼'
                    ], [
                        'imgUrl' => self::$base_url . 'image/diy/banner/08.png',
                        'linkUrl' => '/pages/plus/birthgift/birthgift',
                        'text' => '生日有礼'
                    ]
                ]
            ],
            'adNav' => [
                'name' => '广告导航',
                'type' => 'adNav',
                'group' => 'shop',
                'icon' => 'icon-tupian11',
                'style' => [
                    "bgcolor" => "#f2f2f2",
                    "bottomRadio" => 8,
                    "paddingLeft" => 10,
                    "topRadio" => 8,
                    "paddingTop" => 10
                ],
                // '手动选择' => 默认数据
                'data' => [
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/03.png',
                        'linkUrl' => 'pages/product/list/takeaway?orderType=takein',
                        "title" => "门店自取",
                        "text" => "下单免排队",
                        "titlecolor" => "#333",
                        "textcolor" => "#999"
                    ],
                    [
                        'imgUrl' => self::$base_url . 'image/diy/banner/04.png',
                        "linkUrl" => "pages/product/list/takeaway?orderType=takeout",
                        "titlecolor" => "#333",
                        "textcolor" => "#999",
                        "title" => "外卖点单",
                        "text" => "无接触配送"

                    ]
                ]
            ],
        ];
    }

    /**
     * 格式化页面数据
     * @param $json
     * @return mixed
     */
    public function getPageDataAttr($json)
    {
        // 旧版数据转义
        $array = $this->_transferToNewData($json);
        // 合并默认数据
        return $this->_mergeDefaultData($array);
    }

    /**
     * 自动转换data为json格式
     * @param $value
     * @return false|string
     */
    public function setPageDataAttr($value)
    {
        return json_encode($value ?: ['items' => []]);
    }

    /**
     * diy页面详情
     * @param $page_id
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function detail($page_id)
    {
        return static::find($page_id);
    }

    /**
     * diy页面详情
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getHomePage()
    {
        return self::where('page_type', '10')->find();
    }

    /**
     * 旧版数据转义为新版格式
     * @param $json
     * @return array
     */
    private function _transferToNewData($json)
    {
        $array = json_decode($json, true);
        $items = $array['items'];
        if (isset($items['page'])) {
            unset($items['page']);
        }
        foreach ($items as &$item) {
            isset($item['data']) && $item['data'] = array_values($item['data']);
        }
        return [
            'page' => isset($array['page']) ? $array['page'] : $array['items']['page'],
            'items' => array_values(array_filter($items))
        ];
    }

    /**
     * 合并默认数据
     * @param $array
     * @return mixed
     */
    private function _mergeDefaultData($array)
    {
        $array['page'] = array_merge_multiple($this->getDefaultPage(), $array['page']);
        $defaultItems = $this->getDefaultItems();
        foreach ($array['items'] as &$item) {
            if (isset($defaultItems[$item['type']])) {
                array_key_exists('data', $item) && $defaultItems[$item['type']]['data'] = [];
                $item = array_merge_multiple($defaultItems[$item['type']], $item);
            }
        }
        return $array;
    }

    /**
     * 首页默认设置
     */
    public static function getDefault($page_type = 10)
    {
        $detail = (new static())->where('is_delete', 0)->where('page_type', $page_type)->order('is_default desc,page_id desc')->find();
        if ($page_type == 10 && !$detail) {
            $page_data = '{"page":{"type":"page","name":"\u9875\u9762\u8bbe\u7f6e","params":{"name":"\u9875\u9762\u88c5\u4fee","share_title":"\u5206\u4eab\u6807\u9898","share_img":"https:\/\/food3.jjjshop.net\/image\/diy\/logo.png"}},"items":[{"name":"\u56fe\u7247\u8f6e\u64ad","type":"banner","group":"media","icon":"icon-lunbotu","style":{"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"topRadio":0,"bottomRadio":0,"btnColor":"#ffffff","background":"#ffffff","btnShape":"round","height":640,"isLogin":0,"loginBgType":1,"loginBackground":"#FFCC00","loginBgImage":"https:\/\/food3.jjjshop.net\/image\/diy\/banner\/11.jpg","loginOpacity":100,"loginHeight":42,"loginTopRadio":5,"loginBottomRadio":5,"loginPaddingLeft":10,"loginBeforeTxtColor":"#FFFFFF","loginBtnBg":"#FFFFFF","loginBtnTxtColor":"#FFCC00","loginBtnRadius":15,"loginAvatarSize":80,"loginAvatarRadius":100,"loginAfterTxtColor":"#FFFFFF","loginAfterRightTxtColor":"#FFFFFF","loginMarginLeft":10,"imgShape":"rectangle"},"data":[{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/20231117180614a0d3a4407.jpg","linkUrl":"pages\/diy-page\/diy-page?page_id=10048","name":"\u94fe\u63a5\u5230 \u81ea\u5b9a\u4e49\u9875\u9762 \u5546\u57ce"},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/20231117180614a0d3a4407.jpg","linkUrl":""},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/2023111718061419d986691.jpg","linkUrl":""}]},{"name":"\u89c6\u9891\u53f7\u76f4\u64ad","type":"videoLive","group":"tools","icon":"icon-shipinbofang","style":{"right":0,"bottom":20,"opacity":100},"params":{"finderUserName":"sphUnEWXOQtd7bF","image":"https:\/\/qn-cdn.jjjshop.net\/2023111718094211b192587.png"}},{"name":"\u5e7f\u544a\u5bfc\u822a","type":"adNav","group":"shop","icon":"icon-tupian11","style":{"bgcolor":"#F2F2F2","bottomRadio":0,"paddingLeft":10,"topRadio":8,"paddingTop":30,"paddingBottom":0,"background1":"#ffffff","background2":"#ffffff"},"data":[{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/2023111718051417adf1151.png","linkUrl":"pages\/product\/list\/takeaway?orderType=takein","title":"\u95e8\u5e97\u81ea\u53d6","text":"\u4e0b\u5355\u514d\u6392\u961f","titlecolor":"#333","textcolor":"#999","imageUrl":"https:\/\/food3.jjjshop.net\/uploads\/20231116\/622d3aabcc50a9991c3837a784861393.png","name":"\u94fe\u63a5\u5230 \u9875\u9762 \u81ea\u53d6"},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/20231117180514fa7485884.png","linkUrl":"pages\/product\/list\/takeaway?orderType=takeout","titlecolor":"#333","textcolor":"#999","title":"\u5916\u5356\u70b9\u5355","text":"\u65e0\u63a5\u89e6\u914d\u9001","imageUrl":"https:\/\/food3.jjjshop.net\/uploads\/20231116\/9b78081f1652bb82b1d0409e870dec8a.png","name":"\u94fe\u63a5\u5230 \u9875\u9762 \u5916\u5356"}]},{"name":"\u56fe\u6587\u5bfc\u822a","type":"imageNav","group":"shop","icon":"icon-mulu","style":{"bgcolor":"#f2f2f2","background":"#ffffff","paddingLeft":10,"bottomRadio":8,"topRadio":0,"rowsNum":5,"paddingBottom":0,"imgShape":false},"data":[{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/2023111718051456d8b1583.png","linkUrl":"\/pages\/plus\/newgifts\/newgifts","text":"\u65b0\u5ba2\u4e13\u4eab","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u65b0\u5ba2\u6709\u793c"},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/2023111718051428d7f5768.png","linkUrl":"\/pages\/user\/my-coupon\/my-coupon","text":"\u4f18\u60e0\u5238","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u6211\u7684\u4f18\u60e0\u5238"},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/20231117180514935ea5842.png","linkUrl":"\/pages\/plus\/invite\/invite","text":"\u9080\u8bf7\u6709\u793c","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u9080\u8bf7\u6709\u793c"},{"imgUrl":"https:\/\/qn-cdn.jjjshop.net\/202311171805142bc1e8138.png","linkUrl":"\/pages\/plus\/birthgift\/birthgift","text":"\u751f\u65e5\u6709\u793c","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u751f\u65e5\u6709\u793c"},{"imgUrl":"https:\/\/food3.jjjshop.net\/image\/diy\/banner\/05.png","linkUrl":"\/pages\/order\/package","text":"\u8d85\u503c\u5238\u5305","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u5238\u5305"}]},{"name":"\u5bfc\u822a\u7ec4","type":"navBar","group":"media","icon":"icon-mulu","style":{"background":"#ffffff","rowsNum":"2","bgcolor":"#F2F2F2","paddingTop":10,"paddingBottom":10,"paddingLeft":10,"topRadio":8,"bottomRadio":8,"background1":"#ffffff","background2":"#ffffff"},"data":[{"linkUrl":"scanQrcode","imageUrl":"https:\/\/qn-cdn.jjjshop.net\/2023111718091562eac8811.png","title":"\u5802\u98df\u70b9\u9910","text":"\u652f\u6301\u591a\u79cd\u70b9\u9910\u6a21\u5f0f","color":"#666666","textcolor":"#999999","name":"\u94fe\u63a5\u5230 \u83dc\u5355 \u626b\u4e00\u626b(\u4ec5\u9650\u5bfc\u822a\u7ec4)","titlecolor":"#333333"},{"linkUrl":"pages\/product\/list\/store","imageUrl":"https:\/\/qn-cdn.jjjshop.net\/202311171809156ccec3059.png","title":"\u5feb\u9910\u6a21\u5f0f","text":"\u4e0b\u5355\u53eb\u53f7\uff0c\u5230\u5e97\u53d6\u9910","color":"#666666","name":"\u94fe\u63a5\u5230 \u9875\u9762 \u5feb\u9910\u6a21\u5f0f","titlecolor":"#000000","textcolor":"#C5B011"}]},{"name":"\u5bfc\u822a\u7ec4","type":"navBar","group":"media","icon":"icon-mulu","style":{"background":"#ffffff","rowsNum":"1","bgcolor":"#f2f2f2","paddingTop":0,"paddingBottom":10,"paddingLeft":10,"topRadio":8,"bottomRadio":8,"background1":"#fff5cf","background2":"#fff"},"data":[{"linkUrl":"pages\/shop\/shop_list","imageUrl":"https:\/\/qn-cdn.jjjshop.net\/20231117180915968af0180.png","title":"\u67e5\u770b\u95e8\u5e97","text":"\u7b49\u4f60\u53d1\u73b0\u66f4\u591a\u7ebf\u4e0b\u95e8\u5e97","color":"#666666","name":"\u94fe\u63a5\u5230 \u9875\u9762 \u95e8\u5e97\u5217\u8868"}]},{"name":"\u5bfc\u822a\u7ec4","type":"navBar","group":"media","icon":"icon-mulu","style":{"background":"#ffffff","rowsNum":"1","bgcolor":"#f2f2f2","paddingTop":10,"paddingBottom":10,"paddingLeft":10,"topRadio":8,"bottomRadio":8,"background1":"#fff5cf","background2":"#fff"},"data":[{"linkUrl":"pages\/call\/call","imageUrl":"https:\/\/qn-cdn.jjjshop.net\/20231118183347e9de15176.png","title":"\u6392\u961f\u53d6\u53f7","text":"\u7f8e\u5473\u4e0d\u7528\u7b49","color":"#666666","name":"\u94fe\u63a5\u5230 \u9875\u9762 \u6392\u961f\u53eb\u53f7"}]},{"name":"\u6807\u9898","type":"title","group":"media","icon":"icon-biaoti","style":{"paddingTop":0,"paddingBottom":0,"paddingLeft":10,"topRadio":8,"bottomRadio":0,"bgcolor":"#F2f2f2","textSize":16,"weight":800,"isLine":0,"lineColor":"#000000","isSub":0,"subtextSize":14,"subtextColor":"#666666","subbackground":"#FFCCCC","isMore":1,"moretextColor":"#D0D0D0","background":"#Ffffff","textColor":"#000000","type":8},"params":{"title":"\u56e2\u8d2d","subtitle":"\u526f\u6807\u9898\u540d\u79f0","moretitle":"\u67e5\u770b\u5168\u90e8","show_icon":"yes","icon":"","linkUrl":"","sublinkUrl":"","morelinkUrl":"\/pages\/plus\/group\/list"}},{"name":"\u56e2\u8d2d\u7ec4","type":"group","group":"media","icon":"icon-pintuangou","params":{"auto":{"productSort":"all"},"showNum":3,"productName":1,"productRemarks":1,"producPrice":1,"productLine":1,"productBtn":1,"productDiscount":1,"productSales":1},"style":{"bgcolor":"#f2f2f2","background":"#fff","productBg":"#ffffff","paddingLeft":10,"bottomRadio":8,"productNameColor":"#333333","productRemarksColor":"#333333","productPriceColor":"#FFDD43","productTipsColor":"#FFDD43","productLineColor":"#999999","productSalesColor":"#333333","product_btnRadio":10,"btnColor":"#ffffff","btnBg":"#FFDD43","paddingTop":0,"paddingBottom":10,"topRadio":0,"product_imgRadio":9,"product_topRadio":7,"product_bottomRadio":7},"defaultData":[{"group_name":"\u6b64\u5904\u663e\u793a\u56e2\u8d2d\u6807\u9898","describe":"\u63cf\u8ff0","group_price":"280","discount":"5.0\u6298","line_price":"560","image":"https:\/\/food3.jjjshop.net\/image\/diy\/group\/01.png","group_sales":400},{"group_name":"\u6b64\u5904\u663e\u793a\u56e2\u8d2d\u6807\u9898","describe":"\u63cf\u8ff0","group_price":"280","discount":"5.0\u6298","line_price":"560","image":"https:\/\/food3.jjjshop.net\/image\/diy\/group\/01.png","group_sales":400}],"data":[]},{"name":"\u6807\u9898","type":"title","group":"media","icon":"icon-biaoti","style":{"paddingTop":10,"paddingBottom":10,"paddingLeft":0,"topRadio":0,"bottomRadio":0,"bgcolor":"#FFFFFF","textSize":18,"weight":800,"isLine":0,"lineColor":"#EEEEEE","isSub":0,"subtextSize":14,"subtextColor":"#FF0000","subbackground":"#FFCCCC","isMore":1,"moretextColor":"#D7D7D7","background":"#FFFFFF","textColor":"#000000","type":8},"params":{"title":"\u65b0\u95fb\u8d44\u8baf","subtitle":"\u526f\u6807\u9898\u540d\u79f0","moretitle":"\u66f4\u591a","show_icon":"yes","icon":"","linkUrl":"","sublinkUrl":""}},{"name":"\u6587\u7ae0\u7ec4","type":"article","group":"media","icon":"icon-wenzhangguanli","params":{"source":"auto","auto":{"category":10021,"showNum":2}},"style":{"display":10,"background":"#FFFFFF","bgcolor":"#F2F2F2","paddingTop":"","paddingBottom":10,"paddingLeft":10,"topRadio":5,"bottomRadio":5},"defaultData":[{"article_title":"\u6b64\u5904\u663e\u793a\u6587\u7ae0\u6807\u9898","show_type":10,"image":"https:\/\/food3.jjjshop.net\/image\/diy\/article\/01.png","views_num":309},{"article_title":"\u6b64\u5904\u663e\u793a\u6587\u7ae0\u6807\u9898","show_type":10,"image":"https:\/\/food3.jjjshop.net\/image\/diy\/article\/01.png","views_num":309}],"data":[]}]}';
            $data = [
                'page_type' => 10,
                'page_name' => '首页装修',
                'page_data' => json_decode($page_data, 1),
                'is_default' => 1,
                'app_id' => self::$app_id
            ];
            (new static())->save($data);
            $detail = (new static())->where('is_delete', 0)->where('page_type', $page_type)->order('is_default desc,page_id desc')->find();
        }
        return $detail;
    }

}
