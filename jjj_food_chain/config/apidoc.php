<?php
return [
    // （选配）文档标题，显示在左上角与首页
    'title'              => '点餐系统接口文档',
    // （选配）文档描述，显示在首页
    'desc'               => '手册：https://docs.apidoc.icu/use/#%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83',
    // （必须）设置文档的应用/版本
    'apps'           => [
        [
            // （必须）标题
            'title'=>'Admin接口',
            // （必须）控制器目录地址
            'path'=>'app\admin\controller',
            // （必须）唯一的key
            'key'=>'admin',
        ],
        [
            // （必须）标题
            'title'=>'收银端接口',
            // （必须）控制器目录地址
            'path'=>'app\cashier\controller',
            // （必须）唯一的key
            'key'=>'cashier',
            'groups'  => [
                ['title'=>'基础','name'=>'base'],
                ['title'=>'商品相关','name'=>'product'],
                ['title'=>'桌台模块','name'=>'table'],
                ['title'=>'订单相关','name'=>'order'],
            ],
        ],
        [
            // （必须）标题
            'title'=>'店铺端接口',
            // （必须）控制器目录地址
            'path'=>'app\shop\controller',
            // （必须）唯一的key
            'key'=>'shop',
            'groups'  => [
                ['title'=>'首页','name'=>'home'],
                ['title'=>'商品管理','name'=>'product'],
                ['title'=>'订单管理','name'=>'order'],
                ['title'=>'会员管理','name'=>'user'],
                ['title'=>'门店管理','name'=>'supplier'],
                ['title'=>'统计报表','name'=>'statistics'],
                ['title'=>'用户管理','name'=>'shop_user'],
                ['title'=>'各端设置','name'=>'terminal_setting'],
                ['title'=>'系统设置','name'=>'system_setting'],
            ],
        ],
        [
            // （必须）标题
            'title'=> 'Api接口',
            // （必须）控制器目录地址
            'path'=>'app\api\controller',
            // （必须）唯一的key
            'key'=>'api',
        ],
        [
            // （必须）标题
            'title'=> '平板端接口',
            // （必须）控制器目录地址
            'path'=>'app\tablet\controller',
            // （必须）唯一的key
            'key'=>'tablet',
        ],
        [
            // （必须）标题
            'title'=> '厨显端接口',
            // （必须）控制器目录地址
            'path'=>'app\kitchen\controller',
            // （必须）唯一的key
            'key'=>'kitchen',
        ]
    ],

    // （必须）指定通用注释定义的文件地址
    'definitions'        => "app\Definitions",
    // （必须）自动生成url规则，当接口不添加@Apidoc\Url ("xxx")注解时，使用以下规则自动生成
    'auto_url' => [
        // 字母规则，lcfirst=首字母小写；ucfirst=首字母大写；
        'letter_rule' => "lcfirst",
        // url前缀
        'prefix'=>"/index.php",
    ],
    // 是否自动注册路由
    'auto_register_routes' => false,
    // （必须）缓存配置
    'cache'              => [
        // 是否开启缓存
        'enable' => false,
    ],
    // （必须）权限认证配置
    'auth'               => [
        // 是否启用密码验证
        'enable'     => false,
        // 全局访问密码
        'password'   => "123456",
        // 密码加密盐
        'secret_key' => "apidoc#hg_code",
        // 授权访问后的有效期
        'expire' => 24*60*60
    ],
    // 全局参数
    'params'=>[
        // （选配）全局的请求Header
        'header'=>[
            // name=字段名，type=字段类型，require=是否必须，default=默认值，desc=字段描述
            ['name'=>'Token','type'=>'string','require'=>true,'desc'=>'身份令牌Token（平板、厨显不需要）'],
            ['name'=>'Appid','type'=>'string','require'=>true, 'desc'=>'应用Appid - app_id'],
            ['name'=>'Sid','type'=>'string','require'=>true, 'desc'=>'门店Sid - shop_supplier_id'],
            ['name'=>'Sid','type'=>'string','require'=>true,'default'=>'10001','desc'=>'门店ID'],
            ['name'=>'Tid','type'=>'string','require'=>true,'default'=>'10001','desc'=>'桌台ID'],
        ],
        // （选配）全局的请求Query
        'query'=>[
            // 同上 header
        ],
        // （选配）全局的请求Body
        'body'=>[
            // 同上 header
        ],
    ],
    // 全局响应体
    'responses'=>[
        // 成功响应体
        'success'=>[
            ['name'=>'code','desc'=>'状态码','type'=>'int','require'=>1,'md'=>'/extend/apidocs/HttpStatus.md'],
            ['name'=>'msg','desc'=>'成功信息','type'=>'string','require'=>1],
            //参数同上 headers；main=true来指定接口Returned参数挂载节点
            ['name'=>'data','desc'=>'数据','main'=>true,'type'=>'object','require'=>1],
        ],
        // 异常响应体
        'error'=>[
            ['name'=>'code','desc'=>'状态码','type'=>'int','require'=>1,'md'=>'/extend/apidocs/HttpStatus.md'],
            ['name'=>'msg','desc'=>'错误信息','type'=>'string','require'=>1],
        ]
    ],
    // （选配）apidoc路由前缀,默认apidoc
    'route_prefix'=>'/apidoc',
    //（选配）默认作者
    'default_author'=>'',
    //（选配）默认请求类型
    'default_method'=>'GET',
    //（选配）允许跨域访问
    'allowCrossDomain'=>false,
    /**
     * （选配）解析时忽略带@注解的关键词，当注解中存在带@字符并且非Apidoc注解，如 @key test，此时Apidoc页面报类似以下错误时:
     * [Semantical Error] The annotation "@key" in method xxx() was never imported. Did you maybe forget to add a "use" statement for this annotation?
     */
    'ignored_annitation'=>[],

    // （选配）数据库配置
    'database'=>[],
    // （选配）Markdown文档
    'docs' => [
        ['title' => 'HTTP响应编码', 'path' => 'extend/apidocs/HttpStatus'],
        ['title' => 'ApiDoc配置说明', 'path' => 'extend/apidocs/Config'],
        ['title' => 'ApiDoc使用说明', 'path' => 'extend/apidocs/Use'],
    ],
    // （选配）代码生成器配置 注意：是一个二维数组
    'generator' =>[],
    // （选配）代码模板
    'code_template'=>[],
    // （选配）接口分享功能
    'share'=>[
        // 是否开启接口分享功能
        'enable'=>false,
        // 自定义接口分享操作，二维数组，每个配置为一个按钮操作
        'actions'=>[]
    ],
];
