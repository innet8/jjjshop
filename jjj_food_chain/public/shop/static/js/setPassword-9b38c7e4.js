import{g as e,h as o,e as s,i as a,u as r}from"./element-plus-c8084613.js";import{T as t}from"./terminal-e62186ce.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as i,S as d,R as p,a as n,O as m,V as c,W as u}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-cad16880.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const j={class:"tips"},f={class:"dialog-footer"};const h=l({props:["open","advancedPassword"],created(){this.dialogVisible=this.open,this.have=this.advancedPassword},data(){return{isProductUpload:!1,loading:!1,form:{new_advanced_password:"",confirm_advanced_password:"",advanced_password:""},have:!1,rules:{new_advanced_password:[{required:!0,validator:(e,o,s)=>{o?o.length<4||o.length>8||!/^\d+$/.test(o)?s(new Error($t("密码必须是4-8位的数字"))):s():s(new Error($t("请输入密码")))},trigger:"blur"}],confirm_advanced_password:[{required:!0,validator:(e,o,s)=>{o?o!==this.form.new_advanced_password?s(new Error($t("两次密码不一致！"))):s():s(new Error($t("请输入确认密码")))},trigger:"blur"}]}}},methods:{onSubmit(){let e=this,o=e.form;e.$refs.form.validate((s=>{s&&(e.loading=!0,t.editAdvancedPassword(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:$t("修改成功"),type:"success"}),this.$emit("close",1)})).catch((o=>{e.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(t,l,h,_,w,v){const g=e,$=o,b=s,V=a,y=r;return i(),d(y,{class:"",onClose:v.handleClose,modelValue:t.dialogVisible,"onUpdate:modelValue":l[2]||(l[2]=e=>t.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:t.$t("设置平板密码")},{footer:p((()=>[n("span",f,[m(V,{onClick:v.handleClose},{default:p((()=>[c(u(t.$t("取消")),1)])),_:1},8,["onClick"]),m(V,{type:"primary",onClick:v.onSubmit,loading:w.loading},{default:p((()=>[c(u(t.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:p((()=>[m(b,{size:"small",ref:"form",model:w.form,"label-position":"top",rules:w.rules},{default:p((()=>[m($,{label:w.have?t.$t("新密码"):t.$t("密码"),prop:"new_advanced_password"},{default:p((()=>[m(g,{modelValue:w.form.new_advanced_password,"onUpdate:modelValue":l[0]||(l[0]=e=>w.form.new_advanced_password=e),type:"password",placeholder:t.$t("请输入密码")},null,8,["modelValue","placeholder"]),n("div",j,u(t.$t("密码必须是4-8位的数字")),1)])),_:1},8,["label"]),m($,{label:t.$t("确认密码"),prop:"confirm_advanced_password"},{default:p((()=>[m(g,{modelValue:w.form.confirm_advanced_password,"onUpdate:modelValue":l[1]||(l[1]=e=>w.form.confirm_advanced_password=e),type:"password",placeholder:t.$t("请确认密码")},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["onClose","modelValue","title"])}]]);export{h as default};
