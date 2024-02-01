import{d as e,i as t,m as a,o as i,v as o}from"./element-plus-c8084613.js";import{S as s}from"./store-ed5de365.js";import l from"./add-d34c1811.js";import d from"./edit-35d0ca5d.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as p,an as n,o as m,c,a as u,_ as j,S as g,R as h,V as _,W as y,O as f,X as b}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const k={class:"product"},D={class:"common-level-rail"},C={class:"product-content"},v={class:"table-wrap"};const w=r({components:{Add:l,Edit:d},data:()=>({loading:!0,activeName:"first",tableData:[],open_add:!1,open_edit:!1,categoryModel:{model:""}}),created(){this.getData()},methods:{handleClick(){this.getData()},getData(){let e=this;e.loading=!0,s.arealist({},!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.categoryModel=t.data.list.data})).catch((t=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.categoryModel.model=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗？"),$t("提示"),{type:"warning"}).then((()=>{s.deleteArea({area_id:t.area_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))}}},[["render",function(e,s,l,d,r,w){const $=t,x=a,z=i,M=p("Add"),E=p("Edit"),F=n("auth"),A=o;return m(),c("div",k,[u("div",D,[j((m(),g($,{size:"small",type:"primary",onClick:w.addClick,icon:"Plus"},{default:h((()=>[_(y(e.$t("添加区域")),1)])),_:1},8,["onClick"])),[[F,"/supplier/table/area/add"]])]),u("div",C,[u("div",v,[j((m(),g(z,{size:"small",data:r.tableData,"row-key":"category_id",style:{width:"100%"}},{default:h((()=>[f(x,{prop:"area_name",label:e.$t("区域名称")},null,8,["label"]),f(x,{prop:"sort",label:e.$t("排序")},null,8,["label"]),f(x,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),f(x,{fixed:"right",label:e.$t("操作"),width:"100"},{default:h((t=>[j((m(),g($,{onClick:e=>w.editClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[_(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[F,"/supplier/table/area/edit"]]),j((m(),g($,{onClick:e=>w.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[_(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[F,"/supplier/table/area/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[A,r.loading]])])]),r.open_add?(m(),g(M,{key:0,open_add:r.open_add,addform:r.categoryModel,onCloseDialog:s[0]||(s[0]=e=>w.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):b("",!0),r.open_edit?(m(),g(E,{key:1,open_edit:r.open_edit,editform:r.categoryModel,onCloseDialog:s[1]||(s[1]=e=>w.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):b("",!0)])}]]);export{w as default};
