import{d as e,g as t,h as a,i as l,e as i,m as o,o as s,B as n,v as d}from"./element-plus-bf694ad1.js";import{P as r}from"./product-27c484c5.js";import p from"./add-d2f1c20c.js";import c from"./edit-5fa6ccc3.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as u,an as h,o as g,c as j,a as _,O as b,R as C,V as f,W as y,_ as k,S as D,X as v}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./Upload-d46972b7.js";import"./file-2652919b.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const z={class:"product-list"},S={class:"common-level-rail"},$={class:"product-content"},x={class:"table-wrap"},w={class:"pagination"};const F=m({components:{Add:p,Edit:c},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,model:{},open_edit:!1,open_add:!1,tableData:[],multipleSelection:[],searchForm:{name:""}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,t){this.curPage=1,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,t.label_name=e.searchForm.name,e.loading=!0,r.LabelList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},addClick(){this.open_add=!0},deleteClick(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{r.deleteLabel({label_id:t}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))},deleteBatch(){let t=this,a=[];this.multipleSelection.forEach(((e,t)=>{a.push(e.label_id)}));let l=a.join(",");e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{r.deleteLabel({label_id:l}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),t.getData()}))}))},handleSelectionChange(e){this.multipleSelection=e},editClick(e){this.model=e,this.open_edit=!0}}},[["render",function(e,r,p,c,m,F){const P=t,E=a,B=l,L=i,N=o,V=s,I=n,q=u("Add"),A=u("Edit"),J=h("auth"),M=d;return g(),j("div",z,[_("div",S,[b(L,{size:"small",inline:!0,model:m.searchForm,class:"demo-form-inline"},{default:C((()=>[b(E,null,{default:C((()=>[b(P,{size:"small",modelValue:m.searchForm.name,"onUpdate:modelValue":r[0]||(r[0]=e=>m.searchForm.name=e),placeholder:e.$t("标签名称")},null,8,["modelValue","placeholder"])])),_:1}),b(E,null,{default:C((()=>[b(B,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:F.getData},{default:C((()=>[f(y(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),_("div",null,[k((g(),D(B,{size:"small",type:"primary",icon:"Plus",onClick:F.addClick},{default:C((()=>[f(y(e.$t("添加标签")),1)])),_:1},8,["onClick"])),[[J,"/product/expand/label/add"]]),k((g(),D(B,{size:"small",disabled:0==m.multipleSelection.length,onClick:F.deleteBatch},{default:C((()=>[f(y(e.$t("批量删除")),1)])),_:1},8,["disabled","onClick"])),[[J,"/product/expand/label/batch_delete"]])])]),_("div",$,[_("div",x,[k((g(),D(V,{size:"small",data:m.tableData,border:"",style:{width:"100%"},onSelectionChange:F.handleSelectionChange},{default:C((()=>[b(N,{type:"selection",width:"45"}),b(N,{prop:"label_name_text",label:e.$t("标签名称")},null,8,["label"]),b(N,{prop:"sort",label:e.$t("排序")},null,8,["label"]),b(N,{fixed:"right",label:e.$t("操作"),width:"120"},{default:C((t=>[k((g(),D(B,{onClick:e=>F.editClick(t.row),type:"primary",link:"",size:"small"},{default:C((()=>[f(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[J,"/product/expand/label/edit"]]),k((g(),D(B,{onClick:e=>F.deleteClick(t.row.label_id),type:"primary",link:"",size:"small"},{default:C((()=>[f(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[J,"/product/expand/label/delete"]])])),_:1},8,["label"])])),_:1},8,["data","onSelectionChange"])),[[M,m.loading]])])]),_("div",w,[b(I,{onSizeChange:F.handleSizeChange,onCurrentChange:F.handleCurrentChange,background:"","current-page":m.curPage,"page-size":m.pageSize,layout:"total, prev, pager, next, jumper",total:m.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),m.open_add?(g(),D(q,{key:0,open_add:m.open_add,addform:m.model,onCloseDialog:r[1]||(r[1]=e=>F.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):v("",!0),m.open_edit?(g(),D(A,{key:1,open_edit:m.open_edit,editform:m.model,onCloseDialog:r[2]||(r[2]=e=>F.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):v("",!0)])}],["__scopeId","data-v-a335539c"]]);export{F as default};
