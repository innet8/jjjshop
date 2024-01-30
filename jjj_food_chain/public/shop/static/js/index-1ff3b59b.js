import{d as e,I as a,F as t,J as l,q as o,r,h as s,g as i,i as d,e as c,m as u,n as p,A as n,v as m}from"./element-plus-b01b3a31.js";import{P as g}from"./product-ade04cbc.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as _,o as y,c as k,a as b,P as v,S as C,W as f,X as j,Q as w,a8 as z,T as D,$ as x,M as S}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const P={class:"product-list"},V={class:"common-seach-wrap"},F={class:"common-level-rail"},N={class:"product-content"},$={class:"table-wrap"},q={class:"product-info"},L={class:"pic"},M={alt:""},T={class:"info"},U={class:"name"},A={class:"price"},E={class:"pagination"};const I=h({components:{},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,searchForm:{product_name:"",category_id:""},tableData:[],categoryList:[],product_count:{}}),created(){this.getData()},methods:{handleCurrentChange(e){let a=this;a.loading=!0,a.curPage=e,a.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a=e.searchForm;a.page=e.curPage,a.list_rows=e.pageSize,a.type=e.activeName,e.loading=!0,g.takeProductList(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.categoryList=a.data.category,e.totalDataNumber=a.data.list.total,e.product_count=a.data.product_count})).catch((a=>{e.loading=!1}))},onSubmit(){this.curPage=1,this.getData()},addClick(){this.$router.push("/product/takeaway/product/add")},editClick(e){this.$router.push({path:"/product/takeaway/product/edit",query:{product_id:e.product_id,scene:"edit"}})},undercarriage(a,t){let l=this,o="",r="";20==t?(o="强制下架",r="下架"):10==t&&(o="重新上架",r="上架"),e.confirm("确认要"+o+"吗?","提示",{type:"warning"}).then((()=>{g.takeStateProduct({product_id:a.product_id,state:t}).then((e=>{this.$ElMessage({message:r+"成功",type:"success"}),l.getData()}))}))},copyClick(e){this.$router.push({path:"/product/product/edit",query:{product_id:e.product_id,scene:"copy"}})},deleteClick:function(a){let t=this;e.confirm("删除后不可恢复，确认删除吗？","提示",{type:"warning"}).then((()=>{g.takeDelProduct({product_id:a.product_id}).then((e=>{this.$ElMessage({message:"删除成功",type:"success"}),t.getData()}))}))}}},[["render",function(e,g,h,I,X,B){const J=a,Q=t,W=l,G=o,H=r,K=s,O=i,R=d,Y=c,Z=u,ee=p,ae=n,te=_("auth"),le=_("img-url"),oe=m;return y(),k("div",P,[b("div",V,[v(W,{modelValue:X.activeName,"onUpdate:modelValue":g[0]||(g[0]=e=>X.activeName=e),onTabChange:B.handleClick},{default:C((()=>[v(J,{label:"上架中",name:"sell"}),v(J,{label:"下架",name:"lower"},{label:C((()=>[b("span",null,[f(" 下架 "),v(Q,{size:""},{default:C((()=>[f(j(X.product_count.lower),1)])),_:1})])])),_:1})])),_:1},8,["modelValue","onTabChange"]),v(Y,{size:"small",inline:!0,model:X.searchForm,class:"demo-form-inline"},{default:C((()=>[v(K,{label:"商品分类"},{default:C((()=>[v(H,{size:"small",modelValue:X.searchForm.category_id,"onUpdate:modelValue":g[1]||(g[1]=e=>X.searchForm.category_id=e),placeholder:"所有分类"},{default:C((()=>[v(G,{label:"全部",value:"0"}),(y(!0),k(w,null,z(X.categoryList,(e=>(y(),k(w,{key:e.category_id},[v(G,{value:e.category_id,label:e.name},null,8,["value","label"]),(y(!0),k(w,null,z(e.child,(e=>(y(),D(G,{key:e.category_id,value:e.category_id,label:e.name},{default:C((()=>[f("|—"+j(e.name),1)])),_:2},1032,["value","label"])))),128))],64)))),128))])),_:1},8,["modelValue"])])),_:1}),v(K,{label:"商品名称"},{default:C((()=>[v(O,{size:"small",modelValue:X.searchForm.product_name,"onUpdate:modelValue":g[2]||(g[2]=e=>X.searchForm.product_name=e),placeholder:"请输入商品名称"},null,8,["modelValue"])])),_:1}),v(K,null,{default:C((()=>[v(R,{size:"small",type:"primary",icon:"Search",onClick:B.onSubmit},{default:C((()=>[f("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),b("div",F,[x((y(),D(R,{size:"small",type:"primary",icon:"Plus",onClick:B.addClick},{default:C((()=>[f("添加产品")])),_:1},8,["onClick"])),[[te,"/product/takeaway/product/add"]])]),b("div",N,[b("div",$,[x((y(),D(ee,{size:"small",data:X.tableData,border:"",style:{width:"100%"}},{default:C((()=>[v(Z,{prop:"product_name",label:"产品",width:"400px"},{default:C((e=>[b("div",q,[b("div",L,[x(b("img",M,null,512),[[le,e.row.image[0].file_path]])]),b("div",T,[b("div",U,j(e.row.product_name),1),b("div",A,"销售价："+j(e.row.product_price),1)])])])),_:1}),v(Z,{prop:"category.name",label:"分类"}),v(Z,{prop:"sales_actual",label:"实际销量"}),v(Z,{prop:"product_stock",label:"库存"}),v(Z,{prop:"product_status.text",label:"状态"},{default:C((e=>[b("span",{class:S({green:10==e.row.product_status.value,gray:20==e.row.product_status.value})},j(e.row.product_status.text),3)])),_:1}),v(Z,{prop:"create_time",label:"发布时间"}),v(Z,{prop:"product_sort",label:"排序"}),v(Z,{fixed:"right",label:"操作",width:"160"},{default:C((e=>[x((y(),D(R,{onClick:a=>B.editClick(e.row),type:"text",size:"small"},{default:C((()=>[f("编辑")])),_:2},1032,["onClick"])),[[te,"/product/takeaway/product/edit"]]),20!=e.row.product_status.value?x((y(),D(R,{key:0,onClick:a=>B.undercarriage(e.row,20),type:"text",size:"small"},{default:C((()=>[f("下架")])),_:2},1032,["onClick"])),[[te,"/product/takeaway/product/state"]]):x((y(),D(R,{key:1,onClick:a=>B.undercarriage(e.row,10),type:"text",size:"small"},{default:C((()=>[f("上架")])),_:2},1032,["onClick"])),[[te,"/product/takeaway/product/state"]]),x((y(),D(R,{onClick:a=>B.deleteClick(e.row),type:"text",size:"small"},{default:C((()=>[f("删除")])),_:2},1032,["onClick"])),[[te,"/product/takeaway/product/delete"]])])),_:1})])),_:1},8,["data"])),[[oe,X.loading]])])]),b("div",E,[v(ae,{onSizeChange:B.handleSizeChange,onCurrentChange:B.handleCurrentChange,background:"","current-page":X.curPage,"page-size":X.pageSize,layout:"total, prev, pager, next, jumper",total:X.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])}]]);export{I as default};
