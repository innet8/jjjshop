import{v as t}from"./element-plus-d03e850c.js";import{_ as a}from"./SvgIcon-be12e702.js";import{I as s}from"./index-4ad12caa.js";import o from"./Ranking-f5d624bc.js";import d from"./Transaction-f5c38ef1.js";import{a as e}from"./index-b2c611b3.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as l,$ as r,o as n,c,a as p,X as m,P as u,T as _,Y as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./echarts-2361e669.js";import"./tslib-a4e99503.js";import"./zrender-1189e17c.js";import"./statistics-cc7dd971.js";import"./DateTime-12b085dd.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{userInfo:v}=e(),h={class:"home"},j={class:"operation-wrap",style:{"background-color":"#FFFFFF"}},b={class:"operation-title mb16"},g={class:"operation-data"},x={class:"data-box"},f={class:"data-box-title"},$={class:"data-box"},k={class:"data-box-title"},w={class:"data-box"},I={class:"data-box-title"},F={class:"data-box"},R={class:"data-box-title"},S={class:"data-box"},T={class:"data-box-title"},B={class:"operation-center mt12"},C={class:"operation-center-l"},D={class:"operation-title mb16"},q={class:"operation-today"},z={class:"grid-content"},X={class:"des"},A={class:"yesterday"},M={class:"grid-content"},N={class:"des"},O={class:"yesterday"},P={class:"grid-content"},V={class:"des"},W={class:"yesterday"},Y={class:"grid-content"},Z={class:"des"},E={class:"yesterday"},G={class:"grid-content"},H={class:"des"},J={class:"yesterday"},K={class:"operation-center-r"},L={class:"operation-title mb16"},Q={class:"center-r-box"},U={class:"center-r-box-t"},tt={class:"fb"},at={class:"home-index mt12"},st={class:"flex-1"},ot={class:"matters-wrap",style:{width:"100%"}},dt={class:"matters-wrap flex-1"};const et=i({components:{Ranking:o,Transaction:d,SvgIcon:a},data:()=>({loading:!0,top_data:[],wait_data:{order:{},agent:{},supplier:{},activity:{},audit:{},stock:{}},today_data:{order_total_price:{},order_total:{},new_user_total:{},new_supplier_total:{},apply_supplier_total:{},order_user_total:{},income_money:{}},product_data:{salesMoneyRank:[],salesNumRank:[]},user_type:""}),provide:function(){return{dataRank:this.product_data}},mounted(){this.getData(),this.getBaseInof()},methods:{async getBaseInof(){this.user_type=v.user_type},getData(){let t=this;t.loading=!0,s.getCount(!0).then((a=>{t.loading=!1,Object.assign(t.product_data,a.data.data.product_data),t.top_data=a.data.data.top_data,t.wait_data=a.data.data.wait_data,t.today_data=a.data.data.today_data})).catch((t=>{}))},lockStock(){this.$router.push({path:"product/store/index"})}}},[["render",function(s,o,d,e,i,v){var et,it,lt,rt,nt,ct,pt,mt,ut,_t;const yt=a,vt=l("Transaction"),ht=l("Ranking"),jt=t;return r((n(),c("div",h,[p("div",j,[p("h3",b,m(s.$t("数据总览")),1),p("div",g,[p("div",x,[p("div",f,[p("h3",null,m(s.$t("营业总额")),1),u(yt,{class:"data-box-icon",name:"icon1"})]),p("h4",null,m(i.top_data.total_money),1)]),p("div",$,[p("div",k,[p("h3",null,m(s.$t("折扣总额")),1),u(yt,{class:"data-box-icon",name:"icon2"})]),p("h4",null,m(i.top_data.total_discount_money),1)]),p("div",w,[p("div",I,[p("h3",null,m(s.$t("会员数")),1),u(yt,{class:"data-box-icon",name:"icon3"})]),p("h4",null,m(i.top_data.user_total),1)]),p("div",F,[p("div",R,[p("h3",null,m(s.$t("订单数")),1),u(yt,{class:"data-box-icon",name:"icon4"})]),p("h4",null,m(i.top_data.order_total),1)]),p("div",S,[p("div",T,[p("h3",null,m(s.$t("退款金额")),1),u(yt,{class:"data-box-icon",name:"icon5"})]),p("h4",null,m(i.top_data.refund_money),1)])])]),p("div",B,[p("div",C,[p("h3",D,m(s.$t("今日概况")),1),p("div",q,[p("div",z,[p("p",X,m(s.$t("营业总额")),1),p("h3",null,m(null==(et=i.today_data.order_total_price)?void 0:et.tday),1),p("p",A,m(s.$t("昨日："))+m(null==(it=i.today_data.order_total_price)?void 0:it.ytd),1)]),p("div",M,[p("p",N,m(s.$t("折扣总额")),1),p("h3",null,m(null==(lt=i.today_data.order_discount_money)?void 0:lt.tday),1),p("p",O,m(s.$t("昨日："))+m(null==(rt=i.today_data.order_discount_money)?void 0:rt.ytd),1)]),p("div",P,[p("p",V,m(s.$t("会员数（人）")),1),p("h3",null,m(null==(nt=i.today_data.new_user_total)?void 0:nt.tday),1),p("p",W,m(s.$t("昨日："))+m(null==(ct=i.today_data.new_user_total)?void 0:ct.ytd),1)]),p("div",Y,[p("p",Z,m(s.$t("订单数")),1),p("h3",null,m(null==(pt=i.today_data.order_total)?void 0:pt.tday),1),p("p",E,m(s.$t("昨日："))+m(null==(mt=i.today_data.order_total)?void 0:mt.ytd),1)]),p("div",G,[p("p",H,m(s.$t("退款金额")),1),p("h3",null,m(null==(ut=i.today_data.order_refund_money)?void 0:ut.tday),1),p("p",J,m(s.$t("昨日："))+m(null==(_t=i.today_data.order_refund_money)?void 0:_t.ytd),1)])])]),p("div",K,[p("h3",L,m(s.$t("待办事项")),1),p("div",Q,[p("div",U,[p("h4",null,m(s.$t("库存告急")),1),p("p",{onClick:o[0]||(o[0]=(...t)=>v.lockStock&&v.lockStock(...t))},m(s.$t("查看")),1)]),p("p",tt,m(i.wait_data.stock.product),1)])])]),p("div",at,[p("div",st,[p("div",ot,[u(vt)])]),p("div",dt,[i.loading?y("",!0):(n(),_(ht,{key:0}))])])])),[[jt,i.loading]])}],["__scopeId","data-v-1ac8929a"]]);export{et as default};