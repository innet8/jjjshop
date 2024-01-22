import{d as t,E as e,g as a,m as o,C as s,n as i,v as l}from"./element-plus-b30a858e.js";import{P as d}from"./product-ffc427f5.js";import r from"./Edit-52bd511c.js";import p from"./Add-564fd422.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as c,ap as m,o as u,c as j,a as g,$ as h,T as f,S as _,W as y,X as b,P as v,Y as C}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-3370678a.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./Upload-9c7b6d53.js";import"./file-1c2123a7.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";const k={class:"product"},D={class:"common-level-rail"},w={class:"product-content"},$={class:"table-wrap"};const x=n({components:{Edit:r,Add:p},data:()=>({loading:!1,open_add:!1,open_edit:!1,categoryModel:{catList:[],model:{}},tableData:[]}),created(){this.getData()},methods:{addClick(){this.open_add=!0},editClick(t){this.categoryModel.model=t,this.open_edit=!0},closeDialogFunc(t,e){"add"==e&&(this.open_add=t.openDialog,"success"==t.type&&this.getData()),"edit"==e&&(this.open_edit=t.openDialog,"success"==t.type&&this.getData())},getData(){let t=this;t.loading=!0,d.storeCatSP({},!0).then((e=>{t.loading=!1,t.tableData=e.data.list,t.categoryModel.catList=t.tableData})).catch((e=>{t.loading=!1}))},deleteClick(a){let o=this;t.confirm($t("删除后不可恢复，确认删除该记录吗?"),$t("提示"),{type:"warning"}).then((()=>{d.storeCatDel({category_id:a.category_id}).then((t=>{e({message:$t("删除成功"),type:"success"}),o.getData()}))}))}}},[["render",function(t,e,d,r,p,n){const x=a,z=o,A=s,M=i,E=c("Add"),P=c("Edit"),V=m("auth"),F=l;return u(),j("div",k,[g("div",D,[h((u(),f(x,{size:"small",type:"primary",onClick:n.addClick,icon:"Plus"},{default:_((()=>[y(b(t.$t("添加分类")),1)])),_:1},8,["onClick"])),[[V,"/product/store/feature/add"]])]),g("div",w,[g("div",$,[h((u(),f(M,{size:"small",data:p.tableData,"row-key":"category_id","default-expand-all":"","tree-props":{children:"child"},style:{width:"100%"}},{default:_((()=>[v(z,{prop:"name_text",label:t.$t("分类名称")},null,8,["label"]),v(z,{prop:"sort",label:t.$t("状态")},{default:_((e=>[v(A,{disabled:!this.$filter.isAuth("/product/store/feature/state"),modelValue:e.row.status,"onUpdate:modelValue":t=>e.row.status=t,"active-value":1,"inactive-value":0,onChange:a=>t.statusSet(a,e.row.category_id)},null,8,["disabled","modelValue","onUpdate:modelValue","onChange"])])),_:1},8,["label"]),v(z,{prop:"create_time",label:t.$t("添加时间")},null,8,["label"]),v(z,{prop:"sort",label:t.$t("分类排序")},null,8,["label"]),v(z,{fixed:"right",label:t.$t("操作"),width:"120"},{default:_((e=>[h((u(),f(x,{onClick:t=>n.editClick(e.row),type:"primary",link:"",size:"small"},{default:_((()=>[y(b(t.$t("编辑")),1)])),_:2},1032,["onClick"])),[[V,"/product/store/feature/edit"]]),h((u(),f(x,{onClick:t=>n.deleteClick(e.row),type:"primary",link:"",size:"small"},{default:_((()=>[y(b(t.$t("删除")),1)])),_:2},1032,["onClick"])),[[V,"/product/store/feature/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[F,p.loading]])]),p.open_add?(u(),f(E,{key:0,open_add:p.open_add,addform:p.categoryModel,onCloseDialog:e[0]||(e[0]=t=>n.closeDialogFunc(t,"add"))},null,8,["open_add","addform"])):C("",!0),p.open_edit?(u(),f(P,{key:1,open_edit:p.open_edit,editform:p.categoryModel,onCloseDialog:e[1]||(e[1]=t=>n.closeDialogFunc(t,"edit"))},null,8,["open_edit","editform"])):C("",!0)])])}]]);export{x as default};
