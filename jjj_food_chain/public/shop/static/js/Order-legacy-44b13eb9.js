System.register(["./element-plus-legacy-b61989a6.js","./plus-legacy-5612219e.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-40cb594f.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,a){"use strict";var n,t,r,s,l,i,o,u,c,d,p,g,f,_,m,y,h,w,v,b,j,k,x,D,I,C,S,z=document.createElement("style");return z.textContent=".referee-name[data-v-a3f2ef7d]{width:33.333333%}\n",document.head.appendChild(z),{setters:[function(e){n=e.q,t=e.r,r=e.h,s=e.g,l=e.i,i=e.e,o=e.m,u=e.n,c=e.A,d=e.v},function(e){p=e.P},function(e){g=e._},function(e){f=e.ap,_=e.o,m=e.c,y=e.a,h=e.P,w=e.S,v=e.W,b=e.$,j=e.T,k=e.X,x=e.Q,D=e.a8,I=e.Y,C=e.bb,S=e.b9},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var a={components:{},data:function(){return{loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{is_settled:"-1",user_id:""},open_edit:!1,userModel:{}}},props:{},watch:{$route:function(e,a){null!=e.query.user_id?this.formInline.user_id=e.query.user_id:this.formInline.user_id="",this.curPage=1,this.getData()}},created:function(){null!=this.$route.query.user_id&&(this.formInline.user_id=this.$route.query.user_id),this.getData()},methods:{arraySpanMethod:function(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,7]},handleCurrentChange:function(e){var a=this;a.curPage=e,a.loading=!0,a.getData()},getData:function(e){var a=this,n={user_id:a.formInline.user_id,page:a.curPage,list_rows:a.pageSize,is_settled:a.formInline.is_settled};p.agentOrder(n,!0).then((function(e){a.loading=!1;for(var n=[],t=0;t<e.data.list.data.length;t++){var r=e.data.list.data[t],s={order_no:r.order_master.order_no,create_time:r.order_master.create_time,order_id:r.order_id,is_top_row:!0};n.push(s),n.push(r)}a.tableData=n,a.totalDataNumber=e.data.list.total})).catch((function(e){a.loading=!1}))},onSubmit:function(){var e=this;e.loading=!0,e.is_settled=e.formInline.is_settled,e.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},editClick:function(e){this.userModel=e,this.open_edit=!0},closeDialogFunc:function(e,a){"add"==a&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())}}},z=function(e){return C("data-v-a3f2ef7d"),e=e(),S(),e},P={class:"user"},N={class:"common-seach-wrap"},q={class:"product-content"},V={class:"table-wrap"},M={key:0,class:"order-code d-b-c"},$={class:"d-s-c"},A={class:"c_main"},U={class:"pl16"},X={class:"pic"},B={alt:""},E={class:"info"},F={class:"name gray3 product-name"},O={key:0,class:"gray9"},Q={key:1,class:"orange"},T={class:"d-c-c d-c"},W={class:"orange"},Y={class:"gray3"},G={key:0},H={class:"d-s-s d-c"},J={key:0,class:"d-s-c ww100 border-b-d"},K={class:"referee-name text-ellipsis"},L=z((function(){return y("span",{class:"gray9"},"一级分销商：",-1)})),R={class:"blue"},Z={class:"referee-name text-ellipsis"},ee=z((function(){return y("span",{class:"gray9"},"用户ID：",-1)})),ae={class:"gray6"},ne={class:"referee-name text-ellipsis"},te=z((function(){return y("span",{class:"gray9"},"分销佣金：",-1)})),re={class:"orange"},se={key:1,class:"d-s-c ww100 border-b-d"},le={class:"referee-name text-ellipsis"},ie=z((function(){return y("span",{class:"gray9"},"二级分销商：",-1)})),oe={class:"blue"},ue={class:"referee-name text-ellipsis"},ce=z((function(){return y("span",{class:"gray9"},"用户ID：",-1)})),de={class:"gray6"},pe={class:"referee-name text-ellipsis"},ge=z((function(){return y("span",{class:"gray9"},"分销佣金：",-1)})),fe={class:"orange"},_e={key:2,class:"d-s-c ww100 border-b-d"},me={class:"referee-name text-ellipsis"},ye=z((function(){return y("span",{class:"gray9"},"三级分销商：",-1)})),he={class:"blue"},we={class:"referee-name text-ellipsis"},ve=z((function(){return y("span",{class:"gray9"},"用户ID：",-1)})),be={class:"gray6"},je={class:"referee-name text-ellipsis"},ke=z((function(){return y("span",{class:"gray9"},"分销佣金：",-1)})),xe={class:"orange"},De={key:0},Ie={class:"fb orange"},Ce={key:0},Se=z((function(){return y("span",{class:"gray9"},"付款状态：",-1)})),ze=z((function(){return y("span",{class:"gray9"},"配送状态：",-1)})),Pe=z((function(){return y("span",{class:"gray9"},"送达状态：",-1)})),Ne={key:0},qe={key:0,class:"green"},Ve={key:1,class:"red"},Me={class:"pagination"};e("default",g(a,[["render",function(e,a,p,g,C,S){var z=n,$e=t,Ae=r,Ue=s,Xe=l,Be=i,Ee=o,Fe=u,Oe=c,Qe=f("img-url"),Te=d;return _(),m("div",P,[y("div",N,[h(Be,{size:"small",inline:!0,model:C.formInline,class:"demo-form-inline"},{default:w((function(){return[h(Ae,{label:"佣金结算"},{default:w((function(){return[h($e,{modelValue:C.formInline.is_settled,"onUpdate:modelValue":a[0]||(a[0]=function(e){return C.formInline.is_settled=e}),placeholder:"是否结算佣金"},{default:w((function(){return[h(z,{label:"全部",value:"-1"}),h(z,{label:"已结算",value:"1"}),h(z,{label:"未结算",value:"0"})]})),_:1},8,["modelValue"])]})),_:1}),h(Ae,{label:"用户id"},{default:w((function(){return[h(Ue,{modelValue:C.formInline.user_id,"onUpdate:modelValue":a[1]||(a[1]=function(e){return C.formInline.user_id=e}),placeholder:"请输入用户ID"},null,8,["modelValue"])]})),_:1}),h(Ae,null,{default:w((function(){return[h(Xe,{type:"primary",onClick:S.onSubmit},{default:w((function(){return[v("查询")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),y("div",q,[y("div",V,[b((_(),j(Fe,{data:C.tableData,size:"small",border:"",style:{width:"100%"},"span-method":S.arraySpanMethod},{default:w((function(){return[h(Ee,{prop:"order_no",label:"商品"},{default:w((function(e){return[e.row.is_top_row?(_(),m("div",M,[y("div",$,[y("span",A,"订单号："+k(e.row.order_no),1),y("span",U,"下单时间："+k(e.row.create_time),1)])])):(_(!0),m(x,{key:1},D(e.row.order_master.product,(function(e,a){return _(),m("div",{class:"product-info",key:a},[y("div",X,[b(y("img",B,null,512),[[Qe,e.image.file_path]])]),y("div",E,[y("div",F,[y("span",null,k(e.product_name),1)]),e.product_attr?(_(),m("div",O,k(e.product_attr),1)):I("",!0),e.refund?(_(),m("div",Q,k(e.refund.type.text)+"-"+k(e.refund.status.text),1)):I("",!0)]),y("div",T,[y("div",W,"￥ "+k(e.product_price),1),y("div",Y,"x"+k(e.total_num),1)])])})),128))]})),_:1}),h(Ee,{prop:"referee.value",label:"分销商",width:"400"},{default:w((function(e){return[e.row.is_top_row?I("",!0):(_(),m("div",G,[y("div",H,[e.row.first_user_id>0?(_(),m("div",J,[y("p",K,[L,y("span",R,k(e.row.agent_first.nickName),1)]),y("p",Z,[ee,y("span",ae,k(e.row.agent_first.user_id),1)]),y("p",ne,[te,y("span",re,"￥"+k(e.row.first_money),1)])])):I("",!0),e.row.second_user_id>0?(_(),m("div",se,[y("p",le,[ie,y("span",oe,k(e.row.agent_second.nickName),1)]),y("p",ue,[ce,y("span",de,k(e.row.agent_second.user_id),1)]),y("p",pe,[ge,y("span",fe,"￥"+k(e.row.second_money),1)])])):I("",!0),e.row.third_user_id>0?(_(),m("div",_e,[y("p",me,[ye,y("span",he,k(e.row.agent_third.nickName),1)]),y("p",we,[ve,y("span",be,k(e.row.agent_third.user_id),1)]),y("p",je,[ke,y("span",xe,"￥"+k(e.row.third_money),1)])])):I("",!0)])]))]})),_:1}),h(Ee,{prop:"order_master.pay_price",label:"实付款",width:"100"},{default:w((function(e){return[e.row.is_top_row?I("",!0):(_(),m("div",De,[y("span",Ie,k(e.row.order_master.pay_price),1)]))]})),_:1}),h(Ee,{prop:"order_master.user.nickName",label:"买家",width:"100"}),h(Ee,{prop:"mobile",label:"交易状态",width:"130"},{default:w((function(e){return[e.row.is_top_row?I("",!0):(_(),m("div",Ce,[y("p",null,[Se,v(" "+k(e.row.order_master.pay_status.text),1)]),y("p",null,[ze,v(" "+k(e.row.order_master.delivery_status.text),1)]),y("p",null,[Pe,v(" "+k(e.row.order_master.receipt_status.text),1)])]))]})),_:1}),h(Ee,{prop:"referee.value",label:"佣金结算",width:"70"},{default:w((function(e){return[e.row.is_top_row?I("",!0):(_(),m("div",Ne,[1==e.row.is_settled?(_(),m("span",qe,"已结算")):I("",!0),0==e.row.is_settled?(_(),m("span",Ve,"未结算")):I("",!0)]))]})),_:1})]})),_:1},8,["data","span-method"])),[[Te,C.loading]])]),y("div",Me,[h(Oe,{onSizeChange:S.handleSizeChange,onCurrentChange:S.handleCurrentChange,background:"","current-page":C.curPage,"page-size":C.pageSize,layout:"total, prev, pager, next, jumper",total:C.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-a3f2ef7d"]]))}}}));
