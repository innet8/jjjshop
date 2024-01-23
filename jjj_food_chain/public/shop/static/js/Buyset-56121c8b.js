import{o as e,p as l,h as a,O as o,q as t,r as m,m as d,n as r,g as s}from"./element-plus-d03e850c.js";import{u as n}from"./index-c7b80162.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,c as _,a as p,X as f,T as c,S as b,P as g,W as y,Y as V,Q as h,a8 as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{currency:v}=n(),$={class:"buy-set-content"},k={class:"common-form mt50"},x={class:"gray9"},U={class:"common-form mt50"},S={key:0,class:"gray9"},w={key:1,class:"gray9"},q={class:"percent-w50"},C={class:"d-s-c"},T={class:"ml10"},L={key:4,class:"common-form mt50"},z={class:"gray9"},G={key:0,style:{"padding-left":"10px"}},M={key:1,style:{"padding-left":"10px"}},W={key:2,style:{"padding-left":"10px"}};const A=i({data:()=>({unit:"%",grade_unit:"%",currency:v}),created(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.form.gradeList.map(((e,l)=>{this.form.gradeList[l].product_equity=null})),this.grade_unit="10"==e?"%":"元"}}},[["render",function(n,i,v,A,B,I){const O=e,P=l,Q=a,X=o,Y=t,D=m,E=d,F=r,H=s;return u(),_("div",$,[p("div",k,f(n.$t("其他设置")),1),40!=I.form.model.product_status?(u(),c(Q,{key:0,label:n.$t("商品状态："),rules:[{required:!0,message:n.$t("选择商品状态")}],prop:"model.product_status"},{default:b((()=>[g(P,{modelValue:I.form.model.product_status,"onUpdate:modelValue":i[0]||(i[0]=e=>I.form.model.product_status=e)},{default:b((()=>[g(O,{label:10},{default:b((()=>[y(f(n.$t("上架")),1)])),_:1}),g(O,{label:20},{default:b((()=>[y(f(n.$t("下架")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])):V("",!0),g(Q,{label:n.$t("商品排序："),rules:[{required:!0,message:n.$t("请输入商品排序")}],prop:"model.product_sort"},{default:b((()=>[g(X,{controls:!1,min:0,max:999,placeholder:n.$t("接近0，排序等级越高"),modelValue:I.form.model.product_sort,"onUpdate:modelValue":i[1]||(i[1]=e=>I.form.model.product_sort=e),class:"max-w460"},null,8,["placeholder","modelValue"])])),_:1},8,["label","rules"]),g(Q,{label:n.$t("限购数量："),rules:[{required:!0,message:n.$t("请输入限购数量")}],prop:"model.limit_num"},{default:b((()=>[g(X,{controls:!1,min:0,modelValue:I.form.model.limit_num,"onUpdate:modelValue":i[2]||(i[2]=e=>I.form.model.limit_num=e),class:"max-w460"},null,8,["modelValue"]),p("div",x,f(n.$t("每单/每桌购买的最大数量，0为不限购")),1)])),_:1},8,["label","rules"]),g(Q,{label:n.$t("打印标签："),prop:"model.label_id"},{default:b((()=>[g(D,{modelValue:I.form.model.label_id,"onUpdate:modelValue":i[3]||(i[3]=e=>I.form.model.label_id=e)},{default:b((()=>[g(Y,{label:n.$t("无"),value:0},null,8,["label"]),(u(!0),_(h,null,j(I.form.labelList,(e=>(u(),c(Y,{key:e.label_id,value:e.label_id,label:e.label_name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label"]),p("div",U,f(n.$t("会员折扣设置")),1),g(Q,{label:n.$t("是否开启会员折扣：")},{default:b((()=>[g(P,{modelValue:I.form.model.is_enable_grade,"onUpdate:modelValue":i[4]||(i[4]=e=>I.form.model.is_enable_grade=e)},{default:b((()=>[g(O,{label:1},{default:b((()=>[y(f(n.$t("开启")),1)])),_:1}),g(O,{label:0},{default:b((()=>[y(f(n.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==I.form.model.is_enable_grade?(u(),c(Q,{key:1,label:n.$t("会员折扣设置：")},{default:b((()=>[g(P,{modelValue:I.form.model.is_alone_grade,"onUpdate:modelValue":i[5]||(i[5]=e=>I.form.model.is_alone_grade=e)},{default:b((()=>[g(O,{label:0},{default:b((()=>[y(f(n.$t("默认折扣")),1)])),_:1}),g(O,{label:1},{default:b((()=>[y(f(n.$t("仅需支付")),1)])),_:1})])),_:1},8,["modelValue"]),0==I.form.model.is_alone_grade?(u(),_("div",S,f(n.$t("默认折扣：默认为用户所属会员等级的折扣率")),1)):V("",!0),1==I.form.model.is_alone_grade?(u(),_("div",w,f(n.$t("仅需支付：用户购买此商品仅需支付的金额或比例")),1)):V("",!0)])),_:1},8,["label"])):V("",!0),1==I.form.model.is_alone_grade&&1==I.form.model.is_enable_grade?(u(),c(Q,{key:2,label:n.$t("折扣佣金类型：")},{default:b((()=>[g(P,{modelValue:I.form.model.alone_grade_type,"onUpdate:modelValue":i[6]||(i[6]=e=>I.form.model.alone_grade_type=e),onChange:I.changeGradeType},{default:b((()=>[g(O,{label:10},{default:b((()=>[y(f(n.$t("百分比")),1)])),_:1}),g(O,{label:20},{default:b((()=>[y(f(n.$t("固定金额")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"])):V("",!0),1==I.form.model.is_alone_grade&&1==I.form.model.is_enable_grade?(u(),c(Q,{key:3,label:""},{default:b((()=>[p("div",q,[g(F,{data:I.form.gradeList,border:"",size:""},{default:b((()=>[g(E,{prop:"name",label:n.$t("会员等级")},null,8,["label"]),g(E,{prop:"name",label:n.$t("折扣")},{default:b((e=>[p("div",C,[g(X,{modelValue:e.row.product_equity,"onUpdate:modelValue":l=>e.row.product_equity=l,min:10==I.form.model.alone_grade_type?1:0,max:10==I.form.model.alone_grade_type?100:1/0,controls:!1,placeholder:n.$t("请输入折扣")},null,8,["modelValue","onUpdate:modelValue","min","max","placeholder"]),p("span",T,f(10==I.form.model.alone_grade_type?B.grade_unit:B.currency.unit),1)])])),_:1},8,["label"])])),_:1},8,["data"])])])),_:1})):V("",!0),1==I.form.basicSetting.is_open?(u(),_("div",L,"分销设置")):V("",!0),1==I.form.basicSetting.is_open?(u(),c(Q,{key:5,label:"是否开启分销："},{default:b((()=>[g(P,{modelValue:I.form.model.is_agent,"onUpdate:modelValue":i[7]||(i[7]=e=>I.form.model.is_agent=e)},{default:b((()=>[g(O,{label:1},{default:b((()=>[y("开启")])),_:1}),g(O,{label:0},{default:b((()=>[y("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1})):V("",!0),1===I.form.model.is_agent?(u(),_(h,{key:6},[1==I.form.basicSetting.is_open?(u(),c(Q,{key:0,label:"分销规则："},{default:b((()=>[g(P,{modelValue:I.form.model.is_ind_agent,"onUpdate:modelValue":i[8]||(i[8]=e=>I.form.model.is_ind_agent=e)},{default:b((()=>[g(O,{label:0},{default:b((()=>[y("平台规则")])),_:1}),g(O,{label:1},{default:b((()=>[y("单独规则")])),_:1})])),_:1},8,["modelValue"]),p("div",z,[y("平台规则：层级("+f(I.form.basicSetting.level)+"级) ",1),I.form.basicSetting.level>=1?(u(),_("span",G,"1级佣金("+f(I.form.agentSetting.first_money)+"%)",1)):V("",!0),I.form.basicSetting.level>=2?(u(),_("span",M,"2级佣金("+f(I.form.agentSetting.second_money)+"%)",1)):V("",!0),I.form.basicSetting.level>=3?(u(),_("span",W,"3级佣金("+f(I.form.agentSetting.third_money)+"%)",1)):V("",!0)])])),_:1})):V("",!0),1===I.form.model.is_ind_agent&&1==I.form.basicSetting.is_open?(u(),_(h,{key:1},[g(Q,{label:"分销佣金类型："},{default:b((()=>[g(P,{modelValue:I.form.model.agent_money_type,"onUpdate:modelValue":i[9]||(i[9]=e=>I.form.model.agent_money_type=e),onChange:I.changeMoneyType},{default:b((()=>[g(O,{label:10},{default:b((()=>[y("百分比")])),_:1}),g(O,{label:20},{default:b((()=>[y("固定金额")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1}),g(Q,{label:"单独分销设置："},{default:b((()=>[g(H,{type:"number",min:"0",modelValue:I.form.model.first_money,"onUpdate:modelValue":i[10]||(i[10]=e=>I.form.model.first_money=e),class:"max-w460"},{prepend:b((()=>[y(" 一级佣金： ")])),append:b((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1}),I.form.basicSetting.level>=2?(u(),c(Q,{key:0},{default:b((()=>[g(H,{type:"number",min:"0",modelValue:I.form.model.second_money,"onUpdate:modelValue":i[11]||(i[11]=e=>I.form.model.second_money=e),class:"max-w460"},{prepend:b((()=>[y(" 二级佣金： ")])),append:b((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0),I.form.basicSetting.level>=3?(u(),c(Q,{key:1},{default:b((()=>[g(H,{type:"number",min:"0",modelValue:I.form.model.third_money,"onUpdate:modelValue":i[12]||(i[12]=e=>I.form.model.third_money=e),class:"max-w460"},{prepend:b((()=>[y(" 三级佣金： ")])),append:b((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0)],64)):V("",!0)],64)):V("",!0)])}],["__scopeId","data-v-0e62c1f7"]]);export{A as default};
