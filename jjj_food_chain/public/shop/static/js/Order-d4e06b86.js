import{r as e,s as a,h as t,g as r,i as s,e as l,m as i,o,B as n,v as d}from"./element-plus-33e0d8cc.js";import{D as p}from"./driver-6d0e55c8.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as m,o as c,c as _,a as g,P as h,S as f,W as b,$ as v,T as j,Q as y,a8 as w,X as D,Y as I,bb as C,b9 as z}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const k={components:{},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{is_settled:"-1",user_id:"",order_no:""},open_edit:!1,userModel:{}}),props:{},watch:{$route(e,a){null!=e.query.user_id?this.formInline.user_id=e.query.user_id:this.formInline.user_id="",this.curPage=1,this.getData()}},created(){null!=this.$route.query.user_id&&(this.formInline.user_id=this.$route.query.user_id),this.getData()},methods:{handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getData()},getData(e){let a=this,t={user_id:a.formInline.user_id,page:a.curPage,list_rows:a.pageSize,is_settled:a.formInline.is_settled,order_no:a.formInline.order_no};p.driverOrder(t,!0).then((e=>{a.loading=!1,a.tableData=e.data.list.data,a.totalDataNumber=e.data.list.total})).catch((e=>{a.loading=!1}))},onSubmit(){this.loading=!0,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},editClick(e){this.userModel=e,this.open_edit=!0},closeDialogFunc(e,a){"add"==a&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())}}},x=e=>(C("data-v-c3d29ccf"),e=e(),z(),e),S={class:"user"},V={class:"common-seach-wrap"},P={class:"product-content"},q={class:"table-wrap"},U={class:"pic"},N={alt:""},$={class:"info"},B={class:"name gray3 product-name"},M={key:0,class:"gray9"},X={key:1,class:"orange"},A={class:"d-c-c d-c"},F={class:"orange"},O={class:"gray3"},Q={class:"gray9"},T=x((()=>g("br",null,null,-1))),W={class:"fb orange"},Y=x((()=>g("br",null,null,-1))),E={class:"fb orange"},G={class:"fb orange"},H=x((()=>g("span",{class:"gray9"},"付款状态：",-1))),J=x((()=>g("span",{class:"gray9"},"配送状态：",-1))),K=x((()=>g("span",{class:"gray9"},"送达状态：",-1))),L={key:0,class:"green"},R={key:1,class:"red"},Z={class:"pagination"};const ee=u(k,[["render",function(p,u,C,z,k,x){const ee=e,ae=a,te=t,re=r,se=s,le=l,ie=i,oe=o,ne=n,de=m("img-url"),pe=d;return c(),_("div",S,[g("div",V,[h(le,{size:"small",inline:!0,model:k.formInline,class:"demo-form-inline"},{default:f((()=>[h(te,{label:"佣金结算"},{default:f((()=>[h(ae,{modelValue:k.formInline.is_settled,"onUpdate:modelValue":u[0]||(u[0]=e=>k.formInline.is_settled=e),placeholder:"是否结算佣金"},{default:f((()=>[h(ee,{label:"全部",value:"-1"}),h(ee,{label:"已结算",value:"1"}),h(ee,{label:"未结算",value:"0"})])),_:1},8,["modelValue"])])),_:1}),h(te,{label:"用户id"},{default:f((()=>[h(re,{modelValue:k.formInline.user_id,"onUpdate:modelValue":u[1]||(u[1]=e=>k.formInline.user_id=e),placeholder:"请输入用户ID"},null,8,["modelValue"])])),_:1}),h(te,{label:"订单号"},{default:f((()=>[h(re,{size:"small",modelValue:k.formInline.order_no,"onUpdate:modelValue":u[2]||(u[2]=e=>k.formInline.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),h(te,null,{default:f((()=>[h(se,{type:"primary",onClick:x.onSubmit},{default:f((()=>[b("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),g("div",P,[g("div",q,[v((c(),j(oe,{data:k.tableData,size:"small",border:"",style:{width:"100%"}},{default:f((()=>[h(ie,{prop:"order_master.create_time",label:"商品信息"},{default:f((e=>[(c(!0),_(y,null,w(e.row.order_master.product,((e,a)=>(c(),_("div",{class:"product-info",key:a},[g("div",U,[v(g("img",N,null,512),[[de,e.image.file_path]])]),g("div",$,[g("div",B,[g("span",null,D(e.product_name),1)]),e.product_attr?(c(),_("div",M,D(e.product_attr),1)):I("",!0),e.refund?(c(),_("div",X,D(e.refund.type.text)+"-"+D(e.refund.status.text),1)):I("",!0)]),g("div",A,[g("div",F,"￥ "+D(e.product_price),1),g("div",O,"x"+D(e.total_num),1)])])))),128))])),_:1}),h(ie,{prop:"order_master.order_no",label:"订单号",width:"150"}),h(ie,{prop:"create_time",label:"时间",width:"150"}),h(ie,{prop:"referee.value",label:"配送员",width:"150"},{default:f((e=>[g("span",Q,"用户ID："+D(e.row.user_id),1),T,g("span",W,"姓名："+D(e.row.driverUser.real_name),1),Y,g("span",E,"手机号："+D(e.row.driverUser.mobile),1)])),_:1}),h(ie,{prop:"take_fee",label:"配送费",width:"100"}),h(ie,{prop:"order_master.pay_price",label:"实付款",width:"100"},{default:f((e=>[g("span",G,D(e.row.order_master.pay_price),1)])),_:1}),h(ie,{prop:"order_master.user.nickName",label:"买家",width:"100"}),h(ie,{prop:"mobile",label:"交易状态",width:"130"},{default:f((e=>[g("p",null,[H,b(" "+D(e.row.order_master.pay_status.text),1)]),g("p",null,[J,b(" "+D(e.row.order_master.delivery_status.text),1)]),g("p",null,[K,b(" "+D(e.row.order_master.receipt_status.text),1)])])),_:1}),h(ie,{prop:"referee.value",label:"佣金结算",width:"70"},{default:f((e=>[1==e.row.is_settled?(c(),_("span",L,"已结算")):I("",!0),0==e.row.is_settled?(c(),_("span",R,"未结算")):I("",!0)])),_:1})])),_:1},8,["data"])),[[pe,k.loading]])]),g("div",Z,[h(ne,{onSizeChange:x.handleSizeChange,onCurrentChange:x.handleCurrentChange,background:"","current-page":k.curPage,"page-size":k.pageSize,layout:"total, prev, pager, next, jumper",total:k.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-c3d29ccf"]]);export{ee as default};
