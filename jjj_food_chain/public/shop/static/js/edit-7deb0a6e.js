import{g as e,h as a,C as t,i as s,e as l,v as o}from"./element-plus-bf694ad1.js";import{A as i}from"./index-191c97f6.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{_ as d,o as n,c as m,O as c,R as p,a as u,W as h,V as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const j={class:"add-box-role"},_={class:"common-form"},g={class:"common-button-wrapper"};const b=r({data:()=>({loading:!0,form:{access_id:[]},data:[],roleList:[],select_menu:[],defaultProps:{children:"children",label:"name"},role_id:0}),created(){this.role_id=this.$route.query.role_id,this.getData()},methods:{onSubmit(){let e=this,a=e.form;e.$refs.form.validate((t=>{if(t)e.loading=!0,i.roleEdit({role_id:e.role_id,params:JSON.stringify(a)},!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.$router.push("/auth/role/index")})).catch((a=>{e.loading=!1}));else{document.querySelector(".main-div").scrollTop=0}}))},getData(){let e=this;i.roleEditInfo({role_id:e.role_id}).then((a=>{e.clearData(a.data.menu,a.data.select_menu),e.select_menu=a.data.select_menu,e.form=a.data.model,e.roleList=a.data.roleList,e.data=a.data.menu,a.data.menu.map(((a,t)=>{e.data[t].name=$t(a.name),a.children.map(((a,s)=>{e.data[t].children[s].name=$t(a.name),a.children.map(((a,l)=>{e.data[t].children[s].children[l].name=$t(a.name),a.children.map(((a,o)=>{e.data[t].children[s].children[l].children[o].name=$t(a.name)}))}))}))})),0==e.form.parent_id&&(e.form.parent_id="0"),e.loading=!1})).catch((a=>{e.loading=!1}))},clearData(e,a){let t=0,s=e.length;for(let l=0;l<s;l++){let s=e[l];if(null!=s.children){if(!this.clearData(s.children,a)){let e=a.indexOf(s.access_id);e>=0&&a.splice(e,1)}}-1!=a.indexOf(s.access_id)&&t++}return!(t<s)},handleCheckChange(e,a){this.form.access_id=a.checkedKeys.concat(a.halfCheckedKeys)},cancelFunc(){this.$router.back(-1)}}},[["render",function(i,r,b,y,k,$){const v=e,x=a,C=t,w=s,V=l,q=o;return d((n(),m("div",j,[c(V,{size:"small",ref:"form",model:k.form,"label-position":"top","label-width":"180px"},{default:p((()=>[u("div",_,h(i.$t("编辑角色")),1),c(x,{label:i.$t("角色名称："),prop:"role_name",rules:[{required:!0,message:" "}]},{default:p((()=>[c(v,{modelValue:k.form.role_name,"onUpdate:modelValue":r[0]||(r[0]=e=>k.form.role_name=e),placeholder:i.$t("请输入角色名称"),class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),c(x,{class:"role-list",label:i.$t("权限列表："),modelValue:k.form.access_id,"onUpdate:modelValue":r[1]||(r[1]=e=>k.form.access_id=e)},{default:p((()=>[c(C,{data:k.data,"show-checkbox":"","node-key":"access_id","default-expand-all":!0,"default-checked-keys":k.select_menu,props:k.defaultProps,onCheck:$.handleCheckChange},null,8,["data","default-checked-keys","props","onCheck"])])),_:1},8,["label","modelValue"]),u("div",g,[c(w,{size:"small",onClick:$.cancelFunc},{default:p((()=>[f(h(i.$t("取消")),1)])),_:1},8,["onClick"]),c(w,{type:"primary",size:"small",onClick:$.onSubmit,loading:k.loading},{default:p((()=>[f(h(i.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])),[[q,k.loading]])}],["__scopeId","data-v-77b2d395"]]);export{b as default};
