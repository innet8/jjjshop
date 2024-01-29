import{H as a,h as s,i as t,e as l,m as e,n as o,v as i}from"./element-plus-b01b3a31.js";import{_ as n}from"./SvgIcon-be12e702.js";import{S as d}from"./store-aec171c2.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,c as m,$ as p,P as u,S as b,a as v,W as h,X as _,T as x,M as j,bb as f,b9 as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83830581.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $={data:()=>({active:0,loading:!0,detail:{total_price:"",income_money:"",order_count:"",refund_money:""},searchForm:{date:[]},activeName:"sale",salesNumRank:[],salesMoneyRank:[]}),created(){this.getParams()},methods:{getParams(){let a=this;a.loading=!0;let s=a.searchForm;d.storeSurvey(s,!0).then((s=>{a.detail=s.data.detail,a.salesNumRank=s.data.salesNumRank,a.salesMoneyRank=s.data.salesMoneyRank,a.loading=!1})).catch((s=>{a.loading=!1}))},handleClick(){this.getParams()}}},k={class:"product-content"},g={class:""},w={class:"block"},R=(a=>(f("data-v-c60af070"),a=a(),y(),a))((()=>v("span",{class:"demonstration"},null,-1))),M={class:"common-form"},P={class:"operation-data"},z={class:"data-box"},N={class:"data-box-title"},F={class:"data-box"},S={class:"data-box-title"},C={class:"data-box"},Y={class:"data-box-title"},T={class:"data-box"},V={class:"data-box-title"},q={class:"data-box"},D={class:"data-box-title"},I={class:"product-bottom"},O={class:"flex-1"},W={class:"right-box d-s-s d-c pr16"},X={class:"common-form"},A={class:"list ww100"},B={class:"product-name"},H={class:""},U={key:1,class:"tc pt30"},E={class:"flex-1"},G={class:"right-box d-s-s d-c pr16"},J={class:"common-form"},K={class:"list ww100"},L={class:"product-name"},Q={class:""},Z={key:1,class:"tc pt30"};const aa=r($,[["render",function(d,r,f,y,$,aa){const sa=a,ta=s,la=t,ea=l,oa=n,ia=e,na=o,da=i;return c(),m("div",k,[p((c(),m("div",g,[u(ea,{size:"small",inline:!0,model:$.searchForm,class:"demo-form-inline"},{default:b((()=>[u(ta,{label:d.$t("起始时间")},{default:b((()=>[v("div",w,[R,u(sa,{size:"small",modelValue:$.searchForm.date,"onUpdate:modelValue":r[0]||(r[0]=a=>$.searchForm.date=a),type:"daterange","value-format":"YYYY-MM-DD","range-separator":d.$t("至"),"start-placeholder":d.$t("开始日期"),"end-placeholder":d.$t("结束日期")},null,8,["modelValue","range-separator","start-placeholder","end-placeholder"])])])),_:1},8,["label"]),u(ta,null,{default:b((()=>[u(la,{size:"small",type:"primary",icon:"Search",onClick:aa.getParams},{default:b((()=>[h(_(d.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])),[[da,$.loading]]),v("div",M,_(d.$t("实时概况")),1),v("div",P,[v("div",z,[v("div",N,[v("h3",null,_(d.$t("营业总额")),1),u(oa,{class:"data-box-icon",name:"icon1"})]),v("h4",null,_($.detail.total_price),1)]),v("div",F,[v("div",S,[v("h3",null,_(d.$t("折扣总额")),1),u(oa,{class:"data-box-icon",name:"icon2"})]),v("h4",null,_($.detail.total_discount_money),1)]),v("div",C,[v("div",Y,[v("h3",null,_(d.$t("会员数")),1),u(oa,{class:"data-box-icon",name:"icon3"})]),v("h4",null,_($.detail.user_count),1)]),v("div",T,[v("div",V,[v("h3",null,_(d.$t("订单数")),1),u(oa,{class:"data-box-icon",name:"icon4"})]),v("h4",null,_($.detail.order_count),1)]),v("div",q,[v("div",D,[v("h3",null,_(d.$t("退款金额")),1),u(oa,{class:"data-box-icon",name:"icon5"})]),v("h4",null,_($.detail.refund_money),1)])]),v("div",I,[v("div",O,[v("div",W,[v("div",X,_(d.$t("销量TOP10")),1),v("div",A,[$.salesNumRank.length>0?(c(),x(na,{key:0,data:$.salesNumRank,style:{width:"100%"},size:"small"},{default:b((()=>[u(ia,{prop:"product_name_text",label:d.$t("商品名称")},{default:b((a=>[v("div",B,[v("span",{class:j(a.$index<=3?"key-box":"key-box2")},_(a.$index+1),3),v("span",H,_(a.row.product_name_text),1)])])),_:1},8,["label"]),u(ia,{prop:"total_num",label:d.$t("销量")},null,8,["label"]),u(ia,{prop:"total_price",label:d.$t("销售额")},null,8,["label"])])),_:1},8,["data"])):(c(),m("div",U,_(d.$t("暂无上榜记录")),1))])])]),v("div",E,[v("div",G,[v("div",J,_(d.$t("销售额TOP10")),1),v("div",K,[$.salesMoneyRank.length>0?(c(),x(na,{key:0,data:$.salesMoneyRank,style:{width:"100%"},size:"small"},{default:b((()=>[u(ia,{prop:"product_name_text",label:d.$t("商品名称")},{default:b((a=>[v("div",L,[v("span",{class:j(a.$index<=3?"key-box":"key-box2")},_(a.$index+1),3),v("span",Q,_(a.row.product_name_text),1)])])),_:1},8,["label"]),u(ia,{prop:"total_num",label:d.$t("销量")},null,8,["label"]),u(ia,{prop:"total_price",label:d.$t("销售额")},null,8,["label"])])),_:1},8,["data"])):(c(),m("div",Z,_(d.$t("暂无上榜记录")),1))])])])])])}],["__scopeId","data-v-c60af070"]]);export{aa as default};