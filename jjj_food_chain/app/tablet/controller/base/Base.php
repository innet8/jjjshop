<?php

namespace app\tablet\controller\base;

use app\common\model\store\Table;
use hg\apidoc\annotation as Apidoc;
use app\tablet\controller\Controller;
use app\common\model\call\Call as CallModel;

/**
 * 基础
 */
class Base extends Controller
{
    /**
     * @Apidoc\Title("基础信息")
     * @Apidoc\Desc("基础信息")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/tablet/base.base/getInfo")
     * @Apidoc\Param("table_id", type="int", require=true, default="0", desc="卓位id")
     * @Apidoc\Param("call_type", type="int", require=true, default="1", desc="呼叫类型(1服务员,2收款)")
     * @Apidoc\Param("shop_supplier_id", type="int", require=true, default="0", desc="门店id")
     */
    public function getInfo()
    {

        $list = [
            'shop_supplier_id' => 10001
        ];
        // 
        return $this->renderSuccess('基础信息', $list);
    }
}
