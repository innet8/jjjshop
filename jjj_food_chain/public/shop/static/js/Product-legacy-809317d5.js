System.register(["./element-plus-legacy-895ffe04.js","./product-legacy-cf755f2b.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-6076f203.js"],(function(e,t){"use strict";var n,l,a,i,o,r,u,c,s,d,p,f,g,h,m,y,_,b,C,v,k,S,w,z,V=document.createElement("style");return V.textContent=".no-list .el-checkbox[data-v-a03ff42c]{display:none}\n",document.head.appendChild(V),{setters:[function(e){n=e.q,l=e.r,a=e.f,i=e.g,o=e.e,r=e.h,u=e.m,c=e.n,s=e.A,d=e.w,p=e.v},function(e){f=e.P},function(e){g=e._},function(e){h=e.o,m=e.T,y=e.S,_=e.a,b=e.P,C=e.W,v=e.Y,k=e.c,S=e.Q,w=e.a8,z=e.$}],execute:function(){var t={class:"common-seach-wrap"},V={class:"product-content"},x={class:"table-wrap"},I=["src"],D={class:"pagination"},L={class:"dialog-footer"};e("_",g({data:function(){return{loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{category_id:0,search:""},cateList:[],productList:[],status:[{id:10,name:"上架"},{id:20,name:"下架"}],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null}},props:["isproduct","excludeIds","islist","spec_type","product_type"],watch:{isproduct:function(e,t){e!=t&&e&&(this.dialogVisible=e,this.type="error",this.params=null,this.getData())}},created:function(){},methods:{selectableFunc:function(e){return"boolean"!=typeof e.noChoose||e.noChoose},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,t=e.formInline;t.page=e.curPage,t.list_rows=e.pageSize,t.spec_type=e.spec_type;var n=function(t){1==t.code&&(e.loading=!1,e.cateList=t.data.category,e.excludeIds&&void 0!==e.excludeIds&&e.excludeIds.length>0?t.data.list.data.forEach((function(t){e.excludeIds.indexOf(t.product_id)>-1?t.noChoose=!1:t.noChoose=!0})):e.islist||t.data.list.data.forEach((function(e){e.noChoose=!0})),e.productList=t.data.list.data,e.totalDataNumber=t.data.list.total)};0==e.product_type?f.takeProductList(t,!0).then((function(e){n(e)})):f.storeProductList(t,!0).then((function(e){n(e)}))},SingleFunc:function(e){this.multipleSelection=[e],this.addClerk()},addClerk:function(){var e=this,t=null;e.multipleSelection.length<1?e.$message({message:"请至少选择一件产品商品！",type:"error"}):(e.islist&&void 0!==e.islist?(e.multipleSelection.forEach((function(e){e.image=e.image[0].file_path})),t=e.multipleSelection):(t=e.multipleSelection[0]).image=t.image[0].file_path,e.params=t,e.type="success",e.dialogVisible=!1)},dialogFormVisible:function(){this.formInline.category_id=0,this.formInline.search="",this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange:function(e){this.multipleSelection=e}}},[["render",function(e,f,g,P,F,j){var E=n,N=l,U=a,W=i,$=o,q=r,A=u,O=c,Q=s,T=d,Y=p;return h(),m(T,{title:"选择商品",modelValue:F.dialogVisible,"onUpdate:modelValue":f[3]||(f[3]=function(e){return F.dialogVisible=e}),onClose:j.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"900px"},{footer:y((function(){return[_("div",L,[b(W,{size:"small",onClick:f[2]||(f[2]=function(e){return F.dialogVisible=!1})},{default:y((function(){return[C("取 消")]})),_:1}),g.islist?(h(),m(W,{key:0,size:"small",type:"primary",onClick:j.addClerk},{default:y((function(){return[C("确 定")]})),_:1},8,["onClick"])):v("",!0)])]})),default:y((function(){return[_("div",t,[b(q,{inline:!0,size:"small",model:F.formInline,class:"demo-form-inline"},{default:y((function(){return[b(U,{label:"商品分类"},{default:y((function(){return[b(N,{modelValue:F.formInline.category_id,"onUpdate:modelValue":f[0]||(f[0]=function(e){return F.formInline.category_id=e}),placeholder:"请选择商品分类"},{default:y((function(){return[b(E,{value:0,label:"全部"}),(h(!0),k(S,null,w(F.cateList,(function(e){return h(),k(S,{key:e.category_id},[b(E,{value:e.category_id,label:e.name},null,8,["value","label"]),(h(!0),k(S,null,w(e.child,(function(t){return h(),k(S,{key:t.category_id},[void 0!==e.child?(h(),k(S,{key:0},[b(E,{value:t.category_id,label:t.name,style:{"padding-left":"30px"}},null,8,["value","label"]),(h(!0),k(S,null,w(t.child,(function(e){return h(),k(S,{key:e.category_id},[void 0!==t.child?(h(),m(E,{key:0,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])):v("",!0)],64)})),128))],64)):v("",!0)],64)})),128))],64)})),128))]})),_:1},8,["modelValue"])]})),_:1}),b(U,{label:"商品名称"},{default:y((function(){return[b($,{placeholder:"请输入商品名称",modelValue:F.formInline.search,"onUpdate:modelValue":f[1]||(f[1]=function(e){return F.formInline.search=e})},{append:y((function(){return[b(W,{icon:"Search",onClick:j.getData},{default:y((function(){return[C(" 查询 ")]})),_:1},8,["onClick"])]})),_:1},8,["modelValue"])]})),_:1})]})),_:1},8,["model"])]),_("div",V,[_("div",x,[z((h(),m(O,{size:"small",data:F.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:j.tableCurrentChange},{default:y((function(){return[b(A,{width:"70",label:"商品图片"},{default:y((function(e){return[_("img",{src:e.row.image&&e.row.image[0]&&e.row.image[0].file_path,width:30,height:30},null,8,I)]})),_:1}),b(A,{prop:"product_name",label:"商品名称"}),b(A,{prop:"category.name",width:"100",label:"商品分类"}),b(A,{prop:"create_time",width:"140",label:"添加时间"}),g.islist?(h(),m(A,{key:0,type:"selection",selectable:j.selectableFunc,width:"44"},null,8,["selectable"])):v("",!0),g.islist?v("",!0):(h(),m(A,{key:1,width:"80",label:"单选"},{default:y((function(e){return[e.row.noChoose?(h(),m(W,{key:0,size:"",onClick:function(t){return j.SingleFunc(e.row)}},{default:y((function(){return[C("选择")]})),_:2},1032,["onClick"])):(h(),m(W,{key:1,size:"",disabled:""},{default:y((function(){return[C("已选")]})),_:1}))]})),_:1}))]})),_:1},8,["data","onSelectionChange"])),[[Y,F.loading]])]),_("div",D,[b(Q,{onSizeChange:j.handleSizeChange,onCurrentChange:j.handleCurrentChange,background:"","current-page":F.curPage,"page-sizes":[2,10,20,50,100],"page-size":F.pageSize,layout:"total, prev, pager, next, jumper",total:F.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])]})),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-a03ff42c"]]))}}}));
