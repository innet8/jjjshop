import{d as e,E as t,g as a,m as i,n as l,A as o,v as r}from"./element-plus-b30a858e.js";import{S as s}from"./supplier-f413f79c.js";import n from"./add-9646458e.js";import p from"./edit-69226e44.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as m,ap as u,o as c,c as g,a as h,$ as j,T as _,S as b,W as C,X as v,P as $,Y as f}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-3c897039.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";const k={class:"user"},y={class:"common-level-rail"},w={class:"product-content"},z={class:"table-wrap"},D={key:0},S={key:1},x={key:2},I={key:3},P={class:"pagination"};const A=d({components:{Add:n,Edit:p},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,editId:0,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,s.printingList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.open_add=!0},editClick(e){this.editId=e.id,this.open_edit=!0},deleteClick(a){let i=this;e.confirm($t("此操作将永久删除该记录, 是否继续?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{i.loading=!0,s.deletePrinting({id:a.id},!0).then((e=>{i.loading=!1,t({message:e.msg,type:"success"}),i.getData()})).catch((e=>{i.loading=!1}))})).catch((()=>{i.loading=!1}))}}},[["render",function(e,t,s,n,p,d){const A=a,B=i,E=l,N=o,T=m("Add"),W=m("Edit"),q=u("auth"),L=r;return c(),g("div",k,[h("div",y,[j((c(),_(A,{size:"small",type:"primary",onClick:d.addClick},{default:b((()=>[C(v(e.$t("添加")),1)])),_:1},8,["onClick"])),[[q,"/supplier/printing/add"]])]),h("div",w,[h("div",z,[j((c(),_(E,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:b((()=>[$(B,{prop:"id",label:"ID"}),$(B,{prop:"name",label:e.$t("名称")},null,8,["label"]),$(B,{prop:"printer.printer_name",label:e.$t("打印机")},null,8,["label"]),$(B,{prop:"product_type",label:e.$t("打印模式")},{default:b((t=>[h("div",null,v(10==t.row.type?e.$t("付款打印"):e.$t("送厨打印")),1)])),_:1},8,["label"]),$(B,{prop:"print_method",label:e.$t("打印方式")},{default:b((t=>[10==t.row.print_method?(c(),g("div",D,v(e.$t("整单打印")),1)):f("",!0),20==t.row.print_method?(c(),g("div",S,v(e.$t("按商品分组打印")),1)):f("",!0),30==t.row.print_method?(c(),g("div",x,v(e.$t("按标签打印")),1)):f("",!0),40==t.row.print_method?(c(),g("div",I,v(e.$t("一菜一单")),1)):f("",!0)])),_:1},8,["label"]),$(B,{prop:"is_open",label:e.$t("状态")},{default:b((t=>[h("div",null,v(0==t.row.is_open?e.$t("关闭"):e.$t("开启")),1)])),_:1},8,["label"]),$(B,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),$(B,{fixed:"right",label:e.$t("操作"),width:"120"},{default:b((t=>[j((c(),_(A,{onClick:e=>d.editClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(v(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[q,"/supplier/printing/edit"]]),j((c(),_(A,{onClick:e=>d.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(v(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[q,"/supplier/printing/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[L,p.loading]])]),h("div",P,[$(N,{onSizeChange:d.handleSizeChange,onCurrentChange:d.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_add?(c(),_(T,{key:0,open_add:p.open_add,onClose:t[0]||(t[0]=e=>{p.open_add=!1,1==e&&this.getData()})},null,8,["open_add"])):f("",!0),p.open_edit?(c(),_(W,{key:1,open_edit:p.open_edit,editId:p.editId,onClose:t[1]||(t[1]=e=>{p.open_edit=!1,1==e&&this.getData()})},null,8,["open_edit","editId"])):f("",!0)])}]]);export{A as default};
