import{g as e,h as a,p as t,q as l,H as r,i as s,e as o,F as i,I as n,J as p,m as d,o as u,B as c,v as m}from"./element-plus-c8084613.js";import{G as _}from"./group-38613956.js";import{q as h}from"./qs-49804a56.js";import{u as g}from"./index-7d657154.js";import{_ as f}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as b,o as y,c as v,a as w,O as j,R as k,S as z,P as C,a7 as x,X as D,V as S,W as V,_ as F,bm as I,bk as N}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{userInfo:P}=g(),{token:q}=g(),L={components:{},data:()=>({activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",shop_supplier_id:"",create_time:""},supplierList:[],order_count:{all:0,payment:0,delivery:0,received:0,cancel:0,refund:0},user_type:"",token:q}),created(){this.getBaseInof(),this.getData()},methods:{async getBaseInof(){this.user_type=P.user_type,0!=this.user_type&&(this.activeName="complete")},arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,_.orderList(a,!0).then((a=>{let t=[];for(let e=0;e<a.data.list.data.length;e++){let l=a.data.list.data[e],r={order_no:l.order_no,create_time:l.create_time,is_top_row:!0,order_status:l.order_status.value};t.push(r),t.push(l)}e.tableData.data=t,e.totalDataNumber=a.data.list.total,e.supplierList=a.data.supplierList,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/plus/group/order/detail",query:{order_id:a}})},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/plus.group.order/export?"+h.stringify(this.searchForm)}}},B={class:"user"},M={class:"common-seach-wrap"},U={class:"block"},Y=(e=>(I("data-v-9d8480bb"),e=e(),N(),e))((()=>w("span",{class:"demonstration"},null,-1))),T={class:"product-content"},E={class:"table-wrap"},G={key:0,class:"order-code"},J={class:"c_main"},H={class:"pl16"},O={class:"pic"},R={alt:""},W={class:"info"},X={class:"name gray3 product-name"},$={class:"d-c-c d-c"},A={class:"orange"},K={class:"gray3"},Q={key:0},Z={class:"orange"},ee={key:0},ae={class:"gray9"},te={key:0},le={key:0},re={class:"gray9"},se={key:0},oe={class:"pagination"};const ie=f(L,[["render",function(_,h,g,f,I,N){const P=e,q=a,L=t,ie=l,ne=r,pe=s,de=o,ue=i,ce=n,me=p,_e=d,he=u,ge=c,fe=b("img-url"),be=b("auth"),ye=m;return y(),v("div",B,[w("div",M,[j(de,{size:"small",inline:!0,model:I.searchForm,class:"demo-form-inline"},{default:k((()=>[j(q,{label:"订单号"},{default:k((()=>[j(P,{size:"small",modelValue:I.searchForm.order_no,"onUpdate:modelValue":h[0]||(h[0]=e=>I.searchForm.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),0==I.user_type?(y(),z(q,{key:0,label:"使用门店"},{default:k((()=>[j(ie,{size:"small",modelValue:I.searchForm.shop_supplier_id,"onUpdate:modelValue":h[1]||(h[1]=e=>I.searchForm.shop_supplier_id=e),placeholder:"请选择"},{default:k((()=>[j(L,{label:"全部",value:""}),(y(!0),v(C,null,x(I.supplierList,((e,a)=>(y(),z(L,{key:a,label:e.name,value:e.shop_supplier_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):D("",!0),j(q,{label:"起始时间"},{default:k((()=>[w("div",U,[Y,j(ne,{size:"small",modelValue:I.searchForm.create_time,"onUpdate:modelValue":h[2]||(h[2]=e=>I.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),j(q,null,{default:k((()=>[j(pe,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:N.onSubmit},{default:k((()=>[S("查询")])),_:1},8,["onClick"])])),_:1}),j(q,null,{default:k((()=>[j(pe,{size:"small",type:"success",onClick:N.onExport},{default:k((()=>[S("导出")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),w("div",T,[w("div",E,[0==I.user_type?(y(),z(me,{key:0,modelValue:I.activeName,"onUpdate:modelValue":h[3]||(h[3]=e=>I.activeName=e),onTabChange:N.handleClick},{default:k((()=>[j(ce,{label:"全部订单",name:"all"},{label:k((()=>[w("span",null,[S(" 全部订单 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.all),1)])),_:1})])])),_:1}),j(ce,{label:"待付款",name:"payment"},{label:k((()=>[w("span",null,[S(" 待付款 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.payment),1)])),_:1})])])),_:1}),j(ce,{label:"待使用",name:"process"},{label:k((()=>[w("span",null,[S("待使用 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.process),1)])),_:1})])])),_:1}),j(ce,{label:"已取消",name:"cancel"},{label:k((()=>[w("span",null,[S("已取消 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.cancel),1)])),_:1})])])),_:1}),j(ce,{label:"已退款",name:"refund"},{label:k((()=>[w("span",null,[S("已退款 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.refund),1)])),_:1})])])),_:1}),j(ce,{label:"已完成",name:"complete"},{label:k((()=>[w("span",null,[S("已完成 "),j(ue,{size:""},{default:k((()=>[S(V(I.order_count.complete),1)])),_:1})])])),_:1})])),_:1},8,["modelValue","onTabChange"])):D("",!0),F((y(),z(he,{size:"small",data:I.tableData.data,"span-method":N.arraySpanMethod,border:"",style:{width:"100%"}},{default:k((()=>[j(_e,{prop:"order_no",label:"订单信息",width:"400"},{default:k((e=>[e.row.is_top_row?(y(),v("div",G,[w("span",J,"订单号："+V(e.row.order_no),1),w("span",H,"下单时间："+V(e.row.create_time),1)])):(y(!0),v(C,{key:1},x(e.row.product,((e,a)=>(y(),v("div",{class:"product-info",key:a},[w("div",O,[F(w("img",R,null,512),[[fe,e.image.file_path]])]),w("div",W,[w("div",X,[w("span",null,V(e.group_name),1)])]),w("div",$,[w("div",A,"￥ "+V(e.group_price),1),w("div",K,"x"+V(e.total_num),1)])])))),128))])),_:1}),j(_e,{prop:"pay_price",label:"实付款"},{default:k((e=>[e.row.is_top_row?D("",!0):(y(),v("div",Q,[w("div",Z,V(e.row.pay_price),1)]))])),_:1}),j(_e,{prop:"",label:"买家"},{default:k((e=>[!e.row.is_top_row&&e.row.user?(y(),v("div",ee,[w("div",null,V(e.row.user.nickName),1),w("div",ae,"ID：("+V(e.row.user.user_id)+")",1)])):D("",!0)])),_:1}),j(_e,{prop:"supplier.name",label:"使用门店"}),j(_e,{prop:"state_text",label:"交易状态"},{default:k((e=>[e.row.is_top_row?D("",!0):(y(),v("div",te,V(e.row.state_text),1))])),_:1}),j(_e,{prop:"pay_type.text",label:"支付方式"},{default:k((e=>[e.row.is_top_row?D("",!0):(y(),v("div",le,[w("span",re,V(e.row.pay_type.text),1)]))])),_:1}),j(_e,{fixed:"right",label:"操作",width:"160"},{default:k((e=>[e.row.is_top_row?D("",!0):(y(),v("div",se,[F((y(),z(pe,{onClick:a=>N.addClick(e.row),type:"primary",link:"",size:"small"},{default:k((()=>[S("订单详情 ")])),_:2},1032,["onClick"])),[[be,"/store/order/detail"]])]))])),_:1})])),_:1},8,["data","span-method"])),[[ye,I.loading]])]),w("div",oe,[j(ge,{onSizeChange:N.handleSizeChange,onCurrentChange:N.handleCurrentChange,background:"","current-page":I.curPage,"page-size":I.pageSize,layout:"total, prev, pager, next, jumper",total:I.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-9d8480bb"]]);export{ie as default};
