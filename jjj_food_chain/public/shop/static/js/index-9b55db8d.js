import{p as e,q as a,h as t,H as l,i as s,e as i,m as o,o as r,B as n,v as p}from"./element-plus-bf694ad1.js";import{q as d}from"./qs-49804a56.js";import{u as c,l as u}from"./index-417beca7.js";import{S as m}from"./statistics-27742be7.js";import h from"./detail-7f972a8f.js";import{_ as g}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as _,an as b,_ as f,o as j,c as y,a as v,O as w,R as C,P as z,a7 as $,S as k,V as S,W as x,X as D,bm as F,bk as I}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{currency:P}=c(),V=u().language,{token:q}=c(),U={components:{detail:h},data:()=>({loading:!1,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,exStyle:[],searchForm:{user_id:"",create_time:""},token:q,detailId:{},open:!1,languageTag:V,currency:P}),created(){this.getData()},methods:{handleCurrentChange(e){let a=this;a.loading=!0,a.curPage=e,a.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,a=e.searchForm;a.page=e.curPage,a.list_rows=e.pageSize,m.getUserShiftLog(a,!0).then((a=>{Object.assign(e.tableData,a.data.list.data.map((e=>{var a;return e.cash_income=(null==(a=e.incomes.find((e=>40==e.pay_type)))?void 0:a.price)||"0.00",e}))),Object.assign(e.exStyle,a.data.cashierList.data),e.totalDataNumber=a.data.list.total,e.loading=!1})).catch((e=>{}))},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},detailClick(e){this.detailId=e.id,this.open=!0},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/user.UserShiftLog/export?"+d.stringify(this.searchForm)+"&language="+this.languageTag}}},Y={class:"statistics-member"},L={class:"common-seach-wrap"},N={class:"block"},O=(e=>(F("data-v-154df045"),e=e(),I(),e))((()=>v("span",{class:"demonstration"},null,-1))),B={class:"table-wrap"},E={class:"pagination"};const M=g(U,[["render",function(d,c,u,m,h,g){const F=e,I=a,P=t,V=l,q=s,U=i,M=o,T=r,G=n,H=_("detail"),J=b("auth"),R=p;return f((j(),y("div",Y,[v("div",L,[w(U,{size:"small",inline:!0,model:h.searchForm,class:"demo-form-inline"},{default:C((()=>[w(P,{label:d.$t("收银员")},{default:C((()=>[w(I,{size:"small",modelValue:h.searchForm.user_id,"onUpdate:modelValue":c[0]||(c[0]=e=>h.searchForm.user_id=e),placeholder:d.$t("请选择")},{default:C((()=>[w(F,{label:d.$t("全部"),value:""},null,8,["label"]),(j(!0),y(z,null,$(h.exStyle,((e,a)=>(j(),k(F,{key:a,label:e.user_name,value:e.shop_user_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),w(P,{label:d.$t("起始时间")},{default:C((()=>[v("div",N,[O,w(V,{size:"small",modelValue:h.searchForm.create_time,"onUpdate:modelValue":c[1]||(c[1]=e=>h.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"~","start-placeholder":d.$t("开始日期"),"end-placeholder":d.$t("结束日期")},null,8,["modelValue","start-placeholder","end-placeholder"])])])),_:1},8,["label"]),w(P,null,{default:C((()=>[w(q,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:g.onSubmit},{default:C((()=>[S(x(d.$t("查询")),1)])),_:1},8,["onClick"])])),_:1}),w(P,null,{default:C((()=>[f((j(),k(q,{size:"small",type:"primary",onClick:g.onExport},{default:C((()=>[S(x(d.$t("导出")),1)])),_:1},8,["onClick"])),[[J,"/statistics/user/export"]])])),_:1})])),_:1},8,["model"])]),v("div",B,[f((j(),k(T,{size:"small",data:h.tableData,border:"",style:{width:"100%"}},{default:C((()=>[w(M,{prop:"shift_no",label:d.$t("交班编号"),width:"180"},null,8,["label"]),w(M,{prop:"user.real_name",label:d.$t("收银员")},null,8,["label"]),w(M,{prop:"",label:d.$t("当班时间"),width:"200"},{default:C((e=>[v("div",null,x(e.row.shift_start_time)+" "+x(d.$t("至"))+" "+x(e.row.shift_end_time),1)])),_:1},8,["label"]),w(M,{prop:"total_income",label:d.$t("营业收入")},{default:C((e=>[S(x(h.currency.unit)+x(e.row.total_income),1)])),_:1},8,["label"]),w(M,{prop:"cash_income",label:d.$t("现金收入")},{default:C((e=>[S(x(h.currency.unit)+x(e.row.cash_income),1)])),_:1},8,["label"]),w(M,{prop:"previous_shift_cash",label:d.$t("上一班遗留备用金")},{default:C((e=>[S(x(h.currency.unit)+x(e.row.previous_shift_cash),1)])),_:1},8,["label"]),w(M,{prop:"cash_left",label:d.$t("本班遗留备用金")},{default:C((e=>[S(x(h.currency.unit)+x(e.row.cash_left),1)])),_:1},8,["label"]),w(M,{prop:"create_time",label:d.$t("添加时间")},null,8,["label"]),w(M,{fixed:"right",label:d.$t("操作"),width:"120"},{default:C((e=>[f((j(),k(q,{onClick:a=>g.detailClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[S(x(d.$t("详情")),1)])),_:2},1032,["onClick"])),[[J,"/statistics/user/detail"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[R,h.loading]])]),v("div",E,[w(G,{onSizeChange:g.handleSizeChange,onCurrentChange:g.handleCurrentChange,background:"","current-page":h.curPage,"page-size":h.pageSize,layout:"total, prev, pager, next, jumper",total:h.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),h.open?(j(),k(H,{key:0,detailId:h.detailId,open:h.open,onCloseDialog:c[2]||(c[2]=()=>{h.open=!1})},null,8,["detailId","open"])):D("",!0)])),[[R,h.loading]])}],["__scopeId","data-v-154df045"]]);export{M as default};