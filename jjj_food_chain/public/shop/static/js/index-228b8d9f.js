import{d as e,i as t,m as a,o as i,B as s,v as l}from"./element-plus-bf694ad1.js";import{F as o}from"./fullreduce-1ea81ff8.js";import r from"./Edit-2a821ba5.js";import n from"./Add-62b2d62f.js";import{d as p}from"./index-191c97f6.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as u,an as c,o as m,c as g,a as h,_,S as j,R as f,V as y,O as b,X as C,W as k}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const v={class:"user"},w={class:"common-level-rail"},z={class:"product-content"},D={class:"table-wrap"},x={key:0,class:"green"},S={key:1},T={key:0},L={key:1},P={key:0},B={key:1},A={class:"pagination"};const E=d({components:{Edit:r,Add:n},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,currentModel:{}}),created(){this.getTableList()},methods:{handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,o.getList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.open_add=!0},editClick(e){this.currentModel=p(e),this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getTableList()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getTableList())},deleteClick(t){let a=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a.loading=!0,o.del({fullreduce_id:t.fullreduce_id},!0).then((e=>{a.loading=!1,this.$ElMessage({message:e.msg,type:"success"}),a.getTableList()})).catch((e=>{a.loading=!1}))})).catch((()=>{}))}}},[["render",function(e,o,r,n,p,d){const E=t,F=a,M=i,N=s,q=u("Add"),I=u("Edit"),G=c("auth"),J=l;return m(),g("div",v,[h("div",w,[_((m(),j(E,{size:"small",type:"primary",onClick:d.addClick,icon:"Plus"},{default:f((()=>[y("添加活动")])),_:1},8,["onClick"])),[[G,"/plus/fullreduce/add"]])]),h("div",z,[h("div",D,[_((m(),j(M,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:f((()=>[b(F,{label:"商家名称"},{default:f((e=>[null==e.row.supplier_name?(m(),g("span",x,"平台")):C("",!0),null!=e.row.supplier_name?(m(),g("span",S,k(e.row.supplier_name),1)):C("",!0)])),_:1}),b(F,{prop:"active_name",label:"活动名称"}),b(F,{prop:"full_type",label:"满类型"},{default:f((e=>[1==e.row.full_type?(m(),g("span",T,"满额")):C("",!0),2==e.row.full_type?(m(),g("span",L,"满件数")):C("",!0)])),_:1}),b(F,{prop:"full_value",label:"满值"}),b(F,{prop:"reduce_type",label:"减类型"},{default:f((e=>[1==e.row.reduce_type?(m(),g("span",P,"减金额")):C("",!0),2==e.row.reduce_type?(m(),g("span",B,"打折")):C("",!0)])),_:1}),b(F,{prop:"reduce_value",label:"减值"}),b(F,{fixed:"right",label:"操作",width:"120"},{default:f((e=>[_((m(),j(E,{onClick:t=>d.editClick(e.row),type:"primary",link:"",size:"small"},{default:f((()=>[y("编辑")])),_:2},1032,["onClick"])),[[G,"/plus/fullreduce/edit"]]),_((m(),j(E,{onClick:t=>d.deleteClick(e.row),type:"primary",link:"",size:"small"},{default:f((()=>[y("删除")])),_:2},1032,["onClick"])),[[G,"/plus/fullreduce/delete"]])])),_:1})])),_:1},8,["data"])),[[J,p.loading]])]),h("div",A,[b(N,{onSizeChange:d.handleSizeChange,onCurrentChange:d.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_add?(m(),j(q,{key:0,open_add:p.open_add,onCloseDialog:o[0]||(o[0]=e=>d.closeDialogFunc(e,"add"))},null,8,["open_add"])):C("",!0),p.open_edit?(m(),j(I,{key:1,open_edit:p.open_edit,form:p.currentModel,onCloseDialog:o[1]||(o[1]=e=>d.closeDialogFunc(e,"edit"))},null,8,["open_edit","form"])):C("",!0)])}]]);export{E as default};
