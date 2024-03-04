<?php

namespace app\common\model\settings;

use think\Model;
use think\facade\Env;
use think\facade\Cache;
use app\common\model\BaseModel;
use app\common\model\shop\User;
use app\common\enum\settings\SettingEnum;
use app\common\enum\settings\LanguageEnum;

/**
 * 系统设置模型
 */
class Setting extends BaseModel
{
    protected $name = 'setting';
    protected $createTime = false;

    /**
     * 获取器: 转义数组格式
     */
    public function getValuesAttr($value)
    {
        return json_decode($value, true);
    }

    /**
     * 修改器: 转义成json格式
     */
    public function setValuesAttr($value)
    {
        return json_encode($value);
    }

    /**
     * 获取指定项设置
     */
    public static function getItem($key, $app_id = null)
    {
        $data = self::getAll($app_id);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }
        return $data_key;
    }

    /**
     * 获取系统配置
     */
    public static function getSysConfig()
    {
        $model = new static;
        $result = $model->withoutGlobalScope()->where('key', '=', SettingEnum::SYS_CONFIG)->value('values');
        if (!$result) {
            $languageList = self::getSupplierLanguage(User::getShopInfo('shop_supplier_id'))['language'] ?? [];
            $result = $model->defaultData(null,$languageList)[SettingEnum::SYS_CONFIG]['values'];
        } else {
            $result = json_decode($result, true);
        }
        return $result;
    }

    /**
     * 获取指定项语言设置
     */
    public static function getSupplierLanguage($shop_supplier_id, $app_id = null)
    {
        $data = self::getAll($app_id, $shop_supplier_id);
        $data_key = $data[SettingEnum::STORE]['values'] ?? [];
        if (isset($data_key['language'])) {
            $data_key['language'] = $data_key['language'] ?: LanguageEnum::default();
        } else {
            $data_key['language'] = LanguageEnum::default();
        }
        return $data_key['language'];
    }

    /**
     * 获取指定项设置
     */
    public static function getSupplierItem($key, $shop_supplier_id, $app_id = null)
    {
        $languageList = $key != SettingEnum::STORE ? self::getSupplierLanguage($shop_supplier_id,$app_id) : [];
        $data = self::getAll($app_id, $shop_supplier_id, $languageList);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }
        return $data_key;
    }

    /**
     * 获取设置项信息
     */
    public static function detail($key, $shop_supplier_id = 0)
    {
        $where = [];
        if ($shop_supplier_id) {
            $where['shop_supplier_id'] = $shop_supplier_id;
        }

        return self::where('key', '=', $key)->where($where)->find() ?? new self;
    }

    /**
     * 全局缓存: 系统设置
     */
    public static function getAll($app_id = null, $shop_supplier_id = 0, $languageList=[])
    {
        $static = new static;
        is_null($app_id) && $app_id = $static::$app_id;
        is_null($shop_supplier_id) && $shop_supplier_id = $static::$app_id;
        $shop_supplier_id == 0 && $shop_supplier_id = $static::$app_id;
        if (!$data = Cache::get('setting_' . $app_id . '_' . $shop_supplier_id)) {
            $setting = $static->where(compact('app_id'))->where('shop_supplier_id', $shop_supplier_id)->select();
            $data = empty($setting) ? [] : array_column($static->collection($setting)->toArray(), null, 'key');
            Cache::tag('cache')->set('setting_' . $app_id . '_' . $shop_supplier_id, $data);
        }
        return $static->getMergeData($data, $languageList);
    }

    /**
     * 数组转换为数据集对象
     */
    public function collection($resultSet)
    {
        $item = current(get_mangled_object_vars($resultSet));
        if ($item instanceof Model) {
            return \think\model\Collection::make($resultSet);
        } else {
            return \think\Collection::make($resultSet);
        }
    }


    /**
     * 合并用户设置与默认数据
     */
    private function getMergeData($userData, $languageList=[])
    {
        $defaultData = $this->defaultData(null, $languageList);
        if (isset($userData['store']['values']['checkedPay'])) {
            unset($defaultData['store']['values']['checkedPay']);
        }
        // 语言 不需要合并
        if (isset($userData['cashier']['values']['language'])) {
            unset($defaultData['cashier']['values']['language']);
        }
        if (isset($userData['tablet']['values']['language'])) {
            unset($defaultData['tablet']['values']['language']);
        }
        if (isset($userData['kitchen']['values']['language'])) {
            unset($defaultData['kitchen']['values']['language']);
        }
        return array_merge_multiple($defaultData, $userData);
    }

    /**
     * 更新设置
     */
    public static function updateSetting(string $key, array $values, int $shop_supplier_id = 0): bool
    {
        $model = self::detail($key, $shop_supplier_id);
        // 删除系统设置缓存
        Cache::set('setting_' . self::$app_id. '_' . $shop_supplier_id, null);
        Cache::tag('common'.$shop_supplier_id)->clear();
        //
        $model = $model->save(
            [
                'key' => $key,
                'describe' => SettingEnum::data()[$key]['describe'],
                'values' => $values,
                'app_id' => self::$app_id,
                'shop_supplier_id' => $shop_supplier_id
            ]
        );
        return $model !== null;
    }


    /**
     * 默认配置
     */
    public function defaultData($storeName = null, $languageList=[])
    {
        foreach ($languageList as $key => $language) {
            $languageList[$key]['key'] = $language['name'];
            unset($languageList[$key]['name']);
        }
        return [
            SettingEnum::STORE => [
                'key' => 'store',
                'describe' => '商城设置',
                'values' => [
                    // 商城名称
                    'name' => $storeName ?: 'XXX shop',
                    // 快递100
                    'kuaidi100' => [
                        'customer' => '',
                        'key' => '',
                    ],
                    // 是否开启短信验证
                    'sms_open' => true,
                    // 是否记录日志
                    'is_get_log' => true,
                    // 是否开启微信授权
                    'wx_open' => true,
                    //默认头像
                    'avatarUrl' => base_url() . 'image/user/avatarUrl.png',
                    //商城logo
                    'logoUrl' => base_url() . 'image/diy/logo.png',
                    // 系统语言
                    'language' => [],
                ],
            ],
            SettingEnum::TRADE => [
                'key' => 'trade',
                'describe' => '交易设置',
                'values' => [
                    'order' => [
                        'close_days' => '3',
                        'receive_days' => '30',
                        'points_days' => '7'
                    ],
                ]
            ],
            SettingEnum::STORAGE => [
                'key' => 'storage',
                'describe' => '上传设置',
                'values' => [
                    'default' => 'local',
                    'engine' => [
                        'local' => [],
                        'qiniu' => [
                            'bucket' => '',
                            'access_key' => '',
                            'secret_key' => '',
                            'domain' => 'http://'
                        ],
                        'aliyun' => [
                            'bucket' => '',
                            'access_key_id' => '',
                            'access_key_secret' => '',
                            'domain' => 'http://'
                        ],
                        'qcloud' => [
                            'bucket' => '',
                            'region' => '',
                            'secret_id' => '',
                            'secret_key' => '',
                            'domain' => 'http://'
                        ],
                    ]
                ],
            ],
            SettingEnum::SMS => [
                'key' => 'sms',
                'describe' => '短信通知',
                'values' => [
                    'default' => 'aliyun',
                    'engine' => [
                        'aliyun' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '',
                            'template_code' => ''
                        ],
                        'qcloud' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '',
                            'template_code' => ''
                        ],
                        'hwcloud' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '',
                            'sender' => '',
                            'template_code' => '',
                            'url' => ''
                        ],
                    ],
                ],
            ],
            SettingEnum::TPL_MSG => [
                'key' => 'tplMsg',
                'describe' => '模板消息',
                'values' => [
                    'payment' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                    'delivery' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                    'refund' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                ],
            ],
            SettingEnum::PRINTER => [
                'key' => 'printer',
                'describe' => '小票打印机设置',
                'values' => [
                    'room_open' => '0',   // 是否开启打印
                    'room_printer_id' => '', // 打印机id
                    'buyer_open' => '0',   // 顾客是否开启打印
                    'buyer_printer_id' => '', // 顾客打印机id
                    'seller_open' => '0',   // 商家是否开启打印
                    'seller_printer_id' => '', // 商家打印机id
                    'cashier_open' => '1',   // 是否开启打印
                    'cashier_printer_id' => '0', // 打印机id
                    'order_status' => [], // 订单类型 10下单打印 20付款打印 30确认收货打印
                    'language_list' => $languageList, // 语言列表
                    'default_language' => 'en', // 默认语言
                    'buffet_sign_open' => '1', // 自助餐标识设置（默认开启）
                ],
            ],
            SettingEnum::FULL_FREE => [
                'key' => 'full_free',
                'describe' => '满额包邮设置',
                'values' => [
                    'is_open' => '0',   // 是否开启满额包邮
                    'money' => '',      // 单笔订单额度
                ],
            ],
            SettingEnum::RECHARGE => [
                'key' => 'recharge',
                'describe' => '用户充值设置',
                'values' => [
                    'is_entrance' => '1',   // 是否允许用户充值
                    'is_custom' => '1',   // 是否允许自定义金额
                    'is_match_plan' => '1',   // 自定义金额是否自动匹配合适的套餐
                    'describe' => "1. 账户充值仅限微信在线方式支付，充值金额实时到账；\n" .
                        "2. 账户充值套餐赠送的金额即时到账；\n" .
                        "3. 账户余额有效期：自充值日起至用完即止；\n" .
                        "4. 若有其它疑问，可拨打客服电话400-000-1234",     // 充值说明
                ],
            ],
            SettingEnum::POINTS => [
                'key' => 'points',
                'describe' => '积分设置',
                'values' => [
                    'points_name' => '积分',         // 积分名称自定义
                    'is_shopping_gift' => '0',      // 是否开启购物送积分
                    'gift_ratio' => '100',            // 是否开启购物送积分
                    'is_shopping_discount' => '0',    // 是否允许下单使用积分抵扣
                    'discount' => [     // 积分抵扣
                        'discount_ratio' => '0.01',       // 积分抵扣比例
                        'full_order_price' => '100.00',       // 订单满[?]元
                        'max_money_ratio' => '10',             // 最高可抵扣订单额百分比
                    ],
                    // 充值说明
                    'describe' => "a) 积分不可兑现、不可转让,仅可在本平台使用;\n" .
                        "b) 您在本平台参加特定活动也可使用积分,详细使用规则以具体活动时的规则为准;\n" .
                        "c) 积分的数值精确到个位(小数点后全部舍弃,不进行四舍五入)\n" .
                        "d) 买家在完成该笔交易(订单状态为“已签收”)后才能得到此笔交易的相应积分,如购买商品参加店铺其他优惠,则优惠的金额部分不享受积分获取;",
                ],
            ],
            SettingEnum::OFFICIA => [
                'key' => 'officia',
                'describe' => '公众号关注',
                'values' => [
                    'status' => 0
                ],
            ],
            SettingEnum::COLLECTION => [
                'key' => 'collection',
                'describe' => '引导收藏',
                'values' => [
                    'status' => 0
                ],
            ],
            SettingEnum::HOMEPUSH => [
                'key' => 'homepush',
                'describe' => '首页推送',
                'values' => [
                    // 是否开启
                    'is_open' => 0,
                ]
            ],
            SettingEnum::SIGN => [
                'key' => 'sign',
                'describe' => '签到有礼',
                'values' => [
                    // 是否开启
                    'is_open' => false,
                    // 签到规则
                    'content' => ''
                ]
            ],
            SettingEnum::GETPHOME => [
                'key' => 'getPhone',
                'describe' => '获取手机号设置',
                'values' => [
                    // 显示区域
                    'area_type' => [],
                    // 不再提示天数
                    'send_day' => 7
                ],
            ],
            SettingEnum::SYS_CONFIG => [
                'key' => 'sys_config',
                'describe' => '系统设置',
                'values' => [
                    'shop_name' => '点餐管理系统', // 商城名称
                    'shop_bg_img' => '', // 商城背景图
                    'shop_logo_img' => '', // 商城logo
                    'cashier_name' => '收银台', // 收银台名称
                    'cashier_bg_img' => '', // 收银台背景图
                    // 微信服务商支付
                    'weixin_service' => [
                        'is_open' => 0, // 是否开启
                        'app_id' => '', // 公众号appid
                        'mch_id' => '', // 商户号
                        'apikey' => '', // apikey
                        'cert_pem' => '', // 证书pem
                        'key_pem' => '' // 证书key
                    ],
                ]
            ],
            SettingEnum::BALANCE => [
                'key' => 'balance',
                'describe' => '充值设置',
                'values' => [
                    // 是否开启
                    'is_open' => '0',
                    // 是否可以自定义
                    'is_plan' => '1',
                    // 最低充值金额
                    'min_money' => 1,
                    // 充值说明
                    'describe' => "a) 账户充值仅限在线方式支付，充值金额实时到账；\n" .
                        "b) 有问题请联系客服;\n",
                ]
            ],
            SettingEnum::THEME => [
                'key' => 'theme',
                'describe' => '主题设置',
                'values' => [
                    'theme' => '0',//主题设置
                ],
            ],
            SettingEnum::DELIVER => [
                'key' => 'deliver',
                'describe' => '配送设置',
                'values' => [
                    'default' => 'local',
                    'engine' => [
                        'local' => [
                            'name' => '商家配送',
                            'time' => 0,
                        ],
                        'dada' => [
                            'name' => '达达配送',
                            'app_key' => '',
                            'app_secret' => '',
                            'source_id' => '',//商户编号
                            'shop_no' => '',//门店编号
                            'online' => '0',//0测试环境1正式环境
                        ],
                        'driver' => [
                            'name' => '配送员配送',
                        ],
                        'meituan' => [
                            'name' => '美团配送',
                            'app_key' => '',
                            'app_secret' => '',
                            'shop_no' => '',
                            'call_back' => '域名/index.php/job/notify/meituan_notify',
                        ],
                        'uu' => [
                            'name' => 'UU跑腿',
                            'app_id' => '',
                            'app_key' => '',
                            'openid' => '',
                            'city_name' => '',
                            'online' => '0',//0测试环境1正式环境
                        ],
                    ]
                ],
            ],
            SettingEnum::GROUP => [
                'key' => 'group',
                'describe' => '团购设置',
                'values' => [
                    // 团购保障
                    'explain' => "随时退，过期自动退",
                    // 未支付订单关闭时间，默认5分钟
                    'close_time' => '5',
                ]
            ],
            SettingEnum::BALANCE_CASH => [
                'key' => 'balance_cash',
                'describe' => '余额提现设置',
                'values' => [
                    // 是否开启
                    'is_open' => '0',
                    // 最低提现金额
                    'min_money' => 1,
                    // 提现比例
                    'cash_ratio' => 100,
                ]
            ],
            SettingEnum::LIVE => [
                'key' => 'live',
                'describe' => '直播设置',
                'values' => [
                    // 自动同步
                    'auto_syn' => false,
                ],
            ],
            SettingEnum::CURRENCY => [
                'key' => 'currency',
                'describe' => '货币单位',
                'values' => [
                    'unit' => '฿', // 货币单位，默认泰铢
                    'is_open' => '0', // 副货币单位开关
                    'vice_unit' => '', // 副货币单位
                    'unit_rate' => '', // 单位汇率
                ],
            ],
            SettingEnum::TAX_RATE => [
                'key' => 'tax_rate',
                'describe' => '税率管理',
                'values' => [
                    'is_open' => '0', // 是否开启 0关闭 1开启
                    'tax_rate' => '', // 税率
                ],
            ],
            SettingEnum::SERVICE_CHARGE => [
                'key' => 'service_charge',
                'describe' => '服务费',
                'values' => [
                    'is_open' => '0', // 是否开启 0关闭 1开启
                    'service_charge' => '', // 服务费
                ],
            ],
            SettingEnum::CASHIER => [
                'key' => 'cashier',
                'describe' => '收银机设置',
                'values' => [
                    // 上传后的轮播内容url（图片 + 视频）
                    'carousel' => [],
                    'is_auto_send' => '0', // 收银结账自动送厨房 0-关闭 1-开启
                    // 收银机服务器连接
                    'server' => [
                        'ip' => Env::get('HARDWARE_SERVER_URL', getLanIp()),
                        'port' => Env::get('HARDWARE_SERVER_PORT', '8080'),
                    ],
                    // 高级设置密码
                    'advanced_password' => '666888',
                    'cashier_password' => '666888', // 钱箱密码
                    // 自动锁屏（秒），默认5分钟
                    'auto_lock_screen' => 300,
                    // 语言列表
                    'language_list' => $languageList,
                    // 常用语言 泰语、英语、中文、繁体 'th', 'en', 'zh', 'zhtw'
                    'language' => [],
                    // 默认语言
                    'default_language' => 'en',
                ],
            ],
            SettingEnum::TABLET => [
                'key' => 'tablet',
                'describe' => '平板端设置',
                'values' => [
                    // 上传后的轮播内容url（图片 + 视频）
                    'carousel' => [],
                    'is_call_service' => '1', // 是否开启呼叫服务员 0-关闭 1-开启
                    'is_customer_order' => '1', // 是否开启顾客自助下单 0-关闭 1-开启
                    'is_show_sold_out' => '0', // 是否显示售罄商品 0-关闭 1-开启
                    // 平板服务器连接
                    'server' => [
                        'ip' => Env::get('HARDWARE_SERVER_URL', getLanIp()),
                        'port' => Env::get('HARDWARE_SERVER_PORT', '8080'),
                    ],
                    // 高级设置密码
                    'advanced_password' => '666888',
                    // 语言列表
                    'language_list' => $languageList,
                    // 常用语言 泰语、英语、中文、繁体 'th', 'en', 'zh', 'zhtw'
                    'language' => [],
                    'default_language' => 'en', // 默认语言
                ],
            ],
            SettingEnum::KITCHEN => [
                'key' => 'kitchen',
                'describe' => '厨显设置',
                'values' => [
                    // 厨显服务器连接
                    'server' => [
                        'ip' => Env::get('HARDWARE_SERVER_URL', getLanIp()),
                        'port' => Env::get('HARDWARE_SERVER_PORT', '8080'),
                    ],
                    // 高级设置密码
                    'advanced_password' => '666888',
                    'is_wait_color' => '0', // 是否开启等待时长颜色 0-关闭 1-开启
                    // 时长颜色 10分钟-黄色#ffff00 20分钟-红色#ff0000
                    'wait_color' => [],
                    // 语言列表
                    'language_list' => $languageList,
                    // 常用语言 泰语、英语、中文、繁体 'th', 'en', 'zh', 'zhtw'
                    'language' => [],
                    'default_language' => 'en', // 默认语言
                ],
            ],
            SettingEnum::BUFFET => [
                'key' => 'buffet',
                'describe' => '自助餐设置',
                'values' => [
                    // 是否开启自助餐 0-关闭 1-开启
                    'is_open' => '1',
                    // 平板结束时间提醒（分）
                    'tablet_end_time' => '5',
                    // 非自助餐商品到时是否能继续选购 0-关闭 1-开启
                    'is_buy_continue' => '0',
                    // 是否开启加钟 0-关闭 1-开启
                    'is_add_clock' => '0',
                    // 名称 - 加钟时间（分）- 价格
                    'add_clock' => [],
                ],
            ],
        ];
    }
}
