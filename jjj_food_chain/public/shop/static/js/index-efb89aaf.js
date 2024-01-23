import{d as e,E as t,g as a,h as i,i as l,e as o,m as s,n as r,A as n,v as d}from"./element-plus-d03e850c.js";import{P as p}from"./product-7ce22898.js";import m from"./add-1dbf7ad0.js";import c from"./edit-a6115ab5.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as h,ap as g,o as j,c as _,a as C,P as b,S as f,W as v,X as y,$ as D,T as k,Y as z}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-a9bc4833.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-e4feeea0.js";import"./file-2dc1a1d7.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const S={class:"product-list"},$={class:"common-level-rail"},x={class:"product-content"},w={class:"table-wrap"},P={class:"pagination"};const F=u({components:{Add:m,Edit:c},data:()=>({activeName:"sell",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,model:{},open_edit:!1,open_add:!1,tableData:[],multipleSelection:[],searchForm:{name:""}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,t){this.curPage=1,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,t.attribute_name=e.searchForm.name,e.loading=!0,p.AttributeList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},attrjoin:e=>e?e.join("|"):"",onSubmit(){this.curPage=1,this.getData()},addClick(){this.open_add=!0},deleteClick(a){let i=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{p.deleteAttribute({attribute_id:a}).then((e=>{t({message:$t("删除成功"),type:"success"}),i.getData()}))}))},deleteBatch(){let a=this,i=[];this.multipleSelection.forEach(((e,t)=>{i.push(e.attribute_id)}));let l=i.join(",");e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{p.deleteAttribute({attribute_id:l}).then((e=>{t({message:$t("删除成功"),type:"success"}),a.getData()}))}))},handleSelectionChange(e){this.multipleSelection=e},editClick(e){this.model=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())}}},[["render",function(e,t,p,m,c,u){const F=a,A=i,E=l,N=o,B=s,V=r,q=n,I=h("Add"),U=h("Edit"),W=g("auth"),L=d;return j(),_("div",S,[C("div",$,[b(N,{size:"small",inline:!0,model:c.searchForm,class:"demo-form-inline"},{default:f((()=>[b(A,null,{default:f((()=>[b(F,{size:"small",modelValue:c.searchForm.name,"onUpdate:modelValue":t[0]||(t[0]=e=>c.searchForm.name=e),placeholder:e.$t("属性名称")},null,8,["modelValue","placeholder"])])),_:1}),b(A,null,{default:f((()=>[b(E,{size:"small",type:"primary",icon:"Search",onClick:u.getData},{default:f((()=>[v(y(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),C("div",null,[D((j(),k(E,{size:"small",type:"primary",icon:"Plus",onClick:u.addClick},{default:f((()=>[v(y(e.$t("添加属性")),1)])),_:1},8,["onClick"])),[[W,"/product/expand/attr/add"]]),D((j(),k(E,{size:"small",onClick:u.deleteBatch},{default:f((()=>[v(y(e.$t("批量删除")),1)])),_:1},8,["onClick"])),[[W,"/product/expand/attr/batch_delete"]])])]),C("div",x,[C("div",w,[D((j(),k(V,{size:"small",data:c.tableData,border:"",style:{width:"100%"},onSelectionChange:u.handleSelectionChange},{default:f((()=>[b(B,{type:"selection",width:"45"}),b(B,{prop:"attribute_name_text",label:e.$t("属性名称"),width:"400px"},null,8,["label"]),b(B,{prop:"attribute_value_text",label:e.$t("属性值")},{default:f((e=>[v(y(u.attrjoin(e.row.attribute_value_text)),1)])),_:1},8,["label"]),b(B,{prop:"sort",label:e.$t("排序")},null,8,["label"]),b(B,{fixed:"right",label:e.$t("操作"),width:"120"},{default:f((t=>[D((j(),k(E,{onClick:e=>u.editClick(t.row),type:"primary",link:"",size:"small"},{default:f((()=>[v(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[W,"/product/expand/attr/edit"]]),D((j(),k(E,{onClick:e=>u.deleteClick(t.row.attribute_id),type:"primary",link:"",size:"small"},{default:f((()=>[v(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[W,"/product/expand/attr/delete"]])])),_:1},8,["label"])])),_:1},8,["data","onSelectionChange"])),[[L,c.loading]])])]),C("div",P,[b(q,{onSizeChange:u.handleSizeChange,onCurrentChange:u.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),c.open_add?(j(),k(I,{key:0,open_add:c.open_add,addform:c.model,onCloseDialog:t[1]||(t[1]=e=>u.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):z("",!0),c.open_edit?(j(),k(U,{key:1,open_edit:c.open_edit,editform:c.model,onCloseDialog:t[2]||(t[2]=e=>u.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):z("",!0)])}],["__scopeId","data-v-d85e41c7"]]);export{F as default};
