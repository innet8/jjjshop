import{d as e,i as t,m as a,o as i,v as s}from"./element-plus-33e0d8cc.js";import{S as o}from"./store-ca7c4671.js";import l from"./add-643e03b5.js";import d from"./edit-1bb28aee.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as p,ap as n,o as m,c,a as u,$ as j,T as g,S as h,W as _,X as y,P as f,Y as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const k={class:"product"},v={class:"common-level-rail"},C={class:"product-content"},D={class:"table-wrap"};const $=r({components:{Add:l,Edit:d},data:()=>({loading:!0,activeName:"first",tableData:[],open_add:!1,open_edit:!1,categoryModel:{model:""}}),created(){this.getData()},methods:{handleClick(){this.getData()},getData(){let e=this;e.loading=!0,o.arealist({},!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.categoryModel=t.data.list.data})).catch((t=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.categoryModel.model=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗？"),$t("提示"),{type:"warning"}).then((()=>{o.deleteArea({area_id:t.area_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))}}},[["render",function(e,o,l,d,r,$){const w=t,z=a,M=i,x=p("Add"),A=p("Edit"),E=n("auth"),F=s;return m(),c("div",k,[u("div",v,[j((m(),g(w,{size:"small",type:"primary",onClick:$.addClick,icon:"Plus"},{default:h((()=>[_(y(e.$t("添加区域")),1)])),_:1},8,["onClick"])),[[E,"/supplier/table/area/add"]])]),u("div",C,[u("div",D,[j((m(),g(M,{size:"small",data:r.tableData,"row-key":"category_id",style:{width:"100%"}},{default:h((()=>[f(z,{prop:"area_name",label:e.$t("区域名称")},null,8,["label"]),f(z,{prop:"sort",label:e.$t("排序")},null,8,["label"]),f(z,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),f(z,{fixed:"right",label:e.$t("操作"),width:"100"},{default:h((t=>[j((m(),g(w,{onClick:e=>$.editClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[_(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[E,"/supplier/table/area/edit"]]),j((m(),g(w,{onClick:e=>$.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[_(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[E,"/supplier/table/area/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[F,r.loading]])])]),r.open_add?(m(),g(x,{key:0,open_add:r.open_add,addform:r.categoryModel,onCloseDialog:o[0]||(o[0]=e=>$.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):b("",!0),r.open_edit?(m(),g(A,{key:1,open_edit:r.open_edit,editform:r.categoryModel,onCloseDialog:o[1]||(o[1]=e=>$.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):b("",!0)])}]]);export{$ as default};
