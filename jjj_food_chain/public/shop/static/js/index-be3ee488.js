import{d as t,E as e,i,m as a,n as o,v as s}from"./element-plus-b01b3a31.js";import{P as l}from"./points-219d0742.js";import d from"./Add-70291c61.js";import r from"./Edit-5b1b6ad7.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as n,ap as m,o as c,c as u,a as j,$ as g,T as h,S as y,W as _,P as f,Y as k}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-e4289868.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const v={class:"product"},C={class:"common-level-rail"},D={class:"product-content"},b={class:"table-wrap"},w={alt:"",width:50};const x=p({components:{Add:d,Edit:r},data:()=>({loading:!0,activeName:"first",tableData:[],open_add:!1,open_edit:!1,categoryModel:{catList:[],model:{}}}),created(){this.getData()},methods:{handleClick(){this.getData()},getData(){let t=this;t.loading=!0,l.categoryList({},!0).then((e=>{t.loading=!1,t.tableData=e.data.list.all,t.categoryModel.catList=t.tableData})).catch((e=>{t.loading=!1}))},addClick(){this.open_add=!0},editClick(t){this.categoryModel.model=t,this.open_edit=!0},closeDialogFunc(t,e){"add"==e&&(this.open_add=t.openDialog,"success"==t.type&&this.getData()),"edit"==e&&(this.open_edit=t.openDialog,"success"==t.type&&this.getData())},deleteClick(i){let a=this;t.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((()=>{l.deleteCategory({category_id:i.category_id}).then((t=>{e({message:"删除成功",type:"success"}),a.getData()}))}))}}},[["render",function(t,e,l,d,r,p){const x=i,z=a,A=o,M=n("Add"),E=n("Edit"),F=m("auth"),L=m("img-url"),P=s;return c(),u("div",v,[j("div",C,[g((c(),h(x,{size:"small",type:"primary",onClick:p.addClick,icon:"Plus"},{default:y((()=>[_("添加分类")])),_:1},8,["onClick"])),[[F,"/product/takeaway/category/Add"]])]),j("div",D,[j("div",b,[g((c(),h(A,{size:"small",data:r.tableData,"row-key":"category_id","default-expand-all":"","tree-props":{children:"child"},style:{width:"100%"}},{default:y((()=>[f(z,{prop:"name",label:"分类名称",width:"180"}),f(z,{prop:"",label:"图片",width:"180"},{default:y((t=>[g(j("img",w,null,512),[[L,t.row.image.file_path]])])),_:1}),f(z,{prop:"sort",label:"分类排序"}),f(z,{prop:"create_time",label:"添加时间"}),f(z,{fixed:"right",label:"操作",width:"100"},{default:y((t=>[g((c(),h(x,{onClick:e=>p.editClick(t.row),type:"primary",link:"",size:"small"},{default:y((()=>[_("编辑")])),_:2},1032,["onClick"])),[[F,"/plus/points/category/edit"]]),g((c(),h(x,{onClick:e=>p.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:y((()=>[_("删除")])),_:2},1032,["onClick"])),[[F,"/plus/points/category/delete"]])])),_:1})])),_:1},8,["data"])),[[P,r.loading]])])]),r.open_add?(c(),h(M,{key:0,open_add:r.open_add,addform:r.categoryModel,onCloseDialog:e[0]||(e[0]=t=>p.closeDialogFunc(t,"add"))},null,8,["open_add","addform"])):k("",!0),r.open_edit?(c(),h(E,{key:1,open_edit:r.open_edit,editform:r.categoryModel,onCloseDialog:e[1]||(e[1]=t=>p.closeDialogFunc(t,"edit"))},null,8,["open_edit","editform"])):k("",!0)])}]]);export{x as default};
