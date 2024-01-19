import{d as e,E as t,i as a,m as i,n as l,A as o,v as s}from"./element-plus-d03e850c.js";import{P as n}from"./product-4cea8dc2.js";import d from"./add-b999ee6b.js";import r from"./edit-0ef0629c.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as c,ap as m,o as u,c as h,a as g,$ as j,T as C,S as b,W as _,X as f,P as y,Y as D}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-0eefa19c.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-6ce261c2.js";import"./file-1858a4ea.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const k={class:"product-list"},v={class:"common-level-rail"},z={class:"product-content"},S={class:"table-wrap"},x={class:"pagination"};const $=p({components:{Add:d,Edit:r},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,model:{},open_edit:!1,open_add:!1,tableData:[],multipleSelection:[]}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,t){this.curPage=1,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,n.LabelList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},addClick(){this.open_add=!0},deleteClick(a){let i=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{n.deleteLabel({label_id:a}).then((e=>{t({message:$t("删除成功"),type:"success"}),i.getData()}))}))},deleteBatch(){let a=this,i=[];this.multipleSelection.forEach(((e,t)=>{i.push(e.label_id)}));let l=i.join(",");e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{n.deleteLabel({label_id:l}).then((e=>{t({message:$t("删除成功"),type:"success"}),a.getData()}))}))},handleSelectionChange(e){this.multipleSelection=e},editClick(e){this.model=e,this.open_edit=!0}}},[["render",function(e,t,n,d,r,p){const $=a,w=i,P=l,A=o,E=c("Add"),L=c("Edit"),N=m("auth"),B=s;return u(),h("div",k,[g("div",v,[j((u(),C($,{size:"small",type:"primary",icon:"Plus",onClick:p.addClick},{default:b((()=>[_(f(e.$t("添加标签")),1)])),_:1},8,["onClick"])),[[N,"/product/expand/label/add"]]),j((u(),C($,{size:"small",onClick:p.deleteBatch},{default:b((()=>[_(f(e.$t("批量删除")),1)])),_:1},8,["onClick"])),[[N,"/product/expand/label/delete"]])]),g("div",z,[g("div",S,[j((u(),C(P,{size:"small",data:r.tableData,border:"",style:{width:"100%"},onSelectionChange:p.handleSelectionChange},{default:b((()=>[y(w,{type:"selection",width:"45"}),y(w,{prop:"label_name_text",label:e.$t("标签名称"),width:"400px"},null,8,["label"]),y(w,{prop:"sort",label:e.$t("排序")},null,8,["label"]),y(w,{fixed:"right",label:e.$t("操作"),width:"120"},{default:b((t=>[j((u(),C($,{onClick:e=>p.editClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[_(f(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[N,"/product/expand/label/edit"]]),j((u(),C($,{onClick:e=>p.deleteClick(t.row.label_id),type:"primary",link:"",size:"small"},{default:b((()=>[_(f(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[N,"/product/expand/label/delete"]])])),_:1},8,["label"])])),_:1},8,["data","onSelectionChange"])),[[B,r.loading]])])]),g("div",x,[y(A,{onSizeChange:p.handleSizeChange,onCurrentChange:p.handleCurrentChange,background:"","current-page":r.curPage,"page-size":r.pageSize,layout:"total, prev, pager, next, jumper",total:r.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),r.open_add?(u(),C(E,{key:0,open_add:r.open_add,addform:r.model,onCloseDialog:t[0]||(t[0]=e=>p.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):D("",!0),r.open_edit?(u(),C(L,{key:1,open_edit:r.open_edit,editform:r.model,onCloseDialog:t[1]||(t[1]=e=>p.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):D("",!0)])}]]);export{$ as default};
