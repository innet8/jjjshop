<br>
<br>

**[官方文档](https://hgthecode.github.io/thinkphp-apidoc/use/notes/controller)**

<br>

**控制器注释**
```
<?php

    /**
    * 管理
    * @Apidoc\Group("buss")
    * @Apidoc\Sort(1)
    * NotParse 不需要解析Api文档的控制器
    */
    class ApiDocTest
    { 
        /**
        * @Apidoc\Title("接口标题")
        * @Apidoc\Desc("接口描述")
        * @Apidoc\Url("/admin/baseDemo/completeParams")
        * @Apidoc\Method("GET")
        * @Apidoc\Author("接口的作者")
        * @Apidoc\Tag("接口的标签")
        * @Apidoc\Param("username", type="abc",require=true,default="1",desc="用户名")
        * @Apidoc\Param(ref="app\admin\services\ApiDoc\getInfoById")
        * @Apidoc\Param("info",type="object",desc="信息",
        *     @Apidoc\Param ("name",type="string",desc="姓名"),
        *     @Apidoc\Param ("sex",type="string",desc="性别"),
        *     @Apidoc\Param ("group",type="object",desc="所属组",
        *          @Apidoc\Param ("group_name",type="string",desc="组名"),
        *          @Apidoc\Param ("group_id",type="int",desc="组id"),
        *          @Apidoc\Param ("data",type="object",ref="app\admin\services\getUserList",desc="")
        *     )
        * )
        * @Apidoc\Returned("id", type="int", desc="用户id")
        * @Apidoc\Returned("info",type="object",desc="信息",
        *     @Apidoc\Returned ("name",type="string",desc="姓名"),
        *     @Apidoc\Returned ("sex",type="string",desc="性别"),
        *     @Apidoc\Returned ("group",type="object",desc="所属组",
        *          @Apidoc\Returned ("group_name",type="string",desc="组名"),
        *          @Apidoc\Returned ("group_id",type="int",desc="组id"),
        *     )
        * )
        */
        public function test(){
        //...
        }

        /**
        * @Apidoc\Title("引入逻辑层注释")
        * @Apidoc\Desc("引入业务逻辑层（其它分成）的注解参数")
        * @Apidoc\Url("/admin/refDemo/service")
        * @Apidoc\Method("GET")
        * @Apidoc\Param(ref="app\admin\services\ApiDoc\getUserInfo")
        * @Apidoc\Returned(ref="\app\admin\services\ApiDoc\info")
        */
        public function service(){
            //...
        }

        /**
        * @Apidoc\Title("引入模型注释")
        * @Apidoc\Desc("param参数为直接引用模型数据表参数")
        * @Apidoc\Author("HG")
        * @Apidoc\Url("/v1/baseDemo/model")
        * @Apidoc\Method("GET")
        * @Apidoc\Param(ref="app\model\User\getInfoById")
        * @Apidoc\Returned("userList",type="array",ref="app\model\User\getInfo")
        */
        public function model(){
        //...
        }
    }
```


**逻辑层注释**
```
 <?php
    namespace app\services;

    class ApiDoc
    {
        /**
        * @Apidoc\Param("sex", type="int",require=true,desc="性别")
        * @Apidoc\Param("age", type="int",require=true,desc="年龄")
        * @Apidoc\Param("id", type="int",require=true,desc="唯一id")
        * @Apidoc\Returned("id", type="int",desc="唯一id")
        * @Apidoc\Returned("name", type="string",desc="姓名")
        * @Apidoc\Returned("phone", type="string",desc="电话")
        */
        public function getUserInfo(){}
    }
```

**模型层注释**
```
<?php
    namespace app\model;

    class User extends BaseModel
    {
        /**
        * @Apidoc\Field("id,username,nickname,role")
        * @Apidoc\AddField("openid",type="string",default="abc",desc="微信openid")
        * @Apidoc\AddField("senkey",type="string",default="key",desc="微信key")
        * @Apidoc\AddField("role",type="array",desc="重写role，该定义会覆盖数据表中的字段描述",
        *     @Apidoc\Param ("name",type="string",desc="名称"),
        *     @PApidoc\aram ("id",type="string",desc="id"),
        * )
        */
        public function getInfo($id){
            $res = $this->get($id);
            return $res;
        }
    }   
```



