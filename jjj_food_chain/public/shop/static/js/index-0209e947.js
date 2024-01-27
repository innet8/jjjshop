import{d as t,E as e,i as a,m as i,C as l,n as s,A as o,v as n}from"./element-plus-b01b3a31.js";import{S as r}from"./supplier-0ae7c3f5.js";import d from"./add-16c34dbd.js";import p from"./edit-c5d77d4a.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as u,ap as c,o as g,c as h,a as _,$ as j,T as b,S as C,W as $,X as v,P as f,Y as k}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y={class:"user"},w={class:"common-level-rail"},z={class:"product-content"},D={class:"table-wrap"},S={key:0},x={key:1},I={key:2},P={key:3},A={class:"pagination"};const B=m({components:{Add:d,Edit:p},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,editId:0,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(t){let e=this;e.loading=!0,e.curPage=t,e.getData()},handleSizeChange(t){this.curPage=1,this.pageSize=t,this.getData()},getData(){let t=this,e={};e.page=t.curPage,e.list_rows=t.pageSize,r.printingList(e,!0).then((e=>{t.loading=!1,t.tableData=e.data.list.data,t.totalDataNumber=e.data.list.total})).catch((t=>{}))},addClick(){this.open_add=!0},editClick(t){this.editId=t.id,this.open_edit=!0},deleteClick(a){let i=this;t.confirm($t("此操作将永久删除该记录, 是否继续?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{i.loading=!0,r.deletePrinting({id:a.id},!0).then((t=>{i.loading=!1,e({message:t.msg,type:"success"}),i.getData()})).catch((t=>{i.loading=!1}))})).catch((()=>{i.loading=!1}))},changeStatus(e){let a=this,i={id:e.id,status:1==e.is_open?0:1},l="";l=1==e.is_open?$t("禁用"):$t("启用"),t.confirm($t("确定")+l+$t("这个商品打印?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{a.loading=!0,r.setStatus(i,!0).then((t=>{a.loading=!1,a.getData()})).catch((t=>{a.loading=!1}))})).catch((()=>{}))}}},[["render",function(t,e,r,d,p,m){const B=a,T=i,E=l,N=s,X=o,q=u("Add"),L=u("Edit"),M=c("auth"),W=n;return g(),h("div",y,[_("div",w,[j((g(),b(B,{size:"small",type:"primary",onClick:m.addClick},{default:C((()=>[$(v(t.$t("添加")),1)])),_:1},8,["onClick"])),[[M,"/supplier/printing/dishes/add"]])]),_("div",z,[_("div",D,[j((g(),b(N,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:C((()=>[f(T,{prop:"id",label:"ID"}),f(T,{prop:"name",label:t.$t("名称")},null,8,["label"]),f(T,{prop:"printer.printer_name",label:t.$t("打印机")},null,8,["label"]),f(T,{prop:"product_type",label:t.$t("打印模式")},{default:C((e=>[_("div",null,v(10==e.row.print_type?t.$t("付款打印"):t.$t("送厨打印")),1)])),_:1},8,["label"]),f(T,{prop:"print_method",label:t.$t("打印方式")},{default:C((e=>[10==e.row.print_method?(g(),h("div",S,v(t.$t("整单打印")),1)):k("",!0),20==e.row.print_method?(g(),h("div",x,v(t.$t("按商品分类打印")),1)):k("",!0),30==e.row.print_method?(g(),h("div",I,v(t.$t("按标签打印")),1)):k("",!0),40==e.row.print_method?(g(),h("div",P,v(t.$t("按一菜一单打印")),1)):k("",!0)])),_:1},8,["label"]),f(T,{prop:"is_open",label:t.$t("状态")},{default:C((t=>[f(E,{disabled:!this.$filter.isAuth("/supplier/printing/dishes/state"),"model-value":t.row.is_open,"active-value":1,"inactive-value":0,onClick:e=>m.changeStatus(t.row)},null,8,["disabled","model-value","onClick"])])),_:1},8,["label"]),f(T,{prop:"create_time",label:t.$t("添加时间")},null,8,["label"]),f(T,{fixed:"right",label:t.$t("操作"),width:"120"},{default:C((e=>[j((g(),b(B,{onClick:t=>m.editClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[$(v(t.$t("编辑")),1)])),_:2},1032,["onClick"])),[[M,"/supplier/printing/dishes/edit"]]),j((g(),b(B,{onClick:t=>m.deleteClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[$(v(t.$t("删除")),1)])),_:2},1032,["onClick"])),[[M,"/supplier/printing/dishes/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[W,p.loading]])]),_("div",A,[f(X,{onSizeChange:m.handleSizeChange,onCurrentChange:m.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_add?(g(),b(q,{key:0,open_add:p.open_add,onClose:e[0]||(e[0]=t=>{p.open_add=!1,1==t&&this.getData()})},null,8,["open_add"])):k("",!0),p.open_edit?(g(),b(L,{key:1,open_edit:p.open_edit,editId:p.editId,onClose:e[1]||(e[1]=t=>{p.open_edit=!1,1==t&&this.getData()})},null,8,["open_edit","editId"])):k("",!0)])}]]);export{B as default};
