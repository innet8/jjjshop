System.register(["./element-plus-legacy-1289937f.js","./live-legacy-5b6d96c2.js","./ImportProduct-legacy-91a43ee3.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-6f6ce9e5.js","./vue-router-legacy-30bb5696.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,t){"use strict";var n,l,i,o,a,u,c,s,r,d,p,g,m,h,f,y,_,v,C,j,b,P,w,S=document.createElement("style");return S.textContent=".no-list .el-checkbox{display:none}\n",document.head.appendChild(S),{setters:[function(e){n=e.E,l=e.d,i=e.i,o=e.m,a=e.C,u=e.n,c=e.A,s=e.w,r=e.v},function(e){d=e.L},function(e){p=e.default},function(e){g=e._},function(e){m=e.ag,h=e.o,f=e.T,y=e.S,_=e.a,v=e.P,C=e.W,j=e.$,b=e.c,P=e.Y,w=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={class:"common-seach-wrap",style:{"margin-bottom":"10px"}},S={class:"product-content"},k={class:"table-wrap"},z=["src"],D={key:0},V={class:"pagination"};e("default",g({components:{ImportProduct:p},data:function(){return{open_import:!1,excludeIds:[],loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{},categoryList:[],productList:[],status:[{id:10,name:"上架"},{id:20,name:"下架"}],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null}},props:["open_liveProduct","room_id","live_id"],created:function(){this.dialogVisible=this.open_liveProduct,this.getData()},methods:{pushChange:function(e){var t=this,l=t.formInline;l.live_product_id=e.live_product_id,d.pushProduct(l,!0).then((function(e){1==e.code&&(n({message:"推送成功",type:"success"}),t.getData(),t.loading=!1)})).catch((function(e){}))},onSaleChange:function(e,t){var l=this,i=l.formInline;i.live_product_id=t.live_product_id,i.on_sale=e,d.onSale(i,!0).then((function(e){1==e.code&&(n({message:"操作成功",type:"success"}),l.getData(),l.loading=!1)})).catch((function(e){}))},selectableFunc:function(e){return"boolean"!=typeof e.noChoose||e.noChoose},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,t=e.formInline;t.page=e.curPage,t.list_rows=e.pageSize,t.room_id=e.room_id,d.liveProduct(t,!0).then((function(t){1==t.code&&(e.loading=!1,e.productList=t.data.list.data,e.totalDataNumber=t.data.list.total)})).catch((function(e){}))},SingleFunc:function(e){this.multipleSelection=[e],this.addClerk()},addClerk:function(){var e=this,t=null;e.multipleSelection.length<1?n({message:"请至少选择一件产品商品！",type:"error"}):(e.islist&&void 0!==e.islist?(e.multipleSelection.forEach((function(e){e.image=e.imagePath})),t=e.multipleSelection):(t=e.multipleSelection[0]).image=t.imagePath,e.params=t,e.type="success",e.dialogVisible=!1)},dialogFormVisible:function(){this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange:function(e){this.multipleSelection=e},addClick:function(){this.open_import=!0},closePop:function(e){if(this.open_import=!1,"success"==e.type){for(var t=[],n=0;n<e.params.length;n++){var l=e.params[n];t.push(l.goods_id)}this.importProductsFunc(t)}},importProductsFunc:function(e){var t=this,l={room_id:t.room_id,live_id:t.live_id,productIds:e};d.liveAddProduct(l,!0).then((function(e){1==e.code&&(n({message:"导入成功",type:"success"}),t.curPage=1,t.getData())})).catch((function(e){}))},delClick:function(e){var t=this;l.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){d.deleteLiveProduct({live_product_id:e.live_product_id}).then((function(e){n({message:"删除成功",type:"success"}),t.getData()}))}))}}},[["render",function(e,n,l,d,p,g){var x=i,I=o,L=a,F=u,A=c,E=m("ImportProduct"),N=s,U=r;return h(),f(N,{title:"选择商品",modelValue:p.dialogVisible,"onUpdate:modelValue":n[0]||(n[0]=function(e){return p.dialogVisible=e}),onClose:g.dialogFormVisible,"modal-append-to-body":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"900px"},{default:y((function(){return[_("div",t,[v(x,{type:"primary",size:"small",icon:"Plus",onClick:g.addClick},{default:y((function(){return[C("导入商品")]})),_:1},8,["onClick"])]),_("div",S,[_("div",k,[j((h(),f(F,{size:"small",data:p.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:g.tableCurrentChange},{default:y((function(){return[v(I,{width:"70",label:"商品图片"},{default:y((function(e){return[e.row.product?(h(),b("img",{key:0,src:e.row.product.cover_img,width:"30",height:"30"},null,8,z)):P("",!0)]})),_:1}),v(I,{prop:"name",label:"商品名称"},{default:y((function(e){return[e.row.product?(h(),b("span",D,w(e.row.product.name),1)):P("",!0)]})),_:1}),v(I,{width:"140",prop:"onSale",label:"上架状态"},{default:y((function(e){return[v(L,{onChange:function(t){return g.onSaleChange(t,e.row)},modelValue:e.row.on_sale,"onUpdate:modelValue":function(t){return e.row.on_sale=t},"active-value":1,"inactive-value":0},null,8,["onChange","modelValue","onUpdate:modelValue"])]})),_:1}),v(I,{prop:"isPush",width:"180",label:"推送状态"},{default:y((function(e){return[v(x,{disabled:0==e.row.isPush,onClick:function(t){return g.pushChange(e.row)},size:"small",type:"primary"},{default:y((function(){return[C("推送")]})),_:2},1032,["disabled","onClick"]),v(x,{onClick:function(t){return g.delClick(e.row)},size:"small",type:"primary"},{default:y((function(){return[C("删除")]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data","onSelectionChange"])),[[U,p.loading]])]),_("div",V,[v(A,{onSizeChange:g.handleSizeChange,onCurrentChange:g.handleCurrentChange,background:"","current-page":p.curPage,"page-sizes":[2,10,20,50,100],"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_import?(h(),f(E,{key:0,open_import:p.open_import,islist:!0,room_id:l.room_id,onCloseDialog:g.closePop},null,8,["open_import","room_id","onCloseDialog"])):P("",!0)]})),_:1},8,["modelValue","onClose"])}]]))}}}));
