import{P as t,O as s,m as a,o as e,i,u as l,v as o}from"./element-plus-c8084613.js";import{S as r}from"./statistics-12894b14.js";import{u as n}from"./index-74b65baf.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,S as u,R as m,a as c,O as j,V as f,W as _,X as h,c as g,P as b,a7 as y,_ as v}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{currency:$}=n(),x={class:"common-form"},V={class:"text"},D={class:"text"},w={class:"text"},k={class:"text"},C={class:"text"},F={class:"text"},I={class:"text"},z={class:"text"},S={class:"common-form"},q={class:"dialog-footer"};const O=p({props:["open","detailId"],created(){this.dialogVisible=this.open,this.id=this.detailId,this.getData()},data:()=>({dialogVisible:!1,loading:!1,id:{},detail:{},tableData:[],currency:$}),methods:{getData(){let t=this,s={};s.id=t.id,r.getUserShiftLogdDetail(s,!0).then((s=>{t.detail=s.data.detail,t.tableData=s.data.salesInfo})).catch((t=>{}))},dialogFormVisible(){this.$emit("closeDialog")}}},[["render",function(r,n,p,$,O,P){const U=t,E=s,L=a,R=e,W=i,X=l,A=o;return d(),u(X,{title:r.$t("收银交班详情"),modelValue:O.dialogVisible,"onUpdate:modelValue":n[0]||(n[0]=t=>O.dialogVisible=t),onClose:P.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:m((()=>[c("div",q,[j(W,{type:"primary",onClick:P.dialogFormVisible,loading:O.loading},{default:m((()=>[f(_(r.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:m((()=>[c("div",x,_(r.$t("基本信息")),1),j(E,{gutter:16},{default:m((()=>{var t;return[j(U,{span:12},{default:m((()=>[c("p",V,[f(_(r.$t("交班编号"))+":",1),c("span",null,_(O.detail.shift_no),1)])])),_:1}),j(U,{span:12},{default:m((()=>{var t;return[c("p",D,[f(_(r.$t("收银员"))+":",1),c("span",null,_(null==(t=O.detail.user)?void 0:t.real_name),1)])]})),_:1}),j(U,{span:12},{default:m((()=>[c("p",w,[f(_(r.$t("当班时间"))+":",1),c("span",null,_(O.detail.shift_start_time),1),f(" "+_(r.$t("至")),1),c("span",null,_(O.detail.shift_end_time),1)])])),_:1}),j(U,{span:12},{default:m((()=>[c("p",k,[f(_(r.$t("营业收入"))+":",1),c("span",null,_(O.currency.unit)+_(O.detail.total_income),1)])])),_:1}),(null==(t=O.detail.incomes)?void 0:t.find((t=>40==t.pay_type)))?h("",!0):(d(),u(U,{key:0,span:12},{default:m((()=>[c("p",C,[f(_(r.$t("现金收入"))+":",1),c("span",null,_(O.currency.unit)+"0.00",1)])])),_:1})),(d(!0),g(b,null,y(O.detail.incomes,(t=>(d(),u(U,{span:12},{default:m((()=>[c("p",F,[f(_(t.pay_type_name)+":",1),c("span",null,_(O.currency.unit)+_(t.price),1)])])),_:2},1024)))),256)),j(U,{span:12},{default:m((()=>[c("p",I,[f(_(r.$t("上一班遗留备用金"))+":",1),c("span",null,_(O.currency.unit)+_(O.detail.previous_shift_cash),1)])])),_:1}),j(U,{span:12},{default:m((()=>[c("p",z,[f(_(r.$t("本班遗留备用金"))+":",1),c("span",null,_(O.currency.unit)+_(O.detail.cash_left),1)])])),_:1})]})),_:1}),c("div",S,_(r.$t("销售信息")),1),v((d(),u(R,{size:"small",data:O.tableData,border:"",style:{width:"100%"}},{default:m((()=>[j(L,{prop:"name_text",label:r.$t("分类")},null,8,["label"]),j(L,{prop:"sales",label:r.$t("销售数量")},null,8,["label"]),j(L,{prop:"prices",label:r.$t("销售金额")},{default:m((t=>[f(_(O.currency.unit)+_(t.row.prices),1)])),_:1},8,["label"])])),_:1},8,["data"])),[[A,O.loading]])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-6b9075d0"]]);export{O as default};
