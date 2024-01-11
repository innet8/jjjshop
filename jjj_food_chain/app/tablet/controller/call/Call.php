<?php

namespace app\tablet\controller\call;

use app\common\model\store\Table;
use hg\apidoc\annotation as Apidoc;
use app\tablet\controller\Controller;
use app\common\model\call\Call as CallModel;

/**
 * 呼叫相关
 */
class Call extends Controller
{
    /**
     * @Apidoc\Title("呼叫")
     * @Apidoc\Tag("呼叫")
     * @Apidoc\Method("POST")
     * @Apidoc\Url("/index.php/tablet/call.call/call")
     * @Apidoc\Param("table_id", type="int", require=true, default="0", desc="卓位id")
     * @Apidoc\Param("call_type", type="int", require=true, default="1", desc="呼叫类型(1服务员,2收款)")
     * @Apidoc\Param("shop_supplier_id", type="int", require=true, default="0", desc="门店id")
     */
    public function call($table_id, $call_type, $shop_supplier_id)
    {
        $tableNo = Table::where('table_id', $table_id)->value('table_no');
        if (!$tableNo) {
            return $this->renderError('卓位不存在');
        }
        //
        (new CallModel)->makeCall($table_id, $tableNo, $call_type, 0, $shop_supplier_id);
        // 
        return $this->renderSuccess();
    }
}
