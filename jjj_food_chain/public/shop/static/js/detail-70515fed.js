import{P as t,N as a,m as s,n as e,i as l,w as i,v as o}from"./element-plus-d03e850c.js";import{S as p}from"./statistics-4bc6ed11.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,T as r,S as m,a as u,P as c,W as j,X as f,Y as _,c as h,Q as b,a8 as g,$ as v,bb as $,b9 as x}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-b8ac138a.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y={props:["open","detailId"],created(){this.dialogVisible=this.open,this.id=this.detailId,this.getData()},data:()=>({dialogVisible:!1,id:{},detail:{},tableData:[]}),methods:{getData(){let t=this,a={};a.id=t.id,p.getUserShiftLogdDetail(a,!0).then((a=>{t.detail=a.data.detail,t.tableData=a.data.salesInfo})).catch((t=>{}))},dialogFormVisible(){this.$emit("closeDialog")}}},V={class:"common-form"},D={class:"text"},k={class:"text"},w={class:"text"},C={class:"text"},I={class:"text"},F=(t=>($("data-v-8dd47687"),t=t(),x(),t))((()=>u("span",null,"0.00",-1))),S={class:"text"},z={class:"text"},P={class:"text"},U={class:"common-form"},W={class:"dialog-footer"};const q=n(y,[["render",function(p,n,$,x,y,q){const A=t,B=a,L=s,N=e,Q=l,T=i,X=o;return d(),r(T,{title:p.$t("收银交班详情"),modelValue:y.dialogVisible,"onUpdate:modelValue":n[0]||(n[0]=t=>y.dialogVisible=t),onClose:q.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:m((()=>[u("div",W,[c(Q,{type:"primary",onClick:q.dialogFormVisible,loading:p.loading},{default:m((()=>[j(f(p.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:m((()=>[u("div",V,f(p.$t("基本信息")),1),c(B,{gutter:16},{default:m((()=>{var t;return[c(A,{span:12},{default:m((()=>[u("p",D,[j(f(p.$t("交班编号"))+":",1),u("span",null,f(y.detail.shift_no),1)])])),_:1}),c(A,{span:12},{default:m((()=>{var t;return[u("p",k,[j(f(p.$t("收银员"))+":",1),u("span",null,f(null==(t=y.detail.user)?void 0:t.real_name),1)])]})),_:1}),c(A,{span:12},{default:m((()=>[u("p",w,[j(f(p.$t("当班时间"))+":",1),u("span",null,f(y.detail.shift_start_time),1),j(" "+f(p.$t("至")),1),u("span",null,f(y.detail.shift_end_time),1)])])),_:1}),c(A,{span:12},{default:m((()=>[u("p",C,[j(f(p.$t("营业收入"))+":",1),u("span",null,f(y.detail.total_income),1)])])),_:1}),(null==(t=y.detail.incomes)?void 0:t.find((t=>40==t.pay_type)))?_("",!0):(d(),r(A,{key:0,span:12},{default:m((()=>[u("p",I,[j(f(p.$t("现金收入"))+":",1),F])])),_:1})),(d(!0),h(b,null,g(y.detail.incomes,(t=>(d(),r(A,{span:12},{default:m((()=>[u("p",S,[j(f(t.pay_type_name)+":",1),u("span",null,f(t.price),1)])])),_:2},1024)))),256)),c(A,{span:12},{default:m((()=>[u("p",z,[j(f(p.$t("上一班遗留备用金"))+":",1),u("span",null,f(y.detail.previous_shift_cash),1)])])),_:1}),c(A,{span:12},{default:m((()=>[u("p",P,[j(f(p.$t("本班遗留备用金"))+":",1),u("span",null,f(y.detail.cash_left),1)])])),_:1})]})),_:1}),u("div",U,f(p.$t("销售信息")),1),v((d(),r(N,{size:"small",data:y.tableData,border:"",style:{width:"100%"}},{default:m((()=>[c(L,{prop:"name_text",label:p.$t("分类")},null,8,["label"]),c(L,{prop:"sales",label:p.$t("销售数量")},null,8,["label"]),c(L,{prop:"prices",label:p.$t("销售金额")},null,8,["label"])])),_:1},8,["data"])),[[X,p.loading]])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-8dd47687"]]);export{q as default};