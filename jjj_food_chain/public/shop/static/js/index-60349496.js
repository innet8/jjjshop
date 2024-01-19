import{d as e,E as a,g as t,h as r,q as o,r as l,G as s,i,e as n,D as d,H as c,I as p,m as u,n as _,A as m,v as h}from"./element-plus-d03e850c.js";import{O as g}from"./order-2e39008e.js";import y from"./cancel-fe4b59a1.js";import f from"./refund-4d7b92a3.js";import{l as b}from"./qs-a8eee860.js";import{a as w}from"./index-0eefa19c.js";import{_ as v}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as k,ap as j,o as $,c as C,a as x,P as D,S as z,Q as S,a8 as F,T as V,W as L,X as N,$ as P,M as T,Y as q}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vuedraggable-e6f803aa.js";import"./vue-93bf25b5.js";import"./sortablejs-45d6ab95.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{token:M,currency:Y}=w(),E={components:{Cancel:y,refund:f},data:()=>({currency:Y,activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",style_id:"",create_time:""},exStyle:[],shopList:[],create_time:"",order_count:{all:0,payment:0,delivery:0,received:0,cancel:0},open_edit:!1,open_refund:!1,order_no:0,order_id:0,token:M}),created(){this.getData()},methods:{arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,g.storeOrderlist(a,!0).then((a=>{let t=[];for(let e=0;e<a.data.list.data.length;e++){let r=a.data.list.data[e],o={order_no:r.order_no,create_time:r.create_time,order_source:r.order_source,order_source_text:r.order_source_text,is_top_row:!0,order_status:r.order_status.value,table_no:r.table_no};t.push(o),t.push(r)}e.tableData.data=t,e.totalDataNumber=a.data.list.total,e.exStyle=a.data.ex_style,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/store/order/detail",query:{order_id:a}})},verifyClick(t){let r=this,o={};e.confirm("确定要核销吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{o.order_id=t.order_id,g.storeExtract(o,!0).then((e=>{r.loading=!1,a({message:"恭喜你，操作成功",type:"success"}),r.getData()})).catch((e=>{r.loading=!1}))})).catch((()=>{a({type:"info",message:"已取消核销"})}))},getLogistics(e){let a=this,t={order_id:e.order_id};a.loading=!0,g.queryLogistics(t,!0).then((e=>{a.logisticsData=e.data.express.list,a.loading=!1,a.openLogistics()})).catch((e=>{a.loading=!1}))},openLogistics(){this.isLogistics=!0},closeLogistics(){this.isLogistics=!1},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/store.operate/export?"+b.stringify(this.searchForm)},cancelClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_edit=!0},refundClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_refund=!0},closeDialogFunc(e,a){"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},closerefundDialogFunc(e,a){"edit"==a&&(this.open_refund=e.openDialog,"success"==e.type&&this.getData())}}},I={class:"user"},U={class:"common-seach-wrap"},B={class:"block"},A=x("span",{class:"demonstration"},null,-1),O={class:"product-content"},W={class:"table-wrap"},G={key:0,class:"order-code"},H={class:"c_main"},Q={class:"c_main"},X={class:""},J={key:0,class:""},K={class:"pic"},R={alt:""},Z={class:"info"},ee={class:"name gray3 product-name"},ae={key:0,class:"gray9"},te={key:1,class:"orange"},re={class:"d-c-c d-c"},oe={class:"orange"},le={class:"gray3"},se={key:0},ie={key:0},ne={class:"orange"},de={key:0,class:"gray9"},ce={key:1,class:"gray9"},pe={key:2,class:"gray9"},ue={key:0},_e={class:"gray9"},me={key:0},he={class:"gray9"},ge={key:0},ye={class:"pagination"};const fe=v(E,[["render",function(e,a,g,y,f,b){const w=t,v=r,M=o,Y=l,E=s,fe=i,be=n,we=d,ve=c,ke=p,je=u,$e=_,Ce=m,xe=k("Cancel"),De=k("refund"),ze=j("img-url"),Se=j("auth"),Fe=h;return $(),C("div",I,[x("div",U,[D(be,{size:"small",inline:!0,model:f.searchForm,class:"demo-form-inline"},{default:z((()=>[D(v,{label:e.$t("订单号")},{default:z((()=>[D(w,{size:"small",modelValue:f.searchForm.order_no,"onUpdate:modelValue":a[0]||(a[0]=e=>f.searchForm.order_no=e),placeholder:e.$t("请输入订单号")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),D(v,{label:e.$t("配送方式")},{default:z((()=>[D(Y,{size:"small",modelValue:f.searchForm.style_id,"onUpdate:modelValue":a[1]||(a[1]=e=>f.searchForm.style_id=e),placeholder:e.$t("请选择")},{default:z((()=>[D(M,{label:e.$t("全部"),value:""},null,8,["label"]),($(!0),C(S,null,F(f.exStyle,((e,a)=>($(),V(M,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),D(v,{label:e.$t("起始时间")},{default:z((()=>[x("div",B,[A,D(E,{size:"small",modelValue:f.searchForm.create_time,"onUpdate:modelValue":a[2]||(a[2]=e=>f.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":e.$t("至"),"start-placeholder":e.$t("开始日期"),"end-placeholder":e.$t("结束日期")},null,8,["modelValue","range-separator","start-placeholder","end-placeholder"])])])),_:1},8,["label"]),D(v,null,{default:z((()=>[D(fe,{size:"small",type:"primary",icon:"Search",onClick:b.onSubmit},{default:z((()=>[L(N(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1}),D(v,null,{default:z((()=>[D(fe,{size:"small",type:"success",onClick:b.onExport},{default:z((()=>[L(N(e.$t("导出")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),x("div",O,[x("div",W,[D(ke,{modelValue:f.activeName,"onUpdate:modelValue":a[3]||(a[3]=e=>f.activeName=e),onTabChange:b.handleClick},{default:z((()=>[D(ve,{label:e.$t("全部订单"),name:"all"},{label:z((()=>[x("span",null,[L(N(e.$t("全部订单"))+" ",1),D(we,{size:""},{default:z((()=>[L(N(f.order_count.all),1)])),_:1})])])),_:1},8,["label"]),D(ve,{label:e.$t("未付款"),name:"payment"},{label:z((()=>[x("span",null,[L(N(e.$t("未付款"))+" ",1),D(we,{size:""},{default:z((()=>[L(N(f.order_count.payment),1)])),_:1})])])),_:1},8,["label"]),D(ve,{label:e.$t("进行中"),name:"process"},{label:z((()=>[x("span",null,[L(N(e.$t("进行中"))+" ",1),D(we,{size:""},{default:z((()=>[L(N(f.order_count.process),1)])),_:1})])])),_:1},8,["label"]),D(ve,{label:e.$t("已取消"),name:"cancel"},{label:z((()=>[x("span",null,[L(N(e.$t("已取消"))+" ",1),D(we,{size:""},{default:z((()=>[L(N(f.order_count.cancel),1)])),_:1})])])),_:1},8,["label"]),D(ve,{label:e.$t("已完成"),name:"complete"},{label:z((()=>[x("span",null,[L(N(e.$t("已完成"))+" ",1),D(we,{size:""},{default:z((()=>[L(N(f.order_count.complete),1)])),_:1})])])),_:1},8,["label"])])),_:1},8,["modelValue","onTabChange"]),P(($(),V($e,{size:"small",data:f.tableData.data,"span-method":b.arraySpanMethod,border:"",style:{width:"100%"}},{default:z((()=>[D(je,{prop:"order_no",label:e.$t("订单信息"),width:"400"},{default:z((a=>[a.row.is_top_row?($(),C("div",G,[x("span",{class:T(["state-text",{"state-text-red":10!=a.row.order_source}])},N(a.row.order_source_text),3),x("span",H,N(e.$t("订单号："))+N(a.row.order_no),1),x("span",Q,N(e.$t("桌号："))+N(a.row.table_no),1),x("span",X,N(e.$t("下单时间："))+N(a.row.create_time),1),21==a.row.order_status?($(),C("span",J,[D(we,{effect:"dark",size:""},{default:z((()=>[L(N(e.$t("取消申请中")),1)])),_:1})])):q("",!0)])):($(!0),C(S,{key:1},F(a.row.product,((e,a)=>($(),C("div",{class:"product-info",key:a},[x("div",K,[P(x("img",R,null,512),[[ze,e.image.file_path]])]),x("div",Z,[x("div",ee,[x("span",null,N(e.product_name_text),1)]),e.product_attr?($(),C("div",ae,N(e.product_attr),1)):q("",!0),e.refund?($(),C("div",te,N(e.refund.type.text)+"-"+N(e.refund.status.text),1)):q("",!0)]),x("div",re,[x("div",oe,"￥ "+N(e.product_price),1),x("div",le,"x"+N(e.total_num),1)])])))),128))])),_:1},8,["label"]),D(je,{prop:"state_text",label:e.$t("交易状态")},{default:z((e=>[e.row.is_top_row?q("",!0):($(),C("div",se,N(e.row.state_text),1))])),_:1},8,["label"]),D(je,{prop:"pay_time_text",label:e.$t("支付时间")},null,8,["label"]),D(je,{prop:"order_price",label:e.$t("订单金额")},{default:z((e=>[x("p",null,N(f.currency.unit)+N(e.row.order_price),1)])),_:1},8,["label"]),D(je,{prop:"pay_price",label:e.$t("实付款")},{default:z((a=>[a.row.is_top_row?q("",!0):($(),C("div",ie,[x("div",ne,N(f.currency.unit)+N(a.row.pay_price),1),a.row.service_money>0?($(),C("p",de,"("+N(e.$t("含服务费："))+N(a.row.service_money)+")",1)):q("",!0),a.row.bag_price>0?($(),C("p",ce,"("+N(e.$t("含包装费："))+N(a.row.bag_price)+") ",1)):q("",!0),a.row.refund_money>0?($(),C("p",pe,"("+N(e.$t("退款金额："))+N(a.row.refund_money)+") ",1)):q("",!0)]))])),_:1},8,["label"]),D(je,{prop:"",label:e.$t("买家")},{default:z((e=>[!e.row.is_top_row&&e.row.user?($(),C("div",ue,[x("div",null,N(e.row.user.nickName),1),x("div",_e,"ID：("+N(e.row.user.user_id)+")",1)])):q("",!0)])),_:1},8,["label"]),D(je,{prop:"pay_type.text",label:e.$t("支付方式")},{default:z((e=>[e.row.is_top_row?q("",!0):($(),C("div",me,[x("span",he,N(e.row.pay_type.text),1)]))])),_:1},8,["label"]),D(je,{fixed:"right",label:e.$t("操作"),width:"160"},{default:z((a=>[a.row.is_top_row?q("",!0):($(),C("div",ge,[P(($(),V(fe,{onClick:e=>b.addClick(a.row),type:"primary",link:"",size:"small"},{default:z((()=>[L(N(e.$t("订单详情")),1)])),_:2},1032,["onClick"])),[[Se,"/store/order/detail"]]),10==a.row.order_status.value&&20==a.row.pay_status.value&&0==a.row.refund_money?P(($(),V(fe,{key:0,onClick:e=>b.refundClick(a.row),type:"primary",link:"",size:"small"},{default:z((()=>[L(N(e.$t("退款")),1)])),_:2},1032,["onClick"])),[[Se,"/store/operate/refund"]]):q("",!0),10==a.row.order_status.value&&20==a.row.pay_status.value?P(($(),V(fe,{key:1,onClick:e=>b.cancelClick(a.row),type:"primary",link:"",size:"small"},{default:z((()=>[L(N(e.$t("取消")),1)])),_:2},1032,["onClick"])),[[Se,"/store/operate/orderCancel"]]):q("",!0)]))])),_:1},8,["label"])])),_:1},8,["data","span-method"])),[[Fe,f.loading]])]),x("div",ye,[D(Ce,{onSizeChange:b.handleSizeChange,onCurrentChange:b.handleCurrentChange,background:"","current-page":f.curPage,"page-size":f.pageSize,layout:"total, prev, pager, next, jumper",total:f.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),f.open_edit?($(),V(xe,{key:0,open_edit:f.open_edit,order_no:f.order_no,order_id:f.order_id,onCloseDialog:a[4]||(a[4]=e=>b.closeDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):q("",!0),f.open_refund?($(),V(De,{key:1,open_edit:f.open_refund,order_no:f.order_no,order_id:f.order_id,onCloseDialog:a[5]||(a[5]=e=>b.closerefundDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):q("",!0)])}]]);export{fe as default};
