import{w as e,x as l,h as a,n as o,p as t,q as m,m as d,o as r,g as s}from"./element-plus-c8084613.js";import{u as n}from"./index-7061ad3d.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,c as p,a as _,W as f,S as c,R as g,O as b,V as y,X as V,P as h,a7 as j}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{currency:v}=n(),$={class:"buy-set-content"},x={class:"common-form mt50"},k={class:"gray9"},w={class:"common-form mt50"},U={key:0,class:"gray9"},S={key:1,class:"gray9"},q={class:"percent-w50"},C={class:"d-s-c"},z={class:"ml10"},L={key:4,class:"common-form mt50"},P={class:"gray9"},T={key:0,style:{"padding-left":"10px"}},G={key:1,style:{"padding-left":"10px"}},M={key:2,style:{"padding-left":"10px"}};const I=i({data:()=>({unit:"%",grade_unit:"%",currency:v,minPrice:0}),created(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],watch:{form:{handler(e){let l=[];e.model.sku.map((e=>{l.push(e.product_price)})),this.minPrice=Math.min(...l)},immediate:!0,deep:!0}},methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.form.gradeList.map(((e,l)=>{this.form.gradeList[l].product_equity=null})),this.grade_unit="10"==e?"%":"元"}}},[["render",function(n,i,v,I,B,J){const O=e,R=l,W=a,X=o,A=t,D=m,E=d,F=r,H=s;return u(),p("div",$,[_("div",x,f(n.$t("其他设置")),1),40!=J.form.model.product_status?(u(),c(W,{key:0,label:n.$t("商品状态："),rules:[{required:!0,message:n.$t("选择商品状态")}],prop:"model.product_status"},{default:g((()=>[b(R,{modelValue:J.form.model.product_status,"onUpdate:modelValue":i[0]||(i[0]=e=>J.form.model.product_status=e)},{default:g((()=>[b(O,{label:10},{default:g((()=>[y(f(n.$t("上架")),1)])),_:1}),b(O,{label:20},{default:g((()=>[y(f(n.$t("下架")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])):V("",!0),b(W,{label:n.$t("商品排序："),rules:[{required:!0,message:n.$t("接近0，排序等级越高")}],prop:"model.product_sort"},{default:g((()=>[b(X,{controls:!1,min:0,max:999,placeholder:n.$t("接近0，排序等级越高"),modelValue:J.form.model.product_sort,"onUpdate:modelValue":i[1]||(i[1]=e=>J.form.model.product_sort=e),class:"max-w460"},null,8,["placeholder","modelValue"])])),_:1},8,["label","rules"]),b(W,{label:n.$t("限购数量："),rules:[{required:!0,message:n.$t("请输入限购数量")}],prop:"model.limit_num"},{default:g((()=>[b(X,{controls:!1,min:0,max:999,modelValue:J.form.model.limit_num,"onUpdate:modelValue":i[2]||(i[2]=e=>J.form.model.limit_num=e),class:"max-w460"},null,8,["modelValue"]),_("div",k,f(n.$t("每单/每桌购买的最大数量，0为不限购")),1)])),_:1},8,["label","rules"]),b(W,{label:n.$t("打印标签："),prop:"model.label_id"},{default:g((()=>[b(D,{modelValue:J.form.model.label_id,"onUpdate:modelValue":i[3]||(i[3]=e=>J.form.model.label_id=e),clearable:"",class:"max-w460",size:"default"},{default:g((()=>[b(A,{value:0,label:n.$t("无")},null,8,["label"]),(u(!0),p(h,null,j(J.form.labelList,(e=>(u(),c(A,{key:e.label_id,value:e.label_id,label:e.label_name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label"]),_("div",w,f(n.$t("会员折扣设置")),1),b(W,{label:n.$t("是否开启会员折扣：")},{default:g((()=>[b(R,{modelValue:J.form.model.is_enable_grade,"onUpdate:modelValue":i[4]||(i[4]=e=>J.form.model.is_enable_grade=e)},{default:g((()=>[b(O,{label:1},{default:g((()=>[y(f(n.$t("开启")),1)])),_:1}),b(O,{label:0},{default:g((()=>[y(f(n.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==J.form.model.is_enable_grade?(u(),c(W,{key:1,label:n.$t("会员折扣设置：")},{default:g((()=>[b(R,{modelValue:J.form.model.is_alone_grade,"onUpdate:modelValue":i[5]||(i[5]=e=>J.form.model.is_alone_grade=e)},{default:g((()=>[b(O,{label:0},{default:g((()=>[y(f(n.$t("默认折扣")),1)])),_:1})])),_:1},8,["modelValue"]),0==J.form.model.is_alone_grade?(u(),p("div",U,f(n.$t("默认折扣：默认为用户所属会员等级的折扣率")),1)):V("",!0),1==J.form.model.is_alone_grade?(u(),p("div",S,f(n.$t("仅需支付：用户购买此商品仅需支付的金额或比例")),1)):V("",!0)])),_:1},8,["label"])):V("",!0),1==J.form.model.is_alone_grade&&1==J.form.model.is_enable_grade?(u(),c(W,{key:2,label:n.$t("折扣佣金类型：")},{default:g((()=>[b(R,{modelValue:J.form.model.alone_grade_type,"onUpdate:modelValue":i[6]||(i[6]=e=>J.form.model.alone_grade_type=e),onChange:J.changeGradeType},{default:g((()=>[b(O,{label:10},{default:g((()=>[y(f(n.$t("百分比")),1)])),_:1}),b(O,{label:20},{default:g((()=>[y(f(n.$t("固定金额")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"])):V("",!0),1==J.form.model.is_alone_grade&&1==J.form.model.is_enable_grade?(u(),c(W,{key:3,label:""},{default:g((()=>[_("div",q,[b(F,{data:J.form.gradeList,border:"",size:""},{default:g((()=>[b(E,{prop:"name",label:n.$t("会员等级")},null,8,["label"]),b(E,{prop:"name",label:n.$t("折扣")},{default:g((e=>[_("div",C,[b(W,{class:"product-equity",rules:[{validator:()=>!!e.row.product_equity,message:n.$t("请输入折扣")}],prop:"model.image"},{default:g((()=>[b(X,{modelValue:e.row.product_equity,"onUpdate:modelValue":l=>e.row.product_equity=l,min:10==J.form.model.alone_grade_type?1:0,max:10==J.form.model.alone_grade_type?100:B.minPrice,controls:!1,placeholder:n.$t("请输入折扣")},null,8,["modelValue","onUpdate:modelValue","min","max","placeholder"]),_("span",z,f(10==J.form.model.alone_grade_type?B.grade_unit:B.currency.unit),1)])),_:2},1032,["rules"])])])),_:1},8,["label"])])),_:1},8,["data"])])])),_:1})):V("",!0),1==J.form.basicSetting.is_open?(u(),p("div",L,"分销设置")):V("",!0),1==J.form.basicSetting.is_open?(u(),c(W,{key:5,label:"是否开启分销："},{default:g((()=>[b(R,{modelValue:J.form.model.is_agent,"onUpdate:modelValue":i[7]||(i[7]=e=>J.form.model.is_agent=e)},{default:g((()=>[b(O,{label:1},{default:g((()=>[y("开启")])),_:1}),b(O,{label:0},{default:g((()=>[y("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1})):V("",!0),1===J.form.model.is_agent?(u(),p(h,{key:6},[1==J.form.basicSetting.is_open?(u(),c(W,{key:0,label:"分销规则："},{default:g((()=>[b(R,{modelValue:J.form.model.is_ind_agent,"onUpdate:modelValue":i[8]||(i[8]=e=>J.form.model.is_ind_agent=e)},{default:g((()=>[b(O,{label:0},{default:g((()=>[y("平台规则")])),_:1}),b(O,{label:1},{default:g((()=>[y("单独规则")])),_:1})])),_:1},8,["modelValue"]),_("div",P,[y("平台规则：层级("+f(J.form.basicSetting.level)+"级) ",1),J.form.basicSetting.level>=1?(u(),p("span",T,"1级佣金("+f(J.form.agentSetting.first_money)+"%)",1)):V("",!0),J.form.basicSetting.level>=2?(u(),p("span",G,"2级佣金("+f(J.form.agentSetting.second_money)+"%)",1)):V("",!0),J.form.basicSetting.level>=3?(u(),p("span",M,"3级佣金("+f(J.form.agentSetting.third_money)+"%)",1)):V("",!0)])])),_:1})):V("",!0),1===J.form.model.is_ind_agent&&1==J.form.basicSetting.is_open?(u(),p(h,{key:1},[b(W,{label:"分销佣金类型："},{default:g((()=>[b(R,{modelValue:J.form.model.agent_money_type,"onUpdate:modelValue":i[9]||(i[9]=e=>J.form.model.agent_money_type=e),onChange:J.changeMoneyType},{default:g((()=>[b(O,{label:10},{default:g((()=>[y("百分比")])),_:1}),b(O,{label:20},{default:g((()=>[y("固定金额")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1}),b(W,{label:"单独分销设置："},{default:g((()=>[b(H,{type:"number",min:"0",modelValue:J.form.model.first_money,"onUpdate:modelValue":i[10]||(i[10]=e=>J.form.model.first_money=e),class:"max-w460"},{prepend:g((()=>[y(" 一级佣金： ")])),append:g((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1}),J.form.basicSetting.level>=2?(u(),c(W,{key:0},{default:g((()=>[b(H,{type:"number",min:"0",modelValue:J.form.model.second_money,"onUpdate:modelValue":i[11]||(i[11]=e=>J.form.model.second_money=e),class:"max-w460"},{prepend:g((()=>[y(" 二级佣金： ")])),append:g((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0),J.form.basicSetting.level>=3?(u(),c(W,{key:1},{default:g((()=>[b(H,{type:"number",min:"0",modelValue:J.form.model.third_money,"onUpdate:modelValue":i[12]||(i[12]=e=>J.form.model.third_money=e),class:"max-w460"},{prepend:g((()=>[y(" 三级佣金： ")])),append:g((()=>[y(f(B.unit),1)])),_:1},8,["modelValue"])])),_:1})):V("",!0)],64)):V("",!0)],64)):V("",!0)])}],["__scopeId","data-v-d4b6da00"]]);export{I as default};
