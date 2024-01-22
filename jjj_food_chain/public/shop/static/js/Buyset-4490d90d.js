import{o as e,p as l,f as a,e as o,q as t,r as m,m as d,n}from"./element-plus-b30a858e.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as r,c as u,a as i,X as _,T as f,S as p,P as b,W as c,Y as g,Q as y,a8 as V}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const h={class:"buy-set-content"},v={class:"common-form mt50"},$={class:"gray9"},j={class:"common-form mt50"},k={key:0,class:"gray9"},U={class:"percent-w100"},S={class:"d-s-c"},x={class:"ml10"},w={key:4,class:"common-form mt50"},q={class:"gray9"},T={key:0,style:{"padding-left":"10px"}},C={key:1,style:{"padding-left":"10px"}},z={key:2,style:{"padding-left":"10px"}};const G=s({data:()=>({unit:"%",grade_unit:"%"}),created(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.grade_unit="10"==e?"%":"元"}}},[["render",function(s,G,L,M,W,P){const Q=e,X=l,Y=a,A=o,B=t,D=m,E=d,F=n;return r(),u("div",h,[i("div",v,_(s.$t("其他设置")),1),40!=P.form.model.product_status?(r(),f(Y,{key:0,label:s.$t("商品状态："),rules:[{required:!0,message:s.$t("选择商品状态")}],prop:"model.product_status"},{default:p((()=>[b(X,{modelValue:P.form.model.product_status,"onUpdate:modelValue":G[0]||(G[0]=e=>P.form.model.product_status=e)},{default:p((()=>[b(Q,{label:10},{default:p((()=>[c(_(s.$t("上架")),1)])),_:1}),b(Q,{label:20},{default:p((()=>[c(_(s.$t("下架")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])):g("",!0),b(Y,{label:s.$t("初始销量：")},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.sales_initial,"onUpdate:modelValue":G[1]||(G[1]=e=>P.form.model.sales_initial=e),class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),b(Y,{label:s.$t("商品排序："),rules:[{required:!0,message:" "}],prop:"model.product_sort"},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.product_sort,"onUpdate:modelValue":G[2]||(G[2]=e=>P.form.model.product_sort=e),class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),b(Y,{label:s.$t("限购数量："),rules:[{required:!0,message:" "}],prop:"model.limit_num"},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.limit_num,"onUpdate:modelValue":G[3]||(G[3]=e=>P.form.model.limit_num=e),class:"max-w460"},null,8,["modelValue"]),i("div",$,_(s.$t("每个会员购买的最大数量，0为不限购")),1)])),_:1},8,["label"]),b(Y,{label:s.$t("打印标签："),prop:"model.label_id"},{default:p((()=>[b(D,{modelValue:P.form.model.label_id,"onUpdate:modelValue":G[4]||(G[4]=e=>P.form.model.label_id=e)},{default:p((()=>[b(B,{label:s.$t("无"),value:0},null,8,["label"]),(r(!0),u(y,null,V(P.form.labelList,(e=>(r(),f(B,{key:e.label_id,value:e.label_id,label:e.label_name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label"]),i("div",j,_(s.$t("会员折扣设置")),1),b(Y,{label:s.$t("是否开启会员折扣：")},{default:p((()=>[b(X,{modelValue:P.form.model.is_enable_grade,"onUpdate:modelValue":G[5]||(G[5]=e=>P.form.model.is_enable_grade=e)},{default:p((()=>[b(Q,{label:1},{default:p((()=>[c(_(s.$t("开启")),1)])),_:1}),b(Q,{label:0},{default:p((()=>[c(_(s.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==P.form.model.is_enable_grade?(r(),f(Y,{key:1,label:s.$t("会员折扣设置：")},{default:p((()=>[b(X,{modelValue:P.form.model.is_alone_grade,"onUpdate:modelValue":G[6]||(G[6]=e=>P.form.model.is_alone_grade=e)},{default:p((()=>[b(Q,{label:0},{default:p((()=>[c(_(s.$t("默认折扣")),1)])),_:1}),b(Q,{label:1},{default:p((()=>[c(_(s.$t("单独设置折扣")),1)])),_:1})])),_:1},8,["modelValue"]),0==P.form.model.is_alone_grade?(r(),u("div",k,_(s.$t("默认折扣：默认为用户所属会员等级的折扣率")),1)):g("",!0)])),_:1},8,["label"])):g("",!0),1==P.form.model.is_alone_grade&&1==P.form.model.is_enable_grade?(r(),f(Y,{key:2,label:s.$t("折扣佣金类型：")},{default:p((()=>[b(X,{modelValue:P.form.model.alone_grade_type,"onUpdate:modelValue":G[7]||(G[7]=e=>P.form.model.alone_grade_type=e),onChange:P.changeGradeType},{default:p((()=>[b(Q,{label:10},{default:p((()=>[c(_(s.$t("百分比")),1)])),_:1}),b(Q,{label:20},{default:p((()=>[c(_(s.$t("固定金额")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"])):g("",!0),1==P.form.model.is_alone_grade&&1==P.form.model.is_enable_grade?(r(),f(Y,{key:3,label:""},{default:p((()=>[i("div",U,[b(F,{data:P.form.gradeList,border:"",size:"",style:{width:"100%"}},{default:p((()=>[b(E,{prop:"name",label:"会员等级"}),b(E,{prop:"name",label:"折扣"},{default:p((e=>[i("div",S,[b(A,{modelValue:e.row.product_equity,"onUpdate:modelValue":l=>e.row.product_equity=l,type:"number",placeholder:"请输入折扣"},null,8,["modelValue","onUpdate:modelValue"]),i("span",x,_(W.grade_unit),1)])])),_:1})])),_:1},8,["data"])])])),_:1})):g("",!0),1==P.form.basicSetting.is_open?(r(),u("div",w,"分销设置")):g("",!0),1==P.form.basicSetting.is_open?(r(),f(Y,{key:5,label:"是否开启分销："},{default:p((()=>[b(X,{modelValue:P.form.model.is_agent,"onUpdate:modelValue":G[8]||(G[8]=e=>P.form.model.is_agent=e)},{default:p((()=>[b(Q,{label:1},{default:p((()=>[c("开启")])),_:1}),b(Q,{label:0},{default:p((()=>[c("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1})):g("",!0),1===P.form.model.is_agent?(r(),u(y,{key:6},[1==P.form.basicSetting.is_open?(r(),f(Y,{key:0,label:"分销规则："},{default:p((()=>[b(X,{modelValue:P.form.model.is_ind_agent,"onUpdate:modelValue":G[9]||(G[9]=e=>P.form.model.is_ind_agent=e)},{default:p((()=>[b(Q,{label:0},{default:p((()=>[c("平台规则")])),_:1}),b(Q,{label:1},{default:p((()=>[c("单独规则")])),_:1})])),_:1},8,["modelValue"]),i("div",q,[c("平台规则：层级("+_(P.form.basicSetting.level)+"级) ",1),P.form.basicSetting.level>=1?(r(),u("span",T,"1级佣金("+_(P.form.agentSetting.first_money)+"%)",1)):g("",!0),P.form.basicSetting.level>=2?(r(),u("span",C,"2级佣金("+_(P.form.agentSetting.second_money)+"%)",1)):g("",!0),P.form.basicSetting.level>=3?(r(),u("span",z,"3级佣金("+_(P.form.agentSetting.third_money)+"%)",1)):g("",!0)])])),_:1})):g("",!0),1===P.form.model.is_ind_agent&&1==P.form.basicSetting.is_open?(r(),u(y,{key:1},[b(Y,{label:"分销佣金类型："},{default:p((()=>[b(X,{modelValue:P.form.model.agent_money_type,"onUpdate:modelValue":G[10]||(G[10]=e=>P.form.model.agent_money_type=e),onChange:P.changeMoneyType},{default:p((()=>[b(Q,{label:10},{default:p((()=>[c("百分比")])),_:1}),b(Q,{label:20},{default:p((()=>[c("固定金额")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1}),b(Y,{label:"单独分销设置："},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.first_money,"onUpdate:modelValue":G[11]||(G[11]=e=>P.form.model.first_money=e),class:"max-w460"},{prepend:p((()=>[c(" 一级佣金： ")])),append:p((()=>[c(_(W.unit),1)])),_:1},8,["modelValue"])])),_:1}),P.form.basicSetting.level>=2?(r(),f(Y,{key:0},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.second_money,"onUpdate:modelValue":G[12]||(G[12]=e=>P.form.model.second_money=e),class:"max-w460"},{prepend:p((()=>[c(" 二级佣金： ")])),append:p((()=>[c(_(W.unit),1)])),_:1},8,["modelValue"])])),_:1})):g("",!0),P.form.basicSetting.level>=3?(r(),f(Y,{key:1},{default:p((()=>[b(A,{type:"number",min:"0",modelValue:P.form.model.third_money,"onUpdate:modelValue":G[13]||(G[13]=e=>P.form.model.third_money=e),class:"max-w460"},{prepend:p((()=>[c(" 三级佣金： ")])),append:p((()=>[c(_(W.unit),1)])),_:1},8,["modelValue"])])),_:1})):g("",!0)],64)):g("",!0)],64)):g("",!0)])}]]);export{G as default};
