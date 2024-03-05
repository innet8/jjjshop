import{d as e,i as t,m as a,D as s,o,B as i,v as l}from"./element-plus-bf694ad1.js";import{P as r}from"./product-a602ebbc.js";import d from"./Edit-7cb34e8f.js";import p from"./Add-c1899503.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as c,an as u,o as m,c as g,a as h,_ as j,S as y,R as _,V as C,W as f,O as b,X as D}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-b7f24bbd.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./Upload-89c72f3e.js";import"./file-c1204fec.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const v={class:"product"},k={class:"common-level-rail"},z={class:"product-content"},S={class:"table-wrap"},$={class:"pagination"};const w=n({components:{Edit:d,Add:p},data:()=>({loading:!1,pageSize:10,totalDataNumber:0,curPage:1,open_add:!1,open_edit:!1,categoryModel:{catList:[],model:{}},tableData:[]}),created(){this.getData()},methods:{handleCurrentChange(e){this.loading=!0,this.curPage=e,this.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(){this.curPage=1,this.getData()},addClick(){this.open_add=!0},editClick(e){this.categoryModel.model=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},getData(){let e=this;e.loading=!0,r.storeCatSP({page:e.curPage,list_rows:e.pageSize},!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data||t.data.data||[],e.categoryModel.catList=e.tableData,e.totalDataNumber=t.data.list.total||0})).catch((t=>{e.loading=!1}))},deleteClick(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{r.storeCatDel({category_id:t.category_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))},statusSet(e,t){r.storeCatSet({category_id:t,status:e}).then((e=>{this.$ElMessage({message:e.msg,type:"success"})}))},statusSet(e,t){r.storeCatSet({category_id:t,status:e}).then((e=>{this.$ElMessage({message:e.msg,type:"success"})}))}}},[["render",function(e,r,d,p,n,w){const x=t,M=a,P=s,E=o,V=i,A=c("Add"),F=c("Edit"),N=u("auth"),U=l;return m(),g("div",v,[h("div",k,[j((m(),y(x,{size:"small",type:"primary",onClick:w.addClick,icon:"Plus"},{default:_((()=>[C(f(e.$t("添加分类")),1)])),_:1},8,["onClick"])),[[N,"/product/store/feature/add"]])]),h("div",z,[h("div",S,[j((m(),y(E,{size:"small",data:n.tableData,"row-key":"category_id","default-expand-all":"","tree-props":{children:"child"},style:{width:"100%"}},{default:_((()=>[b(M,{prop:"name_text",label:e.$t("分类名称")},null,8,["label"]),b(M,{prop:"sort",label:e.$t("状态")},{default:_((e=>[b(P,{disabled:!this.$filter.isAuth("/product/store/feature/state"),modelValue:e.row.status,"onUpdate:modelValue":t=>e.row.status=t,"active-value":1,"inactive-value":0,onChange:t=>w.statusSet(t,e.row.category_id)},null,8,["disabled","modelValue","onUpdate:modelValue","onChange"])])),_:1},8,["label"]),b(M,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),b(M,{prop:"sort",label:e.$t("排序")},null,8,["label"]),b(M,{fixed:"right",label:e.$t("操作"),width:"120"},{default:_((t=>[j((m(),y(x,{onClick:e=>w.editClick(t.row),type:"primary",link:"",size:"small"},{default:_((()=>[C(f(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[N,"/product/store/feature/edit"]]),j((m(),y(x,{onClick:e=>w.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:_((()=>[C(f(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[N,"/product/store/feature/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[U,n.loading]])]),h("div",$,[b(V,{onSizeChange:w.handleSizeChange,onCurrentChange:w.handleCurrentChange,background:"","current-page":n.curPage,"page-size":n.pageSize,layout:"total, prev, pager, next, jumper",total:n.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),n.open_add?(m(),y(A,{key:0,open_add:n.open_add,addform:n.categoryModel,onCloseDialog:r[0]||(r[0]=e=>w.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):D("",!0),n.open_edit?(m(),y(F,{key:1,open_edit:n.open_edit,editform:n.categoryModel,onCloseDialog:r[1]||(r[1]=e=>w.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):D("",!0)])])}],["__scopeId","data-v-9982741e"]]);export{w as default};