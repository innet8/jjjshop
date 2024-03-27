import{d as t,i as e,m as a,o as i,B as r,v as s}from"./element-plus-bf694ad1.js";import{S as n}from"./setting-238561bd.js";import o from"./add-111a4f43.js";import l from"./edit-1fffa6fe.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as d,an as m,o as c,c as u,a as g,_ as h,S as j,R as _,V as C,W as b,O as f,X as y}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-7f22f02f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const k={class:"user"},v={class:"common-level-rail"},z={class:"product-content"},D={class:"table-wrap"},$={class:"pagination"};const w=p({components:{Add:o,Edit:l},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,printerId:0,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(t){let e=this;e.loading=!0,e.curPage=t,e.getData()},handleSizeChange(t){this.curPage=1,this.pageSize=t,this.getData()},getData(){let t=this,e={};e.page=t.curPage,e.list_rows=t.pageSize,n.printerList(e,!0).then((e=>{t.loading=!1,t.tableData=e.data.list.data,t.totalDataNumber=e.data.list.total})).catch((t=>{}))},addClick(){this.open_add=!0},editClick(t){this.printerId=t.printer_id,this.open_edit=!0},deleteClick(e){let a=this;t.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{a.loading=!0,n.deletePrinter({printer_id:e.printer_id},!0).then((t=>{a.loading=!1,this.$ElMessage({message:t.msg,type:"success"}),a.getData()})).catch((t=>{a.loading=!1}))})).catch((()=>{a.loading=!1}))}}},[["render",function(t,n,o,l,p,w){const x=e,S=a,I=i,P=r,B=d("Add"),E=d("Edit"),N=m("auth"),q=s;return c(),u("div",k,[g("div",v,[h((c(),j(x,{size:"small",type:"primary",onClick:w.addClick},{default:_((()=>[C(b(t.$t("添加")),1)])),_:1},8,["onClick"])),[[N,"/supplier/printing/printer/add"]])]),g("div",z,[g("div",D,[h((c(),j(I,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:_((()=>[f(S,{prop:"printer_id",label:"ID"}),f(S,{prop:"printer_name",label:t.$t("打印机名称")},null,8,["label"]),f(S,{prop:"printer_type.text",label:t.$t("打印机类型")},null,8,["label"]),f(S,{prop:"sort",label:t.$t("排序")},null,8,["label"]),f(S,{prop:"create_time",label:t.$t("添加时间")},null,8,["label"]),f(S,{fixed:"right",label:t.$t("操作"),width:"120"},{default:_((e=>[h((c(),j(x,{onClick:t=>w.editClick(e.row),type:"primary",link:"",size:"small"},{default:_((()=>[C(b(t.$t("编辑")),1)])),_:2},1032,["onClick"])),[[N,"/supplier/printing/printer/edit"]]),h((c(),j(x,{onClick:t=>w.deleteClick(e.row),type:"primary",link:"",size:"small"},{default:_((()=>[C(b(t.$t("删除")),1)])),_:2},1032,["onClick"])),[[N,"/supplier/printing/printer/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[q,p.loading]])]),g("div",$,[f(P,{onSizeChange:w.handleSizeChange,onCurrentChange:w.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_add?(c(),j(B,{key:0,open_add:p.open_add,onClose:n[0]||(n[0]=t=>{p.open_add=!1,1==t&&this.getData()})},null,8,["open_add"])):y("",!0),p.open_edit?(c(),j(E,{key:1,open_edit:p.open_edit,printer_id:p.printerId,onClose:n[1]||(n[1]=t=>{p.open_edit=!1,1==t&&this.getData()})},null,8,["open_edit","printer_id"])):y("",!0)])}]]);export{w as default};
