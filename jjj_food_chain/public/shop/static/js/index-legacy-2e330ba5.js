System.register(["./element-plus-legacy-c476e0a4.js","./product-legacy-2ca4a36e.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-96f9b441.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,t){"use strict";var a,l,n,u,r,c,o,i,s,d,p,g,f,y,m,h,_,v,k,b,C,j,w,z,D,x,S,P,V;return{setters:[function(e){a=e.d,l=e.I,n=e.F,u=e.J,r=e.r,c=e.s,o=e.h,i=e.g,s=e.i,d=e.e,p=e.m,g=e.o,f=e.B,y=e.v},function(e){m=e.P},function(e){h=e._},function(e){_=e.ap,v=e.o,k=e.c,b=e.a,C=e.P,j=e.S,w=e.W,z=e.X,D=e.Q,x=e.a8,S=e.T,P=e.$,V=e.M},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={class:"product-list"},F={class:"common-seach-wrap"},N={class:"common-level-rail"},$={class:"product-content"},L={class:"table-wrap"},q={class:"product-info"},M={class:"pic"},T={alt:""},U={class:"info"},B={class:"name"},E={class:"price"},I={class:"pagination"};e("default",h({components:{},data:function(){return{activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,searchForm:{product_name:"",category_id:""},tableData:[],categoryList:[],product_count:{}}},created:function(){this.getData()},methods:{handleCurrentChange:function(e){var t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleClick:function(e,t){this.curPage=1,this.getData()},getData:function(){var e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,t.type=e.activeName,e.loading=!0,m.takeProductList(t,!0).then((function(t){e.loading=!1,e.tableData=t.data.list.data,e.categoryList=t.data.category,e.totalDataNumber=t.data.list.total,e.product_count=t.data.product_count})).catch((function(t){e.loading=!1}))},onSubmit:function(){this.curPage=1,this.getData()},addClick:function(){this.$router.push("/product/takeaway/product/add")},editClick:function(e){this.$router.push({path:"/product/takeaway/product/edit",query:{product_id:e.product_id,scene:"edit"}})},undercarriage:function(e,t){var l=this,n=this,u="",r="";20==t?(u="强制下架",r="下架"):10==t&&(u="重新上架",r="上架"),a.confirm("确认要"+u+"吗?","提示",{type:"warning"}).then((function(){m.takeStateProduct({product_id:e.product_id,state:t}).then((function(e){l.$ElMessage({message:r+"成功",type:"success"}),n.getData()}))}))},copyClick:function(e){this.$router.push({path:"/product/product/edit",query:{product_id:e.product_id,scene:"copy"}})},deleteClick:function(e){var t=this,l=this;a.confirm("删除后不可恢复，确认删除吗？","提示",{type:"warning"}).then((function(){m.takeDelProduct({product_id:e.product_id}).then((function(e){t.$ElMessage({message:"删除成功",type:"success"}),l.getData()}))}))}}},[["render",function(e,a,m,h,X,A){var J=l,Q=n,W=u,G=r,H=c,K=o,O=i,R=s,Y=d,Z=p,ee=g,te=f,ae=_("auth"),le=_("img-url"),ne=y;return v(),k("div",t,[b("div",F,[C(W,{modelValue:X.activeName,"onUpdate:modelValue":a[0]||(a[0]=function(e){return X.activeName=e}),onTabChange:A.handleClick},{default:j((function(){return[C(J,{label:"上架中",name:"sell"}),C(J,{label:"下架",name:"lower"},{label:j((function(){return[b("span",null,[w(" 下架 "),C(Q,{size:""},{default:j((function(){return[w(z(X.product_count.lower),1)]})),_:1})])]})),_:1})]})),_:1},8,["modelValue","onTabChange"]),C(Y,{size:"small",inline:!0,model:X.searchForm,class:"demo-form-inline"},{default:j((function(){return[C(K,{label:"商品分类"},{default:j((function(){return[C(H,{size:"small",modelValue:X.searchForm.category_id,"onUpdate:modelValue":a[1]||(a[1]=function(e){return X.searchForm.category_id=e}),placeholder:"所有分类"},{default:j((function(){return[C(G,{label:"全部",value:"0"}),(v(!0),k(D,null,x(X.categoryList,(function(e){return v(),k(D,{key:e.category_id},[C(G,{value:e.category_id,label:e.name},null,8,["value","label"]),(v(!0),k(D,null,x(e.child,(function(e){return v(),S(G,{key:e.category_id,value:e.category_id,label:e.name},{default:j((function(){return[w("|—"+z(e.name),1)]})),_:2},1032,["value","label"])})),128))],64)})),128))]})),_:1},8,["modelValue"])]})),_:1}),C(K,{label:"商品名称"},{default:j((function(){return[C(O,{size:"small",modelValue:X.searchForm.product_name,"onUpdate:modelValue":a[2]||(a[2]=function(e){return X.searchForm.product_name=e}),placeholder:"请输入商品名称"},null,8,["modelValue"])]})),_:1}),C(K,null,{default:j((function(){return[C(R,{size:"small",type:"primary",icon:"Search",onClick:A.onSubmit},{default:j((function(){return[w("查询")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),b("div",N,[P((v(),S(R,{size:"small",type:"primary",icon:"Plus",onClick:A.addClick},{default:j((function(){return[w("添加产品")]})),_:1},8,["onClick"])),[[ae,"/product/takeaway/product/add"]])]),b("div",$,[b("div",L,[P((v(),S(ee,{size:"small",data:X.tableData,border:"",style:{width:"100%"}},{default:j((function(){return[C(Z,{prop:"product_name",label:"产品",width:"400px"},{default:j((function(e){return[b("div",q,[b("div",M,[P(b("img",T,null,512),[[le,e.row.image[0].file_path]])]),b("div",U,[b("div",B,z(e.row.product_name),1),b("div",E,"销售价："+z(e.row.product_price),1)])])]})),_:1}),C(Z,{prop:"category.name",label:"分类"}),C(Z,{prop:"sales_actual",label:"实际销量"}),C(Z,{prop:"product_stock",label:"库存"}),C(Z,{prop:"product_status.text",label:"状态"},{default:j((function(e){return[b("span",{class:V({green:10==e.row.product_status.value,gray:20==e.row.product_status.value})},z(e.row.product_status.text),3)]})),_:1}),C(Z,{prop:"create_time",label:"发布时间"}),C(Z,{prop:"product_sort",label:"排序"}),C(Z,{fixed:"right",label:"操作",width:"160"},{default:j((function(e){return[P((v(),S(R,{onClick:function(t){return A.editClick(e.row)},type:"text",size:"small"},{default:j((function(){return[w("编辑")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/edit"]]),20!=e.row.product_status.value?P((v(),S(R,{key:0,onClick:function(t){return A.undercarriage(e.row,20)},type:"text",size:"small"},{default:j((function(){return[w("下架")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/state"]]):P((v(),S(R,{key:1,onClick:function(t){return A.undercarriage(e.row,10)},type:"text",size:"small"},{default:j((function(){return[w("上架")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/state"]]),P((v(),S(R,{onClick:function(t){return A.deleteClick(e.row)},type:"text",size:"small"},{default:j((function(){return[w("删除")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/delete"]])]})),_:1})]})),_:1},8,["data"])),[[ne,X.loading]])])]),b("div",I,[C(te,{onSizeChange:A.handleSizeChange,onCurrentChange:A.handleCurrentChange,background:"","current-page":X.curPage,"page-size":X.pageSize,layout:"total, prev, pager, next, jumper",total:X.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])}]]))}}}));