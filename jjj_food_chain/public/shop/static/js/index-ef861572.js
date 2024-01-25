import{d as e,E as a,g as t,h as l,i,e as o,m as s,n,A as d,v as r}from"./element-plus-d03e850c.js";import{P as p}from"./product-e90779ee.js";import m from"./add-56d96bba.js";import c from"./edit-75726bd2.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as h,ap as g,o as j,c as _,a as C,P as b,S as f,W as y,X as k,$ as v,T as D,Y as z}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-b8ac138a.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-23d65bf2.js";import"./file-a5e8a816.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const S={class:"product-list"},$={class:"common-level-rail"},x={class:"product-content"},w={class:"table-wrap"},F={class:"pagination"};const P=u({components:{Add:m,Edit:c},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,model:{},open_edit:!1,open_add:!1,tableData:[],multipleSelection:[],searchForm:{name:""}}),created(){this.getData()},methods:{handleCurrentChange(e){let a=this;a.loading=!0,a.curPage=e,a.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,a){this.curPage=1,this.getData()},getData(){let e=this,a={};a.page=e.curPage,a.list_rows=e.pageSize,a.label_name=e.searchForm.name,e.loading=!0,p.LabelList(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total})).catch((a=>{e.loading=!1}))},closeDialogFunc(e,a){"add"==a&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},addClick(){this.open_add=!0},deleteClick(t){let l=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{p.deleteLabel({label_id:t}).then((e=>{a({message:$t("删除成功"),type:"success"}),l.getData()}))}))},deleteBatch(){let t=this,l=[];this.multipleSelection.forEach(((e,a)=>{l.push(e.label_id)}));let i=l.join(",");e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{p.deleteLabel({label_id:i}).then((e=>{a({message:$t("删除成功"),type:"success"}),t.getData()}))}))},handleSelectionChange(e){this.multipleSelection=e},editClick(e){this.model=e,this.open_edit=!0}}},[["render",function(e,a,p,m,c,u){const P=t,A=l,E=i,L=o,N=s,B=n,V=d,I=h("Add"),U=h("Edit"),W=g("auth"),q=r;return j(),_("div",S,[C("div",$,[b(L,{size:"small",inline:!0,model:c.searchForm,class:"demo-form-inline"},{default:f((()=>[b(A,null,{default:f((()=>[b(P,{size:"small",modelValue:c.searchForm.name,"onUpdate:modelValue":a[0]||(a[0]=e=>c.searchForm.name=e),placeholder:e.$t("标签名称")},null,8,["modelValue","placeholder"])])),_:1}),b(A,null,{default:f((()=>[b(E,{size:"small",type:"primary",icon:"Search",onClick:u.getData},{default:f((()=>[y(k(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),C("div",null,[v((j(),D(E,{size:"small",type:"primary",icon:"Plus",onClick:u.addClick},{default:f((()=>[y(k(e.$t("添加标签")),1)])),_:1},8,["onClick"])),[[W,"/product/expand/label/add"]]),v((j(),D(E,{size:"small",onClick:u.deleteBatch},{default:f((()=>[y(k(e.$t("批量删除")),1)])),_:1},8,["onClick"])),[[W,"/product/expand/label/batch_delete"]])])]),C("div",x,[C("div",w,[v((j(),D(B,{size:"small",data:c.tableData,border:"",style:{width:"100%"},onSelectionChange:u.handleSelectionChange},{default:f((()=>[b(N,{type:"selection",width:"45"}),b(N,{prop:"label_name_text",label:e.$t("标签名称")},null,8,["label"]),b(N,{prop:"sort",label:e.$t("排序")},null,8,["label"]),b(N,{fixed:"right",label:e.$t("操作"),width:"120"},{default:f((a=>[v((j(),D(E,{onClick:e=>u.editClick(a.row),type:"primary",link:"",size:"small"},{default:f((()=>[y(k(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[W,"/product/expand/label/edit"]]),v((j(),D(E,{onClick:e=>u.deleteClick(a.row.label_id),type:"primary",link:"",size:"small"},{default:f((()=>[y(k(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[W,"/product/expand/label/delete"]])])),_:1},8,["label"])])),_:1},8,["data","onSelectionChange"])),[[q,c.loading]])])]),C("div",F,[b(V,{onSizeChange:u.handleSizeChange,onCurrentChange:u.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),c.open_add?(j(),D(I,{key:0,open_add:c.open_add,addform:c.model,onCloseDialog:a[1]||(a[1]=e=>u.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):z("",!0),c.open_edit?(j(),D(U,{key:1,open_edit:c.open_edit,editform:c.model,onCloseDialog:a[2]||(a[2]=e=>u.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):z("",!0)])}],["__scopeId","data-v-72bf3c20"]]);export{P as default};