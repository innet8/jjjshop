import{P as s,N as a,v as t}from"./element-plus-d03e850c.js";import{S as e}from"./store-529bf734.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{$ as i,o,c as r,a as n,P as p,S as d,X as c,Q as m,a8 as u,W as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-8a56ff53.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const j={data:()=>({active:0,loading:!0,detail:{total_price:"",income_money:"",order_count:"",refund_money:""},activeName:"sale",salesNumRank:[],salesMoneyRank:[]}),created(){this.getParams()},methods:{getParams(){let s=this;s.loading=!0,e.storeSurvey({},!0).then((a=>{s.detail=a.data.detail,s.salesNumRank=a.data.salesNumRank,s.salesMoneyRank=a.data.salesMoneyRank,s.loading=!1})).catch((a=>{s.loading=!1}))},handleClick(){this.getParams()}}},g={class:"pb50"},y={class:"product-content"},_=n("div",{class:"common-form"},"实时概况",-1),b={class:"table-wrap"},h={class:"pb16 grid-content bg-purple"},f=n("div",null,"营业总额(元)",-1),k={class:"detail_prici"},x={class:"pb16 grid-content bg-purple"},w=n("div",null,"预计收入(元)",-1),R={class:"detail_prici"},N={class:"pb16 grid-content bg-purple"},M=n("div",null,"有效订单(元)",-1),P={class:"detail_prici"},S={class:"pb16 grid-content bg-purple"},C=n("div",null,"退款金额(元)",-1),W={class:"detail_prici"},q={class:"product-content d-b-c ww100"},z={class:"right-box d-s-s d-c flex-1 pr16"},A=n("div",{class:"lh30 f16 tl"},"商品排行榜",-1),B={class:"list ww100"},Q={key:0},X={class:"key-box"},$={class:"text-ellipsis-2 flex-1 ml10"},D={class:"gray9 tr",style:{width:"200px"}},E={key:1,class:"tc pt30"},F={class:"right-box d-s-s d-c flex-1 pr16"},G=n("div",{class:"lh30 f16 tl"},"商品排行榜",-1),H={class:"list ww100"},I={key:0},J={class:"key-box"},K={class:"text-ellipsis-2 flex-1 ml10"},L={class:"gray9 tr",style:{width:"200px"}},O={key:1,class:"tc pt30"};const T=l(j,[["render",function(e,l,j,T,U,V){const Y=s,Z=a,ss=t;return i((o(),r("div",g,[n("div",y,[_,n("div",b,[p(Z,{gutter:20},{default:d((()=>[p(Y,{span:6},{default:d((()=>[n("div",h,[f,n("div",k,c(U.detail.total_price),1)])])),_:1}),p(Y,{span:6},{default:d((()=>[n("div",x,[w,n("div",R,c(U.detail.income_money),1)])])),_:1}),p(Y,{span:6},{default:d((()=>[n("div",N,[M,n("div",P,c(U.detail.order_count),1)])])),_:1}),p(Y,{span:6},{default:d((()=>[n("div",S,[C,n("div",W,c(U.detail.refund_money),1)])])),_:1})])),_:1})]),n("div",q,[n("div",z,[A,n("div",B,[U.salesNumRank.length>0?(o(),r("ul",Q,[(o(!0),r(m,null,u(U.salesNumRank,((s,a)=>(o(),r("li",{key:a,class:"d-s-c p-6-0 border-b-d"},[n("span",X,c(a+1),1),n("span",$,c(s.product_name),1),n("span",D,[n("template",null,[v(" 销量："+c(s.total_num),1)]),n("template",null,[v(" 销售额："+c(s.total_price),1)])])])))),128))])):(o(),r("div",E,"暂无上榜记录"))])]),n("div",F,[G,n("div",H,[U.salesMoneyRank.length>0?(o(),r("ul",I,[(o(!0),r(m,null,u(U.salesMoneyRank,((s,a)=>(o(),r("li",{key:a,class:"d-s-c p-6-0 border-b-d"},[n("span",J,c(a+1),1),n("span",K,c(s.product_name),1),n("span",L,[n("template",null,[v(" 销量："+c(s.total_num),1)]),n("template",null,[v(" 销售额："+c(s.total_price),1)])])])))),128))])):(o(),r("div",O,"暂无上榜记录"))])])])])])),[[ss,U.loading]])}]]);export{T as default};