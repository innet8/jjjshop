!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}System.register(["./element-plus-legacy-b61989a6.js","./product-legacy-00207b7d.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-9e638fb2.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(t,l){"use strict";var a,n,o,u,r,c,i,s,d,p,g,m,f,y,h,b,_,v,$,j,C,k,w,z,S,x=document.createElement("style");return x.textContent=".common-seach-wrap[data-v-af862e4d]{display:flex;justify-content:space-between;margin-bottom:0}\n",document.head.appendChild(x),{setters:[function(e){a=e.d,n=e.Q,o=e.h,u=e.q,r=e.r,c=e.g,i=e.i,s=e.e,d=e.m,p=e.C,g=e.n,m=e.A,f=e.v},function(e){y=e.P},function(e){h=e._},function(e){b=e.ap,_=e.o,v=e.c,$=e.a,j=e.P,C=e.S,k=e.W,w=e.X,z=e.$,S=e.T},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"product-list"},x={class:"common-seach-wrap"},D={class:"product-content"},P={class:"table-wrap"},V={class:"product-info"},N={class:"pic"},F={alt:""},q={class:"info"},L={class:"name"},U={class:"price"},A={class:"pagination"};t("default",h({components:{},data:function(){return{activeName:"",stock:"",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,searchForm:{product_name:"",category_id:""},tableData:[],categoryList:[],product_count:{}}},created:function(){this.$route.query.inventory&&(this.stock=10,this.$route.query={}),this.getData()},methods:{handleCurrentChange:function(e){var t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleClick:function(e,t){this.curPage=1,this.getData()},getData:function(){var t=this,l=t.searchForm;l.page=t.curPage,l.list_rows=t.pageSize,l.type=t.activeName,l.stock=t.stock,"object"==e(l.category_id)&&l.category_id&&(l.category_id=Number(l.category_id[l.category_id.length-1])),t.loading=!0,y.storeProductList(l,!0).then((function(e){t.loading=!1,t.tableData=e.data.list.data,t.categoryList=[],e.data.category.map((function(e,l){t.categoryList.push({value:e.category_id,label:e.name_text,children:[]}),e.child.map((function(e,a){t.categoryList[l].children.push({value:e.category_id,label:e.name_text})}))})),t.totalDataNumber=e.data.list.total,t.product_count=e.data.product_count})).catch((function(e){t.loading=!1}))},onSubmit:function(){this.curPage=1,this.getData()},addClick:function(){this.$router.push("/product/store/product/add")},editClick:function(e){this.$router.push({path:"/product/store/product/edit",query:{product_id:e.product_id,scene:"edit"}})},undercarriage:function(e,t){var l=this,n=this,o="",u="";20==t?(o=$t("强制下架"),u=$t("下架")):10==t&&(o=$t("重新上架"),u=$t("上架")),a.confirm($t("确认要")+o+$t("吗?"),$t("提示"),{type:"warning"}).then((function(){y.storeStateProduct({product_id:e.product_id,state:t}).then((function(e){l.$ElMessage({message:u+$t("成功"),type:"success"}),n.getData()}))}))},copyClick:function(e){this.$router.push({path:"/product/product/edit",query:{product_id:e.product_id,scene:"copy"}})},deleteClick:function(e){var t=this,l=this;a.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((function(){y.storeDelProduct({product_id:e.product_id}).then((function(e){t.$ElMessage({message:$t("删除成功"),type:"success"}),l.getData()}))}))}}},[["render",function(e,t,a,y,h,E){var I=this,M=n,X=o,B=u,Q=r,T=c,W=i,G=s,H=d,J=p,K=g,O=m,R=b("auth"),Y=b("img-url"),Z=f;return _(),v("div",l,[$("div",x,[j(G,{size:"small",inline:!0,model:h.searchForm,class:"demo-form-inline"},{default:C((function(){return[j(X,{label:e.$t("商品分类")},{default:C((function(){return[j(M,{options:h.categoryList,props:{checkStrictly:!0},modelValue:h.searchForm.category_id,"onUpdate:modelValue":t[0]||(t[0]=function(e){return h.searchForm.category_id=e}),clearable:"",placeholder:e.$t("请选择分类")},null,8,["options","modelValue","placeholder"])]})),_:1},8,["label"]),j(X,{label:e.$t("商品库存")},{default:C((function(){return[j(Q,{size:"small",modelValue:h.stock,"onUpdate:modelValue":t[1]||(t[1]=function(e){return h.stock=e}),placeholder:e.$t("全部库存")},{default:C((function(){return[j(B,{label:e.$t("全部"),value:" "},null,8,["label"]),j(B,{label:e.$t("库存低于10"),value:"10"},null,8,["label"]),j(B,{label:e.$t("库存低于20"),value:"20"},null,8,["label"]),j(B,{label:e.$t("库存低于50"),value:"50"},null,8,["label"])]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),j(X,{label:e.$t("商品状态")},{default:C((function(){return[j(Q,{size:"small",modelValue:h.activeName,"onUpdate:modelValue":t[2]||(t[2]=function(e){return h.activeName=e}),placeholder:e.$t("商品状态")},{default:C((function(){return[j(B,{label:e.$t("全部"),value:"all"},null,8,["label"]),j(B,{label:e.$t("上架中"),value:"sell"},null,8,["label"]),j(B,{label:e.$t("下架中"),value:"lower"},null,8,["label"])]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),j(X,{label:e.$t("商品名称")},{default:C((function(){return[j(T,{size:"small",modelValue:h.searchForm.product_name,"onUpdate:modelValue":t[3]||(t[3]=function(e){return h.searchForm.product_name=e}),placeholder:e.$t("请输入商品名称")},null,8,["modelValue","placeholder"])]})),_:1},8,["label"]),j(X,null,{default:C((function(){return[j(W,{size:"small",type:"primary",icon:"Search",onClick:E.onSubmit},{default:C((function(){return[k(w(e.$t("查询")),1)]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"]),z((_(),S(W,{size:"small",type:"primary",icon:"Plus",onClick:E.addClick},{default:C((function(){return[k(w(e.$t("添加商品")),1)]})),_:1},8,["onClick"])),[[R,"/product/store/product/add"]])]),$("div",D,[$("div",P,[z((_(),S(K,{size:"small",data:h.tableData,border:"",style:{width:"100%"}},{default:C((function(){return[j(H,{prop:"product_name",label:e.$t("商品名称"),width:"400px"},{default:C((function(t){return[$("div",V,[$("div",N,[z($("img",F,null,512),[[Y,t.row.image[0].file_path]])]),$("div",q,[$("div",L,w(t.row.product_name_text),1),$("div",U,w(e.$t("销售价："))+w(t.row.product_price),1)])])]})),_:1},8,["label"]),j(H,{prop:"category.path_name_text",label:e.$t("分类")},null,8,["label"]),j(H,{prop:"sales_actual",label:e.$t("实际销量")},null,8,["label"]),j(H,{prop:"product_stock",label:e.$t("库存")},null,8,["label"]),j(H,{prop:"product_status.text",label:e.$t("状态"),width:"100"},{default:C((function(e){return[j(J,{disabled:!I.$filter.isAuth("/product/store/product/state"),"model-value":10==e.row.product_status.value,onClick:function(t){return E.undercarriage(e.row,10==e.row.product_status.value?20:10)}},null,8,["disabled","model-value","onClick"])]})),_:1},8,["label"]),j(H,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),j(H,{prop:"product_sort",label:e.$t("排序")},null,8,["label"]),j(H,{fixed:"right",label:e.$t("操作"),width:"120"},{default:C((function(t){return[z((_(),S(W,{onClick:function(e){return E.editClick(t.row)},type:"primary",link:"",size:"small"},{default:C((function(){return[k(w(e.$t("编辑")),1)]})),_:2},1032,["onClick"])),[[R,"/product/store/product/edit"]]),z((_(),S(W,{onClick:function(e){return E.deleteClick(t.row)},type:"primary",link:"",size:"small"},{default:C((function(){return[k(w(e.$t("删除")),1)]})),_:2},1032,["onClick"])),[[R,"/product/store/product/delete"]])]})),_:1},8,["label"])]})),_:1},8,["data"])),[[Z,h.loading]])])]),$("div",A,[j(O,{onSizeChange:E.handleSizeChange,onCurrentChange:E.handleCurrentChange,background:"","current-page":h.curPage,"page-size":h.pageSize,layout:"total, prev, pager, next, jumper",total:h.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])}],["__scopeId","data-v-af862e4d"]]))}}}))}();
