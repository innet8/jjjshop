<?php
namespace app;

use hg\apidoc\annotation\Param;
use hg\apidoc\annotation\Returned;
use hg\apidoc\annotation\Header;

/**
 * NotParse
 */
class Definitions
{
    /**
     * 获取分页数据列表的参数
     * @param("page",type="int",require=true,default="1",desc="查询页数")
     * @param("list_rows",type="int",require=true,default="10",desc="查询条数")
     * @returned("total",type="int",desc="总条数")
     * @returned("per_page",type="int",desc="每页多少条")
     * @returned("current_page",type="int",desc="当面页码")
     * @returned("last_page",type="int",desc="最后一页")
     */
    public function pageParam(){}

    /**
     * 返回字典数据
     * @returned("id",type="int",desc="唯一id")
     * @returned("name",type="string",desc="字典名")
     * @returned("value",type="string",desc="字典值")
     */
    public function dictionary(){}

    /**
     * 获取一条数据明细
     * @param("id",type="int",require=true,desc="唯一id")
     */
    public function getInfo(){}

    /**
     * @header("token",type="string",require=true,desc="身份票据")
     */
    public function auth(){}
	
}