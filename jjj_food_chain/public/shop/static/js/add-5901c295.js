import{E as e,g as a,h as s,B as o,i as t,e as l,v as i}from"./element-plus-b01b3a31.js";import{A as r}from"./index-83830581.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{$ as n,o as m,c,P as p,S as u,a as h,X as f,W as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const g={class:"add-box-role"},b={class:"common-form"},_={class:"common-button-wrapper"};const k=d({data:()=>({loading:!0,form:{access_id:[],sort:1},data:[],roleList:[],defaultProps:{children:"children",label:"name"}}),created(){this.getData()},methods:{onSubmit(){let a=this,s=a.form;a.$refs.form.validate((o=>{if(o)a.loading=!0,r.roleAdd({params:JSON.stringify(s)},!0).then((s=>{a.loading=!1,e({message:"添加成功",type:"success"}),a.$router.push("/auth/role/index")})).catch((e=>{a.loading=!1}));else{document.querySelector(".main-div").scrollTop=0}}))},getData(){let e=this;r.roleAddInfo().then((a=>{e.data=a.data.menu,a.data.menu.map(((a,s)=>{e.data[s].name=$t(a.name),a.children.map(((a,o)=>{e.data[s].children[o].name=$t(a.name),a.children.map(((a,t)=>{e.data[s].children[o].children[t].name=$t(a.name),a.children.map(((a,l)=>{e.data[s].children[o].children[t].children[l].name=$t(a.name)}))}))}))})),e.roleList=a.data.roleList,e.loading=!1})).catch((a=>{e.loading=!1}))},handleCheckChange(e,a){this.form.access_id=a.checkedKeys.concat(a.halfCheckedKeys)},cancelFunc(){this.$router.back(-1)}}},[["render",function(e,r,d,k,v,y){const $=a,C=s,x=o,w=t,V=l,S=i;return n((m(),c("div",g,[p(V,{size:"small",ref:"form",model:v.form,"label-position":"top","label-width":"180px"},{default:u((()=>[h("div",b,f(e.$t("添加角色")),1),p(C,{label:e.$t("角色名称："),prop:"role_name",rules:[{required:!0,message:" "}]},{default:u((()=>[p($,{modelValue:v.form.role_name,"onUpdate:modelValue":r[0]||(r[0]=e=>v.form.role_name=e),placeholder:e.$t("请输入角色名称"),maxlength:50,class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),p(C,{class:"role-list",label:e.$t("权限列表："),modelValue:v.form.access_id,"onUpdate:modelValue":r[1]||(r[1]=e=>v.form.access_id=e)},{default:u((()=>[p(x,{data:v.data,"show-checkbox":"","node-key":"access_id","default-expand-all":!0,"default-checked-keys":[],props:v.defaultProps,onCheck:y.handleCheckChange},null,8,["data","props","onCheck"])])),_:1},8,["label","modelValue"]),h("div",_,[p(w,{size:"small",type:"info",onClick:y.cancelFunc},{default:u((()=>[j(f(e.$t("取消")),1)])),_:1},8,["onClick"]),p(w,{type:"primary",size:"small",onClick:y.onSubmit,loading:v.loading},{default:u((()=>[j(f(e.$t("提交")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])),[[S,v.loading]])}],["__scopeId","data-v-d6c008a2"]]);export{k as default};