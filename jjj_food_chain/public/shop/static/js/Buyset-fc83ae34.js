import{o as e,p as l,h as a,D as o,q as t,r as m,m as d,n as r,g as s}from"./element-plus-b01b3a31.js";import{u as n}from"./index-92c16cbb.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,c as p,a as _,X as f,T as c,S as g,P as b,W as y,Y as V,Q as h,a8 as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{currency:v}=n(),$={class:"buy-set-content"},k={class:"common-form mt50"},x={class:"gray9"},U={class:"common-form mt50"},S={key:0,class:"gray9"},w={key:1,class:"gray9"},q={class:"percent-w50"},C={class:"d-s-c"},T={class:"ml10"},L={key:4,class:"common-form mt50"},P={class:"gray9"},M={key:0,style:{"padding-left":"10px"}},z={key:1,style:{"padding-left":"10px"}},G={key:2,style:{"padding-left":"10px"}};const X=i({data:()=>({unit:"%",grade_unit:"%",currency:v,minPrice:0}),created(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],watch:{form:{handler(e){let l=[];e.model.sku.map((e=>{l.push(e.product_price)})),this.minPrice=Math.min(...l)},immediate:!0,deep:!0}},methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.form.gradeList.map(((e,l)=>{this.form.gradeList[l].product_equity=null})),this.grade_unit="10"==e?"%":"元"}}},[["render",function(n,i,v,X,A,B){const D=e,I=l,Q=a,W=o,Y=t,E=m,F=d,H=r,J=s;return u(),p("div",$,[_("div",k,f(n.$t("其他设置")),1),40!=B.form.model.product_status?(u(),c(Q,{key:0,label:n.$t("商品状态："),rules:[{required:!0,message:n.$t("选择商品状态")}],prop:"model.product_status"},{default:g((()=>[b(I,{modelValue:B.form.model.product_status,"onUpdate:modelValue":i[0]||(i[0]=e=>B.form.model.product_status=e)},{default:g((()=>[b(D,{label:10},{default:g((()=>[y(f(n.$t("上架")),1)])),_:1}),b(D,{label:20},{default:g((()=>[y(f(n.$t("下架")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])):V("",!0),b(Q,{label:n.$t("商品排序："),rules:[{required:!0,message:n.$t("请输入商品排序")}],prop:"model.product_sort"},{default:g((()=>[b(W,{controls:!1,min:0,max:999,placeholder:n.$t("接近0，排序等级越高"),modelValue:B.form.model.product_sort,"onUpdate:modelValue":i[1]||(i[1]=e=>B.form.model.product_sort=e),class:"max-w460"},null,8,["placeholder","modelValue"])])),_:1},8,["label","rules"]),b(Q,{label:n.$t("限购数量："),rules:[{required:!0,message:n.$t("请输入限购数量")}],prop:"model.limit_num"},{default:g((()=>[b(W,{controls:!1,min:0,max:999,modelValue:B.form.model.limit_num,"onUpdate:modelValue":i[2]||(i[2]=e=>B.form.model.limit_num=e),class:"max-w460"},null,8,["modelValue"]),_("div",x,f(n.$t("每单/每桌购买的最大数量，0为不限购")),1)])),_:1},8,["label","rules"]),b(Q,{label:n.$t("打印标签："),prop:"model.label_id",rules:[{required:!0,message:n.$t("请选择打印标签")}]},{default:g((()=>[b(E,{modelValue:B.form.model.label_id,"onUpdate:modelValue":i[3]||(i[3]=e=>B.form.model.label_id=e)},{default:g((()=>[(u(!0),p(h,null,j(B.form.labelList,(e=>(u(),c(Y,{key:e.label_id,value:e.label_id,label:e.label_name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),_("div",U,f(n.$t("会员折扣设置")),1),b(Q,{label:n.$t("是否开启会员折扣：")},{default:g((()=>[b(I,{modelValue:B.form.model.is_enable_grade,"onUpdate:modelValue":i[4]||(i[4]=e=>B.form.model.is_enable_grade=e)},{default:g((()=>[b(D,{label:1},{default:g((()=>[y(f(n.$t("开启")),1)])),_:1}),b(D,{label:0},{default:g((()=>[y(f(n.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==B.form.model.is_enable_grade?(u(),c(Q,{key:1,label:n.$t("会员折扣设置：")},{default:g((()=>[b(I,{modelValue:B.form.model.is_alone_grade,"onUpdate:modelValue":i[5]||(i[5]=e=>B.form.model.is_alone_grade=e)},{default:g((()=>[b(D,{label:0},{default:g((()=>[y(f(n.$t("默认折扣")),1)])),_:1})])),_:1},8,["modelValue"]),0==B.form.model.is_alone_grade?(u(),p("div",S,f(n.$t("默认折扣：默认为用户所属会员等级的折扣率")),1)):V("",!0),1==B.form.model.is_alone_grade?(u(),p("div",w,f(n.$t("仅需支付：用户购买此商品仅需支付的金额或比例")),1)):V("",!0)])),_:1},8,["label"])):V("",!0),1==B.form.model.is_alone_grade&&1==B.form.model.is_enable_grade?(u(),c(Q,{key:2,label:n.$t("折扣佣金类型：")},{default:g((()=>[b(I,{modelValue:B.form.model.alone_grade_type,"onUpdate:modelValue":i[6]||(i[6]=e=>B.form.model.alone_grade_type=e),onChange:B.changeGradeType},{default:g((()=>[b(D,{label:10},{default:g((()=>[y(f(n.$t("百分比")),1)])),_:1}),b(D,{label:20},{default:g((()=>[y(f(n.$t("固定金额")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"])):V("",!0),1==B.form.model.is_alone_grade&&1==B.form.model.is_enable_grade?(u(),c(Q,{key:3,label:""},{default:g((()=>[_("div",q,[b(H,{data:B.form.gradeList,border:"",size:""},{default:g((()=>[b(F,{prop:"name",label:n.$t("会员等级")},null,8,["label"]),b(F,{prop:"name",label:n.$t("折扣")},{default:g((e=>[_("div",C,[b(Q,{class:"product-equity",rules:[{validator:()=>!!e.row.product_equity,message:n.$t("请输入折扣")}],prop:"model.image"},{default:g((()=>[b(W,{modelValue:e.row.product_equity,"onUpdate:modelValue":l=>e.row.product_equity=l,min:10==B.form.model.alone_grade_type?1:0,max:10==B.form.model.alone_grade_type?100:A.minPrice,controls:!1,placeholder:n.$t("请输入折扣")},null,8,["modelValue","onUpdate:modelValue","min","max","placeholder"]),_("span",T,f(10==B.form.model.alone_grade_type?A.grade_unit:A.currency.unit),1)])),_:2},1032,["rules"])])])),_:1},8,["label"])])),_:1},8,["data"])])])),_:1})):V("",!0),1==B.form.basicSetting.is_open?(u(),p("div",L,"分销设置")):V("",!0),1==B.form.basicSetting.is_open?(u(),c(Q,{key:5,label:"是否开启分销："},{default:g((()=>[b(I,{modelValue:B.form.model.is_agent,"onUpdate:modelValue":i[7]||(i[7]=e=>B.form.model.is_agent=e)},{default:g((()=>[b(D,{label:1},{default:g((()=>[y("开启")])),_:1}),b(D,{label:0},{default:g((()=>[y("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1})):V("",!0),1===B.form.model.is_agent?(u(),p(h,{key:6},[1==B.form.basicSetting.is_open?(u(),c(Q,{key:0,label:"分销规则："},{default:g((()=>[b(I,{modelValue:B.form.model.is_ind_agent,"onUpdate:modelValue":i[8]||(i[8]=e=>B.form.model.is_ind_agent=e)},{default:g((()=>[b(D,{label:0},{default:g((()=>[y("平台规则")])),_:1}),b(D,{label:1},{default:g((()=>[y("单独规则")])),_:1})])),_:1},8,["modelValue"]),_("div",P,[y("平台规则：层级("+f(B.form.basicSetting.level)+"级) ",1),B.form.basicSetting.level>=1?(u(),p("span",M,"1级佣金("+f(B.form.agentSetting.first_money)+"%)",1)):V("",!0),B.form.basicSetting.level>=2?(u(),p("span",z,"2级佣金("+f(B.form.agentSetting.second_money)+"%)",1)):V("",!0),B.form.basicSetting.level>=3?(u(),p("span",G,"3级佣金("+f(B.form.agentSetting.third_money)+"%)",1)):V("",!0)])])),_:1})):V("",!0),1===B.form.model.is_ind_agent&&1==B.form.basicSetting.is_open?(u(),p(h,{key:1},[b(Q,{label:"分销佣金类型："},{default:g((()=>[b(I,{modelValue:B.form.model.agent_money_type,"onUpdate:modelValue":i[9]||(i[9]=e=>B.form.model.agent_money_type=e),onChange:B.changeMoneyType},{default:g((()=>[b(D,{label:10},{default:g((()=>[y("百分比")])),_:1}),b(D,{label:20},{default:g((()=>[y("固定金额")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1}),b(Q,{label:"单独分销设置："},{default:g((()=>[b(J,{type:"number",min:"0",modelValue:B.form.model.first_money,"onUpdate:modelValue":i[10]||(i[10]=e=>B.form.model.first_money=e),class:"max-w460"},{prepend:g((()=>[y(" 一级佣金： ")])),append:g((()=>[y(f(A.unit),1)])),_:1},8,["modelValue"])])),_:1}),B.form.basicSetting.level>=2?(u(),c(Q,{key:0},{default:g((()=>[b(J,{type:"number",min:"0",modelValue:B.form.model.second_money,"onUpdate:modelValue":i[11]||(i[11]=e=>B.form.model.second_money=e),class:"max-w460"},{prepend:g((()=>[y(" 二级佣金： ")])),append:g((()=>[y(f(A.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0),B.form.basicSetting.level>=3?(u(),c(Q,{key:1},{default:g((()=>[b(J,{type:"number",min:"0",modelValue:B.form.model.third_money,"onUpdate:modelValue":i[12]||(i[12]=e=>B.form.model.third_money=e),class:"max-w460"},{prepend:g((()=>[y(" 三级佣金： ")])),append:g((()=>[y(f(A.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0)],64)):V("",!0)],64)):V("",!0)])}],["__scopeId","data-v-9633153b"]]);export{X as default};
