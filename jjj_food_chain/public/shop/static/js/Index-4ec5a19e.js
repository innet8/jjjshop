import{g as e,h as a,q as t,r as l,H as r,i as s,e as o,F as i,I as n,J as p,m as d,n as u,A as c,v as m}from"./element-plus-b01b3a31.js";import{G as _}from"./group-1b16e0aa.js";import{l as h}from"./qs-a8eee860.js";import{u as g}from"./index-fed3ed55.js";import{_ as f}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as y,o as b,c as v,a as w,P as j,S as k,T as z,Q as C,a8 as x,Y as D,W as S,X as F,$ as V,bb as N,b9 as I}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{userInfo:P}=g(),{token:L}=g(),Y={components:{},data:()=>({activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",shop_supplier_id:"",create_time:""},supplierList:[],order_count:{all:0,payment:0,delivery:0,received:0,cancel:0,refund:0},user_type:"",token:L}),created(){this.getBaseInof(),this.getData()},methods:{async getBaseInof(){this.user_type=P.user_type,0!=this.user_type&&(this.activeName="complete")},arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=this.searchForm;a.dataType=e.activeName,a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,_.orderList(a,!0).then((a=>{let t=[];for(let e=0;e<a.data.list.data.length;e++){let l=a.data.list.data[e],r={order_no:l.order_no,create_time:l.create_time,is_top_row:!0,order_status:l.order_status.value};t.push(r),t.push(l)}e.tableData.data=t,e.totalDataNumber=a.data.list.total,e.supplierList=a.data.supplierList,e.order_count=a.data.order_count.order_count,e.loading=!1})).catch((e=>{}))},addClick(e){let a=e.order_id;this.$router.push({path:"/plus/group/order/detail",query:{order_id:a}})},onSubmit(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/plus.group.order/export?"+h.stringify(this.searchForm)}}},M={class:"user"},T={class:"common-seach-wrap"},U={class:"block"},q=(e=>(N("data-v-438e3068"),e=e(),I(),e))((()=>w("span",{class:"demonstration"},null,-1))),B={class:"product-content"},A={class:"table-wrap"},E={key:0,class:"order-code"},X={class:"c_main"},$={class:"pl16"},G={class:"pic"},H={alt:""},J={class:"info"},Q={class:"name gray3 product-name"},W={class:"d-c-c d-c"},K={class:"orange"},O={class:"gray3"},R={key:0},Z={class:"orange"},ee={key:0},ae={class:"gray9"},te={key:0},le={key:0},re={class:"gray9"},se={key:0},oe={class:"pagination"};const ie=f(Y,[["render",function(_,h,g,f,N,I){const P=e,L=a,Y=t,ie=l,ne=r,pe=s,de=o,ue=i,ce=n,me=p,_e=d,he=u,ge=c,fe=y("img-url"),ye=y("auth"),be=m;return b(),v("div",M,[w("div",T,[j(de,{size:"small",inline:!0,model:N.searchForm,class:"demo-form-inline"},{default:k((()=>[j(L,{label:"订单号"},{default:k((()=>[j(P,{size:"small",modelValue:N.searchForm.order_no,"onUpdate:modelValue":h[0]||(h[0]=e=>N.searchForm.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),0==N.user_type?(b(),z(L,{key:0,label:"使用门店"},{default:k((()=>[j(ie,{size:"small",modelValue:N.searchForm.shop_supplier_id,"onUpdate:modelValue":h[1]||(h[1]=e=>N.searchForm.shop_supplier_id=e),placeholder:"请选择"},{default:k((()=>[j(Y,{label:"全部",value:""}),(b(!0),v(C,null,x(N.supplierList,((e,a)=>(b(),z(Y,{key:a,label:e.name,value:e.shop_supplier_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):D("",!0),j(L,{label:"起始时间"},{default:k((()=>[w("div",U,[q,j(ne,{size:"small",modelValue:N.searchForm.create_time,"onUpdate:modelValue":h[2]||(h[2]=e=>N.searchForm.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),j(L,null,{default:k((()=>[j(pe,{size:"small",type:"primary",icon:"Search",onClick:I.onSubmit},{default:k((()=>[S("查询")])),_:1},8,["onClick"])])),_:1}),j(L,null,{default:k((()=>[j(pe,{size:"small",type:"success",onClick:I.onExport},{default:k((()=>[S("导出")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),w("div",B,[w("div",A,[0==N.user_type?(b(),z(me,{key:0,modelValue:N.activeName,"onUpdate:modelValue":h[3]||(h[3]=e=>N.activeName=e),onTabChange:I.handleClick},{default:k((()=>[j(ce,{label:"全部订单",name:"all"},{label:k((()=>[w("span",null,[S(" 全部订单 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.all),1)])),_:1})])])),_:1}),j(ce,{label:"待付款",name:"payment"},{label:k((()=>[w("span",null,[S(" 待付款 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.payment),1)])),_:1})])])),_:1}),j(ce,{label:"待使用",name:"process"},{label:k((()=>[w("span",null,[S("待使用 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.process),1)])),_:1})])])),_:1}),j(ce,{label:"已取消",name:"cancel"},{label:k((()=>[w("span",null,[S("已取消 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.cancel),1)])),_:1})])])),_:1}),j(ce,{label:"已退款",name:"refund"},{label:k((()=>[w("span",null,[S("已退款 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.refund),1)])),_:1})])])),_:1}),j(ce,{label:"已完成",name:"complete"},{label:k((()=>[w("span",null,[S("已完成 "),j(ue,{size:""},{default:k((()=>[S(F(N.order_count.complete),1)])),_:1})])])),_:1})])),_:1},8,["modelValue","onTabChange"])):D("",!0),V((b(),z(he,{size:"small",data:N.tableData.data,"span-method":I.arraySpanMethod,border:"",style:{width:"100%"}},{default:k((()=>[j(_e,{prop:"order_no",label:"订单信息",width:"400"},{default:k((e=>[e.row.is_top_row?(b(),v("div",E,[w("span",X,"订单号："+F(e.row.order_no),1),w("span",$,"下单时间："+F(e.row.create_time),1)])):(b(!0),v(C,{key:1},x(e.row.product,((e,a)=>(b(),v("div",{class:"product-info",key:a},[w("div",G,[V(w("img",H,null,512),[[fe,e.image.file_path]])]),w("div",J,[w("div",Q,[w("span",null,F(e.group_name),1)])]),w("div",W,[w("div",K,"￥ "+F(e.group_price),1),w("div",O,"x"+F(e.total_num),1)])])))),128))])),_:1}),j(_e,{prop:"pay_price",label:"实付款"},{default:k((e=>[e.row.is_top_row?D("",!0):(b(),v("div",R,[w("div",Z,F(e.row.pay_price),1)]))])),_:1}),j(_e,{prop:"",label:"买家"},{default:k((e=>[!e.row.is_top_row&&e.row.user?(b(),v("div",ee,[w("div",null,F(e.row.user.nickName),1),w("div",ae,"ID：("+F(e.row.user.user_id)+")",1)])):D("",!0)])),_:1}),j(_e,{prop:"supplier.name",label:"使用门店"}),j(_e,{prop:"state_text",label:"交易状态"},{default:k((e=>[e.row.is_top_row?D("",!0):(b(),v("div",te,F(e.row.state_text),1))])),_:1}),j(_e,{prop:"pay_type.text",label:"支付方式"},{default:k((e=>[e.row.is_top_row?D("",!0):(b(),v("div",le,[w("span",re,F(e.row.pay_type.text),1)]))])),_:1}),j(_e,{fixed:"right",label:"操作",width:"160"},{default:k((e=>[e.row.is_top_row?D("",!0):(b(),v("div",se,[V((b(),z(pe,{onClick:a=>I.addClick(e.row),type:"primary",link:"",size:"small"},{default:k((()=>[S("订单详情 ")])),_:2},1032,["onClick"])),[[ye,"/store/order/detail"]])]))])),_:1})])),_:1},8,["data","span-method"])),[[be,N.loading]])]),w("div",oe,[j(ge,{onSizeChange:I.handleSizeChange,onCurrentChange:I.handleCurrentChange,background:"","current-page":N.curPage,"page-size":N.pageSize,layout:"total, prev, pager, next, jumper",total:N.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-438e3068"]]);export{ie as default};
