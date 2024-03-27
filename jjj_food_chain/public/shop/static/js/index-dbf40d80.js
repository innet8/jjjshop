import{d as e,N as a,x as l,h as t,p as r,q as o,g as s,H as i,i as n,e as d,F as u,I as p,J as c,m,o as _,B as h,v as g}from"./element-plus-bf694ad1.js";import{O as b}from"./order-e6e8f781.js";import y from"./cancel-5a2c45a1.js";import f from"./refund-701653d7.js";import{q as v}from"./qs-49804a56.js";import{u as $,l as k}from"./index-7f22f02f.js";import{_ as w}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as j,an as C,o as x,c as D,a as z,O as F,R as V,V as S,W as N,P as E,a7 as L,S as P,_ as q,X as I,bm as M,bk as U}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vuedraggable-a472da53.js";import"./vue-944abb17.js";import"./sortablejs-b4c145c4.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{token:T,currency:B}=$(),Y={components:{Cancel:y,refund:f},data:()=>({currency:B,activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",style_id:"",create_time:"",time_type:1,order_source:0},exStyle:[],shopList:[],create_time:"",order_count:{all:0,payment:0,delivery:0,received:0,cancel:0},open_edit:!1,open_refund:!1,order_no:0,order_id:0,pay_price:0,token:T}),created(){this.getData()},methods:{arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,b.storeOrderlist(a,!0).then((a=>{e.tableData.data=a.data.list.data,e.totalDataNumber=a.data.list.total,e.exStyle=a.data.ex_style,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/store/order/detail",query:{order_id:a}})},verifyClick(a){let l=this,t={};e.confirm("确定要核销吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{t.order_id=a.order_id,b.storeExtract(t,!0).then((e=>{l.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),l.getData()})).catch((e=>{l.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消核销"})}))},getLogistics(e){let a=this,l={order_id:e.order_id};a.loading=!0,b.queryLogistics(l,!0).then((e=>{a.logisticsData=e.data.express.list,a.loading=!1,a.openLogistics()})).catch((e=>{a.loading=!1}))},openLogistics(){this.isLogistics=!0},closeLogistics(){this.isLogistics=!1},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){this.searchForm.token=this.token,b.storeExport({...this.searchForm,request_type:1},!0).then((e=>{self.loading=!1;const a=window.location.protocol+"//"+window.location.host+"/index.php/shop/store.operate/export?"+v.stringify(this.searchForm)+"&language="+k().language;window.open(a,"_blank")})).catch((e=>{self.loading=!1}))},cancelClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_edit=!0},refundClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.pay_price=(Number(e.pay_price)-Number(e.refund_money)).toFixed(2),this.open_refund=!0},delClick(a){let l=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{b.storedelete({order_id:a.order_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),l.getData()}))}))},closeDialogFunc(e,a){"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},closerefundDialogFunc(e,a){"edit"==a&&(this.open_refund=e.openDialog,"success"==e.type&&this.getData())}}},O=e=>(M("data-v-91a184b7"),e=e(),U(),e),J={class:"user"},G={class:"common-seach-wrap"},H={class:"block"},K=O((()=>z("span",{class:"demonstration"},null,-1))),R={class:"product-content"},W={class:"table-wrap"},X={key:0},A={key:0,class:"orange"},Q={key:1},Z={key:2,class:"gray9"},ee=O((()=>z("br",null,null,-1))),ae={class:"gray9"},le={key:1},te={class:"gray9"},re={class:"pagination"};const oe=w(Y,[["render",function(e,b,y,f,v,$){const k=a,w=l,M=t,U=r,T=o,B=s,Y=i,O=n,oe=d,se=u,ie=p,ne=c,de=m,ue=_,pe=h,ce=j("Cancel"),me=j("refund"),_e=C("auth"),he=g;return x(),D("div",J,[z("div",G,[F(oe,{size:"small",inline:!0,model:v.searchForm,class:"demo-form-inline"},{default:V((()=>[F(M,{label:""},{default:V((()=>[F(w,{modelValue:v.searchForm.time_type,"onUpdate:modelValue":b[0]||(b[0]=e=>v.searchForm.time_type=e),class:"radio-search"},{default:V((()=>[F(k,{label:"1"},{default:V((()=>[S(N(e.$t("今天")),1)])),_:1}),F(k,{label:"2"},{default:V((()=>[S(N(e.$t("昨天")),1)])),_:1}),F(k,{label:"3"},{default:V((()=>[S(N(e.$t("一周")),1)])),_:1}),F(k,{label:"0"},{default:V((()=>[S(N(e.$t("全部")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1}),F(M,{label:e.$t("订单类型")},{default:V((()=>[F(T,{size:"small",modelValue:v.searchForm.order_source,"onUpdate:modelValue":b[1]||(b[1]=e=>v.searchForm.order_source=e),placeholder:e.$t("请选择")},{default:V((()=>[F(U,{label:e.$t("全部"),value:0},null,8,["label"]),F(U,{label:e.$t("收银订单"),value:20},null,8,["label"]),F(U,{label:e.$t("桌台订单"),value:10},null,8,["label"])])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),F(M,{label:e.$t("订单号")},{default:V((()=>[F(B,{size:"small",modelValue:v.searchForm.order_no,"onUpdate:modelValue":b[2]||(b[2]=e=>v.searchForm.order_no=e),placeholder:e.$t("订单号")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),F(M,{label:e.$t("用餐方式")},{default:V((()=>[F(T,{size:"small",modelValue:v.searchForm.style_id,"onUpdate:modelValue":b[3]||(b[3]=e=>v.searchForm.style_id=e),placeholder:e.$t("请选择")},{default:V((()=>[F(U,{label:e.$t("全部"),value:""},null,8,["label"]),(x(!0),D(E,null,L(v.exStyle,((e,a)=>(x(),P(U,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),F(M,{label:e.$t("起始时间")},{default:V((()=>[z("div",H,[K,F(Y,{size:"small",modelValue:v.searchForm.create_time,"onUpdate:modelValue":b[4]||(b[4]=e=>v.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"~","start-placeholder":e.$t("开始日期"),"end-placeholder":e.$t("结束日期")},null,8,["modelValue","start-placeholder","end-placeholder"])])])),_:1},8,["label"]),F(M,null,{default:V((()=>[F(O,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:$.onSubmit},{default:V((()=>[S(N(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1}),F(M,null,{default:V((()=>[q((x(),P(O,{size:"small",type:"primary",onClick:$.onExport},{default:V((()=>[S(N(e.$t("导出")),1)])),_:1},8,["onClick"])),[[_e,"/store/operate/export"]])])),_:1})])),_:1},8,["model"])]),z("div",R,[z("div",W,[F(ne,{size:"small",modelValue:v.activeName,"onUpdate:modelValue":b[5]||(b[5]=e=>v.activeName=e),onTabChange:$.handleClick},{default:V((()=>[F(ie,{label:e.$t("全部订单"),name:"all"},{label:V((()=>[z("span",null,[S(N(e.$t("全部订单"))+" ",1),F(se,{size:""},{default:V((()=>[S(N(v.order_count.all),1)])),_:1})])])),_:1},8,["label"]),F(ie,{label:e.$t("待付款"),name:"payment"},{label:V((()=>[z("span",null,[S(N(e.$t("待付款"))+" ",1),F(se,{size:""},{default:V((()=>[S(N(v.order_count.payment),1)])),_:1})])])),_:1},8,["label"]),F(ie,{label:e.$t("已取消"),name:"cancel"},{label:V((()=>[z("span",null,[S(N(e.$t("已取消"))+" ",1),F(se,{size:""},{default:V((()=>[S(N(v.order_count.cancel),1)])),_:1})])])),_:1},8,["label"]),F(ie,{label:e.$t("已完成"),name:"complete"},{label:V((()=>[z("span",null,[S(N(e.$t("已完成"))+" ",1),F(se,{size:""},{default:V((()=>[S(N(v.order_count.complete),1)])),_:1})])])),_:1},8,["label"])])),_:1},8,["modelValue","onTabChange"]),q((x(),P(ue,{size:"small",data:v.tableData.data,border:"",style:{width:"100%"}},{default:V((()=>[F(de,{prop:"order_source_text",label:e.$t("订单类型")},null,8,["label"]),F(de,{prop:"table_no",label:e.$t("桌号/序号")},{default:V((e=>[z("div",null,N(e.row.table_no?e.row.table_no:e.row.callNo||"-"),1)])),_:1},8,["label"]),F(de,{prop:"order_no",label:e.$t("订单号")},null,8,["label"]),F(de,{prop:"order_status",label:e.$t("状态")},{default:V((a=>[z("div",null,N(10==a.row.order_status.value?e.$t("待付款"):20==a.row.order_status.value?e.$t("已取消"):e.$t("已完成")),1)])),_:1},8,["label"]),F(de,{prop:"pay_time_text",label:e.$t("支付时间")},null,8,["label"]),F(de,{prop:"order_price",label:e.$t("订单金额")},{default:V((e=>{var a,l;return[z("p",null,[S(N(v.currency.unit)+N(e.row.order_price)+" ",1),1==v.currency.is_open?(x(),D("span",X,N(null==(a=v.currency.vices)?void 0:a.vice_unit)+N((Number(e.row.order_price)*Number(null==(l=v.currency.vices)?void 0:l.unit_rate)).toFixed(2)),1)):I("",!0)])]})),_:1},8,["label"]),F(de,{prop:"pay_price",label:e.$t("实付金额"),"show-overflow-tooltip":""},{default:V((a=>[z("div",null,[30==a.row.order_status.value?(x(),D("div",A,N(v.currency.unit)+N(a.row.pay_price),1)):(x(),D("div",Q,"-")),a.row.refund_money>0?(x(),D("p",Z,"("+N(e.$t("退款金额："))+N(a.row.refund_money)+")",1)):I("",!0)])])),_:1},8,["label"]),F(de,{prop:"",label:e.$t("买家"),"show-overflow-tooltip":""},{default:V((e=>[e.row.user?(x(),D(E,{key:0},[z("span",null,N(e.row.user.nickName),1),ee,z("span",ae,"ID：("+N(e.row.user.user_id)+")",1)],64)):(x(),D("p",le,"-"))])),_:1},8,["label"]),F(de,{prop:"pay_type.text",label:e.$t("支付方式")},{default:V((e=>[z("div",null,[z("span",te,N(30==e.row.order_status.value?e.row.pay_type.text:"-"),1)])])),_:1},8,["label"]),F(de,{fixed:"right",label:e.$t("操作"),width:"160"},{default:V((a=>[z("div",null,[q((x(),P(O,{onClick:e=>$.addClick(a.row),type:"primary",link:"",size:"small"},{default:V((()=>[S(N(e.$t("详情")),1)])),_:2},1032,["onClick"])),[[_e,"/store/order/detail"]]),30==a.row.order_status.value?q((x(),P(O,{key:0,onClick:e=>$.refundClick(a.row),type:"danger",link:"",size:"small"},{default:V((()=>[S(N(e.$t("退款")),1)])),_:2},1032,["onClick"])),[[_e,"/store/operate/refund"]]):I("",!0),10==a.row.order_status.value?q((x(),P(O,{key:1,onClick:e=>$.cancelClick(a.row),type:"danger",link:"",size:"small"},{default:V((()=>[S(N(e.$t("取消")),1)])),_:2},1032,["onClick"])),[[_e,"/store/operate/order_cancel"]]):I("",!0),20==a.row.order_status.value?q((x(),P(O,{key:2,onClick:e=>$.delClick(a.row),type:"danger",link:"",size:"small"},{default:V((()=>[S(N(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[_e,"/store/order/delete"]]):I("",!0)])])),_:1},8,["label"])])),_:1},8,["data"])),[[he,v.loading]])]),z("div",re,[F(pe,{onSizeChange:$.handleSizeChange,onCurrentChange:$.handleCurrentChange,background:"","current-page":v.curPage,"page-size":v.pageSize,layout:"total, prev, pager, next, jumper",total:v.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),v.open_edit?(x(),P(ce,{key:0,open_edit:v.open_edit,order_no:v.order_no,order_id:v.order_id,onCloseDialog:b[6]||(b[6]=e=>$.closeDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):I("",!0),v.open_refund?(x(),P(me,{key:1,open_edit:v.open_refund,order_no:v.order_no,order_id:v.order_id,pay_price:v.pay_price,onCloseDialog:b[7]||(b[7]=e=>$.closerefundDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id","pay_price"])):I("",!0)])}],["__scopeId","data-v-91a184b7"]]);export{oe as default};
