import{d as e,i as t,I as a,J as s,m as i,n as o,A as l,v as r}from"./element-plus-b01b3a31.js";import{L as p}from"./live-e65d5f04.js";import d from"./add-9d06d2ea.js";import n from"./edit-5e627995.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as m,o as u,c as g,a as h,P as j,S as _,W as b,$ as C,T as f,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./group-7af7f1fe.js";import"./Upload-e0b57212.js";import"./file-fa4138eb.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const y={components:{Add:d,Edit:n},inject:["reload"],data:()=>({open_add:!1,open_edit:!1,loading:!1,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,open_audit:!1,wx_product_id:0,searchForm:{status:0},productModel:{}}),created(){this.getTableList()},methods:{openAdd(){this.open_add=!0},openEdit(e){this.productModel=e,this.open_edit=!0},handleCurrentChange(e){this.curPage=e,this.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){let t=this;t.curPage=1,t.searchForm.status=e,t.getTableList()},delClick:function(t){let a=this;e.confirm("删除后不可恢复，确认删除吗？","提示",{type:"warning"}).then((()=>{p.deleteProduct({wx_product_id:t.wx_product_id}).then((e=>{this.$ElMessage({message:"删除成功",type:"success"}),a.getTableList()}))}))},getTableList(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,p.productList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getTableList()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getTableList())}}},w={class:"list"},k={class:"d-s-c"},z={class:"flex-1 d-b-c"},x=h("span",null,"待审核",-1),D=h("span",null,"审核中",-1),T=h("span",null,"已通过",-1),L=h("span",null,"未通过",-1),S={class:"product-content"},P={class:"table-wrap"},F=["src"],A={class:"pagination"};const E=c(y,[["render",function(e,p,d,n,c,y){const E=t,I=a,M=s,N=i,V=o,U=l,$=m("Add"),q=m("Edit"),B=r;return u(),g("div",w,[h("div",k,[h("div",z,[j(E,{size:"small",type:"primary",icon:"Plus",onClick:y.openAdd},{default:_((()=>[b("添加商品")])),_:1},8,["onClick"])])]),j(M,{modelValue:c.searchForm.status,"onUpdate:modelValue":p[0]||(p[0]=e=>c.searchForm.status=e),type:"card",onTabChange:y.handleClick,style:{"margin-top":"18px"}},{default:_((()=>[j(I,{label:"待审核",name:0},{label:_((()=>[x])),_:1}),j(I,{label:"审核中",name:1},{label:_((()=>[D])),_:1}),j(I,{label:"已通过",name:2},{label:_((()=>[T])),_:1}),j(I,{label:"未通过",name:3},{label:_((()=>[L])),_:1})])),_:1},8,["modelValue","onTabChange"]),h("div",S,[h("div",P,[C((u(),f(V,{size:"small",data:c.tableData,border:"",style:{width:"100%"}},{default:_((()=>[j(N,{prop:"goods_id",label:"小程序商品Id"}),j(N,{prop:"name",label:"名称"}),j(N,{label:"商品图片"},{default:_((e=>[h("img",{src:e.row.cover_img,width:"30",height:"30"},null,8,F)])),_:1}),j(N,{prop:"price_type_text",label:"价格类型"}),j(N,{prop:"price_text",label:"价格",width:"200"}),j(N,{prop:"audit_status_text",label:"审核状态",width:"100"}),j(N,{prop:"create_time",label:"创建时间"}),j(N,{fixed:"right",label:"操作"},{default:_((e=>[3!=e.row.audit_status?(u(),f(E,{key:0,type:"primary",link:"",size:"small",onClick:t=>y.openEdit(e.row)},{default:_((()=>[b("编辑")])),_:2},1032,["onClick"])):v("",!0),j(E,{type:"primary",link:"",size:"small",onClick:t=>y.delClick(e.row)},{default:_((()=>[b("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[B,c.loading]])]),h("div",A,[j(U,{onSizeChange:y.handleSizeChange,onCurrentChange:y.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),j($,{open_add:c.open_add,productId:c.wx_product_id,onCloseDialog:p[1]||(p[1]=e=>y.closeDialogFunc(e,"add"))},null,8,["open_add","productId"]),j(q,{open_edit:c.open_edit,editform:c.productModel,onCloseDialog:p[2]||(p[2]=e=>y.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])])}]]);export{E as default};
