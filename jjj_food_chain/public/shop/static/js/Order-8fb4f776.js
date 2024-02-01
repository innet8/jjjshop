import{p as e,q as s,h as a,g as r,i as t,e as l,m as i,o,B as n,v as d}from"./element-plus-c8084613.js";import{P as p}from"./plus-8ad29f0f.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as u,o as m,c as _,a as g,O as h,R as f,V as y,_ as w,S as v,W as b,P as j,a7 as k,X as x,bm as D,bk as I}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const C={components:{},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{is_settled:"-1",user_id:""},open_edit:!1,userModel:{}}),props:{},watch:{$route(e,s){null!=e.query.user_id?this.formInline.user_id=e.query.user_id:this.formInline.user_id="",this.curPage=1,this.getData()}},created(){null!=this.$route.query.user_id&&(this.formInline.user_id=this.$route.query.user_id),this.getData()},methods:{arraySpanMethod(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,7]},handleCurrentChange(e){let s=this;s.curPage=e,s.loading=!0,s.getData()},getData(e){let s=this,a={user_id:s.formInline.user_id,page:s.curPage,list_rows:s.pageSize,is_settled:s.formInline.is_settled};p.agentOrder(a,!0).then((e=>{s.loading=!1;let a=[];for(let s=0;s<e.data.list.data.length;s++){let r=e.data.list.data[s],t={order_no:r.order_master.order_no,create_time:r.order_master.create_time,order_id:r.order_id,is_top_row:!0};a.push(t),a.push(r)}s.tableData=a,s.totalDataNumber=e.data.list.total})).catch((e=>{s.loading=!1}))},onSubmit(){let e=this;e.loading=!0,e.is_settled=e.formInline.is_settled,e.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},editClick(e){this.userModel=e,this.open_edit=!0},closeDialogFunc(e,s){"add"==s&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==s&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())}}},z=e=>(D("data-v-a3f2ef7d"),e=e(),I(),e),S={class:"user"},P={class:"common-seach-wrap"},q={class:"product-content"},N={class:"table-wrap"},V={key:0,class:"order-code d-b-c"},M={class:"d-s-c"},$={class:"c_main"},F={class:"pl16"},O={class:"pic"},U={alt:""},B={class:"info"},E={class:"name gray3 product-name"},R={key:0,class:"gray9"},W={key:1,class:"orange"},X={class:"d-c-c d-c"},A={class:"orange"},G={class:"gray3"},H={key:0},J={class:"d-s-s d-c"},K={key:0,class:"d-s-c ww100 border-b-d"},L={class:"referee-name text-ellipsis"},Q=z((()=>g("span",{class:"gray9"},"一级分销商：",-1))),T={class:"blue"},Y={class:"referee-name text-ellipsis"},Z=z((()=>g("span",{class:"gray9"},"用户ID：",-1))),ee={class:"gray6"},se={class:"referee-name text-ellipsis"},ae=z((()=>g("span",{class:"gray9"},"分销佣金：",-1))),re={class:"orange"},te={key:1,class:"d-s-c ww100 border-b-d"},le={class:"referee-name text-ellipsis"},ie=z((()=>g("span",{class:"gray9"},"二级分销商：",-1))),oe={class:"blue"},ne={class:"referee-name text-ellipsis"},de=z((()=>g("span",{class:"gray9"},"用户ID：",-1))),pe={class:"gray6"},ce={class:"referee-name text-ellipsis"},ue=z((()=>g("span",{class:"gray9"},"分销佣金：",-1))),me={class:"orange"},_e={key:2,class:"d-s-c ww100 border-b-d"},ge={class:"referee-name text-ellipsis"},he=z((()=>g("span",{class:"gray9"},"三级分销商：",-1))),fe={class:"blue"},ye={class:"referee-name text-ellipsis"},we=z((()=>g("span",{class:"gray9"},"用户ID：",-1))),ve={class:"gray6"},be={class:"referee-name text-ellipsis"},je=z((()=>g("span",{class:"gray9"},"分销佣金：",-1))),ke={class:"orange"},xe={key:0},De={class:"fb orange"},Ie={key:0},Ce=z((()=>g("span",{class:"gray9"},"付款状态：",-1))),ze=z((()=>g("span",{class:"gray9"},"配送状态：",-1))),Se=z((()=>g("span",{class:"gray9"},"送达状态：",-1))),Pe={key:0},qe={key:0,class:"green"},Ne={key:1,class:"red"},Ve={class:"pagination"};const Me=c(C,[["render",function(p,c,D,I,C,z){const Me=e,$e=s,Fe=a,Oe=r,Ue=t,Be=l,Ee=i,Re=o,We=n,Xe=u("img-url"),Ae=d;return m(),_("div",S,[g("div",P,[h(Be,{size:"small",inline:!0,model:C.formInline,class:"demo-form-inline"},{default:f((()=>[h(Fe,{label:"佣金结算"},{default:f((()=>[h($e,{modelValue:C.formInline.is_settled,"onUpdate:modelValue":c[0]||(c[0]=e=>C.formInline.is_settled=e),placeholder:"是否结算佣金"},{default:f((()=>[h(Me,{label:"全部",value:"-1"}),h(Me,{label:"已结算",value:"1"}),h(Me,{label:"未结算",value:"0"})])),_:1},8,["modelValue"])])),_:1}),h(Fe,{label:"用户id"},{default:f((()=>[h(Oe,{modelValue:C.formInline.user_id,"onUpdate:modelValue":c[1]||(c[1]=e=>C.formInline.user_id=e),placeholder:"请输入用户ID"},null,8,["modelValue"])])),_:1}),h(Fe,null,{default:f((()=>[h(Ue,{type:"primary",onClick:z.onSubmit},{default:f((()=>[y("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),g("div",q,[g("div",N,[w((m(),v(Re,{data:C.tableData,size:"small",border:"",style:{width:"100%"},"span-method":z.arraySpanMethod},{default:f((()=>[h(Ee,{prop:"order_no",label:"商品"},{default:f((e=>[e.row.is_top_row?(m(),_("div",V,[g("div",M,[g("span",$,"订单号："+b(e.row.order_no),1),g("span",F,"下单时间："+b(e.row.create_time),1)])])):(m(!0),_(j,{key:1},k(e.row.order_master.product,((e,s)=>(m(),_("div",{class:"product-info",key:s},[g("div",O,[w(g("img",U,null,512),[[Xe,e.image.file_path]])]),g("div",B,[g("div",E,[g("span",null,b(e.product_name),1)]),e.product_attr?(m(),_("div",R,b(e.product_attr),1)):x("",!0),e.refund?(m(),_("div",W,b(e.refund.type.text)+"-"+b(e.refund.status.text),1)):x("",!0)]),g("div",X,[g("div",A,"￥ "+b(e.product_price),1),g("div",G,"x"+b(e.total_num),1)])])))),128))])),_:1}),h(Ee,{prop:"referee.value",label:"分销商",width:"400"},{default:f((e=>[e.row.is_top_row?x("",!0):(m(),_("div",H,[g("div",J,[e.row.first_user_id>0?(m(),_("div",K,[g("p",L,[Q,g("span",T,b(e.row.agent_first.nickName),1)]),g("p",Y,[Z,g("span",ee,b(e.row.agent_first.user_id),1)]),g("p",se,[ae,g("span",re,"￥"+b(e.row.first_money),1)])])):x("",!0),e.row.second_user_id>0?(m(),_("div",te,[g("p",le,[ie,g("span",oe,b(e.row.agent_second.nickName),1)]),g("p",ne,[de,g("span",pe,b(e.row.agent_second.user_id),1)]),g("p",ce,[ue,g("span",me,"￥"+b(e.row.second_money),1)])])):x("",!0),e.row.third_user_id>0?(m(),_("div",_e,[g("p",ge,[he,g("span",fe,b(e.row.agent_third.nickName),1)]),g("p",ye,[we,g("span",ve,b(e.row.agent_third.user_id),1)]),g("p",be,[je,g("span",ke,"￥"+b(e.row.third_money),1)])])):x("",!0)])]))])),_:1}),h(Ee,{prop:"order_master.pay_price",label:"实付款",width:"100"},{default:f((e=>[e.row.is_top_row?x("",!0):(m(),_("div",xe,[g("span",De,b(e.row.order_master.pay_price),1)]))])),_:1}),h(Ee,{prop:"order_master.user.nickName",label:"买家",width:"100"}),h(Ee,{prop:"mobile",label:"交易状态",width:"130"},{default:f((e=>[e.row.is_top_row?x("",!0):(m(),_("div",Ie,[g("p",null,[Ce,y(" "+b(e.row.order_master.pay_status.text),1)]),g("p",null,[ze,y(" "+b(e.row.order_master.delivery_status.text),1)]),g("p",null,[Se,y(" "+b(e.row.order_master.receipt_status.text),1)])]))])),_:1}),h(Ee,{prop:"referee.value",label:"佣金结算",width:"70"},{default:f((e=>[e.row.is_top_row?x("",!0):(m(),_("div",Pe,[1==e.row.is_settled?(m(),_("span",qe,"已结算")):x("",!0),0==e.row.is_settled?(m(),_("span",Ne,"未结算")):x("",!0)]))])),_:1})])),_:1},8,["data","span-method"])),[[Ae,C.loading]])]),g("div",Ve,[h(We,{onSizeChange:z.handleSizeChange,onCurrentChange:z.handleCurrentChange,background:"","current-page":C.curPage,"page-size":C.pageSize,layout:"total, prev, pager, next, jumper",total:C.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-a3f2ef7d"]]);export{Me as default};
