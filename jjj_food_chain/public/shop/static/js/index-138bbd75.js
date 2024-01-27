import{q as e,r as a,h as t,H as l,i as s,e as i,m as o,n as r,A as n,v as p}from"./element-plus-b01b3a31.js";import{l as d}from"./qs-a8eee860.js";import{u as m}from"./index-98f906e9.js";import{S as u}from"./statistics-02987697.js";import c from"./detail-d976cea3.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as b,ap as g,$ as _,o as f,c as j,a as v,P as C,S as $,Q as y,a8 as w,T as k,W as z,X as S,Y as D,bb as x,b9 as F}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{token:P}=m(),I={components:{detail:c},data:()=>({loading:!1,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,exStyle:[],searchForm:{user_id:"",create_time:""},token:P,detailId:{},open:!1}),created(){this.getData()},methods:{handleCurrentChange(e){let a=this;a.loading=!0,a.curPage=e,a.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,a=e.searchForm;a.page=e.curPage,a.list_rows=e.pageSize,u.getUserShiftLog(a,!0).then((a=>{Object.assign(e.tableData,a.data.list.data.map((e=>{var a;return e.cash_income=(null==(a=e.incomes.find((e=>40==e.pay_type)))?void 0:a.price)||"0.00",e}))),Object.assign(e.exStyle,a.data.cashierList.data),e.totalDataNumber=a.data.list.total,e.loading=!1})).catch((e=>{}))},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},detailClick(e){this.detailId=e.id,this.open=!0},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/user.UserShiftLog/export?"+d.stringify(this.searchForm)}}},V={class:"statistics-member"},Y={class:"common-seach-wrap"},U={class:"block"},L=(e=>(x("data-v-3bdb43a5"),e=e(),F(),e))((()=>v("span",{class:"demonstration"},null,-1))),N={class:"table-wrap"},q={class:"pagination"};const A=h(I,[["render",function(d,m,u,c,h,x){const F=e,P=a,I=t,A=l,E=s,M=i,O=o,X=r,B=n,H=b("detail"),Q=g("auth"),T=p;return _((f(),j("div",V,[v("div",Y,[C(M,{size:"small",inline:!0,model:h.searchForm,class:"demo-form-inline"},{default:$((()=>[C(I,{label:d.$t("收银员")},{default:$((()=>[C(P,{size:"small",modelValue:h.searchForm.user_id,"onUpdate:modelValue":m[0]||(m[0]=e=>h.searchForm.user_id=e),placeholder:d.$t("请选择")},{default:$((()=>[C(F,{label:d.$t("全部"),value:""},null,8,["label"]),(f(!0),j(y,null,w(h.exStyle,((e,a)=>(f(),k(F,{key:a,label:e.user_name,value:e.shop_user_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),C(I,{label:d.$t("起始时间")},{default:$((()=>[v("div",U,[L,C(A,{size:"small",modelValue:h.searchForm.create_time,"onUpdate:modelValue":m[1]||(m[1]=e=>h.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":d.$t("至"),"start-placeholder":d.$t("开始日期"),"end-placeholder":d.$t("结束日期")},null,8,["modelValue","range-separator","start-placeholder","end-placeholder"])])])),_:1},8,["label"]),C(I,null,{default:$((()=>[C(E,{size:"small",type:"primary",icon:"Search",onClick:x.onSubmit},{default:$((()=>[z(S(d.$t("查询")),1)])),_:1},8,["onClick"])])),_:1}),C(I,null,{default:$((()=>[_((f(),k(E,{size:"small",type:"success",onClick:x.onExport},{default:$((()=>[z(S(d.$t("导出")),1)])),_:1},8,["onClick"])),[[Q,"/statistics/user/export"]])])),_:1})])),_:1},8,["model"])]),v("div",N,[_((f(),k(X,{size:"small",data:h.tableData,border:"",style:{width:"100%"}},{default:$((()=>[C(O,{prop:"shift_no",label:d.$t("交班编号"),width:"180"},null,8,["label"]),C(O,{prop:"user.real_name",label:d.$t("收银员")},null,8,["label"]),C(O,{prop:"",label:d.$t("当班时间"),width:"170"},{default:$((e=>[v("div",null,S(e.row.shift_start_time)+" "+S(d.$t("至"))+" "+S(e.row.shift_end_time),1)])),_:1},8,["label"]),C(O,{prop:"total_income",label:d.$t("营业收入")},null,8,["label"]),C(O,{prop:"cash_income",label:d.$t("现金收入")},null,8,["label"]),C(O,{prop:"previous_shift_cash",label:d.$t("上一班遗留备用金")},null,8,["label"]),C(O,{prop:"cash_left",label:d.$t("本班遗留备用金")},null,8,["label"]),C(O,{prop:"create_time",label:d.$t("添加时间")},null,8,["label"]),C(O,{fixed:"right",label:d.$t("操作"),width:"120"},{default:$((e=>[_((f(),k(E,{onClick:a=>x.detailClick(e.row),type:"primary",link:"",size:"small"},{default:$((()=>[z(S(d.$t("详情")),1)])),_:2},1032,["onClick"])),[[Q,"/statistics/user/detail"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[T,h.loading]])]),v("div",q,[C(B,{onSizeChange:x.handleSizeChange,onCurrentChange:x.handleCurrentChange,background:"","current-page":h.curPage,"page-size":h.pageSize,layout:"total, prev, pager, next, jumper",total:h.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),h.open?(f(),k(H,{key:0,detailId:h.detailId,open:h.open,onCloseDialog:m[2]||(m[2]=()=>{h.open=!1})},null,8,["detailId","open"])):D("",!0)])),[[T,h.loading]])}],["__scopeId","data-v-3bdb43a5"]]);export{A as default};
