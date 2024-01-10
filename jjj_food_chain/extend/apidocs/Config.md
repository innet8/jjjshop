<br>
<br>

**[官方文档](https://hgthecode.github.io/thinkphp-apidoc/use/notes/controller)**
<br>
<br>

**配置文件示范**
```
<?php
return [
    // 文档标题
    'title'              => 'frpapp接口文档',
    // 文档描述
    'desc'               => '手册：https://hgthecode.github.io/thinkphp-apidoc/use/notes/controller/',
    // 默认请求类型
    'default_method' => 'POST',
    // 允许跨域访问
    'allowCrossDomain' => true,
    // 设置可选版本
    'apps'           => [
        [
            'title' => 'APP接口',
            'key' => 'demo',
            'items' => [
                [
                    'title' => 'v1.0', 'path' => 'app\api\controller', 'ke y' => 'api-v1',
                    'groups'  => [
                        ['title'=>'基础模块','name'=>'base'],
                        ['title'=>'业务模块','name'=>'buss']
                    ],
                    'headers' => [
                        ['name' => 'x-token', 'type' => 'string', 'desc' => '身份票据'],
                    ]
                ]
            ]
        ],
        [
            'title' => '后台管理',
            'key' => 'demo',
            'items' => [
                [
                    'title' => 'v1.0', 'path' => 'app\admin\controller', 'key' => 'v1',
                    'groups'  => [
                        ['title'=>'基础模块','name'=>'base'],
                        ['title'=>'业务模块','name'=>'buss']
                    ],
                    'headers' => [
                        ['name' => 'x-admin-token', 'type' => 'string', 'desc' => '身份票据'],
                    ]
                ]
            ]
        ]
    ],
    // 自动生成url规则
    'auto_url' => [
        // 字母规则
        'letter_rule' => "lcfirst",
        // 多级路由分隔符
        'multistage_route_separator'  => "."
    ],
    // 指定公共注释定义的文件地址
    'definitions'        => "app\providers\apidoc\Definitions",
    // 缓存配置
    'cache'              => [
        // 是否开启缓存
        'enable' => false,
    ],
    // 权限认证配置
    'auth'               => [
        // 是否启用密码验证
        'enable'     => false,
        // 全局访问密码
        'password'   => "123456",
        // 密码加密盐
        'secret_key' => "apidoc#hg_code",
        // 有效期
        'expire' => 24 * 60 * 60
    ],
    // 统一的请求Header
    'headers' => [],
    // 统一的请求参数Parameters
    'parameters' => [],
    // 统一的请求响应体
    'responses' => [
        ['name' => 'code', 'desc' => '代码', 'type' => 'int'],
        ['name' => 'msg', 'desc' => '业务信息', 'type' => 'string'],
        ['name' => 'data', 'desc' => '业务数据', 'main' => true, 'type' => 'object'],
    ],
    // markdown 文档
    'docs' => [
        ['title' => 'HTTP响应编码', 'path' => 'extend/apidocs/HttpStatus'],
        ['title' => 'ApiDoc使用说明', 'path' => 'extend/apidocs/Use']
    ],
    // 代码生成器配置 注意：是一个二维数组
    'generator' => [
        [
            // 标题
            'title' => '创建Crud',
            // 是否启用
            'enable' => true,
            // 执行中间件，具体请查看下方中间件介绍
            'middleware' => [
                \app\middleware\CreateCrudMiddleware::class
            ],
            // 生成器窗口的表单配置
            'form' => [
                // 表单显示列数
                'colspan' => 3,
                // 表单项字段配置
                'items' => [
                    [
                        // 表单项标题
                        'title' => '控制器标题',
                        // 字段名
                        'field' => 'controller_title',
                        // 输入类型，支持：input、select
                        'type' => 'input',
                        // 输入项属性
                        'props' => [
                            // 提示文本
                            'placeholder' => '请输入',
                            // type类型为select时有效，multiple=多选
                            'mode' => 'multiple',
                            // type类型为select时有效，最多显示选项的个数
                            'maxTagCount' => 1,
                            // type类型为select时有效，下拉选项数据
                            'options' => [
                                // 每个选项的标题与值，label=标题，value=值
                                ['label' => '选项A', 'value' => 1],
                            ]
                        ],
                        // 验证规则
                        'rules' => [
                            // 必填的验证
                            ['required' => true, 'message' => '请输入控制器文件名'],
                            // 自定义正则验证
                            ['pattern' => '^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$', 'message' => '请输入正确的目录名'],
                        ]
                    ],
                ]
            ],
            // 文件生成配置，注意：是一个二维数组
            'files' => [
                [
                    // 生成文件的文件夹地址，或php文件地址
                    'path' => 'app\${app[0].key}\controller\${app[1].key',
                    // 生成文件的命名空间
                    'namespace' => 'app\${app[0].key}\controller\v1',
                    // 模板文件地址
                    'template' => 'template/controller.tpl',
                    // 名称
                    'name' => 'controller',
                    // 验证规则
                    'rules' => [
                        ['required' => true, 'message' => '请输入控制器文件名'],
                        ['pattern' => '^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$', 'message' => '请输入正确的目录名'],
                    ]
                ],
                [
                    'name' => 'service',
                    'path' => 'app\${app[0].key}\services',
                    'template' => 'template/service.tpl',
                ],
                [
                    'name' => 'validate',
                    'path' => 'app\${app[0].key}\validate',
                    'template' => 'template/validate.tpl',
                ],
                [
                    // 这里的path地址为php文件地址，当指定到php文件地址时，不会创建文件，而会将模板内容添加的该.php文件内
                    'path' => 'app\${app[0].key}\route\admin.php',
                    'name' => 'route',
                    'template' => 'template/route.tpl',
                ],
            ],
            // 数据表配置
            'table' => [
                // 可选的字段类型
                'field_types' => [
                    "int",
                    "tinyint",
                    "integer",
                    "float",
                    "decimal",
                    "char",
                    "varchar",
                    "blob",
                    "text",
                    "point",
                ],
                // 数据表配置，注意：是一个二维数组，可定义多个数据表
                'items' => [
                    [
                        // 表标题
                        'title' => '主表',
                        // 模型名验证规则
                        'model_rules' => [
                            ['pattern' => '^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$', 'message' => '模型文件名错误，请输入大写字母开头的字母+数字，长度2-19的组合']
                        ],
                        // 表名验证规则
                        'table_rules' => [
                            ['pattern' => '^[a-z]{1}([a-z0-9]|[_]){2,19}$', 'message' => '表名错误，请输入小写字母开头的字母+数字+下划线，长度2-19的组合']
                        ],
                        // 显示的提示文本
                        'desc' => '提示说明文本',
                        // 生成模型的命名空间
                        'namespace' => 'app\resources\model',
                        // 生成模型的文件夹地址
                        'path' => "app\resources\model",
                        // 模板文件地址
                        'template' => "template/model.tpl",
                        // 自定义配置列
                        'columns' => [
                            [
                                // 标题
                                'title' => '验证',
                                // 字段名
                                'field' => 'check',
                                // 字段类型，input、select、checkbox、number
                                'type' => 'select',
                                //列宽 px
                                'width' => 180,
                                // 输入项属性
                                'props' => [
                                    // 提示文本
                                    'placeholder' => '请输入1',
                                    // type类型为select时有效，multiple=多选
                                    'mode' => 'multiple',
                                    // type类型为select时有效，最多显示选项的个数
                                    'maxTagCount' => 1,
                                    // type类型为select时有效，下拉选项数据
                                    'options' => [
                                        // 每个选项的标题与值，label=标题，value=值
                                        ['label' => '必填', 'value' => 'require', 'message' => '缺少必要参数{$item.field}'],
                                    ]
                                ],
                            ],
                            //...
                        ],
                        // 默认字段
                        'default_fields' => [
                            [
                                // 字段名
                                'field' => 'id',
                                // 字段注释
                                'desc' => '唯一id',
                                // 字段类型
                                'type' => 'int',
                                // 字段长度
                                'length' => 11,
                                // 默认值
                                'default' => '',
                                // 非Null
                                'not_null' => true,
                                // 主键
                                'main_key' => true,
                                // 自增
                                'incremental' => true,
                                //也可以添加自定义列的值
                                'query' => true,

                            ],
                            //...
                        ],
                        // 添加一行字段时，默认的值
                        'default_values' => [
                            //这里就是对应每列字段名=>值
                            'type' => 'varchar',
                            'length' => 255,
                            //...
                        ],
                    ],
                ]
            ]
        ],
    ]

];
 
```



