import{d as e,g as a,h as t,p as r,q as o,H as l,i as s,e as i,F as d,I as n,J as p,m as u,o as c,B as _,v as m}from"./element-plus-c8084613.js";import{O as h}from"./order-30e9716c.js";import y from"./cancel-0efa594e.js";import g from"./refund-cf13cc60.js";import{q as f}from"./qs-49804a56.js";import{u as v}from"./index-786c9422.js";import{_ as k}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as w,an as b,o as C,c as j,a as x,O as z,R as D,P as S,a7 as F,S as V,V as T,W as E,_ as M,L as N,X as P,bm as $,bk as B}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vuedraggable-a472da53.js";import"./vue-944abb17.js";import"./sortablejs-b4c145c4.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{token:I}=v(),q={components:{Cancel:y,refund:g},data:()=>({activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",style_id:"",create_time:""},exStyle:[],shopList:[],create_time:"",order_count:{all:0,payment:0,delivery:0,received:0,cancel:0},open_edit:!1,open_refund:!1,order_no:0,deliver_name:"",deliverType:"",order_id:0,token:I}),created(){this.getData()},methods:{arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,h.takeOrderlist(a,!0).then((a=>{let t=[];for(let e=0;e<a.data.list.data.length;e++){let r=a.data.list.data[e],o={order_no:r.order_no,create_time:r.create_time,order_source:r.order_source,order_source_text:r.order_source_text,is_top_row:!0,order_status:r.order_status.value};t.push(o),t.push(r)}e.tableData.data=t,e.deliver_name=a.data.deliver_name,e.deliverType=a.data.deliver.default,e.totalDataNumber=a.data.list.total,e.exStyle=a.data.ex_style,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/takeout/order/detail",query:{order_id:a}})},verifyClick(a){let t=this,r={};e.confirm("是否确认此操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.order_id=a.order_id,h.takeExtract(r,!0).then((e=>{t.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),t.getData()})).catch((e=>{t.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消操作"})}))},senDada(a){let t=this,r={};e.confirm("是否确认此操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.order_id=a.order_id,h.sendDada(r,!0).then((e=>{t.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),t.getData()})).catch((e=>{t.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消操作"})}))},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/takeout.operate/export?"+f.stringify(this.searchForm)},cancelClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_edit=!0},refundClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_refund=!0},closeDialogFunc(e,a){"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},closerefundDialogFunc(e,a){"edit"==a&&(this.open_refund=e.openDialog,"success"==e.type&&this.getData())}}},O={class:"user"},Y={class:"common-seach-wrap"},U={class:"block"},J=(e=>($("data-v-668958fd"),e=e(),B(),e))((()=>x("span",{class:"demonstration"},null,-1))),L={class:"product-content"},G={class:"table-wrap"},H={key:0,class:"order-code"},K={class:"c_main"},R={class:"pl16"},W={key:0,class:"pl16"},X={class:"pic"},Z={alt:""},A={class:"info"},Q={class:"name gray3 product-name"},ee={key:0,class:"gray9"},ae={key:1,class:"orange"},te={class:"d-c-c d-c"},re={class:"orange"},oe={class:"gray3"},le={key:0},se={class:"orange"},ie={class:"gray9"},de={class:"gray9"},ne={key:0},pe={class:"gray9"},ue={key:0},ce={key:0},_e={class:"gray9"},me={key:0},he={class:"green"},ye={key:0},ge={key:0},fe={class:"pagination"};const ve=k(q,[["render",function(e,h,y,g,f,v){const k=a,$=t,B=r,I=o,q=l,ve=s,ke=i,we=d,be=n,Ce=p,je=u,xe=c,ze=_,De=w("Cancel"),Se=w("refund"),Fe=b("img-url"),Ve=b("auth"),Te=m;return C(),j("div",O,[x("div",Y,[z(ke,{size:"small",inline:!0,model:f.searchForm,class:"demo-form-inline"},{default:D((()=>[z($,{label:"订单号"},{default:D((()=>[z(k,{size:"small",modelValue:f.searchForm.order_no,"onUpdate:modelValue":h[0]||(h[0]=e=>f.searchForm.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),z($,{label:"配送方式"},{default:D((()=>[z(I,{size:"small",modelValue:f.searchForm.style_id,"onUpdate:modelValue":h[1]||(h[1]=e=>f.searchForm.style_id=e),placeholder:"请选择"},{default:D((()=>[z(B,{label:"全部",value:""}),(C(!0),j(S,null,F(f.exStyle,((e,a)=>(C(),V(B,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),z($,{label:"起始时间"},{default:D((()=>[x("div",U,[J,z(q,{size:"small",modelValue:f.searchForm.create_time,"onUpdate:modelValue":h[2]||(h[2]=e=>f.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),z($,null,{default:D((()=>[z(ve,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:v.onSubmit},{default:D((()=>[T("查询")])),_:1},8,["onClick"])])),_:1}),z($,null,{default:D((()=>[z(ve,{size:"small",type:"success",onClick:v.onExport},{default:D((()=>[T("导出")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),x("div",L,[x("div",G,[z(Ce,{modelValue:f.activeName,"onUpdate:modelValue":h[3]||(h[3]=e=>f.activeName=e),onTabChange:v.handleClick},{default:D((()=>[z(be,{label:"全部订单",name:"all"},{label:D((()=>[x("span",null,[T("全部订单 "),z(we,{size:""},{default:D((()=>[T(E(f.order_count.all),1)])),_:1})])])),_:1}),z(be,{label:"未付款",name:"payment"},{label:D((()=>[x("span",null,[T("未付款 "),z(we,{size:""},{default:D((()=>[T(E(f.order_count.payment),1)])),_:1})])])),_:1}),z(be,{label:"进行中",name:"process"},{label:D((()=>[x("span",null,[T("进行中 "),z(we,{size:""},{default:D((()=>[T(E(f.order_count.process),1)])),_:1})])])),_:1}),z(be,{label:"已取消",name:"cancel"},{label:D((()=>[x("span",null,[T("已取消 "),z(we,{size:""},{default:D((()=>[T(E(f.order_count.cancel),1)])),_:1})])])),_:1}),z(be,{label:"已完成",name:"complete"},{label:D((()=>[x("span",null,[T("已完成 "),z(we,{size:""},{default:D((()=>[T(E(f.order_count.complete),1)])),_:1})])])),_:1})])),_:1},8,["modelValue","onTabChange"]),M((C(),V(xe,{size:"small",data:f.tableData.data,"span-method":v.arraySpanMethod,border:"",style:{width:"100%"}},{default:D((()=>[z(je,{prop:"order_no",label:"订单信息",width:"400"},{default:D((e=>[e.row.is_top_row?(C(),j("div",H,[x("span",{class:N(["state-text",{"state-text-red":10!=e.row.order_source}])},E(e.row.order_source_text),3),x("span",K,"订单号："+E(e.row.order_no),1),x("span",R,"下单时间："+E(e.row.create_time),1),21==e.row.order_status?(C(),j("span",W,[z(we,{effect:"dark",size:""},{default:D((()=>[T("取消申请中")])),_:1})])):P("",!0)])):(C(!0),j(S,{key:1},F(e.row.product,((e,a)=>(C(),j("div",{class:"product-info",key:a},[x("div",X,[M(x("img",Z,null,512),[[Fe,e.image.file_path]])]),x("div",A,[x("div",Q,[x("span",null,E(e.product_name),1)]),e.product_attr?(C(),j("div",ee,E(e.product_attr),1)):P("",!0),e.refund?(C(),j("div",ae,E(e.refund.type.text)+"-"+E(e.refund.status.text),1)):P("",!0)]),x("div",te,[x("div",re,"￥ "+E(e.product_price),1),x("div",oe,"x"+E(e.total_num),1)])])))),128))])),_:1}),z(je,{prop:"pay_price",label:"实付款"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",le,[x("div",se,E(e.row.pay_price),1),x("p",ie,"(含配送费："+E(e.row.express_price)+")",1),x("p",de,"(含包装费："+E(e.row.bag_price)+")",1)]))])),_:1}),z(je,{prop:"",label:"买家"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",ne,[x("div",null,E(e.row.user.nickName),1),x("div",pe,"ID：("+E(e.row.user.user_id)+")",1)]))])),_:1}),z(je,{prop:"supplier.name",label:"门店名称"}),z(je,{prop:"state_text",label:"交易状态"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",ue,E(e.row.state_text),1))])),_:1}),z(je,{prop:"pay_type.text",label:"支付方式"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",ce,[x("span",_e,E(e.row.pay_type.text),1)]))])),_:1}),z(je,{prop:"delivery_type.text",label:"配送方式"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",me,[x("span",he,E(e.row.delivery_type.text),1),30==e.row.delivery_type.value?(C(),j("span",ye,"手机号:"+E(e.row.user.mobile),1)):P("",!0)]))])),_:1}),z(je,{fixed:"right",label:"操作",width:"200"},{default:D((e=>[e.row.is_top_row?P("",!0):(C(),j("div",ge,[M((C(),V(ve,{onClick:a=>v.addClick(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T("订单详情 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/order/detail"]]),10==e.row.order_status.value&&20==e.row.pay_status.value&&0==e.row.refund_money?M((C(),V(ve,{key:0,onClick:a=>v.refundClick(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T("退款 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/Operate/refund"]]):P("",!0),10==e.row.order_status.value&&10==e.row.delivery_status.value&&20==e.row.pay_status.value?M((C(),V(ve,{key:1,onClick:a=>v.cancelClick(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T("取消 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/orderCancel"]]):P("",!0),10==e.row.order_status.value&&20==e.row.delivery_type.value&&20==e.row.pay_status.value?M((C(),V(ve,{key:2,onClick:a=>v.verifyClick(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T("核销 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/extract"]]):P("",!0),10==e.row.deliver_source&&10==e.row.order_status.value&&10==e.row.delivery_type.value&&20==e.row.pay_status.value&&20==e.row.delivery_status.value?M((C(),V(ve,{key:3,onClick:a=>v.verifyClick(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T("确认送达 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/extract"]]):P("",!0),20==e.row.pay_status.value&&0==e.row.deliver_status&&10==e.row.order_status.value&&10==e.row.delivery_type.value?M((C(),V(ve,{key:4,onClick:a=>v.senDada(e.row),type:"primary",link:"",size:"small"},{default:D((()=>[T(E(f.deliver_name),1)])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/sendOrder"]]):P("",!0)]))])),_:1})])),_:1},8,["data","span-method"])),[[Te,f.loading]])]),x("div",fe,[z(ze,{onSizeChange:v.handleSizeChange,onCurrentChange:v.handleCurrentChange,background:"","current-page":f.curPage,"page-size":f.pageSize,layout:"total, prev, pager, next, jumper",total:f.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),f.open_edit?(C(),V(De,{key:0,open_edit:f.open_edit,order_no:f.order_no,order_id:f.order_id,onCloseDialog:h[4]||(h[4]=e=>v.closeDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):P("",!0),f.open_refund?(C(),V(Se,{key:1,open_edit:f.open_refund,order_no:f.order_no,order_id:f.order_id,onCloseDialog:h[5]||(h[5]=e=>v.closerefundDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):P("",!0)])}],["__scopeId","data-v-668958fd"]]);export{ve as default};