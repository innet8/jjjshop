import{d as e,g as t,h as a,i,e as l,m as o,n as s,A as n,v as d}from"./element-plus-b01b3a31.js";import{P as r}from"./product-ade04cbc.js";import p from"./add-46d414b9.js";import m from"./edit-569cd71e.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as u,ap as h,o as g,c as j,a as _,P as C,S as f,W as b,X as y,$ as D,T as k,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-e0b57212.js";import"./file-fa4138eb.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const z={class:"product-list"},S={class:"common-level-rail"},$={class:"product-content"},w={class:"table-wrap"},x={class:"pagination"};const F=c({components:{Add:p,Edit:m},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,model:{},open_edit:!1,open_add:!1,tableData:[],multipleSelection:[],searchForm:{name:""}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,t){this.curPage=1,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,t.unit_name=e.searchForm.name,e.loading=!0,r.UnitList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},addClick(){this.open_add=!0},deleteClick(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{r.deleteUnit({unit_id:t}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))},deleteBatch(){let t=this,a=[];this.multipleSelection.forEach(((e,t)=>{a.push(e.unit_id)}));let i=a.join(",");e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{r.deleteUnit({unit_id:i}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),t.getData()}))}))},handleSelectionChange(e){this.multipleSelection=e},editClick(e){this.model=e,this.open_edit=!0}}},[["render",function(e,r,p,m,c,F){const P=t,E=a,U=i,A=l,N=o,B=s,V=n,I=u("Add"),M=u("Edit"),X=h("auth"),q=d;return g(),j("div",z,[_("div",S,[C(A,{size:"small",inline:!0,model:c.searchForm,class:"demo-form-inline"},{default:f((()=>[C(E,null,{default:f((()=>[C(P,{size:"small",modelValue:c.searchForm.name,"onUpdate:modelValue":r[0]||(r[0]=e=>c.searchForm.name=e),placeholder:e.$t("单位名称")},null,8,["modelValue","placeholder"])])),_:1}),C(E,null,{default:f((()=>[C(U,{size:"small",type:"primary",icon:"Search",onClick:F.getData},{default:f((()=>[b(y(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),_("div",null,[D((g(),k(U,{size:"small",type:"primary",icon:"Plus",onClick:F.addClick},{default:f((()=>[b(y(e.$t("添加单位")),1)])),_:1},8,["onClick"])),[[X,"/product/expand/unit/add"]]),D((g(),k(U,{size:"small",disabled:0==c.multipleSelection.length,onClick:F.deleteBatch},{default:f((()=>[b(y(e.$t("批量删除")),1)])),_:1},8,["disabled","onClick"])),[[X,"/product/expand/unit/batch_delete"]])])]),_("div",$,[_("div",w,[D((g(),k(B,{size:"small",data:c.tableData,border:"",style:{width:"100%"},onSelectionChange:F.handleSelectionChange},{default:f((()=>[C(N,{type:"selection",width:"45"}),C(N,{prop:"unit_name_text",label:e.$t("单位名称"),width:"400px"},null,8,["label"]),C(N,{prop:"sort",label:e.$t("排序")},null,8,["label"]),C(N,{fixed:"right",label:e.$t("操作"),width:"120"},{default:f((t=>[D((g(),k(U,{onClick:e=>F.editClick(t.row),type:"primary",link:"",size:"small"},{default:f((()=>[b(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[X,"/product/expand/unit/edit"]]),D((g(),k(U,{onClick:e=>F.deleteClick(t.row.unit_id),type:"primary",link:"",size:"small"},{default:f((()=>[b(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[X,"/product/expand/unit/delete"]])])),_:1},8,["label"])])),_:1},8,["data","onSelectionChange"])),[[q,c.loading]])])]),_("div",x,[C(V,{onSizeChange:F.handleSizeChange,onCurrentChange:F.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),c.open_add?(g(),k(I,{key:0,open_add:c.open_add,addform:c.model,onCloseDialog:r[1]||(r[1]=e=>F.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):v("",!0),c.open_edit?(g(),k(M,{key:1,open_edit:c.open_edit,editform:c.model,onCloseDialog:r[2]||(r[2]=e=>F.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):v("",!0)])}],["__scopeId","data-v-8823b051"]]);export{F as default};
