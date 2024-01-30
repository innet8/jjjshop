import{d as e,q as a,r as l,h as t,g as o,i as s,e as i,m as r,n,A as d,v as p}from"./element-plus-b01b3a31.js";import{P as u}from"./points-391505f5.js";import{l as m}from"./qs-a8eee860.js";import{u as c}from"./index-83a39651.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as g,o as _,c as f,a as y,P as v,S as w,Q as b,a8 as j,T as k,W as x,$ as C,X as z,Y as D}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{token:S}=c(),I={class:"user"},V={class:"common-seach-wrap"},N={class:"product-content"},P={class:"table-wrap"},E={class:"product-info"},U={class:"pic"},$={alt:""},q={class:"info"},B={class:"name gray3 product-name"},T={class:"d-c-c d-c"},A={class:"orange"},M={class:"orange"},X={class:"gray3"},Q={class:"d-s-c"},W={width:"30px",height:"30px"},Y={class:"ml10"},F={class:"orange fb"},G={class:"orange"},H={class:"gray9"},J={class:"green"},K={class:"pagination"};const L=h({data:()=>({formInline:{order_status:"0",nickName:"",style_id:"",order_no:""},exStyle:[],tableData:[],pageSize:20,totalDataNumber:0,curPage:1,loading:!0,status:[{id:10,name:"待发货"},{id:20,name:"待收货"},{id:30,name:"待取货"},{id:40,name:"已完成"}],token:S}),created(){this.getData()},methods:{onSubmit(){this.loading=!0,this.curPage=1,this.getData(!0)},getData(e){let a=this,l=a.formInline;l.page=a.curPage,l.list_rows=a.pageSize,u.getExchange(l,!0).then((e=>{a.loading=!1,a.tableData=e.data.list.data,a.totalDataNumber=e.data.list.total,a.exStyle=e.data.ex_style})).catch((e=>{}))},handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},toDetail(e){let a=e.order_id;this.$router.push({path:"/plus/points/order/detail",query:{order_id:a}})},verifyClick(a){let l=this,t={};e.confirm("确定要核销吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{t.order_id=a.order_id,u.extract(t,!0).then((e=>{l.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),l.getData()})).catch((e=>{l.loading=!1}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消核销"})}))},onExport:function(){let e=window.location.protocol+"//"+window.location.host;this.formInline.token=this.token,window.location.href=e+"/index.php/shop/plus.points.order/export?"+m.stringify(this.formInline)}}},[["render",function(e,u,m,c,h,S){const L=a,O=l,R=t,Z=o,ee=s,ae=i,le=r,te=n,oe=d,se=g("auth"),ie=g("img-url"),re=p;return _(),f("div",I,[y("div",V,[v(ae,{size:"small",inline:!0,model:h.formInline,class:"demo-form-inline"},{default:w((()=>[v(R,{label:"订单状态"},{default:w((()=>[v(O,{modelValue:h.formInline.order_status,"onUpdate:modelValue":u[0]||(u[0]=e=>h.formInline.order_status=e),placeholder:"订单"},{default:w((()=>[v(L,{label:"全部",value:"0"}),(_(!0),f(b,null,j(h.status,((e,a)=>(_(),k(L,{key:a,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),v(R,{label:"配送方式"},{default:w((()=>[v(O,{size:"small",modelValue:h.formInline.style_id,"onUpdate:modelValue":u[1]||(u[1]=e=>h.formInline.style_id=e),placeholder:"请选择"},{default:w((()=>[v(L,{label:"全部",value:""}),(_(!0),f(b,null,j(h.exStyle,((e,a)=>(_(),k(L,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),v(R,{label:"订单号"},{default:w((()=>[v(Z,{size:"small",modelValue:h.formInline.order_no,"onUpdate:modelValue":u[2]||(u[2]=e=>h.formInline.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),v(R,{label:"用户昵称"},{default:w((()=>[v(Z,{modelValue:h.formInline.nickName,"onUpdate:modelValue":u[3]||(u[3]=e=>h.formInline.nickName=e),placeholder:"请输入用户昵称"},null,8,["modelValue"])])),_:1}),v(R,null,{default:w((()=>[v(ee,{type:"primary",icon:"Search",onClick:S.onSubmit},{default:w((()=>[x("查询")])),_:1},8,["onClick"])])),_:1}),v(R,null,{default:w((()=>[C((_(),k(ee,{size:"small",type:"success",onClick:S.onExport},{default:w((()=>[x("导出")])),_:1},8,["onClick"])),[[se,"/plus/points/order/export"]])])),_:1})])),_:1},8,["model"])]),y("div",N,[y("div",P,[C((_(),k(te,{size:"small",data:h.tableData,border:"",style:{width:"100%"}},{default:w((()=>[v(le,{prop:"order_no",label:"订单信息",width:"330"},{default:w((e=>[y("div",E,[y("div",U,[C(y("img",$,null,512),[[ie,e.row.file_path]])]),y("div",q,[y("div",B,[y("span",null,z(e.row.product_name),1)])]),y("div",T,[y("div",A,"金额：￥ "+z(e.row.product_price),1),y("div",M,"积分： "+z(e.row.product_points),1),y("div",X,"数量：x"+z(e.row.total_num),1)])])])),_:1}),v(le,{prop:"order_no",label:"订单号"}),v(le,{prop:"user.nickName",label:"用户"},{default:w((e=>[y("div",Q,[C(y("img",W,null,512),[[ie,e.row.user.avatarUrl]]),y("div",Y,z(e.row.user.nickName),1)])])),_:1}),v(le,{prop:"points_num",label:"兑换积分"},{default:w((e=>[y("span",F,z(e.row.points_num),1)])),_:1}),v(le,{prop:"pay_price",label:"兑换金额"},{default:w((e=>[y("div",G,z(e.row.pay_price),1),y("p",H,"(含配送费："+z(e.row.express_price)+")",1)])),_:1}),v(le,{prop:"delivery_type.text",label:"配送方式"},{default:w((e=>[y("span",J,z(e.row.delivery_type.text),1)])),_:1}),v(le,{prop:"state_text",label:"订单状态"}),v(le,{prop:"create_time",label:"兑换时间"}),v(le,{fixed:"right",label:"操作",width:"150"},{default:w((e=>[C((_(),k(ee,{onClick:a=>S.toDetail(e.row),type:"primary",link:"",size:"small"},{default:w((()=>[x("订单详情 ")])),_:2},1032,["onClick"])),[[se,"/plus/points/order/detail"]]),10==e.row.delivery_status.value&&20==e.row.pay_status.value&&10==e.row.delivery_type.value?C((_(),k(ee,{key:0,onClick:a=>S.toDetail(e.row),type:"primary",link:"",size:"small"},{default:w((()=>[x("发货 ")])),_:2},1032,["onClick"])),[[se,"/plus/points/order/delivery"]]):D("",!0),10==e.row.order_status.value&&20==e.row.pay_status.value&&20==e.row.delivery_type.value?C((_(),k(ee,{key:1,onClick:a=>S.verifyClick(e.row),type:"primary",link:"",size:"small"},{default:w((()=>[x("核销 ")])),_:2},1032,["onClick"])),[[se,"/plus/points/order/extract"]]):D("",!0)])),_:1})])),_:1},8,["data"])),[[re,h.loading]])]),y("div",K,[v(oe,{onSizeChange:S.handleSizeChange,onCurrentChange:S.handleCurrentChange,background:"","current-page":h.curPage,"page-size":h.pageSize,layout:"total, prev, pager, next, jumper",total:h.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{L as default};
