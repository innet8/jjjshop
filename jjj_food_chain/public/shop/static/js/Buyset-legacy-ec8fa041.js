System.register(["./element-plus-legacy-895ffe04.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-6076f203.js","./@vueuse-legacy-85324d63.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-d0a3b32c.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(e,l){"use strict";var n,t,o,a,u,r,d,m,i,f,s,c,_,p,g,y,b,V,h,v;return{setters:[function(e){n=e.o,t=e.p,o=e.f,a=e.e,u=e.q,r=e.r,d=e.m,m=e.n},function(e){i=e._},function(e){f=e.o,s=e.c,c=e.a,_=e.X,p=e.T,g=e.S,y=e.P,b=e.W,V=e.Y,h=e.Q,v=e.a8},null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"buy-set-content"},$={class:"common-form mt50"},j={class:"gray9"},k={class:"common-form mt50"},U={key:0,class:"gray9"},S={class:"percent-w100"},x={class:"d-s-c"},w={class:"ml10"},q={key:4,class:"common-form mt50"},T={class:"gray9"},C={key:0,style:{"padding-left":"10px"}},z={key:1,style:{"padding-left":"10px"}},G={key:2,style:{"padding-left":"10px"}};e("default",i({data:function(){return{unit:"%",grade_unit:"%"}},created:function(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.grade_unit="10"==e?"%":"元"}}},[["render",function(e,i,L,M,W,P){var Q=n,X=t,Y=o,A=a,B=u,D=r,E=d,F=m;return f(),s("div",l,[c("div",$,_(e.$t("其他设置")),1),40!=P.form.model.product_status?(f(),p(Y,{key:0,label:e.$t("商品状态："),rules:[{required:!0,message:e.$t("选择商品状态")}],prop:"model.product_status"},{default:g((function(){return[y(X,{modelValue:P.form.model.product_status,"onUpdate:modelValue":i[0]||(i[0]=function(e){return P.form.model.product_status=e})},{default:g((function(){return[y(Q,{label:10},{default:g((function(){return[b(_(e.$t("上架")),1)]})),_:1}),y(Q,{label:20},{default:g((function(){return[b(_(e.$t("下架")),1)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["label","rules"])):V("",!0),y(Y,{label:e.$t("初始销量：")},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.sales_initial,"onUpdate:modelValue":i[1]||(i[1]=function(e){return P.form.model.sales_initial=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1},8,["label"]),y(Y,{label:e.$t("商品排序："),rules:[{required:!0,message:" "}],prop:"model.product_sort"},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.product_sort,"onUpdate:modelValue":i[2]||(i[2]=function(e){return P.form.model.product_sort=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1},8,["label"]),y(Y,{label:e.$t("限购数量："),rules:[{required:!0,message:" "}],prop:"model.limit_num"},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.limit_num,"onUpdate:modelValue":i[3]||(i[3]=function(e){return P.form.model.limit_num=e}),class:"max-w460"},null,8,["modelValue"]),c("div",j,_(e.$t("每个会员购买的最大数量，0为不限购")),1)]})),_:1},8,["label"]),y(Y,{label:e.$t("打印标签："),prop:"model.label_id"},{default:g((function(){return[y(D,{modelValue:P.form.model.label_id,"onUpdate:modelValue":i[4]||(i[4]=function(e){return P.form.model.label_id=e})},{default:g((function(){return[y(B,{label:e.$t("无"),value:0},null,8,["label"]),(f(!0),s(h,null,v(P.form.labelList,(function(e){return f(),p(B,{key:e.label_id,value:e.label_id,label:e.label_name_text},null,8,["value","label"])})),128))]})),_:1},8,["modelValue"])]})),_:1},8,["label"]),c("div",k,_(e.$t("会员折扣设置")),1),y(Y,{label:e.$t("是否开启会员折扣：")},{default:g((function(){return[y(X,{modelValue:P.form.model.is_enable_grade,"onUpdate:modelValue":i[5]||(i[5]=function(e){return P.form.model.is_enable_grade=e})},{default:g((function(){return[y(Q,{label:1},{default:g((function(){return[b(_(e.$t("开启")),1)]})),_:1}),y(Q,{label:0},{default:g((function(){return[b(_(e.$t("关闭")),1)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["label"]),1==P.form.model.is_enable_grade?(f(),p(Y,{key:1,label:e.$t("会员折扣设置：")},{default:g((function(){return[y(X,{modelValue:P.form.model.is_alone_grade,"onUpdate:modelValue":i[6]||(i[6]=function(e){return P.form.model.is_alone_grade=e})},{default:g((function(){return[y(Q,{label:0},{default:g((function(){return[b(_(e.$t("默认折扣")),1)]})),_:1}),y(Q,{label:1},{default:g((function(){return[b(_(e.$t("单独设置折扣")),1)]})),_:1})]})),_:1},8,["modelValue"]),0==P.form.model.is_alone_grade?(f(),s("div",U,_(e.$t("默认折扣：默认为用户所属会员等级的折扣率")),1)):V("",!0)]})),_:1},8,["label"])):V("",!0),1==P.form.model.is_alone_grade&&1==P.form.model.is_enable_grade?(f(),p(Y,{key:2,label:e.$t("折扣佣金类型：")},{default:g((function(){return[y(X,{modelValue:P.form.model.alone_grade_type,"onUpdate:modelValue":i[7]||(i[7]=function(e){return P.form.model.alone_grade_type=e}),onChange:P.changeGradeType},{default:g((function(){return[y(Q,{label:10},{default:g((function(){return[b(_(e.$t("百分比")),1)]})),_:1}),y(Q,{label:20},{default:g((function(){return[b(_(e.$t("固定金额")),1)]})),_:1})]})),_:1},8,["modelValue","onChange"])]})),_:1},8,["label"])):V("",!0),1==P.form.model.is_alone_grade&&1==P.form.model.is_enable_grade?(f(),p(Y,{key:3,label:""},{default:g((function(){return[c("div",S,[y(F,{data:P.form.gradeList,border:"",size:"",style:{width:"100%"}},{default:g((function(){return[y(E,{prop:"name",label:"会员等级"}),y(E,{prop:"name",label:"折扣"},{default:g((function(e){return[c("div",x,[y(A,{modelValue:e.row.product_equity,"onUpdate:modelValue":function(l){return e.row.product_equity=l},type:"number",placeholder:"请输入折扣"},null,8,["modelValue","onUpdate:modelValue"]),c("span",w,_(W.grade_unit),1)])]})),_:1})]})),_:1},8,["data"])])]})),_:1})):V("",!0),1==P.form.basicSetting.is_open?(f(),s("div",q,"分销设置")):V("",!0),1==P.form.basicSetting.is_open?(f(),p(Y,{key:5,label:"是否开启分销："},{default:g((function(){return[y(X,{modelValue:P.form.model.is_agent,"onUpdate:modelValue":i[8]||(i[8]=function(e){return P.form.model.is_agent=e})},{default:g((function(){return[y(Q,{label:1},{default:g((function(){return[b("开启")]})),_:1}),y(Q,{label:0},{default:g((function(){return[b("关闭")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1})):V("",!0),1===P.form.model.is_agent?(f(),s(h,{key:6},[1==P.form.basicSetting.is_open?(f(),p(Y,{key:0,label:"分销规则："},{default:g((function(){return[y(X,{modelValue:P.form.model.is_ind_agent,"onUpdate:modelValue":i[9]||(i[9]=function(e){return P.form.model.is_ind_agent=e})},{default:g((function(){return[y(Q,{label:0},{default:g((function(){return[b("平台规则")]})),_:1}),y(Q,{label:1},{default:g((function(){return[b("单独规则")]})),_:1})]})),_:1},8,["modelValue"]),c("div",T,[b("平台规则：层级("+_(P.form.basicSetting.level)+"级) ",1),P.form.basicSetting.level>=1?(f(),s("span",C,"1级佣金("+_(P.form.agentSetting.first_money)+"%)",1)):V("",!0),P.form.basicSetting.level>=2?(f(),s("span",z,"2级佣金("+_(P.form.agentSetting.second_money)+"%)",1)):V("",!0),P.form.basicSetting.level>=3?(f(),s("span",G,"3级佣金("+_(P.form.agentSetting.third_money)+"%)",1)):V("",!0)])]})),_:1})):V("",!0),1===P.form.model.is_ind_agent&&1==P.form.basicSetting.is_open?(f(),s(h,{key:1},[y(Y,{label:"分销佣金类型："},{default:g((function(){return[y(X,{modelValue:P.form.model.agent_money_type,"onUpdate:modelValue":i[10]||(i[10]=function(e){return P.form.model.agent_money_type=e}),onChange:P.changeMoneyType},{default:g((function(){return[y(Q,{label:10},{default:g((function(){return[b("百分比")]})),_:1}),y(Q,{label:20},{default:g((function(){return[b("固定金额")]})),_:1})]})),_:1},8,["modelValue","onChange"])]})),_:1}),y(Y,{label:"单独分销设置："},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.first_money,"onUpdate:modelValue":i[11]||(i[11]=function(e){return P.form.model.first_money=e}),class:"max-w460"},{prepend:g((function(){return[b(" 一级佣金： ")]})),append:g((function(){return[b(_(W.unit),1)]})),_:1},8,["modelValue"])]})),_:1}),P.form.basicSetting.level>=2?(f(),p(Y,{key:0},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.second_money,"onUpdate:modelValue":i[12]||(i[12]=function(e){return P.form.model.second_money=e}),class:"max-w460"},{prepend:g((function(){return[b(" 二级佣金： ")]})),append:g((function(){return[b(_(W.unit),1)]})),_:1},8,["modelValue"])]})),_:1})):V("",!0),P.form.basicSetting.level>=3?(f(),p(Y,{key:1},{default:g((function(){return[y(A,{type:"number",min:"0",modelValue:P.form.model.third_money,"onUpdate:modelValue":i[13]||(i[13]=function(e){return P.form.model.third_money=e}),class:"max-w460"},{prepend:g((function(){return[b(" 三级佣金： ")]})),append:g((function(){return[b(_(W.unit),1)]})),_:1},8,["modelValue"])]})),_:1})):V("",!0)],64)):V("",!0)],64)):V("",!0)])}]]))}}}));
