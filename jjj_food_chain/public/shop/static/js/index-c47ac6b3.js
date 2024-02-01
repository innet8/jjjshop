import{d as e,i as t,I as a,J as s,m as i,o,B as l,v as r}from"./element-plus-c8084613.js";import{L as p}from"./live-13c7054d.js";import d from"./add-78381532.js";import n from"./edit-41f85e11.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as m,o as u,c as g,a as h,O as j,R as _,V as b,_ as f,S as C,X as y}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./group-ad8792db.js";import"./Upload-e7579a9c.js";import"./file-9623813c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const v={components:{Add:d,Edit:n},inject:["reload"],data:()=>({open_add:!1,open_edit:!1,loading:!1,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,open_audit:!1,wx_product_id:0,searchForm:{status:0},productModel:{}}),created(){this.getTableList()},methods:{openAdd(){this.open_add=!0},openEdit(e){this.productModel=e,this.open_edit=!0},handleCurrentChange(e){this.curPage=e,this.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){let t=this;t.curPage=1,t.searchForm.status=e,t.getTableList()},delClick:function(t){let a=this;e.confirm("删除后不可恢复，确认删除吗？","提示",{type:"warning"}).then((()=>{p.deleteProduct({wx_product_id:t.wx_product_id}).then((e=>{this.$ElMessage({message:"删除成功",type:"success"}),a.getTableList()}))}))},getTableList(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,p.productList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getTableList()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getTableList())}}},w={class:"list"},x={class:"d-s-c"},z={class:"flex-1 d-b-c"},k=h("span",null,"待审核",-1),D=h("span",null,"审核中",-1),L=h("span",null,"已通过",-1),T=h("span",null,"未通过",-1),F={class:"product-content"},S={class:"table-wrap"},P=["src"],E={class:"pagination"};const V=c(v,[["render",function(e,p,d,n,c,v){const V=t,A=a,I=s,M=i,N=o,U=l,q=m("Add"),B=m("Edit"),J=r;return u(),g("div",w,[h("div",x,[h("div",z,[j(V,{size:"small",type:"primary",icon:"Plus",onClick:v.openAdd},{default:_((()=>[b("添加商品")])),_:1},8,["onClick"])])]),j(I,{modelValue:c.searchForm.status,"onUpdate:modelValue":p[0]||(p[0]=e=>c.searchForm.status=e),type:"card",onTabChange:v.handleClick,style:{"margin-top":"18px"}},{default:_((()=>[j(A,{label:"待审核",name:0},{label:_((()=>[k])),_:1}),j(A,{label:"审核中",name:1},{label:_((()=>[D])),_:1}),j(A,{label:"已通过",name:2},{label:_((()=>[L])),_:1}),j(A,{label:"未通过",name:3},{label:_((()=>[T])),_:1})])),_:1},8,["modelValue","onTabChange"]),h("div",F,[h("div",S,[f((u(),C(N,{size:"small",data:c.tableData,border:"",style:{width:"100%"}},{default:_((()=>[j(M,{prop:"goods_id",label:"小程序商品Id"}),j(M,{prop:"name",label:"名称"}),j(M,{label:"商品图片"},{default:_((e=>[h("img",{src:e.row.cover_img,width:"30",height:"30"},null,8,P)])),_:1}),j(M,{prop:"price_type_text",label:"价格类型"}),j(M,{prop:"price_text",label:"价格",width:"200"}),j(M,{prop:"audit_status_text",label:"审核状态",width:"100"}),j(M,{prop:"create_time",label:"创建时间"}),j(M,{fixed:"right",label:"操作"},{default:_((e=>[3!=e.row.audit_status?(u(),C(V,{key:0,type:"primary",link:"",size:"small",onClick:t=>v.openEdit(e.row)},{default:_((()=>[b("编辑")])),_:2},1032,["onClick"])):y("",!0),j(V,{type:"primary",link:"",size:"small",onClick:t=>v.delClick(e.row)},{default:_((()=>[b("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[J,c.loading]])]),h("div",E,[j(U,{onSizeChange:v.handleSizeChange,onCurrentChange:v.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),j(q,{open_add:c.open_add,productId:c.wx_product_id,onCloseDialog:p[1]||(p[1]=e=>v.closeDialogFunc(e,"add"))},null,8,["open_add","productId"]),j(B,{open_edit:c.open_edit,editform:c.productModel,onCloseDialog:p[2]||(p[2]=e=>v.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])])}]]);export{V as default};
