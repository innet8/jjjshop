System.register(["./element-plus-legacy-b16a6c53.js","./product-legacy-0382ab91.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js"],(function(e,t){"use strict";var n,l,i,a,o,r,u,c,s,d,p,g,f,h,m,y,b,C,_,v,k,S,w,z,V=document.createElement("style");return V.textContent=".no-list .el-checkbox{display:none}\n",document.head.appendChild(V),{setters:[function(e){n=e.r,l=e.s,i=e.d,a=e.e,o=e.c,r=e.b,u=e.l,c=e.m,s=e.n,d=e.o,p=e.v},function(e){g=e.P},function(e){f=e._},function(e){h=e.o,m=e.T,y=e.S,b=e.a,C=e.P,_=e.W,v=e.Y,k=e.c,S=e.Q,w=e.a8,z=e.$}],execute:function(){var t={class:"common-seach-wrap"},V={class:"product-content"},x={class:"table-wrap"},I=["src"],D={class:"pagination"},L={class:"dialog-footer"};e("_",f({data:function(){return{loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{category_id:0,search:""},cateList:[],productList:[],status:[{id:10,name:"上架"},{id:20,name:"下架"}],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null}},props:["isproduct","excludeIds","islist","spec_type","product_type"],watch:{isproduct:function(e,t){e!=t&&e&&(this.dialogVisible=e,this.type="error",this.params=null,this.getData())}},created:function(){},methods:{selectableFunc:function(e){return"boolean"!=typeof e.noChoose||e.noChoose},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,t=e.formInline;t.page=e.curPage,t.list_rows=e.pageSize,t.spec_type=e.spec_type;var n=function(t){1==t.code&&(e.loading=!1,e.cateList=t.data.category,e.excludeIds&&void 0!==e.excludeIds&&e.excludeIds.length>0?t.data.list.data.forEach((function(t){e.excludeIds.indexOf(t.product_id)>-1?t.noChoose=!1:t.noChoose=!0})):e.islist||t.data.list.data.forEach((function(e){e.noChoose=!0})),e.productList=t.data.list.data,e.totalDataNumber=t.data.list.total)};0==e.product_type?g.takeProductList(t,!0).then((function(e){n(e)})):g.storeProductList(t,!0).then((function(e){n(e)}))},SingleFunc:function(e){this.multipleSelection=[e],this.addClerk()},addClerk:function(){var e=this,t=null;e.multipleSelection.length<1?e.$message({message:"请至少选择一件产品商品！",type:"error"}):(e.islist&&void 0!==e.islist?(e.multipleSelection.forEach((function(e){e.image=e.image[0].file_path})),t=e.multipleSelection):(t=e.multipleSelection[0]).image=t.image[0].file_path,e.params=t,e.type="success",e.dialogVisible=!1)},dialogFormVisible:function(){this.formInline.category_id=0,this.formInline.search="",this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange:function(e){this.multipleSelection=e}}},[["render",function(e,g,f,P,F,j){var E=n,N=l,U=i,$=a,Q=o,W=r,O=u,T=c,Y=s,q=d,A=p;return h(),m(q,{title:"选择商品",modelValue:F.dialogVisible,"onUpdate:modelValue":g[3]||(g[3]=function(e){return F.dialogVisible=e}),onClose:j.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"900px"},{footer:y((function(){return[b("div",L,[C($,{size:"small",onClick:g[2]||(g[2]=function(e){return F.dialogVisible=!1})},{default:y((function(){return[_("取 消")]})),_:1}),f.islist?(h(),m($,{key:0,size:"small",type:"primary",onClick:j.addClerk},{default:y((function(){return[_("确 定")]})),_:1},8,["onClick"])):v("",!0)])]})),default:y((function(){return[b("div",t,[C(W,{inline:!0,size:"small",model:F.formInline,class:"demo-form-inline"},{default:y((function(){return[C(U,{label:"商品分类"},{default:y((function(){return[C(N,{modelValue:F.formInline.category_id,"onUpdate:modelValue":g[0]||(g[0]=function(e){return F.formInline.category_id=e}),placeholder:"请选择商品分类"},{default:y((function(){return[C(E,{value:0,label:"全部"}),(h(!0),k(S,null,w(F.cateList,(function(e){return h(),k(S,{key:e.category_id},[C(E,{value:e.category_id,label:e.name},null,8,["value","label"]),(h(!0),k(S,null,w(e.child,(function(t){return h(),k(S,{key:t.category_id},[void 0!==e.child?(h(),k(S,{key:0},[C(E,{value:t.category_id,label:t.name,style:{"padding-left":"30px"}},null,8,["value","label"]),(h(!0),k(S,null,w(t.child,(function(e){return h(),k(S,{key:e.category_id},[void 0!==t.child?(h(),m(E,{key:0,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])):v("",!0)],64)})),128))],64)):v("",!0)],64)})),128))],64)})),128))]})),_:1},8,["modelValue"])]})),_:1}),C(U,{label:"商品名称"},{default:y((function(){return[C(Q,{placeholder:"请输入商品名称",modelValue:F.formInline.search,"onUpdate:modelValue":g[1]||(g[1]=function(e){return F.formInline.search=e})},{append:y((function(){return[C($,{icon:"Search",onClick:j.getData},{default:y((function(){return[_(" 查询 ")]})),_:1},8,["onClick"])]})),_:1},8,["modelValue"])]})),_:1})]})),_:1},8,["model"])]),b("div",V,[b("div",x,[z((h(),m(T,{size:"small",data:F.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:j.tableCurrentChange},{default:y((function(){return[C(O,{width:"70",label:"商品图片"},{default:y((function(e){return[b("img",{src:e.row.image&&e.row.image[0]&&e.row.image[0].file_path,width:30,height:30},null,8,I)]})),_:1}),C(O,{prop:"product_name",label:"商品名称"}),C(O,{prop:"category.name",width:"100",label:"商品分类"}),C(O,{prop:"create_time",width:"140",label:"添加时间"}),f.islist?(h(),m(O,{key:0,type:"selection",selectable:j.selectableFunc,width:"44"},null,8,["selectable"])):v("",!0),f.islist?v("",!0):(h(),m(O,{key:1,width:"80",label:"单选"},{default:y((function(e){return[e.row.noChoose?(h(),m($,{key:0,size:"mini",onClick:function(t){return j.SingleFunc(e.row)}},{default:y((function(){return[_("选择")]})),_:2},1032,["onClick"])):(h(),m($,{key:1,size:"mini",disabled:""},{default:y((function(){return[_("已选")]})),_:1}))]})),_:1}))]})),_:1},8,["data","onSelectionChange"])),[[A,F.loading]])]),b("div",D,[C(Y,{onSizeChange:j.handleSizeChange,onCurrentChange:j.handleCurrentChange,background:"","current-page":F.curPage,"page-sizes":[2,10,20,50,100],"page-size":F.pageSize,layout:"total, prev, pager, next, jumper",total:F.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])]})),_:1},8,["modelValue","onClose"])}]]))}}}));
