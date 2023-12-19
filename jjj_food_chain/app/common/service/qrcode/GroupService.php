<?php

namespace app\common\service\qrcode;

use Endroid\QrCode\QrCode;
use Grafika\Color;
use Grafika\Grafika;

/**
 * 团购二维码
 */
class GroupService extends Base
{
    // 用户信息
    private $order;
    // 来源
    private $source;

    /**
     * 构造方法
     */
    public function __construct($order, $source)
    {
        parent::__construct();
        // 用户信息
        $this->order = $order;
        $this->source = $source;
    }

    /**
     * 获取团购二维码
     */
    public function getImage()
    {
        // 小程序id
        $appId = $this->order['app_id'];
        $qrcode = '';
        if ($this->source == 'wx') {
            // 3. 下载小程序码
            $scene = 'oid:' . $this->order['order_id'];
            $qrcode = $this->saveGroupQrcode($appId, $scene, 'pages/order/group/receipt');
        } else if ($this->source == 'mp' || $this->source == 'h5') {
            $scene = 'oid:' . $this->order['order_id'];
            $qrcode = new QrCode(base_url() . 'h5/pages/order/group/receipt?oid=' . $this->order['order_id'] . '&app_id=' . $appId);
            $qrcode = $this->saveGroupMpQrcode($qrcode, $appId, $scene, 'mp');
        }
        // 4. 拼接海报图
        return base_url() . $qrcode;
    }


}