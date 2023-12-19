<?php
// 事件定义文件
return [
    'listen' => [
        'AppInit' => [],
        'HttpRun' => [],
        'HttpEnd' => [],
        'LogLevel' => [],
        'LogWrite' => [],
        'PaySuccess' => [
            \app\api\event\PaySuccess::class
        ],
        'CashierPaySuccess' => [
            \app\cashier\event\PaySuccess::class
        ],
        /*用户等级*/
        'UserGrade' => [
            \app\job\event\UserGrade::class
        ],
        /*任务调度*/
        'JobScheduler' => [
            \app\job\event\JobScheduler::class
        ],
        /*订单事件*/
        'Order' => [
            \app\job\event\Order::class
        ],
        /*领取优惠券事件*/
        'UserCoupon' => [
            \app\job\event\UserCoupon::class
        ],
        /*生日有礼事件*/
        'User' => [
            \app\job\event\User::class
        ],
        /*邀请送好礼*/
        'Invitation' => [
            \app\job\event\Invitation::class
        ],
        /*分销商订单*/
        'AgentOrder' => [
            \app\job\event\AgentOrder::class
        ],
        /*配送员订单*/
        'DriverOrder' => [
            \app\job\event\DriverOrder::class
        ],
        /*团购订单*/
        'GroupOrder' => [
            \app\job\event\GroupOrder::class
        ],
        /*微信小程序直播*/
        'Live' => [
            \app\job\event\Live::class
        ],
        /*微信小程序直播商品*/
        'LiveProduct' => [
            \app\job\event\LiveProduct::class
        ],
    ],

    'subscribe' => [
    ],
];
