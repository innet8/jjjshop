import{d as e,g as a,h as t,r,s as o,H as l,i as s,e as i,F as d,I as n,J as p,m as u,o as c,B as _,v as m}from"./element-plus-33e0d8cc.js";import{O as y}from"./order-aba0d8d2.js";import h from"./cancel-19ee0047.js";import g from"./refund-d8a98012.js";import{l as v}from"./qs-a8eee860.js";import{u as f}from"./index-188a77f0.js";import{_ as k}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as w,ap as b,o as C,c as j,a as x,P as D,S as z,Q as S,a8 as F,T as V,W as T,X as M,$ as N,M as P,Y as $,bb as E,b9 as B}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vuedraggable-e6f803aa.js";import"./vue-93bf25b5.js";import"./sortablejs-45d6ab95.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{token:I}=f(),Y={components:{Cancel:h,refund:g},data:()=>({activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",style_id:"",create_time:""},exStyle:[],shopList:[],create_time:"",order_count:{all:0,payment:0,delivery:0,received:0,cancel:0},open_edit:!1,open_refund:!1,order_no:0,deliver_name:"",deliverType:"",order_id:0,token:I}),created(){this.getData()},methods:{arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,y.takeOrderlist(a,!0).then((a=>{let t=[];for(let e=0;e<a.data.list.data.length;e++){let r=a.data.list.data[e],o={order_no:r.order_no,create_time:r.create_time,order_source:r.order_source,order_source_text:r.order_source_text,is_top_row:!0,order_status:r.order_status.value};t.push(o),t.push(r)}e.tableData.data=t,e.deliver_name=a.data.deliver_name,e.deliverType=a.data.deliver.default,e.totalDataNumber=a.data.list.total,e.exStyle=a.data.ex_style,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/takeout/order/detail",query:{order_id:a}})},verifyClick(a){let t=this,r={};e.confirm("是否确认此操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.order_id=a.order_id,y.takeExtract(r,!0).then((e=>{t.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),t.getData()})).catch((e=>{t.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消操作"})}))},senDada(a){let t=this,r={};e.confirm("是否确认此操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.order_id=a.order_id,y.sendDada(r,!0).then((e=>{t.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),t.getData()})).catch((e=>{t.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消操作"})}))},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/takeout.operate/export?"+v.stringify(this.searchForm)},cancelClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_edit=!0},refundClick(e){this.order_no=e.order_no,this.order_id=e.order_id,this.open_refund=!0},closeDialogFunc(e,a){"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},closerefundDialogFunc(e,a){"edit"==a&&(this.open_refund=e.openDialog,"success"==e.type&&this.getData())}}},O={class:"user"},U={class:"common-seach-wrap"},q={class:"block"},X=(e=>(E("data-v-e283b2ba"),e=e(),B(),e))((()=>x("span",{class:"demonstration"},null,-1))),A={class:"product-content"},H={class:"table-wrap"},J={key:0,class:"order-code"},L={class:"c_main"},Q={class:"pl16"},R={key:0,class:"pl16"},W={class:"pic"},G={alt:""},K={class:"info"},Z={class:"name gray3 product-name"},ee={key:0,class:"gray9"},ae={key:1,class:"orange"},te={class:"d-c-c d-c"},re={class:"orange"},oe={class:"gray3"},le={key:0},se={class:"orange"},ie={class:"gray9"},de={class:"gray9"},ne={key:0},pe={class:"gray9"},ue={key:0},ce={key:0},_e={class:"gray9"},me={key:0},ye={class:"green"},he={key:0},ge={key:0},ve={class:"pagination"};const fe=k(Y,[["render",function(e,y,h,g,v,f){const k=a,E=t,B=r,I=o,Y=l,fe=s,ke=i,we=d,be=n,Ce=p,je=u,xe=c,De=_,ze=w("Cancel"),Se=w("refund"),Fe=b("img-url"),Ve=b("auth"),Te=m;return C(),j("div",O,[x("div",U,[D(ke,{size:"small",inline:!0,model:v.searchForm,class:"demo-form-inline"},{default:z((()=>[D(E,{label:"订单号"},{default:z((()=>[D(k,{size:"small",modelValue:v.searchForm.order_no,"onUpdate:modelValue":y[0]||(y[0]=e=>v.searchForm.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),D(E,{label:"配送方式"},{default:z((()=>[D(I,{size:"small",modelValue:v.searchForm.style_id,"onUpdate:modelValue":y[1]||(y[1]=e=>v.searchForm.style_id=e),placeholder:"请选择"},{default:z((()=>[D(B,{label:"全部",value:""}),(C(!0),j(S,null,F(v.exStyle,((e,a)=>(C(),V(B,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),D(E,{label:"起始时间"},{default:z((()=>[x("div",q,[X,D(Y,{size:"small",modelValue:v.searchForm.create_time,"onUpdate:modelValue":y[2]||(y[2]=e=>v.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),D(E,null,{default:z((()=>[D(fe,{size:"small",type:"primary",icon:"Search",onClick:f.onSubmit},{default:z((()=>[T("查询")])),_:1},8,["onClick"])])),_:1}),D(E,null,{default:z((()=>[D(fe,{size:"small",type:"success",onClick:f.onExport},{default:z((()=>[T("导出")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),x("div",A,[x("div",H,[D(Ce,{modelValue:v.activeName,"onUpdate:modelValue":y[3]||(y[3]=e=>v.activeName=e),onTabChange:f.handleClick},{default:z((()=>[D(be,{label:"全部订单",name:"all"},{label:z((()=>[x("span",null,[T("全部订单 "),D(we,{size:""},{default:z((()=>[T(M(v.order_count.all),1)])),_:1})])])),_:1}),D(be,{label:"未付款",name:"payment"},{label:z((()=>[x("span",null,[T("未付款 "),D(we,{size:""},{default:z((()=>[T(M(v.order_count.payment),1)])),_:1})])])),_:1}),D(be,{label:"进行中",name:"process"},{label:z((()=>[x("span",null,[T("进行中 "),D(we,{size:""},{default:z((()=>[T(M(v.order_count.process),1)])),_:1})])])),_:1}),D(be,{label:"已取消",name:"cancel"},{label:z((()=>[x("span",null,[T("已取消 "),D(we,{size:""},{default:z((()=>[T(M(v.order_count.cancel),1)])),_:1})])])),_:1}),D(be,{label:"已完成",name:"complete"},{label:z((()=>[x("span",null,[T("已完成 "),D(we,{size:""},{default:z((()=>[T(M(v.order_count.complete),1)])),_:1})])])),_:1})])),_:1},8,["modelValue","onTabChange"]),N((C(),V(xe,{size:"small",data:v.tableData.data,"span-method":f.arraySpanMethod,border:"",style:{width:"100%"}},{default:z((()=>[D(je,{prop:"order_no",label:"订单信息",width:"400"},{default:z((e=>[e.row.is_top_row?(C(),j("div",J,[x("span",{class:P(["state-text",{"state-text-red":10!=e.row.order_source}])},M(e.row.order_source_text),3),x("span",L,"订单号："+M(e.row.order_no),1),x("span",Q,"下单时间："+M(e.row.create_time),1),21==e.row.order_status?(C(),j("span",R,[D(we,{effect:"dark",size:""},{default:z((()=>[T("取消申请中")])),_:1})])):$("",!0)])):(C(!0),j(S,{key:1},F(e.row.product,((e,a)=>(C(),j("div",{class:"product-info",key:a},[x("div",W,[N(x("img",G,null,512),[[Fe,e.image.file_path]])]),x("div",K,[x("div",Z,[x("span",null,M(e.product_name),1)]),e.product_attr?(C(),j("div",ee,M(e.product_attr),1)):$("",!0),e.refund?(C(),j("div",ae,M(e.refund.type.text)+"-"+M(e.refund.status.text),1)):$("",!0)]),x("div",te,[x("div",re,"￥ "+M(e.product_price),1),x("div",oe,"x"+M(e.total_num),1)])])))),128))])),_:1}),D(je,{prop:"pay_price",label:"实付款"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",le,[x("div",se,M(e.row.pay_price),1),x("p",ie,"(含配送费："+M(e.row.express_price)+")",1),x("p",de,"(含包装费："+M(e.row.bag_price)+")",1)]))])),_:1}),D(je,{prop:"",label:"买家"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",ne,[x("div",null,M(e.row.user.nickName),1),x("div",pe,"ID：("+M(e.row.user.user_id)+")",1)]))])),_:1}),D(je,{prop:"supplier.name",label:"门店名称"}),D(je,{prop:"state_text",label:"交易状态"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",ue,M(e.row.state_text),1))])),_:1}),D(je,{prop:"pay_type.text",label:"支付方式"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",ce,[x("span",_e,M(e.row.pay_type.text),1)]))])),_:1}),D(je,{prop:"delivery_type.text",label:"配送方式"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",me,[x("span",ye,M(e.row.delivery_type.text),1),30==e.row.delivery_type.value?(C(),j("span",he,"手机号:"+M(e.row.user.mobile),1)):$("",!0)]))])),_:1}),D(je,{fixed:"right",label:"操作",width:"200"},{default:z((e=>[e.row.is_top_row?$("",!0):(C(),j("div",ge,[N((C(),V(fe,{onClick:a=>f.addClick(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T("订单详情 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/order/detail"]]),10==e.row.order_status.value&&20==e.row.pay_status.value&&0==e.row.refund_money?N((C(),V(fe,{key:0,onClick:a=>f.refundClick(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T("退款 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/Operate/refund"]]):$("",!0),10==e.row.order_status.value&&10==e.row.delivery_status.value&&20==e.row.pay_status.value?N((C(),V(fe,{key:1,onClick:a=>f.cancelClick(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T("取消 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/orderCancel"]]):$("",!0),10==e.row.order_status.value&&20==e.row.delivery_type.value&&20==e.row.pay_status.value?N((C(),V(fe,{key:2,onClick:a=>f.verifyClick(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T("核销 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/extract"]]):$("",!0),10==e.row.deliver_source&&10==e.row.order_status.value&&10==e.row.delivery_type.value&&20==e.row.pay_status.value&&20==e.row.delivery_status.value?N((C(),V(fe,{key:3,onClick:a=>f.verifyClick(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T("确认送达 ")])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/extract"]]):$("",!0),20==e.row.pay_status.value&&0==e.row.deliver_status&&10==e.row.order_status.value&&10==e.row.delivery_type.value?N((C(),V(fe,{key:4,onClick:a=>f.senDada(e.row),type:"primary",link:"",size:"small"},{default:z((()=>[T(M(v.deliver_name),1)])),_:2},1032,["onClick"])),[[Ve,"/takeout/operate/sendOrder"]]):$("",!0)]))])),_:1})])),_:1},8,["data","span-method"])),[[Te,v.loading]])]),x("div",ve,[D(De,{onSizeChange:f.handleSizeChange,onCurrentChange:f.handleCurrentChange,background:"","current-page":v.curPage,"page-size":v.pageSize,layout:"total, prev, pager, next, jumper",total:v.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),v.open_edit?(C(),V(ze,{key:0,open_edit:v.open_edit,order_no:v.order_no,order_id:v.order_id,onCloseDialog:y[4]||(y[4]=e=>f.closeDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):$("",!0),v.open_refund?(C(),V(Se,{key:1,open_edit:v.open_refund,order_no:v.order_no,order_id:v.order_id,onCloseDialog:y[5]||(y[5]=e=>f.closerefundDialogFunc(e,"edit"))},null,8,["open_edit","order_no","order_id"])):$("",!0)])}],["__scopeId","data-v-e283b2ba"]]);export{fe as default};
