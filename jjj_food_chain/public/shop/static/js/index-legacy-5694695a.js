System.register(["./element-plus-legacy-b61989a6.js","./product-legacy-46923c25.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-40cb594f.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,t){"use strict";var a,l,n,u,r,c,o,i,s,d,p,g,f,y,m,h,_,v,k,b,C,j,w,z,D,x,S,P,V,F;return{setters:[function(e){a=e.d,l=e.E,n=e.I,u=e.F,r=e.J,c=e.q,o=e.r,i=e.h,s=e.g,d=e.i,p=e.e,g=e.m,f=e.n,y=e.A,m=e.v},function(e){h=e.P},function(e){_=e._},function(e){v=e.ap,k=e.o,b=e.c,C=e.a,j=e.P,w=e.S,z=e.W,D=e.X,x=e.Q,S=e.a8,P=e.T,V=e.$,F=e.M},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={class:"product-list"},N={class:"common-seach-wrap"},q={class:"common-level-rail"},L={class:"product-content"},$={class:"table-wrap"},T={class:"product-info"},U={class:"pic"},A={alt:""},I={class:"info"},X={class:"name"},B={class:"price"},E={class:"pagination"};e("default",_({components:{},data:function(){return{activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,searchForm:{product_name:"",category_id:""},tableData:[],categoryList:[],product_count:{}}},created:function(){this.getData()},methods:{handleCurrentChange:function(e){var t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleClick:function(e,t){this.curPage=1,this.getData()},getData:function(){var e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,t.type=e.activeName,e.loading=!0,h.takeProductList(t,!0).then((function(t){e.loading=!1,e.tableData=t.data.list.data,e.categoryList=t.data.category,e.totalDataNumber=t.data.list.total,e.product_count=t.data.product_count})).catch((function(t){e.loading=!1}))},onSubmit:function(){this.curPage=1,this.getData()},addClick:function(){this.$router.push("/product/takeaway/product/add")},editClick:function(e){this.$router.push({path:"/product/takeaway/product/edit",query:{product_id:e.product_id,scene:"edit"}})},undercarriage:function(e,t){var n=this,u="",r="";20==t?(u="强制下架",r="下架"):10==t&&(u="重新上架",r="上架"),a.confirm("确认要"+u+"吗?","提示",{type:"warning"}).then((function(){h.takeStateProduct({product_id:e.product_id,state:t}).then((function(e){l({message:r+"成功",type:"success"}),n.getData()}))}))},copyClick:function(e){this.$router.push({path:"/product/product/edit",query:{product_id:e.product_id,scene:"copy"}})},deleteClick:function(e){var t=this;a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){h.takeDelProduct({product_id:e.product_id}).then((function(e){l({message:"删除成功",type:"success"}),t.getData()}))}))}}},[["render",function(e,a,l,h,_,J){var M=n,Q=u,W=r,G=c,H=o,K=i,O=s,R=d,Y=p,Z=g,ee=f,te=y,ae=v("auth"),le=v("img-url"),ne=m;return k(),b("div",t,[C("div",N,[j(W,{modelValue:_.activeName,"onUpdate:modelValue":a[0]||(a[0]=function(e){return _.activeName=e}),onTabChange:J.handleClick},{default:w((function(){return[j(M,{label:"上架中",name:"sell"}),j(M,{label:"下架",name:"lower"},{label:w((function(){return[C("span",null,[z(" 下架 "),j(Q,{size:""},{default:w((function(){return[z(D(_.product_count.lower),1)]})),_:1})])]})),_:1})]})),_:1},8,["modelValue","onTabChange"]),j(Y,{size:"small",inline:!0,model:_.searchForm,class:"demo-form-inline"},{default:w((function(){return[j(K,{label:"商品分类"},{default:w((function(){return[j(H,{size:"small",modelValue:_.searchForm.category_id,"onUpdate:modelValue":a[1]||(a[1]=function(e){return _.searchForm.category_id=e}),placeholder:"所有分类"},{default:w((function(){return[j(G,{label:"全部",value:"0"}),(k(!0),b(x,null,S(_.categoryList,(function(e){return k(),b(x,{key:e.category_id},[j(G,{value:e.category_id,label:e.name},null,8,["value","label"]),(k(!0),b(x,null,S(e.child,(function(e){return k(),P(G,{key:e.category_id,value:e.category_id,label:e.name},{default:w((function(){return[z("|—"+D(e.name),1)]})),_:2},1032,["value","label"])})),128))],64)})),128))]})),_:1},8,["modelValue"])]})),_:1}),j(K,{label:"商品名称"},{default:w((function(){return[j(O,{size:"small",modelValue:_.searchForm.product_name,"onUpdate:modelValue":a[2]||(a[2]=function(e){return _.searchForm.product_name=e}),placeholder:"请输入商品名称"},null,8,["modelValue"])]})),_:1}),j(K,null,{default:w((function(){return[j(R,{size:"small",type:"primary",icon:"Search",onClick:J.onSubmit},{default:w((function(){return[z("查询")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),C("div",q,[V((k(),P(R,{size:"small",type:"primary",icon:"Plus",onClick:J.addClick},{default:w((function(){return[z("添加产品")]})),_:1},8,["onClick"])),[[ae,"/product/takeaway/product/add"]])]),C("div",L,[C("div",$,[V((k(),P(ee,{size:"small",data:_.tableData,border:"",style:{width:"100%"}},{default:w((function(){return[j(Z,{prop:"product_name",label:"产品",width:"400px"},{default:w((function(e){return[C("div",T,[C("div",U,[V(C("img",A,null,512),[[le,e.row.image[0].file_path]])]),C("div",I,[C("div",X,D(e.row.product_name),1),C("div",B,"销售价："+D(e.row.product_price),1)])])]})),_:1}),j(Z,{prop:"category.name",label:"分类"}),j(Z,{prop:"sales_actual",label:"实际销量"}),j(Z,{prop:"product_stock",label:"库存"}),j(Z,{prop:"product_status.text",label:"状态"},{default:w((function(e){return[C("span",{class:F({green:10==e.row.product_status.value,gray:20==e.row.product_status.value})},D(e.row.product_status.text),3)]})),_:1}),j(Z,{prop:"create_time",label:"发布时间"}),j(Z,{prop:"product_sort",label:"排序"}),j(Z,{fixed:"right",label:"操作",width:"160"},{default:w((function(e){return[V((k(),P(R,{onClick:function(t){return J.editClick(e.row)},type:"text",size:"small"},{default:w((function(){return[z("编辑")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/edit"]]),20!=e.row.product_status.value?V((k(),P(R,{key:0,onClick:function(t){return J.undercarriage(e.row,20)},type:"text",size:"small"},{default:w((function(){return[z("下架")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/state"]]):V((k(),P(R,{key:1,onClick:function(t){return J.undercarriage(e.row,10)},type:"text",size:"small"},{default:w((function(){return[z("上架")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/state"]]),V((k(),P(R,{onClick:function(t){return J.deleteClick(e.row)},type:"text",size:"small"},{default:w((function(){return[z("删除")]})),_:2},1032,["onClick"])),[[ae,"/product/takeaway/product/delete"]])]})),_:1})]})),_:1},8,["data"])),[[ne,_.loading]])])]),C("div",E,[j(te,{onSizeChange:J.handleSizeChange,onCurrentChange:J.handleCurrentChange,background:"","current-page":_.curPage,"page-size":_.pageSize,layout:"total, prev, pager, next, jumper",total:_.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])}]]))}}}));
