import{d as e,E as t,g as a,H as i,I as s,m as o,n as l,A as r,v as p}from"./element-plus-b30a858e.js";import{L as d}from"./live-3ddaf0b0.js";import n from"./add-a251f1b4.js";import c from"./edit-57dc425a.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as m,o as g,c as h,a as j,P as _,S as b,W as C,$ as f,T as v,Y as y}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-3370678a.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./group-e867a8bc.js";import"./Upload-9c7b6d53.js";import"./file-1c2123a7.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";const w={components:{Add:n,Edit:c},inject:["reload"],data:()=>({open_add:!1,open_edit:!1,loading:!1,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,open_audit:!1,wx_product_id:0,searchForm:{status:0},productModel:{}}),created(){this.getTableList()},methods:{openAdd(){this.open_add=!0},openEdit(e){this.productModel=e,this.open_edit=!0},handleCurrentChange(e){this.curPage=e,this.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){let t=this;t.curPage=1,t.searchForm.status=e,t.getTableList()},delClick:function(a){let i=this;e.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((()=>{d.deleteProduct({wx_product_id:a.wx_product_id}).then((e=>{t({message:"删除成功",type:"success"}),i.getTableList()}))}))},getTableList(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,d.productList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getTableList()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getTableList())}}},k={class:"list"},z={class:"d-s-c"},x={class:"flex-1 d-b-c"},D=j("span",null,"待审核",-1),T=j("span",null,"审核中",-1),L=j("span",null,"已通过",-1),S=j("span",null,"未通过",-1),P={class:"product-content"},F={class:"table-wrap"},A=["src"],E={class:"pagination"};const I=u(w,[["render",function(e,t,d,n,c,u){const w=a,I=i,M=s,N=o,V=l,U=r,W=m("Add"),q=m("Edit"),B=p;return g(),h("div",k,[j("div",z,[j("div",x,[_(w,{size:"small",type:"primary",icon:"Plus",onClick:u.openAdd},{default:b((()=>[C("添加商品")])),_:1},8,["onClick"])])]),_(M,{modelValue:c.searchForm.status,"onUpdate:modelValue":t[0]||(t[0]=e=>c.searchForm.status=e),type:"card",onTabChange:u.handleClick,style:{"margin-top":"18px"}},{default:b((()=>[_(I,{label:"待审核",name:0},{label:b((()=>[D])),_:1}),_(I,{label:"审核中",name:1},{label:b((()=>[T])),_:1}),_(I,{label:"已通过",name:2},{label:b((()=>[L])),_:1}),_(I,{label:"未通过",name:3},{label:b((()=>[S])),_:1})])),_:1},8,["modelValue","onTabChange"]),j("div",P,[j("div",F,[f((g(),v(V,{size:"small",data:c.tableData,border:"",style:{width:"100%"}},{default:b((()=>[_(N,{prop:"goods_id",label:"小程序商品Id"}),_(N,{prop:"name",label:"名称"}),_(N,{label:"商品图片"},{default:b((e=>[j("img",{src:e.row.cover_img,width:"30",height:"30"},null,8,A)])),_:1}),_(N,{prop:"price_type_text",label:"价格类型"}),_(N,{prop:"price_text",label:"价格",width:"200"}),_(N,{prop:"audit_status_text",label:"审核状态",width:"100"}),_(N,{prop:"create_time",label:"创建时间"}),_(N,{fixed:"right",label:"操作"},{default:b((e=>[3!=e.row.audit_status?(g(),v(w,{key:0,type:"primary",link:"",size:"small",onClick:t=>u.openEdit(e.row)},{default:b((()=>[C("编辑")])),_:2},1032,["onClick"])):y("",!0),_(w,{type:"primary",link:"",size:"small",onClick:t=>u.delClick(e.row)},{default:b((()=>[C("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[B,c.loading]])]),j("div",E,[_(U,{onSizeChange:u.handleSizeChange,onCurrentChange:u.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),_(W,{open_add:c.open_add,productId:c.wx_product_id,onCloseDialog:t[1]||(t[1]=e=>u.closeDialogFunc(e,"add"))},null,8,["open_add","productId"]),_(q,{open_edit:c.open_edit,editform:c.productModel,onCloseDialog:t[2]||(t[2]=e=>u.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])])}]]);export{I as default};