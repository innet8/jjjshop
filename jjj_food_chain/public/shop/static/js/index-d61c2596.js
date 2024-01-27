import{d as e,E as t,i as a,m as i,n as r,A as l,v as n}from"./element-plus-b01b3a31.js";import{S as s}from"./setting-aacebba3.js";import o from"./add-cf2ce614.js";import p from"./edit-6af44a22.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as m,ap as u,o as c,c as g,a as h,$ as j,T as _,S as C,W as b,X as f,P as k,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y={class:"user"},z={class:"common-level-rail"},D={class:"product-content"},w={class:"table-wrap"},S={class:"pagination"};const $=d({components:{Add:o,Edit:p},data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,printerId:0,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,s.printerList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.open_add=!0},editClick(e){this.printerId=e.printer_id,this.open_edit=!0},deleteClick(a){let i=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i.loading=!0,s.deletePrinter({printer_id:a.printer_id},!0).then((e=>{i.loading=!1,t({message:e.msg,type:"success"}),i.getData()})).catch((e=>{i.loading=!1}))})).catch((()=>{i.loading=!1}))}}},[["render",function(e,t,s,o,p,d){const $=a,x=i,P=r,I=l,A=m("Add"),B=m("Edit"),E=u("auth"),N=n;return c(),g("div",y,[h("div",z,[j((c(),_($,{size:"small",type:"primary",onClick:d.addClick},{default:C((()=>[b(f(e.$t("添加")),1)])),_:1},8,["onClick"])),[[E,"/supplier/printing/printer/add"]])]),h("div",D,[h("div",w,[j((c(),_(P,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:C((()=>[k(x,{prop:"printer_id",label:e.$t("ID")},null,8,["label"]),k(x,{prop:"printer_name",label:e.$t("打印机名称")},null,8,["label"]),k(x,{prop:"printer_type.text",label:e.$t("打印机类型")},null,8,["label"]),k(x,{prop:"sort",label:e.$t("排序")},null,8,["label"]),k(x,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),k(x,{fixed:"right",label:e.$t("操作"),width:"120"},{default:C((t=>[j((c(),_($,{onClick:e=>d.editClick(t.row),type:"primary",link:"",size:"small"},{default:C((()=>[b(f(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[E,"/supplier/printing/printer/edit"]]),j((c(),_($,{onClick:e=>d.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:C((()=>[b(f(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[E,"/supplier/printing/printer/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[N,p.loading]])]),h("div",S,[k(I,{onSizeChange:d.handleSizeChange,onCurrentChange:d.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),p.open_add?(c(),_(A,{key:0,open_add:p.open_add,onClose:t[0]||(t[0]=e=>{p.open_add=!1,1==e&&this.getData()})},null,8,["open_add"])):v("",!0),p.open_edit?(c(),_(B,{key:1,open_edit:p.open_edit,printer_id:p.printerId,onClose:t[1]||(t[1]=e=>{p.open_edit=!1,1==e&&this.getData()})},null,8,["open_edit","printer_id"])):v("",!0)])}]]);export{$ as default};
