import{g as e,h as a,C as t,i as l,e as s,v as o}from"./element-plus-33e0d8cc.js";import{A as i}from"./index-188a77f0.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{$ as d,o as n,c as m,P as c,S as p,a as u,X as h,W as f}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const _={class:"add-box-role"},j={class:"common-form"},g={class:"common-button-wrapper"};const b=r({data:()=>({loading:!0,form:{access_id:[]},data:[],roleList:[],select_menu:[],defaultProps:{children:"children",label:"name"},role_id:0}),created(){this.role_id=this.$route.query.role_id,this.getData()},methods:{onSubmit(){let e=this,a=e.form;e.$refs.form.validate((t=>{if(t)e.loading=!0,i.roleEdit({role_id:e.role_id,params:JSON.stringify(a)},!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("修改成功"),type:"success"}),e.$router.push("/auth/role/index")})).catch((a=>{e.loading=!1}));else{document.querySelector(".main-div").scrollTop=0}}))},getData(){let e=this;i.roleEditInfo({role_id:e.role_id}).then((a=>{e.clearData(a.data.menu,a.data.select_menu),e.select_menu=a.data.select_menu,e.form=a.data.model,e.roleList=a.data.roleList,e.data=a.data.menu,a.data.menu.map(((a,t)=>{e.data[t].name=$t(a.name),a.children.map(((a,l)=>{e.data[t].children[l].name=$t(a.name),a.children.map(((a,s)=>{e.data[t].children[l].children[s].name=$t(a.name),a.children.map(((a,o)=>{e.data[t].children[l].children[s].children[o].name=$t(a.name)}))}))}))})),0==e.form.parent_id&&(e.form.parent_id="0"),e.loading=!1})).catch((a=>{e.loading=!1}))},clearData(e,a){let t=0,l=e.length;for(let s=0;s<l;s++){let l=e[s];if(null!=l.children){if(!this.clearData(l.children,a)){let e=a.indexOf(l.access_id);e>=0&&a.splice(e,1)}}-1!=a.indexOf(l.access_id)&&t++}return!(t<l)},handleCheckChange(e,a){this.form.access_id=a.checkedKeys.concat(a.halfCheckedKeys)},cancelFunc(){this.$router.back(-1)}}},[["render",function(i,r,b,k,$,v){const y=e,C=a,x=t,w=l,V=s,D=o;return d((n(),m("div",_,[c(V,{size:"small",ref:"form",model:$.form,"label-position":"top","label-width":"180px"},{default:p((()=>[u("div",j,h(i.$t("编辑角色")),1),c(C,{label:i.$t("角色名称："),prop:"role_name",rules:[{required:!0,message:" "}]},{default:p((()=>[c(y,{modelValue:$.form.role_name,"onUpdate:modelValue":r[0]||(r[0]=e=>$.form.role_name=e),placeholder:i.$t("请输入角色名称"),class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),c(C,{class:"role-list",label:i.$t("权限列表："),modelValue:$.form.access_id,"onUpdate:modelValue":r[1]||(r[1]=e=>$.form.access_id=e)},{default:p((()=>[c(x,{data:$.data,"show-checkbox":"","node-key":"access_id","default-expand-all":!0,"default-checked-keys":$.select_menu,props:$.defaultProps,onCheck:v.handleCheckChange},null,8,["data","default-checked-keys","props","onCheck"])])),_:1},8,["label","modelValue"]),u("div",g,[c(w,{size:"small",type:"info",onClick:v.cancelFunc},{default:p((()=>[f(h(i.$t("取消")),1)])),_:1},8,["onClick"]),c(w,{type:"primary",size:"small",onClick:v.onSubmit,loading:$.loading},{default:p((()=>[f(h(i.$t("提交")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])),[[D,$.loading]])}],["__scopeId","data-v-322187db"]]);export{b as default};
